import { Case } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { setUnreachableAnswers } from '../../../app/form/parser';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: 'Changes to your name',
  line1: 'The court needs to know if you have changed your name.',
  lastNameChangedWhenRelationshipFormed: `Did you change your last name when you ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  }?`,
  lastNameChangedWhenRelationshipFormedHint: 'For example, from a maiden name',
  nameChangedSinceRelationshipFormed: `Have you changed any part of your name since ${
    isDivorce ? 'getting married' : 'forming your civil partnership'
  }?`,
  nameChangedSinceRelationshipFormedHint: 'For example, by deed poll',
  errors: {
    applicant1LastNameChangedWhenRelationshipFormed: { required },
    applicant1NameChangedSinceRelationshipFormed: { required },
  },
});

const cy = ({ required }) => ({
  title: "Newidiadau i'ch enw",
  line1: "Mae angen ichi roi gwybod i'r llys os ydych wedi newid eich enw",
  lastNameChangedWhenRelationshipFormed: 'A wnaethoch chi newid eich cyfenw pan wnaethoch chi briodi?',
  lastNameChangedWhenRelationshipFormedHint: "Er enghraifft, o'ch enw morwynaidd",
  nameChangedSinceRelationshipFormed: "A ydych wedi newid unrhyw ran o'ch enw ers priodi?",
  nameChangedSinceRelationshipFormedHint: 'Er enghraifft, trwy weithred newid enw',
  errors: {
    applicant1LastNameChangedWhenRelationshipFormed: { required },
    applicant1NameChangedSinceRelationshipFormed: { required },
  },
});

export const form: FormContent = {
  fields: {
    applicant1LastNameChangedWhenRelationshipFormed: {
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
          (body as Partial<Case>).applicant1LastNameChangedWhenRelationshipFormed === YesOrNo.NO &&
            (body as Partial<Case>).applicant1NameChangedSinceRelationshipFormed === YesOrNo.NO,
          ['applicant1NameChangedHow', 'applicant1ChangedNameHowAnotherWay']
        ),
      validator: value => isFieldFilledIn(value),
    },
    applicant1NameChangedSinceRelationshipFormed: {
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
