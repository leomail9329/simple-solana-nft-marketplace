import {
  LAMPORTS_PER_SOL,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
  SystemProgram,
  PublicKey,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  Keypair,
  ComputeBudgetProgram,
} from "@solana/web3.js";
import {
  NFT_MINT,
} from "./marketplaceSOLConstant";
import { connection } from "../config";
import { getMetadataPda, getUserOccStatePda } from "../pda";
import {
  getProgram,
  // marketplaceSOLProgram,
  marketplaceSOLProgramID,
} from "./marketplaceSOLConfig";
import { BN, LangErrorCode } from "@project-serum/anchor";
import {
  getDirectOfferState,
  getListingStatePda,
  getMarketplaceState,
  getOfferState,
  getProgramNFTOwnerPda,
  getTradersVaultPda,
  getUserPdaWallet,
  getUserTradeStateMetadataPda,
  getConfigPda,
} from "./marketplaceSOLPda";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  DUMMY_BUYER_TRADE_STATE,
  DUMMY_BUYER_TRADE_STATE_METADATA,
  DUMMY_END_TIME,
  DUMMY_MARKET_TRADE_STATE,
  DUMMY_SELLER_TRADE_STATE,
} from "../constants";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

import {
  BundlrError,
  Metaplex,
  bundlrStorage,
  nftModule,
} from "@metaplex-foundation/js";
import { toast } from "react-toastify";

const metaplex = Metaplex.make(connection);

const end_day_timestamp = new Date();
end_day_timestamp.setHours(0, 0, 0, 0);

const endTime = end_day_timestamp.getTime() / 1000 + 86400;

export async function sendTransaction(
  connection: any,
  wallet: any,
  transaction: any
) {
  if (wallet.publicKey === null || wallet.signTransaction === undefined)
    return null;
  try {
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.feePayer = wallet.publicKey;
    const signedTransaction = await wallet.signTransaction(transaction);
    const rawTransaction = signedTransaction.serialize();

    const txid = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      preflightCommitment: "processed",
    });
    return txid;
  } catch (e) {
    return null;
  }
}

export const showToast = (txt : any, duration = 5000, ty = 0) => {
  let type = toast.TYPE.SUCCESS;
  if (ty === 1) type = toast.TYPE.ERROR;
  if (ty === 2) type = toast.TYPE.INFO;

  let autoClose = duration;
  if (duration < 0) {
      autoClose = 0;
  }
  return toast.error(txt, {
      position: "bottom-right",
      autoClose,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      type,
      theme: "colored",
  });
};

