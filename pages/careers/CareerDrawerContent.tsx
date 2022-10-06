import MdRenderer from "@/components/md-renderer";
import { EditContentPageLink } from "@/components/careers/edit-content-page-link";
import siteMetadata from "@/data/siteMetadata";

type ContentProps = {
  path?: string;
};

//@ts-ignore
function CareerDrawerContent(props: ContentProps) {
  const { path } = props;

  if (!path) {
    return null;
  }

  // Remove trailing slashes
  const contentsPathsFilePath = path.replace(/^\//, "");
  if (
    !contentsPathsFilePath.endsWith(".mdx") &&
    !contentsPathsFilePath.endsWith(".md")
  ) {
    return null;
  }
  const Content = require(`../../data/${contentsPathsFilePath}`).default;

  console.log(Content);

  return (
    <div className="">
      <MdRenderer>
        <Content />
        <EditContentPageLink
          href={`${siteMetadata.url.repoData}/${contentsPathsFilePath}`}
        />
      </MdRenderer>
    </div>
  );
}

export default CareerDrawerContent;
