import MdRenderer from '@/components/md-renderer';
import { EditContentPageLink } from '@/components/careers/edit-content-page-link';
import siteMetadata from '@/data/siteMetadata';

type ContentProps = {
  path?: string;
};

//@ts-ignore
export function DrawerTextualContent(props: ContentProps) {
  const { path } = props;

  if (!path) {
    return null;
  }

  // Remove trailing slashes
  const contentsPathsFilePath = path.replace(/^\//, '');
  const Content = require(`../../data/${contentsPathsFilePath}`).default;
  if (!contentsPathsFilePath.endsWith('.mdx')) return;

  return (
    <div className=''>
      <MdRenderer>
        <Content />
        <EditContentPageLink
          href={`${siteMetadata.url.repoData}/${contentsPathsFilePath}`}
        />
      </MdRenderer>
    </div>
  );
}
