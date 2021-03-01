import React from 'react';
import { useRouter } from 'next/router';
import {
  VStack, Center, Link, Text, Heading, Button,
} from '@chakra-ui/react';
import usei18n from '../../i18n/index';
import fire from '../../config/fire-config';

const Success = ({}) => {
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
          <Link href={`/${query.productId}/`}>
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
};

Success.getInitialProps = async function ({ query }) {
  try {
    const productReference = fire.firestore()
      .collection('products')
      .doc(query.productId);

    productReference.update({
      quantity: fire.firestore.FieldValue.increment(-1),
    });
  } catch (error) {}

  return {};
};

export default Success;
