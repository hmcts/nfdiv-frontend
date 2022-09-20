import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SupportedLanguages } from '../../../modules/i18n';
import { CommonContent } from '../../common/common.content';
import { generateContent as columnGenerateContent } from '../hub-page/right-column/content';

const en = ({ isDivorce, partner, userCase }: CommonContent) => ({
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
  checkboxLine: `I want to ${isDivorce ? 'finalise my divorce' : 'end my civil partnership'}`,
  continue: 'Submit',
  errors: {
    doesApplicant1WantToApplyForFinalOrder: {
      required:
        'You cannot continue without selecting the checkbox. If you do not want to continue then save and sign out.',
    },
  },
});

const cy: typeof en = ({ isDivorce, partner, userCase }: CommonContent) => ({
  title: `Ydych chi eisiau ${isDivorce ? 'cadarnhau eich ysgariad' : "dod â'ch partneriaeth sifil i ben"}?`,
  line1: `Bydd eich ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  } yn dod i ben yn gyfreithiol pan wneir y gorchymyn terfynol. Gallai hyn effeithio ar eich sefyllfa ariannol.`,
  warningText: `Os nad ydych wedi gorffen cynnal trafodaethau am eich arian, eiddo neu asedau eraill yna dylech ofyn am gyngor cyfreithiol cyn
  ${isDivorce ? 'cadarnhau eich ysgariad' : 'dod â’ch partneriaeth sifil i ben'}.`,
  readMore: {
    subHeader: `Os ydych eisiau sortio eich sefyllfa ariannol cyn ${
      isDivorce ? 'cadarnhau eich ysgariad' : 'dod â’ch partneriaeth sifil i ben'
    }`,
    line1: 'Dylech gadw’r cais ac allgofnodi, a sortio eich sefyllfa ariannol cyn gwneud cais am orchymyn terfynol.',
    line2: `Os nad ydych wedi gwneud cais erbyn ${getFormattedDate(
      userCase.dateFinalOrderEligibleToRespondent,
      SupportedLanguages.Cy
    )} yna bydd eich ${partner} yn gallu gwneud cais.
    Mae’n bosib y bydd yn rhaid i’r ddau ohonoch ddod i wrandawiad llys, os byddant yn gwneud cais.`,
    line3:
      "Os byddwch yn disgwyl blwyddyn cyn gwneud cais yna bydd angen i chi egluro’r rhesymau dros yr oedi i'r llys.",
  },
  checkboxLine: `Rwyf eisiau ${isDivorce ? 'cadarnhau fy ysgariad' : "dod â'm partneriaeth sifil i ben"}`,
  continue: 'Cyflwyno',
  errors: {
    doesApplicant1WantToApplyForFinalOrder: {
      required:
        'Ni allwch barhau heb ddewis opsiwn o’r blwch ticio. Os nad ydych eisiau parhau yna dylech gadw’r cais ac allgofnodi.',
    },
  },
});

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
  return {
    ...translations,
    ...columnGenerateContent(content),
    form,
  };
};
