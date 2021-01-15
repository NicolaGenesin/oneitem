import React, { useState, useEffect} from 'react';
import Router, { useRouter  } from 'next/router';
import { Box } from '@chakra-ui/react';
import ProductPage from './product-page';
import fire from '../config/fire-config';

const PublicProductPage = (props) => {
  useEffect(() => {
    if (!props.id) {
      Router.push('/404');
    }
  }, [props])  

  return (
    <Box>
      <ProductPage preview={false} product={props} />
      // todo created with one9.com => link to home page
    </Box>
  );  
}; 

PublicProductPage.getInitialProps = async function ({query}) {
  const productResponse = await fire.firestore()
    .collection('products')
    .doc(query.productId)
    .get();

  if (productResponse.exists) {
    return { ...productResponse.data() };
  } else {
    return {}
  }
}

export default PublicProductPage;
