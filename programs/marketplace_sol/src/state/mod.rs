use anchor_lang::prelude::*;

pub const LISTING_STATE_SIZE: usize = 8 + 1 + 2 + 8 + 32 + 32;

#[account]
pub struct ListingState {
    pub is_sold: bool,
    pub allowed_royalty: u16, // divided by 100 i.e a user can specify royalty upto 2 decimal places
    pub amount: u64,
    pub seller: Pubkey,
    pub nft_metadata: Pubkey,
}

pub const OFFER_STATE_SIZE: usize = 8 + 1 + 8 + 8 + 32 + 32 + 32;
#[account]
pub struct OfferState {
    pub is_expired: bool,
    pub endtime: u64,
    pub offered_amount: u64,
    pub buyer: Pubkey,
    pub listing_state: Pubkey,
    pub seller: Pubkey,
}

pub const DIRECT_OFFER_STATE_SIZE: usize = 8 + 1 + 8 + 8 + 32 + 32 + 32;
#[account]
pub struct DirectOfferState {
    pub is_expired: bool,
    pub endtime: u64,
    pub offered_amount: u64,
    pub nft_metadata: Pubkey,
    pub buyer: Pubkey,
    pub seller: Pubkey,
}

pub const MARKETPLACE_STATE_SIZE: usize = 8 + 32 + 32 + 32 + 32 + 32 + 32 + 32;
#[account]
pub struct MarketplaceState {
    pub marketplace_owner: Pubkey,
    pub occs_manager: Pubkey,
    pub history_manager: Pubkey,
    pub team_multisig_vault: Pubkey,
    pub trader_vault: Pubkey,
    pub staking_vault: Pubkey,
    pub access_manager: Pubkey,
}

pub const USER_TRADE_STATE_METADATA_SIZE: usize = 8 + 1;

#[account]
pub struct UserTradeStateMetadata {
    pub is_claimed: bool,
}
