import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="https://cdn.sanity.io/images/k1265eyp/production/eaaf0e5329b6145f1fafa3587f835c22b00c94c5-95x104.png" />
          <link href="https://fonts.googleapis.com/css2?family=Prompt&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument