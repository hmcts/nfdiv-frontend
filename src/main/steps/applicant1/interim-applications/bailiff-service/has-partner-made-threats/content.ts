import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: `Has your ${partner} ever made verbal or written threats against you, either generally or specifically in relation to the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }?`,
  enterMadeThreatsDetailsLabel: 'Provide details of any incidents',
  errors: {
    applicant1BailiffHasPartnerMadeThreats: {
      required: 'Select "Yes" if your partner has ever made verbal or written threats against you.',
    },
    applicant1BailiffPartnerThreatsDetails: {
      required: 'Enter details of any incidents of verbal or written threats.',
    },
  },
});

const cy: typeof en = ({ partner, isDivorce }: CommonContent) => ({
  title: `A yw eich ${partner} wedi gwneud unrhyw fygythiadau ar lafar neu ysgrifenedig yn eich erbyn chi, naill ai’n gyffredinol neu’n benodol mewn perthynas â’r ${
    isDivorce ? 'cais ysgariad' : 'cais i ddod â’r bartneriaeth sifil i ben'
  }?`,
  enterMadeThreatsDetailsLabel: 'Rhowch fanylion unrhyw ddigwyddiadau',
  yes: 'Ydy',
  no: 'Nac ydy',
  errors: {
    applicant1BailiffHasPartnerMadeThreats: {
      required: `Dewiswch “Ydy” os yw eich ${partner} erioed wedi gwneud bygythiadau ar lafar neu’n ysgrifenedig yn eich erbyn chi`,
    },
    applicant1BailiffPartnerThreatsDetails: {
      required: 'Rhowch fanylion unrhyw achosion o fygythiadau ar lafar neu’n ysgrifenedig.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffHasPartnerMadeThreats: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNoOrNotKnown.YES,
          id: 'yes',
          subFields: {
            applicant1BailiffPartnerThreatsDetails: {
              type: 'textarea',
              label: l => l.enterMadeThreatsDetailsLabel,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
        { label: l => l.no, value: YesOrNoOrNotKnown.NO, id: 'no' },
        { label: l => l.notKnown, value: YesOrNoOrNotKnown.NOT_KNOWN, id: 'notKnown' },
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
