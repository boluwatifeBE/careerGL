import React, { ReactNode } from 'react';
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import cn from 'classnames';
import useMountTransition from './useMountTransition';

import {
  HiCheck as CheckIcon,
  HiRefresh as RepeatIcon,
  HiX as CloseIcon,
} from 'react-icons/hi';
import {
  convertNameToUrl,
  getFromLocalStorage,
  queryPathElementsById,
} from './careers/RenderFunctions';
import { DrawerTextualContent } from 'pages/careers/DrawerTextualContent';

type ContentDrawerProps = {
  path?: string;
  name?: string;
  onClose?: () => void;
  isOpen?: boolean;
  children?: ReactNode;
  className?: string;
  position?: string;
  removeWhenClosed?: boolean;
};

function createPortalRoot() {
  var drawerRoot = document.createElement('div');
  drawerRoot.setAttribute('id', 'drawer-root');

  return drawerRoot;
}

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

  if (!name) {
    return null;
  }

  const nameUrl = convertNameToUrl(name);
  const isDone = getFromLocalStorage(nameUrl) === 'done';

  if (typeof window === 'object') {
    var bodyRef = useRef(document.querySelector('body'));
    var portalRootRef = useRef(
      document.getElementById('drawer-root') || createPortalRoot(),
    );
  }

  const isTransitioning = useMountTransition(isOpen, 300);

  // Append portal root on mount
  useEffect(() => {
    bodyRef.current.appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = bodyRef.current;
    return () => {
      // Clean up the portal when drawer component unmounts
      portal.remove();
      // Ensure scroll overflow is removed
      bodyEl.style.overflow = '';
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
      <div className='backdrop' onClick={onClose} />
    </div>,
    portalRootRef.current,
  );
}

type BtnProps = {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
};

export const IconButton = (props: BtnProps) => {
  const { onClick, children, className } = props;
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};
