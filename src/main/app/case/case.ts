import { AnyObject } from '../controller/PostController';

import {
  ApplicationType,
  CaseData,
  ChangedNameHow,
  DateAsString,
  DivorceDocument,
  DivorceOrDissolution,
  DocumentType,
  FinancialOrderFor,
  Gender,
  JurisdictionConnections,
  LegalProceedingsRelated,
  ListValue,
  OrderSummary,
  Payment,
  State,
  YesOrNo,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  applicationType: 'applicationType',
  divorceOrDissolution: 'divorceOrDissolution',
  gender: 'applicant2Gender',
  screenHasUnionBroken: 'applicant1ScreenHasMarriageBroken',
  hasCertificate: 'screenHasMarriageCert',
  applicant1HelpPayingNeeded: 'helpWithFeesNeedHelp',
  applicant1AlreadyAppliedForHelpPaying: 'helpWithFeesAppliedForFees',
  applicant1HelpWithFeesRefNo: 'helpWithFeesReferenceNumber',
  inTheUk: 'marriageMarriedInUk',
  certificateInEnglish: 'marriageCertificateInEnglish',
  certifiedTranslation: 'marriageCertifiedTranslation',
  ceremonyCountry: 'marriageCountryOfMarriage',
  ceremonyPlace: 'marriagePlaceOfMarriage',
  applicant1LifeBasedInEnglandAndWales: 'jurisdictionApplicant1Residence',
  applicant2LifeBasedInEnglandAndWales: 'jurisdictionApplicant2Residence',
  applicant1DomicileInEnglandWales: 'jurisdictionApplicant1Domicile',
  applicant2DomicileInEnglandWales: 'jurisdictionApplicant2Domicile',
  bothLastHabituallyResident: 'jurisdictionBothLastHabituallyResident',
  applicant1LivingInEnglandWalesTwelveMonths: 'jurisdictionApp1HabituallyResLastTwelveMonths',
  applicant1LivingInEnglandWalesSixMonths: 'jurisdictionApp1HabituallyResLastSixMonths',
  applicant1PhoneNumber: 'applicant1PhoneNumber',
  jurisdictionResidualEligible: 'jurisdictionResidualEligible',
  connections: 'jurisdictionConnections',
  applicant1FirstNames: 'applicant1FirstName',
  applicant1MiddleNames: 'applicant1MiddleName',
  applicant1LastNames: 'applicant1LastName',
  applicant2FirstNames: 'applicant2FirstName',
  applicant2MiddleNames: 'applicant2MiddleName',
  applicant2LastNames: 'applicant2LastName',
  applicant1FullNameOnCertificate: 'marriageApplicant1Name',
  applicant2FullNameOnCertificate: 'marriageApplicant2Name',
  applicant1LastNameChangedWhenRelationshipFormed: 'lastNameChangedWhenMarried',
  applicant1NameChangedSinceRelationshipFormed: 'applicant1NameDifferentToMarriageCertificate',
  applicant1ChangedNameHow: 'applicant1NameChangedHow',
  applicant1ChangedNameHowAnotherWay: 'applicant1NameChangedHowOtherDetails',
  applicant2EmailAddress: 'applicant2EmailAddress',
  applicant1KnowsApplicant2Address: 'applicant1KnowsApplicant2Address',
  legalProceedings: 'legalProceedings',
  legalProceedingsDetails: 'legalProceedingsDetails',
  legalProceedingsRelated: 'legalProceedingsRelated',
  applyForFinancialOrder: 'financialOrder',
  whoIsFinancialOrderFor: 'financialOrderFor',
  documentsUploaded: 'documentsUploaded',
  respondentUserId: 'respondentUserId',
};

export const readOnlyFormFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  applicationFeeOrderSummary: 'applicationFeeOrderSummary',
  payments: 'payments',
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
  applicationType?: ApplicationType;
  divorceOrDissolution: DivorceOrDissolution;
  gender?: Gender;
  sameSex?: Checkbox;
  screenHasUnionBroken?: YesOrNo;
  relationshipDate?: CaseDate;
  hasCertificate?: YesOrNo;
  applicant1HelpPayingNeeded?: YesOrNo;
  applicant1AlreadyAppliedForHelpPaying?: YesOrNo;
  applicant1HelpWithFeesRefNo?: string;
  inTheUk?: YesOrNo;
  certificateInEnglish?: YesOrNo;
  certifiedTranslation?: YesOrNo;
  ceremonyCountry?: string;
  ceremonyPlace?: string;
  applicant1LifeBasedInEnglandAndWales?: YesOrNo;
  applicant2LifeBasedInEnglandAndWales?: YesOrNo;
  applicant1DomicileInEnglandWales?: YesOrNo;
  applicant2DomicileInEnglandWales?: YesOrNo;
  bothLastHabituallyResident?: YesOrNo;
  applicant1LivingInEnglandWalesTwelveMonths?: YesOrNo;
  applicant1LivingInEnglandWalesSixMonths?: YesOrNo;
  jurisdictionResidualEligible?: YesOrNo;
  englishOrWelsh?: LanguagePreference;
  applicant1FirstNames?: string;
  applicant1MiddleNames?: string;
  applicant1LastNames?: string;
  applicant1Address1?: string;
  applicant1Address2?: string;
  applicant1Address3?: string;
  applicant1AddressTown?: string;
  applicant1AddressCounty?: string;
  applicant1AddressPostcode?: string;
  applicant1AddressCountry?: string;
  applicant1PhoneNumber?: string;
  applicant1AgreeToReceiveEmails?: Checkbox;
  connections: JurisdictionConnections[];
  applicant1FullNameOnCertificate?: string;
  applicant2FullNameOnCertificate?: string;
  applicant1AddressPrivate: YesOrNo;
  applicant2FirstNames?: string;
  applicant2MiddleNames?: string;
  applicant2LastNames?: string;
  applicant2Address1?: string;
  applicant2Address2?: string;
  applicant2Address3?: string;
  applicant2AddressTown?: string;
  applicant2AddressCounty?: string;
  applicant2AddressPostcode?: string;
  applicant2AddressCountry?: string;
  applicant1LastNameChangedWhenRelationshipFormed?: YesOrNo;
  applicant1NameChangedSinceRelationshipFormed?: YesOrNo;
  applicant1ChangedNameHow?: ChangedNameHow;
  applicant1ChangedNameHowAnotherWay?: string;
  applicant2EmailAddress?: string;
  applicant1DoesNotKnowApplicant2EmailAddress?: Checkbox;
  applicant1KnowsApplicant2Address?: YesOrNo;
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
  accessCode?: string;
  dueDate?: DateAsString;
  iConfirmPrayer?: Checkbox;
  iBelieveApplicationIsTrue?: Checkbox;
  caseReference?: string;
  respondentUserId?: string;
  dateSubmitted?: Date;
  payments: ListValue<Payment>[];
  applicationFeeOrderSummary: OrderSummary;
}

export interface CaseWithId extends Case {
  id: string;
  state: State;
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
