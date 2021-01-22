import React from 'react';
import {
  Box, Heading, Flex, Text, Button, Center, Link, HStack, StackDivider, useDisclosure,
} from '@chakra-ui/react';

import LoginModal from './LoginModal';

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.900"
      color="white"
      {...props}
    >
      {LoginModal(isOpen, onOpen, onClose)}
      <Box w="100%">
        <Center>
          <HStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={10}
            align="stretch"
          >
            <Link href="/">
              <Heading as="h1" size="lg" letterSpacing="-.1rem">
                One9
              </Heading>
            </Link>
            {/* <Link href="/about">
            Examples
          </Link> */}
            <Center>
              <Link href="/fees">
                Fees
              </Link>
            </Center>
            <Button bg="transparent" border="1px" onClick={onOpen}>
              Manage your Store
            </Button>
          </HStack>
        </Center>
      </Box>
    </Flex>
  );
};

export default Header;
