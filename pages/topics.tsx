import { GlobalHeader } from "@/components/Form";
import Link from "@/components/Link";
import { GlobalPageSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import config from "config";
import { getAllTags } from "@/lib/tags";
import kebabCase from "@/lib/utils/kebabCase";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import CardWithBanner from "@/components/CardWithBanner";

const SLUG = 'topics';

export const getStaticProps: GetStaticProps<{
  tags: Record<string, number>;
}> = async () => {
  const tags = await getAllTags("blog");

  return { props: { tags } };
};

export default function Tags({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  return (
    <>
      <GlobalPageSEO slug={SLUG} />

      <div className="fade-in divide-y-2 divide-gray-100 dark:divide-gray-800">
        <GlobalHeader slug={SLUG} />

        <div className="">
          {Object.keys(tags).length === 0 && "No tags found."}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/topics/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            );
          })}
        </div>
        {/* <div className='container py-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
            {sortedTags.map((tag) => (
              <CardWithBanner
                key={kebabCase(tag)}
                title={tag}
                description={tagDetails.description}
                banner={heading.banner}
                href={`${heading.slug}/${kebabCase(tag)}`}
              />
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
}
