import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, isJointApplication, required }: CommonContent) => ({
  title: `Do you want to continue with your${isJointApplication ? ' joint' : ''} ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  }?`,
  line1: `The next step in the${
    isDivorce ? ' divorce' : ''
  } process is to apply for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot ${
    isDivorce ? 'get a divorce' : 'end your civil partnership'
  }.`,
  jointLine1: `This is a joint application so your ${partner} will also have to apply. They have been sent an email to tell them.`,
  jointLine2: `Your ${partner} has already confirmed this joint application.`,
  readMore: 'Read more about the next steps',
  line2: 'You have to complete 2 more steps before you are legally divorced:',
  conditionalOrder: 'Apply for a conditional order',
  conditionalOrderInfo: `This shows that the court agrees that you’re entitled to ${
    isDivorce ? 'get a divorce' : 'end your civil partnership'
  }.`,
  finalOrder: 'Apply for a final order',
  finalOrderInfo: `This legally ends the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }. You cannot apply for a final order until 6 weeks after the conditional order.`,
  yes: `I want to continue with my ${isDivorce ? 'divorce application' : 'application to end my civil partnership'}`,
  no: `I do not want to continue with my ${
    isDivorce ? 'divorce application' : 'application to end my civil partnership'
  }`,
  errors: {
    applicant1ApplyForConditionalOrder: { required },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    applicant1ApplyForConditionalOrder: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
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
  const isJointApplication = content.isJointApplication;
  const isApplicantFirstInTimeApplicant = content.isApplicant2
    ? content.userCase.coApplicant1StatementOfTruth !== Checkbox.Checked
    : content.userCase.coApplicant2StatementOfTruth !== Checkbox.Checked;
  return {
    isJointApplication,
    isApplicantFirstInTimeApplicant,
    ...translations,
    form,
  };
};
