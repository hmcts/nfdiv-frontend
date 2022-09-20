import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as columnGenerateContent } from '../../applicant1/finalising-your-application/content';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, userCase, isJointApplication }: CommonContent) => ({
  title: `Do you want to ${isDivorce ? 'finalise your divorce' : 'end your civil partnership'}?`,
  line1: `Your ${
    isDivorce ? 'marriage' : 'civil partnership'
  } will be legally ended after the final order is made. This might affect your finances.`,
  warningText: `If you have not finished negotiations about your money, property or other assets then you should seek legal advice before finalising
  ${isDivorce ? 'your divorce' : 'ending your civil partnership'}`,
  readMore: {
    subHeader: `If you want to settle your finances before  ${
      isDivorce ? 'finalising your divorce' : 'ending your civil partnership'
    }`,
    line1: 'You should save and sign out and settle your finances before applying for a final order.',
    line2: `If you have not applied by ${getFormattedDate(
      userCase.dateFinalOrderEligibleToRespondent
    )} then your ${partner} will be able to apply.
    You may both have to come to a court hearing, if they apply.`,
    line3: 'If you wait a year before applying then you will need to explain the delay to the court.',
  },
  warningTextJoint: `If you have not finished negotiations about your money, property or other assets then you should get legal advice before finalising ${
    isDivorce ? 'your divorce' : 'ending your civil partnership'
  }.
  If you want to settle your finances first, then save and sign out.`,
  readMoreJoint: {
    subHeader: 'Changing to a sole application',
    subHeader2: 'If you want to change to a sole application now',
    line1: `If you still want to ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    } but you do not think your ${partner} will confirm the final order then you can change to a sole application.
    This means your ${partner} will become the respondent.`,
    line2: `You should still continue and confirm you want to ${
      isDivorce ? 'finalise your divorce' : 'end your civil partnership'
    } below.
    If your ${partner} does not also confirm within 2 weeks then you will be able to ${
      isDivorce ? 'finalise your divorce' : 'end your civil partnership'
    } as a sole applicant.
    You will receive an email with information on how to change your application, if they do not apply.`,
  },
  readMoreChangeToSole: {
    subHeader: 'If you want to change to a sole application now',
    line1: `If you know your ${partner} is not going to confirm the joint application, then you can apply to change to a sole application now.
    You should save and sign out and follow these steps. `,
    orderedList1FinalOrderPart1: 'Download and fill out an application for a final order ',
    orderedList1FinalOrderPart2: '(as a sole applicant)',
    downloadReferenceFinalOrder: 'Download-Fill-Out-Application-For-Final-Order',
    linkFinalOrder:
      'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/952032/d36-eng.pdf',
    orderedList2CertificateOfServicePart1: `Give notice to your ${partner} that you are intending to apply for a final order as a sole applicant.
    You can do this by sending them a draft copy of the application by email or post. You will need to `,
    orderedList2CertificateOfServicePart2: "fill out a ‘certificate of service' ",
    orderedList2CertificateOfServicePart3: 'form to prove to the court that you have given them notice.',
    downloadReferenceCertificateOfService: 'Download-Fill-Out-Certificate-Of-Service',
    linkCertificateOfService: 'https://www.gov.uk/government/publications/form-n215-certificate-of-service',
    orderedList3: `You have to give your ${partner} 14 days to respond, starting from the day they are ‘served’ the application. After 14 days, then send the following documents and evidence to the court:`,
    bulletPoint1Part1: 'The',
    bulletPoint1Part2: 'application for a Final Order ',
    bulletPoint1Part3: `which proves that you have given notice to your ${partner} that you are intending to apply for a final order as a sole applicant.`,
    bulletPoint2Part1: 'The',
    bulletPoint2Part2: "'certificate of service' ",
    bulletPoint2Part3: `which proves that you have given notice to your ${partner} that you are intending to apply for a final order as a sole applicant.`,
    postOrEmail:
      'You can either post or email the documents and evidence to the court. Details of where to send them are on any correspondence you have received from the court.',
  },
  checkboxLine: `${
    isJointApplication
      ? `I want to ${isDivorce ? 'finalise my divorce' : 'end my civil partnership'} jointly with my ${partner}`
      : `I want to ${isDivorce ? 'finalise my divorce' : 'end my civil partnership'}`
  }`,

  errors: {
    doesApplicant1WantToApplyForFinalOrder: {
      required:
        'You cannot continue without selecting the checkbox. If you do not want to continue then save and sign out.',
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    doesApplicant1WantToApplyForFinalOrder: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'doesApplicant1WantToApplyForFinalOrder',
          label: l => l.checkboxLine,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const isJointApplication = content.isJointApplication;
  return {
    ...translations,
    ...columnGenerateContent(content),
    isJointApplication,
    form,
  };
};
