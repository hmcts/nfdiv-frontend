import { ChangedNameHow, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/changes-to-your-name/content';
import { CommonContent } from '../../common/common.content';
import { getNameChangeOtherDetailsValidator } from '../../common/content.utils';

const labels = ({ required }: CommonContent) => {
  return {
    errors: {
      applicant2LastNameChangedWhenMarried: {
        required,
      },
      applicant2NameDifferentToMarriageCertificate: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2LastNameChangedWhenMarried: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.applicant1LastNameChangedWhenMarried,
      hint: l => l.applicant1LastNameChangedWhenMarriedHint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant2LastNameChangedWhenMarriedMethod: {
              type: 'checkboxes',
              label: l => l.howDidYouChangeYourNameTitle,
              hint: l => l.howDidYouChangeYourNameHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'applicant2LastNameChangedWhenMarriedMethod',
                  label: l => l.sendingOffMarriageCertificate,
                  value: ChangedNameHow.MARRIAGE_CERTIFICATE,
                },
                {
                  name: 'applicant2LastNameChangedWhenMarriedMethod',
                  label: l => l.deedPoll,
                  value: ChangedNameHow.DEED_POLL,
                  conditionalText: l => `<p class="govuk-label">${l.deedPollMoreDetails}</p>`,
                },
                {
                  name: 'applicant2LastNameChangedWhenMarriedMethod',
                  label: l => l.anotherWay,
                  value: ChangedNameHow.OTHER,
                  subFields: {
                    applicant2LastNameChangedWhenMarriedOtherDetails: {
                      type: 'textarea',
                      label: l => l.anotherWayMoreDetails,
                      labelSize: null,
                    },
                  },
                  validator: getNameChangeOtherDetailsValidator('applicant2LastNameChangedWhenMarriedOtherDetails'),
                },
              ],
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
    applicant2NameDifferentToMarriageCertificate: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.applicant1NameDifferentToMarriageCertificate,
      hint: l => l.applicant1NameDifferentToMarriageCertificateHint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
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
