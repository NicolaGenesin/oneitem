import Link from 'next/link'

function Root() {
  return (
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
  )
}

export default Root