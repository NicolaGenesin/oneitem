import {
  Box, Center, HStack, Text,
} from '@chakra-ui/react';
import React from 'react';

const Footer = () => (
  <div className="footer">
    <Box>
      <Center>
        <HStack>
          <Text>
            ©
            {' '}
            {new Date().getFullYear()}
            {' | '}
            1911 Industries Limited
          </Text>
        </HStack>
      </Center>
    </Box>
    <style jsx>
      {`
        .footer{
            padding: 1rem;
            background-color: rgb(235, 195, 64);
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
