use anchor_lang::prelude::*;

use crate::states::*;

pub fn instr_assign_buddy(
    ctx: Context<AssignBuddy>,
    _party_id: u32,
    _participant_id: String,
    buddy_id: String,
) -> Result<()> {
    let participant = &mut ctx.accounts.participant;
    participant.buddy_id = buddy_id.clone();

    Ok(())
}

#[derive(Accounts)]
#[instruction(party_id: u32, participant_id: String)]
pub struct AssignBuddy<'info> {
    #[account(
        mut,
        seeds = [
            PARTICIPANT_SEED.as_bytes(),
            organizer.key().as_ref(),
            party_id.to_le_bytes().as_ref(),
            participant_id.as_bytes()
        ],
        bump,
    )]
    pub participant: Account<'info, Participant>,
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
