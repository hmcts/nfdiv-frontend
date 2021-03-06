/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.32.889 on 2021-07-14 07:00:14.

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
  list_items: DynamicListElement[];
  valueLabel: string;
  valueCode: string;
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
  OrganisationName: string;
  OrganisationID: string;
  OrganisationId: string;
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

export interface CaseNote {
  author: string;
  date: DateAsString;
  note: string;
}

export interface AcknowledgementOfService {
  confirmReadPetition: YesOrNo;
  jurisdictionAgree: YesOrNo;
  jurisdictionDisagreeReason: string;
  legalProceedingsExist: YesOrNo;
  legalProceedingsDescription: string;
  agreeToCosts: RespondentAgreeToCosts;
  costsAmount: string;
  costsReason: string;
  dateAosSubmitted: DateAsString;
  digitalNoticeOfProceedings: YesOrNo;
  noticeOfProceedingsEmail: string;
  noticeOfProceedingsSolicitorFirm: string;
}

export interface Applicant {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  AgreedToReceiveEmails: YesOrNo;
  LanguagePreferenceWelsh: YesOrNo;
  LastNameChangedWhenMarried: YesOrNo;
  NameDifferentToMarriageCertificate: YesOrNo;
  NameChangedHow: ChangedNameHow;
  NameChangedHowOtherDetails: string;
  HomeAddress: AddressGlobalUK;
  PhoneNumber: string;
  ContactDetailsConfidential: ConfidentialAddress;
  Gender: Gender;
  CorrespondenceAddress: AddressGlobalUK;
  SolicitorRepresented: YesOrNo;
  SolicitorName: string;
  SolicitorReference: string;
  SolicitorPhone: string;
  SolicitorEmail: string;
  SolicitorAddress: string;
  SolicitorAgreeToReceiveEmails: YesOrNo;
  SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  SolicitorIsDigital: YesOrNo;
  FinancialOrder: YesOrNo;
  FinancialOrderFor: FinancialOrderFor[];
}

export interface Application {
  applicant1ScreenHasMarriageBroken: YesOrNo;
  applicant2ScreenHasMarriageBroken: YesOrNo;
  screenHasMarriageCert: YesOrNo;
  marriageApplicant1Name: string;
  marriageApplicant2Name: string;
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
  jurisdictionLegalConnections: LegalConnections[];
  helpWithFeesReferenceNumber: string;
  helpWithFeesNeedHelp: YesOrNo;
  helpWithFeesAppliedForFees: YesOrNo;
  divorceWho: WhoDivorcing;
  solUrgentCase: YesOrNo;
  solUrgentCaseSupportingInformation: string;
  divorceCostsClaim: YesOrNo;
  applicant1WantsToHavePapersServedAnotherWay: YesOrNo;
  solServiceMethod: ServiceMethod;
  solStatementOfReconciliationCertify: YesOrNo;
  solStatementOfReconciliationDiscussed: YesOrNo;
  prayerHasBeenGiven: YesOrNo;
  statementOfTruth: YesOrNo;
  solSignStatementOfTruth: YesOrNo;
  solStatementOfReconciliationName: string;
  solStatementOfReconciliationFirm: string;
  statementOfReconciliationComments: string;
  solApplicationFeeInPounds: string;
  solPaymentHowToPay: SolicitorPaymentMethod;
  pbaNumbers: DynamicList;
  feeAccountReference: string;
  applicationFeeOrderSummary: OrderSummary;
  applicant2AgreeToReceiveEmails: YesOrNo;
  applicant1KnowsApplicant2EmailAddress: YesOrNo;
  applicant1KnowsApplicant2Address: YesOrNo;
  legalProceedings: YesOrNo;
  legalProceedingsRelated: LegalProceedingsRelated[];
  legalProceedingsDetails: string;
  divorceClaimFrom: ClaimsCostFrom[];
  app2ContactMethodIsDigital: YesOrNo;
  cannotUploadSupportingDocument: DocumentType[];
  documentUploadComplete: YesOrNo;
  miniApplicationLink: Document;
  dateSubmitted: DateAsString;
  applicant2ConfirmApplicant1Information: YesOrNo;
  applicant2ExplainsApplicant1IncorrectInformation: string;
}

