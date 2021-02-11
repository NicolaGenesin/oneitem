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
      <HStack>
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

                  <Link href="todo/todo-1" target="_blank">
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
          <Link href="/">
            <Button
              mt="48px"
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
        {!isMobile && (
        <Box flex="1">
          <Image
            src="https://image.shutterstock.com/z/stock-photo-portrait-of-female-artisan-smiling-at-camera-while-working-with-leather-in-workshop-copy-space-1384220549.jpg"
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
