import { ChangedNameHow, ChangedNameWhy } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { getNameChangeOtherDetailsValidator } from '../../common/content.utils';

const en = ({ isDivorce, required, partner }) => ({
  title: `Why is your ${partner}'s legal  name different to how it is written on the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } certificate?`,
  line1: `You must explain the reason for the difference, for example, your ${partner} changed their name when they ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  }, or part of the legal name was not included in the ${isDivorce ? 'marriage' : 'civil partnership'} certificate.`,
  changedByDeedPoll: `My ${partner} changed their name by deed poll`,
  changedPartsOfName: `My ${partner} changes their last name or parts of their name when they ${
    isDivorce ? 'got married' : 'formed the civil partnership'
  }`,
  partOfNameNotIncluded: `Part of my ${partner}'s legal name was not included on the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } certificate`,
  partOfNameAbbreviated: `Part of my ${partner}'s legal name is abbreviated on the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } certificate`,
  legalNameSpelledDifferently: `Their legal name is spelled differently on the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } certificate`,
  other: 'Other',
  howDidYouChangeYourNameTitle: 'How did you change your name?',
  howDidYouChangeYourNameHint: 'The court needs to know how you changed your name so it knows which document to check.',
  sendingOffMarriageCertificate: `By sending off my ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
  deedPoll: 'By deed poll or ‘statutory declaration’',
  deedPollMoreDetails:
    'The court needs to see the deed poll or ‘statutory declaration’ document. You can upload a photo or scan later in this application, or you can post it.',
  applicant1WhyNameDifferentOtherDetails: `If the difference is because your ${partner}'s legal name or name on the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } certificate has a title, provide an explanation about the title on your name.`,
  anotherWay: 'Another way',
  anotherWayMoreDetails: `Provide details of when and how your ${partner} changed their name. You will be asked to upload a photo or scan of the documents that prove they changed their name later in this application, or you can post them in. If you do not have any documents, explain why here.`,
  warning:
    'If you are unable to explain the difference by providing evidence, it may take longer to process your application.',
  warningMustUploadEvidence:
    'You will have to upload some evidence like a government issued ID, a passport, driving license, or birth certificate.',
  errors: {
    applicant1WhyNameDifferent: {
      required,
      applicant1WhyNameDifferentOtherDetails:
        'You have not answered the question. You need to say how you changed your name so the court knows which document to check.',
    },
    applicant1NameDifferentToMarriageCertificateMethod: {
      required,
      applicant1NameDifferentToMarriageCertificateOtherDetails:
        'You have not answered the question. You need to say how you changed your name so the court knows which document to check.',
    },
  },
});

