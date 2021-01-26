import React, { useEffect } from 'react';
import Router from 'next/router';
import {
  Box, Divider, Center, Link,
} from '@chakra-ui/react';
import ProductPage from './product';
import fire from '../config/fire-config';

const PublicProductPage = (props) => {
  useEffect(() => {
    if (!props.id) {
      Router.push('/404');
    }
  }, [props]);

  return (
    <Box>
      <ProductPage preview={false} product={props} />
      <Divider orientation="horizontal" />
      <Box backgroundColor="gray.900">
        <Center p="16px" color="white">
          Page created with
          <Link ml="8px" href="/">
            one9.com
          </Link>
        </Center>
      </Box>
    </Box>
  );
};

PublicProductPage.getInitialProps = async function ({ query }) {
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

export default PublicProductPage;
