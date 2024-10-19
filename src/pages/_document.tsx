import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Vendify</title>
      <meta
        name="description"
        content="A digital multi-vendor e-commerce platform"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      /> */}
      <link rel="icon" href="/images/vendify logo white.jpg" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin={""}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
