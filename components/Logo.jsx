import React from 'react';
import { Image } from '@chakra-ui/react';

export default function Logo({ height }) {
  return (
    <Image
      src="/assets/logo.png"
      objectFit="contain"
      height={height}
    />
  );
}