const cy = ({ isDivorce, required, partner }) => ({
  title: "Newidiadau i'ch enw",
  line1: "Mae angen ichi roi gwybod i'r llys os ydych wedi newid eich enw",
  changedByDeedPoll: `Newidiodd fy ${partner} eu henw trwy weithred newid enw`,
  changedPartsOfName: `Newidiodd fy ${partner} ei gyfenw neu rannau o'i enw pan wnaethom ni ${
    isDivorce ? 'briodi' : "ffurfio'r bartneriaeth sifil"
  }`,
  partOfNameNotIncluded: `Ni gafodd rhan o enw cyfreithiol fy ${partner} ei chynnwys ar y dystysgrif ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }`,
  partOfNameAbbreviated: `Mae rhan o enw cyfreithiol fy ${partner} wedi’i dalfyrru ar y dystysgrif ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }`,
  legalNameSpelledDifferently: 'Mae ei enw cyfreithiol wedi’i sillafu’n wahanol ar y dystysgrif briodas',
  other: 'Other',
  howDidYouChangeYourNameTitle: 'Sut wnaethoch chi newid eich enw?',
  howDidYouChangeYourNameHint:
    "Mae’r llys angen gwybod sut y gwnaethoch newid eich enw, fel bod y llys yn gwybod pa ddogfen i'w gwirio",
  sendingOffMarriageCertificate: `Trwy anfon fy nhystysgrif ${isDivorce ? 'briodas' : 'partneriaeth sifil'}`,
  deedPoll: 'Trwy weithred newid enw neu ddatganiad statudol',
  deedPollMoreDetails:
    'Mae’r llys angen gweld y ddogfen ‘datganiad statudol’ neu’r weithred newid enw. Gallwch uwchlwytho llun neu sgan yn ddiweddarach yn y cais hwn, neu gallwch ei bostio.',
  changedAnotherWayDetails: `Os yw’r gwahaniaeth oherwydd bod eich enw cyfreithiol neu’r enw ar y dystysgrif ${
    isDivorce ? 'briodas' : 'partneriaeth sifil'
  } yn cynnwys teitl, darparwch esboniad am y teitl ar eich enw.`,
  anotherWay: 'Ffordd arall',
  anotherWayMoreDetails:
    "Darparwch fanylion sy’n dangos sut a pryd wnaethoch chi newid eich enw. Gofynnir i chi uwchlwytho llun neu sgan o'r dogfennau sy'n profi eich bod wedi newid eich enw yn nes ymlaen yn y cais hwn, neu gallwch eu postio. Os nad oes gennych unrhyw ddogfennau, esboniwch pam yma.",
  warning: 'Os na allwch esbonio’r gwahaniaeth trwy ddarparu tystiolaeth, gall gymryd yn hirach i brosesu eich cais.',
  errors: {
    applicant2LastNameChangedWhenMarried: { required },
    applicant2LastNameChangedWhenMarriedMethod: {
      required,
      applicant2LastNameChangedWhenMarriedOtherDetails:
        'Nid ydych wedi ateb y cwestiwn. Mae angen i chi ddweud sut y gwnaethoch newid eich enw, fel bod y llys yn gwybod pa ddogfen i’w gwirio.',
    },
    applicant2WhyNameDifferent: {
      required,
      applicant2WhyNameDifferent:
        'Nid ydych wedi ateb y cwestiwn. Mae angen i chi ddweud sut y gwnaethoch newid eich enw, fel bod y llys yn gwybod pa ddogfen i’w gwirio.',
    },
    applicant2NameDifferentToMarriageCertificateMethod: {
      required,
      applicant2NameDifferentToMarriageCertificateOtherDetails:
        'Nid ydych wedi ateb y cwestiwn. Mae angen i chi ddweud sut y gwnaethoch newid eich enw, fel bod y llys yn gwybod pa ddogfen i’w gwirio.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2WhyNameDifferent: {
      type: 'checkboxes',
      label: l => l.title,
      labelHidden: true,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'applicant2WhyNameDifferent',
          label: l => l.changedByDeedPoll,
          value: ChangedNameWhy.DEED_POLL,
          warning: l => l.warningMustUploadEvidence,
        },
        {
          name: 'applicant2WhyNameDifferent',
          label: l => l.changedPartsOfName,
          value: ChangedNameWhy.CHANGED_PARTS_OF_NAME,
          subFields: {
            applicant2NameDifferentToMarriageCertificateMethod: {
              type: 'checkboxes',
              label: l => l.howDidYouChangeYourNameTitle,
              hint: l => l.howDidYouChangeYourNameHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'applicant2NameDifferentToMarriageCertificateMethod',
                  label: l => l.sendingOffMarriageCertificate,
                  value: ChangedNameHow.MARRIAGE_CERTIFICATE,
                },
                {
                  name: 'applicant2NameDifferentToMarriageCertificateMethod',
                  label: l => l.deedPoll,
                  value: ChangedNameHow.DEED_POLL,
                  conditionalText: l => `<p class="govuk-label">${l.deedPollMoreDetails}</p>`,
                },
                {
                  name: 'applicant2NameDifferentToMarriageCertificateMethod',
                  label: l => l.anotherWay,
                  value: ChangedNameHow.OTHER,
                  subFields: {
                    applicant2NameDifferentToMarriageCertificateOtherDetails: {
                      type: 'textarea',
                      label: l => l.anotherWayMoreDetails,
                      labelSize: null,
                    },
                  },
                  validator: getNameChangeOtherDetailsValidator(
                    'applicant2NameDifferentToMarriageCertificateOtherDetails'
                  ),
                },
              ],
            },
          },
        },
        {
          name: 'applicant2WhyNameDifferent',
          label: l => l.partOfNameNotIncluded,
          value: ChangedNameWhy.PART_OF_NAME_NOT_INCLUDED,
          warning: l => l.warningMustUploadEvidence,
        },
        {
          name: 'applicant2WhyNameDifferent',
          label: l => l.partOfNameAbbreviated,
          value: ChangedNameWhy.PART_OF_NAME_ABBREVIATED,
          warning: l => l.warningMustUploadEvidence,
        },
        {
          name: 'applicant2WhyNameDifferent',
          label: l => l.legalNameSpelledDifferently,
          value: ChangedNameWhy.LEGAL_NAME_SPELLED_DIFFERENTLY,
          warning: l => l.warningMustUploadEvidence,
        },
        {
          name: 'applicant2WhyNameDifferent',
          label: l => l.other,
          value: ChangedNameWhy.OTHER,
          warning: l => l.warningMustUploadEvidence,
          subFields: {
            applicant2WhyNameDifferentOtherDetails: {
              type: 'textarea',
              label: l => l.changedAnotherWayDetails,
              labelSize: null,
            },
          },
          validator: getNameChangeOtherDetailsValidator('applicant2WhyNameDifferentOtherDetails'),
        },
      ],
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
