import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import {
  Box, Image, Spacer, Badge, Wrap, WrapItem,
  Button, Text, HStack, VStack, Stat, StatNumber,
  Heading, StatLabel, Center, IconButton, Input,
  Alert, AlertIcon, Link,
} from '@chakra-ui/react';
import {
  MdBuild, MdDelete, MdPayment, MdExitToApp, MdLink,
  MdAddCircleOutline,
} from 'react-icons/md';
import {
  AiOutlineEye, AiOutlineDashboard,
} from 'react-icons/ai';
import {
  HiOutlineExternalLink,
} from 'react-icons/hi';
import {
  EmailShareButton, FacebookShareButton, LinkedinShareButton,
  PinterestShareButton, RedditShareButton, TelegramShareButton,
  TumblrShareButton, TwitterShareButton, WhatsappShareButton,
  FacebookIcon, TwitterIcon, LinkedinIcon, PinterestIcon, TelegramIcon,
  WhatsappIcon, RedditIcon, TumblrIcon, EmailIcon,
} from 'react-share';
import { copyToClipboard } from '../../utils/document';
import fire from '../../config/fire-config';
import useAuth from '../../hooks/useAuth';
import Loader from '../../components/Loader';
import usei18n from '../../i18n/index';

const logout = (event) => {
  event.preventDefault();
  fire.auth().signOut();
};

const enablePayments = async (event, storeId, stripeAccountId) => {
  event.preventDefault();

  const response = await fetch('/api/onboarding', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stripeAccountId,
    }),
  });

  if (response.status === 200) {
    const json = await response.json();

    window.open(json.url);

    if (!stripeAccountId) {
      fire.firestore()
        .collection('stores')
        .doc(storeId)
        .set({
          stripe:
          {
            account: { id: json.stripeAccountId },
          },
        }, {
          merge:
          true,
        });
    }
  } else {
    console.log('Error creating creating an account for this user');
  }
};

const editListing = (event, productId) => {
  event.preventDefault();

  Router.push(`/editor/?productId=${productId}`);
};

const seeListing = (event, path) => {
  event.preventDefault();

  Router.push(path);
};

const createNewProduct = (event) => {
  event.preventDefault();

  Router.push('/editor/');
};

const changeListingStatus = (event, product, loggedInState, setLoggedInState) => {
  event.preventDefault();

  const productReference = fire.firestore()
    .collection('products')
    .doc(product.id);

  productReference.update({
    visible: !product.visible,
  });

  const newLoggedInState = Object.assign(loggedInState, {});

  const itemToUpdate = newLoggedInState.store.products
    .find((x) => x.id === product.id);

  itemToUpdate.visible = !itemToUpdate.visible;

  setLoggedInState({ ...newLoggedInState });
};

