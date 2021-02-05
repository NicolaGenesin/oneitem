import React from 'react';
import {
  Text, VStack, Box, Image, Button, Heading,
  Divider, HStack, Center, Badge,
} from '@chakra-ui/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import usei18n from '../i18n/index';

export default function Product({ product, preview }) {
  const i18n = usei18n();

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
                showArrows={false}
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
                      // src="https://via.placeholder.com/500?text=　"
                      src="https://image.shutterstock.com/z/stock-vector-hands-knitting-with-giant-needles-and-yarn-decorative-craftwork-knitwork-handicraft-creative-1464390491.jpg"
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
                Description
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
                  mb="16px"
                  fontSize="xs"
                >
                  VAT included, postage included
                </Text>
                <Button
                  w="100%"
                  disabled
                  colorScheme="primaryButton"
                  color="white"
                  size="lg"
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
