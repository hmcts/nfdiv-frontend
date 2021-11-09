import { Case } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { setUnreachableAnswers } from '../../../app/form/parser';
import { isFieldFilledIn } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/changes-to-your-name/content';
import { CommonContent } from '../../common/common.content';

const labels = ({ required }: CommonContent) => {
  return {
    errors: {
      applicant2LastNameChangedWhenRelationshipFormed: {
        required,
      },
      applicant2NameChangedSinceRelationshipFormed: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2LastNameChangedWhenRelationshipFormed: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.lastNameChangedWhenRelationshipFormed,
      hint: l => l.lastNameChangedWhenRelationshipFormedHint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      parser: body =>
        setUnreachableAnswers(
          (body as Partial<Case>).applicant2LastNameChangedWhenRelationshipFormed === YesOrNo.NO &&
            (body as Partial<Case>).applicant2NameChangedSinceRelationshipFormed === YesOrNo.NO,
          ['applicant2NameChangedHow', 'applicant2ChangedNameHowAnotherWay']
        ),
      validator: value => isFieldFilledIn(value),
    },
    applicant2NameChangedSinceRelationshipFormed: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.nameChangedSinceRelationshipFormed,
      hint: l => l.nameChangedSinceRelationshipFormedHint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(content),
    form,
  };
};
