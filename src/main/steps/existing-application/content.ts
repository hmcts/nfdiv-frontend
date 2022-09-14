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
  { isDivorce, partner, required, existingCaseId, contactEmail, existingApplicationType }: ExistingApplicationContent,
  isInviteCaseJoint: boolean
) => {
  const respondJoin = `${isInviteCaseJoint ? 'join' : 'respond to'}`;
  return {
    title: 'You have an existing application',
    line1: `You have an existing application for ${
      isDivorce ? 'divorce' : 'to end your civil partnership'
    }. Your existing application number is ${formattedCaseId(existingCaseId)}.`,
    line2: `You are now being invited to ${respondJoin} a new application created by your ${partner}.
            If you choose to ${respondJoin} it then you will lose access to your existing application.`,
    newApplication: `I want to ${respondJoin} the new application`,
    existingApplication: 'I want to continue with my existing application',
    newSelected: 'You will lose access to your existing application',
    existingSelected: 'You will not ever be able to access the new application',
    cannotJoin: `${
      ApplicationType.SOLE_APPLICATION === existingApplicationType
        ? `You cannot join or create a new application because your ${partner} has already responded to your existing application.`
        : `You cannot join or create a new application because you are doing a joint application with your ${partner} ` +
          'and you have both confirmed and submitted it.'
    }`,
    changeExisting: {
      summary: 'If you want to change something in your existing application',
      detail:
        `You can contact the court to request a change to your application. Send details of the request to ${contactEmail}. ` +
        `Make sure you include your case reference number: ${formattedCaseId(existingCaseId)}.`,
    },
    startNewApplication: {
      summary: 'If you want to start a new application',
      detail:
        'You need to withdraw your existing application if you want to start a new one. ' +
        'You can withdraw it by downloading and filling out a D11 form and sending it to the court. ' +
        'Details of where to send it are on the application form.',
    },
    errors: {
      existingOrNewApplication: {
        required,
      },
    },
  };
};

const cy: typeof en = (
  { isDivorce, partner, required, existingCaseId, contactEmail, existingApplicationType }: ExistingApplicationContent,
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
    cannotJoin: `${
      ApplicationType.SOLE_APPLICATION === existingApplicationType
        ? `You cannot join or create a new application because your ${partner} has already responded to your existing application.`
        : `You cannot join or create a new application because you are doing a joint application with your ${partner} ` +
          'and you have both confirmed and submitted it.'
    }`,
    changeExisting: {
      summary: 'If you want to change something in your existing application',
      detail:
        `You can contact the court to request a change to your application. Send details of the request to ${contactEmail}. ` +
        `Make sure you include your case reference number: ${formattedCaseId(existingCaseId)}.`,
    },
    startNewApplication: {
      summary: 'If you want to start a new application',
      detail:
        'You need to withdraw your existing application if you want to start a new one. ' +
        'You can withdraw it by downloading and filling out a D11 form and sending it to the court. ' +
        'Details of where to send it are on the application form.',
    },
    errors: {
      existingOrNewApplication: {
        required,
      },
    },
  };
};

export const form: FormContent = {
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
  return {
    ...translations,
    form: content.cannotLinkToNewCase ? undefined : form,
  };
};
