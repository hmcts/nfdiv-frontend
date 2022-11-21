import config from 'config';
import dayjs from 'dayjs';

import { Checkbox } from '../../../app/case/case';
import { State, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/finalising-your-application/content';

const labels = content => ({
  errors: {
    doesApplicant2WantToApplyForFinalOrder: content.errors.doesApplicant1WantToApplyForFinalOrder,
  },
});

export const form: FormContent = {
  fields: {
    doesApplicant2WantToApplyForFinalOrder: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'doesApplicant2WantToApplyForFinalOrder',
          label: l => l.checkboxLine,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
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
  const { userCase } = content;

  const isIntendingAndAbleToSwitchToSoleFo =
    userCase.applicant2AppliedForFinalOrderFirst === YesOrNo.YES &&
    userCase.doesApplicant2IntendToSwitchToSole === YesOrNo.YES &&
    dayjs().isAfter(
      dayjs(userCase.dateApplicant2DeclaredIntentionToSwitchToSoleFo).add(
        config.get('dates.switchToSoleFinalOrderIntentionNotificationOffsetDays'),
        'day'
      )
    ) &&
    userCase.state === State.AwaitingJointFinalOrder;

  applicant1Content.isIntendingAndAbleToSwitchToSoleFo = isIntendingAndAbleToSwitchToSoleFo;

  applicant1Content.isJointApplicationAndNotSwitchingToSoleFo =
    applicant1Content.isJointApplication && !isIntendingAndAbleToSwitchToSoleFo;

  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form,
  };
};
