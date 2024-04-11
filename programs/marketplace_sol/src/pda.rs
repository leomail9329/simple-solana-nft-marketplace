use crate::id;

use anchor_lang::{prelude::Pubkey, Key};

pub fn get_program_nft_storage_owner_pda(nft_metadata: Pubkey) -> (Pubkey, u8) {
    return Pubkey::find_program_address(
        &["ProgramStorage".as_bytes(), nft_metadata.key().as_ref()],
        &id(),
    );
}

pub fn get_user_pda_wallet(user: Pubkey) -> (Pubkey, u8) {
    return Pubkey::find_program_address(&["UserPdaWallet".as_bytes(), user.key().as_ref()], &id());
}

pub fn get_trader_vault_pda() -> (Pubkey, u8) {
    return Pubkey::find_program_address(&["TradersVault".as_bytes()], &id());
}

pub fn get_user_trade_state_metadata_pda(user_trade_state: Pubkey) -> (Pubkey, u8) {
    return Pubkey::find_program_address(
        &[
            "UserTradeStateMetadata".as_bytes(),
            user_trade_state.key().as_ref(),
        ],
        &id(),
    );
}
