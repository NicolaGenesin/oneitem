import React from 'react';
import { isMobile } from 'react-device-detect';
import {
  Box, Heading, Text, Link, Button,
  HStack, Image,
} from '@chakra-ui/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import usei18n from '../../i18n/index';

function Main() {
  const i18n = usei18n();

  return (
    <Box bg="primary.50">
      <Header />
      <HStack spacing={0} align>
        <Box
          flex="1"
          minH="100%"
          ml="5%"
          mr="5%"
          pt={['8%', '4%']}
        >
          <Box>
            <Heading size="2xl" color="textColor.50">
              {i18n.t('about.title1')}
            </Heading>
            <Box mt="24px" color="textColor.50">
              <Text>
                {i18n.t('about.description1')}
              </Text>
            </Box>
          </Box>
          <Box pt="24px">
            <Heading size="2xl" color="textColor.50">
              {i18n.t('about.title2')}
            </Heading>
            <Box mt="24px" color="textColor.50">
              <Text>
                {i18n.t('about.description2')}
                {' '}
                <u>
                  <Link href="pera-lab-eco-leather-backpack" target="_blank">
                    {i18n.t('about.description2link')}
                  </Link>
                </u>
              </Text>
            </Box>
          </Box>
          <Box pt="24px">
            <Heading size="2xl" color="textColor.50">
              {i18n.t('about.title3')}
            </Heading>
            <Box mt="24px" color="textColor.50">
              <Text>
                {i18n.t('about.description3')}
              </Text>
            </Box>
          </Box>
          <Box pt="24px" mb="64px">
            <Heading size="2xl" mb="24px" color="textColor.50">
              {i18n.t('about.title4')}
            </Heading>
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
          </Box>
        </Box>
        {!isMobile && (
        <Box
          flex="1"
          h="100%"
          background="primary.200"
          w="100px"
        >
          <Image
            src="assets/about-01.jpg"
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
