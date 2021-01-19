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
    .doc(state.productId);

  productReference.update({
    visible: !state.visible,
  });

  setState({ ...state, visible: !state.visible });
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

const LoggedInHome = (props) => {
  const [state, setState] = useState(props);

  console.log(props);

  useEffect(() => {
    if (fire) {
      const user = fire.auth().currentUser;

      if (!user) {
        Router.push('/');
      } else {
        fire.auth().onAuthStateChanged((newUser) => {
          if (!newUser) {
            Router.push('/');
          }
        });
      }
    }
  });

  if (!fire.auth().currentUser) {
    return (
      <Box bg="yellow.200">Loading</Box>
    );
  }

  const pageUrl = `https://todo.com/${state.productId}`;

  return (
    <Center h="100vh" bg="yellow.200">
      <VStack>
        <Text mb="16px">
          Hi
          {' '}
          {fire.auth().currentUser.email}
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
              <StatNumber align="center">{ state.views }</StatNumber>
            </Stat>
          </VStack>
        </HStack>
        <Button w="300px" leftIcon={<MdPayment />} colorScheme="teal" onClick={acceptPayments}>Accept Payments</Button>
        <Button w="300px" leftIcon={<MdBuild />} colorScheme="teal" onClick={editListing}>Edit Listing</Button>
        {state.visible && <Button w="300px" leftIcon={<MdDelete />} colorScheme="teal" onClick={(event) => { changeListingStatus(event, state, setState); }}>Hide Listing</Button>}
        {!state.visible && <Button w="300px" leftIcon={<AiOutlineEye />} colorScheme="teal" onClick={(event) => { changeListingStatus(event, state, setState); }}>Publish Listing</Button>}
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

              <IconButton
                colorScheme="red"
                aria-label="Instagram share"
                icon={<FaInstagram />}
              />
            </HStack>
          </Center>
        </Box>
      </VStack>
    </Center>
  );
};

LoggedInHome.getInitialProps = async function () {
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
        return { ...data, ...productResponse.data() };
      }
    }

    return {};
  };

  if (user) {
    return getProduct();
  }

  return { error: true };
};

export default LoggedInHome;
