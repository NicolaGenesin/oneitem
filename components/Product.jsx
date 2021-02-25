import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import {
  Text, VStack, Box, Image, Button, Heading,
  Divider, Center, Badge, useDisclosure,
} from '@chakra-ui/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { loadStripe } from '@stripe/stripe-js';
import usei18n from '../i18n/index';
import EmailCheckoutModal from './EmailCheckoutModal';

let stripePromise;

const handleBuy = async (product, stripeAccountId, pagePath, customerEmail) => {
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
      customerEmail,
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
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const [emailValidity, setEmailValidity] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (stripeAccountId) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK, {
        stripeAccount: stripeAccountId,
      });
    }
  }, [stripeAccountId]);

  useEffect(() => {
    if (emailValidity) {
      setIsLoading(true);
      handleBuy(product, stripeAccountId, pagePath, email);
    }
  }, [emailValidity]);

  if (!product) {
    return <div />;
  }

  return (
    <Box>
      <EmailCheckoutModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        email={email}
        setEmail={setEmail}
        emailValidity={emailValidity}
        setEmailValidity={setEmailValidity}
      />
      <Center>
        <Box m="24px">
          <Heading as="h2" size="xl">
            {product.storeName}
            {' '}
            {preview && <Badge colorScheme="green">{i18n.t('product.preview')}</Badge>}
          </Heading>
        </Box>
      </Center>
      <Divider orientation="horizontal" />
      <Center mt={['7%', '5%']}>
        <Box>
          <Center mb={['3%', '5%']}>
            <Text>
              {i18n.t('product.author', { author: product.author || i18n.t('product.authorPlaceholder') })}
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
                      src="https://via.placeholder.com/500?text=　"
                    />
                  )}
              </Carousel>
            </Box>
            <Box w={['340px', '400px']}>
              <Heading size="xl" mb="16px" mt={['24px', '0px']}>
                {product.name || i18n.t('product.namePlaceholder')}
              </Heading>
              <Text
                w="100%"
                mb="8px"
                fontWeight="semibold"
              >
                {i18n.t('product.descriptionTitle')}
              </Text>
              <Text fontSize="md" whiteSpace="pre-line">{product.description || i18n.t('product.descriptionPlaceholder')}</Text>
              <VStack mt="24px" spacing={0}>
                <Heading
                  size="xl"
                  w="100%"
                  mb="16px"
                >
                  {product.currency || '€'}
                  {(product.price && product.price) || '0'}
                </Heading>
                <Text
                  w="100%"
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  {i18n.t('product.deliveredIn', product)}
                </Text>
                <Text
                  w="100%"
                  mb="24px"
                  fontSize="xs"
                >
                  {i18n.t('product.pricingInformation')}
                </Text>
                <Button
                  w="100%"
                  disabled={!stripeAccountId || preview}
                  isLoading={isLoading}
                  colorScheme="primaryButton"
                  color="white"
                  size="lg"
                  onClick={() => {
                    onOpen();
                  }}
                >
                  {i18n.t('product.buy')}
                </Button>
              </VStack>
            </Box>
          </Box>
          <Center mt={['7%', '5%']} mb="64px">
            <VStack maxW="400px">
              <Text>
                {i18n.t('product.contact', { contact: product.contact || i18n.t('product.contactPlaceholder') })}
              </Text>
            </VStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}
