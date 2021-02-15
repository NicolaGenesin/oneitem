import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import Router from 'next/router';
import {
  Input, InputGroup, Button, Heading, Modal, ModalOverlay, ModalContent,
  ModalBody, FormLabel, InputRightElement, FormControl, ModalFooter,
  Alert, AlertIcon, AlertDescription, Text, Link, Box,
} from '@chakra-ui/react';
import fire from '../config/fire-config';
import usei18n from '../i18n/index';

const LoginModal = (isOpen, onOpen, onClose) => {
  const i18n = usei18n();
  const initialRef = React.useRef();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [state, setState] = useState({ isLoading: false });
  const updateState = (target, value) => {
    setState({ ...state, [target]: value });
  };
  const stateRef = useRef();

  stateRef.current = state;

  const handleSubmit = (event, modalState) => {
    const newState = modalState || stateRef.current;
    setState({ ...newState, isLoading: true });

    event.preventDefault();
    fire.auth().signInWithEmailAndPassword(newState.email, newState.password)
      .then((response) => {
        console.log('Logged In', response.user.uid);

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
    document.addEventListener('keydown', (e) => onEnterPress(e), false);

    return () => {
      document.removeEventListener('keydown', (e) => onEnterPress(e), false);
    };
  }, []);

  return (
    <>
      <Modal
        // size="xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        m={0}
        p={0}
        h="100%"
        w="100%"
        // size="full"
        // blockScrollOnMount
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <Heading size="md" mt="16px" mb="16px">{i18n.t('loginModal.title')}</Heading>
            <FormControl>
              <FormLabel mt="16px">Email</FormLabel>
              <Input ref={initialRef} placeholder="john@gmail.com" onInput={(e) => updateState('email', e.target.value)} />
            </FormControl>
            <FormLabel mt="16px">Password</FormLabel>
            <InputGroup size="md">
              <Input
                onInput={(e) => updateState('password', e.target.value)}
                pr="4.5rem"
                type={show ? 'text' : 'password'}
              />
              <InputRightElement width="4.5rem">
                <Button colorScheme="primaryButton" h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? i18n.t('loginModal.hidePassword') : i18n.t('loginModal.showPassword')}
                </Button>
              </InputRightElement>
            </InputGroup>
            {state.error && (
            <Alert status="error" rounded="md" mt="16px">
              <AlertIcon />
              <AlertDescription mr={2}>
                {i18n.t('loginModal.error')}
              </AlertDescription>
            </Alert>
            )}
            <Box mt="24px">
              <Link href="/">
                <Text fontSize="sm">
                  {i18n.t('loginModal.createLink')}
                </Text>
              </Link>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button disabled={!state.email || !state.password} isLoading={state.isLoading} colorScheme="primaryButton" color="white" onClick={(e) => handleSubmit(e, state)}>{i18n.t('loginModal.login')}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
