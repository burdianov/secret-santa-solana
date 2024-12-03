use anchor_lang::prelude::*;

#[error_code]
pub enum SsError {
    #[msg("Cannot add participant, ID too long")]
    ParticipantIdTooLong,
}
