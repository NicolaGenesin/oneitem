import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Router from 'next/router';
import {
  Box, Heading, Button, Input, List, ListItem,
  ListIcon, HStack, Image, VStack, InputGroup, InputLeftAddon,
  Alert, AlertIcon, Text,
} from '@chakra-ui/react';
import {
  MdExtension, MdLink,
} from 'react-icons/md';
import {
  IoShapesSharp,
} from 'react-icons/io5';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fire from '../config/fire-config';
import usei18n from '../i18n/index';

const canUseName = async (storeName) => {
  if (!storeName) {
    return false;
  }

  const storeRef = fire.firestore().collection('stores').doc(storeName.replace(/[^A-Z0-9]/ig, '-').toLowerCase());
  const doc = await storeRef.get();

  if (!doc.exists) {
    return true;
  }

  return !doc.data().hasCreatedAccount;
};

function Main() {
  const i18n = usei18n();
  const [state, setState] = useState({ storeName: '', clicked: false });
  const [isNameAvailable, setIdAvailability] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isInvalid = (!state.storeName && state.clicked) || !isNameAvailable;

  useEffect(() => {
    if (fire) {
      if (fire.auth().currentUser) {
        Router.push('/home');
      } else {
        fire.auth().onAuthStateChanged((user) => {
          if (user) {
            Router.push('/home');
          }
        });
      }
    }
  });

  return (
    <Box bg="primary.50">
      <Header />
      <HStack align>
        <Box
          flex="1"
          textAlign={['center', 'left']}
          minH="100%"
          pl="5%"
          pr="5%"
          pb="20%"
        >
          <Box pt={['8%', '10%']}>
            <Heading size="2xl" color="textColor.50">
              {i18n.t('homeSignedOut.titlePartOne')}
              <br />
              {i18n.t('homeSignedOut.titlePartTwo')}
            </Heading>
            <Box mt="48px" color="textColor.50">
              <List spacing={3} mt="48px">
                <ListItem>
                  <ListIcon as={IoShapesSharp} color="textColor.50" />
                  {i18n.t('homeSignedOut.listItem1')}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdLink} color="textColor.50" />
                  {i18n.t('homeSignedOut.listItem2')}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdExtension} color="textColor.50" />
                  {i18n.t('homeSignedOut.listItem3')}
                </ListItem>
              </List>
            </Box>
            <Box mt="48px">
              <VStack w={['100%', '80%']}>
                <InputGroup size="lg">
                  <InputLeftAddon
                    children={i18n.t('homeSignedOut.inputLeftAddon')}
                    fontWeight="semibold"
                  />
                  <Input
                    ref={(input) => input && input.focus()}
                    isInvalid={isInvalid}
                    placeholder="Vincent Lab"
                    bg="white"
                    onChange={(e) => { setState({ storeName: e.target.value, clicked: true }); }}
                  />
                </InputGroup>
                {!isNameAvailable
                  && (
                    <Alert status="error" rounded="md" mt="16px">
                      <AlertIcon />
                      <Box>
                        <Text fontSize="sm">
                          {i18n.t('homeSignedOut.nameNotAvailable')}
                        </Text>
                      </Box>
                    </Alert>
                  )}
                <Button
                  boxShadow="dark-lg"
                  letterSpacing="wide"
                  colorScheme="primaryImportantButton"
                  color="white"
                  size="lg"
                  w="100%"
                  isLoading={isLoading}
                  onClick={async () => {
                    setIsLoading(true);

                    if (await canUseName(state.storeName)) {
                      Router.push(state.storeName ? `/editor/?name=${state.storeName}` : '');
                    } else {
                      setIsLoading(false);
                      setIdAvailability(false);
                    }
                  }}
                >
                  {i18n.t('homeSignedOut.buttonCreate')}
                </Button>
              </VStack>
            </Box>
          </Box>
        </Box>
        {!isMobile && (
        <Box
          flex="1"
          background="primary.200"
        >
          <Image
            src="assets/home-01.jpg"
            objectFit="cover"
            height="100vh"
          />
        </Box>
        )}
      </HStack>
      <Footer />
    </Box>
  );
}

export default Main;
