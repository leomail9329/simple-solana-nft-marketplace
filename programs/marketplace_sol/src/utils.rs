use crate::constants::{
    BUYER_POINT_SHARE, BUYER_TEAM_MULTISIG_SHARE, SELLER_POINT_SHARE, SELLER_TEAM_MULTISIG_SHARE,
    STAKING_SHARE, TRADING_REWARD_SHARE,
};
use crate::error;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;
use anchor_lang::solana_program::program::{invoke, invoke_signed};
use anchor_lang::solana_program::system_instruction::transfer;
use anchor_spl::token::TokenAccount;
// use history_manager::cpi::{
//     accounts::{CreateMarketTradeStateAccounts, CreateUserTradeStateAccounts},
//     create_market_trade_state, create_user_trade_state,
// };
use mpl_token_metadata::state::{Metadata, TokenMetadataAccount};

pub fn assert_eq_pubkeys(pubkey_one: Pubkey, pubkey_two: Pubkey) -> Result<()> {
    if pubkey_one.key() != pubkey_two.key() {
        msg!("Pubkey {} is not same as {}", pubkey_one, pubkey_two);
        return Err(error::ProgramError::PubKeyMismatched.into());
    }
    Ok(())
}

pub fn transfer_sol<'a>(
    from: &AccountInfo<'a>,
    to: &AccountInfo<'a>,
    lamports: u64,
    seeds: &[&[u8]],
) -> Result<()> {
    if seeds.len() == 0 {
        let transfer_ins = transfer(from.key, to.key, lamports);
        invoke(&transfer_ins, &[from.clone(), to.clone()])?;
    } else {
        let transfer_ins = transfer(from.key, to.key, lamports);
        invoke_signed(&transfer_ins, &[from.clone(), to.clone()], &[seeds])?;
    }
    Ok(())
}

pub fn transfer_tokens<'a>(
    destination: &AccountInfo<'a>,
    token_program_id: &AccountInfo<'a>,
    source: &AccountInfo<'a>,
    amount: u64,
    authority: &AccountInfo<'a>,
    seeds: &[&[u8]],
) -> Result<()> {
    let lvlins = spl_token::instruction::transfer(
        &token_program_id.key(),
        &source.key(),
        &destination.key(),
        &authority.key(),
        &[],
        amount,
    )?;

    if seeds.len() == 0 {
        invoke(
            &lvlins,
            &[
                token_program_id.to_account_info(),
                source.to_account_info(),
                destination.to_account_info(),
                authority.to_account_info(),
            ],
        )?;
    } else {
        invoke_signed(
            &lvlins,
            &[
                token_program_id.to_account_info(),
                source.to_account_info(),
                destination.to_account_info(),
                authority.to_account_info(),
            ],
            &[seeds],
        )?;
    }

    Ok(())
}

pub struct AssertPubkey {
    pub pubkey_one: Pubkey,
    pub pubkey_two: Pubkey,
}

pub fn assert_pubkey_equal_from_array(pubkey_list: Vec<AssertPubkey>) -> Result<()> {
    for x in 0..pubkey_list.len() {
        if pubkey_list[x].pubkey_one.key() != pubkey_list[x].pubkey_two.key() {
            msg!(
                "Pubkey {} is not same as {} at index {}",
                pubkey_list[x].pubkey_one.key(),
                pubkey_list[x].pubkey_two.key(),
                x
            );
            return Err(error::ProgramError::PubKeyMismatched.into());
        }
    }
    Ok(())
}

pub fn distribute_amount<'a>(
    listing_amount: u64,
    allowed_royalty: u16,
    receiver: &AccountInfo<'a>,
    from: &AccountInfo<'a>,
    nft_metadata: &AccountInfo<'a>,
    remaining_accounts: &[AccountInfo<'a>],
    seeds: &[&[u8]],
) -> Result<()> {
    let decoded_metadata = Metadata::from_account_info(nft_metadata)?;
    let listing_amount = listing_amount as f64 / LAMPORTS_PER_SOL as f64;

    let mut allowed_royalty_share: f64 = allowed_royalty as f64 / 10000 as f64;

    if decoded_metadata.data.creators == None {
        allowed_royalty_share = 0.0;
        msg!("no_creators_found::defaulting_royalty_to_0");
    }

    let creators_share = listing_amount * allowed_royalty_share;

    // msg!(
    //     "original amount {}",
    //     listing_amount * LAMPORTS_PER_SOL as f64
    // );

    // msg!(
    //     "amount to creator {}",
    //     creators_share * LAMPORTS_PER_SOL as f64
    // );

    if allowed_royalty_share != 0.0 {
        match decoded_metadata.data.creators {
            Some(creator) => {
                for x in 0..creator.len() {
                    let percent_share = creator[x].share;
                    let amount_to_send = creators_share * (percent_share as f64 / 100 as f64);
                    let current_info = &remaining_accounts[x];
                    assert_eq_pubkeys(creator[x].address, current_info.key())?;

                    let corrected_amount_to_send = amount_to_send * LAMPORTS_PER_SOL as f64;

                    // msg!(
                    //     "corrected_amount_to_send: {} at index: {}",
                    //     corrected_amount_to_send,
                    //     x
                    // );

                    if seeds.len() == 0 {
                        let transferins =
                            transfer(from.key, current_info.key, corrected_amount_to_send as u64);

                        invoke(&transferins, &[from.clone(), current_info.clone()])?;
                    } else {
                        let transferins =
                            transfer(from.key, current_info.key, corrected_amount_to_send as u64);

                        invoke_signed(
                            &transferins,
                            &[from.clone(), current_info.clone()],
                            &[seeds],
                        )?;
                    }
                }
            }
            _ => {}
        }
    } else {
        msg!("royalty share 0")
    }

    let buyer_team_multisig_fee = listing_amount * (BUYER_TEAM_MULTISIG_SHARE / 100 as f64);
    let buyer_amount_to_team = buyer_team_multisig_fee * LAMPORTS_PER_SOL as f64;

    let seller_team_multisig_fee = listing_amount * (SELLER_TEAM_MULTISIG_SHARE / 100 as f64);
    let seller_amount_to_team = seller_team_multisig_fee * LAMPORTS_PER_SOL as f64;

    // msg!("amount to team {}", amount_to_team);

    if seeds.len() == 0 {

        let seller_amount = listing_amount - creators_share - seller_team_multisig_fee;

        let amount_to_seller = seller_amount * LAMPORTS_PER_SOL as f64;
        // msg!("amount to seller {}", amount_to_seller);
        transfer_sol(
            &from.to_account_info(),
            &receiver.to_account_info(),
            amount_to_seller as u64,
            &[],
        )?;
    } else {

        let seller_amount = listing_amount - creators_share - seller_team_multisig_fee;
        let amount_to_seller = seller_amount * LAMPORTS_PER_SOL as f64;
        // msg!("amount to seller {}", amount_to_seller);
        transfer_sol(
            &from.to_account_info(),
            &receiver.to_account_info(),
            amount_to_seller as u64,
            seeds,
        )?;
    }

    Ok(())
}

pub fn check_ata_owner<'a>(ata: &AccountInfo<'a>, owner: Pubkey) -> Result<()> {
    if ata.data_is_empty() == true {
        return Err(error::ProgramError::TokenAccountNotInit.into());
    }
    let data = ata.try_borrow_data()?;
    let decoded = TokenAccount::try_deserialize(&mut data.as_ref())?;

    assert_eq_pubkeys(decoded.owner, owner.key())?;
    Ok(())
}