export const marketplaceSOLList = async (seller: any) => {
  console.log("instruction::list");

  const insList: TransactionInstruction[] = [];

  const [metadataPda] = getMetadataPda(NFT_MINT);
  // console.log("medata", metadataPda.toBase58());
  const [listingStatePda] = getListingStatePda(seller.publicKey, metadataPda);

  const getSellerATA = await connection.getTokenAccountsByOwner(
    seller.publicKey,
    { mint: NFT_MINT }
  );

  if (getSellerATA.value.length === 0) {
    throw Error("Invalid mint address");
  }

  let [programATAOwner] = getProgramNFTOwnerPda(metadataPda);
  let programAta: PublicKey = await getAssociatedTokenAddress(
    NFT_MINT,
    programATAOwner,
    true
  );

  const ataAccountInfo = await connection.getAccountInfo(programAta);

  if (!ataAccountInfo) {
    const preins = createAssociatedTokenAccountInstruction(
      seller.publicKey,
      programAta,
      programATAOwner,
      NFT_MINT
    );
    insList.push(preins);
  }

  const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
    units: 1000000,
  });

  const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 1,
  });

  insList.push(modifyComputeUnits);
  insList.push(addPriorityFee);
  const marketplaceSOLProgram = getProgram(seller);
  const ins = await marketplaceSOLProgram.methods
    .list(new BN(LAMPORTS_PER_SOL * 0.5), 0)
    .accounts({
      listingState: listingStatePda,
      seller: seller.publicKey,
      nftMint: NFT_MINT,
      nftMetadata: metadataPda,
      sellerNftAta: getSellerATA.value[0].pubkey,
      prgramNftAta: programAta,
      systemProgram: SystemProgram.programId,
      tokenProgramId: TOKEN_PROGRAM_ID,
    })
    .instruction();

  insList.push(ins);

  const rb = await connection.getLatestBlockhash();

  const msg = new TransactionMessage({
    payerKey: seller.publicKey,
    recentBlockhash: rb.blockhash,
    instructions: insList,
  }).compileToV0Message();

  console.log("listing_state", listingStatePda.toBase58());
  console.log("seller.publicKey", seller.publicKey.toBase58());
  console.log("metadataPda", metadataPda.toBase58());
  console.log("programAta", programAta.toBase58());

  const transaction = new VersionedTransaction(msg);
  const txHash = await sendTransaction(connection, seller, transaction);
  console.log("TX : ", txHash);
  if (txHash != null) {
    let confirming_id = showToast("Confirming Transaction ...", 4000, 2);
    let res = await connection.confirmTransaction(txHash);
    toast.dismiss(confirming_id);
    if (res.value.err) {
      showToast("Transaction Failed", 2000, 1);
    } else {
      showToast("Transaction Confirmed", 2000);
    }
  } else {
    showToast("Transaction Failed", 2000, 1);
  }
  return txHash;
  // transaction.sign([seller]);

  // const simulated = await connection.simulateTransaction(transaction);
  // console.log("simulated", simulated);

  // const tx = await connection.sendTransaction(transaction);

  // console.log("transaciton broadcasted", tx);

  // await connection.confirmTransaction({
  //   signature: tx,
  //   blockhash: rb.blockhash,
  //   lastValidBlockHeight: rb.lastValidBlockHeight,
  // });

  // console.log("confirmed transaction", tx);

  // alert(`TX : ${tx}\n
  //   Marketplace Wallet : ${programAta.toBase58()}`);
};

export const decodeListingState = async (seller: any) => {
  const [metadataPda] = getMetadataPda(NFT_MINT);
  console.log("decodeListingState: ", seller.publicKey, metadataPda);
  const [listingStatePda] = getListingStatePda(seller.publicKey, metadataPda);
  const marketplaceSOLProgram = getProgram(seller);
  const reponse = await marketplaceSOLProgram.account.listingState.fetch(
    listingStatePda
  );

  console.log("allowedRoyalty ", reponse.allowedRoyalty / 100, "%");
  console.log("amount", reponse.amount.toNumber() / 10 ** 9);
  console.log("isSold", reponse.isSold);
  console.log("nftMetadata", reponse.nftMetadata.toBase58());
  console.log("seller", reponse.seller.toBase58());

  alert(`allowedRoyalty : ${reponse.allowedRoyalty / 100}%\n
  Amount : ${reponse.amount.toNumber() / 10 ** 9}\n
  NFTMetadata : ${reponse.nftMetadata.toBase58()}\n
  Seller : ${reponse.seller.toBase58()}`);
  return reponse;
};

