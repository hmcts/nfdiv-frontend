import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `How to ${isDivorce ? 'finalise your divorce' : 'end your civil partnership'}`,
  line1: `The quickest way to ${
    isDivorce ? 'finalise your divorce' : 'end your civil partnership'
  } is to ask your ${partner} to confirm your joint application for a final order. They have been emailed details of how to do this.`,
  line2: `If they will not confirm then you can apply for a final order as a sole applicant. First your ${partner} needs to be given 2 week’s notice that you are intending to apply. This is so they are aware that the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } is about to be legally ended.`,
  confirmIntendToSwitchToSoleFo: `I intend to apply for a final order as sole applicant and I want the court to notify my ${partner}`,
  errors: {
    applicant1IntendsToSwitchToSole: {
      required: 'You have not answered the question. You need to select an answer before continuing.',
    },
  },
});

const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Sut i ${isDivorce ? 'gadarnhau eich ysgariad' : 'ddod â’ch partneriaeth sifil i ben'}`,
  line1: `Y ffordd gyflymaf i ${
    isDivorce ? 'gadarnhau eich ysgariad' : 'ddod a’ch partneriaeth sifil i ben'
  } yw gofyn i’ch ${partner} gadarnhau eich cais ar y cyd am orchymyn terfynol. Maent wedi cael e-bost yn egluro sut mae gwneud hyn.`,
  line2: `Os na fyddant yn cadarnhau, yna gallwch wneud cais am orchymyn terfynol fel unig geisydd. Yn gyntaf, rhaid rhoi rhybudd o 2 wythnos i’ch ${partner} eich bod yn bwriadu gwneud cais er mwyn iddynt fod yn ymwybodol bod y ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  } ar fin dod i ben yn gyfreithiol.`,
  confirmIntendToSwitchToSoleFo: `Rwy’n bwriadu gwneud cais am orchymyn terfynol fel unig geisydd ac rwyf eisiau i’r llys hysbysu fy ${partner}`,
  errors: {
    applicant1IntendsToSwitchToSole: {
      required: 'Nid ydych wedi ateb y cwestiwn. Mae angen ichi ddewis ateb cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1IntendsToSwitchToSole: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'applicant1IntendsToSwitchToSole',
          label: l => l.confirmIntendToSwitchToSoleFo,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.confirm,
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
