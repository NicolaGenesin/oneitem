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
    <Box>
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
      <Center mt="5%">
        <Box>
          {product.author && (
          <Center>
            <Text>
              {i18n.t('product.author', { author: product.author })}
            </Text>
          </Center>
          )}
          <HStack mt="48px">
            <Box boxShadow="2xl" mr="48px" rounded="md" maxW="300px">
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
                      rounded="md"
                      boxSize="300px"
                      objectFit="cover"
                      src={image.data_url}
                      fallbackSrc="https://via.placeholder.com/500?text=　"
                    />
                  ))
                  : (
                    <Image
                      bg="white"
                      rounded="md"
                      boxSize="300px"
                      objectFit="cover"
                      src="https://via.placeholder.com/500?text=　"
                    />
                  )}
              </Carousel>
            </Box>
            <Box maxW="400px">
              <Heading size="xl" mb="16px">
                {product.name}
              </Heading>
              <Text fontSize="md" whiteSpace="pre-line">{product.description}</Text>
              <HStack mt="24px">
                <Center>
                  <Heading size="xl" mr="24px">
                    {product.currency}
                    {product.price && product.price}
                  </Heading>
                  <Button disabled colorScheme="primaryButton" color="white" size="lg">{i18n.t('product.buy')}</Button>
                </Center>
              </HStack>
            </Box>
          </HStack>
          <Center mt="48px" mb="64px">
            <VStack maxW="400px">
              {/* <Heading as="h3" size="lg">
                About us
              </Heading>
              <Text align="center">
                One of the world's premier watchmakers, Movado Group, Inc. (MGI) designs, manufactures and distributes watches from nine of the most recognized and respected names in time: our wholly owned Movado, Concord and EBEL brands along with our Coach, HUGO BOSS, Juicy Couture, Lacoste, Tommy Hilfiger and Scuderia Ferrari licensed watch brands.
              </Text> */}
              <Text>
                {i18n.t('product.contact', { contact: product.contact })}
              </Text>
            </VStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}