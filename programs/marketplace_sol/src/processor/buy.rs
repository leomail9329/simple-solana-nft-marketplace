use std::str::FromStr;

use crate::constants::{
    CREDIT_DENOMINATOR_FACTOR, OCCS_MANAGER, STAKING_VAULT, TEAM_MULTISIG_VAULT,
    TRADERS_VAULT,
};

use crate::error::ProgramError;
use crate::utils::{self};
use crate::{
    pda::get_program_nft_storage_owner_pda,
    state::{ListingState, UserTradeStateMetadata, USER_TRADE_STATE_METADATA_SIZE},
};
use anchor_lang::prelude::*;
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;
use anchor_spl::token::{Token, TokenAccount};
use mpl_token_metadata::state::{Metadata, TokenMetadataAccount};

#[derive(Accounts)]
pub struct BuyNowAccounts<'info> {
    #[account(
        mut,
        seeds=["List".as_bytes(),seller.key().as_ref(),nft_metadata.key().as_ref()],
        bump
    )]
    listing_state: Box<Account<'info, ListingState>>,
    /// CHECK: checked in the constraint
    #[account(mut)]
    seller: AccountInfo<'info>,
    /// CHECK: checked in the constraint
    nft_metadata: AccountInfo<'info>,
    #[account(mut)]
    buyer: Signer<'info>,
    #[account(mut)]
    prgram_nft_ata: Box<Account<'info, TokenAccount>>,
    /// CHECK:checked in the implementation
    #[account(mut)]
    buyer_nft_ata: Box<Account<'info, TokenAccount>>,

    /// CHECK:checked in the implementation
    program_nft_pda_owner: AccountInfo<'info>,

    token_program_id: Program<'info, Token>,
    system_program: Program<'info, System>,
}

pub fn process_buy_now<'info>(
    ctx: Context<'_, '_, '_, 'info, BuyNowAccounts<'info>>,
    end_day_timestamp: u64,
) -> Result<()> {
    let listing_state = &mut ctx.accounts.listing_state;
    let seller = &mut ctx.accounts.seller;
    let nft_metadata = &mut ctx.accounts.nft_metadata;
    let buyer = &mut ctx.accounts.buyer;
    let prgram_nft_ata = &mut ctx.accounts.prgram_nft_ata;
    let buyer_nft_ata = &mut ctx.accounts.buyer_nft_ata;
    let token_program_id = &mut ctx.accounts.token_program_id;
    let program_nft_pda_owner = &mut ctx.accounts.program_nft_pda_owner;
    let remaining_accounts = ctx.remaining_accounts;

    let system_program = &mut ctx.accounts.system_program;

    let (program_nft_ata_owner_pubkey, bump) =
        get_program_nft_storage_owner_pda(nft_metadata.key());

    let decode_nft_metadata = Metadata::from_account_info(&nft_metadata.to_account_info())?;

    utils::assert_pubkey_equal_from_array(vec![
        utils::AssertPubkey {
            pubkey_one: prgram_nft_ata.owner.key(),
            pubkey_two: program_nft_ata_owner_pubkey.key(),
        },
        utils::AssertPubkey {
            pubkey_one: program_nft_pda_owner.key(),
            pubkey_two: program_nft_ata_owner_pubkey.key(),
        },
        utils::AssertPubkey {
            pubkey_one: prgram_nft_ata.mint.key(),
            pubkey_two: decode_nft_metadata.mint.key(),
        },
        utils::AssertPubkey {
            pubkey_one: buyer_nft_ata.mint.key(),
            pubkey_two: decode_nft_metadata.mint.key(),
        },
    ])?;

    utils::transfer_tokens(
        &buyer_nft_ata.to_account_info(),
        &token_program_id.to_account_info(),
        &prgram_nft_ata.to_account_info(),
        1,
        &program_nft_pda_owner.to_account_info(),
        &[b"ProgramStorage", nft_metadata.key().as_ref(), &[bump]],
    )?;

    utils::distribute_amount(
        listing_state.amount,
        listing_state.allowed_royalty,
        &seller.clone(),
        &buyer.to_account_info(),
        &nft_metadata.clone(),
        &remaining_accounts.clone(),
        &[],
    )?;

    listing_state.is_sold = true;
    Ok(())
}
