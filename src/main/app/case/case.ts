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
  gender: 'inferredApplicant2Gender',
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
  yourLifeBasedInEnglandAndWales: 'jurisdictionApplicant1Residence',
  partnersLifeBasedInEnglandAndWales: 'jurisdictionApplicant2Residence',
  yourDomicileInEnglandWales: 'jurisdictionApplicant1Domicile',
  partnersDomicileInEnglandWales: 'jurisdictionApplicant2Domicile',
  lastHabituallyResident: 'jurisdictionBothLastHabituallyResident',
  livingInEnglandWalesTwelveMonths: 'jurisdictionApp1HabituallyResLastTwelveMonths',
  livingInEnglandWalesSixMonths: 'jurisdictionApp1HabituallyResLastSixMonths',
  phoneNumber: 'applicant1PhoneNumber',
  jurisdictionResidualEligible: 'jurisdictionResidualEligible',
  connections: 'jurisdictionConnections',
  yourFirstNames: 'applicant2FirstName',
  yourMiddleNames: 'applicant2MiddleName',
  yourLastNames: 'applicant2LastName',
  theirFirstNames: 'applicant2FirstName',
  theirMiddleNames: 'applicant2MiddleName',
  theirLastNames: 'applicant2LastName',
  fullNameOnCertificate: 'marriageApplicant1Name',
  partnersFullNameOnCertificate: 'marriageApplicant2Name',
  lastNameChangeWhenRelationshipFormed: 'lastNameChangedWhenMarried',
  anyNameChangeSinceRelationshipFormed: 'applicant1NameDifferentToMarriageCertificate',
  changedNameHow: 'applicant1NameChangedHow',
  changedNameHowAnotherWay: 'applicant1NameChangedHowOtherDetails',
  applicant2EmailAddress: 'applicant2EmailAddress',
  knowPartnersAddress: 'applicant1KnowsApplicant2Address',
  legalProceedings: 'legalProceedings',
  legalProceedingsDetails: 'legalProceedingsDetails',
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
  applicant2EmailAddress?: string;
  doNotKnowApplicant2EmailAddress?: Checkbox;
  knowPartnersAddress?: YesOrNo;
  iWantToHavePapersServedAnotherWay?: Checkbox;
  legalProceedings?: YesOrNo;
  legalProceedingsDetails?: string;
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
