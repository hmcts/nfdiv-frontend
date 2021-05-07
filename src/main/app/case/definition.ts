/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.31.861 on 2021-05-06 09:35:28.

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
  inferredPetitionerGender: Gender;
  inferredRespondentGender: Gender;
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
  petitionerFirstName: string;
  petitionerMiddleName: string;
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
  applicantHomeAddress: AddressGlobalUK;
  petitionerHomeAddressIsInternational: YesOrNo;
  petitionerPhoneNumber: string;
  petitionerContactDetailsConfidential: ConfidentialAddress;
  respondentFirstName: string;
  respondentMiddleName: string;
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
  legalConnections: LegalConnections[];
  respondentEmailAddress: string;
  petitionerKnowsRespondentsEmailAddress: YesOrNo;
  petitionerKnowsRespondentsAddress: YesOrNo;
  respondentHomeAddress: AddressGlobalUK;
  respondentHomeAddressIsInternational: YesOrNo;
  legalProceedings: YesOrNo;
  legalProceedingsDetails: string;
  legalProceedingsRelated: LegalProceedingsRelated[];
  divorceClaimFrom: ClaimsCostFrom[];
  documentsUploaded: ListValue<DivorceDocument>[];
  cannotUploadSupportingDocument: DocumentType[];
  divorceUnit: Court;
  selectedDivorceCentreSiteId: string;
  respondentSolicitorReference: string;
  documentsGenerated: ListValue<DivorceDocument>[];
  respondentSolicitorRepresented: YesOrNo;
  respondentSolicitorName: string;
  respondentSolicitorPhone: string;
  respondentSolicitorEmail: string;
  derivedRespondentSolicitorAddr: string;
  respSolDigital: YesOrNo;
  respContactMethodIsDigital: YesOrNo;
  respondentOrganisationPolicy: OrganisationPolicy<UserRole>;
  respondentCorrespondenceAddress: AddressGlobalUK;
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
  RESPONDENT = 'respondent',
  CORRESPONDENT = 'correspondent',
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

export const enum DocumentType {
  DEEMED_SERVICE_REFUSED = 'deemedServiceRefused',
  DISPENSE_WITH_SERVICE_REFUSED = 'dispenseWithServiceRefused',
  GENERAL_ORDER = 'generalOrder',
  AOS_OVERDUE_COVER_LETTER = 'aosOverdueCoverLetter',
  WELSH_TRANSLATION = 'welshTranslation',
  DEEMED_AS_SERVICE_GRANTED = 'deemedAsServiceGranted',
  DISPENSE_WITH_SERVICE_GRANTED = 'dispenseWithServiceGranted',
  DECREE_NISI_REFUSAL = 'decreeNisiRefusal',
  AOS_OFFLINE_ADULTERY_FORM_CO_RESPONDENT = 'aosOfflineAdulteryFormCoRespondent',
  AOS_OFFLINE_ADULTERY_FORM_RESPONDENT = 'aosOfflineAdulteryFormRespondent',
  AOS_OFFLINE_UNREASONABLE_BEHAVIOUR_FORM = 'aosOfflineUnreasonableBehaviourForm',
  AOS_OFFLINE_FIVE_YEAR_SEPARATION_FORM = 'aosOfflineFiveYearSeparationForm',
  AOS_OFFLINE_TWO_YEAR_SEPARATION_FORM = 'aosOfflineTwoYearSeparationForm',
  AOS_OFFLINE_INVITATION_LETTER_CO_RESPONDENT = 'aosOfflineInvitationLetterCoRespondent',
  AOS_OFFLINE_INVITATION_LETTER_RESPONDENT = 'aosOfflineInvitationLetterRespondent',
  PERSONAL_SERVICE = 'personalService',
  OTHER = 'other',
  DECREE_NISI_ANSWERS = 'decreeNisiAnswers',
  RESPONDENT_ANSWERS = 'respondentAnswers',
  PETITION = 'petition',
  NAME_CHANGE_EVIDENCE = 'nameChangeEvidence',
  MARRIAGE_CERTIFICATE_TRANSLATION = 'marriageCertificateTranslation',
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  EMAIL = 'email',
  D9H = 'D9H',
  D9D = 'D9D',
  D84A = 'D84A',
  D79 = 'D79',
  D30 = 'D30',
  DISPENSE_WITH_SERVICE = 'dispenseWithService',
  DEEMED_SERVICE = 'deemedService',
  DECREE_NISI_GRANTED = 'decreeNisiGranted',
  DECREE_NISI_APPLICATION = 'decreeNisiApplication',
  DECREE_ABSOLUTE_GRANTED = 'decreeAbsoluteGranted',
  DECREE_ABSOLUTE_APPLICATION = 'decreeAbsoluteApplication',
  COSTS_ORDER = 'costsOrder',
  COSTS = 'costs',
  CORRESPONDENCE = 'correspondence',
  CO_RESPONDENT_ANSWERS = 'coRespondentAnswers',
  CERTIFICATE_OF_ENTITLEMENT = 'certificateOfEntitlement',
  BAILIFF_SERVICE = 'bailiffService',
  ANNEX_A = 'annexA',
  ACKNOWLEDGEMENT_OF_SERVICE_CO_RESPONDENT = 'acknowledgementOfServiceCoRespondent',
  ACKNOWLEDGEMENT_OF_SERVICE = 'acknowledgementOfService',
}

