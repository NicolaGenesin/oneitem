import React, { useEffect } from 'react';
import Router from 'next/router';
import {
  Box, Center, Link, Text, VStack, Spacer,
} from '@chakra-ui/react';
import Head from 'next/head';
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
    <Box>
      <Head>
        <title>ezyou</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="ezyou online shop" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ezyou.shop" />
        {/* <meta property="og:image" content={props.images[0].data_url} /> */}
        <meta property="og:image" content="https://cdn.obag.filoblu.com/media/catalog/product/cache/25162cc576cf81151d28507649e6339b/c/d/cd152e31ae9716767c433ab9fd7f71b5.png" />
        {/* <meta property="og:image:type" content="image/jpeg" /> */}
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:description" content="Site description" />
      </Head>
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
    </Box>
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
