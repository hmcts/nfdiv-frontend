import { getFormattedDate } from '../../../../app/case/answers/formatDate';
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { SupportedLanguages } from '../../../../modules/i18n';
import { CommonContent } from '../../../common/common.content';
import { InputLabelsByLanguage, ydwOrNacYdwRadioAnswers } from '../../../common/input-labels.content';

const en = ({ isDivorce, userCase, partner, referenceNumber }: CommonContent) => ({
  title: `Withdrawing this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `Reference number: ${referenceNumber}`,
  line2: `${
    isDivorce ? 'Divorce application' : 'Application to end your civil partnership'
  } submitted: ${getFormattedDate(userCase.dateSubmitted)}`,
  line3sole: `We have not sent your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } to your ${partner} yet. This means you can withdraw this application and receive a refund if the court confirms that you are due a refund.`,
  line3joint: `Either you or your ${partner} can withdraw this application. We will refund any fees you have paid if the court confirms that you are due a refund.`,
  warningText: `If you withdraw this application, you will lose access to your account. You will need to start a new application if you later decide that you want to get a ${
    isDivorce ? 'divorce' : 'dissolution'
  }.`,
  confirmWithdrawQuestion: 'Are you sure you want to withdraw this application?',
  confirmReason: 'If you want to, you can provide your reasons for withdrawing (optional)',
  errors: {
    confirmWithdrawApplication: {
      required: `Select yes if you want to withdraw your ${
        isDivorce ? 'divorce application' : 'application to end your civil partnership'
      }`,
    },
  },
});

const cy: typeof en = ({ isDivorce, userCase, partner, referenceNumber }: CommonContent) => ({
  title: `Tynnu’r ${isDivorce ? 'cais hwn am ysgariad' : 'cais hwn i ddod â’ch partneriaeth sifil i ben'} yn ôl`,
  line1: `Cyfeirnod: ${referenceNumber}`,
  line2: `${
    isDivorce ? 'Cais am ysgariad' : 'Cais i ddod â’ch partneriaeth sifil i ben'
  } wedi’i gyflwyno: ${getFormattedDate(userCase.dateSubmitted, SupportedLanguages.Cy)}`,
  line3sole: `Nid ydym wedi anfon eich ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } i’ch ${partner} eto. Mae hyn yn golygu y gallwch dynnu’r cais hwn yn ôl a derbyn ad-daliad os yw’r llys yn cadarnhau bod ad-daliad yn ddyledus i chi.`,
  line3joint: `Gallwch chi neu’ch ${partner} dynnu’r cais hwn yn ôl. Byddwn yn ad-dalu unrhyw ffioedd yr ydych wedi eu talu os bydd y llys yn cadarnhau bod ad-daliad yn ddyledus i chi.`,
  warningText: `Os byddwch yn tynnu’r cais hwn yn ôl, byddwch yn colli mynediad i’ch cyfrif. Byddwch angen dechrau cais newydd os byddwch yn penderfynu’n ddiweddarach eich bod yn dymuno cael ${
    isDivorce ? 'ysgariad' : 'diddymiad'
  }.`,
  confirmWithdrawQuestion: 'Ydych chi’n siŵr eich bod eisiau tynnu’r cais hwn yn ôl?',
  confirmReason: 'Os dymunwch, gallwch roi eich rhesymau dros dynnu yn ôl (dewisol)',
  errors: {
    confirmWithdrawApplication: {
      required: `Dewiswch ‘ydw’ os ydych eisiau tynnu eich ${
        isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil'
      } i ben yn ôl`,
    },
  },
});

export const form: FormContent = {
  fields: {
    confirmWithdrawApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.confirmWithdrawQuestion,
      values: [
        {
          label: l => l[YesOrNo.YES],
          id: 'yes',
          value: YesOrNo.YES,
          subFields: {
            withdrawApplicationReason: {
              type: 'textarea',
              label: l => l.confirmReason,
            },
          },
        },
        {
          label: l => l[YesOrNo.NO],
          id: 'no',
          value: YesOrNo.NO,
        },
      ],
      validator: value => isFieldFilledIn(value),
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

export const radioButtonAnswers: InputLabelsByLanguage<YesOrNo> = {
  en: {
    [YesOrNo.YES]: ydwOrNacYdwRadioAnswers.en[YesOrNo.YES],
    [YesOrNo.NO]: 'No (return to your account)',
  },
  cy: {
    [YesOrNo.YES]: ydwOrNacYdwRadioAnswers.cy[YesOrNo.YES],
    [YesOrNo.NO]: 'Nac ydw (dychwelwch i’ch cyfrif)',
  },
};

export const withdrawApplicationAnswers = ydwOrNacYdwRadioAnswers;

export const generateContent: TranslationFn = content => {
  const radioAnswers = radioButtonAnswers[content.language];
  return {
    ...languages[content.language](content),
    ...radioAnswers,
    form,
  };
};
