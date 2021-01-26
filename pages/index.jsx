import React, { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {
  Box, Center, Heading, Button, Text, List, ListItem, ListIcon,
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
      <Center mt="7%">
        <Box maxW="50%">
          <Heading align="center">
            {i18n.t('homeSignedOut.titlePartOne')}
            <br />
            {i18n.t('homeSignedOut.titlePartTwo')}
          </Heading>
          <Box mt="48px">
            <Text align="center">
              {i18n.t('homeSignedOut.description')}
            </Text>
            <List spacing={3} align="center" mt="48px">
              <ListItem>
                <ListIcon as={MdCheckCircle} color="primary.200" />
                {i18n.t('homeSignedOut.listItem1')}
              </ListItem>
              <ListItem>
                <ListIcon as={MdLink} color="primary.200" />
                {i18n.t('homeSignedOut.listItem2')}
              </ListItem>
              <ListItem>
                <ListIcon as={MdExtension} color="primary.200" />
                {i18n.t('homeSignedOut.listItem3')}
              </ListItem>
            </List>
          </Box>
          <Center mt="48px" mb="148px">
            <Link href="/editor/create">
              <Button bg="activeButton" color="black" size="lg">
                {i18n.t('homeSignedOut.buttonCreate')}
              </Button>
            </Link>
          </Center>
        </Box>
      </Center>
      <Footer />
    </Box>
  );
}

export default Main;
