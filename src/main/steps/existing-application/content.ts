import { ApplicationType } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { formattedCaseId } from '../common/content.utils';

import { ExistingApplicationContent } from './get';

export enum existingOrNew {
  Existing = 'existing',
  New = 'new',
}

const en = (
  { isDivorce, partner, required, existingCaseId }: ExistingApplicationContent,
  isInviteCaseJoint: boolean
) => {
  const respondJoin = `${isInviteCaseJoint ? 'join' : 'respond to'}`;
  return {
    title: 'You have an existing application',
    line1: `You already have an existing application for ${
      isDivorce ? 'divorce' : 'to end your civil partnership'
    }. Your existing application number is ${formattedCaseId(existingCaseId)}.`,
    line2: `You are now being invited to ${respondJoin} a new application created by your ${partner}.
            If you choose to ${respondJoin} it then you will lose access to your existing application.`,
    newApplication: `I want to ${respondJoin} the new application`,
    existingApplication: 'I want to continue with my existing application',
    newSelected: 'You will lose access to your existing application',
    existingSelected: 'You will not ever be able to access the new application',
    errors: {
      existingOrNewApplication: {
        required,
      },
    },
  };
};

const cy: typeof en = (
  { isDivorce, partner, required, existingCaseId }: ExistingApplicationContent,
  isInviteCaseJoint: boolean
) => {
  const respondJoin = `${isInviteCaseJoint ? 'ymateb i gais' : 'ymuno â chais'}`;
  return {
    title: 'Mae gennych gais sydd eisoes yn bod',
    line1: `Mae gennych gais sydd eisoes yn bod ${
      isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
    }. Eich rhif cais presennol yw ${formattedCaseId(existingCaseId)}.`,
    line2: `Rydych nawr yn cael eich gwahodd i ${respondJoin} newydd a grëwyd gan eich ${partner}.
            Os byddwch yn dewis ${respondJoin} yna byddwch yn colli mynediad at eich cais presennol.`,
    newApplication: `Rwyf eisiau ${respondJoin} cais newydd`,
    existingApplication: 'Rwyf eisiau parhau â fy nghais presennol',
    newSelected: 'Byddwch yn colli mynediad at eich cais presennol',
    existingSelected: 'Ni fyddwch byth yn gallu cael mynediad i’r cais newydd',
    errors: {
      existingOrNewApplication: {
        required,
      },
    },
  };
};

export const formContent: FormContent = {
  fields: {
    existingOrNewApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.newApplication, value: existingOrNew.New, warning: l => l.newSelected },
        { label: l => l.existingApplication, value: existingOrNew.Existing, warning: l => l.existingSelected },
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

export const generateContent: TranslationFn = (content: ExistingApplicationContent) => {
  const isInviteCaseJoint = content.inviteCaseApplicationType === ApplicationType.JOINT_APPLICATION;
  const translations = languages[content.language](content, isInviteCaseJoint);
  const form = content.cannotLinkToNewCase ? {} : formContent;
  return {
    ...translations,
    form,
  };
};
