use crate::constants::*;
use crate::error;
use crate::pda::get_program_nft_storage_owner_pda;
use crate::state::{ListingState, LISTING_STATE_SIZE};
use crate::utils;
use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};
use mpl_token_metadata::state::Metadata;
use mpl_token_metadata::state::TokenMetadataAccount;

#[derive(Accounts)]
pub struct ListAccounts<'info> {
    #[account(
        init_if_needed,
        payer=seller,
        seeds=["List".as_bytes(),seller.key().as_ref(),nft_metadata.key().as_ref()],
        bump,
        space= LISTING_STATE_SIZE
    )]
    listing_state: Box<Account<'info, ListingState>>,
    #[account(mut)]
    seller: Signer<'info>,
    /// CHECK:checked in the constraint
    nft_mint: AccountInfo<'info>,
    #[account(
        seeds=["metadata".as_bytes(),mpl_token_metadata::id().key().as_ref(),nft_mint.key().as_ref()],
        bump,
        seeds::program=mpl_token_metadata::id()
    )]
    /// CHECK: checked in the contraint
    nft_metadata: AccountInfo<'info>,
    #[account(
        mut,
        associated_token::mint=nft_mint,
        associated_token::authority=seller
    )]
    seller_nft_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    prgram_nft_ata: Box<Account<'info, TokenAccount>>,
    system_program: Program<'info, System>,
    token_program_id: Program<'info, Token>,
}

pub fn process_list(ctx: Context<ListAccounts>, amount: u64, allowed_royalty: u16) -> Result<()> {
    let listing_state = &mut ctx.accounts.listing_state;
    let seller = &mut ctx.accounts.seller;
    let seller_nft_ata = &mut ctx.accounts.seller_nft_ata;
    let token_program_id = &mut ctx.accounts.token_program_id;
    let nft_metadata = &mut ctx.accounts.nft_metadata;
    let prgram_nft_ata = &mut ctx.accounts.prgram_nft_ata;

    let (program_nft_ata_owner_pubkey, _bump) =
        get_program_nft_storage_owner_pda(nft_metadata.key());

    utils::assert_pubkey_equal_from_array(Vec::from([utils::AssertPubkey {
        pubkey_one: prgram_nft_ata.owner.key(),
        pubkey_two: program_nft_ata_owner_pubkey.key(),
    }]))?;

    let data = Metadata::from_account_info(&nft_metadata)?;
    
    if seller_nft_ata.amount != 1 {
        return Err(error::ProgramError::InvalidATA.into());
    }

    if amount < MINIMUM_LISTING_AMOUNT as u64 {
        return Err(error::ProgramError::MinimumListingConstaint.into());
    }

    if allowed_royalty > data.data.seller_fee_basis_points {
        return Err(error::ProgramError::InvalidOptionRoyaltyValue.into());
    }

    utils::transfer_tokens(
        &prgram_nft_ata.to_account_info(),
        &token_program_id.to_account_info(),
        &seller_nft_ata.to_account_info(),
        1,
        &seller.to_account_info(),
        &[],
    )?;

    listing_state.amount = amount;
    listing_state.allowed_royalty = allowed_royalty;
    listing_state.is_sold = false;
    listing_state.seller = seller.key();
    listing_state.nft_metadata = nft_metadata.key();
    Ok(())
}

// need to add a check mark for the history books
