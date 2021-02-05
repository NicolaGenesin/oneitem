import {
  Box, Center, HStack, Text,
} from '@chakra-ui/react';
import React from 'react';

const Footer = () => (
  <div className="footer">
    <Box bg="primary.200" p="16px">
      <Center>
        <HStack>
          <Text
            color="white"
            letterSpacing="wide"
            fontWeight="semibold"
            fontSize="xs"
          >
            {new Date().getFullYear()}
            {' | '}
            © 1911 Industries Limited
          </Text>
        </HStack>
      </Center>
    </Box>
    <style jsx>
      {`
        .footer{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }
      `}
    </style>
  </div>
);

export default Footer;
