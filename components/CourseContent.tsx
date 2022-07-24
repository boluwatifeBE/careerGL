import Conditional from '@/components/Conditional';
import Link from '@/components/Link';
import type { Course, CourseContent } from 'config/courses';
import React, { ReactNode } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from '@chakra-ui/react';

interface CourseContentProps {
  course: Course;
}

function getSlug(course: string, slug: string): string {
  return `/courses/${course}/${slug}`;
}

export default function CourseContent(
  props: CourseContentProps,
): React.ReactElement {
  const { course } = props;
  const { content } = course;

  function renderCourseList(item: CourseContent): React.ReactNode {
    const { name, description, content } = item;

    // As title does not support React.ReactNode
    const title: ReactNode = (
      <span className='font-bold dark:text-white'>{name}</span>
    );

    return (
      <AccordionItem key={name}>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              {title}
              <Text>{description}</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Conditional condition={!!content}>
            {content?.map(({ name, slug }) => (
              <Link key={name} href={getSlug(course.slug, slug)}>
                <h3 className='my-2 text-lg text-gray-400 dark:text-gray-400'>
                  {name}
                </h3>
              </Link>
            ))}
          </Conditional>
        </AccordionPanel>
      </AccordionItem>
    );
  }

  return (
    <div className='pt-4 md:pt-8 xl:pt-12'>
      <Accordion allowMultiple>
        {React.Children.toArray(content.map(renderCourseList))}
      </Accordion>
    </div>
  );
}
