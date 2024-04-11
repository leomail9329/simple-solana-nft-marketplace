use crate::pda::get_program_nft_storage_owner_pda;
use crate::state::ListingState;
use crate::utils;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::{prelude::*, AccountsClose};
use anchor_spl::token::{Token, TokenAccount};
use spl_token::instruction::close_account;

#[derive(Accounts)]
pub struct CancelListingAccounts<'info> {
    #[account(
        mut,
        seeds=["List".as_bytes(), seller.key().as_ref(), nft_metadata.key().as_ref()],
        bump
    )]
    listing_state: Box<Account<'info, ListingState>>,
    #[account(mut)]
    seller: Signer<'info>,
    /// CHECK: checked in the contraint
    nft_mint: AccountInfo<'info>,
    #[account(
        seeds=["metadata".as_bytes(), mpl_token_metadata::id().key().as_ref(), nft_mint.key().as_ref()],
        bump,
        seeds::program=mpl_token_metadata::id()
    )]
    /// CHECK: checked in the contraint
    nft_metadata: AccountInfo<'info>,
    #[account(
        mut,
        token::mint = nft_mint
    )]
    seller_nft_ata: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        token::mint = nft_mint
    )]
    prgram_nft_ata: Box<Account<'info, TokenAccount>>,
    /// CHECK: checked in the implementation
    program_nft_pda_owner: AccountInfo<'info>,
    token_program_id: Program<'info, Token>,
}

pub fn process_cancel_listing(ctx: Context<CancelListingAccounts>) -> Result<()> {
    let listing_state = &mut ctx.accounts.listing_state;
    let seller_nft_ata = &mut ctx.accounts.seller_nft_ata;
    let token_program_id = &mut ctx.accounts.token_program_id;
    let seller = &mut ctx.accounts.seller;
    let prgram_nft_ata = &mut ctx.accounts.prgram_nft_ata;
    let nft_metadata = &mut ctx.accounts.nft_metadata;
    let program_nft_pda_owner = &mut ctx.accounts.program_nft_pda_owner;

    let (program_nft_ata_owner_pubkey, bump) =
        get_program_nft_storage_owner_pda(nft_metadata.key());

    utils::assert_pubkey_equal_from_array(Vec::from([
        utils::AssertPubkey {
            pubkey_one: prgram_nft_ata.owner.key(),
            pubkey_two: program_nft_ata_owner_pubkey.key(),
        },
        utils::AssertPubkey {
            pubkey_one: program_nft_pda_owner.key(),
            pubkey_two: program_nft_ata_owner_pubkey.key(),
        },
    ]))?;

    utils::transfer_tokens(
        &seller_nft_ata.to_account_info(),
        &token_program_id.to_account_info(),
        &prgram_nft_ata.to_account_info(),
        1,
        &program_nft_pda_owner.to_account_info(),
        &[b"ProgramStorage", nft_metadata.key().as_ref(), &[bump]],
    )?;

    let close_ins = close_account(
        &token_program_id.key(),
        &prgram_nft_ata.key(),
        &seller.key(),
        &program_nft_pda_owner.key(),
        &[&program_nft_pda_owner.key()],
    )?;

    invoke_signed(
        &close_ins,
        &[
            token_program_id.to_account_info(),
            prgram_nft_ata.to_account_info(),
            seller.to_account_info(),
            program_nft_pda_owner.to_account_info(),
        ],
        &[&[b"ProgramStorage", nft_metadata.key().as_ref(), &[bump]]],
    )?;

    listing_state.close(seller.to_account_info())?;

    Ok(())
}
