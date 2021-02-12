import React, { useEffect } from 'react';
import Router from 'next/router';
import {
  Box, Center, Link, Text, VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import Loader from 'react-spinners/BarLoader';
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

  if (!props.id) {
    return <Loader />;
  }

  return (
    <Box>
      <Head>
        <title>
          {`ezyou - ${props.name}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={props.name} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ezyou.shop" />
        <meta property="og:image" content={props.images[0].data_url} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:description" content="Welcome to ezyou" />
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
