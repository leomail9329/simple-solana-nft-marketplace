use crate::constants::MINIMUM_LISTING_AMOUNT;
use crate::error::ProgramError;
use crate::state::{ListingState, OfferState, OFFER_STATE_SIZE};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct MakeOfferAccounts<'info> {
    #[account(
        seeds=["List".as_bytes(),seller.key().as_ref(),nft_metadata.key().as_ref()],
        bump
    )]
    listing_state: Box<Account<'info, ListingState>>,
    #[account(
        init_if_needed,
        payer=buyer,
        seeds=["OfferState".as_bytes(),buyer.key().as_ref(),nft_metadata.key().as_ref(),listing_state.key().as_ref()],
        bump,
        space= OFFER_STATE_SIZE
    )]
    offer_state: Box<Account<'info, OfferState>>,
    /// CHECK: checked in the constraint
    #[account(
        seeds=["UserPdaWallet".as_bytes(),buyer.key().as_ref()],
        bump
    )]
    buyer_pda_wallet: AccountInfo<'info>,
    #[account(mut)]
    buyer: Signer<'info>,
    /// CHECK: checked in the implementation
    nft_mint: AccountInfo<'info>,
    /// CHECK: checked in the constraint
    seller: AccountInfo<'info>,
    /// CHECK: checked in the constraint
    #[account(
        seeds=["metadata".as_bytes(),mpl_token_metadata::id().key().as_ref(),nft_mint.key().as_ref()],
        bump,
        seeds::program=mpl_token_metadata::id()
    )]
    nft_metadata: AccountInfo<'info>,
    system_program: Program<'info, System>,
}

pub fn process_make_offer(
    ctx: Context<MakeOfferAccounts>,
    offer_amount: u64,
    endtime: u64,
) -> Result<()> {
    let offer_state = &mut ctx.accounts.offer_state;
    let listing_state = &mut ctx.accounts.listing_state;
    let buyer_pda_wallet = &mut ctx.accounts.buyer_pda_wallet;
    let buyer = &mut ctx.accounts.buyer;
    let seller = &mut ctx.accounts.seller;

    let clock = Clock::get()?;

    if endtime < clock.unix_timestamp as u64 {
        return Err(ProgramError::InvalidTimestamp.into());
    }

    if offer_amount < MINIMUM_LISTING_AMOUNT as u64 {
        return Err(ProgramError::InvalidOfferAmount.into());
    }
    if listing_state.is_sold == true {
        return Err(ProgramError::InvalidListing.into());
    }

    if offer_state.is_expired == true {
        return Err(ProgramError::OfferExpired.into());
    }

    if buyer_pda_wallet.lamports() <= offer_amount {
        return Err(ProgramError::InsufficientFunds.into());
    }
    offer_state.is_expired = false;
    offer_state.endtime = endtime;
    offer_state.offered_amount = offer_amount;
    offer_state.listing_state = listing_state.key();
    offer_state.buyer = buyer.key();
    offer_state.seller = seller.key();
    Ok(())
}
