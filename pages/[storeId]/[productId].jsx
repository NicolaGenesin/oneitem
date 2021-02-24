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

const ProductPage = ({ data, stripeAccountId }) => {
  const i18n = usei18n();

  useEffect(() => {
    if (!data.id) {
      Router.push('/404');
    }
  }, [data]);

  if (!data.id) {
    return <Loader />;
  }

  return (
    <Box>
      <Head>
        <title>
          {`ezyou - ${data.name}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Sell your handmade gift, vintage & on-trend clothes, unique jewelry, and more… lots more." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ezyou.shop/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.name} />
        <meta property="og:description" content={`Brought to you by ${data.author}`} />
        <meta property="og:image" content={data.images[0].data_url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ezyou.shop" />
        <meta property="twitter:url" content="https://ezyou.shop/" />
        <meta name="twitter:title" content={data.name} />
        <meta name="twitter:description" content={`Brought to you by ${data.author}`} />
        <meta name="twitter:image" content={data.images[0].data_url} />
      </Head>
      <VStack>
        <Product preview={false} product={data} stripeAccountId={stripeAccountId} />
        <Box>
          <Center p="16px" color="white">
            <Center>
              <Text mr="8px" fontSize="sm" color="black">
                {i18n.t('publicProduct.footer')}
              </Text>
            </Center>
            <Link p="4px" href="/">
              <Logo height="30px" />
            </Link>
          </Center>
        </Box>
      </VStack>
    </Box>
  );
};

ProductPage.getInitialProps = async function ({ query }) {
  try {
    const storeReference = fire.firestore()
      .collection('stores')
      .doc(query.storeId);

    const store = await storeReference.get();
    const storeData = store.data();

    if (storeData.productIds.includes(query.productId)) {
      const productReference = fire.firestore()
        .collection('products')
        .doc(query.productId);

      productReference.update({
        views: fire.firestore.FieldValue.increment(1),
      });

      const doc = await productReference.get();

      if (doc.exists) {
        const data = doc.data();

        let stripeAccountId;

        const canCreateCharges = storeData.stripe
          && storeData.stripe.account
          && storeData.stripe.account.chargesEnabled
          && storeData.stripe.account.detailsSubmitted;

        if (canCreateCharges && storeData.stripe.account) {
          stripeAccountId = storeData.stripe.account.id;
        }

        if (data.visible) {
          return {
            data,
            stripeAccountId,
          };
        }
      }
    }
  } catch (error) {}

  return { data: {} };
};

export default ProductPage;
