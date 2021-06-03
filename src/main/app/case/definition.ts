/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.32.889 on 2021-06-03 15:22:01.

export interface Address {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  PostTown: string;
  County: string;
  PostCode: string;
  Country: string;
}

export interface AddressGlobal extends Address {}

export interface AddressGlobalUK extends Address {}

export interface AddressUK extends Address {}

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
  valueLabel: string;
  valueCode: string;
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
  OrganisationName: string;
}

export interface OrganisationPolicy<R> {
  Organisation: Organisation;
  PreviousOrganisations: PreviousOrganisation[];
  OrgPolicyReference: string;
  PrepopulateToUsersOrganisation: YesOrNo;
  OrgPolicyCaseAssignedRole: R;
}

export interface PreviousOrganisation {
  FromTimeStamp: DateAsString;
  ToTimeStamp: DateAsString;
  OrganisationName: string;
  OrganisationAddress: string;
}

export interface Applicant {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  AgreedToReceiveEmails: YesOrNo;
  LanguagePreferenceWelsh: YesOrNo;
  NameDifferentToMarriageCertificate: YesOrNo;
  NameChangedHow: ChangedNameHow;
  NameChangedHowOtherDetails: string;
  HomeAddress: AddressGlobalUK;
  PhoneNumber: string;
  ContactDetailsConfidential: ConfidentialAddress;
}

export interface CaseData {
  applicationType: ApplicationType;
  divorceOrDissolution: DivorceOrDissolution;
  screenHasMarriageBroken: YesOrNo;
  applicant1FirstName: string;
  applicant1MiddleName: string;
  applicant1LastName: string;
  applicant1Email: string;
  applicant1AgreedToReceiveEmails: YesOrNo;
  applicant1LanguagePreferenceWelsh: YesOrNo;
  applicant1NameDifferentToMarriageCertificate: YesOrNo;
  applicant1NameChangedHow: ChangedNameHow;
  applicant1NameChangedHowOtherDetails: string;
  applicant1HomeAddress: AddressGlobalUK;
  applicant1PhoneNumber: string;
  applicant1ContactDetailsConfidential: ConfidentialAddress;
  applicant2FirstName: string;
  applicant2MiddleName: string;
  applicant2LastName: string;
  applicant2Email: string;
  applicant2AgreedToReceiveEmails: YesOrNo;
  applicant2LanguagePreferenceWelsh: YesOrNo;
  applicant2NameDifferentToMarriageCertificate: YesOrNo;
  applicant2NameChangedHow: ChangedNameHow;
  applicant2NameChangedHowOtherDetails: string;
  applicant2HomeAddress: AddressGlobalUK;
  applicant2PhoneNumber: string;
  applicant2ContactDetailsConfidential: ConfidentialAddress;
  inferredApplicant1Gender: Gender;
  inferredApplicant2Gender: Gender;
  helpWithFeesReferenceNumber: string;
  helpWithFeesNeedHelp: YesOrNo;
  screenHasMarriageCert: YesOrNo;
  helpWithFeesAppliedForFees: YesOrNo;
  marriageMarriedInUk: YesOrNo;
  marriageCertificateInEnglish: YesOrNo;
  marriageCertifiedTranslation: YesOrNo;
  marriageCountryOfMarriage: string;
  marriagePlaceOfMarriage: string;
  marriageDate: DateAsString;
  marriageIsSameSexCouple: YesOrNo;
  marriageCertifyMarriageCertificateIsCorrect: YesOrNo;
  marriageMarriageCertificateIsIncorrectDetails: string;
  marriageIssueApplicationWithoutMarriageCertificate: YesOrNo;
  jurisdictionApplicant1Residence: YesOrNo;
  jurisdictionApplicant2Residence: YesOrNo;
  jurisdictionApplicant1Domicile: YesOrNo;
  jurisdictionApplicant2Domicile: YesOrNo;
  jurisdictionApp1HabituallyResLastTwelveMonths: YesOrNo;
  jurisdictionApp1HabituallyResLastSixMonths: YesOrNo;
  jurisdictionResidualEligible: YesOrNo;
  jurisdictionBothLastHabituallyResident: YesOrNo;
  jurisdictionConnections: JurisdictionConnections[];
  divorceWho: WhoDivorcing;
  applicant1SolicitorName: string;
  solicitorReference: string;
  applicant1SolicitorPhone: string;
  applicant1SolicitorEmail: string;
  applicant1SolicitorRepresented: YesOrNo;
  solicitorAgreeToReceiveEmails: YesOrNo;
  applicant1OrganisationPolicy: OrganisationPolicy<UserRole>;
  marriageApplicant1Name: string;
  marriageApplicant2Name: string;
  solUrgentCase: YesOrNo;
  solUrgentCaseSupportingInformation: string;
  divorceCostsClaim: YesOrNo;
  financialOrder: YesOrNo;
  applicant1WantsToHavePapersServedAnotherWay: YesOrNo;
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
  applicationFeeOrderSummary: OrderSummary;
  lastNameChangedWhenMarried: YesOrNo;
  legalConnections: LegalConnections[];
  applicant2EmailAddress: string;
  applicant1KnowsApplicant2EmailAddress: YesOrNo;
  applicant1KnowsApplicant2Address: YesOrNo;
  legalProceedings: YesOrNo;
  legalProceedingsRelated: LegalProceedingsRelated[];
  legalProceedingsDetails: string;
  divorceClaimFrom: ClaimsCostFrom[];
  documentsUploaded: ListValue<DivorceDocument>[];
  cannotUploadSupportingDocument: DocumentType[];
  divorceUnit: Court;
  selectedDivorceCentreSiteId: string;
  applicant2SolicitorReference: string;
  documentsGenerated: ListValue<DivorceDocument>[];
  applicant2SolicitorRepresented: YesOrNo;
  applicant2SolicitorName: string;
  applicant2SolicitorPhone: string;
  applicant2SolicitorEmail: string;
  derivedApplicant2SolicitorAddr: string;
  app2SolDigital: YesOrNo;
  app2ContactMethodIsDigital: YesOrNo;
  applicant2OrganisationPolicy: OrganisationPolicy<UserRole>;
  applicant2CorrespondenceAddress: AddressGlobalUK;
  financialOrderFor: FinancialOrderFor[];
  payments: ListValue<Payment>[];
  dateSubmitted: DateAsString;
  previousCaseId: CaseLink;
  dueDate: DateAsString;
  hwfCodeValidForFullAmount: YesOrNo;
  hwfAmountOutstanding: YesOrNo;
  documentUploadComplete: YesOrNo;
  invitePin: string;
}

