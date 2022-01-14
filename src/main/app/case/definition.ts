/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.34.976 on 2022-01-14 15:58:38.

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
  confirmDisputeApplication: YesOrNo;
  applicantNotifiedDisputeFormOverdue: YesOrNo;
  jurisdictionAgree: YesOrNo;
  dateAosSubmitted: DateAsString;
  digitalNoticeOfProceedings: YesOrNo;
  noticeOfProceedingsEmail: string;
  noticeOfProceedingsSolicitorFirm: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: string;
  inWhichCountryIsYourLifeMainlyBased: string;
  statementOfTruth: YesOrNo;
  prayerHasBeenGiven: YesOrNo;
  howToRespondApplication: HowToRespondApplication;
  solicitorName: string;
  solicitorFirm: string;
  additionalComments: string;
  disputingFeePaymentMethod: ServicePaymentMethod;
  disputingFeeAccountNumber: string;
  disputingFeeAccountReferenceNumber: string;
  disputingFeeHelpWithFeesReferenceNumber: string;
  disputingFee: OrderSummary;
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
  paymentMethod: ServicePaymentMethod;
  feeAccountNumber: string;
  feeAccountReferenceNumber: string;
  helpWithFeesReferenceNumber: string;
  servicePaymentFeeOrderSummary: OrderSummary;
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: DivorceDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
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
  HomeAddress: AddressGlobalUK;
  PhoneNumber: string;
  Gender: Gender;
  ContactDetailsType: ContactDetailsType;
  CorrespondenceAddress: AddressGlobalUK;
  SolicitorRepresented: YesOrNo;
  SolicitorName: string;
  SolicitorReference: string;
  SolicitorPhone: string;
  SolicitorEmail: string;
  SolicitorAddress: string;
  SolicitorAgreeToReceiveEmailsCheckbox: Prayer[];
  SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  FinancialOrder: YesOrNo;
  FinancialOrdersFor: FinancialOrderFor[];
  LegalProceedings: YesOrNo;
  LegalProceedingsDetails: string;
  PcqId: string;
  ContinueApplication: YesOrNo;
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
  solServiceMethod: ServiceMethod;
  solStatementOfReconciliationCertify: YesOrNo;
  solStatementOfReconciliationDiscussed: YesOrNo;
  applicant1PrayerHasBeenGivenCheckbox: ThePrayer[];
  applicant2PrayerHasBeenGivenCheckbox: ThePrayer[];
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
  applicant1CannotUploadSupportingDocument: DocumentType[];
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
  previousState: State;
  applicationPayments: ListValue<Payment>[];
  overdueNotificationSent: YesOrNo;
  applicant1ReminderSent: YesOrNo;
  applicant2ReminderSent: YesOrNo;
  applicantsRemindedCanApplyForConditionalOrder: YesOrNo;
  reissueOption: ReissueOption;
  applicant2NeedsHelpWithFees: YesOrNo;
  applicant1SolicitorAnswersLink: Document;
}

