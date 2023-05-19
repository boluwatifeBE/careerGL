import React from 'react';
import { Badge } from '@chakra-ui/react';
import Link from '@/components/Link';

type BadgeLinkType = {
  // target: string;
  badgeText: string;
  href: string;
  colorScheme?: string;
  children: React.ReactNode;
};

export function BadgeLink(props: BadgeLinkType) {
  const {
    // target = '_blank',
    colorScheme = 'purple',
    badgeText,
    href,
    children,
  } = props;

  // Is external URL or is a media URL
  const isExternalUrl = /(^http(s)?:\/\/)|(\.(png|svg|jpeg|jpg)$)/.test(
    props.href,
  );

  const linkProps: Record<string, string> = {
    ...(isExternalUrl
      ? {
          rel: 'nofollow',
        }
      : {}),
  };

  return (
    <div className=''>
      <Link
        href={href}
        {...linkProps}
        className='  cursor-pointer  py-[10px] text-center text-sm !font-medium !text-slate-700 !no-underline hover:!text-slate-500 dark:!text-slate-300 dark:hover:!text-slate-100  '
      >
        <Badge fontSize='11px' mr='7px' colorScheme={colorScheme}>
          {badgeText}
        </Badge>
        {children}
      </Link>
    </div>
  );
}
