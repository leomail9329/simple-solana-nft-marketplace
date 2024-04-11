import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { HistoryManager } from "../target/types/history_manager";

describe("history manager contract", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HistoryManager as Program<HistoryManager>;
  const provider = anchor.AnchorProvider.env();

  it("deploy contract", async () => {
    const [historyBookStatePda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("")],
      new anchor.web3.PublicKey("2zMbLtZgmibQQoa9G2poduDX6rsrsca6qViUu1pEKjop")
    );

    const tradeState = anchor.web3.Keypair.generate();

    const tx = await program.methods
      .createHistoryBook(true, 0)
      .accounts({
        historyBookOwner: provider.publicKey,
        historyBookState: historyBookStatePda,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        tradeState: tradeState.publicKey,
      })
      .rpc();

    console.log("tx", tx);
  });
});