export interface Jurisdiction {
  Applicant1Residence: YesOrNo;
  Applicant2Residence: YesOrNo;
  Applicant1Domicile: YesOrNo;
  Applicant2Domicile: YesOrNo;
  App1HabituallyResLastTwelveMonths: YesOrNo;
  App1HabituallyResLastSixMonths: YesOrNo;
  ResidualEligible: YesOrNo;
  BothLastHabituallyResident: YesOrNo;
  Connections: JurisdictionConnections[];
}

export interface MarriageDetails {
  MarriedInUk: YesOrNo;
  CertificateInEnglish: YesOrNo;
  CertifiedTranslation: YesOrNo;
  CountryOfMarriage: string;
  PlaceOfMarriage: string;
  Date: DateAsString;
  IsSameSexCouple: YesOrNo;
  CertifyMarriageCertificateIsCorrect: YesOrNo;
  MarriageCertificateIsIncorrectDetails: string;
  IssueApplicationWithoutMarriageCertificate: YesOrNo;
}

export interface DivorceDocument {
  documentDateAdded: DateAsString;
  documentComment: string;
  documentFileName: string;
  documentType: DocumentType;
  documentEmailContent: string;
  documentLink: Document;
}

export interface DocAssemblyRequest {
  templateId: string;
  outputType: string;
  formPayload: any;
  outputFilename: string;
}

export interface DocAssemblyResponse {
  renditionOutputLocation: string;
  binaryFilePath: string;
}

export interface DocumentInfo {
  url: string;
  filename: string;
  binaryUrl: string;
}

/**
 * The response from retrieving a fee from fees and payments service
 */
export interface FeeResponse {
  version: number;
  description: string;
  code: string;
  fee_amount: number;
}

export interface Payment {
  paymentDate: DateAsString;
  paymentFeeId: string;
  paymentAmount: number;
  paymentSiteId: string;
  paymentStatus: PaymentStatus;
  paymentChannel: string;
  paymentReference: string;
  paymentTransactionId: string;
}

