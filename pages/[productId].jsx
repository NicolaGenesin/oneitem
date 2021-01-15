import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import DynamicCustomerPage from './dynamicCustomerPage';
import fire from '../config/fire-config';

const PublicProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [state, setState] = useState({ called: false });

  useEffect(() => {
    if (!state.called && productId) {
      setState({ called: true });

      fire.firestore()
        .collection('products')
        .doc(productId)
        .get()
        .then((product) => {
          if (product.exists) {
            setState({ called: true, ...product.data() });
          } else {
            router.push('/404');
          }
        })
        .catch((e) => {
          console.log(e);
          router.push('/404');
        });
    }
  }, [productId, state]);

  return (
    <Box>
      {state.id && <DynamicCustomerPage preview={false} product={state} />}
    </Box>
  );
};

export default PublicProductPage;
