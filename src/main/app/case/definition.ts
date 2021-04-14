/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.30.840 on 2021-04-14 14:19:04.

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

export interface DynamicElementIndicator {}

export interface DynamicList {
  value: DynamicListElement;
  valueCode: string;
  valueLabel: string;
  list_items: DynamicListElement[];
}

export interface DynamicListElement {
  code: string;
  label: string;
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

export interface Organisation {
  OrganisationID: string;
}

export interface OrganisationPolicy<R> {
  Organisation: Organisation;
  OrgPolicyReference: string;
  OrgPolicyCaseAssignedRole: R;
}

export interface CaseData {
  divorceOrDissolution: DivorceOrDissolution;
  screenHasMarriageBroken: YesOrNo;
  marriageIsSameSexCouple: YesOrNo;
  inferredPetitionerGender: Gender;
  inferredRespondentGender: Gender;
  marriageDate: string;
  helpWithFeesReferenceNumber: string;
  helpWithFeesNeedHelp: YesOrNo;
  screenHasMarriageCert: YesOrNo;
  helpWithFeesAppliedForFees: YesOrNo;
  marriedInUk: YesOrNo;
  certificateInEnglish: YesOrNo;
  certifiedTranslation: YesOrNo;
  countryName: string;
  marriagePlaceOfMarriage: string;
  petitionerFirstName: string;
  petitionerLastName: string;
  petitionerEmail: string;
  petitionerAgreedToReceiveEmails: YesOrNo;
  jurisdictionPetitionerResidence: YesOrNo;
  jurisdictionRespondentResidence: YesOrNo;
  jurisdictionPetitionerDomicile: YesOrNo;
  jurisdictionRespondentDomicile: YesOrNo;
  jurisdictionPetHabituallyResLastTwelveMonths: YesOrNo;
  jurisdictionPetHabituallyResLastSixMonths: YesOrNo;
  jurisdictionResidualEligible: YesOrNo;
  jurisdictionBothLastHabituallyResident: YesOrNo;
  languagePreferenceWelsh: YesOrNo;
  petitionerNameDifferentToMarriageCertificate: YesOrNo;
  petitionerNameChangedHow: ChangedNameHow;
  petitionerNameChangedHowOtherDetails: string;
  divorceWho: WhoDivorcing;
  derivedPetitionerHomeAddress: string;
  petitionerHomeAddressIsInternational: YesOrNo;
  petitionerPhoneNumber: string;
  petitionerContactDetailsConfidential: ConfidentialAddress;
  respondentFirstName: string;
  respondentLastName: string;
  respondentNameAsOnMarriageCertificate: YesOrNo;
  respNameDifferentToMarriageCertExplain: string;
  petitionerSolicitorName: string;
  solicitorReference: string;
  petitionerSolicitorPhone: string;
  petitionerSolicitorEmail: string;
  solicitorAgreeToReceiveEmails: YesOrNo;
  derivedPetitionerSolicitorAddress: string;
  petitionerOrganisationPolicy: OrganisationPolicy<UserRole>;
  marriagePetitionerName: string;
  marriageRespondentName: string;
  solUrgentCase: YesOrNo;
  solUrgentCaseSupportingInformation: string;
  divorceCostsClaim: YesOrNo;
  financialOrder: YesOrNo;
  petitionerWantsToHavePapersServedAnotherWay: YesOrNo;
  solServiceMethod: SolServiceMethod;
  solStatementOfReconciliationCertify: YesOrNo;
  solStatementOfReconciliationDiscussed: YesOrNo;
  prayerHasBeenGiven: YesOrNo;
  statementOfTruth: YesOrNo;
  solSignStatementOfTruth: YesOrNo;
  solStatementOfReconciliationName: string;
  solStatementOfReconciliationFirm: string;
  statementOfReconciliationComments: string;
  solApplicationFeeInPounds: string;
  solPaymentHowToPay: SolToPay;
  pbaNumbers: DynamicList;
  feeAccountReference: string;
  solApplicationFeeOrderSummary: OrderSummary;
  lastNameChangedWhenMarried: YesOrNo;
  jurisdictionConnections: JurisdictionConnections[];
  respondentEmailAddress: string;
  petitionerKnowsRespondentsEmailAddress: YesOrNo;
  petitionerKnowsRespondentsAddress: YesOrNo;
  derivedRespondentHomeAddress: string;
  respondentHomeAddressIsInternational: YesOrNo;
  legalProceedings: YesOrNo;
  legalProceedingsDetails: string;
  legalProceedingsRelated: LegalProceedingsRelated[];
  divorceClaimFrom: ClaimsCostFrom[];
  createdDate: Date;
  divorceUnit: Court;
  selectedDivorceCentreSiteId: string;
  respondentSolicitorReference: string;
  documentsGenerated: DivorceDocument[];
  respondentSolicitorRepresented: YesOrNo;
  respondentSolicitorName: string;
  respondentSolicitorPhone: string;
  respondentSolicitorEmail: string;
  derivedRespondentSolicitorAddr: string;
  respSolDigital: YesOrNo;
  respondentOrganisationPolicy: OrganisationPolicy<UserRole>;
  derivedRespondentCorrespondenceAddr: string;
  financialOrderFor: FinancialOrderFor[];
}

export interface DivorceDocument {
  documentDateAdded: Date;
  documentComment: string;
  documentFileName: string;
  documentType: DocumentType;
  documentEmailContent: string;
  documentLink: Document;
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
  MultiSelectList = 'MultiSelectList',
  Collection = 'Collection',
}

export const enum YesOrNo {
  YES = 'YES',
  NO = 'NO',
}

export const enum State {
  Draft = 'Draft',
  SOTAgreementPayAndSubmitRequired = 'SOTAgreementPayAndSubmitRequired',
  Submitted = 'Submitted',
  SolicitorAwaitingPaymentConfirmation = 'SolicitorAwaitingPaymentConfirmation',
}

export const enum UserRole {
  CASEWORKER_DIVORCE_COURTADMIN_BETA = 'caseworker-divorce-courtadmin_beta',
  CASEWORKER_DIVORCE_COURTADMIN = 'caseworker-divorce-courtadmin',
  CITIZEN = 'citizen',
  CASEWORKER_DIVORCE_SOLICITOR = 'caseworker-divorce-solicitor',
  CASEWORKER_DIVORCE_SUPERUSER = 'caseworker-divorce-superuser',
  CASEWORKER_DIVORCE_COURTADMIN_LA = 'caseworker-divorce-courtadmin-la',
  CASEWORKER_DIVORCE_SYSTEMUPDATE = 'caseworker-divorce-systemupdate',
  RESPONDENT_SOLICITOR = '[RESPSOLICITOR]',
  PETITIONER_SOLICITOR = '[PETSOLICITOR]',
  CREATOR = '[CREATOR]',
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

export const enum SolServiceMethod {
  PERSONAL_SERVICE = 'personalService',
  COURT_SERVICE = 'courtService',
}

export const enum SolToPay {
  FEE_PAY_BY_ACCOUNT = 'feePayByAccount',
  FEES_HELP_WITH = 'feesHelpWith',
}

/**
 * Values:
 * - `A` - The Petitioner and Respondent are habitually resident
 * - `B` - The Petitioner and Respondent were last habitually resident in England and Wales
 * - `C` - The Respondent habitually resides in England and Wales
 * - `D` - The Petitioner is habitually resident in England and Wales and has been for 12 months
 * - `E` - The Petitioner is habitually resident in England and Wales and has been for 6 months
 * - `F` - The Petitioner and Respondent are both domiciled in England and Wales
 * - `G` - Eligible for Residual Jurisdiction
 */
export const enum JurisdictionConnections {
  /**
   * The Petitioner and Respondent are habitually resident
   */
  PET_RESP_RESIDENT = 'A',
  /**
   * The Petitioner and Respondent were last habitually resident in England and Wales
   */
  PET_RESP_LAST_RESIDENT = 'B',
  /**
   * The Respondent habitually resides in England and Wales
   */
  RESP_RESIDENT = 'C',
  /**
   * The Petitioner is habitually resident in England and Wales and has been for 12 months
   */
  PET_RESIDENT_TWELVE_MONTHS = 'D',
  /**
   * The Petitioner is habitually resident in England and Wales and has been for 6 months
   */
  PET_RESIDENT_SIX_MONTHS = 'E',
  /**
   * The Petitioner and Respondent are both domiciled in England and Wales
   */
  PET_RESP_DOMICILED = 'F',
  /**
   * Eligible for Residual Jurisdiction
   */
  RESIDUAL_JURISDICTION = 'G',
}

export const enum LegalProceedingsRelated {
  MARRIAGE = 'marriage',
  PROPERTY = 'property',
  CHILDREN = 'children',
}

export const enum ClaimsCostFrom {
  RESPONDENT = 'respondent',
  CORRESPONDENT = 'correspondent',
}

export const enum Court {
  SERVICE_CENTRE = 'serviceCentre',
  EAST_MIDLANDS = 'eastMidlands',
  WEST_MIDLANDS = 'westMidlands',
  SOUTH_WEST = 'southWest',
  NORTH_WEST = 'northWest',
  BURY_ST_EDMUNDS = 'buryStEdmunds',
}

export const enum FinancialOrderFor {
  CHILDREN = 'children',
  PETITIONER = 'petitioner',
}

export const enum DocumentType {
  Petition = 'petition',
}
export const CASE_TYPE = 'NO_FAULT_DIVORCE6';
export const JURISDICTION = 'DIVORCE';
export const PETITIONER_FIRST_NAME = 'petitionerFirstName';
export const PETITIONER_LAST_NAME = 'petitionerLastName';
export const PETITIONER_EMAIL = 'petitionerEmail';
export const FIRSTNAME = 'FirstName';
export const LASTNAME = 'LastName';
export const EMAIL = 'Email';
export const SAVE_AND_CLOSE = 'save-and-close';
export const SOLICITOR_CREATE = 'solicitor-create';
export const SOLICITOR_STATEMENT_OF_TRUTH_PAY_SUBMIT = 'solicitor-statement-of-truth-pay-submit';
export const SUBMIT_PETITION = 'submit-petition';
export const SOLICITOR_UPDATE = 'solicitor-update';
export const CREATE_DRAFT = 'create-draft';
export const PATCH_CASE = 'patch-case';
export const CHANNEL = 'channel';
export const EVENT = 'event';
export const JURISDICTION_1 = 'jurisdiction1';
export const JURISDICTION_2 = 'jurisdiction2';
export const SERVICE = 'service';
export const KEYWORD = 'keyword';
export const DIVORCE_MINI_PETITION = 'DIVORCE_MINI_PETITION';
export const SUBMITTED_WEBHOOK = '/Submitted';
export const ABOUT_TO_START_WEBHOOK = '/AboutToStart';
export const ABOUT_TO_SUBMIT_WEBHOOK = '/AboutToSubmit';
export const SERVICE_AUTHORIZATION = 'ServiceAuthorization';
export const BEARER_PREFIX = 'Bearer' + ' ';
export const FIRST_NAME = 'first name';
export const LAST_NAME = 'last name';
export const RELATIONSHIP = 'relationship';
export const DIVORCE_APPLICATION = 'divorce application';
export const APPLICATION_TO_END_CIVIL_PARTNERSHIP = 'application to end your civil partnership';
export const SIGN_IN_URL_NOTIFY_KEY = 'signin url';
export const RELATIONSHIP_COURT_HEADER = 'relationship court header';
export const APPLY_FOR_DIVORCE = 'Apply for a divorce';
export const END_CIVIL_PARTNERSHIP = 'End a civil partnership';
export const SIGN_IN_DIVORCE_URL = 'signInDivorceUrl';
export const SIGN_IN_DISSOLUTION_URL = 'signInDissolutionUrl';
export const COURT_EMAIL = 'court email';
export const DOCUMENT_FILENAME_FMT = '%s%s';
export const DOCUMENT_NAME = 'draft-mini-petition-';
