import React from 'react';
import {
  Text, VStack, Box, Image, Button, Heading,
  Divider, HStack, Center, Badge,
} from '@chakra-ui/react';

export default function ProductPage({ product, preview }) {
  return (
    <Box>
      <Center>
        <Box m="24px">
          <Heading as="h2" size="xl">
            {product.storeName}
            {' '}
            {preview && <Badge colorScheme="green">Preview</Badge>}
          </Heading>
        </Box>
      </Center>

      <Divider orientation="horizontal" />

      <Center mt="10%">
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
                src={product.images && product.images.length && product.images[0].data_url}
                fallbackSrc="https://via.placeholder.com/1000"
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
