import Router from 'next/router';
import { useState, useEffect } from 'react';
import fire from '../config/fire-config';

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    const unregisterAuthObserver = fire.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          const getProduct = async () => {
            const userResponse = await fire.firestore()
              .collection('users')
              .doc(user.uid)
              .get();

            if (userResponse.exists) {
              const data = userResponse.data();
              const productResponse = await fire.firestore()
                .collection('products')
                .doc(data.productId)
                .get();

              if (productResponse.exists) {
                setAuthState({
                  user,
                  pending: false,
                  isSignedIn: !!user,
                  product: productResponse.data(),
                });
              }
            }
          };

          getProduct();
        } else {
          Router.push('/');
        }
      });
    return () => unregisterAuthObserver();
  }, []);

  return { auth: fire.auth, ...authState };
};

export default useAuth;
