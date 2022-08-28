import React from 'react';
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import useMountTransition from './useMountTransition';

import {
  HiCheck as CheckIcon,
  HiRefresh as RepeatIcon,
  HiX as CloseIcon,
} from 'react-icons/hi';
import {
  convertNameToUrl,
  getBodyRef,
  getFromLocalStorage,
  getPortalRootRef,
  queryPathElementsById,
} from './careers/RenderFunctions';
import DrawerTextualContent from 'pages/careers/DrawerTextualContent';

type ContentDrawerProps = {
  path?: string;
  name?: string;
  onClose?: () => void;
  isOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
  position?: string;
  removeWhenClosed?: boolean;
};

export function Drawer(props: ContentDrawerProps) {
  const {
    onClose,
    isOpen,
    children,
    className,
    position,
    removeWhenClosed,
    path,
    name,
  } = props;

  const bodyRef = useRef(getBodyRef());
  const portalRootRef = useRef(getPortalRootRef());

  // const bodyRef = useRef(document.querySelector('body'));
  // const portalRootRef = useRef(
  //   document.getElementById('drawer-root') || createPortalRoot(),
  // );

  const nameUrl = convertNameToUrl(name);
  const isDone = getFromLocalStorage(nameUrl) === 'done';

  // let bodyRef: MutableRefObject<HTMLElement>;
  // let portalRootRef: MutableRefObject<HTMLElement>;

  // if (typeof window === 'object') {
    // const bodyRef = (typeof window === 'object') && useRef(document.querySelector('body'));
    // const portalRootRef = (typeof window === 'object') && useRef(
    //   document.getElementById('drawer-root') || createPortalRoot(),
    // );
  // }

  const isTransitioning = useMountTransition(isOpen, 300);

  // Append portal root on mount
  useEffect(() => {
    bodyRef.current.appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyElement = bodyRef.current;
    return () => {
      // Clean up the portal when drawer component unmounts
      portal.remove();
      // Ensure scroll overflow is removed
      bodyElement.style.overflow = '';
    };
  }, []);

  // Prevent page scrolling when the drawer is open
  useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen) {
        bodyRef.current.style.overflow = 'hidden';
      } else {
        bodyRef.current.style.overflow = '';
      }
    };
    updatePageScroll();
  }, [isOpen]);

  // Allow Escape key to dismiss the drawer
  useEffect(() => {
    const onKeyPress = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keyup', onKeyPress);
    }

    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  if (!name) {
    return null;
  }

  return createPortal(
    <div
      aria-hidden={isOpen ? 'false' : 'true'}
      className={cn('drawer-container', {
        open: isOpen,
        in: isTransitioning,
        className,
      })}
    >
      <div
        className={cn('drawer px-6 dark:bg-gray-800 sm:w-[600px]', position)}
        role='dialog'
      >
        <div className='z-10 mt-[20px] mb-10 flex items-center justify-between'>
          {!isDone && (
            <IconButton
              onClick={() => {
                localStorage.setItem(nameUrl, 'done');
                queryPathElementsById(nameUrl).forEach(item =>
                  item?.classList?.add('done'),
                );
                onClose();
              }}
              className='flex cursor-pointer items-center space-x-1 rounded  bg-green-700 px-2 py-1'
            >
              <CheckIcon size={18} color='white' />
              <span className='text-sm text-white'>Mark as Done</span>
            </IconButton>
          )}
          {isDone && (
            <IconButton
              onClick={() => {
                localStorage.removeItem(nameUrl);
                queryPathElementsById(nameUrl).forEach(item =>
                  item?.classList?.remove('done'),
                );
                onClose();
              }}
              className='flex cursor-pointer items-center space-x-1 rounded  bg-red-700 px-2 py-1'
            >
              <RepeatIcon size={18} color='white' />
              <span className='text-sm text-white'>Mark as Pending</span>
            </IconButton>
          )}
          <IconButton
            onClick={onClose}
            className=' flex cursor-pointer items-center space-x-1 '
          >
            <CloseIcon size={20} className='' />
            <span className='hidden sm:block'>Close</span>
          </IconButton>
        </div>

        <DrawerTextualContent path={path} />

        {children}
      </div>
      <div aria-hidden className='backdrop' onClick={onClose} />
    </div>,
    portalRootRef.current,
  );
}

type BtnProps = {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

export const IconButton = (props: BtnProps) => {
  const { onClick, children, className } = props;
  return (
    <div aria-hidden onClick={onClick} className={className}>
      {children}
    </div>
  );
};
