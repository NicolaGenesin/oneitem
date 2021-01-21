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
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      {LoginModal(isOpen, onOpen, onClose)}

      <Link href="/">
        <Heading as="h1" size="lg" letterSpacing="-.1rem">
          One9
        </Heading>
      </Link>

      <Center>
        <HStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={10}
          align="stretch"
        >
          <Link href="/about">
            Examples
          </Link>
          <Link href="/fees">
            Fees
          </Link>
        </HStack>
      </Center>

      <Box>
        <Button bg="transparent" border="1px" onClick={onOpen}>
          Manage your Store
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
