import React, { ReactNode, FC } from 'react'
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import cn from 'classnames';
import { CareerTreeType } from 'config/careers/careerType';
import useMountTransition from './useMountTransition';
import { Button, Text } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { convertNameToUrl, queryPathElementsById } from './careers/RenderFunctions';

type ContentDrawerProps = {
    careermap?: CareerTreeType[];
    name?: string;
    onClose?: () => void;
    isOpen?: boolean,
    children?: ReactNode,
    className?: string,
    position?: string,
    removeWhenClosed?: boolean
};

function createPortalRoot() {
    var drawerRoot = document.createElement('div');
    drawerRoot.setAttribute('id', 'drawer-root');

    return drawerRoot;
}

export function Drawer(props: ContentDrawerProps) {
    const { name, onClose, isOpen, children, className, position, removeWhenClosed } = props;

    if (!name) {
        return null;
    }

    const nameUrl = convertNameToUrl(name);

    if (typeof window === 'object') {
        var isDone = localStorage.getItem(nameUrl) === 'done';
        var bodyRef = useRef(document.querySelector('body'));
        var portalRootRef = useRef(document.getElementById('drawer-root') || createPortalRoot());
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
        }
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
        const onKeyPress = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            window.addEventListener('keyup', onKeyPress);
        }

        return () => {
            window.removeEventListener('keyup', onKeyPress);
        }
    }, [isOpen, onClose]);

    if (!isTransitioning && removeWhenClosed && !isOpen) {
        return null;
    }

    return createPortal(

        <FocusTrap active={isOpen}>
            <div
                aria-hidden={isOpen ? "false" : "true"}
                className={cn("drawer-container", {
                    open: isOpen,
                    in: isTransitioning,
                    className
                })}
            >
                <div className={cn("drawer", position)} role="dialog">
                    <div className='mt-[20px] justify-between items-center flex z-10'>
                        {!isDone && (
                            <Button
                                onClick={() => {
                                    localStorage.setItem(nameUrl, 'done');
                                    queryPathElementsById(nameUrl).forEach((item) =>
                                        item?.classList?.add('done')
                                    );
                                    onClose();
                                }}
                                colorScheme="green"
                                leftIcon={<CheckIcon />}
                                size="xs"
                                iconSpacing={0}
                            >
                                <Text
                                    as="span"
                                    d={['block', 'none', 'none', 'block']}
                                    ml="10px"
                                >
                                    Mark as Done
                                </Text>
                            </Button>
                        )}
                        {isDone && (
                            <Button
                                onClick={() => {
                                    localStorage.removeItem(nameUrl);
                                    queryPathElementsById(nameUrl).forEach((item) =>
                                        item?.classList?.remove('done')
                                    );
                                    onClose();
                                }}
                                colorScheme="red"
                                leftIcon={<RepeatIcon />}
                                size="xs"
                                iconSpacing={0}
                            >
                                <Text
                                    as="span"
                                    d={['block', 'none', 'none', 'block']}
                                    ml="10px"
                                >
                                    Mark as Pending
                                </Text>
                            </Button>
                        )}
                        <Button
                            onClick={onClose}
                            colorScheme="yellow"
                            ml="5px"
                            leftIcon={<CloseIcon width="8px" />}
                            iconSpacing={0}
                            size="xs"
                        >
                            <Text as="span" d={['none', 'none', 'none', 'block']} ml="10px">
                                Close
                            </Text>
                        </Button>
                    </div>
                    {children}
                </div>
                <div className="backdrop" onClick={onClose} />
            </div>
        </FocusTrap>,
        portalRootRef.current
    );
}