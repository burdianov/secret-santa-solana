use anchor_lang::prelude::*;

use crate::states::*;

pub fn instr_create_party(
    ctx: Context<CreateParty>,
    party_id: u32,
    location: String,
    date: i64,
    budget: String,
) -> Result<()> {
    if date < Clock::get()?.unix_timestamp {
        panic!("Invalid date");
    }
    let party = &mut ctx.accounts.party;
    let parties = &mut ctx.accounts.parties;
    let count = parties.count;
    if count == 0 {
        parties.parties_list = Vec::new();
    }
    party.party_id = party_id;
    party.location = location;
    party.date = date;
    party.organizer = ctx.accounts.organizer.key();
    party.budget = budget;
    party.participants = Vec::new();

    parties.count = party_id;
    parties.parties_list.push(party_id);
    Ok(())
}

#[derive(Accounts)]
#[instruction(party_id: u32)]
pub struct CreateParty<'info> {
    #[account(
        init,
        seeds = [
            PARTY_SEED.as_bytes(),
            organizer.key().as_ref(),
            party_id.to_le_bytes().as_ref(),
        ],
        payer = organizer,
        bump,
        space = 8 + Party::INIT_SPACE
    )]
    pub party: Account<'info, Party>,
    #[account(
        mut,
        seeds = [
            PARTIES_SEED.as_bytes(),
            organizer.key().as_ref(),
        ],
        bump,
    )]
    pub parties: Account<'info, Parties>,
    #[account(mut)]
    pub organizer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
