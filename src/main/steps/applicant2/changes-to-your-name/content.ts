import { ChangedNameHow, ChangedNameWhy } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/changes-to-your-name/content';
import { getNameChangeOtherDetailsValidator } from '../../common/content.utils';

const labels = content => ({
  errors: {
    applicant2WhyNameDifferent: {
      ...content.errors.applicant1WhyNameDifferent,
      applicant2WhyNameDifferentOtherDetails:
        'You have not answered the question. You need to say how you changed your name so the court knows which document to check.',
    },
    applicant2NameDifferentToMarriageCertificateMethod: {
      ...content.errors.applicant1WhyNameDifferent,
      applicant2NameDifferentToMarriageCertificateOtherDetails:
        'You have not answered the question. You need to say how you changed your name so the court knows which document to check.',
    },
  },
});

export const form: FormContent = {
  ...applicant1Form,
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
              label: l => l.applicant2WhyNameDifferentOtherDetails,
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

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form,
  };
};

