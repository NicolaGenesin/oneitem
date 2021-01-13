import React from 'react';
import Link from 'next/link';

function Main() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/editor/edit">
            <a>Editor</a>
          </Link>
        </li>
        <li>
          <Link href="/dynamicCustomerPage">
            <a>Sample product page</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Main;
