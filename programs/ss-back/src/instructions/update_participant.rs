use anchor_lang::prelude::*;

use crate::states::*;

pub fn instr_update_participant(
    ctx: Context<UpdateParticipant>,
    _party_id: u32,
    participant_id: String,
    recipient_id: String,
    name: String,
    email: String,
) -> Result<()> {
    let participant = &mut ctx.accounts.participant;

    participant.participant_id = participant_id.clone();
    participant.recipient_id = recipient_id.clone();
    participant.name = name;
    participant.email = email;

    Ok(())
}

#[derive(Accounts)]
#[instruction(party_id: u32, participant_id: String)]
pub struct UpdateParticipant<'info> {
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
