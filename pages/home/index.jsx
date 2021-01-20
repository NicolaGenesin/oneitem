import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
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
import useI18n from '../../hooks/use-i18n';
import EN from '../../locales/en.json';
import IT from '../../locales/it.json';

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
    .doc(state.id);

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

const LoggedInHome = ({ hostname }) => {
  const i18n = useI18n();

  useEffect(() => {
    i18n.locale('en', IT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    pending,
    user,
    product,
  } = useAuth();

  const [state, setState] = useState({});

  useEffect(() => {
    if (product) {
      setState(product);
    }
  }, [product]);

  if (pending) {
    return <Loader />;
  }

  const pageUrl = `${hostname}/${state.id}`;

  return (
    <div>
      <div className="svgBg">
        <Center h="100vh">
          <Box bg="white" p="16px" rounded="md" boxShadow="2xl">
            <VStack>
              <Text mb="16px">
                Hi
                {' '}
                {user.email}

                {i18n.t('intro.text')}
              </Text>
              <Heading as="h2" size="xl">Your Listing</Heading>
              <HStack spacing="48px" mb="16px">
                <VStack>
                  <Stat>
                    <StatLabel>Items Sold</StatLabel>
                    <StatNumber align="center">0</StatNumber>
                  </Stat>
                </VStack>
                <VStack>
                  <Stat>
                    <StatLabel>Page Views</StatLabel>
                    <StatNumber align="center">{ state.views }</StatNumber>
                  </Stat>
                </VStack>
              </HStack>
              <Button w="300px" leftIcon={<MdPayment />} bg="activeButton" onClick={acceptPayments}>Accept Payments</Button>
              <Button w="300px" leftIcon={<MdBuild />} bg="activeButton" onClick={editListing}>Edit Listing</Button>
              {state.visible && <Button w="300px" leftIcon={<MdDelete />} bg="activeButton" onClick={(event) => { changeListingStatus(event, state, setState); }}>Hide Listing</Button>}
              {!state.visible && <Button w="300px" leftIcon={<AiOutlineEye />} bg="activeButton" onClick={(event) => { changeListingStatus(event, state, setState); }}>Publish Listing</Button>}
              <Button w="300px" mb="24px" leftIcon={<MdExitToApp />} bg="activeButton" onClick={logout}>Logout</Button>
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
              bg="activeButton"
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
          </Box>
        </Center>
      </div>
      <style jsx>
        {`
          // https://www.svgbackgrounds.com/#hollowed-boxes
          .svgBg {
            background-color: #f7fefe;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg %3E%3Cpolygon fill='%238ba0b0' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/%3E%3Cpolygon fill='%23a8c3d6' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/%3E%3Cpolygon fill='%238ba0b0' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/%3E%3Cpolygon fill='%23a8c3d6' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/%3E%3Cpath fill='%23c6e5fc' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/%3E%3Cpolygon fill='%239eaeb0' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/%3E%3Cpolygon fill='%23c0d3d6' points='70.7 200 70.8 192.4 63.2 200'/%3E%3Cpolygon fill='%23e2f8fc' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/%3E%3Cpolygon fill='%23c0d3d6' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/%3E%3Cpolygon fill='%239eaeb0' points='136.7 200 129.2 192.5 129.2 200'/%3E%3Cpolygon fill='%23e2f8fc' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/%3E%3Cpolygon fill='%239eaeb0' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/%3E%3Cpolygon fill='%23e2f8fc' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/%3E%3Cpolygon fill='%23c0d3d6' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/%3E%3Cpolygon fill='%23e2f8fc' points='0 63.2 63.2 0 27.8 0 0 27.8'/%3E%3C/g%3E%3C/svg%3E");
          }
        `}
      </style>
    </div>
  );
};

LoggedInHome.getInitialProps = async function ({ req }) {
  if (req) {
    const { host } = req.headers;

    return { hostname: host };
  }

  return { hostname: 'error_refresh_page' };
};

export default LoggedInHome;
