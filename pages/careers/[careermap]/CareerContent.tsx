import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { useEffect, useState } from 'react';
import { InferGetStaticPropsType } from 'next';
// import { getCareerContentByPath } from '@/lib/mdx';
import { getAllCareers } from 'config/careers/careerType';

const careermaps = getAllCareers();

// @ts-ignore
export async function getStaticProps(context) {
  const { params } = context;
  // console.log(params?.careermap);
  
  // const getCareerContent = await getCareerContentByPath('/careers/programming/100-frontend/content/readme.md');
  const pathString = '/careers/programming/100-frontend/content/readme.md';

  if (!pathString.endsWith('.mdx') || !pathString.endsWith('.md')) return;

  const pathsFilePath = pathString.replace(/^\//, '');
  const fileContent = fs.readFileSync(
      path.join(process.cwd(), 'data', pathsFilePath),
      'utf8'
  );

  const data = matter(fileContent);

  return {
    props: {
      content: data,
    },
  };

}

// export default function CareerContent(
//   props: InferGetStaticPropsType<typeof getStaticProps>
// ): React.ReactElement {
export default function CareerContent(
  item
) {
  // const { content } = item;
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(localStorage.getItem("path"));
  }, []);

  console.log(item.path);

  return (
    <>
      {item.path}
    </>
  );
}
