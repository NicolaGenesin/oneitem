import React from 'react';
import { useRouter } from 'next/router';
import {
  VStack, Center, Link, Text, Heading, Button,
} from '@chakra-ui/react';
import usei18n from '../../../../i18n/index';

export default function Success() {
  const i18n = usei18n();
  const { query } = useRouter();

  return (
    <>
      <Center bg="primary.50" h="100vh">
        <VStack>
          <Heading size="xl" mb="24px">
            {i18n.t('payment.success.title')}
            <br />
            {i18n.t('payment.success.subtitle')}
          </Heading>
          <Text mb="24px">
            {i18n.t('payment.success.description')}
          </Text>
          <Link href={`/${query.storeId}/${query.productId}/`}>
            <Button
              colorScheme="primaryButton"
              color="white"
              variant="solid"
            >
              {i18n.t('payment.success.button')}
            </Button>
          </Link>
        </VStack>
      </Center>
    </>
  );
}
