import React, { useEffect } from 'react';
import Router from 'next/router';
import {
  Box, Divider, Center, Link, Text,
} from '@chakra-ui/react';
import ProductPage from './product';
import fire from '../config/fire-config';
import usei18n from '../i18n/index';

const PublicProductPage = (props) => {
  const i18n = usei18n();

  useEffect(() => {
    if (!props.id) {
      Router.push('/404');
    }
  }, [props]);

  return (
    <Box>
      <ProductPage preview={false} product={props} />
      <Divider orientation="horizontal" />
      <Box backgroundColor="gray.900">
        <Center p="16px" color="white">
          <Center>
            <Text mr="8px" fontSize="sm">
              {i18n.t('publicProduct.footer')}
            </Text>
          </Center>
          <Box bg="tomato" rounded="md">
            <Link p="4px" href="/">
              one9.com
            </Link>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

PublicProductPage.getInitialProps = async function ({ query }) {
  const productReference = fire.firestore()
    .collection('products')
    .doc(query.productId);

  productReference.update({
    views: fire.firestore.FieldValue.increment(1),
  });

  const doc = await productReference.get();

  if (doc.exists) {
    const data = doc.data();

    if (data.visible) {
      return { ...data };
    }
  }

  return {};
};

export default PublicProductPage;
