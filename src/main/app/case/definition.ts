/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.31.861 on 2021-05-11 11:05:57.

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

export interface MoneyGBP {
  amount: string;
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

export interface CaseData {
  soleOrJoinApplicant: YesOrNo;
  divorceOrDissolution: DivorceOrDissolution;
  screenHasMarriageBroken: YesOrNo;
  marriageIsSameSexCouple: YesOrNo;
  inferredApplicant1Gender: Gender;
  inferredApplicant2Gender: Gender;
  marriageDate: DateAsString;
  helpWithFeesReferenceNumber: string;
  helpWithFeesNeedHelp: YesOrNo;
  screenHasMarriageCert: YesOrNo;
  helpWithFeesAppliedForFees: YesOrNo;
  marriedInUk: YesOrNo;
  certificateInEnglish: YesOrNo;
  certifiedTranslation: YesOrNo;
  countryName: string;
  marriagePlaceOfMarriage: string;
  applicant1FirstName: string;
  applicant1MiddleName: string;
  applicant1LastName: string;
  applicant1Email: string;
  applicant1AgreedToReceiveEmails: YesOrNo;
  jurisdictionApplicant1Residence: YesOrNo;
  jurisdictionApplicant2Residence: YesOrNo;
  jurisdictionApplicant1Domicile: YesOrNo;
  jurisdictionApplicant2Domicile: YesOrNo;
  jurisdictionApp1HabituallyResLastTwelveMonths: YesOrNo;
  jurisdictionApp1HabituallyResLastSixMonths: YesOrNo;
  jurisdictionResidualEligible: YesOrNo;
  jurisdictionBothLastHabituallyResident: YesOrNo;
  languagePreferenceWelsh: YesOrNo;
  applicant1NameDifferentToMarriageCertificate: YesOrNo;
  applicant1NameChangedHow: ChangedNameHow;
  applicant1NameChangedHowOtherDetails: string;
  divorceWho: WhoDivorcing;
  applicant1HomeAddress: AddressGlobalUK;
  applicant1PhoneNumber: string;
  applicant1ContactDetailsConfidential: ConfidentialAddress;
  applicant2FirstName: string;
  applicant2MiddleName: string;
  applicant2LastName: string;
  applicant2NameAsOnMarriageCertificate: YesOrNo;
  app2NameDifferentToMarriageCertExplain: string;
  applicant1SolicitorName: string;
  solicitorReference: string;
  applicant1SolicitorPhone: string;
  applicant1SolicitorEmail: string;
  solicitorAgreeToReceiveEmails: YesOrNo;
  derivedApplicant1SolicitorAddress: string;
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
  solApplicationFeeOrderSummary: OrderSummary;
  lastNameChangedWhenMarried: YesOrNo;
  jurisdictionConnections: JurisdictionConnections[];
  legalConnections: LegalConnections[];
  applicant2EmailAddress: string;
  applicant1KnowsApplicant2EmailAddress: YesOrNo;
  applicant1KnowsApplicant2Address: YesOrNo;
  applicant2HomeAddress: AddressGlobalUK;
  legalProceedings: YesOrNo;
  legalProceedingsDetails: string;
  legalProceedingsRelated: LegalProceedingsRelated[];
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
  MoneyGBP = 'MoneyGBP',
}

export const enum YesOrNo {
  YES = 'YES',
  NO = 'NO',
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
  AwaitingPayment = 'AwaitingPayment',
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
export const PATCH_CASE = 'patch-case';
export const PAYMENT_MADE = 'payment-made';
export const APPLICANT_1_STATEMENT_OF_TRUTH = 'applicant-1-statement-of-truth';
export const CREATE_DRAFT = 'create-draft';
export const SAVE_AND_CLOSE = 'save-and-close';
export const FIRST_NAME = 'first name';
export const LAST_NAME = 'last name';
export const DIVORCE_APPLICATION = 'divorce application';
export const APPLICATION_TO_END_CIVIL_PARTNERSHIP = 'application to end your civil partnership';
export const SIGN_IN_URL_NOTIFY_KEY = 'signin url';
export const RELATIONSHIP_COURT_HEADER = 'relationship court header';
export const SIGN_IN_DIVORCE_URL = 'signInDivorceUrl';
export const SIGN_IN_DISSOLUTION_URL = 'signInDissolutionUrl';
export const DIVORCE_COURT_EMAIL = 'divorceCourtEmail';
export const DISSOLUTION_COURT_EMAIL = 'dissolutionCourtEmail';
export const COURT_EMAIL = 'court email';
export const SUBMISSION_RESPONSE_DATE = 'date of response';
export const APPLICATION_REFERENCE = 'reference number';
export const DIVORCE_OR_DISSOLUTION = 'divorceOrDissolution';
export const MARRIAGE_OR_RELATIONSHIP = 'marriageOrRelationship';
export const MARRIAGE_OR_CIVIL_PARTNERSHIP = 'marriageOrCivilPartnership';
export const DIVORCE_OR_END_CIVIL_PARTNERSHIP = 'divorceOrEndCivilPartnership';
export const FINANCIAL_ORDER_OR_DISSOLUTION = 'financialOrderOrDissolution';
export const DIVORCE_OR_DISSOLUTION_COST = 'divorceOrDissolutionCost';
export const CCD_CASE_REFERENCE = 'ccdCaseReference';
export const ISSUE_DATE = 'issueDate';
export const APPLICANT_1_FIRST_NAME = 'applicant1FirstName';
export const APPLICANT_1_MIDDLE_NAME = 'applicant1MiddleName';
export const APPLICANT_1_LAST_NAME = 'applicant1LastName';
export const APPLICANT_2_FIRST_NAME = 'applicant2FirstName';
export const APPLICANT_2_MIDDLE_NAME = 'applicant2MiddleName';
export const APPLICANT_2_LAST_NAME = 'applicant2LastName';
export const APPLICANT_1_FULL_NAME = 'applicant1FullName';
export const APPLICANT_2_FULL_NAME = 'applicant2FullName';
export const MARRIAGE_DATE = 'marriageDate';
export const COURT_CASE_DETAILS = 'courtCaseDetails';
export const HAS_COST_ORDERS = 'hasCostOrders';
export const HAS_FINANCIAL_ORDERS = 'hasFinancialOrders';
export const HAS_FINANCIAL_ORDERS_FOR_CHILD = 'hasFinancialOrdersForChild';
export const FINANCIAL_ORDER_CHILD = 'financialOrderChild';
export const APPLICANT_2_POSTAL_ADDRESS = 'applicant2PostalAddress';
export const FOR_A_DIVORCE = 'for a divorce';
export const MARRIAGE = 'marriage';
export const OF_THE_DIVORCE = 'of the divorce';
export const CONDITIONAL_ORDER_OF_DIVORCE_FROM = 'for a final conditional order of divorce from';
export const DIVORCE_COSTS = 'divorce costs';
export const TO_END_A_CIVIL_PARTNERSHIP = 'to end a civil partnership';
export const RELATIONSHIP = 'relationship';
export const CIVIL_PARTNERSHIP = 'civil partnership';
export const TO_END_THE_CIVIL_PARTNERSHIP = 'to end the civil partnership';
export const DISSOLUTION_OF_THE_CIVIL_PARTNERSHIP_WITH = 'for the dissolution of the civil partnership with';
export const COSTS_RELATED_TO_ENDING_THE_CIVIL_PARTNERSHIP = 'costs related to ending the civil partnership';
export const CHILDREN_OF_THE_APPLICANT_1_AND_APPLICANT_2 = ', and for the children of applicant 1 and applicant 2';
export const DIVORCE_MINI_APPLICATION = 'DIVORCE_MINI_APPLICATION';
export const USER_ROLES = 'user-roles';
export const USER_ID = 'user-id';
export const DOCUMENT_DELETE_URI = 'document_delete_uri';
export const PERMANENT = 'permanent';
export const DOCUMENT_FILENAME_FMT = '%s%s';
export const DOCUMENT_NAME = 'draft-mini-application-';
export const SOLICITOR_UPDATE_CONTACT_DETAILS = 'solicitor-update-contact-details';
export const SOLICITOR_CREATE = 'solicitor-create';
export const SOLICITOR_UPDATE = 'solicitor-update';
export const SOLICITOR_UPDATE_LANGUAGE = 'solicitor-update-language';
export const SOLICITOR_STATEMENT_OF_TRUTH_PAY_SUBMIT = 'solicitor-statement-of-truth-pay-submit';
export const CASE_TYPE = 'NO_FAULT_DIVORCE9';
export const JURISDICTION = 'DIVORCE';
export const APPLICANT_1_EMAIL = 'applicant1Email';
export const FIRSTNAME = 'FirstName';
export const LASTNAME = 'LastName';
export const EMAIL = 'Email';
export const DIVORCE_COSTS_CLAIM = 'divorceCostsClaim';
export const FINANCIAL_ORDER = 'financialOrder';
export const LESS_THAN_ONE_YEAR_AGO = ' can not be less than one year ago.';
export const MORE_THAN_ONE_HUNDRED_YEARS_AGO = ' can not be more than 100 years ago.';
export const IN_THE_FUTURE = ' can not be in the future.';
export const EMPTY = ' cannot be empty or null';
export const MUST_BE_YES = ' must be YES';
export const CONNECTION = 'Connection ';
export const CANNOT_EXIST = ' cannot exist';
export const SERVICE_AUTHORIZATION = 'ServiceAuthorization';
export const BEARER_PREFIX = 'Bearer' + ' ';
export const CHANNEL = 'channel';
export const EVENT = 'event';
export const JURISDICTION_1 = 'jurisdiction1';
export const JURISDICTION_2 = 'jurisdiction2';
export const SERVICE = 'service';
export const KEYWORD = 'keyword';
