import Head from 'next/head';
import { useRouter } from 'next/router';
import siteMetadata from 'src/data/siteMetadata';
import { AuthorFrontMatter } from 'src/types/AuthorFrontMatter';
import { PostFrontMatter } from 'src/types/PostFrontMatter';
import config from '../config';
import { SeoHeadingContent } from '@/config/seo';

interface BasePageSEOProps {
  slug?: string;
}
interface PageSEOProps extends BasePageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
}

interface CommonSEOProps extends PageSEOProps {
  ogType: string;
  ogImage:
    | string
    | {
        '@type': string;
        url: string;
      }[];
  twImage: string;
  canonicalUrl?: string;
}

const CommonSEO = ({
  title,
  description,
  keywords,
  ogType,
  ogImage,
  twImage,
  canonicalUrl,
}: CommonSEOProps) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name='robots' content='follow, index' />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords ? keywords?.toString() : title} />
      <meta
        property='og:url'
        content={`${siteMetadata.url.web}${router.asPath}`}
      />
      <meta property='og:type' content={ogType} />
      <meta property='og:site_name' content={siteMetadata.title} />
      <meta property='og:description' content={description} />
      <meta property='og:title' content={title} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ url }) => (
          <meta property='og:image' content={url} key={url} />
        ))
      ) : (
        <meta property='og:image' content={ogImage} key={ogImage} />
      )}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={siteMetadata.twitter} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={twImage} />
      <link
        rel='canonical'
        href={
          canonicalUrl
            ? canonicalUrl
            : `${siteMetadata.url.web}${router.asPath}`
        }
      />
    </Head>
  );
};

export const PageSEO = ({
  title,
  description,
  imageUrl,
  keywords,
}: PageSEOProps) => {
  const ogImageUrl =
    siteMetadata.url.web + (imageUrl ?? siteMetadata.socialBanner);
  const twImageUrl =
    siteMetadata.url.web + (imageUrl ?? siteMetadata.socialBanner);

  return (
    <CommonSEO
      title={title}
      description={description}
      keywords={keywords}
      ogType='website'
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  );
};

export const TagSEO = ({ title, description, slug }: PageSEOProps) => {
  const seoTitle = TagSeoDetails(slug)?.slug;
  const capitalizeSeoTitle = ufirstletter(seoTitle);
  const seoDescription = TagSeoDetails(slug)?.description;
  const ogImageUrl = siteMetadata.url.web + siteMetadata.socialBanner;
  const twImageUrl = siteMetadata.url.web + siteMetadata.socialBanner;
  const router = useRouter();
  return (
    <>
      <CommonSEO
        title={`${capitalizeSeoTitle ? capitalizeSeoTitle : title} | ${
          siteMetadata.title
        }`}
        description={seoDescription ? seoDescription : description}
        ogType='website'
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        <link
          rel='alternate'
          type='application/rss+xml'
          title={`${seoDescription ? seoDescription : description} - RSS feed`}
          href={`${siteMetadata.url.web}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  );
};

interface BlogSeoProps extends PostFrontMatter {
  authorDetails?: AuthorFrontMatter[];
  url: string;
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
}: BlogSeoProps) => {
  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(lastmod || date).toISOString();
  const imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === 'string'
      ? [images]
      : images;

  const featuredImages = imagesArr.map(img => {
    return {
      '@type': 'ImageObject',
      url: `${siteMetadata.url.web}${img}`,
    };
  });

  let authorList;
  if (authorDetails) {
    authorList = authorDetails.map(author => {
      return {
        '@type': 'Person',
        name: author.name,
      };
    });
  } else {
    authorList = {
      '@type': 'Person',
      name: siteMetadata.author,
    };
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.url.web}${siteMetadata.siteLogo}`,
      },
    },
    description: summary,
  };

  const twImageUrl = featuredImages[0].url;

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType='article'
        ogImage={featuredImages}
        twImage={twImageUrl}
        canonicalUrl={canonicalUrl}
      />
      <Head>
        {date && (
          <meta property='article:published_time' content={publishedAt} />
        )}
        {lastmod && (
          <meta property='article:modified_time' content={modifiedAt} />
        )}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  );
};

export const GlobalPageSEO = ({ slug }: BasePageSEOProps) => {
  const heading = config.seocontent.find(heading => heading.slug === slug);

  return (
    <PageSEO
      title={`${heading.title} | ${siteMetadata.title}`}
      description={heading.description}
      imageUrl={heading.banner}
    />
  );
};

export const TagSeoDetails = (tag: string): SeoHeadingContent => {
  const seoTopics = config.seocontent.find(seo => seo.slug === 'topics');
  const seoTopicContent = seoTopics.content.find(seo => seo.slug === tag);

  return seoTopicContent;
};

export const ufirstletter = (data: string): string => {
  return data?.charAt(0).toUpperCase() + data?.slice(1);
};