export const marketplaceSOLUpdateListing = async (seller: any) => {
  console.log("instruction::update_listing");

  const insList: TransactionInstruction[] = [];

  const [metadataPda] = getMetadataPda(NFT_MINT);
  const [listingStatePda] = getListingStatePda(seller.publicKey, metadataPda);
  const marketplaceSOLProgram = getProgram(seller);

  const ins = await marketplaceSOLProgram.methods
    .updateListing(new BN(`${LAMPORTS_PER_SOL / 2}`), 500)
    .accounts({
      listingState: listingStatePda,
      seller: seller.publicKey,
      nftMint: NFT_MINT,
      nftMetadata: metadataPda,
    })
    .instruction();

  insList.push(ins);

  const rb = await connection.getLatestBlockhash();

  const msg = new TransactionMessage({
    payerKey: seller.publicKey,
    recentBlockhash: rb.blockhash,
    instructions: insList,
  }).compileToV0Message();

  const transaction = new VersionedTransaction(msg);
  const txHash = await sendTransaction(connection, seller, transaction);
  if (txHash != null) {
    let confirming_id = showToast("Confirming Transaction ...", 4000, 2);
    let res = await connection.confirmTransaction(txHash);
    toast.dismiss(confirming_id);
    if (res.value.err) {
      showToast("Transaction Failed", 2000, 1);
    } else {
      showToast("Transaction Confirmed", 2000);
    }
  } else {
    showToast("Transaction Failed", 2000, 1);
  }
  return txHash;
  // transaction.sign([seller]);

  // // const simulated = await connection.simulateTransaction(transaction);
  // // console.log("simulated", simulated);

  // const tx = await connection.sendTransaction(transaction);

  // console.log("transaciton broadcasted", tx);

  // await connection.confirmTransaction({
  //   signature: tx,
  //   blockhash: rb.blockhash,
  //   lastValidBlockHeight: rb.lastValidBlockHeight,
  // });

  // console.log("confirmed transaction", tx);
};

export const marketplaceSOLCancelListing = async (seller: any) => {
  console.log("instruction::cancel_listing");

  const insList: TransactionInstruction[] = [];

  const [metadataPda] = getMetadataPda(NFT_MINT);
  const [listingStatePda] = getListingStatePda(seller.publicKey, metadataPda);

  const getSellerATA = await connection.getTokenAccountsByOwner(
    seller.publicKey,
    { mint: NFT_MINT }
  );

  if (getSellerATA.value.length === 0) {
    throw Error("Invalid mint address");
  }

  let [programATAOwner] = getProgramNFTOwnerPda(metadataPda);
  let programAta: PublicKey = await getAssociatedTokenAddress(
    NFT_MINT,
    programATAOwner,
    true
  );

  const ataAccountInfo = await connection.getAccountInfo(programAta);

  if (!ataAccountInfo) {
    const preins = createAssociatedTokenAccountInstruction(
      seller.publicKey,
      programAta,
      programATAOwner,
      NFT_MINT
    );
    insList.push(preins);
  }
  const marketplaceSOLProgram = getProgram(seller);

  const ins = await marketplaceSOLProgram.methods
    .cancelListing()
    .accounts({
      listingState: listingStatePda,
      seller: seller.publicKey,
      nftMint: NFT_MINT,
      nftMetadata: metadataPda,
      sellerNftAta: getSellerATA.value[0].pubkey,
      prgramNftAta: programAta,
      programNftPdaOwner: programATAOwner,
      tokenProgramId: TOKEN_PROGRAM_ID,
    })
    .instruction();

  insList.push(ins);

  const rb = await connection.getLatestBlockhash();

  const msg = new TransactionMessage({
    payerKey: seller.publicKey,
    recentBlockhash: rb.blockhash,
    instructions: insList,
  }).compileToV0Message();

  const transaction = new VersionedTransaction(msg);
  const txHash = await sendTransaction(connection, seller, transaction);
  if (txHash != null) {
    let confirming_id = showToast("Confirming Transaction ...", 4000, 2);
    let res = await connection.confirmTransaction(txHash);
    toast.dismiss(confirming_id);
    if (res.value.err) {
      showToast("Transaction Failed", 2000, 1);
    } else {
      showToast("Transaction Confirmed", 2000);
    }
  } else {
    showToast("Transaction Failed", 2000, 1);
  }
  return txHash;
  // transaction.sign([seller]);

  // // const simulated = await connection.simulateTransaction(transaction);
  // // console.log("simulated", simulated);

  // const tx = await connection.sendTransaction(transaction);

  // console.log("transaciton broadcasted", tx);

  // await connection.confirmTransaction({
  //   signature: tx,
  //   blockhash: rb.blockhash,
  //   lastValidBlockHeight: rb.lastValidBlockHeight,
  // });

  // console.log("confirmed transaction", tx);
  // alert("List Canceled");
};

