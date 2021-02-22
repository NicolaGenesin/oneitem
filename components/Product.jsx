import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import {
  Text, VStack, Box, Image, Button, Heading,
  Divider, Center, Badge,
} from '@chakra-ui/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { loadStripe } from '@stripe/stripe-js';
import usei18n from '../i18n/index';

let stripePromise;

const handleBuy = async (product, stripeAccountId, pagePath) => {
  const stripe = await stripePromise;
  const response = await fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product,
      stripeAccountId,
      pagePath,
    }),
  });
  const session = await response.json();

  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
    Router.push(`${pagePath}/issue`);
  }
};

export default function Product({ product, preview, stripeAccountId }) {
  const i18n = usei18n();
  const pagePath = useRouter().asPath;

  useEffect(() => {
    if (stripeAccountId) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK, {
        stripeAccount: stripeAccountId,
      });
    }
  }, [stripeAccountId]);

  if (!product) {
    return <div />;
  }

  return (
    <Box h="100%">
      <Center>
        <Box m="24px">
          <Heading as="h2" size="xl">
            {product.storeName || 'Vincent Lab'}
            {' '}
            {preview && <Badge colorScheme="green">{i18n.t('product.preview')}</Badge>}
          </Heading>
        </Box>
      </Center>
      <Divider orientation="horizontal" />
      <Center mt="5%">
        <Box>
          <Center mb="3%">
            <Text>
              {i18n.t('product.author', { author: product.author || 'Giulia Pera' })}
            </Text>
          </Center>
          <Box p={4} display={{ md: 'flex' }}>
            <Box
              flexShrink={0}
              boxShadow="2xl"
              mr={['0px', '48px']}
              rounded="md"
              w={['340px', '400px']}
              h={['340px', '400px']}
            >
              <Carousel
                showArrows
                autoPlay
                swipeable
                infiniteLoop
                stopOnHover
                interval={3000}
                showStatus={false}
                showThumbs={false}
                showIndicators
              >
                {product.images && product.images.length
                  ? product.images.map((image, index) => (
                    <Image
                      key={`index-${index}`}
                      bg="white"
                      boxSize={['340px', '400px']}
                      objectFit="cover"
                      src={image.data_url}
                      fallbackSrc="https://via.placeholder.com/500?text=　"
                    />
                  ))
                  : (
                    <Image
                      bg="white"
                      boxSize={['340px', '400px']}
                      objectFit="cover"
                      src="assets/product-page-placeholder-01.jpg"
                    />
                  )}
              </Carousel>
            </Box>
            <Box w={['340px', '400px']}>
              <Heading size="xl" mb="16px" mt={['24px', '0px']}>
                {product.name || 'Zaino'}
              </Heading>
              <Text
                w="100%"
                mb="16px"
                fontWeight="bold"
              >
                {i18n.t('product.descriptionTitle')}
              </Text>
              <Text fontSize="md" whiteSpace="pre-line">{product.description || 'Zaino mini. Foderato internamente e tasca con zip Base in ecopelle. Bretelle regolabili. Chiusura a sacca con coulisse e patta con asola e bottone. Può starci: l\'essenziale'}</Text>
              <VStack mt="24px">
                <Heading
                  size="xl"
                  w="100%"
                >
                  {product.currency || '€'}
                  {(product.price && product.price) || '35'}
                </Heading>
                <Text
                  w="100%"
                  fontSize="xs"
                >
                  {i18n.t('product.deliveredIn', product)}
                </Text>
                <Text
                  w="100%"
                  mb="16px"
                  fontSize="xs"
                >
                  {i18n.t('product.pricingInformation')}
                </Text>
                <Button
                  w="100%"
                  disabled={!stripeAccountId || preview}
                  colorScheme="primaryButton"
                  color="white"
                  size="lg"
                  onClick={() => { handleBuy(product, stripeAccountId, pagePath); }}
                >
                  {i18n.t('product.buy')}
                </Button>
              </VStack>
            </Box>
          </Box>
          <Center mt="48px" mb="64px">
            <VStack maxW="400px">
              <Text>
                {i18n.t('product.contact', { contact: product.contact || 'hello@vincent.com' })}
              </Text>
            </VStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}