export interface Bailiff {
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: DivorceDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
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
  labelContentDivorceOrLegallyEnd: string;
  labelContentApplicantsOrApplicant1s: string;
  labelContentTheApplicantOrApplicant1: string;
  labelContentGotMarriedOrFormedCivilPartnership: string;
  labelContentRespondentsOrApplicant2s: string;
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
  applicant1HomeAddress: AddressGlobalUK;
  applicant1PhoneNumber: string;
  applicant1Gender: Gender;
  applicant1ContactDetailsType: ContactDetailsType;
  applicant1CorrespondenceAddress: AddressGlobalUK;
  applicant1SolicitorRepresented: YesOrNo;
  applicant1SolicitorName: string;
  applicant1SolicitorReference: string;
  applicant1SolicitorPhone: string;
  applicant1SolicitorEmail: string;
  applicant1SolicitorAddress: string;
  applicant1SolicitorAgreeToReceiveEmailsCheckbox: Prayer[];
  applicant1SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  applicant1FinancialOrder: YesOrNo;
  applicant1FinancialOrdersFor: FinancialOrderFor[];
  applicant1LegalProceedings: YesOrNo;
  applicant1LegalProceedingsDetails: string;
  applicant1PcqId: string;
  applicant1ContinueApplication: YesOrNo;
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
  applicant2HomeAddress: AddressGlobalUK;
  applicant2PhoneNumber: string;
  applicant2Gender: Gender;
  applicant2ContactDetailsType: ContactDetailsType;
  applicant2CorrespondenceAddress: AddressGlobalUK;
  applicant2SolicitorRepresented: YesOrNo;
  applicant2SolicitorName: string;
  applicant2SolicitorReference: string;
  applicant2SolicitorPhone: string;
  applicant2SolicitorEmail: string;
  applicant2SolicitorAddress: string;
  applicant2SolicitorAgreeToReceiveEmailsCheckbox: Prayer[];
  applicant2SolicitorOrganisationPolicy: OrganisationPolicy<UserRole>;
  applicant2FinancialOrder: YesOrNo;
  applicant2FinancialOrdersFor: FinancialOrderFor[];
  applicant2LegalProceedings: YesOrNo;
  applicant2LegalProceedingsDetails: string;
  applicant2PcqId: string;
  applicant2ContinueApplication: YesOrNo;
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
  solServiceMethod: ServiceMethod;
  solStatementOfReconciliationCertify: YesOrNo;
  solStatementOfReconciliationDiscussed: YesOrNo;
  applicant1PrayerHasBeenGivenCheckbox: ThePrayer[];
  applicant2PrayerHasBeenGivenCheckbox: ThePrayer[];
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
  applicant1CannotUploadSupportingDocument: DocumentType[];
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
  previousState: State;
  applicationPayments: ListValue<Payment>[];
  overdueNotificationSent: YesOrNo;
  applicant1ReminderSent: YesOrNo;
  applicant2ReminderSent: YesOrNo;
  applicantsRemindedCanApplyForConditionalOrder: YesOrNo;
  reissueOption: ReissueOption;
  applicant2NeedsHelpWithFees: YesOrNo;
  applicant1SolicitorAnswersLink: Document;
  applicant2InviteEmailAddress: string;
  accessCode: string;
  applicant2UserId: string;
  confirmReadPetition: YesOrNo;
  confirmDisputeApplication: YesOrNo;
  applicantNotifiedDisputeFormOverdue: YesOrNo;
  jurisdictionAgree: YesOrNo;
  dateAosSubmitted: DateAsString;
  digitalNoticeOfProceedings: YesOrNo;
  noticeOfProceedingsEmail: string;
  noticeOfProceedingsSolicitorFirm: string;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: string;
  inWhichCountryIsYourLifeMainlyBased: string;
  statementOfTruth: YesOrNo;
  prayerHasBeenGiven: YesOrNo;
  howToRespondApplication: HowToRespondApplication;
  solicitorName: string;
  solicitorFirm: string;
  additionalComments: string;
  disputingFeePaymentMethod: ServicePaymentMethod;
  disputingFeeAccountNumber: string;
  disputingFeeAccountReferenceNumber: string;
  disputingFeeHelpWithFeesReferenceNumber: string;
  disputingFee: OrderSummary;
  coApplicant1SubmittedDate: DateAsString;
  coApplicant1ApplyForConditionalOrder: YesOrNo;
  coApplicant1ConfirmInformationStillCorrect: YesOrNo;
  coApplicant1ReasonInformationNotCorrect: string;
  coApplicant1ApplyForConditionalOrderStarted: YesOrNo;
  coApplicant1ChangeOrAddToApplication: YesOrNo;
  coApplicant1IsEverythingInApplicationTrue: YesOrNo;
  coApplicant1StatementOfTruth: YesOrNo;
  coApplicant2SubmittedDate: DateAsString;
  coApplicant2ApplyForConditionalOrder: YesOrNo;
  coApplicant2ConfirmInformationStillCorrect: YesOrNo;
  coApplicant2ReasonInformationNotCorrect: string;
  coApplicant2ApplyForConditionalOrderStarted: YesOrNo;
  coApplicant2ChangeOrAddToApplication: YesOrNo;
  coApplicant2IsEverythingInApplicationTrue: YesOrNo;
  coApplicant2StatementOfTruth: YesOrNo;
  coRespondentAnswersLink: Document;
  coOnlinePetitionLink: Document;
  coSolicitorName: string;
  coSolicitorFirm: string;
  coSolicitorAdditionalComments: string;
  coGranted: YesOrNo;
  coClaimsGranted: YesOrNo;
  coClaimsCostsOrderInformation: string;
  coDecisionDate: DateAsString;
  coGrantedDate: DateAsString;
  coRefusalDecision: RefusalOption;
  coRefusalAdminErrorInfo: string;
  coRefusalRejectionReason: RejectionReason[];
  coRefusalRejectionAdditionalInfo: string;
  coRefusalClarificationReason: ClarificationReason[];
  coRefusalClarificationAdditionalInfo: string;
  coClarificationResponses: ListValue<string>[];
  coClarificationUploadDocuments: ListValue<DivorceDocument>[];
  coOutcomeCase: YesOrNo;
  coCourt: ConditionalOrderCourt;
  coDateAndTimeOfHearing: DateAsString;
  coPronouncementJudge: string;
  coJudgeCostsClaimGranted: JudgeCostsClaimGranted;
  coJudgeCostsOrderAdditionalInfo: string;
  coCertificateOfEntitlementDocument: DivorceDocument;
  dateFinalOrderSubmitted: DateAsString;
  dateFinalOrderEligibleFrom: DateAsString;
  granted: Granted[];
  grantedDate: DateAsString;
  doesApplicantWantToApplyForFinalOrder: YesOrNo;
  dateFinalOrderEligibleToRespondent: DateAsString;
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
  generalReferralReason: GeneralReferralReason;
  generalApplicationFrom: GeneralParties;
  generalApplicationReferralDate: DateAsString;
  generalApplicationAddedDate: DateAsString;
  generalReferralType: GeneralReferralType;
  alternativeServiceMedium: AlternativeServiceMediumType;
  generalReferralJudgeOrLegalAdvisorDetails: string;
  generalReferralFeeRequired: YesOrNo;
  alternativeServiceOutcomes: ListValue<AlternativeServiceOutcome>[];
  receivedServiceApplicationDate: DateAsString;
  alternativeServiceType: AlternativeServiceType;
  receivedServiceAddedDate: DateAsString;
  serviceApplicationGranted: YesOrNo;
  serviceApplicationRefusalReason: string;
  serviceApplicationDecisionDate: DateAsString;
  deemedServiceDate: DateAsString;
  dateOfPayment: DateAsString;
  paymentMethod: ServicePaymentMethod;
  feeAccountNumber: string;
  feeAccountReferenceNumber: string;
  helpWithFeesReferenceNumber: string;
  servicePaymentFeeOrderSummary: OrderSummary;
  localCourtName: string;
  localCourtEmail: string;
  certificateOfServiceDocument: DivorceDocument;
  certificateOfServiceDate: DateAsString;
  successfulServedByBailiff: YesOrNo;
  reasonFailureToServeByBailiff: string;
  applicant1DocumentsUploaded: ListValue<DivorceDocument>[];
  applicant2DocumentsUploaded: ListValue<DivorceDocument>[];
  divorceUnit: Court;
  documentsGenerated: ListValue<DivorceDocument>[];
  documentsUploaded: ListValue<DivorceDocument>[];
  d11Document: DivorceDocument;
  confidentialDocumentsUploaded: ListValue<ConfidentialDivorceDocument>[];
  generalOrders: ListValue<DivorceGeneralOrder>[];
  previousCaseId: CaseLink;
  dueDate: DateAsString;
  notes: ListValue<CaseNote>[];
  note: string;
  bulkListCaseReference: string;
  dataVersion: number;
  exampleRetiredField: string;
  applicant1ContactDetailsConfidential: ConfidentialAddress;
  applicant2ContactDetailsConfidential: ConfidentialAddress;
  applicant1LegalProceedingsRelated: LegalProceedingsRelated[];
  applicant2LegalProceedingsRelated: LegalProceedingsRelated[];
  dateConditionalOrderSubmitted: DateAsString;
  coWhoPaysCosts: WhoPaysCostOrder;
  coJudgeWhoPaysCosts: WhoPaysCostOrder;
  coJudgeTypeCostsDecision: CostOrderList;
  selectedDivorceCentreSiteId: string;
  coTypeCostsDecision: CostOrderList;
  legalProceedingsExist: YesOrNo;
  legalProceedingsDescription: string;
  doYouAgreeCourtHasJurisdiction: YesOrNo;
  serviceApplicationType: AlternativeServiceType;
  coCourtName: Court;
  applicant1PrayerHasBeenGiven: YesOrNo;
  coAddNewDocuments: YesOrNo;
  coDocumentsUploaded: ListValue<DivorceDocument>[];
  coIsEverythingInPetitionTrue: YesOrNo;
  applicant1FinancialOrderFor: FinancialOrderFor[];
  applicant2FinancialOrderFor: FinancialOrderFor[];
  alternativeServiceApplications: ListValue<AlternativeService>[];
  disputeApplication: YesOrNo;
  generalReferralJudgeDetails: string;
  generalReferralLegalAdvisorDetails: string;
  applicant1SolicitorAgreeToReceiveEmails: YesOrNo;
  applicant2SolicitorAgreeToReceiveEmails: YesOrNo;
  jurisdictionDisagreeReason: string;
  coClarificationResponse: string;
  marriageIsSameSexCouple: YesOrNo;
  applicant1KeepContactDetailsConfidential: YesOrNo;
  applicant2KeepContactDetailsConfidential: YesOrNo;
  applicant1NotifiedCanApplyForConditionalOrder: YesOrNo;
  jointApplicantsNotifiedCanApplyForConditionalOrder: YesOrNo;
  jointApplicantsRemindedCanApplyForConditionalOrder: YesOrNo;
  coDateSubmitted: DateAsString;
  applicant1ApplyForConditionalOrderStarted: YesOrNo;
  applicant2ApplyForConditionalOrderStarted: YesOrNo;
  coIsEverythingInApplicationTrue: YesOrNo;
  coChangeOrAddToApplication: YesOrNo;
  coApplyForConditionalOrder: YesOrNo;
  coApplicantStatementOfTruth: YesOrNo;
  generalOrderJudgeType: GeneralOrderJudgeOrLegalAdvisorType;
  generalOrderJudgeName: string;
  generalOrderLegalAdvisorName: string;
  applicant1DivorceWho: WhoDivorcing;
  applicant2DivorceWho: WhoDivorcing;
  applicant2PrayerHasBeenGiven: YesOrNo;
  hyphenatedCaseRef: string;
}

