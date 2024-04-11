import { PublicKey } from "@solana/web3.js";
import { programAddress } from "./config";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

export const getOccsManagerStatePda = () => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("OCCS_MANAGER")],
    new PublicKey(programAddress)
  );
};

export const getMetadataPda = (mint: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), mint.toBuffer()],
    PROGRAM_ID
  );
};

export const getUserOccStatePda = (user: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("USER_OCCS_STATE"), user.toBuffer()],
    new PublicKey(programAddress)
  );
};