export interface CaseData {
  applicationType: ApplicationType;
  divorceOrDissolution: DivorceOrDissolution;
  applicant1FirstName: string;
  applicant1MiddleName: string;
  applicant1LastName: string;
  applicant1Email: string;
  applicant1AgreedToReceiveEmails: YesOrNo;
  applicant1LanguagePreferenceWelsh: YesOrNo;
  applicant1LastNameChangedWhenMarried: YesOrNo;
  applicant1NameDifferentToMarriageCertificate: YesOrNo;
  applicant1NameChangedHow: ChangedNameHow;
  applicant1NameChangedHowOtherDetails: string;
  applicant1HomeAddress: AddressGlobalUK;
  applicant1PhoneNumber: string;
  applicant1ContactDetailsConfidential: ConfidentialAddress;
  applicant1Gender: Gender;
  applicant1CorrespondenceAddress: AddressGlobalUK;
  applicant1SolicitorRepresented: YesOrNo;
  applicant1SolicitorName: string;
  applicant1SolicitorReference: string;
  applicant1SolicitorPhone: string;
  applicant1SolicitorEmail: string;
  applicant1SolicitorAddress: string;
  applicant1SolicitorAgreeToReceiveEmails: YesOrNo;
  applicant1SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  applicant1SolicitorIsDigital: YesOrNo;
  applicant1FinancialOrder: YesOrNo;
  applicant1FinancialOrderFor: FinancialOrderFor[];
  applicant2FirstName: string;
  applicant2MiddleName: string;
  applicant2LastName: string;
  applicant2Email: string;
  applicant2AgreedToReceiveEmails: YesOrNo;
  applicant2LanguagePreferenceWelsh: YesOrNo;
  applicant2LastNameChangedWhenMarried: YesOrNo;
  applicant2NameDifferentToMarriageCertificate: YesOrNo;
  applicant2NameChangedHow: ChangedNameHow;
  applicant2NameChangedHowOtherDetails: string;
  applicant2HomeAddress: AddressGlobalUK;
  applicant2PhoneNumber: string;
  applicant2ContactDetailsConfidential: ConfidentialAddress;
  applicant2Gender: Gender;
  applicant2CorrespondenceAddress: AddressGlobalUK;
  applicant2SolicitorRepresented: YesOrNo;
  applicant2SolicitorName: string;
  applicant2SolicitorReference: string;
  applicant2SolicitorPhone: string;
  applicant2SolicitorEmail: string;
  applicant2SolicitorAddress: string;
  applicant2SolicitorAgreeToReceiveEmails: YesOrNo;
  applicant2SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  applicant2SolicitorIsDigital: YesOrNo;
  applicant2FinancialOrder: YesOrNo;
  applicant2FinancialOrderFor: FinancialOrderFor[];
  applicant1ScreenHasMarriageBroken: YesOrNo;
  applicant2ScreenHasMarriageBroken: YesOrNo;
  screenHasMarriageCert: YesOrNo;
  marriageApplicant1Name: string;
  marriageApplicant2Name: string;
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
  jurisdictionLegalConnections: LegalConnections[];
  helpWithFeesReferenceNumber: string;
  helpWithFeesNeedHelp: YesOrNo;
  helpWithFeesAppliedForFees: YesOrNo;
  divorceWho: WhoDivorcing;
  solUrgentCase: YesOrNo;
  solUrgentCaseSupportingInformation: string;
  divorceCostsClaim: YesOrNo;
  applicant1WantsToHavePapersServedAnotherWay: YesOrNo;
  solServiceMethod: ServiceMethod;
  solStatementOfReconciliationCertify: YesOrNo;
  solStatementOfReconciliationDiscussed: YesOrNo;
  prayerHasBeenGiven: YesOrNo;
  statementOfTruth: YesOrNo;
  solSignStatementOfTruth: YesOrNo;
  solStatementOfReconciliationName: string;
  solStatementOfReconciliationFirm: string;
  statementOfReconciliationComments: string;
  solApplicationFeeInPounds: string;
  solPaymentHowToPay: SolicitorPaymentMethod;
  pbaNumbers: DynamicList;
  feeAccountReference: string;
  applicationFeeOrderSummary: OrderSummary;
  applicant2AgreeToReceiveEmails: YesOrNo;
  applicant1KnowsApplicant2EmailAddress: YesOrNo;
  applicant1KnowsApplicant2Address: YesOrNo;
  legalProceedings: YesOrNo;
  legalProceedingsRelated: LegalProceedingsRelated[];
  legalProceedingsDetails: string;
  divorceClaimFrom: ClaimsCostFrom[];
  app2ContactMethodIsDigital: YesOrNo;
  cannotUploadSupportingDocument: DocumentType[];
  documentUploadComplete: YesOrNo;
  miniApplicationLink: Document;
  dateSubmitted: DateAsString;
  applicant2ConfirmApplicant1Information: YesOrNo;
  applicant2ExplainsApplicant1IncorrectInformation: string;
  applicant2InviteEmailAddress: string;
  accessCode: string;
  applicant2UserId: string;
  confirmReadPetition: YesOrNo;
  jurisdictionAgree: YesOrNo;
  jurisdictionDisagreeReason: string;
  legalProceedingsExist: YesOrNo;
  legalProceedingsDescription: string;
  agreeToCosts: RespondentAgreeToCosts;
  costsAmount: string;
  costsReason: string;
  dateAosSubmitted: DateAsString;
  digitalNoticeOfProceedings: YesOrNo;
  noticeOfProceedingsEmail: string;
  noticeOfProceedingsSolicitorFirm: string;
  dateConditionalOrderSubmitted: DateAsString;
  dateFinalOrderSubmitted: DateAsString;
  documentsUploaded: ListValue<DivorceDocument>[];
  divorceUnit: Court;
  selectedDivorceCentreSiteId: string;
  documentsGenerated: ListValue<DivorceDocument>[];
  payments: ListValue<Payment>[];
  previousCaseId: CaseLink;
  dueDate: DateAsString;
  issueDate: DateAsString;
  notes: ListValue<CaseNote>[];
  note: string;
}