export interface CaseInvite {
  applicant2InviteEmailAddress: string;
  accessCode: string;
  applicant2UserId: string;
}

export interface ConditionalOrder {
  Applicant1SubmittedDate: DateAsString;
  Applicant1ApplyForConditionalOrder: YesOrNo;
  Applicant1ConfirmInformationStillCorrect: YesOrNo;
  Applicant1ReasonInformationNotCorrect: string;
  Applicant1ApplyForConditionalOrderStarted: YesOrNo;
  Applicant1ChangeOrAddToApplication: YesOrNo;
  Applicant1IsEverythingInApplicationTrue: YesOrNo;
  Applicant1StatementOfTruth: YesOrNo;
  Applicant2SubmittedDate: DateAsString;
  Applicant2ApplyForConditionalOrder: YesOrNo;
  Applicant2ConfirmInformationStillCorrect: YesOrNo;
  Applicant2ReasonInformationNotCorrect: string;
  Applicant2ApplyForConditionalOrderStarted: YesOrNo;
  Applicant2ChangeOrAddToApplication: YesOrNo;
  Applicant2IsEverythingInApplicationTrue: YesOrNo;
  Applicant2StatementOfTruth: YesOrNo;
  RespondentAnswersLink: Document;
  OnlinePetitionLink: Document;
  SolicitorName: string;
  SolicitorFirm: string;
  SolicitorAdditionalComments: string;
  Granted: YesOrNo;
  ClaimsGranted: YesOrNo;
  ClaimsCostsOrderInformation: string;
  DecisionDate: DateAsString;
  GrantedDate: DateAsString;
  RefusalDecision: RefusalOption;
  RefusalAdminErrorInfo: string;
  RefusalRejectionReason: RejectionReason[];
  RefusalRejectionAdditionalInfo: string;
  RefusalClarificationReason: ClarificationReason[];
  RefusalClarificationAdditionalInfo: string;
  ClarificationResponses: ListValue<string>[];
  ClarificationUploadDocuments: ListValue<DivorceDocument>[];
  OutcomeCase: YesOrNo;
  Court: ConditionalOrderCourt;
  DateAndTimeOfHearing: DateAsString;
  PronouncementJudge: string;
  JudgeCostsClaimGranted: JudgeCostsClaimGranted;
  JudgeCostsOrderAdditionalInfo: string;
  CertificateOfEntitlementDocument: DivorceDocument;
}

