import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Dividing your money and property',
  line1: `It’s important that you sort out how to divide your money and property before the end of the ${
    isDivorce ? 'divorce process' : 'process to end your civil partnership'
  }. Otherwise, you or your ${partner} may be able to make financial claims against each other, after the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } is ended. Even if you have kept your finances separate during the ${isDivorce ? 'marriage' : 'civil partnership'}.`,
  line2: `The court can make what’s known as a 'financial order'. A financial order is a legal document that describes how you are going to split your money, property, pensions and other assets. You need a financial order whether
  you can reach agreement with your ${partner} or whether you want the court to decide for you.`,
  ifYouAgreeHeading: 'If you agree',
  line3: `If you and your ${partner} agree on how you will divide your financial assets, you can make this agreement legally binding by asking the court to make a ‘financial order by consent’. This is also known as a ‘consent order’. It is usually more straightforward and less expensive if you can reach an agreement on how to divide your money and property.`,
  ifYouNeedHelpAgreeingHeading: 'If you need help agreeing',
  line4:
    'There are ways to help you agree on how you will divide your financial assets outside of court. These are sometimes known as ‘non-court dispute resolution’ (NCDR). <a target="_blank" href="https://www.advicenow.org.uk/get-help/family-and-children/divorce-and-separation/what-do-applying-financial-order-when-you-get">Further information about the types of NCDR options available to you can be obtained from Advicenow (opens in a new tab).</a>',
  line5: `If you and your ${partner} disagree, you can also ask the court to decide for you. This is known as making a financial remedies application. The court will expect that you have tried to agree your finances between yourselves before coming to court. You will need to have attended an initial meeting called a Mediation Information and Assessment Meeting, or MIAM, to consider ways to reach agreement without coming to court, unless you had good reason not to.`,
  line6:
    'The court needs confirmation now whether you want to apply for a financial order. Even if you want to apply for a consent order.',
  line7: `You will receive an email with more information after you have submitted this application for divorce. Your ${partner} will also be sent an email notifying them that you want to apply for a financial order.`,
  noSelectedWarning: `It's important to have a financial order in place by the time your ${
    isDivorce ? 'divorce is finalised' : 'civil partnership is legally ended'
  }.
  Otherwise you or your ${partner} could make claims on each other's finances, after the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } has ended.
  Even if you have kept your finances separate during the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }. If you select yes, then you do not have to go ahead with the application or pay any additional fees. It just gives you the option to apply later in the process, should you want&nbsp;to.`,
  doYouWantToApplyForFinancialOrder: 'Do you want to apply for a financial order?',
  yes: 'Yes. I want to apply for a financial order',
  no: 'No. I do not want to apply for a financial order',
  errors: {
    applicant1ApplyForFinancialOrder: {
      required: 'You need to answer whether you want to apply for a financial order.',
    },
  },
});

const cy: typeof en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Dividing your money and property',
  line1: `It’s important that you sort out how to divide your money and property before the end of the ${
    isDivorce ? 'divorce process' : 'process to end your civil partnership'
  }. Otherwise you or your ${partner} may be able to make financial claims against each other, after the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } is ended. Even if you have kept your finances separate during the ${isDivorce ? 'marriage' : 'civil partnership'}.
  The court can make what’s known as a 'financial order'.`,
  line2: `A financial order is a legal document that describes how you are going to split your money, property, pensions and other assets. You need a financial order whether
  you can reach agreement with your ${partner} or whether you want the court to decide for you.`,
  ifYouAgreeHeading: 'If you agree',
  line3: `If you and your ${partner} agree on how you will divide your financial assets, you can make this agreement legally binding by asking the court to make a ‘financial order by consent’. This is also known as a ‘consent order’. It is usually more straightforward and less expensive if you can reach an agreement on how to divide your money and property.`,
  ifYouNeedHelpAgreeingHeading: 'If you need help agreeing',
  line4:
    'There are ways to help you agree on how you will divide your financial assets outside of court. These are sometimes known as ‘non-court dispute resolution’ (NCDR). <a target="_blank" href="https://www.advicenow.org.uk/get-help/family-and-children/divorce-and-separation/what-do-applying-financial-order-when-you-get">Further information about the types of NCDR options available to you can be obtained from Advicenow (opens in a new tab).</a>',
  line5: `If you and your ${partner} disagree, you can also ask the court to decide for you. This is known as making a financial remedies application. The court will expect that you have tried to agree your finances between yourselves before coming to court. You will need to have attended an initial meeting called a Mediation Information and Assessment Meeting, or MIAM, to consider ways to reach agreement without coming to court, unless you had good reason not to.`,
  line6:
    'The court needs confirmation now whether you want to apply for a financial order. Even if you want to apply for a consent order.',
  line7: `You will receive an email with more information after you have submitted this application for divorce. Your ${partner} will also be sent an email notifying them that you want to apply for a financial order.`,
  noSelectedWarning: `It's important to have a financial order in place by the time your ${
    isDivorce ? 'divorce is finalised' : 'civil partnership is legally ended'
  }.
  Otherwise you or your ${partner} could make claims on each other's finances, after the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } has ended.
  Even if you have kept your finances separate during the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }. If you select yes, then you do not have to go ahead with the application or pay any additional fees. It just gives you the option to apply later in the process, should you want&nbsp;to.`,
  doYouWantToApplyForFinancialOrder: 'Do you want to apply for a financial order?',
  yes: 'Yes. I want to apply for a financial order',
  no: 'No. I do not want to apply for a financial order',
  errors: {
    applicant1ApplyForFinancialOrder: {
      required: 'You need to answer whether you want to apply for a financial order.',
    },
  },
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