export interface CaseInvite {
  applicant2InviteEmailAddress: string;
  accessCode: string;
  applicant2UserId: string;
}

export interface ConditionalOrder {
  dateConditionalOrderSubmitted: DateAsString;
}

export interface FinalOrder {
  dateFinalOrderSubmitted: DateAsString;
}

export interface HelpWithFees {
  ReferenceNumber: string;
  NeedHelp: YesOrNo;
  AppliedForFees: YesOrNo;
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
  LegalConnections: LegalConnections[];
}

export interface MarriageDetails {
  Applicant1Name: string;
  Applicant2Name: string;
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

export interface Solicitor {
  Name: string;
  Reference: string;
  Phone: string;
  Email: string;
  Address: string;
  AgreeToReceiveEmails: YesOrNo;
  OrganisationPolicy: OrganisationPolicy<UserRole>;
  IsDigital: YesOrNo;
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

export interface Letter {
  divorceDocument: DivorceDocument;
  count: number;
}

export interface Print {
  letters: Letter[];
  caseId: string;
  caseRef: string;
  letterType: string;
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
  Label = 'Label',
}

export const enum YesOrNo {
  YES = 'Yes',
  NO = 'No',
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
  APPLICANT_2 = 'applicant2',
}

export const enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_GIVEN = 'notGiven',
}

/**
 * Values:
 * - `A` - The applicant and the respondent are habitually resident
 * - `B` - The applicant and the respondent were last habitually resident in England and Wales
 * - `C` - The respondent habitually resides in England and Wales
 * - `D` - The applicant is habitually resident in England and Wales and has been for 12 months
 * - `E` - The applicant is habitually resident in England and Wales and has been for 6 months
 * - `F` - The applicant and the respondent are both domiciled in England and Wales
 * - `G` - Eligible for Residual Jurisdiction
 * - `H` - The applicant is domiciled in England and Wales
 * - `I` - The respondent is domiciled in England and Wales
 * - `J` - The applicant habitually resides in England and Wales
 */
export const enum JurisdictionConnections {
  /**
   * The applicant and the respondent are habitually resident
   */
  APP_1_APP_2_RESIDENT = 'A',
  /**
   * The applicant and the respondent were last habitually resident in England and Wales
   */
  APP_1_APP_2_LAST_RESIDENT = 'B',
  /**
   * The respondent habitually resides in England and Wales
   */
  APP_2_RESIDENT = 'C',
  /**
   * The applicant is habitually resident in England and Wales and has been for 12 months
   */
  APP_1_RESIDENT_TWELVE_MONTHS = 'D',
  /**
   * The applicant is habitually resident in England and Wales and has been for 6 months
   */
  APP_1_RESIDENT_SIX_MONTHS = 'E',
  /**
   * The applicant and the respondent are both domiciled in England and Wales
   */
  APP_1_APP_2_DOMICILED = 'F',
  /**
   * Eligible for Residual Jurisdiction
   */
  RESIDUAL_JURISDICTION = 'G',
  /**
   * The applicant is domiciled in England and Wales
   */
  APP_1_DOMICILED = 'H',
  /**
   * The respondent is domiciled in England and Wales
   */
  APP_2_DOMICILED = 'I',
  /**
   * The applicant habitually resides in England and Wales
   */
  APP_1_RESIDENT_JOINT = 'J',
}

export const enum LanguagePreference {
  ENGLISH = 'ENGLISH',
  WELSH = 'WELSH',
}

export const enum LegalConnections {
  RESPONDENT_DOMICILED = 'I',
  APPLICANT_DOMICILED = 'H',
  COURTS_RESIDUAL_JURISDICTION = 'G',
  APPLICANT_RESPONDENT_DOMICILED = 'F',
  APPLICANT_DOMICILED_RESIDENT = 'E',
  APPLICANT_RESIDENT = 'D',
  RESPONDENT_RESIDENT = 'C',
  APPLICANT_RESPONDENT_ONE_RESIDENT = 'B',
  APPLICANT_RESPONDENT_RESIDENT = 'A',
}

export const enum LegalProceedingsRelated {
  MARRIAGE = 'marriage',
  PROPERTY = 'property',
  CHILDREN = 'children',
}

export const enum RespondentAgreeToCosts {
  YES = 'Yes',
  NO = 'No',
  DIFFERENT_AMOUNT = 'DifferentAmount',
}

export const enum ServiceMethod {
  PERSONAL_SERVICE = 'personalService',
  COURT_SERVICE = 'courtService',
}

export const enum SolicitorPaymentMethod {
  FEE_PAY_BY_ACCOUNT = 'feePayByAccount',
  FEES_HELP_WITH = 'feesHelpWith',
}

export const enum State {
  Draft = 'Draft',
  AwaitingApplicant1Response = 'AwaitingApplicant1Response',
  AwaitingApplicant2Response = 'AwaitingApplicant2Response',
  AwaitingPayment = 'AwaitingPayment',
  AwaitingDocuments = 'AwaitingDocuments',
  AwaitingHWFDecision = 'AwaitingHWFDecision',
  Submitted = 'Submitted',
  Issued = 'Issued',
  AwaitingAos = 'AwaitingAos',
  AosOverdue = 'AosOverdue',
  AosDrafted = 'AosDrafted',
  DefendedDivorce = 'DefendedDivorce',
  Holding = 'Holding',
  AwaitingConditionalOrder = 'AwaitingConditionalOrder',
  ConditionalOrderDrafted = 'ConditionalOrderDrafted',
  AwaitingLegalAdvisorReferral = 'AwaitingLegalAdvisorReferral',
  AwaitingClarification = 'AwaitingClarification',
  ConditionalOrderRefused = 'ConditionalOrderRefused',
  AwaitingPronouncement = 'AwaitingPronouncement',
  ConditionalOrderPronounced = 'ConditionalOrderPronounced',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn',
  PendingRejection = 'PendingRejection',
  AwaitingReissue = 'AwaitingReissue',
  FinalOrderComplete = 'FinalOrderComplete',
}

export const enum UserRole {
  CASEWORKER_COURTADMIN_CTSC = 'caseworker-divorce-courtadmin_beta',
  CASEWORKER_COURTADMIN_RDU = 'caseworker-divorce-courtadmin',
  CASEWORKER_LEGAL_ADVISOR = 'caseworker-divorce-courtadmin-la',
  CASEWORKER_SUPERUSER = 'caseworker-divorce-superuser',
  CASEWORKER_SYSTEMUPDATE = 'caseworker-divorce-systemupdate',
  SOLICITOR = 'caseworker-divorce-solicitor',
  APPLICANT_1_SOLICITOR = '[APPONESOLICITOR]',
  APPLICANT_2_SOLICITOR = '[APPTWOSOLICITOR]',
  ORGANISATION_CASE_ACCESS_ADMINISTRATOR = 'caseworker-caa',
  CITIZEN = 'citizen',
  CREATOR = '[CREATOR]',
  APPLICANT_2 = '[APPLICANTTWO]',
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
  DOCUMENT_TYPE_RESPONDENT_INVITATION = 'aos',
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
export const CASE_TYPE = 'NO_FAULT_DIVORCE18';
export const JURISDICTION = 'DIVORCE';
export const CITIZEN_APPLICANT2_UPDATE = 'citizen-applicant2-update-application';
export const CITIZEN_CREATE = 'citizen-create-application';
export const CITIZEN_INVITE_APPLICANT_2 = 'citizen-invite-applicant2';
export const CITIZEN_SUBMIT = 'citizen-submit-application';
export const CITIZEN_UPDATE = 'citizen-update-application';
export const CITIZEN_SAVE_AND_CLOSE = 'citizen-save-and-close';
export const CITIZEN_ADD_PAYMENT = 'citizen-add-payment';
export const SYSTEM_LINK_APPLICANT_2 = 'system-link-applicant2';
export const SYSTEM_PROGRESS_HELD_CASE = 'system-progress-held-case';
