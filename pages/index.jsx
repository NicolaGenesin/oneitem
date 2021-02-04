import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {
  Box, Center, Heading, Button, Input, List, ListItem,
  ListIcon, HStack, Image, VStack, InputGroup, InputLeftAddon,
} from '@chakra-ui/react';
import {
  MdCheckCircle, MdExtension, MdGroup, MdLink,
} from 'react-icons/md';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fire from '../config/fire-config';
import usei18n from '../i18n/index';

function Main() {
  const i18n = usei18n();

  const [state, setState] = useState({ storeName: '', clicked: false });
  const isInvalid = !state.storeName && state.clicked;

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
      <HStack>
        <Box w="55%" minH="100vh" pl="5%" pr="5%" pt="8%">
          <Box>
            <Heading size="2xl" color="textColor.50">
              {i18n.t('homeSignedOut.titlePartOne')}
              <br />
              {i18n.t('homeSignedOut.titlePartTwo')}
            </Heading>
            <Box mt="48px" color="textColor.50">
              {/* <Text align="center">
                {i18n.t('homeSignedOut.description')}
              </Text> */}
              <List spacing={3} mt="48px">
                {/* <ListItem>
                  <ListIcon as={MdCheckCircle} color="primary.100" />
                  {i18n.t('homeSignedOut.listItem1')}
                </ListItem> */}
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
              <VStack w="80%">
                <InputGroup size="lg">
                  <InputLeftAddon
                    children="Your Shop Name"
                    fontWeight="semibold"
                  />
                  <Input
                    isInvalid={isInvalid}
                    placeholder="Vincent Lab"
                    bg="white"
                    onChange={(e) => { setState({ storeName: e.target.value, clicked: true }); }}
                  />
                </InputGroup>
                <Link href={state.storeName ? `/editor/?name=${state.storeName}` : ''} boxShadow="2xl">
                  <Button
                    boxShadow="dark-lg"
                    letterSpacing="wide"
                    colorScheme="primaryImportantButton"
                    color="white"
                    size="lg"
                    w="100%"
                  >
                    {i18n.t('homeSignedOut.buttonCreate')}
                  </Button>
                </Link>
              </VStack>
            </Box>
          </Box>
        </Box>
        <Box w="45%">
          <Image
            src="https://image.shutterstock.com/z/stock-photo-portrait-of-female-artisan-smiling-at-camera-while-working-with-leather-in-workshop-copy-space-1384220549.jpg"
            objectFit="cover"
            height="100vh"
          />
        </Box>
      </HStack>
      <Footer />
    </Box>
  );
}

export default Main;
