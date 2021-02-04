import React from 'react';
import { Center } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';

const Loader = () => (
  <Center h="100vh" bg="primary.50">
    <BeatLoader size={18} color="#065666" />
  </Center>
);

export default Loader;
