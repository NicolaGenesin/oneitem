import React from 'react';
import {
  Box, Center, Heading, List, ListItem, ListIcon,
} from '@chakra-ui/react';
import { MdCheckCircle, MdInfoOutline } from 'react-icons/md';
import Header from '../Header';

function Main() {
  return (
    <div>
      <Header />
      <Center mt="5%">
        <Box maxW="60%">
          <Center mb="48px">
            <Heading>
              Fees
            </Heading>
          </Center>
          <List spacing={3} align="center">
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              There are no monthly costs associated with One9.
            </ListItem>
            <ListItem>
              <ListIcon as={MdInfoOutline} color="green.500" />
              Each transaction has a standard 2.9% + ~0.3$ fee set by the payment processor (
              <a href="https://stripe.com/pricing">Stripe</a>
              ).
            </ListItem>
            <ListItem>
              <ListIcon as={MdInfoOutline} color="green.500" />
              One9 will take a 1% transaction fee on every
              sale made on pages created after June 1st 2021.
            </ListItem>
          </List>
        </Box>
      </Center>
    </div>
  );
}

export default Main;
