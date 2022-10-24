import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

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
          <Script id='google-tag-manager' strategy='afterInteractive'>
            {`(function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', 'GTM-M58KDQW');
            `}
          </Script>
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' />
        </Head>
        <body>
          <Main />
          <div id='overlay-backdrop'></div>
          {/* <div id='root_notification'></div> */}
          <NextScript />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            <iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-M58KDQW'
              height='0'
              width='0'
              style='display:none;visibility:hidden'
            />`,
            }}
          />
        </body>
      </Html>
    );
  }
}