export const enum FinancialOrderFor {
  CHILDREN = 'children',
  PETITIONER = 'petitioner',
}

export const enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_GIVEN = 'notGiven',
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
 * - `H` - The Petitioner is domiciled in England and Wales
 * - `I` - The Respondent is domiciled in England and Wales
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
  /**
   * The Petitioner is domiciled in England and Wales
   */
  PET_DOMICILED = 'H',
  /**
   * The Respondent is domiciled in England and Wales
   */
  RESP_DOMICILED = 'I',
}

export const enum LanguagePreference {
  ENGLISH = 'ENGLISH',
  WELSH = 'WELSH',
}

export const enum LegalConnections {
  COURTS_RESIDUAL_JURISDICTION = 'A',
  PET_RESP_DOMICILED = 'B',
  PET_DOMICILED_RESIDENT = 'C',
  PET_RESIDENT = 'D',
  RESP_RESIDENT = 'E',
  PET_RESP_ONE_RESIDENT = 'F',
  PET_RESP_RESIDENT = 'G',
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
  RESPONDENT_SOLICITOR = '[RESPSOLICITOR]',
  PETITIONER_SOLICITOR = '[PETSOLICITOR]',
  CREATOR = '[CREATOR]',
}

export const enum WhoDivorcing {
  HUSBAND = 'husband',
  WIFE = 'wife',
}

export const enum PaymentStatus {
  IN_PROGRESS = 'inProgress',
  SUCCESS = 'success',
  DECLINED = 'declined',
  TIMED_OUT = 'timedOut',
  CANCELLED = 'cancelled',
  ERROR = 'error',
}
export const FIRST_NAME = 'first name';
export const LAST_NAME = 'last name';
export const RELATIONSHIP = 'relationship';
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
export const CHANNEL = 'channel';
export const EVENT = 'event';
export const JURISDICTION_1 = 'jurisdiction1';
export const JURISDICTION_2 = 'jurisdiction2';
export const SERVICE = 'service';
export const KEYWORD = 'keyword';
export const SOLICITOR_UPDATE_CONTACT_DETAILS = 'solicitor-update-contact-details';
export const SOLICITOR_UPDATE_LANGUAGE = 'solicitor-update-language';
export const SOLICITOR_CREATE = 'solicitor-create';
export const SOLICITOR_STATEMENT_OF_TRUTH_PAY_SUBMIT = 'solicitor-statement-of-truth-pay-submit';
export const SOLICITOR_UPDATE = 'solicitor-update';
export const SAVE_AND_CLOSE = 'save-and-close';
export const PAYMENT_MADE = 'payment-made';
export const PETITIONER_STATEMENT_OF_TRUTH = 'petitioner-statement-of-truth';
export const CREATE_DRAFT = 'create-draft';
export const PATCH_CASE = 'patch-case';
export const CASE_TYPE = 'NO_FAULT_DIVORCE8';
export const JURISDICTION = 'DIVORCE';
export const PETITIONER_FIRST_NAME = 'petitionerFirstName';
export const PETITIONER_LAST_NAME = 'petitionerLastName';
export const PETITIONER_EMAIL = 'petitionerEmail';
export const FIRSTNAME = 'FirstName';
export const LASTNAME = 'LastName';
export const EMAIL = 'Email';
export const DIVORCE_COSTS_CLAIM = 'divorceCostsClaim';
export const DIVORCE_OR_DISSOLUTION = 'divorceOrDissolution';
export const FINANCIAL_ORDER = 'financialOrder';
export const DIVORCE_MINI_PETITION = 'DIVORCE_MINI_PETITION';
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
export const RESPONDENT_POSTAL_ADDRESS = 'respondentPostalAddress';
export const FOR_A_DIVORCE = 'for a divorce';
export const MARRIAGE = 'marriage';
export const OF_THE_DIVORCE = 'of the divorce';
export const CONDITIONAL_ORDER_OF_DIVORCE_FROM = 'for a final conditional order of divorce from';
export const DIVORCE_COSTS = 'divorce costs';
export const TO_END_A_CIVIL_PARTNERSHIP = 'to end a civil partnership';
export const CIVIL_PARTNERSHIP = 'civil partnership';
export const TO_END_THE_CIVIL_PARTNERSHIP = 'to end the civil partnership';
export const DISSOLUTION_OF_THE_CIVIL_PARTNERSHIP_WITH = 'for the dissolution of the civil partnership with';
export const COSTS_RELATED_TO_ENDING_THE_CIVIL_PARTNERSHIP = 'costs related to ending the civil partnership';
export const CHILDREN_OF_THE_APPLICANT_AND_THE_RESPONDENT =
  ', and for the children of the applicant and the respondent';
export const DOCUMENT_FILENAME_FMT = '%s%s';
export const DOCUMENT_NAME = 'draft-mini-petition-';
export const SERVICE_AUTHORIZATION = 'ServiceAuthorization';
export const BEARER_PREFIX = 'Bearer' + ' ';
export const LESS_THAN_ONE_YEAR_AGO = ' can not be less than one year ago.';
export const MORE_THAN_ONE_HUNDRED_YEARS_AGO = ' can not be more than 100 years ago.';
export const IN_THE_FUTURE = ' can not be in the future.';
export const EMPTY = ' cannot be empty or null';
export const MUST_BE_YES = ' must be YES';
export const CONNECTION = 'Connection ';
export const CANNOT_EXIST = ' cannot exist';
