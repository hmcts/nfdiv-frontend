import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Withdrawing your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  sole: {
    line1: `You have said you do not want to continue with your ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    }. If you want to withdraw your application then you need to fill out a separate
    <a class="govuk-link" href="https://www.gov.uk/government/publications/form-d11-application-notice">D11 form</a>
    and send it to the court. Details of where to send it are on the form.`,
    line2:
      'If you need help then you can contact the court using the details below. The support staff cannot give you legal advice.',
  },
  joint: {
    line1: `You have said you do not want to continue with your ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    }. If you want to withdraw your application then you need to jointly fill out a
      <a class="govuk-link" href="https://www.gov.uk/government/publications/form-d11-application-notice">D11 form</a>
      and send it to the court. Details of where to send it are on the form.`,
    continueAsSole: 'If you want to continue as a sole applicant',
    firstInTimeApplicant: `If you still want to ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    } but you do not think your ${partner} will confirm they want to continue,
      then you can change to a sole application. This means your ${partner} will become the respondent${
      isDivorce ? ' for the rest of the divorce' : ''
    }.<br><br>
      You should still <a class="govuk-link" href="/continue-with-your-application">continue to apply for a conditional order jointly.</a>
      If your ${partner} does not also apply within 2 weeks then you will then be able to change to a sole application online.
      You will receive an email with information on how to change your application, if they do not apply.<br><br>
      If you want to apply for a conditional order as a sole applicant now, then you need to
      <a class="govuk-link" href="https://www.gov.uk/government/publications/form-d84-application-for-a-decree-nisi-conditional-order-or-judicial-separation-decreeorder">download and fill out a D84 paper form.</a>
      Details of where to post it are on the form. Your application will be lodged as soon as the form is received by the court but it could take up to three weeks to process the application.
      If you want to choose this option then you should exit the service.`,
    secondInTimeApplicant: `Your ${partner} has already confirmed they want to continue with your joint application.
      The quickest way for you to progress the ${isDivorce ? 'divorce' : 'ending of your civil partnership'}
      is for you to also <a class="govuk-link" href="/continue-with-your-application">confirm you want to continue with your joint application.</a><br><br>
      If you want to change to a sole application then it will delay the ${
        isDivorce ? 'divorce' : 'ending of your civil partnership'
      }.
      You will have to make a separate application by
      <a class="govuk-link" href="https://www.gov.uk/government/publications/form-d84-application-for-a-decree-nisi-conditional-order-or-judicial-separation-decreeorder">downloading and filling out a D84 paper form.</a>
      Details of where to send it are on the form. You should exit the service and send in the form if you want to change to a sole application.<br><br>
      The quickest way to progress the ${
        isDivorce ? 'divorce' : 'ending of your civil partnership'
      } is to confirm you want to continue with your joint application.`,
  },
  exitLink: 'Exit service',
});

// @TODO translations
const cy = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const isJointApplication = content.isJointApplication;
  const isApplicantFirstInTimeApplicant = content.isApplicant2
    ? content.userCase.coApplicant1StatementOfTruth !== Checkbox.Checked
    : content.userCase.coApplicant2StatementOfTruth !== Checkbox.Checked;
  return {
    isJointApplication,
    isApplicantFirstInTimeApplicant,
    ...translations,
  };
};
