import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import {
  Input, InputGroup, Button, Heading, Modal, ModalOverlay, ModalContent,
  ModalBody, Alert, AlertIcon, FormLabel, InputRightElement, FormControl,
  ModalFooter, HStack, IconButton, VStack, Text, Popover, PopoverTrigger,
  PopoverArrow, PopoverHeader, PopoverContent, AlertDescription,
} from '@chakra-ui/react';
import {
  MdLink,
} from 'react-icons/md';
import Router from 'next/router';
import { copyToClipboard } from '../utils/document';
import { isValidEmail } from '../utils/validation';
import fire from '../config/fire-config';

const CreateModal = (isOpen, onOpen, onClose, hostname, productId) => {
  const initialRef = React.useRef();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [state, setState] = useState({ isLoading: false });
  const stateRef = useRef();

  stateRef.current = { ...state, productId };

  const updateState = (target, value) => {
    setState({ ...state, [target]: value });
  };

  const handleSubmit = (event) => {
    const newState = stateRef.current;

    if (newState.password !== newState.confirmPassword || !isValidEmail(newState.email)) {
      setState({ ...newState, isLoading: false, error: true });
      return;
    }

    setState({ ...newState, isLoading: true });

    event.preventDefault();
    fire.auth().createUserWithEmailAndPassword(newState.email, newState.password)
      .then((response) => {
        fire.firestore()
          .collection('users')
          .doc(response.user.uid)
          .set({ productId: newState.productId });

        setTimeout(() => {
          onClose();
          Router.push('/home');
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          setState({ ...newState, isLoading: false, error: true });
        }, 1000);
      });
  };

  const onEnterPress = useCallback((event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onEnterPress, false);

    return () => {
      document.removeEventListener('keydown', onEnterPress, false);
    };
  }, []);

  const pageUrl = `${hostname}/${productId}`;

  return (
    <>
      <Modal
        size="xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <Heading size="md" mt="16px" mb="16px">Done!</Heading>
            <VStack>
              <Text w="100%">
                Your page is now available at this page!
              </Text>
              <HStack w="100%">
                <Input variant="filled" value={pageUrl} onChange={() => {}} />
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      colorScheme="pink"
                      aria-label="Link share"
                      icon={<MdLink />}
                      onClick={() => { copyToClipboard(pageUrl); }}
                    />
                  </PopoverTrigger>
                  <PopoverContent w="230px">
                    <PopoverArrow />
                    <PopoverHeader>Copied to your clipboard!</PopoverHeader>
                  </PopoverContent>
                </Popover>
              </HStack>
            </VStack>
            <Heading size="md" mt="16px" mb="16px">What's next?</Heading>
            <Alert status="info" rounded="md">
              <AlertIcon />
              If you want to be able to accept
              payments or edit your listing, please
              create an Account.
            </Alert>

            <FormControl>
              <FormLabel mt="16px">Email</FormLabel>
              <Input ref={initialRef} placeholder="john.doe@gmail.com" onInput={(e) => updateState('email', e.target.value)} />
            </FormControl>

            <FormLabel mt="16px">Password (6 characters minumum)</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                onInput={(e) => updateState('password', e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormLabel mt="16px">Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                onInput={(e) => updateState('confirmPassword', e.target.value)}
              />
            </InputGroup>

            {state.error && (
            <Alert status="error" rounded="md" mt="16px">
              <AlertIcon />
              <AlertDescription mr={2}>
                The email may not be valid, the passwords could be too weak or not match.
              </AlertDescription>
            </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button disabled={!state.email || !state.password || !state.confirmPassword} isLoading={state.isLoading} colorScheme="teal" onClick={handleSubmit}>Create Account</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;
