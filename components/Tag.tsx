import Link from '@/components/Link';
import kebabCase from '@/lib/utils/kebabCase';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/topics/${kebabCase(text)}`}>{text.split(' ').join('-')}</Link>
  );
};

export default Tag;
