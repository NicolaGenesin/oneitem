import React from 'react';
import {
  Text, VStack, Box, Image, Button, Heading,
  Divider, HStack, Center, Badge,
} from '@chakra-ui/react';
import { useAppContext, updateContext } from '../../context/state';

export default function ProductPage({ product, preview }) {
  if (!product) {
    product = {
      id: 1,
      storeName: 'Biggie LTD',
      author: 'Marco Schiorlin',
      contact: 'john@gmail.com',
      name: 'Teapot',
      price: 10.226,
      currency: '$',
      image: 'https://assets.catawiki.nl/assets/2019/12/16/a/8/c/a8ccba43-31ee-4d24-a509-6d36ee2d7e35.jpg',
      description: 'Cast iron teapot let your drink water be healthy. TOWA cast iron teapot can improve the water quality by releasing iron ions and absorbing chloride ions in water. So the water after boiled by our cast iron teapot can be more sweeter and softer, which is suitable for all kinds of tea making or other drinks making.',
    };
  }

  return (
    <Box>
      <Center>
        <Box mb="24px">
          <Heading as="h2" size="xl">
            {product.storeName}
            {' '}
            {preview && <Badge colorScheme="green">Preview</Badge>}
          </Heading>
        </Box>
      </Center>

      <Divider orientation="horizontal" />

      <Center mt="128px">
        <Box>
          {product.author && (
          <Center>
            <Text>
              brought to you by
              {' '}
              {product.author}
            </Text>
          </Center>
          )}

          <HStack mt="48px">
            <Box boxShadow="2xl" mr="48px">
              <Image
                rounded="md"
                boxSize="260px"
                objectFit="cover"
                src={product.image}
              />
            </Box>
            <Box maxW="400px">
              <Heading size="xl" mb="16px">
                {product.name}
              </Heading>
              <Text fontSize="md">{product.description}</Text>
              <HStack mt="24px">
                <Center>
                  <Heading size="xl" mr="24px">
                    {product.currency}
                    {product.price && product.price}
                  </Heading>
                  <Button colorScheme="teal" size="lg" variant="outline">Buy</Button>
                </Center>
              </HStack>
            </Box>
          </HStack>
          <Center mt="48px">
            <VStack>
              <Text mb="128px">
                Contact:
                {' '}
                {product.contact}
              </Text>
              <Text>
                ©
                {' '}
                {product.storeName}
              </Text>
            </VStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}