const LoggedInHome = () => {
  const i18n = usei18n();
  const auth = useAuth(true);
  const { setLoggedInState } = auth;
  const { loggedInState } = auth;
  const { pending, store, storeId } = loggedInState;
  const [hasCalledStripe, setHasCalledStripe] = useState(false);
  const [isCheckingStripeAccount, setIsCheckingStripeAccount] = useState(false);

  useEffect(() => {
    async function getOnboardingState() {
      if (!hasCalledStripe && store && store.stripe && store.stripe.account.id) {
        const response = await fetch('/api/onboarding_state', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stripeAccountId: store.stripe.account.id,
          }),
        });

        if (response.status === 200) {
          const json = await response.json();

          fire.firestore()
            .collection('stores')
            .doc(storeId)
            .set({
              stripe:
            {
              account: { ...json },
            },
            }, {
              merge: true,
            });

          const copy = { ...loggedInState };

          copy.store.stripe.account.detailsSubmitted = json.detailsSubmitted;
          copy.store.stripe.account.chargesEnabled = json.chargesEnabled;

          setLoggedInState(copy);
          setHasCalledStripe(true);
        }
      }
    }

    getOnboardingState();
  }, [store]);

  if (pending) {
    return <Loader />;
  }

  const canCreateCharges = store
    && store.stripe
    && store.stripe.account
    && store.stripe.account.chargesEnabled
    && store.stripe.account.detailsSubmitted;

  return (
    <div>
      <div className="svgBg">
        <Center bg="primary.50" pb="10%">
          <VStack mt="5%" mb="5%" w={[340, 400, 560]}>
            <Heading size="lg" mb="16px">
              {i18n.t('home.hi', { storeName: store.name })}
            </Heading>
            <Box
              bg="white"
              p="16px"
              rounded="md"
              boxShadow="2xl"
              mb="16px"
              w="100%"
            >
              <VStack>
                {/* <HStack spacing="48px">
                  <VStack>
                    <Stat>
                      <StatLabel>{i18n.t('home.itemsSold')}</StatLabel>
                      <StatNumber align="center">0</StatNumber>
                    </Stat>
                  </VStack>
                  <VStack>
                    <Stat>
                      <StatLabel>{i18n.t('home.pageViews')}</StatLabel>
                      <StatNumber align="center">
                        {
                        store.products
                          .map((product) => product.views)
                          .reduce((prev, curr) => prev + curr, 0)
                      }
                      </StatNumber>
                    </Stat>
                  </VStack>
                </HStack> */}
                {(!canCreateCharges && store.stripe && store.stripe.account.id) && (
                <Alert status="info" rounded="md">
                  <AlertIcon />
                  {i18n.t('home.pendingStripeVerification')}
                </Alert>
                )}
                {!canCreateCharges && (
                <Button
                  boxShadow="md"
                  w="100%"
                  leftIcon={<MdPayment />}
                  colorScheme="primaryButton"
                  isLoading={isCheckingStripeAccount}
                  onClick={async (event) => {
                    setIsCheckingStripeAccount(true);

                    await enablePayments(
                      event,
                      storeId,
                      store.stripe && store.stripe.account.id,
                    );

                    setIsCheckingStripeAccount(false);
                  }}
                >
                  {!store.stripe ? i18n.t('home.acceptPayments') : i18n.t('home.updateBankDetails')}
                </Button>
                )}
                {canCreateCharges && (
                <Link w="100%" href="https://dashboard.stripe.com/login" target="_blank">
                  <Button
                    boxShadow="md"
                    w="100%"
                    leftIcon={<AiOutlineDashboard />}
                    colorScheme="primaryButton"
                  >
                    {i18n.t('home.linkToStripe')}
                  </Button>
                </Link>
                )}
                <Button
                  boxShadow="md"
                  w="100%"
                  leftIcon={<MdAddCircleOutline />}
                  colorScheme="primaryButton"
                  onClick={(event) => { createNewProduct(event); }}
                >
                  {i18n.t('home.createNewListing')}
                </Button>
              </VStack>
            </Box>
            <Heading size="lg" mb="16px">
              {i18n.t('home.title')}
            </Heading>
            {store.products
              .sort((a, b) => b.updatedAt - a.updatedAt)
              .map((product, index) => {
                const pageUrl = `https://ezyou.shop/${product.storeId}/${product.id}`;

                return (
                  <Box
                    key={index}
                    borderRadius="lg"
                    overflow="hidden"
                    bg="white"
                    boxShadow="2xl"
                    mb="24px"
                    w="100%"
                  >
                    <Image
                      bg="placeholder.50"
                      objectFit="cover"
                      h="190px"
                      w="100%"
                      src={product.images[0].data_url}
                    />
                    <Box
                      p="5"
                    >
                      <Box
                        d="flex"
                        alignItems="baseline"
                      >
                        <Badge
                          borderRadius="md"
                          colorScheme={product.visible ? 'teal' : 'yellow'}
                        >
                          {product.visible ? i18n.t('home.item.published') : i18n.t('home.item.unpublished')}
                        </Badge>
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          ml="2"
                        >
                          {i18n.t('home.item.updatedOn')}
                          {' '}
                          {new Date(product.updatedAt * 1000).toLocaleString('us').slice(0, 10)}
                        </Box>
                      </Box>
                      <Box
                        mb="8px"
                        mt="16px"
                        fontWeight="bold"
                        fontSize="lg"
                        lineHeight="tight"
                      >
                        {product.name}
                      </Box>
                      <HStack mt="16px" mb="16px">
                        <Button
                          boxShadow="md"
                          variant="solid"
                          size="md"
                          leftIcon={<HiOutlineExternalLink />}
                          colorScheme="primaryButton"
                          color="white"
                          onClick={(event) => { seeListing(event, `${product.storeId}/${product.id}`); }}
                        >
                          {i18n.t('home.item.seeListing')}
                        </Button>
                        <Spacer />
                        {product.visible && (
                        <Button
                          boxShadow="md"
                          variant="solid"
                          size="md"
                          leftIcon={<MdDelete />}
                          colorScheme="primaryImportantButton"
                          color="white"
                          onClick={(event) => {
                            changeListingStatus(event,
                              product,
                              loggedInState,
                              setLoggedInState);
                          }}
                        >
                          {i18n.t('home.item.hideListing')}
                        </Button>
                        )}
                        {!product.visible && (
                        <Button
                          boxShadow="md"
                          variant="solid"
                          size="md"
                          leftIcon={<AiOutlineEye />}
                          colorScheme="primaryButton"
                          color="white"
                          onClick={(event) => {
                            changeListingStatus(event,
                              product,
                              loggedInState,
                              setLoggedInState);
                          }}
                        >
                          {i18n.t('home.item.publishListing')}
                        </Button>
                        )}
                        <Button
                          boxShadow="md"
                          variant="solid"
                          size="md"
                          leftIcon={<MdBuild />}
                          colorScheme="primaryButton"
                          color="white"
                          onClick={(event) => { editListing(event, product.id); }}
                        >
                          {i18n.t('home.item.editListing')}
                        </Button>
                      </HStack>
                      {product.visible && (
                        <VStack>
                          <Text
                            w="100%"
                            fontWeight="semibold"
                            fontSize="sm"
                            mb="8px"
                          >
                            {i18n.t('home.item.share')}
                          </Text>
                          <HStack w="100%" mb="8px">
                            <Input
                              p="8px"
                              boxShadow="md"
                              variant="filled"
                              value={pageUrl}
                              onChange={() => {}}
                            />
                            <IconButton
                              boxShadow="md"
                              colorScheme="pink"
                              aria-label="Link share"
                              icon={<MdLink />}
                              onClick={() => { copyToClipboard(pageUrl); }}
                            />
                          </HStack>
                          <Wrap spacing="12px">
                            <WrapItem boxShadow="md">
                              <FacebookShareButton
                                url={pageUrl}
                              >
                                <FacebookIcon size={40} borderRadius="8px" />
                              </FacebookShareButton>
                            </WrapItem>
                            <WrapItem boxShadow="md">
                              <TwitterShareButton
                                url={pageUrl}
                              >
                                <TwitterIcon size={40} borderRadius="8px" />
                              </TwitterShareButton>
                            </WrapItem>
                            <WrapItem boxShadow="md">
                              <WhatsappShareButton
                                url={pageUrl}
                              >
                                <WhatsappIcon size={40} borderRadius="8px" />
                              </WhatsappShareButton>
                            </WrapItem>
                            <WrapItem boxShadow="md">
                              <TelegramShareButton
                                url={pageUrl}
                              >
                                <TelegramIcon size={40} borderRadius="8px" />
                              </TelegramShareButton>
                            </WrapItem>
                            <WrapItem boxShadow="md">
                              <PinterestShareButton
                                url={pageUrl}
                                media={product.images[0].data_url}
                              >
                                <PinterestIcon size={40} borderRadius="8px" />
                              </PinterestShareButton>
                            </WrapItem>
                            <WrapItem boxShadow="md">
                              <RedditShareButton
                                url={pageUrl}
                                title={product.name}
                                windowWidth={660}
                                windowHeight={460}
                              >
                                <RedditIcon size={40} borderRadius="8px" />
                              </RedditShareButton>
                            </WrapItem>
                            <WrapItem boxShadow="md">
                              <TumblrShareButton
                                url={pageUrl}
                                title={product.name}
                              >
                                <TumblrIcon size={40} borderRadius="8px" />
                              </TumblrShareButton>
                            </WrapItem>
                            <WrapItem boxShadow="md">
                              <LinkedinShareButton
                                url={pageUrl}
                              >
                                <LinkedinIcon size={40} borderRadius="8px" />
                              </LinkedinShareButton>
                            </WrapItem>
                            <WrapItem boxShadow="md">
                              <EmailShareButton
                                url={pageUrl}
                                subject={product.name}
                                body="body"
                              >
                                <EmailIcon size={40} borderRadius="8px" />
                              </EmailShareButton>
                            </WrapItem>
                          </Wrap>
                        </VStack>
                      )}
                    </Box>
                  </Box>
                );
              })}
            <Button
              colorScheme="primaryButton"
              variant="outline"
              leftIcon={<MdExitToApp />}
              onClick={logout}
            >
              {i18n.t('home.logout')}

            </Button>
          </VStack>
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

export default LoggedInHome;
