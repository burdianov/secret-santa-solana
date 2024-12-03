import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair, PublicKey } from '@solana/web3.js';
import { BN } from "bn.js";
import { assert } from "chai";

import { SsBack } from "../target/types/ss_back";

const PARTIES_SEED = "parties";
const PARTY_SEED = "party";
const PARTICIPANT_SEED = "participant";

describe("ss-back", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SsBack as Program<SsBack>;

  const organizer = anchor.web3.Keypair.generate();

  it("Initializes parties!", async () => {
    await airdrop(provider.connection, organizer.publicKey);

    const tx = await program.methods.initialize().accounts(
      {
        organizer: organizer.publicKey
      }
    ).signers([organizer]).rpc({ commitment: "confirmed" });
    console.log("Your transaction signature", tx);

    const [partiesPkey, _partyBump] = getPartiesAddress(organizer.publicKey, program.programId);

    const parties = await program.account.parties.fetch(partiesPkey);
    assert.equal(parties.count, 0);
    assert.equal(parties.partiesList.length, 0);
  });

  it("Creates party!", async () => {
    await airdrop(provider.connection, organizer.publicKey);

    const partyId = 1;
    const location = "Head Office";
    const date = new Date(Date.UTC(2024, 11, 24, 15, 0, 0));
    const timestamp = new BN(Math.floor(date.getTime() / 1000));
    const budget = "USD 20";

    const [partiesPkey, _partiesBump] = getPartiesAddress(organizer.publicKey, program.programId);

    await program.methods.createParty(partyId, location, timestamp, budget).accounts(
      {
        organizer: organizer.publicKey,
        parties: partiesPkey,
      }
    ).signers([organizer]).rpc({ commitment: "confirmed" });

    const [partyPkey, _partyBump] = getPartyAddress(organizer.publicKey, partyId, program.programId);

    const party = await program.account.party.fetch(partyPkey);
    assert.deepEqual(party.date, timestamp);
    assert.equal(party.location, location);
    assert.equal(party.budget, budget);

    const parties = await program.account.parties.fetch(partiesPkey);
    assert.equal(parties.count, 1);
    assert.equal(parties.partiesList.length, 1);
    assert.equal(parties.partiesList[0], 1);
  });

  it("Updates party!", async () => {
    await airdrop(provider.connection, organizer.publicKey);

    const partyId = 1;
    const location = "Hilton Hotel";
    const date = new Date(Date.UTC(2024, 11, 24, 15, 0, 0));
    const timestamp = new BN(Math.floor(date.getTime() / 1000));
    const budget = "USD 25";

    await program.methods.updateParty(partyId, location, timestamp, budget).accounts(
      {
        organizer: organizer.publicKey
      }
    ).signers([organizer]).rpc({ commitment: "confirmed" });

    const [partyPkey, _partyBump] = getPartyAddress(organizer.publicKey, partyId, program.programId);

    const party = await program.account.party.fetch(partyPkey);
    assert.deepEqual(party.date, timestamp);
    assert.equal(party.location, location);
    assert.equal(party.budget, budget);
  });

  it("Adds participants!", async () => {
    await airdrop(provider.connection, organizer.publicKey);

    const partyId: number = 1;

    const participantId1: string = makeId(24);
    const name1: string = "John Doe";
    const email1: string = "john@doe.com";

    const participantId2 = makeId(24);
    const name2 = "Peter Pan";
    const email2 = "peter@pan.com";

    const participantId3 = makeId(24);
    const name3 = "Alice Black";
    const email3 = "alice@black.com";

    const [partyPkey, _partyBump] = getPartyAddress(organizer.publicKey, partyId, program.programId);

    await addParticipant(program, organizer, partyId, partyPkey, participantId1, name1, email1);

    const [participantPkey1, _participantBump1] = getParticipantAddress(organizer.publicKey, partyId, participantId1, program.programId);

    let participant1 = await program.account.participant.fetch(participantPkey1);
    assert.deepEqual(participant1.participantId, participantId1);
    assert.deepEqual(participant1.recipientId, "");
    assert.equal(participant1.name, name1);
    assert.equal(participant1.email, email1);

    await addParticipant(program, organizer, partyId, partyPkey, participantId2, name2, email2);

    const [participantPkey2, _participantBump2] = getParticipantAddress(organizer.publicKey, partyId, participantId2, program.programId);

    let participant2 = await program.account.participant.fetch(participantPkey2);
    assert.deepEqual(participant2.participantId, participantId2);
    assert.equal(participant2.name, name2);
    assert.equal(participant2.email, email2);

    await addParticipant(program, organizer, partyId, partyPkey, participantId3, name3, email3);

    const [participantPkey3, _participantBump3] = getParticipantAddress(organizer.publicKey, partyId, participantId3, program.programId);

    let participant3 = await program.account.participant.fetch(participantPkey3);
    assert.deepEqual(participant3.participantId, participantId3);
    assert.equal(participant3.name, name3);
    assert.equal(participant3.email, email3);

    let party = await program.account.party.fetch(partyPkey);
    assert.equal(party.participants[0], participantId1);
    assert.equal(party.participants[1], participantId2);
    assert.equal(party.participants[2], participantId3);
    assert.equal(party.participants.length, 3);
  });

  it("Updates participant", async () => {
    await airdrop(provider.connection, organizer.publicKey);

    const partyId: number = 1;

    const participantId: string = makeId(24);
    const name: string = "John Doe";
    const email: string = "john@doe.com";

    const [partyPkey, _partyBump] = getPartyAddress(organizer.publicKey, partyId, program.programId);

    await addParticipant(program, organizer, partyId, partyPkey, participantId, name, email);

    const [participantPkey, _participantBump] = getParticipantAddress(organizer.publicKey, partyId, participantId, program.programId);

    let participant = await program.account.participant.fetch(participantPkey);
    assert.deepEqual(participant.participantId, participantId);
    assert.deepEqual(participant.recipientId, "");
    assert.equal(participant.name, name);
    assert.equal(participant.email, email);

    const newName = "Peter Pan";
    const newEmail = "peter@pan.com";
    await updateParticipant(program, organizer, partyId, partyPkey, participantId, "", newName, newEmail);

    participant = await program.account.participant.fetch(participantPkey);
    assert.equal(participant.name, newName);
    assert.equal(participant.email, newEmail);
  });

  it("Assigns recipients", async () => {
    await airdrop(provider.connection, organizer.publicKey);

    const partyId: number = 1;

    const [partyPkey, _partyBump] = getPartyAddress(organizer.publicKey, partyId, program.programId);

    let party = await program.account.party.fetch(partyPkey);

    const numOfParticipants = party.participants.length;
    let participantsArray: string[] = [];
    let shuffledArray: string[] = [];

    for (let i = 0; i < numOfParticipants; ++i) {
      participantsArray.push(party.participants[i]);
      shuffledArray.push(party.participants[i]);
    }

    shuffledArray = shuffle(shuffledArray);

    for (let i = 0; i < numOfParticipants; ++i) {
      await assignRecipient(program, organizer, partyId, partyPkey, participantsArray[i], shuffledArray[i]);
    }

    for (let i = 0; i < numOfParticipants; ++i) {
      let [participantPkey, _] = getParticipantAddress(organizer.publicKey, partyId, participantsArray[i], program.programId);
      let participant = await program.account.participant.fetch(participantPkey);
      assert.notDeepEqual(participant.participantId, participant.recipientId);
    }
  });
});

