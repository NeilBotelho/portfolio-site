import Head from 'next/head'
import Header from '@components/Header'

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <Header/>
      <body className="content">{children}</body>
      <footer></footer>
      <style jsx global>{`
        *{
          margin:0;
          border:0;
        }      
        `}</style>
    </>
  )
}
