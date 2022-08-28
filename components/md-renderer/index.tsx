import React from 'react';
// @ts-ignore
import { MDXProvider } from '@mdx-js/react';
import { ChakraProvider } from '@chakra-ui/react';
import { careermapTheme } from '../../styles/theme';
import MdxComponents from '../mdx-components';

export default function MdRenderer({ children }) {
  return (
    <ChakraProvider theme={careermapTheme} resetCSS>
      <article className='prose dark:prose-dark  '>
        <MDXProvider components={MdxComponents}>{children}</MDXProvider>
      </article>
    </ChakraProvider>
  );
}
