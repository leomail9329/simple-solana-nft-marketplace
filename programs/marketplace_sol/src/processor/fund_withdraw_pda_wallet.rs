use crate::pda;
use crate::utils;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct FundWithdrawPdaWalletAccounts<'info> {
    /// CHECK:checked in the implementation
    #[account(mut)]
    user_pda_wallet: AccountInfo<'info>,
    user: Signer<'info>,
    system_program: Program<'info, System>,
}

pub fn process_fund_withdraw_pda_wallet(
    ctx: Context<FundWithdrawPdaWalletAccounts>,
    mode: u8,
    amount: u64,
) -> Result<()> {
    let user_pda_wallet = &mut ctx.accounts.user_pda_wallet;
    let user = &mut ctx.accounts.user;

    let (user_pda_wallet_pubkey, bump) = pda::get_user_pda_wallet(user.key());

    utils::assert_eq_pubkeys(user_pda_wallet_pubkey.key(), user_pda_wallet.key())?;

    if amount < 1000000 {
        panic!("minimum fund amount is 0.001");
    }

    if mode == 0 {
        // withdraw
        utils::transfer_sol(
            &user_pda_wallet.clone(),
            &user.to_account_info(),
            amount,
            &["UserPdaWallet".as_bytes(), user.key().as_ref(), &[bump]],
        )?;
    } else {
        // funds
        utils::transfer_sol(
            &user.to_account_info(),
            &user_pda_wallet.clone(),
            amount,
            &[],
        )?;
    }

    Ok(())
}
