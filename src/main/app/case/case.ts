import { AnyObject } from '../controller/PostController';

import {
  CaseData,
  ChangedNameHow,
  DivorceDocument,
  DivorceOrDissolution,
  DocumentType,
  FinancialOrderFor,
  Gender,
  JurisdictionConnections,
  LegalProceedingsRelated,
  ListValue,
  YesOrNo,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  divorceOrDissolution: 'divorceOrDissolution',
  gender: 'inferredRespondentGender',
  screenHasUnionBroken: 'screenHasMarriageBroken',
  hasCertificate: 'screenHasMarriageCert',
  helpPayingNeeded: 'helpWithFeesNeedHelp',
  alreadyAppliedForHelpPaying: 'helpWithFeesAppliedForFees',
  helpWithFeesRefNo: 'helpWithFeesReferenceNumber',
  inTheUk: 'marriedInUk',
  certificateInEnglish: 'certificateInEnglish',
  certifiedTranslation: 'certifiedTranslation',
  ceremonyCountry: 'countryName',
  ceremonyPlace: 'marriagePlaceOfMarriage',
  yourLifeBasedInEnglandAndWales: 'jurisdictionPetitionerResidence',
  partnersLifeBasedInEnglandAndWales: 'jurisdictionRespondentResidence',
  yourDomicileInEnglandWales: 'jurisdictionPetitionerDomicile',
  partnersDomicileInEnglandWales: 'jurisdictionRespondentDomicile',
  lastHabituallyResident: 'jurisdictionBothLastHabituallyResident',
  livingInEnglandWalesTwelveMonths: 'jurisdictionPetHabituallyResLastTwelveMonths',
  livingInEnglandWalesSixMonths: 'jurisdictionPetHabituallyResLastSixMonths',
  phoneNumber: 'petitionerPhoneNumber',
  jurisdictionResidualEligible: 'jurisdictionResidualEligible',
  connections: 'jurisdictionConnections',
  yourFirstNames: 'petitionerFirstName',
  yourMiddleNames: 'petitionerMiddleName',
  yourLastNames: 'petitionerLastName',
  theirFirstNames: 'respondentFirstName',
  theirMiddleNames: 'respondentMiddleName',
  theirLastNames: 'respondentLastName',
  fullNameOnCertificate: 'marriagePetitionerName',
  partnersFullNameOnCertificate: 'marriageRespondentName',
  lastNameChangeWhenRelationshipFormed: 'lastNameChangedWhenMarried',
  anyNameChangeSinceRelationshipFormed: 'petitionerNameDifferentToMarriageCertificate',
  changedNameHow: 'petitionerNameChangedHow',
  changedNameHowAnotherWay: 'petitionerNameChangedHowOtherDetails',
  respondentEmailAddress: 'respondentEmailAddress',
  knowPartnersAddress: 'petitionerKnowsRespondentsAddress',
  legalProceedings: 'legalProceedings',
  legalProceedingsRelated: 'legalProceedingsRelated',
  applyForFinancialOrder: 'financialOrder',
  whoIsFinancialOrderFor: 'financialOrderFor',
  documentsUploaded: 'documentsUploaded',
};

export function formatCase<InputFormat, OutputFormat>(fields: FieldFormats, data: InputFormat): OutputFormat {
  const result = {};

  for (const field of Object.keys(data)) {
    const value = fields[field];

    if (typeof value === 'function') {
      Object.assign(result, value(data));
    } else if (typeof fields[field] === 'string') {
      result[value] = data[field];
    }
  }

  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;

export interface Case {
  divorceOrDissolution: DivorceOrDissolution;
  gender?: Gender;
  sameSex?: Checkbox;
  screenHasUnionBroken?: YesOrNo;
  relationshipDate?: CaseDate;
  hasCertificate?: YesOrNo;
  helpPayingNeeded?: YesOrNo;
  alreadyAppliedForHelpPaying?: YesOrNo;
  helpWithFeesRefNo?: string;
  inTheUk?: YesOrNo;
  certificateInEnglish?: YesOrNo;
  certifiedTranslation?: YesOrNo;
  ceremonyCountry?: string;
  ceremonyPlace?: string;
  yourLifeBasedInEnglandAndWales?: YesOrNo;
  partnersLifeBasedInEnglandAndWales?: YesOrNo;
  yourDomicileInEnglandWales?: YesOrNo;
  partnersDomicileInEnglandWales?: YesOrNo;
  lastHabituallyResident?: YesOrNo;
  livingInEnglandWalesTwelveMonths?: YesOrNo;
  livingInEnglandWalesSixMonths?: YesOrNo;
  jurisdictionResidualEligible?: YesOrNo;
  englishOrWelsh?: LanguagePreference;
  yourFirstNames?: string;
  yourMiddleNames?: string;
  yourLastNames?: string;
  yourAddress1?: string;
  yourAddress2?: string;
  yourAddress3?: string;
  yourAddressTown?: string;
  yourAddressCounty?: string;
  yourAddressPostcode?: string;
  yourAddressCountry?: string;
  phoneNumber?: string;
  agreeToReceiveEmails?: Checkbox;
  connections: JurisdictionConnections[];
  fullNameOnCertificate?: string;
  partnersFullNameOnCertificate?: string;
  addressPrivate: YesOrNo;
  theirFirstNames?: string;
  theirMiddleNames?: string;
  theirLastNames?: string;
  theirAddress1?: string;
  theirAddress2?: string;
  theirAddress3?: string;
  theirAddressTown?: string;
  theirAddressCounty?: string;
  theirAddressPostcode?: string;
  theirAddressCountry?: string;
  lastNameChangeWhenRelationshipFormed?: YesOrNo;
  anyNameChangeSinceRelationshipFormed?: YesOrNo;
  changedNameHow?: ChangedNameHow;
  changedNameHowAnotherWay?: string;
  respondentEmailAddress?: string;
  doNotKnowRespondentEmailAddress?: Checkbox;
  knowPartnersAddress?: YesOrNo;
  iWantToHavePapersServedAnotherWay?: Checkbox;
  legalProceedings?: YesOrNo;
  legalProceedingsRelated?: LegalProceedingsRelated[];
  applyForFinancialOrder?: YesOrNo;
  whoIsFinancialOrderFor?: FinancialOrderFor[];
  uploadedFiles?: UploadedFile[];
  documentsUploaded?: ListValue<Partial<DivorceDocument> | null>[];
  cannotUpload?: Checkbox;
  cannotUploadDocuments?: DocumentType | DocumentType[];
  iConfirmPrayer?: Checkbox;
  iBelieveApplicationIsTrue?: Checkbox;
}

export interface CaseWithId extends Case {
  id: string;
}

export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export enum LanguagePreference {
  English = 'english',
  Welsh = 'welsh',
}

export interface UploadedFile {
  id: string;
  name: string;
}
