/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.30.840 on 2021-03-16 10:42:02.

export interface Address {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  PostTown: string;
  County: string;
  PostCode: string;
  Country: string;
}

export interface CaseLink {
  CaseReference: string;
}

export interface Document {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
}

export interface Fee {
  FeeAmount: string;
  FeeCode: string;
  FeeDescription: string;
  FeeVersion: string;
}

export interface ListValue<T> {
  id: string;
  value: T;
}

export interface OrderSummary {
  PaymentReference: string;
  Fees: ListValue<Fee>[];
  PaymentTotal: string;
}

export interface CaseData {
  divorceOrDissolution: DivorceOrDissolution;
  D8ScreenHasMarriageBroken: YesOrNo;
  D8MarriageIsSameSexCouple: YesOrNo;
  D8InferredPetitionerGender: Gender;
  D8InferredRespondentGender: Gender;
  D8MarriageDate: string;
  D8HelpWithFeesReferenceNumber: string;
  D8HelpWithFeesNeedHelp: YesOrNo;
  D8ScreenHasMarriageCert: YesOrNo;
  D8HelpWithFeesAppliedForFees: YesOrNo;
  D8MarriedInUk: YesOrNo;
  D8CertificateInEnglish: YesOrNo;
  D8CertifiedTranslation: YesOrNo;
  D8PetitionerFirstName: string;
  D8PetitionerLastName: string;
  D8PetitionerEmail: string;
  JurisdictionPetitionerResidence: YesOrNo;
  JurisdictionRespondentResidence: YesOrNo;
  JurisdictionPetitionerDomicile: YesOrNo;
  JurisdictionRespondentDomicile: YesOrNo;
  JurisdictionPetHabituallyResLastTwelveMonths: YesOrNo;
  JurisdictionPetHabituallyResLastSixMonths: YesOrNo;
  JurisdictionResidualEligible: YesOrNo;
  JurisdictionBothLastHabituallyResident: YesOrNo;
  LanguagePreferenceWelsh: YesOrNo;
  D8PetitionerNameDifferentToMarriageCert: YesOrNo;
  D8PetitionerNameChangedHow: ChangedNameHow[];
  D8PetitionerNameChangedHowOtherDetails: string;
  D8DivorceWho: WhoDivorcing;
  D8DerivedPetitionerHomeAddress: string;
  D8PetitionerPhoneNumber: string;
  D8PetitionerContactDetailsConfidential: ConfidentialAddress;
  D8RespondentFirstName: string;
  D8RespondentLastName: string;
  D8RespondentNameAsOnMarriageCertificate: YesOrNo;
  RespNameDifferentToMarriageCertExplain: string;
  PetitionerSolicitorName: string;
  D8SolicitorReference: string;
  PetitionerSolicitorPhone: string;
  PetitionerSolicitorEmail: string;
  SolicitorAgreeToReceiveEmails: YesOrNo;
  DerivedPetitionerSolicitorAddr: string;
  PetitionerOrganisationPolicy: string;
}

export const enum FieldType {
  Unspecified = 'Unspecified',
  Email = 'Email',
  PhoneUK = 'PhoneUK',
  Date = 'Date',
  Document = 'Document',
  Schedule = 'Schedule',
  TextArea = 'TextArea',
  FixedList = 'FixedList',
  FixedRadioList = 'FixedRadioList',
  YesOrNo = 'YesOrNo',
  Address = 'Address',
  CaseLink = 'CaseLink',
  OrderSummary = 'OrderSummary',
}

export const enum YesOrNo {
  YES = 'YES',
  NO = 'NO',
}

export const enum State {
  Draft = 'Draft',
  SOTAgreementPayAndSubmitRequired = 'SOTAgreementPayAndSubmitRequired',
}

export const enum UserRole {
  CASEWORKER_DIVORCE_COURTADMIN_BETA = 'CASEWORKER_DIVORCE_COURTADMIN_BETA',
  CASEWORKER_DIVORCE_COURTADMIN = 'CASEWORKER_DIVORCE_COURTADMIN',
  CITIZEN = 'CITIZEN',
  CASEWORKER_DIVORCE_SOLICITOR = 'CASEWORKER_DIVORCE_SOLICITOR',
  CASEWORKER_DIVORCE_SUPERUSER = 'CASEWORKER_DIVORCE_SUPERUSER',
  CASEWORKER_DIVORCE_COURTADMIN_LA = 'CASEWORKER_DIVORCE_COURTADMIN_LA',
  CASEWORKER_DIVORCE_SYSTEMUPDATE = 'CASEWORKER_DIVORCE_SYSTEMUPDATE',
}

export const enum DivorceOrDissolution {
  DIVORCE = 'divorce',
  DISSOLUTION = 'dissolution',
}

export const enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_GIVEN = 'notGiven',
}

export const enum ChangedNameHow {
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  DEED_POLL = 'deedPoll',
  OTHER = 'other',
}

export const enum WhoDivorcing {
  HUSBAND = 'husband',
  WIFE = 'wife',
}

export const enum ConfidentialAddress {
  SHARE = 'share',
  KEEP = 'keep',
}
export const PATCH_CASE = 'patch-case';
export const CREATE_DRAFT = 'create-draft';
export const SAVE_AND_CLOSE = 'save-and-close';
export const SOLICITOR_UPDATE = 'solicitorUpdate';
export const SOLICITOR_CREATE = 'solicitorCreate';
export const CASE_TYPE = 'NO_FAULT_DIVORCE2';
export const JURISDICTION = 'DIVORCE';