export const marketplaceSOLBuyNow = async (buyer: any, seller: PublicKey) => {
  console.log("instruction::buy_now");
  const marketplaceSOLProgram = getProgram(buyer);
  const insList: TransactionInstruction[] = [];

  const [metadataPda] = getMetadataPda(NFT_MINT);
  const [listingStatePda] = getListingStatePda(seller, metadataPda);

  let [programATAOwner] = getProgramNFTOwnerPda(metadataPda);
  let programAta: PublicKey = await getAssociatedTokenAddress(
    NFT_MINT,
    programATAOwner,
    true
  );

  let buyerATA: PublicKey = await getAssociatedTokenAddress(
    NFT_MINT,
    buyer.publicKey
  );

  const ataAccountInfo = await connection.getAccountInfo(buyerATA);

  if (!ataAccountInfo) {
    const preins = createAssociatedTokenAccountInstruction(
      buyer.publicKey,
      buyerATA,
      buyer.publicKey,
      NFT_MINT
    );
    insList.push(preins);
  }

  const creatorInfo = await getNFTCreatorAccounts();

  const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
    units: 1000000,
  });

  const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 1,
  });

  insList.push(modifyComputeUnits);
  insList.push(addPriorityFee);
  const ins = await marketplaceSOLProgram.methods
    .buyNow(new BN(`${endTime}`))
    .accounts({
      listingState: listingStatePda,
      seller: seller,
      nftMetadata: metadataPda,
      buyer: buyer.publicKey,
      prgramNftAta: programAta,
      buyerNftAta: buyerATA,
      programNftPdaOwner: programATAOwner,
      tokenProgramId: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .remainingAccounts(creatorInfo)
    .instruction();

  insList.push(ins);

  const rb = await connection.getLatestBlockhash();

  const msg = new TransactionMessage({
    payerKey: buyer.publicKey,
    recentBlockhash: rb.blockhash,
    instructions: insList,
  }).compileToV0Message();

  const transaction = new VersionedTransaction(msg);
  const txHash = await sendTransaction(connection, buyer, transaction);
  if (txHash != null) {
    let confirming_id = showToast("Confirming Transaction ...", 4000, 2);
    let res = await connection.confirmTransaction(txHash);
    toast.dismiss(confirming_id);
    if (res.value.err) {
      showToast("Transaction Failed", 2000, 1);
    } else {
      showToast("Transaction Confirmed", 2000);
    }
  } else {
    showToast("Transaction Failed", 2000, 1);
  }
  return txHash;
  // transaction.sign([buyer]);

  // // const simulated = await connection.simulateTransaction(transaction);
  // // console.log("simulated", simulated);

  // const tx = await connection.sendTransaction(transaction);

  // console.log("transaciton broadcasted", tx);

  // await connection.confirmTransaction({
  //   signature: tx,
  //   blockhash: rb.blockhash,
  //   lastValidBlockHeight: rb.lastValidBlockHeight,
  // });

  // console.log("confirmed transaction", tx);
};

export const getNFTCreatorAccounts = async () => {
  let creatorsInfo = [];

  const mint = await metaplex.nfts().findByMint({
    mintAddress: NFT_MINT,
  });

  for (let creator of mint.creators) {
    creatorsInfo.push({
      pubkey: creator.address,
      isSigner: false,
      isWritable: true,
    });
  }
  return creatorsInfo;
};

export const fundPdaWallet = async (buyer: any) => {
  console.log("instruction::fund_withdraw_pda");
  const marketplaceSOLProgram = getProgram(buyer);
  const insList: TransactionInstruction[] = [];
  const [usePdaWalletPda] = getUserPdaWallet(buyer.publicKey);
  console.log("usePdaWalletPda:", usePdaWalletPda.toString());

  const ins = await marketplaceSOLProgram.methods
    .fundWithdrawPdaWallet(1, new BN(`${LAMPORTS_PER_SOL}`)) // minimum LAMPORTS_PER_SOL * 0.001
    .accounts({
      userPdaWallet: usePdaWalletPda,
      user: buyer.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  insList.push(ins);

  const rb = await connection.getLatestBlockhash();

  const msg = new TransactionMessage({
    payerKey: buyer.publicKey,
    recentBlockhash: rb.blockhash,
    instructions: insList,
  }).compileToV0Message();

  const transaction = new VersionedTransaction(msg);
  const txHash = await sendTransaction(connection, buyer, transaction);
  if (txHash != null) {
    let confirming_id = showToast("Confirming Transaction ...", 4000, 2);
    let res = await connection.confirmTransaction(txHash);
    toast.dismiss(confirming_id);
    if (res.value.err) {
      showToast("Transaction Failed", 2000, 1);
    } else {
      showToast("Transaction Confirmed", 2000);
    }
  } else {
    showToast("Transaction Failed", 2000, 1);
  }
  return txHash;
  // transaction.sign([buyer]);

  // console.log("user pda wallet ", usePdaWalletPda.toBase58());

  // const simulated = await connection.simulateTransaction(transaction);
  // console.log("simulated", simulated);

  // const tx = await connection.sendTransaction(transaction);

  // console.log("transaciton broadcasted", tx);

  // await connection.confirmTransaction({
  //   signature: tx,
  //   blockhash: rb.blockhash,
  //   lastValidBlockHeight: rb.lastValidBlockHeight,
  // });

  // console.log("confirmed transaction", tx);
};

export const withdrawPdaWallet = async (buyer: any) => {
  console.log("instruction::fund_withdraw_pda");
  const marketplaceSOLProgram = getProgram(buyer);
  const insList: TransactionInstruction[] = [];
  const [usePdaWalletPda] = getUserPdaWallet(buyer.publicKey);
  console.log("usePdaWalletPda:", usePdaWalletPda.toString());

  const ins = await marketplaceSOLProgram.methods
    .fundWithdrawPdaWallet(0, new BN(`${0.9 * LAMPORTS_PER_SOL}`)) // minimum LAMPORTS_PER_SOL * 0.001
    .accounts({
      userPdaWallet: usePdaWalletPda,
      user: buyer.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  insList.push(ins);

  const rb = await connection.getLatestBlockhash();

  const msg = new TransactionMessage({
    payerKey: buyer.publicKey,
    recentBlockhash: rb.blockhash,
    instructions: insList,
  }).compileToV0Message();

  const transaction = new VersionedTransaction(msg);
  const txHash = await sendTransaction(connection, buyer, transaction);
  if (txHash != null) {
    let confirming_id = showToast("Confirming Transaction ...", 4000, 2);
    let res = await connection.confirmTransaction(txHash);
    toast.dismiss(confirming_id);
    if (res.value.err) {
      showToast("Transaction Failed", 2000, 1);
    } else {
      showToast("Transaction Confirmed", 2000);
    }
  } else {
    showToast("Transaction Failed", 2000, 1);
  }
  return txHash;
  // transaction.sign([buyer]);

  // console.log("user pda wallet ", usePdaWalletPda.toBase58());

  // const simulated = await connection.simulateTransaction(transaction);
  // console.log("simulated", simulated);

  // const tx = await connection.sendTransaction(transaction);

  // console.log("transaciton broadcasted", tx);

  // await connection.confirmTransaction({
  //   signature: tx,
  //   blockhash: rb.blockhash,
  //   lastValidBlockHeight: rb.lastValidBlockHeight,
  // });

  // console.log("confirmed transaction", tx);
};
