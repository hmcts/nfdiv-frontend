import { isInvalidHelpWithFeesRef } from '../../app/form/validation';
import { addConnection } from '../../steps/jurisdiction/interstitial/connections';

import { Case, CaseDate, Checkbox, LanguagePreference, YesOrNo, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, DivorceOrDissolution, Gender } from './definition';

const fields = {
  ...formFieldsToCaseMapping,
  sameSex: (data: Case) => ({
    D8MarriageIsSameSexCouple: data.sameSex === Checkbox.Checked ? YesOrNo.Yes : YesOrNo.No,
  }),
  gender: (data: Case) => {
    // Petitioner makes the request
    let inferredPetitionerGender = data.gender;

    // Respondent receives the request
    let inferredRespondentGender = data.gender;

    if (data.sameSex !== Checkbox.Checked) {
      if (data.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION) {
        inferredPetitionerGender = data.gender;
        inferredRespondentGender = data.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
      } else {
        inferredPetitionerGender = data.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
        inferredRespondentGender = data.gender;
      }
    }

    return {
      D8InferredPetitionerGender: inferredPetitionerGender,
      D8InferredRespondentGender: inferredRespondentGender,
    };
  },
  relationshipDate: (data: Case) => ({
    D8MarriageDate: toApiDate(data.relationshipDate),
  }),
  helpWithFeesRefNo: (data: Case) => ({
    D8HelpWithFeesReferenceNumber: !isInvalidHelpWithFeesRef(data.helpWithFeesRefNo) ? data.helpWithFeesRefNo : '',
  }),
  englishOrWelsh: (data: Case) => ({
    LanguagePreferenceWelsh: data.englishOrWelsh === LanguagePreference.Welsh ? YesOrNo.Yes : YesOrNo.No,
  }),
  partnersLifeBasedInEnglandAndWales: (data: Case) => {
    const connection = addConnection(data);
    if (connection) {
      return {
        JurisdictionConnections: [addConnection(data)],
        JurisdictionRespondentResidence: data.partnersLifeBasedInEnglandAndWales,
      };
    } else {
      return {
        JurisdictionConnections: [],
        JurisdictionRespondentResidence: data.partnersLifeBasedInEnglandAndWales,
      };
    }
  },
  yourDomicileInEnglandWales: (data: Case) => {
    const connection = addConnection(data);
    if (connection) {
      return {
        JurisdictionConnections: [addConnection(data)],
        JurisdictionPetitionerDomicile: data.yourDomicileInEnglandWales,
      };
    } else {
      return {
        JurisdictionConnections: [],
        JurisdictionPetitionerDomicile: data.yourDomicileInEnglandWales,
      };
    }
  },
  partnersDomicileInEnglandWales: (data: Case) => {
    const connection = addConnection(data);
    if (connection) {
      return {
        JurisdictionConnections: [addConnection(data)],
        JurisdictionRespondentDomicile: data.partnersDomicileInEnglandWales,
      };
    } else {
      return {
        JurisdictionConnections: [],
        JurisdictionRespondentDomicile: data.partnersDomicileInEnglandWales,
      };
    }
  },
  lastHabituallyResident: (data: Case) => {
    const connection = addConnection(data);
    if (connection) {
      return {
        JurisdictionConnections: [addConnection(data)],
        JurisdictionBothLastHabituallyResident: data.lastHabituallyResident,
      };
    } else {
      return {
        JurisdictionConnections: [],
        JurisdictionBothLastHabituallyResident: data.lastHabituallyResident,
      };
    }
  },
  livingInEnglandWalesTwelveMonths: (data: Case) => {
    const connection = addConnection(data);
    if (connection) {
      return {
        JurisdictionConnections: [addConnection(data)],
        JurisdictionPetHabituallyResLastTwelveMonths: data.livingInEnglandWalesTwelveMonths,
      };
    } else {
      return {
        JurisdictionConnections: [],
        JurisdictionPetHabituallyResLastTwelveMonths: data.livingInEnglandWalesTwelveMonths,
      };
    }
  },
  livingInEnglandWalesSixMonths: (data: Case) => {
    const connection = addConnection(data);
    if (connection) {
      return {
        JurisdictionConnections: [addConnection(data)],
        JurisdictionPetHabituallyResLastSixMonths: data.livingInEnglandWalesSixMonths,
      };
    } else {
      return {
        JurisdictionConnections: [],
        JurisdictionPetHabituallyResLastSixMonths: data.livingInEnglandWalesSixMonths,
      };
    }
  },
  jurisdictionResidualEligible: (data: Case) => {
    const connection = addConnection(data);
    if (connection) {
      return {
        JurisdictionConnections: [addConnection(data)],
        JurisdictionResidualEligible: data.jurisdictionResidualEligible,
      };
    } else {
      return {
        JurisdictionConnections: [],
        JurisdictionResidualEligible: data.jurisdictionResidualEligible,
      };
    }
  },
};

const toApiDate = (date: CaseDate | undefined) => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
