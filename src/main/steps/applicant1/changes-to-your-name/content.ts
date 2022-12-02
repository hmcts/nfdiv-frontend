import { ChangedNameHow, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, ValidationCheck } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: 'Changes to your name',
  line1: 'The court needs to know if you have changed your name.',
  subFieldHint: 'The court needs to know how you changed your name so it knows which document to check.',
  subFieldTitle: 'How did you change your name?',
  applicant1LastNameChangedWhenRelationshipFormed: `Did you change your last name when you ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  }?`,
  applicant1LastNameChangedWhenRelationshipFormedHint: 'For example, from a maiden name',
  applicant1NameChangedSinceRelationshipFormed: `Have you changed any part of your name since ${
    isDivorce ? 'getting married' : 'forming your civil partnership'
  }?`,
  applicant1NameChangedSinceRelationshipFormedHint: 'For example, by deed poll',
  sendingOffMarriageCertificate: `By sending off my ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
  deedPoll: 'By deed poll or ‘statutory declaration’',
  deedPollMoreDetails:
    'The court needs to see the deed poll or ‘statutory declaration’ document. You can upload a photo or scan later in this application, or you can post it.',
  anotherWay: 'Another way',
  anotherWayMoreDetails:
    'Provide details of when and how you changed your name. You will be asked to upload a photo or scan of the documents that prove you changed your name later in this application, or you can post them in. If you do not have any documents, explain why here.',
  errors: {
    applicant1LastNameChangedWhenRelationshipFormed: { required },
    applicant1LastNameChangedWhenMarriedMethod: {
      required,
      applicant1LastNameChangedWhenMarriedOtherDetails:
        'You have not answered the question. You need to say how you changed your name so the court knows which document to check.',
    },
    applicant1NameDifferentToMarriageCertificateMethod: {
      required,
      applicant1NameDifferentToMarriageCertificateOtherDetails:
        'You have not answered the question. You need to say how you changed your name so the court knows which document to check.',
    },
    applicant1NameChangedSinceRelationshipFormed: { required },
  },
});

const cy = ({ isDivorce, required }) => ({
  title: "Newidiadau i'ch enw",
  line1: "Mae angen ichi roi gwybod i'r llys os ydych wedi newid eich enw",
  subFieldHint: 'The court needs to know how you changed your name so it knows which document to check.',
  subFieldTitle: 'How did you change your name?',
  applicant1LastNameChangedWhenRelationshipFormed: `A wnaethoch chi newid eich cyfenw pan wnaethoch ${
    isDivorce ? 'chi briodi' : 'ffurfio eich partneriaeth sifil'
  }?`,
  applicant1LastNameChangedWhenRelationshipFormedHint: "Er enghraifft, o'ch enw morwynaidd",
  applicant1NameChangedSinceRelationshipFormed: "A ydych wedi newid unrhyw ran o'ch enw ers priodi?",
  applicant1NameChangedSinceRelationshipFormedHint: 'Er enghraifft, trwy weithred newid enw',
  sendingOffMarriageCertificate: `By sending off my ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
  deedPoll: 'By deed poll or ‘statutory declaration’',
  deedPollMoreDetails:
    'The court needs to see the deed poll or ‘statutory declaration’ document. You can upload a photo or scan later in this application, or you can post it.',
  anotherWay: 'Another way',
  anotherWayMoreDetails:
    'Provide details of when and how you changed your name. You will be asked to upload a photo or scan of the documents that prove you changed your name later in this application, or you can post them in. If you do not have any documents, explain why here.',
  errors: {
    applicant1LastNameChangedWhenRelationshipFormed: { required },
    applicant1LastNameChangedWhenMarriedMethod: {
      required,
      applicant1LastNameChangedWhenMarriedOtherDetails:
        'You have not answered the question. You need to say how you changed your name so the court knows which document to check.',
    },
    applicant1NameDifferentToMarriageCertificateMethod: {
      required,
      applicant1NameDifferentToMarriageCertificateOtherDetails:
        'You have not answered the question. You need to say how you changed your name so the court knows which document to check.',
    },
    applicant1NameChangedSinceRelationshipFormed: { required },
  },
});

export const form: FormContent = {
  fields: {
    applicant1LastNameChangedWhenRelationshipFormed: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.applicant1LastNameChangedWhenRelationshipFormed,
      hint: l => l.applicant1LastNameChangedWhenRelationshipFormedHint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant1LastNameChangedWhenMarriedMethod: {
              type: 'checkboxes',
              label: l => l.subFieldTitle,
              hint: l => l.subFieldHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'applicant1LastNameChangedWhenMarriedMethod',
                  label: l => l.sendingOffMarriageCertificate,
                  value: ChangedNameHow.MARRIAGE_CERTIFICATE,
                },
                {
                  name: 'applicant1LastNameChangedWhenMarriedMethod',
                  label: l => l.deedPoll,
                  value: ChangedNameHow.DEED_POLL,
                  conditionalText: l => `<p class="govuk-label">${l.deedPollMoreDetails}</p>`,
                },
                {
                  name: 'applicant1LastNameChangedWhenMarriedMethod',
                  label: l => l.anotherWay,
                  value: ChangedNameHow.OTHER,
                  subFields: {
                    applicant1LastNameChangedWhenMarriedOtherDetails: {
                      type: 'textarea',
                      label: l => l.anotherWayMoreDetails,
                      labelSize: null,
                    },
                  },
                  validator: ((value, formData) => {
                    if (
                      (value as string[])?.includes(ChangedNameHow.OTHER) &&
                      !formData.applicant1LastNameChangedWhenMarriedOtherDetails?.length
                    ) {
                      return 'applicant1LastNameChangedWhenMarriedOtherDetails';
                    }
                  }) as ValidationCheck,
                },
              ],
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
    applicant1NameChangedSinceRelationshipFormed: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.applicant1NameChangedSinceRelationshipFormed,
      hint: l => l.applicant1NameChangedSinceRelationshipFormedHint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant1NameDifferentToMarriageCertificateMethod: {
              type: 'checkboxes',
              label: l => l.subFieldTitle,
              hint: l => l.subFieldHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'applicant1NameDifferentToMarriageCertificateMethod',
                  label: l => l.sendingOffMarriageCertificate,
                  value: ChangedNameHow.MARRIAGE_CERTIFICATE,
                },
                {
                  name: 'applicant1NameDifferentToMarriageCertificateMethod',
                  label: l => l.deedPoll,
                  value: ChangedNameHow.DEED_POLL,
                  conditionalText: l => `<p class="govuk-label">${l.deedPollMoreDetails}</p>`,
                },
                {
                  name: 'applicant1NameDifferentToMarriageCertificateMethod',
                  label: l => l.anotherWay,
                  value: ChangedNameHow.OTHER,
                  subFields: {
                    applicant1NameDifferentToMarriageCertificateOtherDetails: {
                      type: 'textarea',
                      label: l => l.anotherWayMoreDetails,
                      labelSize: null,
                    },
                  },
                  validator: ((value, formData) => {
                    if (
                      (value as string[])?.includes(ChangedNameHow.OTHER) &&
                      !formData.applicant1NameDifferentToMarriageCertificateOtherDetails?.length
                    ) {
                      return 'applicant1NameDifferentToMarriageCertificateOtherDetails';
                    }
                  }) as ValidationCheck,
                },
              ],
            },
          },
        },
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
