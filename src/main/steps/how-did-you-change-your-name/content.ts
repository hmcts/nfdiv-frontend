import { ChangedNameHow } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ required }) => ({
  title: 'How did you change your name?',
  line1: 'The court needs to know how you changed your name so it knows which document to check.',
  sendingOffMarriageCertificate: 'By sending off my marriage certificate',
  deedPoll: 'By deed poll or ‘statutory declaration’',
  deedPollMoreDetails:
    'The court needs to see the deed poll or ‘statutory declaration’ document. You can upload a photo or scan later in this application, or you can post it.',
  anotherWay: 'Another way',
  anotherWayMoreDetails:
    'Provide details of when and how you changed your name. You will be asked to upload a photo or scan of the documents that prove you changed your name later in this application, or you can post them in. If you do not have any documents, explain why here.',
  errors: {
    changedNameHow: {
      required,
    },
    changedNameHowAnotherWay: {
      required:
        'You have said you changed your name another way but not provided details. Provide details of how you changed your name.',
    },
  },
});

const cy = ({ required }) => ({
  ...en({ required }),
});

export const form: FormContent = {
  fields: {
    changedNameHow: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.sendingOffMarriageCertificate, value: ChangedNameHow.MarriageCertificate },
        {
          label: l => l.deedPoll,
          value: ChangedNameHow.DeedPoll,
          conditionalText: l => `<p class="govuk-label">${l.deedPollMoreDetails}</p>`,
        },
        {
          label: l => l.anotherWay,
          value: ChangedNameHow.Other,
          subFields: {
            changedNameHowAnotherWay: {
              type: 'textarea',
              label: l => l.anotherWayMoreDetails,
              classes: 'govuk-label',
              validator: isFieldFilledIn,
            },
          },
        },
      ],
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
