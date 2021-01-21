import React, { useState, useEffect, useCallback } from 'react';
import {
  Input, InputGroup, Button, Heading, Modal, ModalOverlay, ModalContent,
  ModalBody, Alert, AlertIcon, FormLabel, InputRightElement, FormControl,
  ModalFooter, HStack, IconButton, VStack, Text, Popover, PopoverTrigger,
  PopoverArrow, PopoverHeader, PopoverContent,
} from '@chakra-ui/react';
import {
  MdLink,
} from 'react-icons/md';
import { copyToClipboard } from '../utils/document';
import fire from '../config/fire-config';

const CreateModal = (isOpen, onOpen, onClose, hostname, productId) => {
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
          .collection('users')
          .doc(response.user.uid)
          .set({ productId });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setState({ ...state, isLoading: false });
          onClose();
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
