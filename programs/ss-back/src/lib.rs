use anchor_lang::prelude::*;

declare_id!("2tMDoY5s3xnvZ8ma4HvvzhPqwK9fZCT2EJD6VT2RX5t5");

const PARTIES_SEED: &str = "parties";
const PARTY_SEED: &str = "party";
const PARTICIPANT_SEED: &str = "participant";

#[program]
pub mod ss_back {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn create_party(
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

    pub fn update_party(
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

    pub fn add_participant(
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

    pub fn update_participant(
        ctx: Context<UpdateParticipant>,
        _party_id: u32,
        participant_id: String,
        buddy_id: String,
        name: String,
        email: String,
    ) -> Result<()> {
        let participant = &mut ctx.accounts.participant;

        participant.participant_id = participant_id.clone();
        participant.buddy_id = buddy_id.clone();
        participant.name = name;
        participant.email = email;

        Ok(())
    }

    pub fn assign_buddy(
        ctx: Context<AssignBuddy>,
        _party_id: u32,
        _participant_id: String,
        buddy_id: String,
    ) -> Result<()> {
        let participant = &mut ctx.accounts.participant;
        participant.buddy_id = buddy_id.clone();

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [
            PARTIES_SEED.as_bytes(),
            organizer.key().as_ref(),
        ],
        payer = organizer,
        bump,
        space = 8 + Parties::INIT_SPACE
    )]
    pub parties: Account<'info, Parties>,
    #[account(mut)]
    pub organizer: Signer<'info>,
    pub system_program: Program<'info, System>,
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
