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

function Main() {
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
    <Box>
      <Header />
      <Center mt="10%">
        <Box maxW="50%">
          <Heading align="center">
            Sell the One Product
            <br />
            that identifies yourself.
          </Heading>
          <Box mt="48px">
            <Text align="center">
              One9 is an online store, where people come together to make, sell,
              buy and collect unique items. Unlike others, we only let you sell the one
              piece you think represents you the most.
            </Text>
            <List spacing={3} align="center" mt="48px">
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                It takes less than a minute to have your One9 website up and running.
              </ListItem>
              <ListItem>
                <ListIcon as={MdLink} color="green.500" />
                You will be given a link you can share on your social platforms (Example).
              </ListItem>
              <ListItem>
                <ListIcon as={MdExtension} color="green.500" />
                You can decide to accept payments at any time.
              </ListItem>
              <ListItem>
                <ListIcon as={MdGroup} color="green.500" />
                We only store data about the item you are selling.
              </ListItem>
            </List>
          </Box>
          <Center mt="48px" mb="148px">
            <Link href="/editor/create">
              <Button colorScheme="teal" size="lg">
                Create your Store
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
