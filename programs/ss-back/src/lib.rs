use crate::instructions::*;
use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod states;

declare_id!("2tMDoY5s3xnvZ8ma4HvvzhPqwK9fZCT2EJD6VT2RX5t5");

#[program]
pub mod ss_back {
    use super::*;

    pub fn initialize_parties(ctx: Context<Initialize>) -> Result<()> {
        instr_initialize_parties(ctx)
    }

    pub fn create_party(
        ctx: Context<CreateParty>,
        party_id: u32,
        location: String,
        date: i64,
        budget: String,
    ) -> Result<()> {
        instr_create_party(ctx, party_id, location, date, budget)
    }

    pub fn update_party(
        ctx: Context<UpdateParty>,
        party_id: u32,
        location: String,
        date: i64,
        budget: String,
    ) -> Result<()> {
        instr_update_party(ctx, party_id, location, date, budget)
    }

    pub fn add_participant(
        ctx: Context<AddParticipant>,
        party_id: u32,
        participant_id: String,
        name: String,
        email: String,
    ) -> Result<()> {
        instr_add_participant(ctx, party_id, participant_id, name, email)
    }

    pub fn update_participant(
        ctx: Context<UpdateParticipant>,
        party_id: u32,
        participant_id: String,
        buddy_id: String,
        name: String,
        email: String,
    ) -> Result<()> {
        instr_update_participant(ctx, party_id, participant_id, buddy_id, name, email)
    }

    pub fn assign_buddy(
        ctx: Context<AssignBuddy>,
        party_id: u32,
        participant_id: String,
        buddy_id: String,
    ) -> Result<()> {
        instr_assign_buddy(ctx, party_id, participant_id, buddy_id)
    }
}
