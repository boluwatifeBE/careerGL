/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';
import CustomLink from './Link';
import TOCInline from './TOCInline';
import Pre from './Pre';
import { BlogNewsletterForm } from './NewsletterForm';
import { Code } from '@chakra-ui/react';
// import { P } from './mdx-components/p';
// import Headings from './mdx-components/heading';
// import { Pre } from './mdx-components/pre';
// import BlockQuote from './mdx-components/blockquote';
// import { Table } from './mdx-components/table';
// import IFrame from './mdx-components/iframe';
// import { Img } from './mdx-components/img';
// import EnrichedLink from './mdx-components/a';
// import { Li, Ul } from './mdx-components/ul';
import PremiumBlock from './mdx-components/premium-block';
import { BadgeLink } from './mdx-components/badge-link';
import { ResourceGroupTitle } from './mdx-components/resource-group-title';

const Wrapper: React.ComponentType<{ layout: string }> = ({
  layout,
  ...rest
}) => {
  const Layout = require(`../layouts/${layout}`).default;
  return <Layout {...rest} />;
};

export const MDXComponents: ComponentMap = {
  Image,
  //@ts-ignore
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  //@ts-ignore
  BlogNewsletterForm,
  code: Code,
  BadgeLink: BadgeLink,
  ResourceGroupTitle: ResourceGroupTitle,
  PremiumBlock: PremiumBlock,
};

interface Props {
  layout: string;
  mdxSource: string;
  [key: string]: unknown;
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
