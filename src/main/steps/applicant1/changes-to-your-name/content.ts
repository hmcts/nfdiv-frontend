import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: 'Changes to your name',
  line1: 'The court needs to know if you have changed your name.',
  applicant1LastNameChangedWhenMarried: `Did you change your last name when you ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  }?`,
  applicant1LastNameChangedWhenMarriedHint: 'For example, from a maiden name',
  applicant1NameDifferentToMarriageCertificate: `Have you changed any part of your name since ${
    isDivorce ? 'getting married' : 'forming your civil partnership'
  }?`,
  applicant1NameDifferentToMarriageCertificateHint: 'For example, by deed poll',
  errors: {
    applicant1LastNameChangedWhenMarried: { required },
    applicant1NameDifferentToMarriageCertificate: { required },
  },
});

const cy = ({ isDivorce, required }) => ({
  title: "Newidiadau i'ch enw",
  line1: "Mae angen ichi roi gwybod i'r llys os ydych wedi newid eich enw",
  applicant1LastNameChangedWhenMarried: `A wnaethoch chi newid eich cyfenw pan wnaethoch ${
    isDivorce ? 'chi briodi' : 'ffurfio eich partneriaeth sifil'
  }?`,
  applicant1LastNameChangedWhenMarriedHint: "Er enghraifft, o'ch enw morwynaidd",
  applicant1NameDifferentToMarriageCertificate: "A ydych wedi newid unrhyw ran o'ch enw ers priodi?",
  applicant1NameDifferentToMarriageCertificateHint: 'Er enghraifft, trwy weithred newid enw',
  errors: {
    applicant1LastNameChangedWhenMarried: { required },
    applicant1NameDifferentToMarriageCertificate: { required },
  },
});

export const form: FormContent = {
  fields: {
    applicant1LastNameChangedWhenMarried: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.applicant1LastNameChangedWhenMarried,
      hint: l => l.applicant1LastNameChangedWhenMarriedHint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
    applicant1NameDifferentToMarriageCertificate: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.applicant1NameDifferentToMarriageCertificate,
      hint: l => l.applicant1NameDifferentToMarriageCertificateHint,
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
