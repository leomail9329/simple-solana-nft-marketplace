use crate::constants::MINIMUM_LISTING_AMOUNT;
use crate::error;
use crate::state::ListingState;
use anchor_lang::prelude::*;
use mpl_token_metadata;
use mpl_token_metadata::state::{Metadata, TokenMetadataAccount};

#[derive(Accounts)]
pub struct UpdateListingAccounts<'info> {
    #[account(
        mut,
        seeds=["List".as_bytes(),seller.key().as_ref(),nft_metadata.key().as_ref()],
        bump
    )]
    listing_state: Account<'info, ListingState>,
    #[account(mut)]
    seller: Signer<'info>,
    /// CHECK: checked in the contraint
    nft_mint: AccountInfo<'info>,
    #[account(
        seeds=["metadata".as_bytes(),mpl_token_metadata::id().key().as_ref(),nft_mint.key().as_ref()],
        bump,seeds::program=mpl_token_metadata::id()
    )]
    /// CHECK: checked in the contraint
    nft_metadata: AccountInfo<'info>,
}

pub fn process_update_listing(
    ctx: Context<UpdateListingAccounts>,
    amount: u64,
    allowed_royalty: u16,
) -> Result<()> {
    let listing_state = &mut ctx.accounts.listing_state;
    let nft_metadata = &mut ctx.accounts.nft_metadata;

    let data = Metadata::from_account_info(&nft_metadata)?;

    if allowed_royalty > data.data.seller_fee_basis_points {
        return Err(error::ProgramError::InvalidOptionRoyaltyValue.into());
    }

    if amount < MINIMUM_LISTING_AMOUNT as u64 {
        return Err(error::ProgramError::MinimumListingConstaint.into());
    }

    if listing_state.is_sold == true {
        return Err(error::ProgramError::InvalidListing.into());
    }

    listing_state.allowed_royalty = allowed_royalty;
    listing_state.amount = amount;

    Ok(())
}
