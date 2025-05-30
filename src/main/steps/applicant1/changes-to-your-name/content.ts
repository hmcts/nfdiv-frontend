import { ChangedNameWhy, ChangedNameHow } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import { getNameChangeOtherDetailsValidator } from '../../common/content.utils';

const en = ({ isDivorce, required }) => ({
  title: 'Why is your legal name different to how it is written on the marriage certificate?',
  line1: 'You must explain the reason for the difference, for example, you changed your name when you got married, or part of your legal name was not included in the marriage certificate.',
  changedByDeedPoll: 'I changed my name by deed poll',
  changedPartsOfName: 'I changed my last name or parts of my name when I got married',
  partOfNameNotIncluded: 'Part of my legal name was not included on the marriage certificate',
  partOfNameAbbreviated: 'Part of my legal name is abbreviated on the marriage certificate',
  legalNameSpelledDifferently: 'My legal name is spelled differently on the marriage certificate',
  other: 'Other',
  howDidYouChangeYourNameTitle: 'How did you change your name?',
  howDidYouChangeYourNameHint: 'The court needs to know how you changed your name so it knows which document to check.',
  sendingOffMarriageCertificate: `By sending off my ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
  deedPoll: 'By deed poll or ‘statutory declaration’',
  deedPollMoreDetails:
    'The court needs to see the deed poll or ‘statutory declaration’ document. You can upload a photo or scan later in this application, or you can post it.',
  anotherWay: 'Another way',
  anotherWayMoreDetails:
    'Provide details of when and how you changed your name. You will be asked to upload a photo or scan of the documents that prove you changed your name later in this application, or you can post them in. If you do not have any documents, explain why here.',
  warning: 'If you are unable to explain the difference by providing evidence, it may take longer to process your application.',
  warningMustUploadEvidence: 'You will have to upload some evidence like a government issued ID, a passport, driving license, or birth certificate.',
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
  changedByDeedPoll: 'I changed my name by deed poll',
  changedPartsOfName: 'I changed my last name or parts of my name when I got married',
  partOfNameNotIncluded: 'Part of my legal name was not included on the marriage certificate',
  partOfNameAbbreviated: 'Part of my legal name is abbreviated on the marriage certificate',
  legalNameSpelledDifferently: 'My legal name is spelled differently on the marriage certificate',
  other: 'Other',
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
  warning: 'If you are unable to explain the difference by providing evidence, it may take longer to process your application.',
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
    applicant1WhyNameDifferentToMarriageCertificate: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.changedByDeedPoll,
          value: ChangedNameWhy.DEED_POLL,
          warning: l => l.warningMustUploadEvidence,
        },
        {
          label: l => l.changedPartsOfName,
          value: ChangedNameWhy.CHANGED_PARTS_OF_NAME,
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
                    applicant1WhyNameDifferentToMarriageCertificateOtherDetails: {
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
        {
          label: l => l.partOfNameNotIncluded,
          value: ChangedNameWhy.PART_OF_NAME_NOT_INCLUDED,
          warning: l => l.warningMustUploadEvidence,
        },
        {
          label: l => l.partOfNameAbbreviated,
          value: ChangedNameWhy.PART_OF_NAME_ABBREVIATED,
          warning: l => l.warningMustUploadEvidence,
        },
        {
          label: l => l.legalNameSpelledDifferently,
          value: ChangedNameWhy.LEGAL_NAME_SPELLED_DIFFERENTLY,
          warning: l => l.warningMustUploadEvidence,
        },
        {
          label: l => l.other,
          value: ChangedNameWhy.OTHER,
          warning: l => l.warningMustUploadEvidence,
          subFields: {
            applicant1NameDifferentToMarriageCertificateOtherDetails: {
              type: 'textarea',
              label: l => l.anotherWayMoreDetails,
              labelSize: null,
            },
          },
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
