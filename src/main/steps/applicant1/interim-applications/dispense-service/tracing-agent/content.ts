import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ partner }: CommonContent) => ({
  title: 'Tracing Agents',
  line1: `You could consider employing a tracing agent to try to find your ${partner}'s whereabouts or their contact details.`,
  line2: `If your tracing agent can find up to date contact details, you can use those to <a class="govuk-link" target="_blank" href="${HUB_PAGE}">progress your application another way (opens in new tab)</a>. You do not need to continue your application to dispense with service.`,
  line3: `If your tracing agent fails to find your ${partner}, they should contact you with the results of any searches they do, which you can use as evidence.`,
  yes: 'Yes',
  no: 'No',
  triedTracingAgentHeader: `Have you tried using a tracing agent to find your ${partner}?`,
  whyNoTracingAgentHeader: 'Explain why you have not used a tracing agent',
  errors: {
    applicant1DispenseTriedTracingAgent: {
      required: `Select yes if you have tried using a tracing agent to find your ${partner}`,
    },
    applicant1DispenseWhyNoTracingAgent: {
      required: 'Enter details about why you have not used a tracing agent',
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: 'Asiantau olrhain',
  line1: `Gallech ystyried defnyddio asiant olrhain i ddod o hyd i leoliad eich ${partner} neu eu manylion cyswllt.`,
  line2: `Os gall yr asiant olrhain ddod o hyd i fanylion cyswllt diweddaraf, gallwch eu defnyddio i <a class="govuk-link" target="_blank" href="${HUB_PAGE}">symud ymlaen gyda’ch cais mewn ffordd arall (agor mewn tab newydd)</a>. Nid ydych angen parhau gyda’ch cais i hepgor cyflwyno.`,
  line3: `Os bydd eich asiant olrhain yn methu dod o hyd i’ch ${partner}, dylent gysylltu â chi gyda chanlyniadau unrhyw chwiliadau a wneir ganddynt, y gallwch eu defnyddio fel tystiolaeth.`,
  yes: 'Ydw',
  no: 'Nac ydw',
  triedTracingAgentHeader: `A ydych wedi ceisio defnyddio asiant olrhain i ddod o hyd i’ch ${partner}?`,
  whyNoTracingAgentHeader: 'Eglurwch pam nad ydych wedi defnyddio asiant olrhain',
  errors: {
    applicant1DispenseTriedTracingAgent: {
      required: `Dewiswch “Ydw” os ydych wedi ceisio defnyddio asiant olrhain i ddod o hyd i’ch ${partner}`,
    },
    applicant1DispenseWhyNoTracingAgent: {
      required: 'Eglurwch pam nad ydych wedi defnyddio asiant olrhain',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseTriedTracingAgent: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.triedTracingAgentHeader,
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
            applicant1DispenseWhyNoTracingAgent: {
              type: 'textarea',
              label: l => l.whyNoTracingAgentHeader,
              labelHidden: true,
              hint: l => l.whyNoTracingAgentHeader,
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
