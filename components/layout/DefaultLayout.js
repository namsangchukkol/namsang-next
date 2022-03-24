import Navbar from "./navbar/DefaultNavbar"
import Footer from "./footer/DefaultFooter"
import Head from "next/head"
import SocialMediaContainer from "../badges/SocialMediaContainer"

export default function ({ children, ...props }) {
  const metaTitle = props.metaData?.metaTitle
  const metaDescription = props.metaData?.metaDescription
  const domain = process.env.VERCEL_URL || process.env.DOMAIN
  //get hreflangs
  const hreflangs = props.router.locales.map(locale => {
    return (<link key={locale} rel="alternate" href={`${domain}${locale !== props.router.defaultLocale ? '/' + locale : ''}${props.router.asPath}`} hrefLang={locale} />)
  })

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} key="ogtitle" />
        <meta property="og:description" content={metaDescription} key="ogdescription" />
        {hreflangs}
        <link rel="canonical" href={domain + props.router.asPath} />
      </Head>
      {/* some layout component */}
      <Navbar />
      {/* <SocialMediaContainer /> */}
      <main>{children}</main>
      <Footer />
      {/* some layout component */}
    </>
  )
}