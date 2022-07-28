import { Toc } from 'types/Toc';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TOCInlineProps {
  toc: Toc;
  indentDepth?: number;
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
}

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {TOCInlineProps} {
 *   toc,
 *   indentDepth = 3,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 * }
 *
 */
const TOCInline = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
}: TOCInlineProps) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i');

  const filteredToc = toc.filter(
    heading =>
      heading.depth >= fromHeading &&
      heading.depth <= toHeading &&
      !re.test(heading.value),
  );

  const tocList = (
    <ul>
      {filteredToc.map(heading => (
        <li
          key={heading.value}
          className={`${heading.depth >= indentDepth && 'ml-6'}`}
        >
          <a className='!no-underline' href={heading.url}>
            {heading.value}
          </a>
        </li>
      ))}
    </ul>
  );

  const title: ReactNode = (
    <span className='font-bold dark:text-white'>Table of Contents</span>
  );

  const renderTOC = toc.length >= 1;

  return (
    <>
      {asDisclosure && renderTOC ? (
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  {title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{tocList}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        tocList
      )}
    </>
  );
};

export default TOCInline;
