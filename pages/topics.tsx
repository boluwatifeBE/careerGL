import { GlobalHeader } from "@/components/Form";
import Link from "@/components/Link";
import { GlobalPageSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import { getAllTags } from "@/lib/tags";
import kebabCase from "@/lib/utils/kebabCase";
import { GetStaticProps, InferGetStaticPropsType } from "next";

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

        <div className='flex max-w-lg flex-wrap'>
          {Object.keys(tags).length === 0 && "No tags found."}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/topics/${kebabCase(t)}`}
                  className="text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
