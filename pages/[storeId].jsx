import React, { useEffect } from 'react';
import Router from 'next/router';
import {
  Box, VStack, Center, Button, Link, Heading, Image, Text,
} from '@chakra-ui/react';
import usei18n from '../i18n/index';
import fire from '../config/fire-config';

const PublicStorePage = ({ products, store }) => {
  const i18n = usei18n();

  useEffect(() => {
    if (!store || !products) {
      Router.push('/404');
    }
  }, [store, products]);

  return (
    <>
      <Center bg="primary.50" h="auto">
        <Box>
          <Heading size="2xl" mb="48px" mt="48px" textAlign="center">
            {store.name}
          </Heading>
          <Center>
            <VStack>
              {products
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((product, index) => (
                  <Box
                    key={index}
                    borderRadius="lg"
                    overflow="hidden"
                    bg="white"
                    boxShadow="2xl"
                    mb="24px"
                    maxW="95%"
                  >
                    <Image
                      bg="placeholder.50"
                      objectFit="cover"
                      h="400px"
                      src={product.images[0].data_url}
                    />
                    <Box
                      p="5"
                    >
                      <Box
                        mb="8px"
                      >
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                        >
                          {product.name}
                        </Text>
                        <Text
                          fontSize="sm"
                        >
                          {product.currency || '€'}
                          {(product.price && product.price) || '0'}
                          {' '}
                          (
                          {i18n.t('product.deliveredIn', product)}
                          )
                        </Text>
                      </Box>
                      <Link ml="-6px" mt="4px" href={`${product.storeId}/${product.id}`}>
                        <Button
                          boxShadow="md"
                          variant="solid"
                          size="md"
                          colorScheme="primaryButton"
                          color="white"
                        >
                          {i18n.t('publicStorePage.open')}
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                ))}
            </VStack>
          </Center>
        </Box>
      </Center>
    </>
  );
};

PublicStorePage.getInitialProps = async function ({ query }) {
  try {
    const storeReference = fire.firestore()
      .collection('stores')
      .doc(query.storeId);

    const store = await storeReference.get();
    const storeData = store.data();
    const products = [];

    await Promise.all(storeData.productIds.map(async (productId) => {
      const productResponse = await fire.firestore()
        .collection('products')
        .doc(productId)
        .get();

      if (productResponse.exists) {
        products.push(productResponse.data());
      }
    }));
    return { products, store: storeData };
  } catch (error) {
    return {};
  }
};

export default PublicStorePage;
