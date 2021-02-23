import React, { useState } from 'react';
import {
  Box, Input, Button, Text, HStack, Spacer, Textarea,
} from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';
import usei18n from '../i18n/index';

const submitFeedback = async (content) => {
  await fetch('/api/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  });
};

const Feedback = () => {
  const i18n = usei18n();

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [content, setContent] = useState({});

  let triggerText = !isSent ? i18n.t('feedback.title') : i18n.t('feedback.thankYou');

  if (isMobile) {
    triggerText = !isSent ? '☝️' : i18n.t('feedback.thankYou');
  }

  return (
    <Box
      h="auto"
      w="auto"
      maxW="350px"
      position="fixed"
      bottom="0"
      boxShadow="md"
      borderRadius="5px 5px 0 0"
      borderColor="#ded"
      borderWidth="1px"
      bg="#edf5ed"
      p="10px 15px"
    >
      {!isButtonClicked ? (
        <Text
          fontWeight="semibold"
          fontSize="xs"
          onClick={() => {
            setIsButtonClicked(!isButtonClicked);
          }}
        >
          {triggerText}
        </Text>
      ) : (
        <Box>
          <Text
            fontWeight="semibold"
            mb="8px"
          >
            {i18n.t('feedback.title')}
          </Text>
          <Text
            mb="8px"
            fontSize="sm"
          >
            {i18n.t('feedback.description')}
          </Text>
          <Input
            boxShadow="xs"
            bg="white"
            onChange={() => {}}
            mb="8px"
            fontSize="sm"
            onInput={(e) => setContent({ ...content, email: e.target.value })}
            placeholder={i18n.t('feedback.email')}
            value={content.email}
          />
          <Textarea
            boxShadow="xs"
            bg="white"
            onChange={() => {}}
            mb="16px"
            fontSize="sm"
            h="150px"
            onInput={(e) => setContent({ ...content, message: e.target.value })}
            placeholder={i18n.t('feedback.message')}
            value={content.message}
          />
          <HStack>
            <Button
              letterSpacing="wide"
              colorScheme="primaryImportantButton"
              color="#333"
              variant="outline"
              size="sm"
              onClick={() => setIsButtonClicked(!isButtonClicked)}
            >
              {i18n.t('feedback.close')}
            </Button>
            <Spacer />
            <Button
              letterSpacing="wide"
              colorScheme="primaryImportantButton"
              color="white"
              size="sm"
              onClick={() => {
                setIsSent(true);
                submitFeedback(content);
                setIsButtonClicked(false);
              }}
            >
              {i18n.t('feedback.submit')}
            </Button>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default Feedback;
