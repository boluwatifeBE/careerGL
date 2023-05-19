import fs from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import readingTime from 'reading-time';
import { AuthorFrontMatter } from '@/types/AuthorFrontMatter';
import { PostFrontMatter } from '@/types/PostFrontMatter';
import { Toc } from '@/types/Toc';
import getAllFilesRecursively from './utils/files';
// Remark packages
import remarkFootnotes from 'remark-footnotes';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkCodeTitles from './remark-code-title';
import remarkExtractFrontmatter from './remark-extract-frontmatter';
import remarkImgToJsx from './remark-img-to-jsx';
import remarkTocHeadings from './remark-toc-headings';
// Rehype packages
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCitation from 'rehype-citation';
import rehypeKatex from 'rehype-katex';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
//  Custom functions & types
import { CareerMapType, CareerTreeType } from '@/config/careers/careerType';
import { DirRoot } from '@/types/enums';

const root = process.cwd();

export function getFiles(type: string) {
  const prefixPaths = path.join(root, DirRoot.DATA, type);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map(file =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, '/'),
  );
}

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md|json)/, '');
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export async function getFileBySlug<T>(type: string, slug: string | string[]) {
  const mdxPath = path.join(root, DirRoot.DATA, type, `${slug}.mdx`);
  const mdPath = path.join(root, DirRoot.DATA, type, `${slug}.md`);
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8');

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      'node_modules',
      'esbuild',
      'esbuild.exe',
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      'node_modules',
      'esbuild',
      'bin',
      'esbuild',
    );
  }

  const toc: Toc = [];

  const { code, frontmatter } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, 'components'),
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkExtractFrontmatter,
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypeCitation, { path: path.join(root, DirRoot.DATA) }],
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ];
      return options;
    },
    esbuildOptions: options => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      };
      return options;
    },
  });

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  };
}

export async function getAllFilesFrontMatter(folder: string) {
  const prefixPaths = path.join(root, DirRoot.DATA, folder);
  const files = getAllFilesRecursively(prefixPaths);
  const allFrontMatter: PostFrontMatter[] = [];

  files.forEach((file: string) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/');
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return null;
    }
    const source = fs.readFileSync(file, 'utf8');
    const matterFile = matter(source);
    const frontmatter = matterFile.data as AuthorFrontMatter | PostFrontMatter;
    if ('draft' in frontmatter && frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : null,
      });
    }
  });

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}

export function readCareerContentsFilePath(
  careermaps: CareerMapType[],
  pageId: string,
): CareerTreeType[] {
  const careerFilePath = careermaps.find(
    career => career.id === pageId,
  ).contentPathsFilePath;

  if (!careerFilePath) {
    return null;
  }

  // Remove trailing slashes
  const contentsPathsFilePath = careerFilePath.replace(/^\//, '');
  const filePath = path.join(root, DirRoot.DATA, contentsPathsFilePath);

  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    return null;
  }
}

export const getContentPathString = (array): string => {
  let contentStringArray;
  array.map(path => {
    const splitString = formatSlug(path).split('/');
    const removeIndex = splitString.splice(1);
    const getContentStringArray = removeIndex.slice(0, 4).join('/');
    contentStringArray = getContentStringArray;
  });

  if (contentStringArray === undefined) {
    return '';
  }
  return contentStringArray;
};