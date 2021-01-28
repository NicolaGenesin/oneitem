import React, { useState } from 'react';
import Router from 'next/router';
import {
  useDisclosure,
} from '@chakra-ui/react';
import Product from '../../components/Product';
import CreateModal from '../../components/CreateModal';
import LeftColumn from '../../components/LeftColumn';
import fire, { storage } from '../../config/fire-config';
import uuidv4 from '../../utils/random';

const placeholders = {
  storeNamePlaceholder: 'Bread Pitt',
  authorPlaceholder: 'John',
  contactPlaceholder: 'john@gmail.com',
  namePlaceholder: 'Teapot',
  pricePlaceholder: 20,
  currencyPlaceholder: '€',
  descriptionPlaceholder: '',
};

const defaultProductState = {
  storeName: '',
  author: '',
  contact: '',
  name: '',
  price: '',
  currency: '',
  images: [],
  description: '',
};

const CreatePage = (props) => {
  const [state, setState] = useState(props);
  const updateState = (target, value) => {
    setState({ ...state, [target]: value });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      id: state.id,
      author: state.author,
      contact: state.contact,
      currency: state.currency,
      description: state.description,
      name: state.name,
      price: state.price,
      storeName: state.storeName,
      views: state.views || 0,
      visible: true,
    };

    if (fire.auth().currentUser) {
      data.userId = fire.auth().currentUser.uid;
    }

    const checkIfIdHasChanged = () => {
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
    };

    const imagesAlreadyUploaded = state.images.filter((image) => image.data_url.startsWith('https'));

    // store text infos before uploading images, keeping the old images already uploaded
    fire.firestore()
      .collection('products')
      .doc(state.id)
      .set({ ...data, images: imagesAlreadyUploaded })
      .catch((e) => {
        console.log(e);
      });

    checkIfIdHasChanged();

    const imagesToUpload = state.images.filter((image) => !image.data_url.startsWith('https'));

    imagesToUpload.forEach((image) => {
      const uploadTask = storage
        .ref(`/${state.id}`)
        .child(`product_image_${uuidv4()}`)
        .putString(image.data_url.split(',')[1], 'base64', { contentType: 'image/jpg' });

      uploadTask.on('state_changed',
        () => {},
        (error) => {
          console.log(error);
        }, async () => {
          const data_url = await uploadTask.snapshot.ref.getDownloadURL();

          fire.firestore()
            .collection('products')
            .doc(state.id)
            .update({ images: fire.firestore.FieldValue.arrayUnion({ data_url }) })
            .then(() => console.log('Image Uploaded'))
            .catch((e) => {
              console.log(e);
            });
        });
    });

    if (state.createMode) {
      onOpen();
    } else {
      Router.push('/home');
    }
  };

  return (
    <div>
      {CreateModal(isOpen, onOpen, onClose, state.id)}
      <div className="container">
        <div className="left">
          <LeftColumn
            product={state}
            placeholders={placeholders}
            state={state}
            updateState={updateState}
            handleSubmit={handleSubmit}
            createMode={state.createMode}
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
              width: 420px;
              float: left;
              background: #f6fdfd;
          }

          .right {
              height: 100vh;
              overflow-y: scroll;
              float: none;
              width: auto;
          }

          /* width */
          ::-webkit-scrollbar {
            width: 5px;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            background: #f1f1f1; 
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #888; 
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #555; 
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

  let initialProps = { createMode: true, ...defaultProductState };

  if (user) {
    initialProps = getProduct();
  }

  return initialProps;
};

export default CreatePage;
