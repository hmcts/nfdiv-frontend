import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Dividing your money and property',
  line1: `It's important that you settle how to divide your money and property before the end of the ${
    isDivorce ? 'divorce process' : 'process to end your civil partnership'
  }. Otherwise you or your ${partner} could make financial claims against each other, after the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } is ended. Even if you have kept your finances separate during the ${isDivorce ? 'marriage' : 'civil partnership'}.
  The way to settle your finances is by applying to the court for a 'financial order'.`,
  line2: `A financial order is a legal document that describes how you are going to split your money, property, pensions and other assets. You need a financial order whether
  you can reach agreement with your ${partner} or whether you want the court to decide for you.`,
  line3: `You need to apply for a financial order separately to the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }. You will pay an additional fee when you apply (unless you are eligible for help with fees). The court will deal with it separately to the main ${
    isDivorce ? 'divorce process' : 'process to end your civil partnership'
  }.
  You will probably need legal advice when applying for a financial order.`,
  line4: `For legal reasons, the court needs confirmation now that you want to apply. You will receive an email with more information after you have submitted this application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  }.`,
  noSelectedWarning: `It's important to have a financial order in place by the time your ${
    isDivorce ? 'divorce is finalised' : 'civil partnership is legally ended'
  }.
  Otherwise you or your ${partner} could make claims on each other's finances, after the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } is ended.
  Even if you have kept your finances separate during the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }. If you select yes, then you do not have to go ahead with the application or pay any additional fees. It just gives you the option to apply later in the process, should you want&nbsp;to.`,
  doYouWantToApplyForFinancialOrder: 'Do you want to apply for a financial order?',
  yes: 'Yes, I want to apply for a financial order',
  no: 'No, I do not want to apply for a financial order',
});

const cy: typeof en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Dividing your money and property',
  line1: `It's important that you settle how to divide your money and property before the end of the ${
    isDivorce ? 'divorce process' : 'process to end your civil partnership'
  }. Otherwise you or your ${partner} could make financial claims against each other, after the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } is ended. Even if you have kept your finances separate during the ${isDivorce ? 'marriage' : 'civil partnership'}.
  The way to settle your finances is by applying to the court for a 'financial order'.`,
  line2: `A financial order is a legal document that describes how you are going to split your money, property, pensions and other assets. You need a financial order whether
  you can reach agreement with your ${partner} or whether you want the court to decide for you.`,
  line3: `You need to apply for a financial order separately to the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }. You will pay an additional fee when you apply (unless you are eligible for help with fees). The court will deal with it separately to the main ${
    isDivorce ? 'divorce process' : 'process to end your civil partnership'
  }.
  You will probably need legal advice when applying for a financial order.`,
  line4: `For legal reasons, the court needs confirmation now that you want to apply. You will receive an email with more information after you have submitted this application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  }.`,
  noSelectedWarning: `It's important to have a financial order in place by the time your ${
    isDivorce ? 'divorce is finalised' : 'civil partnership is legally ended'
  }.
  Otherwise you or your ${partner} could make claims on each other's finances, after the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } is ended.
  Even if you have kept your finances separate during the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }. If you select yes, then you do not have to go ahead with the application or pay any additional fees. It just gives you the option to apply later in the process, should you want&nbsp;to.`,
  doYouWantToApplyForFinancialOrder: 'Do you want to apply for a financial order?',
  yes: 'Yes, I want to apply for a financial order',
  no: 'No, I do not want to apply for a financial order',
});

export const form: FormContent = {
  fields: {
    applicant1ApplyForFinancialOrder: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouWantToApplyForFinancialOrder,
      labelHidden: true,
      hint: l => l.hint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          conditionalText: l => `<p class="govuk-label">${l.noSelectedWarning}</p>`,
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