export type DateAsString = string;

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

export const enum ApplicationType {
  SOLE_APPLICATION = 'soleApplication',
  JOINT_APPLICATION = 'jointApplication',
}

export const enum ChangedNameHow {
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  DEED_POLL = 'deedPoll',
  OTHER = 'other',
}

export const enum ClaimsCostFrom {
  APPLICANT_2 = 'applicant2',
}

export const enum ConfidentialAddress {
  SHARE = 'share',
  KEEP = 'keep',
}

export const enum Court {
  SERVICE_CENTRE = 'serviceCentre',
  EAST_MIDLANDS = 'eastMidlands',
  WEST_MIDLANDS = 'westMidlands',
  SOUTH_WEST = 'southWest',
  NORTH_WEST = 'northWest',
  BURY_ST_EDMUNDS = 'buryStEdmunds',
}

export const enum DivorceOrDissolution {
  DIVORCE = 'divorce',
  DISSOLUTION = 'dissolution',
}

export const enum FinancialOrderFor {
  CHILDREN = 'children',
  APPLICANT_1 = 'applicant1',
}

export const enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_GIVEN = 'notGiven',
}

/**
 * Values:
 * - `A` - Applicant 1 and Applicant 2 are habitually resident
 * - `B` - Applicant 1 and Applicant 2 were last habitually resident in England and Wales
 * - `C` - Applicant 2 habitually resides in England and Wales
 * - `D` - Applicant 1 is habitually resident in England and Wales and has been for 12 months
 * - `E` - Applicant 1 is habitually resident in England and Wales and has been for 6 months
 * - `F` - Applicant 1 and Applicant 2 are both domiciled in England and Wales
 * - `G` - Eligible for Residual Jurisdiction
 * - `H` - Applicant 1 is domiciled in England and Wales
 * - `I` - Applicant 2 is domiciled in England and Wales
 * - `J` - Applicant 1 habitually resides in England and Wales and joint application
 */
export const enum JurisdictionConnections {
  /**
   * Applicant 1 and Applicant 2 are habitually resident
   */
  APP_1_APP_2_RESIDENT = 'A',
  /**
   * Applicant 1 and Applicant 2 were last habitually resident in England and Wales
   */
  APP_1_APP_2_LAST_RESIDENT = 'B',
  /**
   * Applicant 2 habitually resides in England and Wales
   */
  APP_2_RESIDENT = 'C',
  /**
   * Applicant 1 is habitually resident in England and Wales and has been for 12 months
   */
  APP_1_RESIDENT_TWELVE_MONTHS = 'D',
  /**
   * Applicant 1 is habitually resident in England and Wales and has been for 6 months
   */
  APP_1_RESIDENT_SIX_MONTHS = 'E',
  /**
   * Applicant 1 and Applicant 2 are both domiciled in England and Wales
   */
  APP_1_APP_2_DOMICILED = 'F',
  /**
   * Eligible for Residual Jurisdiction
   */
  RESIDUAL_JURISDICTION = 'G',
  /**
   * Applicant 1 is domiciled in England and Wales
   */
  APP_1_DOMICILED = 'H',
  /**
   * Applicant 2 is domiciled in England and Wales
   */
  APP_2_DOMICILED = 'I',
  /**
   * Applicant 1 habitually resides in England and Wales and joint application
   */
  APP_1_RESIDENT_JOINT = 'J',
}

export const enum LanguagePreference {
  ENGLISH = 'ENGLISH',
  WELSH = 'WELSH',
}

export const enum LegalConnections {
  COURTS_RESIDUAL_JURISDICTION = 'A',
  APP_1_APP_2_DOMICILED = 'B',
  APP_1_DOMICILED_RESIDENT = 'C',
  APP_1_RESIDENT = 'D',
  APP_2_RESIDENT = 'E',
  APP_1_APP_2_ONE_RESIDENT = 'F',
  APP_1_APP_2_RESIDENT = 'G',
}

export const enum LegalProceedingsRelated {
  MARRIAGE = 'marriage',
  PROPERTY = 'property',
  CHILDREN = 'children',
}

export const enum SolServiceMethod {
  PERSONAL_SERVICE = 'personalService',
  COURT_SERVICE = 'courtService',
}

export const enum SolToPay {
  FEE_PAY_BY_ACCOUNT = 'feePayByAccount',
  FEES_HELP_WITH = 'feesHelpWith',
}

