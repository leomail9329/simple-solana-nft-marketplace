import bs58 from "bs58";
import { PublicKey, Keypair } from "@solana/web3.js";
import idl from "./marketplaceSOLIDL.json";
import * as anchor from "@project-serum/anchor";
import { connection } from "../config";
import { MarketplaceSol } from "./marketplaceSOLType";
import { PROGRAM_ID } from "./marketplaceSOLConstant";

export const marketplaceSOLProgramID = new PublicKey(PROGRAM_ID);

const marketplaceSOLIDL: any = idl;

export const getProgram = (wallet: any) => {
  let provider = new anchor.AnchorProvider(
    connection,
    wallet,
    {}
  );
  const program = new anchor.Program(marketplaceSOLIDL, PROGRAM_ID, provider);
  return program;
};