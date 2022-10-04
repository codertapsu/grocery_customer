import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  public render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* <meta name='referrer' content='strict-origin-when-cross-origin' /> */}
          {/* <link rel='preload' href='/fonts/inter-var-latin.woff2' as='font' type='font/woff2' crossOrigin='anonymous' /> */}
          {/* Bootstrap Icons */}
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' />
        </Head>
        <body>
          <Main />
          <div id='overlay-backdrop'></div>
          {/* <div id='root_notification'></div> */}
          <NextScript />
        </body>
      </Html>
    );
  }
}
