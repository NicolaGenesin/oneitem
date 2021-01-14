import React from 'react';
import {
  Input, InputGroup, Button, Heading, Modal, ModalOverlay, ModalContent,
  ModalBody, Alert, AlertIcon, FormLabel, InputRightElement, FormControl,
  ModalFooter,
} from '@chakra-ui/react';

const CreateModal = (isOpen, onOpen, onClose) => {
  const initialRef = React.useRef();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
              create an account with just Username and Password.
            </Alert>

            <FormControl>
              <FormLabel mt="16px">Username</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormLabel mt="16px">Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Something to remember"
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
                placeholder="Something to remember"
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>Create Account</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;
