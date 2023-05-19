/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';
import CustomLink from './Link';
// import TOCInline from './TOCInline';
import Pre from './Pre';
import { BlogNewsletterForm } from './NewsletterForm';
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
  //@ts-ignore
  PremiumBlock: PremiumBlock,
  pre: Pre,
  wrapper: Wrapper,
  BlogNewsletterForm,
  a: CustomLink,
  Image,
  // TOCInline,
  BadgeLink: BadgeLink,
  ResourceGroupTitle: ResourceGroupTitle,
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
