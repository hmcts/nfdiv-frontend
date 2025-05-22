import config from 'config';

import { NoResponseProcessServerOrBailiff } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'In person service by process server or court bailiff',
  line1: `You can have the papers served on your ${partner} in person, either by a process server or a county court bailiff.`,
  processServerService: {
    header: 'Service by a process server',
    details: {
      line1:
        'A process server is an independent third party who is professionally trained to deliver court documents by hand to the recipient.',
      line2:
        'Process servers may be more flexible as to where and when they can serve documents, and can deliver to addresses outside of England and Wales. Using a process server is usually much quicker than requesting for bailiff service.',
      line3:
        'If you need to send the documents to an international address, you may need to seek legal advice so you can tell the process server what types of service are legal in that country.',
      line4:
        'Process servers will charge you a fee to serve documents, normally between £50 - £200 depending on which process server you choose.',
      line5: `You will need to find a process server yourself. We will send you the ${
        isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
      }, so that you can give them to the process server to serve on your behalf.`,
    },
  },
  courtBailiffService: {
    header: 'Service by court bailiff',
    details: {
      line1: `A bailiff of the county court will serve the papers on your ${partner} by hand.`,
      line2:
        'Court bailiffs can only serve your papers to an address in England or Wales where postal delivery has already been tried.',
      line3: `There is a fee of ${getFee(
        config.get('fees.courtBailiffService')
      )} for bailiff service, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
        'govukUrls.getHelpWithCourtFees'
      )}">get help paying this fee (opens in a new tab)</a>.`,
      line4: 'Due to the high demand, service by court bailiff could take a long time.',
    },
  },
  howToProceedHeader: 'How would you like to proceed?',
  processServer: 'I want to arrange for service by a process server',
  bailiffService: 'I want to request bailiff service',
  errors: {
    noResponseProcessServerOrBailiff: {
      required: 'You must choose an option to progress your application.',
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'In person service by process server or court bailiff',
  line1: `You can have the papers served on your ${partner} in person, either by a process server or a county court bailiff.`,
  processServerService: {
    header: 'Service by a process server',
    details: {
      line1:
        'A process server is an independent third party who is professionally trained to deliver court documents by hand to the recipient.',
      line2:
        'Process servers may be more flexible as to where and when they can serve documents, and can deliver to addresses outside of England and Wales. Using a process server is usually much quicker than requesting for bailiff service.',
      line3:
        'If you need to send the documents to an international address, you may need to seek legal advice so you can tell the process server what types of service are legal in that country.',
      line4:
        'Process servers will charge you a fee to serve documents, normally between £50 - £200 depending on which process server you choose.',
      line5: `You will need to find a process server yourself. We will send you the ${
        isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
      }, so that you can give them to the process server to serve on your behalf.`,
    },
  },
  courtBailiffService: {
    header: 'Service by court bailiff',
    details: {
      line1: `A bailiff of the county court will serve the papers on your ${partner} by hand.`,
      line2:
        'Court bailiffs can only serve your papers to an address in England or Wales where postal delivery has already been tried.',
      line3: `There is a fee of ${getFee(
        config.get('fees.courtBailiffService')
      )} for bailiff service, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
        'govukUrls.getHelpWithCourtFees'
      )}">get help paying this fee (opens in a new tab)</a>.`,
      line4: 'Due to the high demand, service by court bailiff could take a long time.',
    },
  },
  howToProceedHeader: 'How would you like to proceed?',
  processServer: 'I want to arrange for service by a process server',
  bailiffService: 'I want to request bailiff service',
  errors: {
    noResponseProcessServerOrBailiff: {
      required: 'You must choose an option to progress your application.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponseProcessServerOrBailiff: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.howToProceedHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.processServer,
          id: 'processServer',
          value: NoResponseProcessServerOrBailiff.PROCESS_SERVER,
        },
        {
          label: l => l.bailiffService,
          id: 'bailiffService',
          value: NoResponseProcessServerOrBailiff.COURT_BAILIFF,
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);

  return {
    ...translations,
    form,
  };
};
