/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.36.1070 on 2022-08-18 09:16:02.

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

export interface BulkScanEnvelope {
  id: string;
  action: string;
}

export interface CaseLink {
  CaseReference: string;
}

export interface ChangeOrganisationRequest<R> {
  OrganisationToAdd: Organisation;
  OrganisationToRemove: Organisation;
  CaseRoleId: R;
  Reason: string;
  NotesReason: string;
  ApprovalStatus: ChangeOrganisationApprovalStatus;
  RequestTimestamp: DateAsString;
  ApprovalRejectionTimestamp: DateAsString;
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

export interface ExceptionRecord {
  envelopeLabel: string;
  journeyClassification: string;
  poBox: string;
  poBoxJurisdiction: string;
  deliveryDate: DateAsString;
  openingDate: DateAsString;
  scannedDocuments: ListValue<ExceptionRecordScannedDocument>[];
  scanOCRData: ListValue<KeyValue>[];
  attachToCaseReference: string;
  caseReference: string;
  ocrDataValidationWarnings: string[];
  displayWarnings: YesOrNo;
  formType: string;
  envelopeId: string;
  awaitingPaymentDCNProcessing: YesOrNo;
  containsPayments: YesOrNo;
  envelopeCaseReference: string;
  envelopeLegacyCaseReference: string;
  showEnvelopeCaseReference: YesOrNo;
  showEnvelopeLegacyCaseReference: YesOrNo;
  surname: string;
  searchCaseReference: string;
}

export interface ExceptionRecordScannedDocument {
  recordMetaData: string;
  type: ScannedDocumentType;
  subtype: string;
  url: Document;
  controlNumber: string;
  fileName: string;
  scannedDate: DateAsString;
  deliveryDate: DateAsString;
}

export interface Fee {
  FeeAmount: string;
  FeeCode: string;
  FeeDescription: string;
  FeeVersion: string;
}

export interface KeyValue {
  key: string;
  value: string;
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

export interface ScannedDocument {
  type: ScannedDocumentType;
  subtype: string;
  url: Document;
  controlNumber: string;
  fileName: string;
  scannedDate: DateAsString;
  deliveryDate: DateAsString;
  exceptionRecordReference: string;
}

export interface CaseNote {
  author: string;
  date: DateAsString;
  note: string;
}

export interface AcknowledgementOfService {
  confirmReadPetition: YesOrNo;
  confirmDisputeApplication: YesOrNo;
  applicantNotifiedDisputeFormOverdue: YesOrNo;
  jurisdictionAgree: YesOrNo;
  dateAosSubmitted: DateAsString;
  noticeOfProceedingsEmail: string;
  noticeOfProceedingsSolicitorFirm: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdictionTranslated: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdictionTranslatedTo: TranslatedToLanguage;
  inWhichCountryIsYourLifeMainlyBased: string;
  statementOfTruth: YesOrNo;
  howToRespondApplication: HowToRespondApplication;
  solicitorName: string;
  solicitorFirm: string;
  additionalComments: string;
  disputingFeeOrderSummary: OrderSummary;
  disputingFeePaymentMethod: ServicePaymentMethod;
  disputingFeeAccountNumber: string;
  disputingFeePbaNumbers: DynamicList;
  disputingFeeAccountReferenceNumber: string;
  disputingFeeHelpWithFeesReferenceNumber: string;
  aosIsDrafted: YesOrNo;
}

export interface AlternativeService {
  receivedServiceApplicationDate: DateAsString;
  alternativeServiceType: AlternativeServiceType;
  receivedServiceAddedDate: DateAsString;
  serviceApplicationGranted: YesOrNo;
  serviceApplicationRefusalReason: string;
  serviceApplicationDecisionDate: DateAsString;
  deemedServiceDate: DateAsString;
  dateOfPayment: DateAsString;
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: DivorceDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
  servicePaymentFeeOrderSummary: OrderSummary;
  servicePaymentFeePaymentMethod: ServicePaymentMethod;
  servicePaymentFeeAccountNumber: string;
  servicePaymentFeePbaNumbers: DynamicList;
  servicePaymentFeeAccountReferenceNumber: string;
  servicePaymentFeeHelpWithFeesReferenceNumber: string;
}

export interface AlternativeServiceOutcome {
  receivedServiceApplicationDate: DateAsString;
  receivedServiceAddedDate: DateAsString;
  alternativeServiceType: AlternativeServiceType;
  paymentMethod: ServicePaymentMethod;
  serviceApplicationOutcomeLabel: string;
  serviceApplicationGranted: YesOrNo;
  serviceApplicationRefusalReason: string;
  serviceApplicationDecisionDate: DateAsString;
  deemedServiceDate: DateAsString;
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: DivorceDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
}

export interface Applicant {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  AgreedToReceiveEmails: YesOrNo;
  ConfirmReceipt: YesOrNo;
  LanguagePreferenceWelsh: YesOrNo;
  LastNameChangedWhenMarried: YesOrNo;
  NameDifferentToMarriageCertificate: YesOrNo;
  NameChangedHow: ChangedNameHow[];
  NameChangedHowOtherDetails: string;
  Address: AddressGlobalUK;
  PhoneNumber: string;
  Gender: Gender;
  ContactDetailsType: ContactDetailsType;
  SolicitorRepresented: YesOrNo;
  SolicitorName: string;
  SolicitorReference: string;
  SolicitorPhone: string;
  SolicitorEmail: string;
  SolicitorFirmName: string;
  SolicitorAddress: string;
  SolicitorAgreeToReceiveEmailsCheckbox: Prayer[];
  SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  FinancialOrder: YesOrNo;
  UsedWelshTranslationOnSubmission: YesOrNo;
  FinancialOrdersFor: FinancialOrderFor[];
  LegalProceedings: YesOrNo;
  LegalProceedingsDetails: string;
  LegalProceedingsDetailsTranslated: string;
  LegalProceedingsDetailsTranslatedTo: TranslatedToLanguage;
  PcqId: string;
  ContinueApplication: YesOrNo;
  PrayerDissolveDivorce: DissolveDivorce[];
  PrayerEndCivilPartnership: EndCivilPartnership[];
  PrayerFinancialOrdersThemselves: FinancialOrdersThemselves[];
  PrayerFinancialOrdersChild: FinancialOrdersChild[];
  Offline: YesOrNo;
}

export interface ApplicantPrayer {
  PrayerDissolveDivorce: DissolveDivorce[];
  PrayerEndCivilPartnership: EndCivilPartnership[];
  PrayerFinancialOrdersThemselves: FinancialOrdersThemselves[];
  PrayerFinancialOrdersChild: FinancialOrdersChild[];
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
  marriageFormationType: MarriageFormation;
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
  solServiceDateOfService: DateAsString;
  solServiceDocumentsServed: string;
  solServiceOnWhomServed: string;
  solServiceHowServed: DocumentsServedHow;
  solServiceServiceDetails: string;
  solServiceAddressServed: string;
  solServiceBeingThe: DocumentsServedBeingThe;
  solServiceLocationServed: DocumentsServedWhere;
  solServiceSpecifyLocationServed: string;
  solServiceServiceSotName: string;
  solServiceServiceSotFirm: string;
  solServiceStatementOfTruth: YesOrNo;
  solServiceTruthStatement: string;
  applicant1HWFReferenceNumber: string;
  applicant1HWFNeedHelp: YesOrNo;
  applicant1HWFAppliedForFees: YesOrNo;
  applicant2HWFReferenceNumber: string;
  applicant2HWFNeedHelp: YesOrNo;
  applicant2HWFAppliedForFees: YesOrNo;
  divorceWho: WhoDivorcing;
  solUrgentCase: YesOrNo;
  solUrgentCaseSupportingInformation: string;
  applicant1WantsToHavePapersServedAnotherWay: YesOrNo;
  serviceMethod: ServiceMethod;
  solStatementOfReconciliationCertify: YesOrNo;
  solStatementOfReconciliationDiscussed: YesOrNo;
  applicant1StatementOfTruth: YesOrNo;
  applicant2StatementOfTruth: YesOrNo;
  solSignStatementOfTruth: YesOrNo;
  applicant2SolSignStatementOfTruth: YesOrNo;
  solStatementOfReconciliationName: string;
  applicant2SolStatementOfReconciliationName: string;
  solStatementOfReconciliationFirm: string;
  applicant2SolStatementOfReconciliationFirm: string;
  statementOfReconciliationComments: string;
  applicant2StatementOfReconciliationComments: string;
  solApplicationFeeInPounds: string;
  solPaymentHowToPay: SolicitorPaymentMethod;
  pbaNumbers: DynamicList;
  feeAccountReference: string;
  applicationFeeOrderSummary: OrderSummary;
  applicant2AgreeToReceiveEmails: YesOrNo;
  applicant1KnowsApplicant2EmailAddress: YesOrNo;
  applicant1KnowsApplicant2Address: YesOrNo;
  app2ContactMethodIsDigital: YesOrNo;
  applicant1CannotUpload: YesOrNo;
  applicant1CannotUploadSupportingDocument: DocumentType[];
  applicant2CannotUpload: YesOrNo;
  applicant2CannotUploadSupportingDocument: DocumentType[];
  documentUploadComplete: YesOrNo;
  miniApplicationLink: Document;
  dateSubmitted: DateAsString;
  applicant2ConfirmApplicant1Information: YesOrNo;
  applicant2ExplainsApplicant1IncorrectInformation: string;
  issueDate: DateAsString;
  reissueDate: DateAsString;
  createdDate: DateAsString;
  rejectReason: RejectReason;
  currentState: State;
  previousState: State;
  welshPreviousState: State;
  stateToTransitionApplicationTo: State;
  applicationPayments: ListValue<Payment>[];
  overdueNotificationSent: YesOrNo;
  applicant1ReminderSent: YesOrNo;
  applicant2ReminderSent: YesOrNo;
  respondentSolicitorReminderSent: YesOrNo;
  applicantsRemindedCanApplyForConditionalOrder: YesOrNo;
  jointApplicantNotifiedCanSwitchToSole: YesOrNo;
  reissueOption: ReissueOption;
  previousReissueOption: ReissueOption;
  applicant2NeedsHelpWithFees: YesOrNo;
  applicant1IsApplicant2Represented: Applicant2Represented;
  applicant1SolicitorAnswersLink: Document;
  applicant2SolicitorAnswersLink: Document;
  progressPaperCase: ProgressPaperCase;
  paperCasePaymentMethod: PaperCasePaymentMethod;
  newPaperCase: YesOrNo;
}

export interface Bailiff {
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: DivorceDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
}

export interface BulkScanMetaInfo {
  warnings: ListValue<string>[];
  bulkScanEnvelopes: ListValue<BulkScanEnvelope>[];
  bulkScanCaseReference: string;
  evidenceHandled: YesOrNo;
}

export interface CaseData {
  applicationType: ApplicationType;
  divorceOrDissolution: DivorceOrDissolution;
  labelContentApplicant2: string;
  labelContentTheApplicant2: string;
  labelContentTheApplicant2UC: string;
  labelContentApplicant2UC: string;
  labelContentUnionType: string;
  labelContentUnionTypeUC: string;
  labelContentDivorceOrCivilPartnershipApplication: string;
  labelContentDivorceOrEndCivilPartnership: string;
  labelContentApplicantOrApplicant1: string;
  labelContentDivorceOrCivilPartnership: string;
  labelContentFinaliseDivorceOrEndCivilPartnership: string;
  labelContentMarriageOrCivilPartnership: string;
  labelContentMarriageOrCivilPartnershipUC: string;
  labelContentDivorceOrLegallyEnd: string;
  labelContentApplicantsOrApplicant1s: string;
  labelContentTheApplicantOrApplicant1: string;
  labelContentTheApplicantOrApplicant1UC: string;
  labelContentApplicantOrApplicant1UC: string;
  labelContentGotMarriedOrFormedCivilPartnership: string;
  labelContentRespondentsOrApplicant2s: string;
  labelContentDivorceOrEndingCivilPartnership: string;
  labelContentApplicationType: ApplicationType;
  applicant1FirstName: string;
  applicant1MiddleName: string;
  applicant1LastName: string;
  applicant1Email: string;
  applicant1AgreedToReceiveEmails: YesOrNo;
  applicant1ConfirmReceipt: YesOrNo;
  applicant1LanguagePreferenceWelsh: YesOrNo;
  applicant1LastNameChangedWhenMarried: YesOrNo;
  applicant1NameDifferentToMarriageCertificate: YesOrNo;
  applicant1NameChangedHow: ChangedNameHow[];
  applicant1NameChangedHowOtherDetails: string;
  applicant1Address: AddressGlobalUK;
  applicant1PhoneNumber: string;
  applicant1Gender: Gender;
  applicant1ContactDetailsType: ContactDetailsType;
  applicant1SolicitorRepresented: YesOrNo;
  applicant1SolicitorName: string;
  applicant1SolicitorReference: string;
  applicant1SolicitorPhone: string;
  applicant1SolicitorEmail: string;
  applicant1SolicitorFirmName: string;
  applicant1SolicitorAddress: string;
  applicant1SolicitorAgreeToReceiveEmailsCheckbox: Prayer[];
  applicant1SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  applicant1FinancialOrder: YesOrNo;
  applicant1UsedWelshTranslationOnSubmission: YesOrNo;
  applicant1FinancialOrdersFor: FinancialOrderFor[];
  applicant1LegalProceedings: YesOrNo;
  applicant1LegalProceedingsDetails: string;
  applicant1LegalProceedingsDetailsTranslated: string;
  applicant1LegalProceedingsDetailsTranslatedTo: TranslatedToLanguage;
  applicant1PcqId: string;
  applicant1ContinueApplication: YesOrNo;
  applicant1PrayerDissolveDivorce: DissolveDivorce[];
  applicant1PrayerEndCivilPartnership: EndCivilPartnership[];
  applicant1PrayerFinancialOrdersThemselves: FinancialOrdersThemselves[];
  applicant1PrayerFinancialOrdersChild: FinancialOrdersChild[];
  applicant1Offline: YesOrNo;
  applicant2FirstName: string;
  applicant2MiddleName: string;
  applicant2LastName: string;
  applicant2Email: string;
  applicant2AgreedToReceiveEmails: YesOrNo;
  applicant2ConfirmReceipt: YesOrNo;
  applicant2LanguagePreferenceWelsh: YesOrNo;
  applicant2LastNameChangedWhenMarried: YesOrNo;
  applicant2NameDifferentToMarriageCertificate: YesOrNo;
  applicant2NameChangedHow: ChangedNameHow[];
  applicant2NameChangedHowOtherDetails: string;
  applicant2Address: AddressGlobalUK;
  applicant2PhoneNumber: string;
  applicant2Gender: Gender;
  applicant2ContactDetailsType: ContactDetailsType;
  applicant2SolicitorRepresented: YesOrNo;
  applicant2SolicitorName: string;
  applicant2SolicitorReference: string;
  applicant2SolicitorPhone: string;
  applicant2SolicitorEmail: string;
  applicant2SolicitorFirmName: string;
  applicant2SolicitorAddress: string;
  applicant2SolicitorAgreeToReceiveEmailsCheckbox: Prayer[];
  applicant2SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  applicant2FinancialOrder: YesOrNo;
  applicant2UsedWelshTranslationOnSubmission: YesOrNo;
  applicant2FinancialOrdersFor: FinancialOrderFor[];
  applicant2LegalProceedings: YesOrNo;
  applicant2LegalProceedingsDetails: string;
  applicant2LegalProceedingsDetailsTranslated: string;
  applicant2LegalProceedingsDetailsTranslatedTo: TranslatedToLanguage;
  applicant2PcqId: string;
  applicant2ContinueApplication: YesOrNo;
  applicant2PrayerDissolveDivorce: DissolveDivorce[];
  applicant2PrayerEndCivilPartnership: EndCivilPartnership[];
  applicant2PrayerFinancialOrdersThemselves: FinancialOrdersThemselves[];
  applicant2PrayerFinancialOrdersChild: FinancialOrdersChild[];
  applicant2Offline: YesOrNo;
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
  marriageFormationType: MarriageFormation;
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
  solServiceDateOfService: DateAsString;
  solServiceDocumentsServed: string;
  solServiceOnWhomServed: string;
  solServiceHowServed: DocumentsServedHow;
  solServiceServiceDetails: string;
  solServiceAddressServed: string;
  solServiceBeingThe: DocumentsServedBeingThe;
  solServiceLocationServed: DocumentsServedWhere;
  solServiceSpecifyLocationServed: string;
  solServiceServiceSotName: string;
  solServiceServiceSotFirm: string;
  solServiceStatementOfTruth: YesOrNo;
  solServiceTruthStatement: string;
  applicant1HWFReferenceNumber: string;
  applicant1HWFNeedHelp: YesOrNo;
  applicant1HWFAppliedForFees: YesOrNo;
  applicant2HWFReferenceNumber: string;
  applicant2HWFNeedHelp: YesOrNo;
  applicant2HWFAppliedForFees: YesOrNo;
  divorceWho: WhoDivorcing;
  solUrgentCase: YesOrNo;
  solUrgentCaseSupportingInformation: string;
  applicant1WantsToHavePapersServedAnotherWay: YesOrNo;
  serviceMethod: ServiceMethod;
  solStatementOfReconciliationCertify: YesOrNo;
  solStatementOfReconciliationDiscussed: YesOrNo;
  applicant1StatementOfTruth: YesOrNo;
  applicant2StatementOfTruth: YesOrNo;
  solSignStatementOfTruth: YesOrNo;
  applicant2SolSignStatementOfTruth: YesOrNo;
  solStatementOfReconciliationName: string;
  applicant2SolStatementOfReconciliationName: string;
  solStatementOfReconciliationFirm: string;
  applicant2SolStatementOfReconciliationFirm: string;
  statementOfReconciliationComments: string;
  applicant2StatementOfReconciliationComments: string;
  solApplicationFeeInPounds: string;
  solPaymentHowToPay: SolicitorPaymentMethod;
  pbaNumbers: DynamicList;
  feeAccountReference: string;
  applicationFeeOrderSummary: OrderSummary;
  applicant2AgreeToReceiveEmails: YesOrNo;
  applicant1KnowsApplicant2EmailAddress: YesOrNo;
  applicant1KnowsApplicant2Address: YesOrNo;
  app2ContactMethodIsDigital: YesOrNo;
  applicant1CannotUpload: YesOrNo;
  applicant1CannotUploadSupportingDocument: DocumentType[];
  applicant2CannotUpload: YesOrNo;
  applicant2CannotUploadSupportingDocument: DocumentType[];
  documentUploadComplete: YesOrNo;
  miniApplicationLink: Document;
  dateSubmitted: DateAsString;
  applicant2ConfirmApplicant1Information: YesOrNo;
  applicant2ExplainsApplicant1IncorrectInformation: string;
  issueDate: DateAsString;
  reissueDate: DateAsString;
  createdDate: DateAsString;
  rejectReason: RejectReason;
  currentState: State;
  previousState: State;
  welshPreviousState: State;
  stateToTransitionApplicationTo: State;
  applicationPayments: ListValue<Payment>[];
  overdueNotificationSent: YesOrNo;
  applicant1ReminderSent: YesOrNo;
  applicant2ReminderSent: YesOrNo;
  respondentSolicitorReminderSent: YesOrNo;
  applicantsRemindedCanApplyForConditionalOrder: YesOrNo;
  jointApplicantNotifiedCanSwitchToSole: YesOrNo;
  reissueOption: ReissueOption;
  previousReissueOption: ReissueOption;
  applicant2NeedsHelpWithFees: YesOrNo;
  applicant1IsApplicant2Represented: Applicant2Represented;
  applicant1SolicitorAnswersLink: Document;
  applicant2SolicitorAnswersLink: Document;
  progressPaperCase: ProgressPaperCase;
  paperCasePaymentMethod: PaperCasePaymentMethod;
  newPaperCase: YesOrNo;
  applicant2InviteEmailAddress: string;
  accessCode: string;
  applicant2UserId: string;
  confirmReadPetition: YesOrNo;
  confirmDisputeApplication: YesOrNo;
  applicantNotifiedDisputeFormOverdue: YesOrNo;
  jurisdictionAgree: YesOrNo;
  dateAosSubmitted: DateAsString;
  noticeOfProceedingsEmail: string;
  noticeOfProceedingsSolicitorFirm: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdictionTranslated: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdictionTranslatedTo: TranslatedToLanguage;
  inWhichCountryIsYourLifeMainlyBased: string;
  statementOfTruth: YesOrNo;
  howToRespondApplication: HowToRespondApplication;
  solicitorName: string;
  solicitorFirm: string;
  additionalComments: string;
  disputingFeeOrderSummary: OrderSummary;
  disputingFeePaymentMethod: ServicePaymentMethod;
  disputingFeeAccountNumber: string;
  disputingFeePbaNumbers: DynamicList;
  disputingFeeAccountReferenceNumber: string;
  disputingFeeHelpWithFeesReferenceNumber: string;
  aosIsDrafted: YesOrNo;
  coApplicant1SolicitorName: string;
  coApplicant1SolicitorFirm: string;
  coApplicant1SolicitorAdditionalComments: string;
  coApplicant1IsSubmitted: YesOrNo;
  coApplicant1IsDrafted: YesOrNo;
  coApplicant1SubmittedDate: DateAsString;
  coApplicant1ApplyForConditionalOrder: YesOrNo;
  coApplicant1ApplyForConditionalOrderIfNo: YesOrNo;
  coApplicant1ConfirmInformationStillCorrect: YesOrNo;
  coApplicant1ReasonInformationNotCorrect: string;
  coApplicant1ReasonInformationNotCorrectTranslated: string;
  coApplicant1ReasonInformationNotCorrectTranslatedTo: TranslatedToLanguage;
  coApplicant1ApplyForConditionalOrderStarted: YesOrNo;
  coApplicant1ChangeOrAddToApplication: YesOrNo;
  coApplicant1IsEverythingInApplicationTrue: YesOrNo;
  coApplicant1StatementOfTruth: YesOrNo;
  coApplicant2SolicitorName: string;
  coApplicant2SolicitorFirm: string;
  coApplicant2SolicitorAdditionalComments: string;
  coApplicant2IsSubmitted: YesOrNo;
  coApplicant2IsDrafted: YesOrNo;
  coApplicant2SubmittedDate: DateAsString;
  coApplicant2ApplyForConditionalOrder: YesOrNo;
  coApplicant2ApplyForConditionalOrderIfNo: YesOrNo;
  coApplicant2ConfirmInformationStillCorrect: YesOrNo;
  coApplicant2ReasonInformationNotCorrect: string;
  coApplicant2ReasonInformationNotCorrectTranslated: string;
  coApplicant2ReasonInformationNotCorrectTranslatedTo: TranslatedToLanguage;
  coApplicant2ApplyForConditionalOrderStarted: YesOrNo;
  coApplicant2ChangeOrAddToApplication: YesOrNo;
  coApplicant2IsEverythingInApplicationTrue: YesOrNo;
  coApplicant2StatementOfTruth: YesOrNo;
  coRespondentAnswersLink: Document;
  coOnlinePetitionLink: Document;
  coScannedD84Form: Document;
  coDateD84FormScanned: DateAsString;
  coLastAlternativeServiceDocumentLink: Document;
  coGranted: YesOrNo;
  coClaimsGranted: YesOrNo;
  coClaimsCostsOrderInformation: string;
  coDecisionDate: DateAsString;
  coGrantedDate: DateAsString;
  coRefusalDecision: RefusalOption;
  coRefusalAdminErrorInfo: string;
  coRefusalRejectionAdditionalInfo: string;
  coRefusalClarificationReason: ClarificationReason[];
  coRefusalClarificationAdditionalInfo: string;
  coRefusalClarificationAdditionalInfoTranslated: string;
  coRefusalClarificationAdditionalInfoTranslatedTo: TranslatedToLanguage;
  coClarificationResponses: ListValue<string>[];
  coClarificationUploadDocuments: ListValue<DivorceDocument>[];
  coCannotUploadClarificationDocuments: YesOrNo;
  coOutcomeCase: YesOrNo;
  coCourt: ConditionalOrderCourt;
  coDateAndTimeOfHearing: DateAsString;
  coPronouncementJudge: string;
  coJudgeCostsClaimGranted: JudgeCostsClaimGranted;
  coJudgeCostsOrderAdditionalInfo: string;
  coCertificateOfEntitlementDocument: DivorceDocument;
  coOfflineCertificateOfEntitlementDocumentSentToApplicant1: YesOrNo;
  coOfflineCertificateOfEntitlementDocumentSentToApplicant2: YesOrNo;
  coRefusalOrderDocument: Document;
  coConditionalOrderGrantedDocument: DivorceDocument;
  coLegalAdvisorDecisions: ListValue<LegalAdvisorDecision>[];
  coClarificationResponsesSubmitted: ListValue<ClarificationResponse>[];
  coRescindedDate: DateAsString;
  coServiceConfirmed: YesOrNo;
  coProofOfServiceUploadDocuments: ListValue<DivorceDocument>[];
  coLastApprovedServiceApplicationIsBailiffApplication: YesOrNo;
  coCertificateOfServiceDate: DateAsString;
  coSuccessfulServedByBailiff: YesOrNo;
  dateFinalOrderSubmitted: DateAsString;
  dateFinalOrderEligibleFrom: DateAsString;
  granted: Granted[];
  grantedDate: DateAsString;
  doesApplicant1WantToApplyForFinalOrder: YesOrNo;
  applicant1AppliedForFinalOrderFirst: YesOrNo;
  doesApplicant2WantToApplyForFinalOrder: YesOrNo;
  applicant2AppliedForFinalOrderFirst: YesOrNo;
  applicant2FinalOrderExplanation: string;
  dateFinalOrderEligibleToRespondent: DateAsString;
  applicant1FinalOrderLateExplanation: string;
  applicant1FinalOrderLateExplanationTranslated: string;
  applicant1FinalOrderLateExplanationTranslatedTo: TranslatedToLanguage;
  applicant1FinalOrderStatementOfTruth: YesOrNo;
  dateFinalOrderNoLongerEligible: DateAsString;
  finalOrderReminderSentApplicant1: YesOrNo;
  finalOrderReminderSentApplicant2: YesOrNo;
  generalOrderDate: DateAsString;
  generalOrderDivorceParties: GeneralOrderDivorceParties[];
  generalOrderRecitals: string;
  generalOrderJudgeOrLegalAdvisorType: GeneralOrderJudgeOrLegalAdvisorType;
  generalOrderJudgeOrLegalAdvisorName: string;
  generalOrderDetails: string;
  generalOrderDraft: Document;
  generalEmailParties: GeneralParties;
  generalEmailOtherRecipientEmail: string;
  generalEmailOtherRecipientName: string;
  generalEmailDetails: string;
  generalLetterParties: GeneralParties;
  otherRecipientName: string;
  otherRecipientAddress: AddressGlobalUK;
  generalLetterAttachments: ListValue<DivorceDocument>[];
  generalLetterDetails: string;
  generalReferralReason: GeneralReferralReason;
  generalApplicationFrom: GeneralParties;
  generalApplicationReferralDate: DateAsString;
  generalApplicationAddedDate: DateAsString;
  generalReferralType: GeneralReferralType;
  alternativeServiceMedium: AlternativeServiceMediumType;
  generalReferralJudgeOrLegalAdvisorDetails: string;
  generalReferralFeeRequired: YesOrNo;
  generalReferralFeeOrderSummary: OrderSummary;
  generalReferralFeePaymentMethod: ServicePaymentMethod;
  generalReferralFeeAccountNumber: string;
  generalReferralFeePbaNumbers: DynamicList;
  generalReferralFeeAccountReferenceNumber: string;
  generalReferralFeeHelpWithFeesReferenceNumber: string;
  generalReferralDecision: GeneralReferralDecision;
  generalReferralDecisionDate: DateAsString;
  generalReferralDecisionReason: string;
  generalReferralUrgentCase: YesOrNo;
  generalReferralUrgentCaseReason: string;
  generalApplicationType: GeneralApplicationType;
  generalApplicationTypeOtherComments: string;
  generalApplicationFeeType: GeneralApplicationFee;
  generalApplicationDocument: DivorceDocument;
  generalApplicationDocumentComments: string;
  generalApplicationFeeOrderSummary: OrderSummary;
  generalApplicationFeePaymentMethod: ServicePaymentMethod;
  generalApplicationFeeAccountNumber: string;
  generalApplicationFeePbaNumbers: DynamicList;
  generalApplicationFeeAccountReferenceNumber: string;
  generalApplicationFeeHelpWithFeesReferenceNumber: string;
  generalReferrals: ListValue<GeneralReferral>[];
  alternativeServiceOutcomes: ListValue<AlternativeServiceOutcome>[];
  receivedServiceApplicationDate: DateAsString;
  alternativeServiceType: AlternativeServiceType;
  receivedServiceAddedDate: DateAsString;
  serviceApplicationGranted: YesOrNo;
  serviceApplicationRefusalReason: string;
  serviceApplicationDecisionDate: DateAsString;
  deemedServiceDate: DateAsString;
  dateOfPayment: DateAsString;
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: DivorceDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
  servicePaymentFeeOrderSummary: OrderSummary;
  servicePaymentFeePaymentMethod: ServicePaymentMethod;
  servicePaymentFeeAccountNumber: string;
  servicePaymentFeePbaNumbers: DynamicList;
  servicePaymentFeeAccountReferenceNumber: string;
  servicePaymentFeeHelpWithFeesReferenceNumber: string;
  applicant1DocumentsUploaded: ListValue<DivorceDocument>[];
  applicant2DocumentsUploaded: ListValue<DivorceDocument>[];
  documentsUploaded: ListValue<DivorceDocument>[];
  confidentialDocumentsUploaded: ListValue<ConfidentialDivorceDocument>[];
  confidentialDocumentsGenerated: ListValue<ConfidentialDivorceDocument>[];
  documentsGenerated: ListValue<DivorceDocument>[];
  scannedDocuments: ListValue<ScannedDocument>[];
  answerReceivedSupportingDocuments: ListValue<DivorceDocument>[];
  scannedDocumentNames: DynamicList;
  amendedApplications: ListValue<DivorceDocument>[];
  documentsUploadedOnConfirmService: ListValue<DivorceDocument>[];
  typeOfDocumentAttached: OfflineDocumentReceived;
  divorceUnit: Court;
  generalOrders: ListValue<DivorceGeneralOrder>[];
  dueDate: DateAsString;
  notes: ListValue<CaseNote>[];
  note: string;
  bulkListCaseReferenceLink: CaseLink;
  dataVersion: number;
  exampleRetiredField: string;
  previousCaseId: CaseLink;
  paperFormServiceOutsideUK: string;
  applicant1PrayerHasBeenGivenCheckbox: ThePrayer[];
  applicant2PrayerHasBeenGivenCheckbox: ThePrayer[];
  solServiceMethod: ServiceMethod;
  d11Document: DivorceDocument;
  bulkListCaseReference: string;
  coRefusalRejectionReason: RejectionReason[];
  hyphenatedCaseRef: string;
  nocWhichApplicant: WhichApplicant;
  nocAreTheyRepresented: YesOrNo;
  nocAreTheyDigital: YesOrNo;
  paperFormServeOutOfUK: YesOrNo;
  paperFormRespondentServePostOnly: YesOrNo;
  paperFormApplicantWillServeApplication: YesOrNo;
  paperFormRespondentDifferentServiceAddress: YesOrNo;
  paperFormSummaryApplicant1FinancialOrdersFor: FinancialOrderFor[];
  paperFormSummaryApplicant2FinancialOrdersFor: FinancialOrderFor[];
  paperFormApplicant1SigningSOT: YesOrNo;
  paperFormApplicant1LegalRepSigningSOT: YesOrNo;
  paperFormApplicant2SigningSOT: YesOrNo;
  paperFormApplicant2LegalRepSigningSOT: YesOrNo;
  paperFormApplicant1LegalRepPosition: string;
  paperFormApplicant2LegalRepPosition: string;
  paperFormApplicant1SOTSignedOn: string;
  paperFormApplicant2SOTSignedOn: string;
  paperFormFeeInPounds: string;
  paperFormApplicant1NoPaymentIncluded: YesOrNo;
  paperFormApplicant2NoPaymentIncluded: YesOrNo;
  paperFormSoleOrApplicant1PaymentOther: YesOrNo;
  paperFormApplicant2PaymentOther: YesOrNo;
  paperFormSoleOrApplicant1PaymentOtherDetail: string;
  paperFormApplicant2PaymentOtherDetail: string;
  paperFormDebitCreditCardPayment: YesOrNo;
  paperFormDebitCreditCardPaymentPhone: YesOrNo;
  paperFormHowToPayEmail: YesOrNo;
  paperFormPaymentDetailEmail: string;
  paperFormChequeOrPostalOrderPayment: YesOrNo;
  isJudicialSeparation: YesOrNo;
  generalEmails: ListValue<GeneralEmailDetails>[];
  paymentHistoryField: string;
  warnings: ListValue<string>[];
  bulkScanEnvelopes: ListValue<BulkScanEnvelope>[];
  bulkScanCaseReference: string;
  evidenceHandled: YesOrNo;
  generalLetters: ListValue<GeneralLetterDetails>[];
  switchedToSoleCo: YesOrNo;
  coIsAdminClarificationSubmitted: YesOrNo;
}

export interface CaseDocuments {
  applicant1DocumentsUploaded: ListValue<DivorceDocument>[];
  applicant2DocumentsUploaded: ListValue<DivorceDocument>[];
  documentsUploaded: ListValue<DivorceDocument>[];
  confidentialDocumentsUploaded: ListValue<ConfidentialDivorceDocument>[];
  confidentialDocumentsGenerated: ListValue<ConfidentialDivorceDocument>[];
  documentsGenerated: ListValue<DivorceDocument>[];
  scannedDocuments: ListValue<ScannedDocument>[];
  answerReceivedSupportingDocuments: ListValue<DivorceDocument>[];
  scannedDocumentNames: DynamicList;
  amendedApplications: ListValue<DivorceDocument>[];
  documentsUploadedOnConfirmService: ListValue<DivorceDocument>[];
  typeOfDocumentAttached: OfflineDocumentReceived;
}

export interface CaseInvite {
  applicant2InviteEmailAddress: string;
  accessCode: string;
  applicant2UserId: string;
}

export interface ClarificationResponse {
  clarificationDate: DateAsString;
  clarificationResponses: ListValue<string>[];
  clarificationUploadDocuments: ListValue<DivorceDocument>[];
  cannotUploadClarificationDocuments: YesOrNo;
}

export interface ConditionalOrder {
  Applicant1SolicitorName: string;
  Applicant1SolicitorFirm: string;
  Applicant1SolicitorAdditionalComments: string;
  Applicant1IsSubmitted: YesOrNo;
  Applicant1IsDrafted: YesOrNo;
  Applicant1SubmittedDate: DateAsString;
  Applicant1ApplyForConditionalOrder: YesOrNo;
  Applicant1ApplyForConditionalOrderIfNo: YesOrNo;
  Applicant1ConfirmInformationStillCorrect: YesOrNo;
  Applicant1ReasonInformationNotCorrect: string;
  Applicant1ReasonInformationNotCorrectTranslated: string;
  Applicant1ReasonInformationNotCorrectTranslatedTo: TranslatedToLanguage;
  Applicant1ApplyForConditionalOrderStarted: YesOrNo;
  Applicant1ChangeOrAddToApplication: YesOrNo;
  Applicant1IsEverythingInApplicationTrue: YesOrNo;
  Applicant1StatementOfTruth: YesOrNo;
  Applicant2SolicitorName: string;
  Applicant2SolicitorFirm: string;
  Applicant2SolicitorAdditionalComments: string;
  Applicant2IsSubmitted: YesOrNo;
  Applicant2IsDrafted: YesOrNo;
  Applicant2SubmittedDate: DateAsString;
  Applicant2ApplyForConditionalOrder: YesOrNo;
  Applicant2ApplyForConditionalOrderIfNo: YesOrNo;
  Applicant2ConfirmInformationStillCorrect: YesOrNo;
  Applicant2ReasonInformationNotCorrect: string;
  Applicant2ReasonInformationNotCorrectTranslated: string;
  Applicant2ReasonInformationNotCorrectTranslatedTo: TranslatedToLanguage;
  Applicant2ApplyForConditionalOrderStarted: YesOrNo;
  Applicant2ChangeOrAddToApplication: YesOrNo;
  Applicant2IsEverythingInApplicationTrue: YesOrNo;
  Applicant2StatementOfTruth: YesOrNo;
  RespondentAnswersLink: Document;
  OnlinePetitionLink: Document;
  ScannedD84Form: Document;
  DateD84FormScanned: DateAsString;
  LastAlternativeServiceDocumentLink: Document;
  Granted: YesOrNo;
  ClaimsGranted: YesOrNo;
  ClaimsCostsOrderInformation: string;
  DecisionDate: DateAsString;
  GrantedDate: DateAsString;
  RefusalDecision: RefusalOption;
  RefusalAdminErrorInfo: string;
  RefusalRejectionAdditionalInfo: string;
  RefusalClarificationReason: ClarificationReason[];
  RefusalClarificationAdditionalInfo: string;
  RefusalClarificationAdditionalInfoTranslated: string;
  RefusalClarificationAdditionalInfoTranslatedTo: TranslatedToLanguage;
  ClarificationResponses: ListValue<string>[];
  ClarificationUploadDocuments: ListValue<DivorceDocument>[];
  CannotUploadClarificationDocuments: YesOrNo;
  OutcomeCase: YesOrNo;
  Court: ConditionalOrderCourt;
  DateAndTimeOfHearing: DateAsString;
  PronouncementJudge: string;
  JudgeCostsClaimGranted: JudgeCostsClaimGranted;
  JudgeCostsOrderAdditionalInfo: string;
  CertificateOfEntitlementDocument: DivorceDocument;
  OfflineCertificateOfEntitlementDocumentSentToApplicant1: YesOrNo;
  OfflineCertificateOfEntitlementDocumentSentToApplicant2: YesOrNo;
  RefusalOrderDocument: Document;
  ConditionalOrderGrantedDocument: DivorceDocument;
  LegalAdvisorDecisions: ListValue<LegalAdvisorDecision>[];
  ClarificationResponsesSubmitted: ListValue<ClarificationResponse>[];
  RescindedDate: DateAsString;
  ServiceConfirmed: YesOrNo;
  ProofOfServiceUploadDocuments: ListValue<DivorceDocument>[];
  LastApprovedServiceApplicationIsBailiffApplication: YesOrNo;
  CertificateOfServiceDate: DateAsString;
  SuccessfulServedByBailiff: YesOrNo;
  IsAdminClarificationSubmitted: YesOrNo;
}

export interface ConditionalOrderQuestions {
  SolicitorName: string;
  SolicitorFirm: string;
  SolicitorAdditionalComments: string;
  IsSubmitted: YesOrNo;
  IsDrafted: YesOrNo;
  SubmittedDate: DateAsString;
  ApplyForConditionalOrder: YesOrNo;
  ApplyForConditionalOrderIfNo: YesOrNo;
  ConfirmInformationStillCorrect: YesOrNo;
  ReasonInformationNotCorrect: string;
  ReasonInformationNotCorrectTranslated: string;
  ReasonInformationNotCorrectTranslatedTo: TranslatedToLanguage;
  ApplyForConditionalOrderStarted: YesOrNo;
  ChangeOrAddToApplication: YesOrNo;
  IsEverythingInApplicationTrue: YesOrNo;
  StatementOfTruth: YesOrNo;
}

export interface CtscContactDetails {
  serviceCentre: string;
  centreName: string;
  poBox: string;
  town: string;
  postcode: string;
  emailAddress: string;
  phoneNumber: string;
}

export interface DivorceGeneralOrder {
  generalOrderDocument: DivorceDocument;
  generalOrderDivorceParties: GeneralOrderDivorceParties[];
}

export interface FeeDetails {
  OrderSummary: OrderSummary;
  PaymentMethod: ServicePaymentMethod;
  AccountNumber: string;
  PbaNumbers: DynamicList;
  AccountReferenceNumber: string;
  HelpWithFeesReferenceNumber: string;
}

export interface FinalOrder {
  dateFinalOrderSubmitted: DateAsString;
  dateFinalOrderEligibleFrom: DateAsString;
  granted: Granted[];
  grantedDate: DateAsString;
  doesApplicant1WantToApplyForFinalOrder: YesOrNo;
  applicant1AppliedForFinalOrderFirst: YesOrNo;
  doesApplicant2WantToApplyForFinalOrder: YesOrNo;
  applicant2AppliedForFinalOrderFirst: YesOrNo;
  applicant2FinalOrderExplanation: string;
  dateFinalOrderEligibleToRespondent: DateAsString;
  applicant1FinalOrderLateExplanation: string;
  applicant1FinalOrderLateExplanationTranslated: string;
  applicant1FinalOrderLateExplanationTranslatedTo: TranslatedToLanguage;
  applicant1FinalOrderStatementOfTruth: YesOrNo;
  dateFinalOrderNoLongerEligible: DateAsString;
  finalOrderReminderSentApplicant1: YesOrNo;
  finalOrderReminderSentApplicant2: YesOrNo;
}

export interface GeneralApplication {
  generalApplicationType: GeneralApplicationType;
  generalApplicationTypeOtherComments: string;
  generalApplicationFeeType: GeneralApplicationFee;
  generalApplicationDocument: DivorceDocument;
  generalApplicationDocumentComments: string;
  generalApplicationFeeOrderSummary: OrderSummary;
  generalApplicationFeePaymentMethod: ServicePaymentMethod;
  generalApplicationFeeAccountNumber: string;
  generalApplicationFeePbaNumbers: DynamicList;
  generalApplicationFeeAccountReferenceNumber: string;
  generalApplicationFeeHelpWithFeesReferenceNumber: string;
}

export interface GeneralEmail {
  generalEmailParties: GeneralParties;
  generalEmailOtherRecipientEmail: string;
  generalEmailOtherRecipientName: string;
  generalEmailDetails: string;
}

export interface GeneralEmailDetails {
  generalEmailDateTime: DateAsString;
  generalEmailParties: GeneralParties;
  generalEmailCreatedBy: string;
  generalEmailBody: string;
}

export interface GeneralLetter {
  generalLetterParties: GeneralParties;
  otherRecipientName: string;
  otherRecipientAddress: AddressGlobalUK;
  generalLetterAttachments: ListValue<DivorceDocument>[];
  generalLetterDetails: string;
}

export interface GeneralLetterDetails {
  generalLetterDateTime: DateAsString;
  generalLetterParties: GeneralParties;
  generalLetterCreatedBy: string;
  generalLetterLink: Document;
  generalLetterAttachmentLinks: ListValue<Document>[];
}

export interface GeneralOrder {
  generalOrderDate: DateAsString;
  generalOrderDivorceParties: GeneralOrderDivorceParties[];
  generalOrderRecitals: string;
  generalOrderJudgeOrLegalAdvisorType: GeneralOrderJudgeOrLegalAdvisorType;
  generalOrderJudgeOrLegalAdvisorName: string;
  generalOrderDetails: string;
  generalOrderDraft: Document;
}

export interface GeneralReferral {
  generalReferralReason: GeneralReferralReason;
  generalApplicationFrom: GeneralParties;
  generalApplicationReferralDate: DateAsString;
  generalApplicationAddedDate: DateAsString;
  generalReferralType: GeneralReferralType;
  alternativeServiceMedium: AlternativeServiceMediumType;
  generalReferralJudgeOrLegalAdvisorDetails: string;
  generalReferralFeeRequired: YesOrNo;
  generalReferralFeeOrderSummary: OrderSummary;
  generalReferralFeePaymentMethod: ServicePaymentMethod;
  generalReferralFeeAccountNumber: string;
  generalReferralFeePbaNumbers: DynamicList;
  generalReferralFeeAccountReferenceNumber: string;
  generalReferralFeeHelpWithFeesReferenceNumber: string;
  generalReferralDecision: GeneralReferralDecision;
  generalReferralDecisionDate: DateAsString;
  generalReferralDecisionReason: string;
  generalReferralUrgentCase: YesOrNo;
  generalReferralUrgentCaseReason: string;
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
}

export interface LabelContent {
  Applicant2: string;
  TheApplicant2: string;
  TheApplicant2UC: string;
  Applicant2UC: string;
  UnionType: string;
  UnionTypeUC: string;
  DivorceOrCivilPartnershipApplication: string;
  DivorceOrEndCivilPartnership: string;
  ApplicantOrApplicant1: string;
  DivorceOrCivilPartnership: string;
  FinaliseDivorceOrEndCivilPartnership: string;
  MarriageOrCivilPartnership: string;
  MarriageOrCivilPartnershipUC: string;
  DivorceOrLegallyEnd: string;
  ApplicantsOrApplicant1s: string;
  TheApplicantOrApplicant1: string;
  TheApplicantOrApplicant1UC: string;
  ApplicantOrApplicant1UC: string;
  GotMarriedOrFormedCivilPartnership: string;
  RespondentsOrApplicant2s: string;
  DivorceOrEndingCivilPartnership: string;
  ApplicationType: ApplicationType;
}

export interface LegalAdvisorDecision {
  granted: YesOrNo;
  decisionDate: DateAsString;
  refusalDecision: RefusalOption;
  refusalClarificationReason: ClarificationReason[];
  refusalClarificationAdditionalInfo: string;
  refusalAdminErrorInfo: string;
  refusalRejectionReason: RejectionReason[];
  refusalRejectionAdditionalInfo: string;
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
  FormationType: MarriageFormation;
  CertifyMarriageCertificateIsCorrect: YesOrNo;
  MarriageCertificateIsIncorrectDetails: string;
  IssueApplicationWithoutMarriageCertificate: YesOrNo;
}

export interface NoticeOfChange {
  WhichApplicant: WhichApplicant;
  AreTheyRepresented: YesOrNo;
  AreTheyDigital: YesOrNo;
}

export interface PaperFormDetails {
  ServeOutOfUK: YesOrNo;
  RespondentServePostOnly: YesOrNo;
  ApplicantWillServeApplication: YesOrNo;
  RespondentDifferentServiceAddress: YesOrNo;
  SummaryApplicant1FinancialOrdersFor: FinancialOrderFor[];
  SummaryApplicant2FinancialOrdersFor: FinancialOrderFor[];
  Applicant1SigningSOT: YesOrNo;
  Applicant1LegalRepSigningSOT: YesOrNo;
  Applicant2SigningSOT: YesOrNo;
  Applicant2LegalRepSigningSOT: YesOrNo;
  Applicant1LegalRepPosition: string;
  Applicant2LegalRepPosition: string;
  Applicant1SOTSignedOn: string;
  Applicant2SOTSignedOn: string;
  FeeInPounds: string;
  Applicant1NoPaymentIncluded: YesOrNo;
  Applicant2NoPaymentIncluded: YesOrNo;
  SoleOrApplicant1PaymentOther: YesOrNo;
  Applicant2PaymentOther: YesOrNo;
  SoleOrApplicant1PaymentOtherDetail: string;
  Applicant2PaymentOtherDetail: string;
  DebitCreditCardPayment: YesOrNo;
  DebitCreditCardPaymentPhone: YesOrNo;
  HowToPayEmail: YesOrNo;
  PaymentDetailEmail: string;
  ChequeOrPostalOrderPayment: YesOrNo;
}

export interface RejectReason {
  rejectReasonType: RejectReasonType;
  rejectDetails: string;
}

export interface RetiredFields {
  dataVersion: number;
  exampleRetiredField: string;
  previousCaseId: CaseLink;
  paperFormServiceOutsideUK: string;
  applicant1PrayerHasBeenGivenCheckbox: ThePrayer[];
  applicant2PrayerHasBeenGivenCheckbox: ThePrayer[];
  solServiceMethod: ServiceMethod;
  d11Document: DivorceDocument;
  bulkListCaseReference: string;
  coRefusalRejectionReason: RejectionReason[];
}

export interface Solicitor {
  Name: string;
  Reference: string;
  Phone: string;
  Email: string;
  FirmName: string;
  Address: string;
  AgreeToReceiveEmailsCheckbox: Prayer[];
  OrganisationPolicy: OrganisationPolicy<UserRole>;
}

export interface SolicitorService {
  DateOfService: DateAsString;
  DocumentsServed: string;
  OnWhomServed: string;
  HowServed: DocumentsServedHow;
  ServiceDetails: string;
  AddressServed: string;
  BeingThe: DocumentsServedBeingThe;
  LocationServed: DocumentsServedWhere;
  SpecifyLocationServed: string;
  ServiceSotName: string;
  ServiceSotFirm: string;
  StatementOfTruth: YesOrNo;
  TruthStatement: string;
}

export interface ConfidentialDivorceDocument {
  confidentialDocumentsReceived: ConfidentialDocumentsReceived;
  documentEmailContent: string;
  documentLink: Document;
  documentDateAdded: DateAsString;
  documentComment: string;
  documentFileName: string;
}

export interface DivorceDocument {
  documentEmailContent: string;
  documentLink: Document;
  documentDateAdded: DateAsString;
  documentComment: string;
  documentFileName: string;
  documentType: DocumentType;
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
  confidentialDivorceDocument: ConfidentialDivorceDocument;
  count: number;
}

export interface Print {
  letters: Letter[];
  caseId: string;
  caseRef: string;
  letterType: string;
}

export interface CaseCreationDetails {
  case_type_id: string;
  event_id: string;
  case_data: { [index: string]: any };
}

export interface CreditAccountPaymentRequest {
  ccd_case_number: string;
  account_number: string;
  amount: string;
  fees: PaymentItem[];
  service: string;
  customer_reference: string;
  site_id: string;
  case_type: string;
  description: string;
  currency: string;
  organisation_name: string;
}

export interface CreditAccountPaymentResponse {
  account_number: string;
  ccd_case_number: string;
  amount: number;
  fees: Fee[];
  date_updated: string;
  method: string;
  status_histories: StatusHistoriesItem[];
  date_created: string;
  service_name: string;
  channel: string;
  description: string;
  organisation_name: string;
  payment_reference: string;
  external_provider: string;
  reference: string;
  case_reference: string;
  customer_reference: string;
  external_reference: string;
  site_id: string;
  payment_group_reference: string;
  currency: string;
  id: string;
  status: string;
}

export interface FeeResponse {
  version: number;
  description: string;
  code: string;
  fee_amount: number;
}

export interface Payment {
  created: DateAsString;
  updated: DateAsString;
  feeCode: string;
  amount: number;
  status: PaymentStatus;
  channel: string;
  reference: string;
  transactionId: string;
}

export interface PaymentItem {
  reference: string;
  volume: string;
  ccd_case_number: string;
  memo_line: string;
  natural_account_code: string;
  code: string;
  calculated_amount: string;
  version: string;
}

export interface PbaResponse {
  httpStatus: HttpStatus;
  errorMessage: string;
  paymentReference: string;
}

export interface StatusHistoriesItem {
  date_updated: string;
  date_created: string;
  external_status: string;
  status: string;
  error_code: string;
  error_message: string;
}

export type DateAsString = string;

export const enum ChangeOrganisationApprovalStatus {
  NOT_CONSIDERED = '0',
  APPROVED = '1',
  REJECTED = '2',
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
  Label = 'Label',
  CasePaymentHistoryViewer = 'CasePaymentHistoryViewer',
  DynamicRadioList = 'DynamicRadioList',
}

export const enum ScannedDocumentType {
  CHERISHED = 'cherished',
  COVERSHEET = 'coversheet',
  FORM = 'form',
  OTHER = 'other',
}

export const enum YesOrNo {
  YES = 'Yes',
  NO = 'No',
}

export const enum AlternativeServiceMediumType {
  TEXT = 'text',
  EMAIL = 'email',
  SOCIAL_MEDIA = 'socialMedia',
  OTHER = 'other',
}

export const enum AlternativeServiceType {
  DEEMED = 'deemed',
  DISPENSED = 'dispensed',
  BAILIFF = 'bailiff',
}

export const enum Applicant2Represented {
  YES = 'Yes',
  NO = 'No',
  NOT_SURE = 'notSure',
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

export const enum ClarificationReason {
  JURISDICTION_DETAILS = 'jurisdictionDetails',
  MARRIAGE_CERTIFICATE_TRANSLATION = 'marriageCertTranslation',
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  PREVIOUS_PROCEEDINGS_DETAILS = 'previousProceedingDetails',
  OTHER = 'other',
}

export const enum ConditionalOrderCourt {
  BIRMINGHAM = 'birmingham',
  BURY_ST_EDMUNDS = 'buryStEdmunds',
}

export const enum ConfidentialAddress {
  SHARE = 'share',
  KEEP = 'keep',
}

export const enum ContactDetailsType {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export const enum CostOrderList {
  ADDITIONAL_INFO = 'additionalInformation',
  SUBJECT_TO_DETAILED_ASSESSMENT = 'subjectToDetailedAssessment',
  HALF_COSTS = 'half',
  ALL_COSTS = 'all',
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

export const enum DocumentsServedBeingThe {
  LITIGATION_FRIEND = 'litigationFriend',
  SOLICITOR = 'solicitors',
  RESPONDENT = 'respondents',
  APPLICANT = 'applicants',
}

export const enum DocumentsServedHow {
  COURT_PERMITTED = 'courtPermitted',
  HANDED_TO = 'handedTo',
  DELIVERED_TO = 'deliveredTo',
  POSTED_TO = 'postedTo',
}

export const enum DocumentsServedWhere {
  OTHER_SPECIFY = 'otherSpecify',
  PLACE_BUSINESS_COMPANY = 'placeOfBusinessOfCompany',
  PRINCIPAL_OFFICE_COMPANY = 'principalOfficeCompany',
  PRINCIPAL_OFFICE_CORPORATION = 'principalOfficeCorporation',
  PRINCIPAL_OFFICE_PARTNERSHIP = 'principalOfficePartnership',
  LAST_KNOWN_PRINCIPAL_BUSINESS_PLACE = 'lastKnownPricipalBusinessPlace',
  LAST_KNOWN_BUSINESS_PLACE = 'lastKnownBusinessPlace',
  PRINCIPAL_PLACE_BUSINESS = 'principalPlaceBusiness',
  PLACE_BUSINESS = 'placeBusiness',
  LAST_KNOWN_RESIDENCE = 'lastKnownResidence',
  USUAL_RESIDENCE = 'usualResidence',
}

export const enum FinancialOrderFor {
  APPLICANT = 'applicant',
  CHILDREN = 'children',
}

export const enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export const enum GeneralApplicationFee {
  FEE0227 = 'FEE0227',
  FEE0228 = 'FEE0228',
}

export const enum GeneralApplicationType {
  DISPENSED_WITH_SERVICE = 'dispensedWithService',
  DEEMED_SERVICE = 'deemedService',
  ISSUE_DIVORCE_WITHOUT_CERT = 'issueDivorceWithoutMarriageCertificate',
  EXPEDITE = 'expedite',
  OTHER_ALTERNATIVE_SERVICE_METHODS = 'otherAlternativeServiceMethod',
  OTHER = 'other',
}

export const enum GeneralOrderDivorceParties {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
}

export const enum GeneralOrderJudgeOrLegalAdvisorType {
  DISTRICT_JUDGE = 'districtJudge',
  DEPUTY_DISTRICT_JUDGE = 'deputyDistrictJudge',
  HIS_HONOUR_JUDGE = 'hisHonourJudge',
  HER_HONOUR_JUDGE = 'herHonourJudge',
  ASSISTANT_JUSTICES_CLERK = 'assistantJusticesClerk',
  PROPER_OFFICER_OF_THE_COURT = 'properOfficerOfTheCourt',
}

export const enum GeneralParties {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
  OTHER = 'other',
}

export const enum GeneralReferralDecision {
  APPROVE = 'approve',
  REFUSE = 'refuse',
  OTHER = 'other',
}

export const enum GeneralReferralReason {
  CASEWORKER_REFERRAL = 'caseworkerReferral',
  GENERAL_APPLICATION_REFERRAL = 'generalApplicationReferral',
}

export const enum GeneralReferralType {
  CASEWORKER_REFERRAL = 'alternativeServiceApplication',
  ORDER_APPLICATION_WITHOUT_MC = 'orderApplicationWithoutMc',
  ORDER_ON_FILLING_OF_ANSWERS = 'orderOnFilingOfAnswers',
  PERMISSION_ON_DA_OOT = 'permissionOnDaOot',
  DISCLOSURE_VIA_DWP = 'disclosureViaDwp',
  OTHER = 'other',
}

export const enum HowToRespondApplication {
  WITHOUT_DISPUTE_DIVORCE = 'withoutDisputeDivorce',
  DISPUTE_DIVORCE = 'disputeDivorce',
}

export const enum JudgeCostsClaimGranted {
  YES = 'Yes',
  NO = 'No',
  ADJOURN = 'Adjourn',
}

/**
 * Values:
 * - `A` - APP_1_APP_2_RESIDENT
 * - `B` - APP_1_APP_2_LAST_RESIDENT
 * - `C` - APP_2_RESIDENT_SOLE
 * - `C2` - APP_2_RESIDENT_JOINT
 * - `D` - APP_1_RESIDENT_TWELVE_MONTHS
 * - `E` - APP_1_RESIDENT_SIX_MONTHS
 * - `F` - APP_1_APP_2_DOMICILED
 * - `G` - APP_1_DOMICILED
 * - `H` - APP_2_DOMICILED
 * - `I` - RESIDUAL_JURISDICTION_CP
 * - `I2` - RESIDUAL_JURISDICTION_D
 * - `J` - APP_1_RESIDENT_JOINT
 */
export const enum JurisdictionConnections {
  /**
   * APP_1_APP_2_RESIDENT
   */
  APP_1_APP_2_RESIDENT = 'A',
  /**
   * APP_1_APP_2_LAST_RESIDENT
   */
  APP_1_APP_2_LAST_RESIDENT = 'B',
  /**
   * APP_2_RESIDENT_SOLE
   */
  APP_2_RESIDENT_SOLE = 'C',
  /**
   * APP_2_RESIDENT_JOINT
   */
  APP_2_RESIDENT_JOINT = 'C2',
  /**
   * APP_1_RESIDENT_TWELVE_MONTHS
   */
  APP_1_RESIDENT_TWELVE_MONTHS = 'D',
  /**
   * APP_1_RESIDENT_SIX_MONTHS
   */
  APP_1_RESIDENT_SIX_MONTHS = 'E',
  /**
   * APP_1_APP_2_DOMICILED
   */
  APP_1_APP_2_DOMICILED = 'F',
  /**
   * APP_1_DOMICILED
   */
  APP_1_DOMICILED = 'G',
  /**
   * APP_2_DOMICILED
   */
  APP_2_DOMICILED = 'H',
  /**
   * RESIDUAL_JURISDICTION_CP
   */
  RESIDUAL_JURISDICTION_CP = 'I',
  /**
   * RESIDUAL_JURISDICTION_D
   */
  RESIDUAL_JURISDICTION_D = 'I2',
  /**
   * APP_1_RESIDENT_JOINT
   */
  APP_1_RESIDENT_JOINT = 'J',
}

export const enum LanguagePreference {
  ENGLISH = 'ENGLISH',
  WELSH = 'WELSH',
}

export const enum LegalProceedingsRelated {
  MARRIAGE = 'marriage',
  PROPERTY = 'property',
  CHILDREN = 'children',
}

export const enum MarriageFormation {
  SAME_SEX_COUPLE = 'sameSexCouple',
  OPPOSITE_SEX_COUPLE = 'oppositeSexCouple',
}

export const enum PaperCasePaymentMethod {
  PHONE = 'phone',
  CHEQUE_OR_POSTAL_ORDER = 'chequeOrPostalOrder',
}

export const enum ProgressPaperCase {
  AWAITING_DOCUMENTS = 'awaitingDocuments',
  AWAITING_PAYMENT = 'awaitingPayment',
  SUBMITTED = 'submitted',
  AWAITING_HWF_DECISION = 'awaitingHwfDecision',
}

export const enum RefusalOption {
  MORE_INFO = 'moreInfo',
  ADMIN_ERROR = 'adminError',
  REJECT = 'reject',
}

export const enum ReissueOption {
  DIGITAL_AOS = 'digitalAos',
  OFFLINE_AOS = 'offlineAos',
  REISSUE_CASE = 'reissueCase',
}

export const enum RejectReasonType {
  NO_INFO = 'noInfo',
  INCORRECT_INFO = 'incorrectInfo',
  OTHER = 'Other',
}

export const enum RejectionReason {
  OTHER = 'other',
  NO_JURISDICTION = 'noJurisdiction',
}

export const enum ServiceMethod {
  SOLICITOR_SERVICE = 'solicitorService',
  COURT_SERVICE = 'courtService',
  PERSONAL_SERVICE = 'personalService',
}

export const enum ServicePaymentMethod {
  FEE_PAY_BY_ACCOUNT = 'feePayByAccount',
  FEE_PAY_BY_HWF = 'feePayByHelp',
  FEE_PAY_BY_PHONE = 'feePayByTelephone',
}

export const enum SolicitorPaymentMethod {
  FEE_PAY_BY_ACCOUNT = 'feePayByAccount',
  FEES_HELP_WITH = 'feesHelpWith',
}

export const enum State {
  Holding = 'Holding',
  AwaitingAos = 'AwaitingAos',
  AosDrafted = 'AosDrafted',
  AosOverdue = 'AosOverdue',
  Applicant2Approved = 'Applicant2Approved',
  AwaitingPayment = 'AwaitingPayment',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn',
  AwaitingAdminClarification = 'AwaitingAdminClarification',
  AwaitingAlternativeService = 'AwaitingAlternativeService',
  AwaitingAmendedApplication = 'AwaitingAmendedApplication',
  AwaitingDocuments = 'AwaitingDocuments',
  AwaitingApplicant1Response = 'AwaitingApplicant1Response',
  AwaitingApplicant2Response = 'AwaitingApplicant2Response',
  AwaitingBailiffReferral = 'AwaitingBailiffReferral',
  AwaitingBailiffService = 'AwaitingBailiffService',
  AwaitingClarification = 'AwaitingClarification',
  AwaitingConditionalOrder = 'AwaitingConditionalOrder',
  AwaitingDwpResponse = 'AwaitingDwpResponse',
  AwaitingFinalOrder = 'AwaitingFinalOrder',
  AwaitingGeneralConsideration = 'AwaitingGeneralConsideration',
  AwaitingGeneralReferralPayment = 'AwaitingGeneralReferralPayment',
  AwaitingHWFDecision = 'AwaitingHWFDecision',
  ConditionalOrderPending = 'ConditionalOrderPending',
  AwaitingJointFinalOrder = 'AwaitingJointFinalOrder',
  AwaitingJudgeClarification = 'AwaitingJudgeClarification',
  AwaitingLegalAdvisorReferral = 'AwaitingLegalAdvisorReferral',
  AwaitingService = 'AwaitingService',
  AwaitingServiceConsideration = 'AwaitingServiceConsideration',
  AwaitingServicePayment = 'AwaitingServicePayment',
  ClarificationSubmitted = 'ClarificationSubmitted',
  ConditionalOrderDrafted = 'ConditionalOrderDrafted',
  ConditionalOrderPronounced = 'ConditionalOrderPronounced',
  ConditionalOrderRefused = 'ConditionalOrderRefused',
  Draft = 'Draft',
  FinalOrderComplete = 'FinalOrderComplete',
  FinalOrderOverdue = 'FinalOrderOverdue',
  FinalOrderPending = 'FinalOrderPending',
  FinalOrderRequested = 'FinalOrderRequested',
  GeneralApplicationReceived = 'GeneralApplicationReceived',
  GeneralConsiderationComplete = 'GeneralConsiderationComplete',
  IssuedToBailiff = 'IssuedToBailiff',
  AwaitingPronouncement = 'AwaitingPronouncement',
  NewPaperCase = 'NewPaperCase',
  OfflineDocumentReceived = 'OfflineDocumentReceived',
  PendingHearingOutcome = 'PendingHearingOutcome',
  BulkCaseReject = 'BulkCaseReject',
  Submitted = 'Submitted',
  WelshTranslationRequested = 'WelshTranslationRequested',
  WelshTranslationReview = 'WelshTranslationReview',
}

export const enum HubTemplate {
  AosAwaitingOrDrafted = '/aos-awaiting-or-drafted.njk',
  AoSDue = '/aos-due.njk',
  ApplicantNotYetAppliedForConditionalOrder = '/applicant-not-yet-applied-for-conditional-order.njk',
  AwaitingAmendedApplication = '/awaiting-amended-application.njk',
  AwaitingAoS = '/awaiting-aos.njk',
  AwaitingBailiffService = '/awaiting-bailiff-service.njk',
  AwaitingClarification = '/awaiting-clarification.njk',
  AwaitingConditionalOrder = '/awaiting-conditional-order.njk',
  AwaitingFinalOrder = '/awaiting-final-order.njk',
  AwaitingFinalOrderOrFinalOrderOverdue = '/awaiting-final-order-or-final-order-overdue.njk',
  AwaitingGeneralConsideration = '/awaiting-general-consideration.njk',
  AwaitingLegalAdvisorReferral = '/awaiting-legal-advisor-referral.njk',
  AwaitingLegalAdvisorReferralOrAwaitingPronouncement = '/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk',
  AwaitingPronouncement = '/awaiting-pronouncement.njk',
  AwaitingServiceConsiderationOrAwaitingBailiffReferral = '/awaiting-service-consideration-or-awaiting-bailiff-referral.njk',
  BailiffServiceUnsuccessful = '/bailiff-service-unsuccessful.njk',
  ClarificationSubmitted = '/clarification-submitted.njk',
  ConditionalOrderPending = '/conditional-order-pending.njk',
  ConditionalOrderPronounced = '/conditional-order-pronounced.njk',
  FinalOrderComplete = '/final-order-complete.njk',
  FinalOrderRequested = '/final-order-requested.njk',
  Holding = '/holding.njk',
  ServiceApplicationRejected = '/service-application-rejected.njk',
}

export const enum TranslatedToLanguage {
  WELSH = 'translatedToWelsh',
  ENGLISH = 'translatedToEnglish',
}

export const enum UserRole {
  CASE_WORKER = 'caseworker-divorce-courtadmin_beta',
  CASE_WORKER_BULK_SCAN = 'caseworker-divorce-bulkscan',
  LEGAL_ADVISOR = 'caseworker-divorce-courtadmin-la',
  SUPER_USER = 'caseworker-divorce-superuser',
  SYSTEMUPDATE = 'caseworker-divorce-systemupdate',
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

export const enum WhoPaysCostOrder {
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
}

export const enum ConfidentialDocumentsReceived {
  AOS = 'aos',
  ANNEX_A = 'annexa',
  AOS_INVITATION_LETTER_OFFLINE_RESP = 'aosInvitationLetterOfflineResp',
  APPLICATION = 'application',
  BAILIFF_SERVICE = 'bailiffService',
  COE = 'coe',
  CO_ANSWERS = 'coAnswers',
  CONDITIONAL_ORDER_APPLICATION = 'conditionalOrderApplication',
  CONDITIONAL_ORDER_GRANTED = 'conditionalOrderGranted',
  CO_REFUSAL_CLARIFICATION_RESP = 'coRefusalClarificationResp',
  CORRESPONDENCE = 'correspondence',
  COSTS = 'costs',
  COSTS_ORDER = 'costsOrder',
  DEEMED_SERVICE = 'deemedService',
  DISPENSE_WITH_SERVICE = 'dispenseWithService',
  D84A = 'd84a',
  D9D = 'd9d',
  D9H = 'd9h',
  EMAIL = 'email',
  FINAL_ORDER_APPLICATION = 'finalOrderApplication',
  FINAL_ORDER_GRANTED = 'finalOrderGranted',
  GENERAL_LETTER = 'generalLetter',
  MARRIAGE_CERT = 'marriageCert',
  MARRIAGE_CERT_TRANSLATION = 'marriageCertTranslation',
  NAME_CHANGE = 'nameChange',
  NOTICE_OF_REFUSAL_OF_ENTITLEMENT = 'noticeOfRefusalOfEntitlement',
  OTHER = 'other',
  RESPONDENT_ANSWERS = 'respondentAnswers',
  SOLICITOR_SERVICE = 'solicitorService',
  WELSH_TRANSLATION = 'welshTranslation',
  NOTICE_OF_PROCEEDINGS_APP_1 = 'noticeOfProceedings',
  NOTICE_OF_PROCEEDINGS_APP_2 = 'noticeOfProceedingsApp2',
}

/**
 * Values:
 * - `aosOverdueCoverLetter`
 * - `acknowledgementOfService`
 * - `amendedApplication`
 * - `annexA`
 * - `application`
 * - `appliedForCoLetter`
 * - `bailiffCertificateOfService`
 * - `bailiffService`
 * - `bailiffServiceRefused`
 * - `certificateOfEntitlementCoverLetter`
 * - `certificateOfEntitlement`
 * - `certificateOfService`
 * - `conditionalOrderAnswers`
 * - `conditionalOrderApplication`
 * - `conditionalOrderCanApply`
 * - `conditionalOrderReminder`
 * - `conditionalOrderGranted`
 * - `conditionalOrderRefusal`
 * - `conditionalOrderRefusalCoverLetter`
 * - `correspondence`
 * - `costs`
 * - `costsOrder`
 * - `coversheet`
 * - `d84`
 * - `d9D`
 * - `d9H`
 * - `d10`
 * - `d11`
 * - `deemedService`
 * - `deemedAsServiceGranted`
 * - `deemedServiceRefused`
 * - `dispenseWithService`
 * - `dispenseWithServiceGranted`
 * - `dispenseWithServiceRefused`
 * - `email`
 * - `finalOrderApplication`
 * - `finalOrderGranted`
 * - `generalOrder`
 * - `marriageCertificate`
 * - `marriageCertificateTranslation`
 * - `nameChangeEvidence`
 * - `noticeOfProceedings`
 * - `noticeOfProceedingsApp2`
 * - `noticeOfRefusalOfEntitlement`
 * - `objectionToCosts`
 * - `other`
 * - `pronouncementList`
 * - `respondentAnswers`
 * - `aos` - @deprecated
 * - `solicitorService`
 * - `welshTranslation`
 * - `aosResponseLetter`
 * - `aosOverdueLetter`
 * - `generalLetter`
 * - `coGrantedCoversheet`
 * - `coGrantedCoversheetApp2`
 */
export const enum DocumentType {
  AOS_OVERDUE_COVER_LETTER = 'aosOverdueCoverLetter',
  ACKNOWLEDGEMENT_OF_SERVICE = 'acknowledgementOfService',
  AMENDED_APPLICATION = 'amendedApplication',
  ANNEX_A = 'annexA',
  APPLICATION = 'application',
  APPLIED_FOR_CO_LETTER = 'appliedForCoLetter',
  BAILIFF_CERTIFICATE_OF_SERVICE = 'bailiffCertificateOfService',
  BAILIFF_SERVICE = 'bailiffService',
  BAILIFF_SERVICE_REFUSED = 'bailiffServiceRefused',
  CERTIFICATE_OF_ENTITLEMENT_COVER_LETTER = 'certificateOfEntitlementCoverLetter',
  CERTIFICATE_OF_ENTITLEMENT = 'certificateOfEntitlement',
  CERTIFICATE_OF_SERVICE = 'certificateOfService',
  CONDITIONAL_ORDER_ANSWERS = 'conditionalOrderAnswers',
  CONDITIONAL_ORDER_APPLICATION = 'conditionalOrderApplication',
  CONDITIONAL_ORDER_CAN_APPLY = 'conditionalOrderCanApply',
  CONDITIONAL_ORDER_REMINDER = 'conditionalOrderReminder',
  CONDITIONAL_ORDER_GRANTED = 'conditionalOrderGranted',
  CONDITIONAL_ORDER_REFUSAL = 'conditionalOrderRefusal',
  CONDITIONAL_ORDER_REFUSAL_COVER_LETTER = 'conditionalOrderRefusalCoverLetter',
  CORRESPONDENCE = 'correspondence',
  COSTS = 'costs',
  COSTS_ORDER = 'costsOrder',
  COVERSHEET = 'coversheet',
  D84 = 'd84',
  D9D = 'd9D',
  D9H = 'd9H',
  D10 = 'd10',
  D11 = 'd11',
  DEEMED_SERVICE = 'deemedService',
  DEEMED_AS_SERVICE_GRANTED = 'deemedAsServiceGranted',
  DEEMED_SERVICE_REFUSED = 'deemedServiceRefused',
  DISPENSE_WITH_SERVICE = 'dispenseWithService',
  DISPENSE_WITH_SERVICE_GRANTED = 'dispenseWithServiceGranted',
  DISPENSE_WITH_SERVICE_REFUSED = 'dispenseWithServiceRefused',
  EMAIL = 'email',
  FINAL_ORDER_APPLICATION = 'finalOrderApplication',
  FINAL_ORDER_GRANTED = 'finalOrderGranted',
  GENERAL_ORDER = 'generalOrder',
  MARRIAGE_CERTIFICATE = 'marriageCertificate',
  MARRIAGE_CERTIFICATE_TRANSLATION = 'marriageCertificateTranslation',
  NAME_CHANGE_EVIDENCE = 'nameChangeEvidence',
  NOTICE_OF_PROCEEDINGS_APP_1 = 'noticeOfProceedings',
  NOTICE_OF_PROCEEDINGS_APP_2 = 'noticeOfProceedingsApp2',
  NOTICE_OF_REFUSAL_OF_ENTITLEMENT = 'noticeOfRefusalOfEntitlement',
  OBJECTION_TO_COSTS = 'objectionToCosts',
  OTHER = 'other',
  PRONOUNCEMENT_LIST = 'pronouncementList',
  RESPONDENT_ANSWERS = 'respondentAnswers',
  /**
   * @deprecated
   */
  RESPONDENT_INVITATION = 'aos',
  SOLICITOR_SERVICE = 'solicitorService',
  WELSH_TRANSLATION = 'welshTranslation',
  AOS_RESPONSE_LETTER = 'aosResponseLetter',
  AOS_OVERDUE_LETTER = 'aosOverdueLetter',
  GENERAL_LETTER = 'generalLetter',
  CONDITIONAL_ORDER_GRANTED_COVERSHEET_APP_1 = 'coGrantedCoversheet',
  CONDITIONAL_ORDER_GRANTED_COVERSHEET_APP_2 = 'coGrantedCoversheetApp2',
}

export const enum PaymentStatus {
  IN_PROGRESS = 'inProgress',
  SUCCESS = 'success',
  DECLINED = 'declined',
  TIMED_OUT = 'timedOut',
  CANCELLED = 'cancelled',
  ERROR = 'error',
}

export const enum PbaErrorMessage {
  CAE0001 = 'CAE0001',
  CAE0003 = 'CAE0003',
  CAE0004 = 'CAE0004',
  NOT_FOUND = 'NOT_FOUND',
  GENERAL = 'GENERAL',
}

export const enum DissolveDivorce {
  DISSOLVE_DIVORCE = 'dissolveDivorce',
}

export const enum EndCivilPartnership {
  END_CIVIL_PARTNERSHIP = 'endCivilPartnership',
}

export const enum FinancialOrdersThemselves {
  FINANCIAL_ORDERS_THEMSELVES = 'financialOrdersThemselves',
}

export const enum FinancialOrdersChild {
  FINANCIAL_ORDERS_CHILD = 'financialOrdersChild',
}

export const enum OfflineDocumentReceived {
  AOS_D10 = 'D10',
  CO_D84 = 'D84',
  OTHER = 'Other',
}

export const enum Granted {
  YES = 'Yes',
}

export const enum WhichApplicant {
  APPLICANT_1 = 'applicant1',
  APPLICANT_2 = 'applicant2',
}

export const enum ThePrayer {
  I_CONFIRM = 'Yes',
}

export const enum Prayer {
  CONFIRM = 'Yes',
}

/**
 * Values:
 * - `CONTINUE`
 * - `SWITCHING_PROTOCOLS`
 * - `PROCESSING`
 * - `CHECKPOINT`
 * - `OK`
 * - `CREATED`
 * - `ACCEPTED`
 * - `NON_AUTHORITATIVE_INFORMATION`
 * - `NO_CONTENT`
 * - `RESET_CONTENT`
 * - `PARTIAL_CONTENT`
 * - `MULTI_STATUS`
 * - `ALREADY_REPORTED`
 * - `IM_USED`
 * - `MULTIPLE_CHOICES`
 * - `MOVED_PERMANENTLY`
 * - `FOUND`
 * - `MOVED_TEMPORARILY` - @deprecated
 * - `SEE_OTHER`
 * - `NOT_MODIFIED`
 * - `USE_PROXY` - @deprecated
 * - `TEMPORARY_REDIRECT`
 * - `PERMANENT_REDIRECT`
 * - `BAD_REQUEST`
 * - `UNAUTHORIZED`
 * - `PAYMENT_REQUIRED`
 * - `FORBIDDEN`
 * - `NOT_FOUND`
 * - `METHOD_NOT_ALLOWED`
 * - `NOT_ACCEPTABLE`
 * - `PROXY_AUTHENTICATION_REQUIRED`
 * - `REQUEST_TIMEOUT`
 * - `CONFLICT`
 * - `GONE`
 * - `LENGTH_REQUIRED`
 * - `PRECONDITION_FAILED`
 * - `PAYLOAD_TOO_LARGE`
 * - `REQUEST_ENTITY_TOO_LARGE` - @deprecated
 * - `URI_TOO_LONG`
 * - `REQUEST_URI_TOO_LONG` - @deprecated
 * - `UNSUPPORTED_MEDIA_TYPE`
 * - `REQUESTED_RANGE_NOT_SATISFIABLE`
 * - `EXPECTATION_FAILED`
 * - `I_AM_A_TEAPOT`
 * - `INSUFFICIENT_SPACE_ON_RESOURCE` - @deprecated
 * - `METHOD_FAILURE` - @deprecated
 * - `DESTINATION_LOCKED` - @deprecated
 * - `UNPROCESSABLE_ENTITY`
 * - `LOCKED`
 * - `FAILED_DEPENDENCY`
 * - `TOO_EARLY`
 * - `UPGRADE_REQUIRED`
 * - `PRECONDITION_REQUIRED`
 * - `TOO_MANY_REQUESTS`
 * - `REQUEST_HEADER_FIELDS_TOO_LARGE`
 * - `UNAVAILABLE_FOR_LEGAL_REASONS`
 * - `INTERNAL_SERVER_ERROR`
 * - `NOT_IMPLEMENTED`
 * - `BAD_GATEWAY`
 * - `SERVICE_UNAVAILABLE`
 * - `GATEWAY_TIMEOUT`
 * - `HTTP_VERSION_NOT_SUPPORTED`
 * - `VARIANT_ALSO_NEGOTIATES`
 * - `INSUFFICIENT_STORAGE`
 * - `LOOP_DETECTED`
 * - `BANDWIDTH_LIMIT_EXCEEDED`
 * - `NOT_EXTENDED`
 * - `NETWORK_AUTHENTICATION_REQUIRED`
 */
export const enum HttpStatus {
  CONTINUE = 'CONTINUE',
  SWITCHING_PROTOCOLS = 'SWITCHING_PROTOCOLS',
  PROCESSING = 'PROCESSING',
  CHECKPOINT = 'CHECKPOINT',
  OK = 'OK',
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  NON_AUTHORITATIVE_INFORMATION = 'NON_AUTHORITATIVE_INFORMATION',
  NO_CONTENT = 'NO_CONTENT',
  RESET_CONTENT = 'RESET_CONTENT',
  PARTIAL_CONTENT = 'PARTIAL_CONTENT',
  MULTI_STATUS = 'MULTI_STATUS',
  ALREADY_REPORTED = 'ALREADY_REPORTED',
  IM_USED = 'IM_USED',
  MULTIPLE_CHOICES = 'MULTIPLE_CHOICES',
  MOVED_PERMANENTLY = 'MOVED_PERMANENTLY',
  FOUND = 'FOUND',
  /**
   * @deprecated
   */
  MOVED_TEMPORARILY = 'MOVED_TEMPORARILY',
  SEE_OTHER = 'SEE_OTHER',
  NOT_MODIFIED = 'NOT_MODIFIED',
  /**
   * @deprecated
   */
  USE_PROXY = 'USE_PROXY',
  TEMPORARY_REDIRECT = 'TEMPORARY_REDIRECT',
  PERMANENT_REDIRECT = 'PERMANENT_REDIRECT',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  NOT_ACCEPTABLE = 'NOT_ACCEPTABLE',
  PROXY_AUTHENTICATION_REQUIRED = 'PROXY_AUTHENTICATION_REQUIRED',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  CONFLICT = 'CONFLICT',
  GONE = 'GONE',
  LENGTH_REQUIRED = 'LENGTH_REQUIRED',
  PRECONDITION_FAILED = 'PRECONDITION_FAILED',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  /**
   * @deprecated
   */
  REQUEST_ENTITY_TOO_LARGE = 'REQUEST_ENTITY_TOO_LARGE',
  URI_TOO_LONG = 'URI_TOO_LONG',
  /**
   * @deprecated
   */
  REQUEST_URI_TOO_LONG = 'REQUEST_URI_TOO_LONG',
  UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE',
  REQUESTED_RANGE_NOT_SATISFIABLE = 'REQUESTED_RANGE_NOT_SATISFIABLE',
  EXPECTATION_FAILED = 'EXPECTATION_FAILED',
  I_AM_A_TEAPOT = 'I_AM_A_TEAPOT',
  /**
   * @deprecated
   */
  INSUFFICIENT_SPACE_ON_RESOURCE = 'INSUFFICIENT_SPACE_ON_RESOURCE',
  /**
   * @deprecated
   */
  METHOD_FAILURE = 'METHOD_FAILURE',
  /**
   * @deprecated
   */
  DESTINATION_LOCKED = 'DESTINATION_LOCKED',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  LOCKED = 'LOCKED',
  FAILED_DEPENDENCY = 'FAILED_DEPENDENCY',
  TOO_EARLY = 'TOO_EARLY',
  UPGRADE_REQUIRED = 'UPGRADE_REQUIRED',
  PRECONDITION_REQUIRED = 'PRECONDITION_REQUIRED',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  REQUEST_HEADER_FIELDS_TOO_LARGE = 'REQUEST_HEADER_FIELDS_TOO_LARGE',
  UNAVAILABLE_FOR_LEGAL_REASONS = 'UNAVAILABLE_FOR_LEGAL_REASONS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  BAD_GATEWAY = 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  HTTP_VERSION_NOT_SUPPORTED = 'HTTP_VERSION_NOT_SUPPORTED',
  VARIANT_ALSO_NEGOTIATES = 'VARIANT_ALSO_NEGOTIATES',
  INSUFFICIENT_STORAGE = 'INSUFFICIENT_STORAGE',
  LOOP_DETECTED = 'LOOP_DETECTED',
  BANDWIDTH_LIMIT_EXCEEDED = 'BANDWIDTH_LIMIT_EXCEEDED',
  NOT_EXTENDED = 'NOT_EXTENDED',
  NETWORK_AUTHENTICATION_REQUIRED = 'NETWORK_AUTHENTICATION_REQUIRED',
}

export const CASE_TYPE = 'NFD';
export const JURISDICTION = 'DIVORCE';
export const CITIZEN_SUBMIT = 'citizen-submit-application';
export const CITIZEN_CREATE = 'citizen-create-application';
export const CITIZEN_UPDATE_CASE_STATE_AAT = 'citizen-update-case-state-aat';
export const APPLICANT_2_CONFIRM_RECEIPT = 'applicant2-confirm-receipt';
export const CITIZEN_UPDATE_CONTACT_DETAILS = 'citizen-update-contact-details';
export const CITIZEN_RESEND_INVITE = 'citizen-resend-invite';
export const CITIZEN_SAVE_AND_CLOSE = 'citizen-save-and-close';
export const APPLICANT_2_NOT_BROKEN = 'applicant2-not-broken';
export const CITIZEN_UPDATE = 'citizen-update-application';
export const APPLICANT_1_CONFIRM_RECEIPT = 'applicant1-confirm-receipt';
export const CITIZEN_ADD_PAYMENT = 'citizen-add-payment';
export const CITIZEN_PAYMENT_MADE = 'citizen-payment-made';
export const CITIZEN_APPLICANT2_UPDATE = 'citizen-applicant2-update-application';
export const CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS = 'citizen-applicant2-update-contact-details';
export const CITIZEN_FINAL_ORDER_DELAY_REASON = 'citizen-final-order-delay-reason';
export const APPLICANT_2_APPROVE = 'applicant2-approve';
export const CONFIRM_RECEIPT = 'confirm-receipt';
export const APPLICANT2_FINAL_ORDER_REQUESTED = 'applicant2-final-order-requested';
export const APPLICANT2_APPLY_FOR_FINAL_ORDER = 'Apply for final order';
export const INVITE_APPLICANT_2 = 'invite-applicant2';
export const UPDATE_AOS = 'update-aos';
export const SUBMIT_CLARIFICATION = 'submit-clarification';
export const DRAFT_CONDITIONAL_ORDER = 'draft-conditional-order';
export const DRAFT_JOINT_CONDITIONAL_ORDER = 'draft-joint-conditional-order';
export const APPLICANT_1_RESUBMIT = 'applicant1-resubmit';
export const UPDATE_CONDITIONAL_ORDER = 'update-conditional-order';
export const FINAL_ORDER_REQUESTED = 'final-order-requested';
export const APPLY_FOR_FINAL_ORDER = 'Apply for final order';
export const UPDATE_JOINT_CONDITIONAL_ORDER = 'update-joint-conditional-order';
export const SUBMIT_CONDITIONAL_ORDER = 'submit-conditional-order';
export const SUBMIT_AOS = 'submit-aos';
export const APPLICANT_2_REQUEST_CHANGES = 'applicant2-request-changes';
export const DRAFT_AOS = 'draft-aos';
export const SUBMIT_JOINT_CONDITIONAL_ORDER = 'submit-joint-conditional-order';
export const SWITCH_TO_SOLE = 'switch-to-sole';
export const SWITCH_TO_SOLE_CO = 'switch-to-sole-co';
export const SYSTEM_PROGRESS_CASE_TO_AWAITING_FINAL_ORDER = 'system-progress-case-awaiting-final-order';
export const SYSTEM_REMIND_RESPONDENT_SOLICITOR_TO_RESPOND = 'system-remind-respondent-solicitor-to-respond';
export const SYSTEM_FINAL_ORDER_OVERDUE = 'system-final-order-overdue';
export const SYSTEM_REMIND_APPLICANT2 = 'system-remind-applicant2';
export const SYSTEM_MIGRATE_BULK_CASE = 'system-migrate-bulk-case';
export const SYSTEM_REMIND_APPLICANTS_CONDITIONAL_ORDER = 'system-remind-applicants-conditional-order';
export const SYSTEM_UPDATE_CASE_PRONOUNCEMENT_JUDGE = 'system-update-case-pronouncement-judge';
export const SYSTEM_ISSUE_AOS_UNDISPUTED = 'system-issue-aos-undisputed';
export const SYSTEM_LINK_APPLICANT_2 = 'system-link-applicant2';
export const SYSTEM_PRONOUNCE_CASE = 'system-pronounce-case';
export const SYSTEM_REMIND_APPLICANTS_APPLY_FOR_FINAL_ORDER = 'system-remind-applicants-final-order';
export const SYSTEM_UPDATE_CASE_COURT_HEARING = 'system-update-case-court-hearing';
export const SYSTEM_UNLINK_APPLICANT = 'system-unlink-applicant';
export const SYSTEM_CANCEL_CASE_INVITE = 'system-cancel-case-invite';
export const SYSTEM_REMIND_APPLICANT_1_APPLICATION_REVIEWED = 'system-remind-applicant1';
export const SYSTEM_MIGRATE_CASE = 'system-migrate-case';
export const SYSTEM_LINK_WITH_BULK_CASE = 'system-link-with-bulk-case';
export const SYSTEM_ISSUE_SOLICITOR_SERVICE_PACK = 'system-issue-solicitor-service-pack';
export const SYSTEM_NOTIFY_RESPONDENT_APPLY_FINAL_ORDER = 'system-notify-respondent-apply-final-order';
export const SYSTEM_ISSUE_AOS_DISPUTED = 'system-issue-aos-disputed';
export const SYSTEM_PROGRESS_HELD_CASE = 'system-progress-held-case';
export const SYSTEM_REMOVE_BULK_CASE = 'system-remove-bulk-case';
export const SYSTEM_APPLICATION_NOT_REVIEWED = 'system-application-not-reviewed';
export const SYSTEM_NOTIFY_APPLICANT_DISPUTE_FORM_OVERDUE = 'system-notify-applicant-dispute-form-overdue';
export const SYSTEM_PROGRESS_TO_AOS_OVERDUE = 'system-progress-to-aos-overdue';
export const CASEWORKER_SYSTEM_USER_UPDATE_ISSUE_DATE = 'system-update-issue-date';
export const CASEWORKER_ISSUE_APPLICATION = 'caseworker-issue-application';
export const birmingham = 'Birmingham Civil and Family Justice Centre';
export const buryStEdmunds = 'Bury St. Edmunds Regional Divorce Centre';
