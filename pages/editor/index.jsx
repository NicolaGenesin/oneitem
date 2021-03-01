import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import {
  useDisclosure, Box,
} from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';
import Product from '../../components/Product';
import CreateModal from '../../components/CreateModal';
import LeftColumn from '../../components/LeftColumn';
import Loader from '../../components/Loader';
import fire from '../../config/fire-config';
import useAuth from '../../hooks/useAuth';
import { uploadImages } from '../../utils/upload';

const placeholders = {
  authorPlaceholder: '',
  contactPlaceholder: '',
  namePlaceholder: '',
  pricePlaceholder: 0,
  quantityPlaceholder: 1,
  currencyPlaceholder: '€',
  descriptionPlaceholder: '',
};

const CreatePage = () => {
  const auth = useAuth();
  const { loggedInState } = auth;
  const { pending, store, isSignedIn } = loggedInState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = useState({});
  const [isLoading, setSavingState] = useState(false);
  const router = useRouter();
  const { productId } = router.query;
  const createMode = !productId;
  let storeName = router.query.name;

  if (store && store.name) {
    storeName = store.name;
  }

  useEffect(() => {
    if ((createMode && !isSignedIn) || (createMode && isSignedIn)) {
      // new user or existing user - add product
      setState({
        author: '',
        contact: '',
        name: '',
        price: '',
        quantity: 1,
        deliveryEstimateValue: 3,
        deliveryEstimateRange: 'days',
        currency: '€',
        images: [],
        description: '',
        createMode,
        storeName,
        storeId: storeName && storeName.replace(/[^A-Z0-9]/ig, '-').toLowerCase(),
      });
    } else if (!createMode && isSignedIn) {
      // update product
      setState(store.products.find((product) => product.id === productId));
    } else {
      console.log('Loading...');
    }
  }, [createMode, isSignedIn, storeName]);

  if (pending) {
    // add loader while we check if there's a user
    return (
      <Box>
        {CreateModal(isOpen, onOpen, onClose, state.storeId, state.id)}
        <Loader />
      </Box>
    );
  }

  const updateState = (target, value) => {
    if (target === 'name') {
      setState({
        ...state,
        [target]: value,
        id: `${value.replace(/[^A-Z0-9]/ig, '-').toLowerCase()}`,
      });
    } else {
      setState({
        ...state,
        [target]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSavingState(true);

    // productId is obtained from the URL
    // CREATE: if !productId && signed in, check if one store.products has clashing id with state.id
    // CREATE: if !productId && not signed in, use state.id
    // EDIT: if productId the user IS signed in, reuse it (we keep url even if we change name)

    let updatedId;

    if (productId) {
      updatedId = productId;
    } else if (!productId && isSignedIn) {
      const clash = store.products.find((product) => product.id === state.id);

      if (clash) {
        let index = 0;

        while (store.products.find((product) => product.id === `${state.id}-${index}`)) {
          index += 1;
        }

        updatedId = `${state.id}-${index}`;
      } else {
        updatedId = state.id;
      }
    } else if (!productId && !isSignedIn) {
      updatedId = `${state.storeId}-${state.id}`;
    }

    const data = {
      id: updatedId,
      storeId: state.storeId,
      author: state.author,
      contact: state.contact,
      currency: state.currency,
      description: state.description,
      name: state.name,
      price: state.price,
      quantity: state.quantity,
      deliveryEstimateValue: state.deliveryEstimateValue,
      deliveryEstimateRange: state.deliveryEstimateRange,
      storeName: state.storeName,
      views: state.views || 0,
      visible: true,
    };

    if (fire.auth().currentUser) {
      data.userId = fire.auth().currentUser.uid;
    }

    const imagesAlreadyUploaded = state.images.filter((image) => image.data_url.startsWith('https'));

    // store text infos before uploading images, keeping the old images already uploaded
    fire.firestore()
      .collection('products')
      .doc(data.id)
      .set({
        ...data,
        images: imagesAlreadyUploaded,
        updatedAt: Math.round(+new Date() / 1000),
      })
      .catch((e) => {
        console.log(e);
      });

    if (isSignedIn) {
      fire.firestore()
        .collection('stores')
        .doc(data.storeId)
        .update({ productIds: fire.firestore.FieldValue.arrayUnion(data.id) })
        .catch((e) => {
          console.log(e);
        });
    } else {
      fire.firestore()
        .collection('stores')
        .doc(data.storeId)
        .set({ productIds: [data.id], name: data.storeName })
        .catch((e) => {
          console.log(e);
        });
    }

    const imagesToUpload = state.images.filter((image) => !image.data_url.startsWith('https'));

    await uploadImages(imagesToUpload, state.storeId, updatedId);

    setSavingState(false);

    if (createMode && !isSignedIn) {
      onOpen();
    } else {
      Router.push('/home');
    }
  };

  if (isMobile) {
    return (
      <Box>
        {CreateModal(isOpen, onOpen, onClose, state.storeId, state.id)}
        <div className="container">
          <div className="column">
            <LeftColumn
              product={state}
              placeholders={placeholders}
              state={state}
              updateState={updateState}
              handleSubmit={handleSubmit}
              createMode={createMode}
              isMobile={isMobile}
              isLoading={isLoading}
            />
          </div>
        </div>
        <style jsx>
          {`
            .container {
              height: 100vh;
            }
            
            .column {
              overflow-y: scroll;
              width: 375px;
              float: left;
            }
          `}
        </style>
      </Box>
    ); 
  }

  return (
    <Box>
      {CreateModal(isOpen, onOpen, onClose, state.storeId, state.id)}
      <div className="container">
        <div className="left">
          <LeftColumn
            product={state}
            placeholders={placeholders}
            state={state}
            updateState={updateState}
            handleSubmit={handleSubmit}
            createMode={createMode}
            isMobile={isMobile}
            isLoading={isLoading}
          />
        </div>
        <div className="right">
          <Product mt="24px" preview product={state} />
        </div>
      </div>
      <style jsx>
        {`
          .container {
            height: 100vh;
            overflow: hidden;
          }

          .left {
            height: 100vh;
            overflow-y: scroll;
            width: 375px;
            float: left;
          }

          .right {
            height: 100vh;
            overflow-y: scroll;
            float: none;
            width: auto;
          }

          /* width */
          ::-webkit-scrollbar {
            width: 6px;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            background: #f1f1f1; 
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #378c99; 
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #1a535c; 
          }
        `}
      </style>
    </Box>
  );
};

export default CreatePage;
