import React from 'react';
import {
  Box, Heading, Flex, Text, Button, Center, Link, HStack, StackDivider, useDisclosure,
} from '@chakra-ui/react';
import usei18n from '../i18n/index';
import LoginModal from './LoginModal';

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = (props) => {
  const i18n = usei18n();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      wrap="wrap"
      padding="1.5rem"
      bg="primary.300"
      color="white"
      {...props}
    >
      {LoginModal(isOpen, onOpen, onClose)}
      <Box w="100%">
        <Center>
          <HStack
            divider={<StackDivider borderColor="primary.200" />}
            spacing={10}
            align="stretch"
          >
            <Link href="/">
              <Heading as="h1" size="lg" letterSpacing="-.1rem">
                ezYou
              </Heading>
            </Link>
            {/* <Link href="/about">
            Examples
          </Link> */}
            <Center>
              <Link href="/fees">
                {i18n.t('header.fees')}
              </Link>
            </Center>
            <Button colorScheme="outlineButton" variant="outline" onClick={onOpen}>
              {i18n.t('header.manage')}
            </Button>
          </HStack>
        </Center>
      </Box>
    </Flex>
  );
};

export default Header;
