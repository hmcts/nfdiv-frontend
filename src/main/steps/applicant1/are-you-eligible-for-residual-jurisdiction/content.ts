import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { ydyOrNacYdyRadioAnswers } from '../../common/input-labels.content';

const en = ({ required }: CommonContent) => ({
  line1: `Are the Applicant and Respondent registered as civil partners of each other in England or Wales or,
    in the case of a same sex couple, married each other under the law of England and Wales and it would be in the
    interests of justice for the court to assume jurisdiction in this case?`,
  errors: {
    jurisdictionResidualEligible: { required },
  },
});

const cy: typeof en = ({ required }: CommonContent) => ({
  line1: `A yw’r ceisydd a’r atebydd wedi’u cofrestru fel partneriaid sifil i’w gilydd yng Nghymru neu Loegr neu,
    yn achos cwpl o’r un rhyw, yn briod â’i gilydd o dan gyfraith Cymru a Lloegr a byddai er budd cyfiawnder i’r
    llys gymryd awdurdodaeth yn yr achos hwn?`,
  errors: {
    jurisdictionResidualEligible: { required },
  },
});

export const form: FormContent = {
  fields: {
    jurisdictionResidualEligible: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
        { label: l => l[YesOrNo.NO], value: YesOrNo.NO },
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

export const radioButtonAnswers = ydyOrNacYdyRadioAnswers;

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const radioAnswers = radioButtonAnswers[content.language];
  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
