import React from 'react';
import {
  Box, VStack, Center, Link, Text, Heading, Button,
} from '@chakra-ui/react';
import usei18n from '../i18n/index';

export default function FourOhFour() {
  const i18n = usei18n();

  return (
    <>
      <Center bg="primary.50" h="100vh">
        <Box>
          <Heading as="h1" size="4xl">
            {i18n.t('fourOfFour.title')}
          </Heading>
          <Center>
            <VStack>
              <Text mt="48px">
                {i18n.t('fourOfFour.description')}
              </Text>
              <Link href="/">
                <Button
                  mt="8px"
                  colorScheme="primaryButton"
                  color="white"
                  variant="outline"
                >
                  {i18n.t('fourOfFour.button')}
                </Button>
              </Link>
            </VStack>
          </Center>
        </Box>
      </Center>
    </>
  );
}
