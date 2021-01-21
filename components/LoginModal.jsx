import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import {
  Input, InputGroup, Button, Heading, Modal, ModalOverlay, ModalContent,
  ModalBody, FormLabel, InputRightElement, FormControl, ModalFooter,
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

  const handleSubmit = (event) => {
    setState({ ...state, isLoading: true });

    event.preventDefault();
    fire.auth().signInWithEmailAndPassword(state.email, state.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setState({ ...state, isLoading: false });
          onClose();
          Router.push('/home');
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
          </ModalBody>

          <ModalFooter>
            <Button isLoading={state.isLoading} colorScheme="teal" onClick={handleSubmit}>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
