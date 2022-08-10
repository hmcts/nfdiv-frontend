import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, isApplicant2 }: CommonContent) => ({
  title: `Withdrawing your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  sole: {
    line1: {
      part1: `You have said you do not want to continue with your ${
        isDivorce ? 'divorce' : 'application to end your civil partnership'
      }.
      If you want to withdraw your application then you need to fill out a separate`,
      part2: 'D11 form',
      part3: ' and send it to the court. Details of where to send it are on the form.',
      link: 'https://www.gov.uk/government/publications/form-d11-application-notice',
    },
    line2:
      'If you need help then you can contact the court using the details below. The support staff cannot give you legal advice.',
  },
  joint: {
    line1: {
      part1: `You have said you do not want to continue with your ${
        isDivorce ? 'divorce' : 'application to end your civil partnership'
      }.
      If you want to withdraw your application then you need to jointly fill out a`,
      part2: 'D11 form',
      part3: 'and send it to the court. Details of where to send it are on the form.',
      link: 'https://www.gov.uk/government/publications/form-d11-application-notice',
    },
    continueAsSole: 'If you want to continue as a sole applicant',
    firstInTimeApplicant: {
      line1: `If you still want to ${
        isDivorce ? 'get divorced' : 'end your civil partnership'
      } but you do not think your
      ${partner} will confirm they want to continue, then you can change to a sole application.
      This means your ${partner} will become the respondent${isDivorce ? ' for the rest of the divorce' : ''}.`,
      line2: {
        part1: 'You should still',
        part2: 'continue to apply for a conditional order jointly.',
        link: `${isApplicant2 ? '/applicant2' : ''}/continue-with-your-application`,
      },
      line3: `If your ${partner} does not also apply within 2 weeks then you will then be able to change to a sole application online.
      You will receive an email with information on how to change your application, if they do not apply.`,
      line4: {
        part1: 'If you want to apply for a conditional order as a sole applicant now, then you need to',
        part2: 'download and fill out a D84 paper form.',
        link: 'https://www.gov.uk/government/publications/form-d84-application-for-a-decree-nisi-conditional-order-or-judicial-separation-decreeorder',
      },
      line5:
        'Details of where to post it are on the form. Your application will be lodged as soon as the form is received by the court but it could take up to three weeks to process the application. ' +
        'If you want to choose this option then you should exit the service.',
    },
    secondInTimeApplicant: {
      line1: {
        part1: `Your ${partner} has already confirmed they want to continue with your joint application.
        The quickest way for you to progress the ${isDivorce ? 'divorce' : 'ending of your civil partnership'}
        is for you to also `,
        part2: 'confirm you want to continue with your joint application.',
        link: `${isApplicant2 ? '/applicant2' : ''}/continue-with-your-application`,
      },
      line2: {
        part1: `If you want to change to a sole application then it will delay the ${
          isDivorce ? 'divorce' : 'ending of your civil partnership'
        }. You will have to make a separate application by`,
        part2: 'downloading and filling out a D84 paper form.',
        link: 'https://www.gov.uk/government/publications/form-d84-application-for-a-decree-nisi-conditional-order-or-judicial-separation-decreeorder',
      },
      line3:
        'Details of where to send it are on the form. You should exit the service and send in the form if you want to change to a sole application.',
      line4: `The quickest way to progress the ${isDivorce ? 'divorce' : 'ending of your civil partnership'}
      is to confirm you want to continue with your joint application.`,
    },
  },
  exitLink: 'Exit service',
});

const cy = ({ isDivorce }: CommonContent) => ({
  title: `Tynnu eich ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'} yn ôl`,
  sole: {
    line1: {
      part1: `Rydych wedi dweud nad ydych eisiau bwrw ymlaen â‘ch ${
        isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
      }.
      Os ydych eisiau tynnu eich cais yn ôl, yna mae angen i chi lenwi`,
      part2: 'ffurflen D11',
      part3: ' ar wahân a’i hanfon i’r llys. Mae manylion ar y ffurflen yn egluro i ble y dylid ei hanfon.',
      link: 'https://www.gov.uk/government/publications/form-d11-application-notice',
    },
    line2:
      'Os oes arnoch angen help gallwch gysylltu â’r llys gan ddefnyddio’r manylion isod. Ni all y staff cynorthwyol roi cyngor cyfreithiol i chi.',
  },
});

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
