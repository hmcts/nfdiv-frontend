import capitalize from 'lodash/capitalize';

import { getFormattedCaseDate } from '../../../../../app/case/answers/formatDate';
import { CaseDate, Checkbox } from '../../../../../app/case/case';
import { YesOrNo, YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { SupportedLanguages } from '../../../../../modules/i18n';
import {
  CommonContent,
  generateCommonContent,
  yesOrNoOrNotKnown_cy,
  yesOrNoOrNotKnown_en,
} from '../../../../common/common.content';
import * as urls from '../../../../urls';
import {
  form as checkAnswersForm,
  generateContent as checkAnswersGenerateContent,
} from '../../common/check-answers/content';
import { generateContent as ableToUploadPartnerPhotoContent } from '../able-to-upload-partner-photo/content';
import { generateContent as areThereDangerousAnimalsContent } from '../are-there-dangerous-animals/content';
import { generateContent as doesPartnerHaveVehicleContent } from '../does-partner-have-a-vehicle/content';
import { generateContent as doesPartnerHaveMentalHealthIssuesContent } from '../does-partner-have-mental-health-issues/content';
import { generateContent as doesPartnerHoldFirearmsLicenseContent } from '../does-partner-hold-firearms-license/content';
import { generateContent as hasPartnerBeenViolentContent } from '../has-partner-been-violent/content';
import { generateContent as hasPartnerMadeThreatsContent } from '../has-partner-made-threats/content';
import { generateContent as havePoliceBeenInvolvedContent } from '../have-police-been-involved/content';
import { generateContent as haveSocialServicesBeenInvolvedContent } from '../have-social-services-been-involved/content';
import { generateContent as partnerDateOfBirthContent } from '../partner-date-of-birth/content';
import { generateContent as partnerInRefugeContent } from '../partner-in-refuge/content';
import { generateContent as partnerPhoneNumberContent } from '../partner-phone-number/content';

const en = ({ partner, isDivorce }: CommonContent, stepAnswers, stepLinks) => ({
  stepQuestions: {
    useHwf: 'Help paying the application fee',
    hwfReference: 'Help with fees reference number',
    partnerName: `${capitalize(partner)}'s name`,
    partnerInRefuge: `Is your ${partner} in a refuge?`,
    knowPartnersPhone: `Do you know your ${partner}’s phone number?`,
    partnerPhoneNumber: `${capitalize(partner)}'s phone number`,
    knowPartnersDateOfBirth: `Do you know your ${partner}’s date of birth?`,
    partnerDateOfBirth: `${capitalize(partner)}'s date of birth`,
    partnerApproximateAge: `${capitalize(partner)}'s approximate age`,
    partnerHeight: `${capitalize(partner)}'s height`,
    partnerHairColour: `${capitalize(partner)}'s hair colour`,
    partnerEyeColour: `${capitalize(partner)}'s eye colour`,
    partnerEthnicGroup: `${capitalize(partner)}'s ethnic group`,
    partnerDistinguishingFeatures: `${capitalize(partner)}'s distinguishing features`,
    canUploadEvidence: `Are you able to upload a photo of your ${partner}?`,
    uploadedFiles: 'Uploaded photo',
    bestTimeToServePapers: 'When is the best time to serve papers?',
    doesPartnerHaveVehicle: `Does your ${partner} have a vehicle?`,
    partnerVehicleModel: `${capitalize(partner)}'s vehicle manufacturer and model`,
    partnerVehicleColour: `${capitalize(partner)}'s vehicle colour`,
    partnerVehicleRegistration: `${capitalize(partner)}'s vehicle registration`,
    partnerVehicleOtherDetails: `${capitalize(partner)}'s vehicle other details`,
    hasPartnerBeenViolent: `Has your ${partner} ever been violent or been convicted of a violent offence?`,
    partnerViolenceDetails: 'Details about any incidents',
    hasPartnerMadeThreats: `Has your ${partner} ever made verbal or written threats against you, either generally or specifically in relation to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }?`,
    partnerThreatsDetails: `Details about ${partner}'s threats`,
    havePoliceBeenInvolved: `Has there been any police involvement with your ${partner} or other people living at the property?`,
    policeInvolvedDetails: 'Details about police involvement',
    haveSocialServicesBeenInvolved: `Has there been any social services involvement with your ${partner} or other people living at the property?`,
    socialServicesInvolvedDetails: 'Details about social services involvement',
    areThereDangerousAnimals: 'Are any dogs or other potentially dangerous animals kept at the property?',
    dangerousAnimalsDetails: 'Details about any dangerous animals',
    doesPartnerHaveMentalIssues: `Is your ${partner} known to have any mental health issues or known to use drugs or alcohol in any way that may affect their behaviour?`,
    partnerMentalIssuesDetails: `Details about ${partner}'s mental health issues, drugs or alcohol use `,
    doesPartnerHoldFirearmsLicense: `Does your ${partner} hold a firearms license?`,
    partnerFirearmsLicenseDetails: `Details about ${partner}'s firearms license`,
  },
  stepAnswers,
  stepLinks,
});

const cy: typeof en = ({ partner, isDivorce }: CommonContent, stepAnswers, stepLinks) => ({
  stepQuestions: {
    useHwf: 'Help i dalu’r ffi gwneud cais',
    hwfReference: 'Cyfeirnod help i dalu ffioedd',
    partnerName: `Enw’ch ${partner}`,
    partnerInRefuge: `Ydy eich ${partner} yn preswylio mewn lloches ar hyn o bryd?`,
    knowPartnersPhone: `Ydych chi'n gwybod rhif ffôn eich ${partner}?`,
    partnerPhoneNumber: `Rhif ffôn eich ${partner}`,
    knowPartnersDateOfBirth: `Ydych chi’n gwybod dyddiad geni eich ${partner}?`,
    partnerDateOfBirth: `Dyddiad geni eich ${partner}`,
    partnerApproximateAge: `Oedran eich ${partner} yn fras`,
    partnerHeight: `Taldra eich ${partner}`,
    partnerHairColour: `Lliw gwallt eich ${partner}`,
    partnerEyeColour: `Lliw llygaid eich ${partner}`,
    partnerEthnicGroup: `Grŵp ethnig eich ${partner}`,
    partnerDistinguishingFeatures: `Nodweddion unigryw eich ${partner}`,
    canUploadEvidence: `Ydych chi’n gallu uwchlwytho llun diweddar o’ch ${partner}?`,
    uploadedFiles: `Llun o’ch ${partner}`,
    bestTimeToServePapers: `Pryd yw’r amser gorau i’r beili gyflwyno’r papurau ysgariad i’ch ${partner}?`,
    doesPartnerHaveVehicle: `Oes gan eich ${partner} gerbyd at eu defnydd?`,
    partnerVehicleModel: `Gwneuthurwr a model cerbyd eich ${partner}`,
    partnerVehicleColour: `Lliw cerbyd eich ${partner}`,
    partnerVehicleRegistration: `Rhif cofrestru cerbyd eich ${partner}`,
    partnerVehicleOtherDetails: `Manylion eraill am gerbyd eich ${partner}`,
    hasPartnerBeenViolent: `A yw eich ${partner} erioed wedi bod yn dreisgar neu wedi cael ei gyhuddo/ei chyhuddo o drosedd treisgar?`,
    partnerViolenceDetails: `Manylion am drais eich ${partner}`,
    hasPartnerMadeThreats: `A yw eich ${partner} wedi gwneud unrhyw fygythiadau ar lafar neu ysgrifenedig yn eich erbyn chi, naill ai’n gyffredinol neu’n benodol mewn perthynas â’r ${
      isDivorce ? 'cais ysgariad' : 'cais i ddod â’r bartneriaeth sifil i ben'
    }?`,
    partnerThreatsDetails: `Manylion am fygythiadau eich ${partner}`,
    havePoliceBeenInvolved: `A yw’r heddlu wedi ymwneud â’ch ${partner} neu bobl eraill sy’n byw yn yr eiddo?`,
    policeInvolvedDetails: `Manylion ynghylch ymwneud yr heddlu â’ch ${partner} neu bobl eraill sy’n byw yn yr eiddo`,
    haveSocialServicesBeenInvolved: `A yw’r gwasanaethau cymdeithasol wedi ymwneud â’ch ${partner} neu bobl eraill sy’n byw yn yr eiddo?`,
    socialServicesInvolvedDetails: `Manylion ynghylch ymwneud gwasanaethau cymdeithasol â’ch ${partner} neu bobl eraill sy’n byw yn yr eiddo`,
    areThereDangerousAnimals: 'A oes unrhyw gŵn neu anifeiliaid peryglus eraill yn cael eu cadw yn yr eiddo?',
    dangerousAnimalsDetails: 'Manylion unrhyw anifeiliaid peryglus a gedwir yn yr eiddo',
    doesPartnerHaveMentalIssues: `A oes gan eich ${partner} unrhyw broblemau iechyd meddwl hysbys neu a yw’n defnyddio/camddefnyddio cyffuriau neu alcohol mewn unrhyw ffordd a all effeithio ar ei ymddygiad?`,
    partnerMentalIssuesDetails: 'Manylion unrhyw faterion iechyd meddwl neu ddefnyddio cyffuriau neu alcohol',
    doesPartnerHoldFirearmsLicense: `A oes gan eich ${partner} drwydded drylliau tanio?`,
    partnerFirearmsLicenseDetails: `Manylion trwydded drylliau tanio eich ${partner} neu unrhyw euogfarnau’n ymwneud â drylliau tanio`,
  },
  stepAnswers,
  stepLinks,
});

export const form: FormContent = checkAnswersForm;

const languages = {
  en,
  cy,
};

const formatYesOrNo = (pageContent, language: SupportedLanguages, field: YesOrNo | YesOrNoOrNotKnown | undefined) => {
  const commonContent = language === SupportedLanguages.Cy ? yesOrNoOrNotKnown_cy : yesOrNoOrNotKnown_en;
  if (field === undefined) {
    return undefined;
  }
  if (!pageContent.yes) {
    pageContent.yes = commonContent.yes;
  }
  if (!pageContent.no) {
    pageContent.no = commonContent.no;
  }
  if (!pageContent.notKnown) {
    pageContent.notKnown = commonContent.notKnown;
  }
  switch (field) {
    case YesOrNo.YES:
    case YesOrNoOrNotKnown.YES:
      return pageContent.yes;
    case YesOrNo.NO:
    case YesOrNoOrNotKnown.NO:
      return pageContent.no;
    case YesOrNoOrNotKnown.NOT_KNOWN:
      return pageContent.notKnown;
    default:
      return field;
  }
};

const getStepAnswers = (
  content,
  uploads,
  {
    knowsPartnersPhone,
    knowsPartnersDateOfBirth,
    partnerHasVehicle,
    partnerHasBeenViolent,
    partnerHasMadeThreats,
    policeHaveBeenInvolved,
    socialServicesHaveBeenInvolved,
    thereAreDangerousAnimals,
    partnerHasMentalHealthIssues,
    partnerHasFirearmsLicense,
  }
) => ({
  useHwf: formatYesOrNo(
    generateCommonContent(content),
    content.language,
    content.userCase.applicant1InterimAppsUseHelpWithFees
  ),
  hwfReference: content.userCase.applicant1InterimAppsHwfRefNumber,
  partnerName: content.userCase.applicant1BailiffPartnersName,
  partnerInRefuge: formatYesOrNo(
    partnerInRefugeContent(content),
    content.language,
    content.userCase.applicant1BailiffPartnerInARefuge
  ),
  knowPartnersPhone: formatYesOrNo(
    partnerPhoneNumberContent(content),
    content.language,
    content.userCase.applicant1BailiffKnowPartnersPhone
  ),
  partnerPhoneNumber: knowsPartnersPhone && content.userCase.applicant1BailiffPartnersPhone,
  knowPartnersDateOfBirth: formatYesOrNo(
    partnerDateOfBirthContent(content),
    content.language,
    content.userCase.applicant1BailiffKnowPartnersDateOfBirth
  ),
  partnerDateOfBirth:
    knowsPartnersDateOfBirth &&
    getFormattedCaseDate(content.userCase.applicant1BailiffPartnersDateOfBirth as CaseDate, content.language),
  partnerApproximateAge: !knowsPartnersDateOfBirth && content.userCase.applicant1BailiffPartnersApproximateAge,
  partnerHeight: content.userCase.applicant1BailiffPartnersHeight,
  partnerHairColour: content.userCase.applicant1BailiffPartnersHairColour,
  partnerEyeColour: content.userCase.applicant1BailiffPartnersEyeColour,
  partnerEthnicGroup: content.userCase.applicant1BailiffPartnersEthnicGroup,
  partnerDistinguishingFeatures: content.userCase.applicant1BailiffPartnersDistinguishingFeatures,
  canUploadEvidence: formatYesOrNo(
    ableToUploadPartnerPhotoContent(content),
    content.language,
    content.userCase.applicant1InterimAppsCanUploadEvidence
  ),
  ...uploads,
  bestTimeToServePapers: content.userCase.applicant1BailiffBestTimeToServe,
  doesPartnerHaveVehicle: formatYesOrNo(
    doesPartnerHaveVehicleContent(content),
    content.language,
    content.userCase.applicant1BailiffDoesPartnerHaveVehicle
  ),
  partnerVehicleModel: partnerHasVehicle && content.userCase.applicant1BailiffPartnerVehicleModel,
  partnerVehicleColour: partnerHasVehicle && content.userCase.applicant1BailiffPartnerVehicleColour,
  partnerVehicleRegistration: partnerHasVehicle && content.userCase.applicant1BailiffPartnerVehicleRegistration,
  partnerVehicleOtherDetails: partnerHasVehicle && content.userCase.applicant1BailiffPartnerVehicleOtherDetails,
  hasPartnerBeenViolent: formatYesOrNo(
    hasPartnerBeenViolentContent(content),
    content.language,
    content.userCase.applicant1BailiffHasPartnerBeenViolent
  ),
  partnerViolenceDetails: partnerHasBeenViolent && content.userCase.applicant1BailiffPartnerViolenceDetails,
  hasPartnerMadeThreats: formatYesOrNo(
    hasPartnerMadeThreatsContent(content),
    content.language,
    content.userCase.applicant1BailiffHasPartnerMadeThreats
  ),
  partnerThreatsDetails: partnerHasMadeThreats && content.userCase.applicant1BailiffPartnerThreatsDetails,
  havePoliceBeenInvolved: formatYesOrNo(
    havePoliceBeenInvolvedContent(content),
    content.language,
    content.userCase.applicant1BailiffHavePoliceBeenInvolved
  ),
  policeInvolvedDetails: policeHaveBeenInvolved && content.userCase.applicant1BailiffPoliceInvolvedDetails,
  haveSocialServicesBeenInvolved: formatYesOrNo(
    haveSocialServicesBeenInvolvedContent(content),
    content.language,
    content.userCase.applicant1BailiffHaveSocialServicesBeenInvolved
  ),
  socialServicesInvolvedDetails:
    socialServicesHaveBeenInvolved && content.userCase.applicant1BailiffSocialServicesInvolvedDetails,
  areThereDangerousAnimals: formatYesOrNo(
    areThereDangerousAnimalsContent(content),
    content.language,
    content.userCase.applicant1BailiffAreThereDangerousAnimals
  ),
  dangerousAnimalsDetails: thereAreDangerousAnimals && content.userCase.applicant1BailiffDangerousAnimalsDetails,
  doesPartnerHaveMentalIssues: formatYesOrNo(
    doesPartnerHaveMentalHealthIssuesContent(content),
    content.language,
    content.userCase.applicant1BailiffDoesPartnerHaveMentalIssues
  ),
  partnerMentalIssuesDetails:
    partnerHasMentalHealthIssues && content.userCase.applicant1BailiffPartnerMentalIssuesDetails,
  doesPartnerHoldFirearmsLicense: formatYesOrNo(
    doesPartnerHoldFirearmsLicenseContent(content),
    content.language,
    content.userCase.applicant1BailiffDoesPartnerHoldFirearmsLicense
  ),
  partnerFirearmsLicenseDetails:
    partnerHasFirearmsLicense && content.userCase.applicant1BailiffPartnerFirearmsLicenseDetails,
});

const getStepLinks = ({
  knowsPartnersPhone,
  knowsPartnersDateOfBirth,
  partnerHasVehicle,
  partnerHasBeenViolent,
  partnerHasMadeThreats,
  policeHaveBeenInvolved,
  socialServicesHaveBeenInvolved,
  thereAreDangerousAnimals,
  partnerHasMentalHealthIssues,
  partnerHasFirearmsLicense,
}) => ({
  useHwf: `${urls.HELP_WITH_FEES_BAILIFF}`,
  hwfReference: `${urls.HWF_REFERENCE_NUMBER_INPUT_BAILIFF}`,
  partnerName: `${urls.ENTER_PARTNERS_NAME_BAILIFF}`,
  partnerInRefuge: `${urls.PARTNER_IN_REFUGE_BAILIFF}`,
  knowPartnersPhone: `${urls.PARTNER_PHONE_NUMBER_BAILIFF}`,
  partnerPhoneNumber: knowsPartnersPhone && `${urls.PARTNER_PHONE_NUMBER_BAILIFF}`,
  knowPartnersDateOfBirth: `${urls.PARTNER_DATE_OF_BIRTH_BAILIFF}`,
  partnerDateOfBirth: knowsPartnersDateOfBirth && `${urls.PARTNER_DATE_OF_BIRTH_BAILIFF}`,
  partnerApproximateAge: !knowsPartnersDateOfBirth && `${urls.PARTNER_DATE_OF_BIRTH_BAILIFF}`,
  partnerHeight: `${urls.PARTNER_HEIGHT_BAILIFF}`,
  partnerHairColour: `${urls.PARTNER_HAIR_COLOUR_BAILIFF}`,
  partnerEyeColour: `${urls.PARTNER_EYE_COLOUR_BAILIFF}`,
  partnerEthnicGroup: `${urls.PARTNER_ETHNIC_GROUP_BAILIFF}`,
  partnerDistinguishingFeatures: `${urls.PARTNER_DISTINGUISHING_FEATURES_BAILIFF}`,
  canUploadEvidence: `${urls.ABLE_TO_UPLOAD_PARTNER_PHOTO}`,
  uploadedFiles: `${urls.UPLOAD_PARTNER_PHOTO}`,
  bestTimeToServePapers: `${urls.WHEN_IS_BEST_TO_SERVE}`,
  doesPartnerHaveVehicle: `${urls.DOES_PARTNER_HAVE_A_VEHICLE}`,
  partnerVehicleModel: partnerHasVehicle && `${urls.PARTNER_VEHICLE_DETAILS}`,
  partnerVehicleColour: partnerHasVehicle && `${urls.PARTNER_VEHICLE_DETAILS}`,
  partnerVehicleRegistration: partnerHasVehicle && `${urls.PARTNER_VEHICLE_DETAILS}`,
  partnerVehicleOtherDetails: partnerHasVehicle && `${urls.PARTNER_VEHICLE_DETAILS}`,
  hasPartnerBeenViolent: `${urls.HAS_PARTNER_BEEN_VIOLENT}`,
  partnerViolenceDetails: partnerHasBeenViolent && `${urls.HAS_PARTNER_BEEN_VIOLENT}`,
  hasPartnerMadeThreats: `${urls.HAS_PARTNER_MADE_THREATS}`,
  partnerThreatsDetails: partnerHasMadeThreats && `${urls.HAS_PARTNER_MADE_THREATS}`,
  havePoliceBeenInvolved: `${urls.HAVE_POLICE_BEEN_INVOLVED}`,
  policeInvolvedDetails: policeHaveBeenInvolved && `${urls.HAVE_POLICE_BEEN_INVOLVED}`,
  haveSocialServicesBeenInvolved: `${urls.HAVE_SOCIAL_SERVICES_BEEN_INVOLVED}`,
  socialServicesInvolvedDetails: socialServicesHaveBeenInvolved && `${urls.HAVE_SOCIAL_SERVICES_BEEN_INVOLVED}`,
  areThereDangerousAnimals: `${urls.ARE_THERE_DANGEROUS_ANIMALS}`,
  dangerousAnimalsDetails: thereAreDangerousAnimals && `${urls.ARE_THERE_DANGEROUS_ANIMALS}`,
  doesPartnerHaveMentalIssues: `${urls.PARTNER_MENTAL_HEALTH_BAILIFF}`,
  partnerMentalIssuesDetails: partnerHasMentalHealthIssues && `${urls.PARTNER_MENTAL_HEALTH_BAILIFF}`,
  doesPartnerHoldFirearmsLicense: `${urls.PARTNER_FIREARMS_LICENSE_BAILIFF}`,
  partnerFirearmsLicenseDetails: partnerHasFirearmsLicense && `${urls.PARTNER_FIREARMS_LICENSE_BAILIFF}`,
});

export const generateContent: TranslationFn = content => {
  const checkAnswersContent = checkAnswersGenerateContent(content);
  const uploads = {
    cannotUploadDocs:
      content.userCase.applicant1InterimAppsCannotUploadDocs === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO,
    uploadedDocsFilenames:
      content.userCase.applicant1InterimAppsCanUploadEvidence === YesOrNo.YES &&
      content.userCase.applicant1InterimAppsEvidenceDocs?.map(item => getFilename(item.value)),
  };

  const contentVariables = {
    knowsPartnersPhone: content.userCase.applicant1BailiffKnowPartnersPhone === YesOrNo.YES,
    knowsPartnersDateOfBirth: content.userCase.applicant1BailiffKnowPartnersDateOfBirth === YesOrNo.YES,
    partnerHasVehicle: content.userCase.applicant1BailiffDoesPartnerHaveVehicle === YesOrNoOrNotKnown.YES,
    partnerHasBeenViolent: content.userCase.applicant1BailiffHasPartnerBeenViolent === YesOrNoOrNotKnown.YES,
    partnerHasMadeThreats: content.userCase.applicant1BailiffHasPartnerMadeThreats === YesOrNoOrNotKnown.YES,
    policeHaveBeenInvolved: content.userCase.applicant1BailiffHavePoliceBeenInvolved === YesOrNoOrNotKnown.YES,
    socialServicesHaveBeenInvolved:
      content.userCase.applicant1BailiffHaveSocialServicesBeenInvolved === YesOrNoOrNotKnown.YES,
    thereAreDangerousAnimals: content.userCase.applicant1BailiffAreThereDangerousAnimals === YesOrNoOrNotKnown.YES,
    partnerHasMentalHealthIssues:
      content.userCase.applicant1BailiffDoesPartnerHaveMentalIssues === YesOrNoOrNotKnown.YES,
    partnerHasFirearmsLicense:
      content.userCase.applicant1BailiffDoesPartnerHoldFirearmsLicense === YesOrNoOrNotKnown.YES,
  };

  const translations = languages[content.language](
    content,
    getStepAnswers(content, uploads, contentVariables),
    getStepLinks(contentVariables)
  );

  return {
    ...checkAnswersContent,
    ...translations,
    form,
    ...uploads,
  };
};
