import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import Router from 'next/router';
import {
  Input, InputGroup, Button, Heading, Modal, ModalOverlay, ModalContent,
  ModalBody, FormLabel, InputRightElement, FormControl, ModalFooter,
  Alert, AlertIcon, AlertDescription, AlertTitle,
} from '@chakra-ui/react';
import fire from '../config/fire-config';

const LoginModal = (isOpen, onOpen, onClose) => {
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
        size="xl"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <Heading size="md" mt="16px" mb="16px">Welcome Back!</Heading>

            <FormControl>
              <FormLabel mt="16px">Email</FormLabel>
              <Input ref={initialRef} placeholder="john.doe@gmail.com" onInput={(e) => updateState('email', e.target.value)} />
            </FormControl>

            <FormLabel mt="16px">Password</FormLabel>
            <InputGroup size="md">
              <Input
                onInput={(e) => updateState('password', e.target.value)}
                pr="4.5rem"
                type={show ? 'text' : 'password'}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {state.error && (
            <Alert status="error" rounded="md" mt="16px">
              <AlertIcon />
              <AlertDescription mr={2}>
                The email address or password is incorrect.
              </AlertDescription>
            </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button isLoading={state.isLoading} colorScheme="teal" onClick={(e) => handleSubmit(e, state)}>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
