import React from 'react';
import { Center } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';

const Loader = () => (
  <Center h="100vh">
    <BeatLoader size={18} color="teal" />
  </Center>
);

export default Loader;
