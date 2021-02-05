import React, { useEffect } from 'react';
import Router from 'next/router';
import {
  Box, Center, Link, Text, VStack, Spacer,
} from '@chakra-ui/react';
import Product from '../../components/Product';
import fire from '../../config/fire-config';
import usei18n from '../../i18n/index';
import Logo from '../../components/Logo';

const ProductPage = (props) => {
  const i18n = usei18n();

  useEffect(() => {
    if (!props.id) {
      Router.push('/404');
    }
  }, [props]);

  return (
    <VStack>
      <Product preview={false} product={props} />
      <Box>
        <Center p="16px" color="white">
          <Center>
            <Text mr="8px" fontSize="sm" color="black">
              {i18n.t('publicProduct.footer')}
            </Text>
          </Center>
          <Link p="4px" href="/">
            <Logo width="60px" height="20px" />
          </Link>
        </Center>
      </Box>
    </VStack>
  );
};

ProductPage.getInitialProps = async function ({ query }) {
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

export default ProductPage;