export interface ConditionalOrderQuestions {
  SubmittedDate: DateAsString;
  ApplyForConditionalOrder: YesOrNo;
  ConfirmInformationStillCorrect: YesOrNo;
  ReasonInformationNotCorrect: string;
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

export interface FinalOrder {
  dateFinalOrderSubmitted: DateAsString;
  dateFinalOrderEligibleFrom: DateAsString;
  granted: Granted[];
  grantedDate: DateAsString;
  doesApplicantWantToApplyForFinalOrder: YesOrNo;
  dateFinalOrderEligibleToRespondent: DateAsString;
  dateFinalOrderNoLongerEligible: DateAsString;
  finalOrderReminderSentApplicant1: YesOrNo;
  finalOrderReminderSentApplicant2: YesOrNo;
}

export interface GeneralEmail {
  generalEmailParties: GeneralParties;
  generalEmailOtherRecipientEmail: string;
  generalEmailOtherRecipientName: string;
  generalEmailDetails: string;
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
  DivorceOrLegallyEnd: string;
  ApplicantsOrApplicant1s: string;
  TheApplicantOrApplicant1: string;
  GotMarriedOrFormedCivilPartnership: string;
  RespondentsOrApplicant2s: string;
  ApplicationType: ApplicationType;
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

export interface RejectReason {
  rejectReasonType: RejectReasonType;
  rejectDetails: string;
}

export interface RetiredFields {
  dataVersion: number;
  exampleRetiredField: string;
  applicant1ContactDetailsConfidential: ConfidentialAddress;
  applicant2ContactDetailsConfidential: ConfidentialAddress;
  applicant1LegalProceedingsRelated: LegalProceedingsRelated[];
  applicant2LegalProceedingsRelated: LegalProceedingsRelated[];
  dateConditionalOrderSubmitted: DateAsString;
  coWhoPaysCosts: WhoPaysCostOrder;
  coJudgeWhoPaysCosts: WhoPaysCostOrder;
  coJudgeTypeCostsDecision: CostOrderList;
  selectedDivorceCentreSiteId: string;
  coTypeCostsDecision: CostOrderList;
  legalProceedingsExist: YesOrNo;
  legalProceedingsDescription: string;
  doYouAgreeCourtHasJurisdiction: YesOrNo;
  serviceApplicationType: AlternativeServiceType;
  coCourtName: Court;
  applicant1PrayerHasBeenGiven: YesOrNo;
  coAddNewDocuments: YesOrNo;
  coDocumentsUploaded: ListValue<DivorceDocument>[];
  coIsEverythingInPetitionTrue: YesOrNo;
  applicant1FinancialOrderFor: FinancialOrderFor[];
  applicant2FinancialOrderFor: FinancialOrderFor[];
  alternativeServiceApplications: ListValue<AlternativeService>[];
  disputeApplication: YesOrNo;
  generalReferralJudgeDetails: string;
  generalReferralLegalAdvisorDetails: string;
  applicant1SolicitorAgreeToReceiveEmails: YesOrNo;
  applicant2SolicitorAgreeToReceiveEmails: YesOrNo;
  jurisdictionDisagreeReason: string;
  coClarificationResponse: string;
  marriageIsSameSexCouple: YesOrNo;
  applicant1KeepContactDetailsConfidential: YesOrNo;
  applicant2KeepContactDetailsConfidential: YesOrNo;
  applicant1NotifiedCanApplyForConditionalOrder: YesOrNo;
  jointApplicantsNotifiedCanApplyForConditionalOrder: YesOrNo;
  jointApplicantsRemindedCanApplyForConditionalOrder: YesOrNo;
  coDateSubmitted: DateAsString;
  applicant1ApplyForConditionalOrderStarted: YesOrNo;
  applicant2ApplyForConditionalOrderStarted: YesOrNo;
  applicant1ContinueApplication: YesOrNo;
  applicant2ContinueApplication: YesOrNo;
  coIsEverythingInApplicationTrue: YesOrNo;
  coChangeOrAddToApplication: YesOrNo;
  coApplyForConditionalOrder: YesOrNo;
  coApplicantStatementOfTruth: YesOrNo;
  generalOrderJudgeType: GeneralOrderJudgeOrLegalAdvisorType;
  generalOrderJudgeName: string;
  generalOrderLegalAdvisorName: string;
  applicant1DivorceWho: WhoDivorcing;
  applicant2DivorceWho: WhoDivorcing;
  applicant2PrayerHasBeenGiven: YesOrNo;
}

export interface Solicitor {
  Name: string;
  Reference: string;
  Phone: string;
  Email: string;
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
  count: number;
}

export interface Print {
  letters: Letter[];
  caseId: string;
  caseRef: string;
  letterType: string;
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
 * - `J` - APP_1_RESIDENT_JOINT
 * - `A` - APP_1_APP_2_RESIDENT
 * - `B` - APP_1_APP_2_LAST_RESIDENT
 * - `C` - APP_2_RESIDENT
 * - `D` - APP_1_RESIDENT_TWELVE_MONTHS
 * - `E` - APP_1_RESIDENT_SIX_MONTHS
 * - `F` - APP_1_APP_2_DOMICILED
 * - `G` - APP_1_DOMICILED
 * - `H` - APP_2_DOMICILED
 * - `I` - RESIDUAL_JURISDICTION
 */
export const enum JurisdictionConnections {
  /**
   * APP_1_RESIDENT_JOINT
   */
  APP_1_RESIDENT_JOINT = 'J',
  /**
   * APP_1_APP_2_RESIDENT
   */
  APP_1_APP_2_RESIDENT = 'A',
  /**
   * APP_1_APP_2_LAST_RESIDENT
   */
  APP_1_APP_2_LAST_RESIDENT = 'B',
  /**
   * APP_2_RESIDENT
   */
  APP_2_RESIDENT = 'C',
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
   * RESIDUAL_JURISDICTION
   */
  RESIDUAL_JURISDICTION = 'I',
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
  Draft = 'Draft',
  Holding = 'Holding',
  AwaitingAos = 'AwaitingAos',
  AosDrafted = 'AosDrafted',
  AosOverdue = 'AosOverdue',
  Applicant2Approved = 'Applicant2Approved',
  AwaitingPayment = 'AwaitingPayment',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn',
  AwaitingAdminClarification = 'AwaitingAdminClarification',
  AwaitingAmendedApplication = 'AwaitingAmendedApplication',
  AwaitingDocuments = 'AwaitingDocuments',
  AwaitingApplicant1Response = 'AwaitingApplicant1Response',
  AwaitingApplicant2Response = 'AwaitingApplicant2Response',
  AwaitingBailiffReferral = 'AwaitingBailiffReferral',
  AwaitingBailiffService = 'AwaitingBailiffService',
  AwaitingClarification = 'AwaitingClarification',
  AwaitingConditionalOrder = 'AwaitingConditionalOrder',
  AwaitingFinalOrder = 'AwaitingFinalOrder',
  AwaitingGeneralConsideration = 'AwaitingGeneralConsideration',
  AwaitingGeneralReferralPayment = 'AwaitingGeneralReferralPayment',
  AwaitingHWFDecision = 'AwaitingHWFDecision',
  ConditionalOrderPending = 'ConditionalOrderPending',
  AwaitingLegalAdvisorReferral = 'AwaitingLegalAdvisorReferral',
  AwaitingService = 'AwaitingService',
  AwaitingServiceConsideration = 'AwaitingServiceConsideration',
  AwaitingServicePayment = 'AwaitingServicePayment',
  ClarificationSubmitted = 'ClarificationSubmitted',
  ConditionalOrderDrafted = 'ConditionalOrderDrafted',
  ConditionalOrderPronounced = 'ConditionalOrderPronounced',
  ConditionalOrderRefused = 'ConditionalOrderRefused',
  Disputed = 'Disputed',
  FinalOrderComplete = 'FinalOrderComplete',
  FinalOrderOverdue = 'FinalOrderOverdue',
  FinalOrderPending = 'FinalOrderPending',
  FinalOrderRequested = 'FinalOrderRequested',
  IssuedToBailiff = 'IssuedToBailiff',
  AwaitingPronouncement = 'AwaitingPronouncement',
  BulkCaseReject = 'BulkCaseReject',
  Submitted = 'Submitted',
}

export const enum UserRole {
  CASE_WORKER = 'caseworker-divorce-courtadmin_beta',
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
  BAILIFF_SERVICE = 'baliffService',
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
  MARRIAGE_CERT = 'marriageCert',
  MARRIAGE_CERT_TRANSLATION = 'marriageCertTranslation',
  NAME_CHANGE = 'nameChange',
  NOTICE_OF_REFUSAL_OF_ENTITLEMENT = 'noticeOfRefusalOfEntitlement',
  OTHER = 'other',
  RESPONDENT_ANSWERS = 'respondentAnswers',
  SOLICITOR_SERVICE = 'solicitorService',
  WELSH_TRANSLATION = 'welshTranslation',
}

export const enum DocumentType {
  AOS_OVERDUE_COVER_LETTER = 'aosOverdueCoverLetter',
  ACKNOWLEDGEMENT_OF_SERVICE = 'acknowledgementOfService',
  AMENDED_APPLICATION = 'amendedApplication',
  ANNEX_A = 'annexA',
  APPLICATION = 'application',
  BAILIFF_CERTIFICATE_OF_SERVICE = 'bailiffCertificateOfService',
  BAILIFF_SERVICE = 'bailiffService',
  CERTIFICATE_OF_ENTITLEMENT = 'certificateOfEntitlement',
  CERTIFICATE_OF_SERVICE = 'certificateOfService',
  CONDITIONAL_ORDER_ANSWERS = 'conditionalOrderAnswers',
  CONDITIONAL_ORDER_APPLICATION = 'conditionalOrderApplication',
  CONDITIONAL_ORDER_GRANTED = 'conditionalOrderGranted',
  CONDITIONAL_ORDER_REFUSAL = 'conditionalOrderRefusal',
  CORRESPONDENCE = 'correspondence',
  COSTS = 'costs',
  COSTS_ORDER = 'costsOrder',
  D84 = 'd84',
  D9D = 'd9D',
  D9H = 'd9H',
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
  NOTICE_OF_PROCEEDINGS = 'noticeOfProceedings',
  NOTICE_OF_REFUSAL_OF_ENTITLEMENT = 'noticeOfRefusalOfEntitlement',
  OBJECTION_TO_COSTS = 'objectionToCosts',
  OTHER = 'other',
  PRONOUNCEMENT_LIST = 'pronouncementList',
  RESPONDENT_ANSWERS = 'respondentAnswers',
  RESPONDENT_INVITATION = 'aos',
  SOLICITOR_SERVICE = 'solicitorService',
  WELSH_TRANSLATION = 'welshTranslation',
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

export const enum ThePrayer {
  I_CONFIRM = 'Yes',
}

export const enum Granted {
  YES = 'Yes',
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
export const CITIZEN_SAVE_AND_CLOSE = 'citizen-save-and-close';
export const APPLICANT_2_NOT_BROKEN = 'applicant2-not-broken';
export const CITIZEN_UPDATE = 'citizen-update-application';
export const SWITCH_TO_SOLE = 'switch-to-sole';
export const APPLICANT_1_CONFIRM_RECEIPT = 'applicant1-confirm-receipt';
export const APPLICANT_1_RESUBMIT = 'applicant1-resubmit';
export const CITIZEN_ADD_PAYMENT = 'citizen-add-payment';
export const CITIZEN_APPLICANT2_UPDATE = 'citizen-applicant2-update-application';
export const APPLICANT_2_APPROVE = 'applicant2-approve';
export const INVITE_APPLICANT_2 = 'invite-applicant2';
export const UPDATE_AOS = 'update-aos';
export const DRAFT_CONDITIONAL_ORDER = 'draft-conditional-order';
export const UPDATE_CONDITIONAL_ORDER = 'update-conditional-order';
export const SUBMIT_CONDITIONAL_ORDER = 'submit-conditional-order';
export const SUBMIT_AOS = 'submit-aos';
export const APPLICANT_2_REQUEST_CHANGES = 'applicant2-request-changes';
export const DRAFT_AOS = 'draft-aos';
export const SYSTEM_PROGRESS_CASE_TO_AWAITING_FINAL_ORDER = 'system-progress-case-awaiting-final-order';
export const SYSTEM_FINAL_ORDER_OVERDUE = 'system-final-order-overdue';
export const SYSTEM_REMIND_APPLICANT2 = 'system-remind-applicant2';
export const SYSTEM_MIGRATE_BULK_CASE = 'system-migrate-bulk-case';
export const SYSTEM_ISSUE_SOLICITOR_AOS_UNDISPUTED = 'system-issue-solicitor-aos-undisputed';
export const SYSTEM_REMIND_APPLICANTS_CONDITIONAL_ORDER = 'system-remind-applicants-conditional-order';
export const SYSTEM_UPDATE_CASE_PRONOUNCEMENT_JUDGE = 'system-update-case-pronouncement-judge';
export const SYSTEM_LINK_APPLICANT_2 = 'system-link-applicant2';
export const SYSTEM_PRONOUNCE_CASE = 'system-pronounce-case';
export const SYSTEM_UPDATE_CASE_COURT_HEARING = 'system-update-case-court-hearing';
export const SYSTEM_REMIND_APPLICANT_1_APPLICATION_REVIEWED = 'system-remind-applicant1';
export const SYSTEM_MIGRATE_CASE = 'system-migrate-case';
export const SYSTEM_LINK_WITH_BULK_CASE = 'system-link-with-bulk-case';
export const SYSTEM_ISSUE_SOLICITOR_SERVICE_PACK = 'system-issue-solicitor-service-pack';
export const SYSTEM_NOTIFY_RESPONDENT_APPLY_FINAL_ORDER = 'system-notify-respondent-apply-final-order';
export const SYSTEM_PROGRESS_HELD_CASE = 'system-progress-held-case';
export const SYSTEM_REMOVE_BULK_CASE = 'system-remove-bulk-case';
export const SYSTEM_ISSUE_SOLICITOR_AOS_DISPUTED = 'system-issue-solicitor-aos-disputed';
export const SYSTEM_APPLICATION_NOT_REVIEWED = 'system-application-not-reviewed';
export const SYSTEM_NOTIFY_APPLICANT_DISPUTE_FORM_OVERDUE = 'system-notify-applicant-dispute-form-overdue';
export const SYSTEM_PROGRESS_TO_AOS_OVERDUE = 'system-progress-to-aos-overdue';
export const CASEWORKER_SYSTEM_USER_UPDATE_ISSUE_DATE = 'system-update-issue-date';
export const birmingham = 'Birmingham Civil and Family Justice Centre';
export const buryStEdmunds = 'Bury St. Edmunds Regional Divorce Centre';
