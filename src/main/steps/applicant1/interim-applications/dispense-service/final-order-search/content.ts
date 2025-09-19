import config from 'config';

import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Check for an existing ${isDivorce ? 'decree absolute or ' : ''}final order`,
  line1: `If you have not heard from your ${partner} for more than 2 years you may need to check to see if they have already ${
    isDivorce ? 'divorced you' : 'ended your civil partnership'
  }.`,
  line2: `You can apply online to the Central Family Court to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.searchForDecreeAbsoluteOrFinalOrder'
  )}">search for a ${isDivorce ? 'decree absolute or ' : ''}final order (opens in a new tab)</a>.`,
  line3: `It costs ${getFee(config.get('fees.searchGovRecords'))} for each 10 year period you search.`,
  line4: "You'll need to search from the last date you heard from them.",
  line5: `If a ${isDivorce ? 'decree absolute or a ' : ''}final order is found, ${
    isDivorce ? 'you are already divorced and' : 'your civil partnership is already ended and you'
  } do not need to continue this application.`,
  line6: `If the court cannot find a ${
    isDivorce ? 'decree absolute or a ' : ''
  }final order, you'll get a ‘no trace’ certificate which you can upload as evidence to progress your application.`,
  haveSearchedFinalOrderHeader: `Have you searched for an existing ${
    isDivorce ? 'decree absolute or ' : ''
  }final order?`,
  finalOrderSearchHint: 'You will need to upload your no trace certificate at the end of this application.',
  whyNoFinalOrderSearchHeader: 'Explain why you have not requested a search',
  errors: {
    applicant1DispenseHaveSearchedFinalOrder: {
      required: `Select yes if you have already searched for an existing ${
        isDivorce ? 'decree absolute or ' : ''
      }final order`,
    },
    applicant1DispenseWhyNoFinalOrderSearch: {
      required: 'Enter details about why you have not requested a search',
    },
  },
});

// @TODO translations
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: `Check for an existing ${isDivorce ? 'decree absolute or ' : ''}final order`,
  line1: `If you have not heard from your ${partner} for more than 2 years you may need to check to see if they have already ${
    isDivorce ? 'divorced you' : 'ended your civil partnership'
  }.`,
  line2: `You can apply online to the Central Family Court to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.searchForDecreeAbsoluteOrFinalOrder'
  )}">search for a ${isDivorce ? 'decree absolute or ' : ''}final order (opens in a new tab)</a>.`,
  line3: `It costs ${getFee(config.get('fees.searchGovRecords'))} for each 10 year period you search.`,
  line4: "You'll need to search from the last date you heard from them.",
  line5: `If a ${isDivorce ? 'decree absolute or a ' : ''}final order is found, ${
    isDivorce ? 'you are already divorced and' : 'your civil partnership is already ended and you'
  } do not need to continue this application.`,
  line6: `If the court cannot find a ${
    isDivorce ? 'decree absolute or a ' : ''
  }final order, you'll get a ‘no trace’ certificate which you can upload as evidence to progress your application.`,
  haveSearchedFinalOrderHeader: `Have you searched for an existing ${
    isDivorce ? 'decree absolute or ' : ''
  }final order?`,
  finalOrderSearchHint: 'You will need to upload your no trace certificate at the end of this application.',
  whyNoFinalOrderSearchHeader: 'Explain why you have not requested a search',
  errors: {
    applicant1DispenseHaveSearchedFinalOrder: {
      required: `Select yes if you have already searched for an existing ${
        isDivorce ? 'decree absolute or ' : ''
      }final order`,
    },
    applicant1DispenseWhyNoFinalOrderSearch: {
      required: 'Enter details about why you have not requested a search',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseHaveSearchedFinalOrder: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.haveSearchedFinalOrderHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
          conditionalText: l => `<p class="govuk-label">${l.finalOrderSearchHint}</p>`,
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
          subFields: {
            applicant1DispenseWhyNoFinalOrderSearch: {
              type: 'textarea',
              label: l => l.whyNoFinalOrderSearchHeader,
              labelHidden: true,
              hint: l => l.whyNoFinalOrderSearchHeader,
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
