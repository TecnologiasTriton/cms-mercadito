// Import components
import Header from './Header'
import Sidebar from './Sidebar'

// Import dependencies
import { useState } from 'react'
import Head from 'next/head'

const Layout = ({ children, title = "CMS" }) => {
  const [sidebar, setSidebar] = useState(false)

  return(
    <div>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Header sidebar={sidebar} setSidebar={setSidebar} />
      </header>
      <main style={{ paddingTop: "60px", zIndex: "1" }}>{children}</main>
      <footer></footer>
    </div>
  )
}

export default Layout