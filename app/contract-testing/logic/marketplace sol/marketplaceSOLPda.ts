import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";
import { marketplaceSOLProgramID } from "./marketplaceSOLConfig";

export const getConfigPda = (
  owner: PublicKey
) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("Config"), owner.toBuffer()],
    marketplaceSOLProgramID
  );
};

export const getListingStatePda = (
  seller: PublicKey,
  nftMetadata: PublicKey
) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("List"), seller.toBuffer(), nftMetadata.toBuffer()],
    marketplaceSOLProgramID
  );
};

export const getProgramNFTOwnerPda = (nftMetadata: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("ProgramStorage"), nftMetadata.toBuffer()],
    marketplaceSOLProgramID
  );
};

export const getUserPdaWallet = (user: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("UserPdaWallet"), user.toBuffer()],
    marketplaceSOLProgramID
  );
};

export const getOfferState = (
  user: PublicKey,
  nftMetadata: PublicKey,
  listingState: PublicKey
) => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("OfferState"),
      user.toBuffer(),
      nftMetadata.toBuffer(),
      listingState.toBuffer(),
    ],
    marketplaceSOLProgramID
  );
};

export const getDirectOfferState = (
  user: PublicKey,
  nftMetadata: PublicKey
) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("DirectOfferState"), user.toBuffer(), nftMetadata.toBuffer()],
    marketplaceSOLProgramID
  );
};

export const getMarketplaceState = () => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("MarketplaceState")],
    marketplaceSOLProgramID
  );
};

export const getTradersVaultPda = () => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("TradersVault")],
    marketplaceSOLProgramID
  );
};

export const getUserTradeStateMetadataPda = (tradeState: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("UserTradeStateMetadata"), tradeState.toBuffer()],
    marketplaceSOLProgramID
  );
};