export const enum State {
  Draft = 'Draft',
  AwaitingApplicant2Response = 'AwaitingApplicant2Response',
  AwaitingPayment = 'AwaitingPayment',
  AwaitingDocuments = 'AwaitingDocuments',
  AwaitingHWFDecision = 'AwaitingHWFDecision',
  Submitted = 'Submitted',
}

export const enum UserRole {
  CASEWORKER_DIVORCE_COURTADMIN_BETA = 'caseworker-divorce-courtadmin_beta',
  CASEWORKER_DIVORCE_COURTADMIN = 'caseworker-divorce-courtadmin',
  CITIZEN = 'citizen',
  CASEWORKER_DIVORCE_SOLICITOR = 'caseworker-divorce-solicitor',
  CASEWORKER_DIVORCE_SUPERUSER = 'caseworker-divorce-superuser',
  CASEWORKER_DIVORCE_COURTADMIN_LA = 'caseworker-divorce-courtadmin-la',
  CASEWORKER_DIVORCE_SYSTEMUPDATE = 'caseworker-divorce-systemupdate',
  APPLICANT_2_SOLICITOR = '[APPTWOSOLICITOR]',
  APPLICANT_1_SOLICITOR = '[APPONESOLICITOR]',
  CREATOR = '[CREATOR]',
}

export const enum WhoDivorcing {
  HUSBAND = 'husband',
  WIFE = 'wife',
}

export const enum DocumentType {
  DIVORCE_APPLICATION = 'divorceApplication',
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  MARRIAGE_CERTIFICATE_TRANSLATION = 'marriageCertificateTranslation',
  NAME_CHANGE_EVIDENCE = 'nameChangeEvidence',
  COSTS = 'costs',
  COSTS_ORDER = 'costsOrder',
  SERVICE_SOLICITOR = 'serviceSolicitor',
  SERVICE_DISPENSED_WITH = 'serviceDispensedWith',
  SERVICE_DISPENSED_WITH_GRANTED = 'serviceDispensedWithGranted',
  SERVICE_DEEMED = 'serviceDeemed',
  SERVICE_DEEMED_AS_GRANTED = 'serviceDeemedAsGranted',
  SERVICE_BALIFF = 'serviceBaliff',
  AOS_OFFLINE_INVITATION_LETTER_TO_APPLICANT_2 = 'aosOfflineInvitationLetterToApplicant2',
  APPLICANT_2_ANSWERS = 'applicant2Answers',
  CONDITIONAL_ORDER_APPLICATION = 'conditionalOrderApplication',
  CONDITIONAL_ORDER_REFUSAL = 'conditionalOrderRefusal',
  CONDITIONAL_ORDER_REFUSAL_CLARIFICATION_RESPONSE = 'conditionalOrderRefusalClarificationResponse',
  CONDITIONAL_ORDER_ANSWERS = 'conditionalOrderAnswers',
  CONDITIONAL_ORDER_CERTIFICATE_OF_ENTITLEMENT = 'conditionalOrderCertificateOfEntitlement',
  CONDITIONAL_ORDER_GRANTED = 'conditionalOrderGranted',
  FINAL_ORDER_APPLICATION = 'finalOrderApplication',
  FINAL_ORDER_GRANTED = 'finalOrderGranted',
  CORRESPONDENCE = 'correspondence',
  GENERAL_APPLICATION = 'generalApplication',
  EMAIL = 'email',
  OTHER = 'other',
}

export const enum PaymentStatus {
  IN_PROGRESS = 'inProgress',
  SUCCESS = 'success',
  DECLINED = 'declined',
  TIMED_OUT = 'timedOut',
  CANCELLED = 'cancelled',
  ERROR = 'error',
}
export const CASE_TYPE = 'NO_FAULT_DIVORCE16';
export const JURISDICTION = 'DIVORCE';
export const CITIZEN_CREATE = 'citizen-create-application';
export const CITIZEN_INVITE_APPLICANT_2 = 'citizen-invite-applicant2';
export const CITIZEN_SUBMIT = 'citizen-submit-application';
export const CITIZEN_UPDATE = 'citizen-update-application';
export const CITIZEN_SAVE_AND_CLOSE = 'citizen-save-and-close';
export const CITIZEN_ADD_PAYMENT = 'citizen-add-payment';
