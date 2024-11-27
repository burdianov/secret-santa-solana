use anchor_lang::prelude::*;

use crate::states::*;

pub fn instr_initialize_parties(_ctx: Context<Initialize>) -> Result<()> {
    Ok(())
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
