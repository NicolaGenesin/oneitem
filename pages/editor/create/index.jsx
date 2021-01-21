import React, { useState } from 'react';
import Router from 'next/router';
import {
  useDisclosure,
} from '@chakra-ui/react';
import ProductPage from '../../product-page';
import CreateModal from '../../../components/CreateModal';
import LeftColumn from '../../../components/LeftColumn';
import fire from '../../../config/fire-config';

const placeholders = {
  storeNamePlaceholder: 'Your Store Name',
  authorPlaceholder: 'Your Name',
  contactPlaceholder: 'john@doe.com',
  namePlaceholder: 'The item name',
  pricePlaceholder: 20,
  currencyPlaceholder: '$',
  imagePlaceholder: 'https://assets.catawiki.nl/assets/2019/12/16/a/8/c/a8ccba43-31ee-4d24-a509-6d36ee2d7e35.jpg',
  descriptionPlaceholder: 'A very long description',
};

const product = {
  storeName: placeholders.storeNamePlaceholder,
  author: '',
  contact: placeholders.contactPlaceholder,
  name: placeholders.namePlaceholder,
  price: placeholders.pricePlaceholder,
  currency: placeholders.currencyPlaceholder,
  image: placeholders.imagePlaceholder,
  description: placeholders.descriptionPlaceholder,
};

const CreatePage = (props) => {
  const [state, setState] = useState(props || product);
  const updateState = (target, value) => {
    setState({ ...state, [target]: value });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      ...state,
      views: state.views || 0,
      visible: true,
    };

    if (fire.auth().currentUser) {
      data.userId = fire.auth().currentUser.uid;
    }

    fire.firestore()
      .collection('products')
      .doc(state.id)
      .set(data)
      .catch((e) => {
        console.log(e);
      });

    if (props.id !== state.id) {
      fire.firestore()
        .collection('products')
        .doc(props.id)
        .delete();

      if (data.userId) {
        fire.firestore()
          .collection('users')
          .doc(data.userId)
          .set({ productId: state.id });
      }
    }

    if (state.createMode) {
      onOpen();
    } else {
      Router.push('/home');
    }
  };

  return (
    <div>
      {CreateModal(isOpen, onOpen, onClose, props.hostname, state.id)}
      <div className="container">
        <div className="left">
          <LeftColumn
            product={state}
            placeholders={placeholders}
            updateState={updateState}
            handleSubmit={handleSubmit}
            createMode={state.createMode}
          />
        </div>
        <div className="right">
          <ProductPage mt="24px" preview product={state} />
        </div>
      </div>
      <style jsx>
        {`
          .container {
              height: auto;
              overflow: hidden;
          }
          
          .left {
              width: 500px;
              float: left;
              background: #e8f6fe;
          }
          
          .right {
              float: none;
              width: auto;
              overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

CreatePage.getInitialProps = async function ({ req }) {
  const user = fire.auth().currentUser;

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
        return { ...productResponse.data(), createMode: false };
      }
    }

    return { createMode: true };
  };

  let initialProps = { createMode: true };

  if (user) {
    initialProps = getProduct();
  }

  if (req) {
    const { host } = req.headers;

    initialProps.hostname = host;
  } else {
    initialProps.hostname = 'error_refresh_page';
  }

  console.log(initialProps);

  return initialProps;
};

export default CreatePage;
