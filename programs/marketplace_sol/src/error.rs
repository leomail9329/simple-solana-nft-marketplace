use anchor_lang::prelude::*;

#[error_code]
pub enum ProgramError {
    #[msg("Invalid Option Royalty Value")]
    InvalidOptionRoyaltyValue,
    #[msg("Minimum Listing Constaint")]
    MinimumListingConstaint,
    #[msg("PubKey Mismatched")]
    PubKeyMismatched,
    #[msg("Invalid ATA")]
    InvalidATA,
    #[msg("Invalid Offer Amount")]
    InvalidOfferAmount,
    #[msg("Invalid Listing")]
    InvalidListing,
    #[msg("Invalid Offer")]
    InvalidOffer,
    #[msg("Insufficient Funds")]
    InsufficientFunds,
    #[msg("Invalid Timestamp")]
    InvalidTimestamp,
    #[msg("Offer Expired")]
    OfferExpired,
    #[msg("TokenAccount Not Init")]
    TokenAccountNotInit,
    #[msg("Invalid Reward Claim Account")]
    InvalidRewardClaimAccount,
    #[msg("Invalid Claim Timestamp")]
    InvalidClaimTimestamp,
    #[msg("Invalid Claim Account")]
    InvalidClaimAccount,
}
