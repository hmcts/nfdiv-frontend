import { getFormattedDate } from '../../../../app/case/answers/formatDate';
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

const en = ({ isDivorce, userCase, partner, referenceNumber }: CommonContent) => ({
  title: `Withdrawing this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `Reference number: ${referenceNumber}`,
  line2: `${
    isDivorce ? 'Divorce application' : 'Application to end your civil partnership'
  } submitted: ${getFormattedDate(userCase.dateSubmitted)}`,
  line3: `We have not sent your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } to your ${partner} yet. This means you can withdraw this application and receive a refund`,
  warningText: `If you withdraw this application, you will lose access to your account. You will need to start a new application if you later decide that you want to get a ${
    isDivorce ? 'divorce' : 'dissolution'
  }.`,
  confirmWithdrawQuestion: 'Are you sure you want to withdraw this application?',
  confirmReason: 'Reason for withdrawing the application',
  noLabel: 'No (return to your account)',
});

const cy: typeof en = ({ isDivorce, userCase, partner, referenceNumber }: CommonContent) => ({
  title: `Withdrawing this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `Reference number: ${referenceNumber}`,
  line2: `${
    isDivorce ? 'Divorce application' : 'Application to end your civil partnership'
  } submitted: ${getFormattedDate(userCase.dateSubmitted)}`,
  line3: `We have not sent your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } to your ${partner} yet. This means you can withdraw this application and receive a refund`,
  warningText: `If you withdraw this application, you will lose access to your account. You will need to start a new application if you later decide that you want to get a ${
    isDivorce ? 'divorce' : 'dissolution'
  }.`,
  confirmWithdrawQuestion: 'Are you sure you want to withdraw this application?',
  confirmReason: 'Reason for withdrawing the application',
  noLabel: 'No (return to your account)',
});

export const form: FormContent = {
  fields: {
    confirmWithdrawApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.confirmWithdrawQuestion,
      values: [
        {
          label: l => l.yes,
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
          label: l => l.noLabel,
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

export const generateContent: TranslationFn = content => {
  return {
    ...languages[content.language](content),
    form,
  };
};
