import React from 'react';
import {
  Box, Center, Heading, Divider, ListItem, VStack,
  Text, UnorderedList, Button, Link,
} from '@chakra-ui/react';
import Header from '../../components/Header';
import usei18n from '../../i18n/index';
import Footer from '../../components/Footer';

function Main() {
  const i18n = usei18n();

  return (
    <Box bg="primary.50" h="100vh">
      <Header />
      <Center h="80vh">
        <VStack>
          <Box
            bg="white"
            p="16px"
            mb="48px"
            rounded="md"
            boxShadow="2xl"
          >
            <Center mb="8px">
              <VStack>
                <Heading size="4xl">
                  {i18n.t('pricing.zero')}
                </Heading>
                <Text
                  fontWeight="semibold"
                >
                  {i18n.t('pricing.every')}
                </Text>
              </VStack>
            </Center>
            <Divider />
            <UnorderedList spacing={2} mt="8px">
              <ListItem>
                {i18n.t('pricing.listItem1')}
              </ListItem>
              <ListItem>
                {i18n.t('pricing.listItem2')}
                {' '}
                (
                <a href="https://stripe.com/pricing" target="_blank" rel="noreferrer">Stripe</a>
                ) *
              </ListItem>
              <ListItem>
                {i18n.t('pricing.listItem3')}
              </ListItem>
              <ListItem>
                {i18n.t('pricing.listItem4')}
              </ListItem>
            </UnorderedList>
          </Box>
          <Text fontSize="xs" mb="48px" w={['80%', '60%']}>
            *
            {' '}
            {i18n.t('pricing.footer1')}
          </Text>
          <Link href="/">
            <Button
              boxShadow="2xl"
              letterSpacing="wide"
              colorScheme="primaryImportantButton"
              color="white"
              size="lg"
            >
              {i18n.t('pricing.button')}
            </Button>
          </Link>
        </VStack>
      </Center>
      <Footer />
    </Box>
  );
}

export default Main;
