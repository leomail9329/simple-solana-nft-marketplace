pub mod constants;
pub mod error;
pub mod pda;
pub mod processor;
pub mod state;
pub mod utils;

use crate::processor::{
    buy::*, 
    close_listing::*,
    fund_withdraw_pda_wallet::*, 
    list::*,
    make_offer::*, 
    update_listing::*, 
};
use anchor_lang::prelude::*;

declare_id!("HYq63FpbeDKccTBcgeDDEUubVAQRXgrdQHUCtKbCcjyH");

#[program]
pub mod marketplace_sol {
    use super::*;

    pub fn list(ctx: Context<ListAccounts>, amount: u64, allowed_royalty: u16) -> Result<()> {
        return process_list(ctx, amount, allowed_royalty);
    }

    pub fn update_listing(
        ctx: Context<UpdateListingAccounts>,
        amount: u64,
        allowed_royalty: u16,
    ) -> Result<()> {
        return process_update_listing(ctx, amount, allowed_royalty);
    }

    pub fn cancel_listing(ctx: Context<CancelListingAccounts>) -> Result<()> {
        return process_cancel_listing(ctx);
    }

    pub fn buy_now<'info>(
        ctx: Context<'_, '_, '_, 'info, BuyNowAccounts<'info>>,
        end_day_timestamp: u64,
    ) -> Result<()> {
        return process_buy_now(ctx, end_day_timestamp);
    }

    pub fn fund_withdraw_pda_wallet(
        ctx: Context<FundWithdrawPdaWalletAccounts>,
        mode: u8,
        amount: u64,
    ) -> Result<()> {
        return process_fund_withdraw_pda_wallet(ctx, mode, amount);
    }
}
