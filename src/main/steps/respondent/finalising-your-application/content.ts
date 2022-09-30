import config from 'config';

import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: isDivorce ? 'Finalising your divorce' : 'Ending your civil partnership',
  line1: `It’s usually quicker if your ${partner} applies for the final order. This is because they are the applicant. You can save and sign out and ask them to apply, if it’s safe to do so. `,
  line2: `If your ${partner} will not or cannot apply to ${
    isDivorce ? 'finalise the divorce' : 'end the civil partnership'
  }, then you can apply instead. You will need to apply for permission because you are the ‘respondent’ in the ${
    isDivorce ? 'divorce process' : 'process to end the civil partnership'
  }. You will also need to pay an application fee of ${getFee(
    config.get('fees.finalOrderApplicationFee')
  )}, unless you are eligible for Help With Fees. Your application for a final order will then be reviewed by a judge. You may have to come to a court hearing.`,
  line3: `If you have not finished negotiations about your money, property or other assets then you should seek legal advice before applying to finalise ${
    isDivorce ? 'your divorce' : 'ending your civil partnership'
  }. `,
  iWantPermissionToApply: `I want permission to apply for a final order, and to ${
    isDivorce ? 'finalise my divorce' : 'end my civil partnership'
  }`,
  explainWhy: 'Explain why you need to apply for the final order',
  line4: `If permission to apply for a final order is granted, then your application for a final order will also be considered. If the final order is made, then your ${
    isDivorce ? 'marriage' : 'civil partnership'
  } will be legally ended.`,
  continue: 'Submit',
  errors: {
    doesApplicant2WantToApplyForFinalOrder: {
      required:
        'You cannot continue without selecting the checkbox. If you do not want to continue then save and sign out.',
    },
    applicant2FinalOrderExplanation: {
      required: 'You need to explain why you are applying for the final order before continuing.',
    },
  },
});

const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: isDivorce ? 'Cadarnhau eich ysgariad' : 'Dod â’ch partneriaeth sifil i ben',
  line1: `Fel arfer, mae’n gynt os bydd eich ${partner} yn gwneud cais am orchymyn terfynol. Mae hyn oherwydd mai nhw yw’r ceisydd. Gallwch gadw’r cais ac allgofnodi a gofyn iddynt wneud cais, os yw’n ddiogel i wneud hynny.`,
  line2: `Os na fydd eich ${partner} yn gwneud cais i ${
    isDivorce ? 'gadarnhau’r ysgariad' : 'ddod â’ch partneriaeth sifil i ben'
  }, yna gallwch chi wneud cais yn lle. Bydd angen i chi wneud cais am ganiatâd oherwydd mai chi yw'r 'atebydd' yn y ${
    isDivorce ? 'broses ysgariad' : "broses i ddod â'r bartneriaeth sifil i ben"
  }. Bydd hefyd angen i chi dalu ffi ymgeisio o ${getFee(
    config.get('fees.finalOrderApplicationFee')
  )}, oni bai eich bod yn gymwys i gael Help i Dalu Ffioedd. Yna bydd eich cais am orchymyn terfynol yn cael ei adolygu gan farnwr. Efallai y bydd yn rhaid i chi ddod i wrandawiad llys.`,
  line3: `Os nad ydych wedi gorffen cynnal trafodaethau am eich arian, eiddo neu asedau eraill, yna dylech ofyn am gyngor cyfreithiol cyn gwneud cais i gadarnhau ${
    isDivorce ? 'eich ysgariad' : "dod â'ch partneriaeth sifil i ben"
  }. `,
  iWantPermissionToApply: `Rwyf eisiau caniatâd i wneud cais am orchymyn terfynol, ac i ${
    isDivorce ? 'gadarnhau fy ysgariad' : "ddod â'm mhartneriaeth sifil i ben"
  }`,
  explainWhy: 'Esboniwch pam fod angen i chi wneud cais am orchymyn terfynol',
  line4: `Os caniateir i chi wneud cais am orchymyn terfynol, yna bydd eich cais am orchymyn terfynol hefyd yn cael ei ystyried. Os gwneir y gorchymyn terfynol, yna bydd eich ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  } yn dod i ben yn gyfreithiol.`,
  continue: 'Cyflwyno',
  errors: {
    doesApplicant2WantToApplyForFinalOrder: {
      required:
        'Ni allwch barhau heb ddewis opsiwn o’r blwch ticio. Os nad ydych eisiau parhau yna dylech gadw’r cais ac allgofnodi.',
    },
    applicant2FinalOrderExplanation: {
      required: 'Mae angen i chi egluro pam eich bod yn gwneud cais am y gorchymyn terfynol cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    doesApplicant2WantToApplyForFinalOrder: {
      type: 'checkboxes',
      label: l => l.iWantPermissionToApply,
      labelHidden: true,
      values: [
        {
          name: 'doesApplicant2WantToApplyForFinalOrder',
          label: l => l.iWantPermissionToApply,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
    applicant2FinalOrderExplanation: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.explainWhy,
      labelSize: 'm',
      validator: isFieldFilledIn,
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
    form,
  };
};
