use anchor_lang::prelude::*;

use crate::states::*;

pub fn instr_add_participant(
    ctx: Context<AddParticipant>,
    party_id: u32,
    participant_id: String,
    name: String,
    email: String,
) -> Result<()> {
    let participant = &mut ctx.accounts.participant;
    let party = &mut ctx.accounts.party;

    participant.party_id = party_id;
    participant.participant_id = participant_id.clone();
    participant.name = name;
    participant.email = email;

    party.participants.push(participant_id.clone());
    Ok(())
}

#[derive(Accounts)]
#[instruction(party_id: u32, participant_id: String)]
pub struct AddParticipant<'info> {
    #[account(
        init,
        seeds = [
            PARTICIPANT_SEED.as_bytes(),
            organizer.key().as_ref(),
            party_id.to_le_bytes().as_ref(),
            participant_id.as_bytes()
        ],
        payer = organizer,
        bump,
        space = 8 + Participant::INIT_SPACE
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
