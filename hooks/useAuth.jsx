import Router from 'next/router';
import { useState, useEffect } from 'react';
import fire from '../config/fire-config';

const useAuth = (redirectToLandingPage) => {
  const [loggedInState, setLoggedInState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    const unregisterAuthObserver = fire.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          const getProducts = async () => {
            const userResponse = await fire.firestore()
              .collection('users')
              .doc(user.uid)
              .get();

            if (userResponse.exists) {
              const data = userResponse.data();
              const storeResponse = await fire.firestore()
                .collection('stores')
                .doc(data.storeId)
                .get();

              if (storeResponse.exists) {
                const store = storeResponse.data();

                store.products = [];

                await Promise.all(store.productIds.map(async (productId) => {
                  const productResponse = await fire.firestore()
                    .collection('products')
                    .doc(productId)
                    .get();

                  if (productResponse.exists) {
                    store.products.push(productResponse.data());
                  }
                }));

                setLoggedInState({
                  user,
                  pending: false,
                  isSignedIn: !!user,
                  store,
                });
              }
            }
          };

          getProducts();
        } else if (redirectToLandingPage) {
          Router.push('/');
        } else {
          setLoggedInState({
            user: undefined,
            pending: false,
            isSignedIn: !!user,
          });
        }
      });
    return () => unregisterAuthObserver();
  }, []);

  return { auth: fire.auth, loggedInState, setLoggedInState };
};

export default useAuth;
