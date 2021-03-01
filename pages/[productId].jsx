import React, { useEffect } from 'react';
import Router from 'next/router';
import {
  Box, Spacer, Text, HStack, VStack, Center, Link,
} from '@chakra-ui/react';
import {
  EmailShareButton, FacebookShareButton,
  PinterestShareButton, RedditShareButton, TelegramShareButton,
  TumblrShareButton, TwitterShareButton, WhatsappShareButton,
  FacebookIcon, TwitterIcon, PinterestIcon, TelegramIcon,
  WhatsappIcon, RedditIcon, TumblrIcon, EmailIcon,
} from 'react-share';
import Head from 'next/head';
import Loader from 'react-spinners/BarLoader';
import Product from '../components/Product';
import fire from '../config/fire-config';
import usei18n from '../i18n/index';
import Logo from '../components/Logo';

const Footer = ({ i18n }) => (
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
);

const ShareModule = ({ i18n, product }) => {
  const pageUrl = `https://ezyou.shop/${product.id}`;

  return (
    <VStack spacing="8px">
      <Text
        mb="8px"
        fontWeight="semibold"
      >
        {i18n.t('publicProduct.share')}
      </Text>
      <HStack spacing="8px">
        <FacebookShareButton
          url={pageUrl}
        >
          <FacebookIcon size={40} borderRadius="8px" />
        </FacebookShareButton>
        <TwitterShareButton
          url={pageUrl}
        >
          <TwitterIcon size={40} borderRadius="8px" />
        </TwitterShareButton>
        <WhatsappShareButton
          url={pageUrl}
        >
          <WhatsappIcon size={40} borderRadius="8px" />
        </WhatsappShareButton>
        <TelegramShareButton
          url={pageUrl}
        >
          <TelegramIcon size={40} borderRadius="8px" />
        </TelegramShareButton>
      </HStack>
      <HStack spacing="8px">
        <PinterestShareButton
          url={pageUrl}
          media={product.images[0].data_url}
        >
          <PinterestIcon size={40} borderRadius="8px" />
        </PinterestShareButton>
        <RedditShareButton
          url={pageUrl}
          title={product.name}
          windowWidth={660}
          windowHeight={460}
        >
          <RedditIcon size={40} borderRadius="8px" />
        </RedditShareButton>
        <TumblrShareButton
          url={pageUrl}
          title={product.name}
        >
          <TumblrIcon size={40} borderRadius="8px" />
        </TumblrShareButton>
        <EmailShareButton
          url={pageUrl}
          subject={product.name}
          body="body"
        >
          <EmailIcon size={40} borderRadius="8px" />
        </EmailShareButton>
      </HStack>
    </VStack>
  );
};

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
        <meta property="og:image:url" content={data.images[0].data_url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ezyou.shop" />
        <meta property="twitter:url" content="https://ezyou.shop/" />
        <meta name="twitter:title" content={data.name} />
        <meta name="twitter:description" content={`Brought to you by ${data.author}`} />
        <meta name="twitter:image" content={data.images[0].data_url} />
      </Head>
      <VStack h="100vh">
        <Box w="100%">
          <Product
            preview={false}
            product={data}
            stripeAccountId={stripeAccountId}
          />
        </Box>
        <ShareModule i18n={i18n} product={data} />
        <Spacer />
        <Footer i18n={i18n} />
      </VStack>
    </Box>
  );
};

ProductPage.getInitialProps = async function ({ query }) {
  try {
    const productReference = fire.firestore()
      .collection('products')
      .doc(query.productId);

    productReference.update({
      views: fire.firestore.FieldValue.increment(1),
    });

    const productDoc = await productReference.get();

    if (productDoc.exists) {
      const productData = productDoc.data();

      let stripeAccountId;

      const storeReference = fire.firestore()
        .collection('stores')
        .doc(productData.storeId);

      const storeDoc = await storeReference.get();
      const storeData = storeDoc.data();

      const canCreateCharges = storeData.stripe
          && storeData.stripe.account
          && storeData.stripe.account.chargesEnabled
          && storeData.stripe.account.detailsSubmitted;

      if (canCreateCharges && storeData.stripe.account) {
        stripeAccountId = storeData.stripe.account.id;
      }

      if (productData.visible) {
        return {
          data: productData,
          stripeAccountId,
        };
      }
    }
  } catch (error) {}

  return { data: {} };
};

export default ProductPage;
