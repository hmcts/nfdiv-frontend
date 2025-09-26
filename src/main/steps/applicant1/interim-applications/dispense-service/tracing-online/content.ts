import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ partner }: CommonContent) => ({
  title: `Tracing your ${partner} online`,
  line1: `You could consider using online people finding services to find your ${partner}'s details.`,
  line2: `If you can find your ${partner}'s address or contact details, you could try <a class="govuk-link" target="_blank" href="${HUB_PAGE}">progressing your application in another way (opens in new tab)</a>.`,
  triedTracingOnlineHeader: `Have you tried tracing your ${partner} online?`,
  whyNoTracingOnlineHeader: `Explain why you have not tried tracing your ${partner} online`,
  yes: 'Yes',
  no: 'No',
  errors: {
    applicant1DispenseTriedTracingOnline: {
      required: `Select yes if you have tried tracing your ${partner} online`,
    },
    applicant1DispenseWhyNoTracingOnline: {
      required: `Enter details about why you have not tried tracing your ${partner} online`,
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Olrhain eich ${partner} ar-lein`,
  line1: `Gallech ystyried defnyddio gwasanaethau dod o hyd i bobl ar-lein i ddod o hyd i fanylion eich ${partner}.`,
  line2: `Os gallwch ddod o hyd i gyfeiriad neu fanylion cyswllt eich ${partner} gallech geisio <a class="govuk-link" target="_blank" href="${HUB_PAGE}">symud eich cais ymlaen mewn ffordd arall (yn agor mewn tab newydd)</a>.`,
  triedTracingOnlineHeader: `A ydych wedi ceisio olrhain eich ${partner} ar-lein?`,
  whyNoTracingOnlineHeader: `Eglurwch pam nad ydych wedi ceisio olrhain eich ${partner} ar-lein`,
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    applicant1DispenseTriedTracingOnline: {
      required: `Dewiswch “Ydw” os ydych wedi ceisio olrhain eich ${partner} ar-lein`,
    },
    applicant1DispenseWhyNoTracingOnline: {
      required: `Eglurwch pam nad ydych wedi ceisio olrhain eich ${partner} ar-lein`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseTriedTracingOnline: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.triedTracingOnlineHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
          subFields: {
            applicant1DispenseWhyNoTracingOnline: {
              type: 'textarea',
              label: l => l.whyNoTracingOnlineHeader,
              labelHidden: true,
              hint: l => l.whyNoTracingOnlineHeader,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
