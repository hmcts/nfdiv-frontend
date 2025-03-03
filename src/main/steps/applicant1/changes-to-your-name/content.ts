import { ChangedNameHow, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import { getNameChangeOtherDetailsValidator } from '../../common/content.utils';

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
  howDidYouChangeYourNameTitle: 'How did you change your name?',
  howDidYouChangeYourNameHint: 'The court needs to know how you changed your name so it knows which document to check.',
  sendingOffMarriageCertificate: `By sending off my ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
  deedPoll: 'By deed poll or ‘statutory declaration’',
  deedPollMoreDetails:
    'The court needs to see the deed poll or ‘statutory declaration’ document. You can upload a photo or scan later in this application, or you can post it.',
  anotherWay: 'Another way',
  anotherWayMoreDetails:
    'Provide details of when and how you changed your name. You will be asked to upload a photo or scan of the documents that prove you changed your name later in this application, or you can post them in. If you do not have any documents, explain why here.',
  errors: {
    applicant1LastNameChangedWhenMarried: { required },
    applicant1NameDifferentToMarriageCertificate: { required },
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
  howDidYouChangeYourNameTitle: 'Sut wnaethoch chi newid eich enw?',
  howDidYouChangeYourNameHint:
    "Mae’r llys angen gwybod sut y gwnaethoch newid eich enw, fel bod y llys yn gwybod pa ddogfen i'w gwirio",
  sendingOffMarriageCertificate: `Trwy anfon fy nhystysgrif ${isDivorce ? 'briodas' : 'partneriaeth sifil'}`,
  deedPoll: 'Trwy weithred newid enw neu ddatganiad statudol',
  deedPollMoreDetails:
    'Mae’r llys angen gweld y ddogfen ‘datganiad statudol’ neu’r weithred newid enw. Gallwch uwchlwytho llun neu sgan yn ddiweddarach yn y cais hwn, neu gallwch ei bostio.',
  anotherWay: 'Ffordd arall',
  anotherWayMoreDetails:
    "Darparwch fanylion sy’n dangos sut a pryd wnaethoch chi newid eich enw. Gofynnir i chi uwchlwytho llun neu sgan o'r dogfennau sy'n profi eich bod wedi newid eich enw yn nes ymlaen yn y cais hwn, neu gallwch eu postio. Os nad oes gennych unrhyw ddogfennau, esboniwch pam yma.",
  errors: {
    applicant1LastNameChangedWhenMarried: { required },
    applicant1LastNameChangedWhenMarriedMethod: {
      required,
      applicant1LastNameChangedWhenMarriedOtherDetails:
        'Nid ydych wedi ateb y cwestiwn. Mae angen i chi ddweud sut y gwnaethoch newid eich enw, fel bod y llys yn gwybod pa ddogfen i’w gwirio.',
    },
    applicant1NameDifferentToMarriageCertificate: { required },
    applicant1NameDifferentToMarriageCertificateMethod: {
      required,
      applicant1NameDifferentToMarriageCertificateOtherDetails:
        'Nid ydych wedi ateb y cwestiwn. Mae angen i chi ddweud sut y gwnaethoch newid eich enw, fel bod y llys yn gwybod pa ddogfen i’w gwirio.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1LastNameChangedWhenMarried: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.applicant1LastNameChangedWhenMarried,
      hint: l => l.applicant1LastNameChangedWhenMarriedHint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant1LastNameChangedWhenMarriedMethod: {
              type: 'checkboxes',
              label: l => l.howDidYouChangeYourNameTitle,
              hint: l => l.howDidYouChangeYourNameHint,
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
                  validator: getNameChangeOtherDetailsValidator('applicant1LastNameChangedWhenMarriedOtherDetails'),
                },
              ],
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
    applicant1NameDifferentToMarriageCertificate: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.applicant1NameDifferentToMarriageCertificate,
      hint: l => l.applicant1NameDifferentToMarriageCertificateHint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant1NameDifferentToMarriageCertificateMethod: {
              type: 'checkboxes',
              label: l => l.howDidYouChangeYourNameTitle,
              hint: l => l.howDidYouChangeYourNameHint,
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
                  validator: getNameChangeOtherDetailsValidator(
                    'applicant1NameDifferentToMarriageCertificateOtherDetails'
                  ),
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
