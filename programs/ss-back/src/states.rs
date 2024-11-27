use anchor_lang::prelude::*;

pub const PARTIES_SEED: &str = "parties";
pub const PARTY_SEED: &str = "party";
pub const PARTICIPANT_SEED: &str = "participant";

#[account]
#[derive(InitSpace)]
pub struct Parties {
    pub count: u32,
    #[max_len(32 * 10)]
    pub parties_list: Vec<u32>,
}

#[account]
#[derive(InitSpace)]
pub struct Party {
    pub party_id: u32,
    pub organizer: Pubkey,
    #[max_len(100)]
    pub location: String,
    pub date: i64,
    #[max_len(20)]
    pub budget: String,
    #[max_len(24 * 50)]
    pub participants: Vec<String>,
}

#[account]
#[derive(InitSpace)]
pub struct Participant {
    #[max_len(24)]
    pub participant_id: String,
    #[max_len(24)]
    pub buddy_id: String,
    pub party_id: u32,
    #[max_len(50)]
    pub name: String,
    #[max_len(50)]
    pub email: String,
}
