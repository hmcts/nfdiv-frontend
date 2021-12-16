import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-answers/content';
import { CommonContent } from '../../common/common.content';

const en = ({ checkYourAnswersPartner, required }) => ({
  title: `Check your ${checkYourAnswersPartner}'s answers`,
  line1: `This is the information your ${checkYourAnswersPartner} provided for your joint application. Check it to make sure it’s correct.`,
  detailsCorrect: `Is the information your ${checkYourAnswersPartner} provided correct?`,
  detailsCorrectHint: `If you select no then your ${checkYourAnswersPartner} will be notified and asked to change it.`,
  explainWhyIncorrect: `Explain what is incorrect or needs changing. Your answer will be sent to your ${checkYourAnswersPartner}.`,
  continue: 'Continue',

  //   [urls.JURISDICTION_INTERSTITIAL_URL]: {
  //     connections:
  //       (userCase.connections && userCase.connections?.length > 1
  //         ? connectionBulletPointsTextForSoleAndJoint(userCase.connections, checkYourAnswersPartner)
  //         : '') +
  //       moreDetailsComponent(
  //         jurisdictionMoreDetailsContent(userCase.connections, isDivorce).connectedToEnglandWales,
  //         jurisdictionMoreDetailsContent(userCase.connections, isDivorce).readMore
  //       ),
  //   },

  errors: {
    applicant2Confirmation: {
      required,
    },
    applicant2Explanation: {
      required,
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    applicant2Confirmation: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.detailsCorrect,
      hint: l => l.detailsCorrectHint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            applicant2Explanation: {
              type: 'textarea',
              label: l => l.explainWhyIncorrect,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const getApplicant1PartnerContent = (content: CommonContent): string => {
  if (content.userCase?.sameSex !== Checkbox.Checked && content.partner !== content.civilPartner) {
    return content.partner === content.husband ? content.wife : content.husband;
  } else {
    return content.partner;
  }
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  content.checkYourAnswersPartner = content.partner;
  content.partner = getApplicant1PartnerContent(content);
  const translations = languages[content.language](content);
  return {
    ...applicant1GenerateContent(content),
    ...translations,
    form,
  };
};
