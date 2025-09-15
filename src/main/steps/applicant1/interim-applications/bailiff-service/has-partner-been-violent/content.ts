import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Your ${partner}'s history`,
  line1: `We will now ask you a few questions about your ${partner}'s history. This is to help the bailiff decide whether it is safe to deliver the papers to them.`,
  everBeenViolentQuestionLabel: `Has your ${partner} ever been violent or been convicted of a violent offence?`,
  enterPartnerViolenceDetailsLabel: 'Provide details of any incidents',
  errors: {
    applicant1BailiffHasPartnerBeenViolent: {
      required: `Select "Yes" if your ${partner} has ever been violent or convicted of a violent offence.`,
    },
    applicant1BailiffPartnerViolenceDetails: {
      required: 'Enter details of any incidents of violence.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Hanes eich ${partner}`,
  line1: `Byddwn ni nawr yn gofyn ambell gwestiwn am hanes eich ${partner}. Mae hyn i helpu’r beili benderfynu pa un a yw’n ddiogel i gyflwyno’r papurau iddyn nhw.`,
  everBeenViolentQuestionLabel: `A yw eich ${partner} erioed wedi bod yn dreisgar neu wedi cael ei gyhuddo/ei chyhuddo o drosedd treisgar?`,
  enterPartnerViolenceDetailsLabel: 'Rhowch fanylion unrhyw ddigwyddiadau',
  yes: 'Ydy',
  no: 'Nac ydy',
  errors: {
    applicant1BailiffHasPartnerBeenViolent: {
      required: `Dewiswch "Ydy" os yw eich ${partner} erioed wedi bod yn dreisgar neu wedi cael ei gyhuddo/chyhuddo o drosedd treisgar.`,
    },
    applicant1BailiffPartnerViolenceDetails: {
      required: 'Rhowch fanylion unrhyw achosion o drais',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffHasPartnerBeenViolent: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.everBeenViolentQuestionLabel,
      values: [
        {
          label: l => l.yes,
          value: YesOrNoOrNotKnown.YES,
          id: 'yes',
          subFields: {
            applicant1BailiffPartnerViolenceDetails: {
              type: 'textarea',
              label: l => l.enterPartnerViolenceDetailsLabel,
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
