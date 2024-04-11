import bs58 from "bs58";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { PROGRAM_ID } from "./marketplace sol/marketplaceSOLConstant";
import idl from "./marketplaceSOLIDL.json";

export const connection = new Connection(
  // "https://solana-devnet.g.alchemy.com/v2/SmTLHznGV1gnnP1F-hvPsTjOeVNAABTG"
  // "http://127.0.0.1:8899",
  // clusterApiUrl("devnet")
  "https://api.devnet.solana.com"
);

// const anchorWallet: any = Keypair.generate();
const sk =
  "mjscSouFove7dByjWG8yadueXxAyVt1cqsT76gt359BJneZQg8AqitFxTimBkXzSuNv3m3uAj24MF83yRrnYegs";
const anchorWallet: any = Keypair.fromSecretKey(bs58.decode(sk));
const provider = new anchor.AnchorProvider(connection, anchorWallet, {});

// export const levelManagerKeypair = async () => {
//   const sk = process.env.NEXT_PUBLIC_MARKET_OWNER_KEY!;
//   const keypair = Keypair.fromSecretKey(bs58.decode(sk));
//   return keypair;
// };

// export const sellerKeypair = async () => {
//   const sk = process.env.NEXT_PUBLIC_SELLER_PRIVATE_KEY!;
//   console.log(bs58.decode(sk));
//   const keypair = Keypair.fromSecretKey(bs58.decode(sk));
//   console.log({ keypair });
//   return keypair;
// };

// export const buyerKeypair = async () => {
//   const sk = process.env.NEXT_PUBLIC_BUYER_PRIVATE_KEY!;
//   const keypair = Keypair.fromSecretKey(bs58.decode(sk));
//   return keypair;
// };
