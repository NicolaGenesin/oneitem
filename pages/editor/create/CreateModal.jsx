import React, { useState } from 'react';
import {
  Input, InputGroup, Button, Heading, Modal, ModalOverlay, ModalContent,
  ModalBody, Alert, AlertIcon, FormLabel, InputRightElement, FormControl,
  ModalFooter,
} from '@chakra-ui/react';
import fire from '../../../config/fire-config';

const CreateModal = (isOpen, onOpen, onClose, productId) => {
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
    fire.auth().createUserWithEmailAndPassword(state.email, state.password)
      .then((response) => {
        fire.firestore()
          .collection('products')
          .doc(productId)
          .set({ userId: response.user.uid }, { merge: true });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setState({ ...state, isLoading: false }); onClose();
        }, 1000);
      });

    onOpen();
  };

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
            <Alert status="success" rounded="md">
              <AlertIcon />
              Your page is now visible here!
              {' '}
              one9.com/xyzu.teapot
            </Alert>
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
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={state.isLoading} colorScheme="teal" onClick={handleSubmit}>Create Account</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;
