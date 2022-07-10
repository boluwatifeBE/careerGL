import Link from '@/components/Link';
import kebabCase from '@/lib/utils/kebabCase';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      className='mr-2 rounded border border-gray-500 py-1 px-2 text-sm font-normal capitalize  text-gray-500 hover:border-appColor-200  hover:text-appColor-200 dark:border-gray-400  dark:text-gray-400 dark:hover:border-appColor-200 dark:hover:text-appColor-200'
      href={`/tags/${kebabCase(text)}`}
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
