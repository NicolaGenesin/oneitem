import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import {
  Box,
  Button, Text, HStack, VStack, Stat, StatNumber,
  Heading, StatLabel, Center, IconButton, Input,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverBody, PopoverArrow, PopoverCloseButton,
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
import { copyToClipboard } from '../../utils/document';
import fire from '../../config/fire-config';
import useAuth from '../../hooks/useAuth';
import Loader from '../../components/Loader';
import usei18n from '../../i18n/index';

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

  Router.push('/editor');
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

const LoggedInHome = () => {
  const i18n = usei18n();

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

  const pageUrl = `oneitem.vercel.app/${state.id}`;

  return (
    <div>
      <div className="svgBg">
        <Center h="100vh" bg="primary.100">
          <Box bg="white" p="16px" rounded="md" boxShadow="2xl">
            <VStack>
              <Text mb="16px">
                {i18n.t('home.hi', { email: user.email })}
              </Text>
              <Heading as="h2" size="xl">
                {i18n.t('home.title')}
              </Heading>
              <HStack spacing="48px" mb="16px">
                <VStack>
                  <Stat>
                    <StatLabel>{i18n.t('home.itemsSold')}</StatLabel>
                    <StatNumber align="center">0</StatNumber>
                  </Stat>
                </VStack>
                <VStack>
                  <Stat>
                    <StatLabel>{i18n.t('home.pageViews')}</StatLabel>
                    <StatNumber align="center">{ state.views }</StatNumber>
                  </Stat>
                </VStack>
              </HStack>
              <Popover>
                <PopoverTrigger>
                  <Button w="300px" leftIcon={<MdPayment />} colorScheme="primaryButton" color="black">{i18n.t('home.acceptPayments')}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Not implemented / Non implementato</PopoverHeader>
                  <PopoverBody>
                    From here you will create an account with Stripe so you can receive money.
                    After this is done, people will be able to buy your product.
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Button w="300px" leftIcon={<MdBuild />} colorScheme="primaryButton" color="black" onClick={editListing}>{i18n.t('home.editListing')}</Button>
              {state.visible && <Button w="300px" leftIcon={<MdDelete />} colorScheme="primaryButton" color="black" onClick={(event) => { changeListingStatus(event, state, setState); }}>{i18n.t('home.hideListing')}</Button>}
              {!state.visible && <Button w="300px" leftIcon={<AiOutlineEye />} colorScheme="primaryButton" color="black" onClick={(event) => { changeListingStatus(event, state, setState); }}>{i18n.t('home.publishListing')}</Button>}
              <Button w="300px" mb="24px" leftIcon={<MdExitToApp />} colorScheme="primaryButton" color="black" onClick={logout}>{i18n.t('home.logout')}</Button>
              <Heading as="h2" size="xl">{i18n.t('home.share')}</Heading>
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
                    /*
                    <IconButton
                      colorScheme="primaryButton"
                      aria-label="Pinterest share"
                      icon={<FaPinterest />}
                    }
                    <IconButton
                      colorScheme="red"
                      aria-label="Instagram share"
                      icon={<FaInstagram />}/>
                    */
                    }
                  </HStack>
                </Center>
              </Box>
            </VStack>
          </Box>
        </Center>
      </div>
      <style jsx>
        {`
          // // https://www.svgbackgrounds.com/#hollowed-boxes
          // .svgBg {
          //   background-color: #f7fefe;
          //   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg %3E%3Cpolygon fill='%238ba0b0' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/%3E%3Cpolygon fill='%23a8c3d6' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/%3E%3Cpolygon fill='%238ba0b0' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/%3E%3Cpolygon fill='%23a8c3d6' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/%3E%3Cpath fill='%23c6e5fc' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/%3E%3Cpolygon fill='%239eaeb0' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/%3E%3Cpolygon fill='%23c0d3d6' points='70.7 200 70.8 192.4 63.2 200'/%3E%3Cpolygon fill='%23e2f8fc' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/%3E%3Cpolygon fill='%23c0d3d6' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/%3E%3Cpolygon fill='%239eaeb0' points='136.7 200 129.2 192.5 129.2 200'/%3E%3Cpolygon fill='%23e2f8fc' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/%3E%3Cpolygon fill='%239eaeb0' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/%3E%3Cpolygon fill='%23e2f8fc' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/%3E%3Cpolygon fill='%23c0d3d6' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/%3E%3Cpolygon fill='%23e2f8fc' points='0 63.2 63.2 0 27.8 0 0 27.8'/%3E%3C/g%3E%3C/svg%3E");
          // }
        `}
      </style>
    </div>
  );
};

LoggedInHome.getInitialProps = async function ({ req }) {
  return {};
};

export default LoggedInHome;
