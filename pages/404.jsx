import React from 'react';
import Link from 'next/link';

export default function FourOhFour() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      The page you were looking for might have been unpublished.
      <br />
      <Link href="/">
        Go back home
      </Link>
    </>
  );
}
