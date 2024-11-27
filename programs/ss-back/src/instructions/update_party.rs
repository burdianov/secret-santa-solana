use anchor_lang::prelude::*;

use crate::states::*;

pub fn instr_update_party(
    ctx: Context<UpdateParty>,
    _party_id: u32,
    location: String,
    date: i64,
    budget: String,
) -> Result<()> {
    if date < Clock::get()?.unix_timestamp {
        panic!("Invalid date");
    }

    let party = &mut ctx.accounts.party;
    party.location = location;
    party.date = date;
    party.budget = budget;
    Ok(())
}

#[derive(Accounts)]
#[instruction(party_id: u32)]
pub struct UpdateParty<'info> {
    #[account(
        mut,
        seeds = [
            PARTY_SEED.as_bytes(),
            organizer.key().as_ref(),
            party_id.to_le_bytes().as_ref(),
        ],
        bump,
    )]
    pub party: Account<'info, Party>,
    #[account(mut)]
    pub organizer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