async function airdrop(connection: any, address: any, amount = 10e9) {
  await connection.confirmTransaction(await connection.requestAirdrop(address, amount), "confirmed");
}

function getPartiesAddress(organizer: PublicKey, programId: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(PARTIES_SEED),
      organizer.toBuffer(),
    ], programId);
}

function getPartyAddress(organizer: PublicKey, partyId: number, programId: PublicKey) {
  let buffer = Buffer.alloc(4);
  buffer.writeInt32LE(partyId, 0);

  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(PARTY_SEED),
      organizer.toBuffer(),
      buffer,
    ], programId);
}

function getParticipantAddress(organizer: PublicKey, partyId: number, participantId: string, programId: PublicKey) {
  let partyIdBuffer = Buffer.alloc(4);
  partyIdBuffer.writeInt32LE(partyId, 0);

  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(PARTICIPANT_SEED),
      organizer.toBuffer(),
      partyIdBuffer,
      Buffer.from(participantId)
    ], programId);
}

async function addParticipant(program: Program<SsBack>, organizer: Keypair, partyId: number, partyPkey: PublicKey, participant: string, name: string, email: string) {
  await program.methods.addParticipant(partyId, participant, name, email).accounts(
    {
      organizer: organizer.publicKey,
      party: partyPkey,
    }
  ).signers([organizer]).rpc({ commitment: "confirmed" });
}

async function updateParticipant(program: Program<SsBack>, organizer: Keypair, partyId: number, partyPkey: PublicKey, participantId: string, recipient: string, name: string, email: string) {
  await program.methods.updateParticipant(partyId, participantId, recipient, name, email).accounts(
    {
      organizer: organizer.publicKey,
      party: partyPkey,
    }
  ).signers([organizer]).rpc({ commitment: "confirmed" });
}

async function assignRecipient(program: Program<SsBack>, organizer: Keypair, partyId: number, partyPkey: PublicKey, participantId: string, recipientId: string) {
  await program.methods.assignRecipient(partyId, participantId, recipientId).accounts(
    {
      organizer: organizer.publicKey,
      party: partyPkey,
    }
  ).signers([organizer]).rpc({ commitment: "confirmed" });
}

function makeId(length: number) {
  let result: string = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    if (j === i) {
      j = i - 1;
    }
    [array[i], array[j]] = [array[j], array[i]];
  }

  if (array[0] === 0) {
    [array[0], array[1]] = [array[1], array[0]];
  }

  return array;
}
