/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
export function filterData(records: any[]): any[] {
    if (!Array.isArray(records)) {
      console.error('Expected an array but received:', records);
      return [];
    }
  
    return records.map((record: any) => ({
      presName: record.presName,
      birthYr: record.birthYr,
      yrsServ: record.yrsServ,
      deathAge: record.deathAge,
      party: record.party,
      stateBorn: record.stateBorn,
      adminNr: record.adminNr,
      yearInaugurated: record.yearInaugurated,
      vicePresName: record.vicePresName,
      electionYear: record.electionYear,
      candidate: record.candidate,
      votes: record.votes,
      winnerLoserIndic: record.winnerLoserIndic,
      hobby: record.hobby,
      spouseName: record.spouseName,
      prAge: record.prAge,
      spAge: record.spAge,
      nrChildren: record.nrChildren,
      marYear: record.marYear,
      stateName: record.stateName,
      adminEntered: record.adminEntered,
      yearEntered: record.yearEntered,

    }));
  }