import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import {
  Box,
  Button, Text, HStack, VStack, Stat, StatNumber,
  Heading, StatLabel, Center, IconButton, Input,
} from '@chakra-ui/react';
import {
  MdBuild, MdDelete, MdPayment, MdExitToApp, MdLink,
} from 'react-icons/md';
import {
  FaFacebook, FaInstagram, FaTwitter,
} from 'react-icons/fa';
import {
  AiOutlineEye,
} from 'react-icons/ai';
import fire from '../../config/fire-config';
import useAuth from '../useAuth';
import Loader from '../../components/Loader';

const shareToFacebookHandler = (url) => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
};

const shareToTwitterHandler = (url) => {
  const text = escape(`Hi! Come check out our unique item at ${url}`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`);
};

const logout = (event) => {
  event.preventDefault();
  fire.auth().signOut();
};

const acceptPayments = (event) => {
  event.preventDefault();
};

const editListing = (event) => {
  event.preventDefault();

  Router.push('/editor/create');
};

const changeListingStatus = (event, state, setState) => {
  event.preventDefault();

  const productReference = fire.firestore()
    .collection('products')
    .doc(product.id);

  productReference.update({
    visible: !product.visible,
  });

  setState({ ...state, visible: !product.visible });
};

const copyToClipboard = (url) => {
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log(`Fallback: Copying text command was ${msg}`);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  };

  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(url);
  }

  navigator.clipboard.writeText(url).then(() => {
    console.log('Async: Copying to clipboard was successful!');
  }, (err) => {
    console.error('Async: Could not copy text: ', err);
  });
};

const LoggedInHome = () => {
  const {
    pending, isSignedIn, user, product,
  } = useAuth();

  if (pending) {
    return <Loader />;
  }

  const pageUrl = `https://todo.com/${product.id}`;

  return (
    <Center h="100vh" bg="yellow.200">
      <VStack>
        <Text mb="16px">
          Hi
          {' '}
          {user.email}
        </Text>
        <Heading as="h2" size="xl">Your Listing</Heading>
        <HStack spacing="48px" mb="16px">
          <VStack>
            <Stat>
              <StatLabel>Total Sales</StatLabel>
              <StatNumber align="center">£0.00</StatNumber>
            </Stat>
          </VStack>
          <VStack>
            <Stat>
              <StatLabel>Page Views</StatLabel>
              <StatNumber align="center">{ product.views }</StatNumber>
            </Stat>
          </VStack>
        </HStack>
        <Button w="300px" leftIcon={<MdPayment />} colorScheme="teal" onClick={acceptPayments}>Accept Payments</Button>
        <Button w="300px" leftIcon={<MdBuild />} colorScheme="teal" onClick={editListing}>Edit Listing</Button>
        {product.visible && <Button w="300px" leftIcon={<MdDelete />} colorScheme="teal" onClick={(event) => { changeListingStatus(event, state, setState); }}>Hide Listing</Button>}
        {!product.visible && <Button w="300px" leftIcon={<AiOutlineEye />} colorScheme="teal" onClick={(event) => { changeListingStatus(event, state, setState); }}>Publish Listing</Button>}
        <Button w="300px" mb="24px" leftIcon={<MdExitToApp />} colorScheme="teal" onClick={logout}>Logout</Button>
        <Heading as="h2" size="xl">Share</Heading>
        <Box>
          <HStack w="300px" mb="16px">
            <Input variant="filled" value={pageUrl} onChange={() => {}} />
            <IconButton
              colorScheme="pink"
              aria-label="Link share"
              icon={<MdLink />}
              onClick={() => { copyToClipboard(pageUrl); }}
            />
          </HStack>
          <Center>
            <HStack>
              <IconButton
                colorScheme="facebook"
                aria-label="Facebook share"
                icon={<FaFacebook />}
                onClick={() => { shareToFacebookHandler(pageUrl); }}
              />
              <IconButton
                colorScheme="twitter"
                aria-label="Twitter share"
                icon={<FaTwitter />}
                onClick={() => { shareToTwitterHandler(pageUrl); }}
              />
              {
              // TODO check http://www.sharelinkgenerator.com/
              /* <IconButton
              colorScheme="blue"
            aria-label="Pinterest share"
            icon={<FaPinterest />}
          /> */}
              {/* <IconButton
                colorScheme="red"
                aria-label="Instagram share"
                icon={<FaInstagram />}
              /> */}
            </HStack>
          </Center>
        </Box>
      </VStack>
    </Center>
  );
};

export default LoggedInHome;
