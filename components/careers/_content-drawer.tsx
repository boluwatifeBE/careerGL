import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { RemoveScroll } from 'react-remove-scroll';
import { CheckIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { queryPathElementsById } from './RenderFunctions';
import { CareerTreeType } from 'config/careers/careerType';
import { ReactNode } from 'react';

type ContentDrawerProps = {
  careermap?: CareerTreeType[];
  pathId?: string;
  onClose?: () => void;
  isOpen?: boolean,
  children?: ReactNode,
  className?: string,
  removeWhenClosed?: boolean
};

export function ContentDrawer(props: ContentDrawerProps) {
  const { careermap, pathId, onClose, isOpen, children, className, removeWhenClosed } = props;

  if (!pathId) {
    return null;
  }

  if (typeof window === 'object') {
    var isDone = localStorage.getItem(pathId) === 'done';
  }

  return (
    <Box zIndex={99999} pos="relative">
      <Box
        onClick={onClose}
        pos="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="black"
        opacity={0.4}
      />
      <RemoveScroll allowPinchZoom>
        <Box
          p="0px 30px 30px"
          position="fixed"
          w={['100%', '60%', '40%']}
          bg="white"
          top={0}
          right={0}
          bottom={0}
          borderLeftWidth={'1px'}
          overflowY="scroll"
        >
          <Flex
            mt="20px"
            justifyContent="space-between"
            alignItems="center"
            zIndex={1}
          >
            {!isDone && (
              <Button
                onClick={() => {
                  localStorage.setItem(pathId, 'done');
                  queryPathElementsById(pathId).forEach((item) =>
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
                  localStorage.removeItem(pathId);
                  queryPathElementsById(pathId).forEach((item) =>
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
          </Flex>
          {/* <CareerSingle roadmap={careermap} group={pathId} /> */}
        </Box>
      </RemoveScroll>
    </Box>
  );
}
