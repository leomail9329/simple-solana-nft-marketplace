import { Wallets } from "@/components/Wallet";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Wallets>
          <Main />
          <NextScript />
        </Wallets>
      </body>
    </Html>
  );
}
