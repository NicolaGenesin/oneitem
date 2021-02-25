import React from 'react';
import {
  Input, ModalHeader, Button, Modal, ModalOverlay, ModalContent,
  ModalBody, FormLabel, FormControl, ModalFooter,
  Text, ModalCloseButton,
} from '@chakra-ui/react';
import { isValidEmail } from '../utils/validation';
import usei18n from '../i18n/index';

const Main = ({
  isOpen, onOpen, onClose, email, setEmail, emailValidity, setEmailValidity,
}) => {
  const i18n = usei18n();

  return (
    <>
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          m="8px"
        >
          <ModalHeader>{i18n.t('components.emailCheckoutModal.title')}</ModalHeader>
          <ModalCloseButton mt="8px" />
          <ModalBody mb="8px">
            <FormControl>
              <FormLabel
                mb="16px"
              >
                {i18n.t('components.emailCheckoutModal.description')}
              </FormLabel>
              <Input
                placeholder="john@gmail.com"
                boxShadow="md"
                value={email}
                onInput={(e) => {
                  setEmail(e.target.value);
                }}
                isInvalid={emailValidity === false}
              />
            </FormControl>
            <Text
              mt="16px"
              fontSize="xs"
            >
              {i18n.t('components.emailCheckoutModal.footer')}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              boxShadow="md"
              onClick={onClose}
              mr="16px"
            >
              {i18n.t('components.emailCheckoutModal.back')}
            </Button>
            <Button
              boxShadow="md"
              colorScheme="primaryButton"
              onClick={() => {
                const result = isValidEmail(email);

                setEmailValidity(result);

                if (result) {
                  onClose();
                }
              }}
            >
              {i18n.t('components.emailCheckoutModal.proceed')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Main;
