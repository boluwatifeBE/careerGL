import Link from '@/components/Link';
import kebabCase from '@/lib/utils/kebabCase';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/topics/${kebabCase(text)}`}>
      <span className='rounded px-2 py-1 hover:bg-useGL-secondary/20 dark:hover:bg-useGL-darkSecondary/20'>
        {text.split(' ').join('-')}
      </span>
    </Link>
  );
};

export default Tag;
