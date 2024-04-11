import { Btn } from "@/components/btn";
import { connection } from "@/logic/config";
import { flexbox, styled } from "@mui/system";
import {
  decodeListingState,
  fundPdaWallet,
  withdrawPdaWallet,
  marketplaceSOLBuyNow,
  marketplaceSOLCancelListing,
  marketplaceSOLList,
  marketplaceSOLUpdateListing,
} from "@/logic/marketplace sol/MarketplaceSOLFun";
import { marketplaceSOLProgramID } from "@/logic/marketplace sol/marketplaceSOLConfig";
import { Wallet } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { Wallets } from "../components/Wallet";
import {
  WalletMultiButton,
  WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import { NFT_SELLER } from "@/logic/marketplace sol/marketplaceSOLConstant";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const wallet = useWallet();

  useEffect(() => {
    connection.onLogs(marketplaceSOLProgramID, (a) => {
      console.log("event", a);
    });
  });

  const onList = () => {
    marketplaceSOLList(wallet);
  };

  const onListingState = () => {
    decodeListingState(wallet);
  };

  const onUpdateListing = () => {
    marketplaceSOLUpdateListing(wallet);
  };

  const onCancelListing = () => {
    marketplaceSOLCancelListing(wallet);
  };

  const onFundWallet = () => {
    fundPdaWallet(wallet);
  };

  const onWithdrawWallet = () => {
    withdrawPdaWallet(wallet);
  };

  const onBuy = () => {
    marketplaceSOLBuyNow(wallet, NFT_SELLER);
  };

  const WalletButton = styled("div")(() => ({
    display: 'flex',
    flexDirection: 'row-reverse'
  }))

  return (
    <div>
      <div>
        <WalletMultiButton/>
      </div>
      <div style={{ margin: "10px" }}>
        <h1>NFT Marketplace Test</h1>
        <br />
        <p>Seller Address: B45t7VFMD9tNbDG8Unzr9z6LbknjwNegD9qDtd7jiLVy </p>
        <p>NFT Address: DXS6kKhXnUbHr99mGdgyNj6pY7iVV1Aef5TDgNU1Yd1m</p>
        <br />
      </div>

      <div style={{ margin: "10px" }}>
        {/* <h1>Marketplace</h1> */}
        <br />
        <p>Seller</p>
        <Btn title={"List NFT"} func={onList} />
        <br />
        <Btn title={"Listing state"} func={onListingState} />
        <br />
        <Btn
          title={"Update listing"}
          func={onUpdateListing}
        />
        <br />
        <Btn title={"Cancel list"} func={onCancelListing} />
        <br />
        <br />
        <p>Buyer</p>
        <Btn title={"Fund to Marketplace"} func={onFundWallet} />
        <br />
        <Btn title={"Withdraw from Marketplace"} func={onWithdrawWallet} />
        <br />
        <Btn title={"Buy now"} func={onBuy} />
        <br />
        {/* <Btn
          title={"decode market trade state"}
          func={DecodeMarketTradeState}
        />
        <br /> */}
        {/* <Btn title={"claim D2D reward"} func={claimD2DReward} /> */}
        <br />
      </div>

      {/* <div style={{ margin: "10px" }}>
        <h1>NFT Staking contract</h1>
        <Btn title={"init staking manager"} func={initNFTStakingManager} />
        <br />
        <Btn
          title={"transfer ownership"}
          func={transferNftSTakingManagerOwnership}
        />
        <br />
        <Btn title={"init collection config"} func={initCollectionConfig} />
        <br />
        <Btn title={"decode collection config"} func={decodeCollectionConfig} />
        <br />
        <Btn
          title={"decode percentage tracker"}
          func={decodePercentageTracker}
        />
        <br />{" "}
        <Btn
          title={"decode staked nft tracker"}
          func={decodeStakedNFTTracker}
        />
        <br />
        <Btn title={"transfer from vault"} func={transferFromVault} />
        <br />
        <Btn title={"modify collection config"} func={modifyCollectionConfig} />
        <br />
        <Btn title={"stake NFT"} func={stakingNFT} />
        <br />
        <Btn title={"decode stake state"} func={decodeStakeState} />
        <br />
        <Btn title={"claim reward"} func={claimStakingReward} />
        <br />
        <Btn title={"unstake NFT"} func={unstakeNFT} />
        <br />
      </div> */}
    </div>
  );
}
