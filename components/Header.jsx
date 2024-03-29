import React from 'react';
import {
  Flex, Button, Center, Link,
  HStack, useDisclosure, Spacer,
} from '@chakra-ui/react';
import usei18n from '../i18n/index';
import LoginModal from './LoginModal';
import Logo from './Logo';

const Header = (props) => {
  const i18n = usei18n();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      wrap="wrap"
      pt="1.5rem"
      pb="1.5rem"
      pl="5%"
      pr="5%"
      color="white"
      {...props}
    >
      {LoginModal(isOpen, onOpen, onClose)}
      <HStack w="100%">
        <Link ml="-6px" mt="4px" href="/">
          <Logo w="300px" height="50px" />
        </Link>
        <Spacer />
        <Center>
          <HStack
            spacing={5}
            align="stretch"
          >
            <Center>
              <Link
                color="textColor.50"
                href="/about"
                fontWeight="semibold"
                letterSpacing="wide"
              >
                {i18n.t('header.aboutus')}
              </Link>
            </Center>
            <Center>
              <Link
                color="textColor.50"
                href="/pricing"
                fontWeight="semibold"
                letterSpacing="wide"
              >
                {i18n.t('header.pricing')}
              </Link>
            </Center>
            <Button
              letterSpacing="wide"
              colorScheme="primaryImportantButton"
              onClick={onOpen}
            >
              {i18n.t('header.manage')}
            </Button>
          </HStack>
        </Center>
      </HStack>
    </Flex>
  );
};

export default Header;
