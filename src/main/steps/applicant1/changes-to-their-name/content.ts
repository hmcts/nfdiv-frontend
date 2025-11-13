import { ChangedNameHow, ChangedNameWhy } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { getNameChangeOtherDetailsValidator } from '../../common/content.utils';

const en = ({ isDivorce, partner }) => ({
  title: `Why is your ${partner}'s legal name different to how it is written on the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } certificate?`,
  line1: `You must explain the reason for the difference, for example, your ${partner} changed their name when they ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  }, or part of the legal name was not included in the ${isDivorce ? 'marriage' : 'civil partnership'} certificate.`,
  changedByDeedPoll: `My ${partner} changed their name by deed poll`,
  changedPartsOfName: `My ${partner} changed their last name or parts of their name when they ${
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
  howDidYouChangeYourNameTitle: `How did your ${partner} change their name?`,
  howDidYouChangeYourNameHint: `The court needs to know how your ${partner} changed their name, so it knows which document to check.`,
  sendingOffMarriageCertificate: `By sending off my ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
  deedPoll: 'By deed poll or ‘statutory declaration’',
  deedPollMoreDetails:
    'The court needs to see the deed poll or ‘statutory declaration’ document. You can upload a photo or scan later in this application, or you can post it.',
  changedAnotherWayDetails: `If the difference is because your ${partner}'s legal name or name on the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } certificate has a title, provide an explanation about the title on your name.`,
  anotherWay: 'Another way',
  anotherWayMoreDetails: `Provide details of when and how your ${partner} changed their name. You will be asked to upload a photo or scan of the documents that prove they changed their name later in this application, or you can post them in. If you do not have any documents, explain why here.`,
  warning:
    'If you are unable to explain the difference by providing evidence, it may take longer to process your application.',
  warningMustUploadEvidence:
    'You will have to upload some evidence like a government issued ID, a passport, driving license, or birth certificate.',
  errors: {
    applicant2WhyNameDifferent: {
      required: `You need to select a reason for why your ${partner}'s legal name is different from your ${
        isDivorce ? 'marriage' : 'civil partnership'
      } certificate.`,
      applicant2WhyNameDifferentOtherDetails: `You need to provide details of why your ${partner}'s legal name is written differently on your ${
        isDivorce ? 'marriage' : 'civil partnership'
      } certificate.`,
    },
    applicant2NameDifferentToMarriageCertificateMethod: {
      required: `You need to answer how your ${partner} changed their name.`,
      applicant2NameDifferentToMarriageCertificateOtherDetails: `You need to provide details of how your ${partner} changed their name.`,
    },
  },
});

const cy = ({ isDivorce, partner }) => ({
  title: `Pam fod enw cyfreithiol eich gŵr yn wahanol i’r ffordd y mae wedi’i ysgrifennu ar y dystysgrif ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }?`,
  line1: `Rhaid i chi esbonio’r rheswm dros y gwahaniaeth, er enghraifft, bu i’ch gŵr newid ei enw pan wnaethoch chi ${
    isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
  }, neu na gafodd rhan o’i enw cyfreithiol ei chynnwys ar y dystysgrif ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }.`,
  changedByDeedPoll: 'Newidiodd fy mhartner eu henw trwy weithred newid enw',
  changedPartsOfName: `Newidiodd fy mhartner ei gyfenw neu rannau o'i enw pan wnaethom ni ${
    isDivorce ? 'briodi' : "ffurfio'r bartneriaeth sifil"
  }`,
  partOfNameNotIncluded: `Ni gafodd rhan o enw cyfreithiol fy mhartner ei chynnwys ar y dystysgrif ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }`,
  partOfNameAbbreviated: `Mae rhan o enw cyfreithiol fy mhartner wedi’i dalfyrru ar y dystysgrif ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }`,
  legalNameSpelledDifferently: 'Mae ei enw cyfreithiol wedi’i sillafu’n wahanol ar y dystysgrif briodas',
  other: 'Arall',
  howDidYouChangeYourNameTitle: `Sut wnaeth eich ${partner} newid ei enw?`,
  howDidYouChangeYourNameHint: `Mae’r llys angen gwybod sut wnaeth eich ${partner} newid ei enw, fel bod y llys yn gwybod pa ddogfen i’w gwirio.`,
  sendingOffMarriageCertificate: `Trwy anfon fy nhystysgrif ${isDivorce ? 'briodas' : 'partneriaeth sifil'}`,
  deedPoll: 'Trwy weithred newid enw neu ddatganiad statudol',
  deedPollMoreDetails:
    'Mae’r llys angen gweld y ddogfen ‘datganiad statudol’ neu’r weithred newid enw. Gallwch uwchlwytho llun neu sgan yn ddiweddarach yn y cais hwn, neu gallwch ei bostio.',
  changedAnotherWayDetails: `Os yw’r gwahaniaeth oherwydd bod gan enw cyfreithiol eich ${partner} neu enw ar y dystysgrif ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  } deitl, rhowch esboniad am y teitl ar eich enw.`,
  anotherWay: 'Ffordd arall',
  anotherWayMoreDetails: `Darparwch fanylion sy’n dangos sut a pryd wnaeth eich ${partner} newid ei enw. Gofynnir i chi uwchlwytho llun neu sgan o’r dogfennau sy’n profi eu bod wedi newid eu henw yn ddiweddarach yn y cais hwn, neu gallwch eu postio nhw atom. Os nad oes gennych unrhyw ddogfennau, esboniwch pam yma.`,
  warning: 'Os na allwch esbonio’r gwahaniaeth trwy ddarparu tystiolaeth, gall gymryd yn hirach i brosesu eich cais.',
  warningMustUploadEvidence:
    'Bydd rhaid i chi uwchlwytho tystiolaeth fel cerdyn adnabod a gyhoeddwyd gan y llywodraeth, pasbort, trwydded yrru neu dystysgrif geni, gweithred newid enw.',
  errors: {
    applicant2WhyNameDifferent: {
      required: `Mae angen i chi ddewis rheswm dros pam bod enw cyfreithiol eich ${partner} yn wahanol i’ch tystysgrif ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      }.`,
      applicant2WhyNameDifferentOtherDetails: `Mae arnoch angen darparu manylion am pam bod enw eich ${partner} wedi’i ysgrifennu’n wahanol ar y dystysgrif ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      }.`,
    },
    applicant2NameDifferentToMarriageCertificateMethod: {
      required: `Mae angen i chi ateb sut y mae eich ${partner} wedi newid eu henw.`,
      applicant2NameDifferentToMarriageCertificateOtherDetails: `Mae arnoch angen darparu manylion am sut wnaeth eich ${partner} newid eu henw.`,
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
