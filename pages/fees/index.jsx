import React from 'react';
import {
  Box, Center, Heading, List, ListItem, ListIcon,
} from '@chakra-ui/react';
import { MdCheckCircle, MdInfoOutline } from 'react-icons/md';
import Header from '../../components/Header';
import usei18n from '../../i18n/index';

function Main() {
  const i18n = usei18n();

  return (
    <Box bg="gray.50" h="100vh">
      <Header />
      <Center mt="5%">
        <Box maxW="60%">
          <Center mb="48px">
            <Heading>
              {i18n.t('fees.title')}
            </Heading>
          </Center>
          <List spacing={3} align="center">
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              {i18n.t('fees.listItem1')}
            </ListItem>
            <ListItem>
              <ListIcon as={MdInfoOutline} color="green.500" />
              {i18n.t('fees.listItem2')}
              {' '}
              (
              <a href="https://stripe.com/pricing" target="_blank" rel="noreferrer">Stripe</a>
              ).
            </ListItem>
            <ListItem>
              <ListIcon as={MdInfoOutline} color="green.500" />
              {i18n.t('fees.listItem3')}
            </ListItem>
          </List>
        </Box>
      </Center>
    </Box>
  );
}

export default Main;
