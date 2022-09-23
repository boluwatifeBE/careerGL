import Image from "next/image";
import Link from "./Link";
import { AuthorFrontMatter } from "types/AuthorFrontMatter";
import { formatSlug, getAllFilesFrontMatter, getFileBySlug } from "@/lib/mdx";
import { PostFrontMatter } from "types/PostFrontMatter";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type AuthorDetailsCardProps = {
  author?: string[];
  slug?: string;
};

// export const getStaticProps: GetStaticProps<{
//   authorDetails: Promise<any[]>;
//   // initialDisplayPosts: ComponentProps<typeof ListLayout>['initialDisplayPosts'];
//   // pagination: ComponentProps<typeof ListLayout>['pagination'];
// }> = async () => {
//   const posts = await getAllFilesFrontMatter("blog");
//   const postIndex = allPosts.findIndex(post => formatSlug(post.slug) === slug);
//   const post = getFileBySlug<PostFrontMatter>("blog", slug);
//   // @ts-ignore
//   const authorList = post.frontMatter.authors || ["default"];
//   const authorPromise = authorList.map(async (author) => {
//     const authorResults = getFileBySlug<AuthorFrontMatter>("authors", [author]);
//     const authorResults = await getFileBySlug<AuthorFrontMatter>("authors", [
//       author,
//     ]);
//     return authorResults.frontMatter;
//   });
//   const authorDetails = Promise.all(authorPromise);

//   return { props: { posts, authorDetails } };
// };

export default function AuthorDetailsCard({
  author,
  slug,
}: AuthorDetailsCardProps): React.ReactElement {
  // export default async function AuthorDetailsCard({
  //   authorDetails
  // }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="md p-3" style={{ maxWidth: "544px" }}>
      <div
        className={`overflow-hidden rounded-lg  border-slate-100 border-opacity-60 bg-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 `}
      >
        <div className="px-4 pt-2 pb-4">
          {author.map((author) => (
            {author}
            // <li className="flex items-start space-x-3" key={author.name}>
            //   <div>
            //     {author.avatar && (
            //       <Image
            //         src={author.avatar}
            //         width="50px"
            //         height="50px"
            //         alt="avatar"
            //         className="h-10 w-[20%] rounded-full"
            //       />
            //     )}
            //   </div>
            //   <dl className="w-[90%] whitespace-normal text-sm font-medium leading-5">
            //     <div>
            //       <dt className="sr-only">Name</dt>
            //       <dd className="text-xl font-semibold">
            //         {author.twitter && (
            //           <Link
            //             href={author.twitter}
            //             className="text-gray-700 hover:underline dark:text-gray-300 "
            //           >
            //             {author.name}
            //           </Link>
            //         )}
            //       </dd>
            //     </div>
            //   </dl>
            // </li>
          ))}
        </div>
      </div>
    </div>
  );
}

// export default AuthorDetailsCard;
