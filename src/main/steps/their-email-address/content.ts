import { Case, Checkbox } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { doesNotKnowEmail, isEitherFieldsFilledIn, isEmailValid } from '../../app/form/validation';

const en = ({ partner }) => ({
  title: `Enter your ${partner}'s email address`,
  line1:
    'It’s important you provide their email address so the court can ‘serve’ (deliver) documents to them online. If you do not provide an email address, the divorce papers will be served (delivered) by post. The emails will also contain information and updates relating to the divorce.',
  line2: 'If you use their work email address, you should ask their permission first.',
  respondentEmailAddress: `Your ${partner}'s email address`,
  doNotKnowRespondentEmailAddress: 'I do not know their email address',
  errors: {
    respondentEmailAddress: {
      required:
        'You have not entered their email address or said you do not know it. You have to do one or the other before continuing.',
      incorrect:
        'You have entered an email address and indicated that you do not know their email address. You can only do one before continuing.',
      invalid: 'You have entered an invalid email address. Check it and enter it again before continuing.',
    },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    respondentEmailAddress: {
      type: 'text',
      label: l => l.respondentEmailAddress,
      allDataValidator: true,
      validator: data => {
        const validation = isEitherFieldsFilledIn(data as Partial<Case>) || doesNotKnowEmail(data as Partial<Case>);
        if ((data as Partial<Case>).doNotKnowRespondentEmailAddress !== Checkbox.Checked) {
          return validation || isEmailValid((data as Partial<Case>).respondentEmailAddress);
        }
        return validation;
      },
    },
    doNotKnowEmailAddress: {
      type: 'checkboxes',
      values: [
        {
          name: 'doNotKnowRespondentEmailAddress',
          label: l => l.doNotKnowRespondentEmailAddress,
          value: Checkbox.Checked,
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
    form,
  };
};
