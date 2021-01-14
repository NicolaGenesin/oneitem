import React, { useEffect } from 'react';
import Router from 'next/router';

import {
  Button,
} from '@chakra-ui/react';
import fire from '../../config/fire-config';

const LoggedInHome = () => {
  useEffect(() => {
    if (fire) {
      if (!fire.auth().currentUser) {
        Router.push('/');
      } else {
        fire.auth().onAuthStateChanged((user) => {
          if (!user) {
            Router.push('/');
          }
        });
      }
    }
  });

  const logout = (event) => {
    event.preventDefault();
    fire.auth().signOut();
  };

  return (
    <div>
      HOME
      <br />
      {fire.auth().currentUser ? fire.auth().currentUser.uid : 'you are not logged in'}
      <br />
      <Button colorScheme="teal" onClick={logout}>Logout</Button>
    </div>
  );
};

export default LoggedInHome;
