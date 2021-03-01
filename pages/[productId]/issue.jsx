import React from 'react';
import { useRouter } from 'next/router';
import {
  VStack, Center, Link, Text, Heading, Button,
} from '@chakra-ui/react';
import usei18n from '../../i18n/index';

export default function Issue() {
  const i18n = usei18n();
  const { query } = useRouter();

  return (
    <>
      <Center bg="primary.50" h="100vh">
        <VStack w={['90%', '70%']}>
          <Heading size="xl" mb="24px" textAlign="center">
            {i18n.t('payment.issue.title')}
            <br />
            {i18n.t('payment.issue.subtitle')}
          </Heading>
          <Text mb="24px">
            {i18n.t('payment.issue.description')}
          </Text>
          <Link href={`/${query.productId}/`}>
            <Button
              colorScheme="primaryButton"
              color="white"
              variant="solid"
            >
              {i18n.t('payment.issue.button')}
            </Button>
          </Link>
        </VStack>
      </Center>
    </>
  );
}
