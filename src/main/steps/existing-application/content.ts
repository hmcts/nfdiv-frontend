import { ApplicationType } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { formattedCaseId } from '../common/content.utils';

import { ExistingApplicationContent } from './get';

export enum existingOrNew {
  Completed = 'completed',
  Existing = 'existing',
  New = 'new',
}

const en = (
  { isDivorce, partner, required, existingCaseId, completedCaseId, contactEmail, existingApplicationType }: ExistingApplicationContent,
  isInviteCaseJoint: boolean
) => {
  const respondJoin = `${isInviteCaseJoint ? 'join' : 'respond to'}`;
  return {
    title: 'You have multiple divorce cases',
    lineCompleted: `You have a completed divorce case from a previous marriage. The application number for this divorce was ${completedCaseId ? formattedCaseId(completedCaseId) : null}.`,
    line1: `You have an ongoing application for ${
      isDivorce ? 'divorce' : 'to end your civil partnership'
    }. The application number is ${formattedCaseId(existingCaseId)}.`,
    line2: `You are now being invited to ${respondJoin} a new application created by your current ${partner}.`,
    completedApplication: `I want to view my completed divorce`,
    newApplication: `I want to ${respondJoin} the new application`,
    existingApplication: 'I want to continue with my ongoing application',
    newSelected: 'You will lose access to your existing application',
    existingSelected: 'You will not ever be able to access the new application',
    cannotJoin: `${
      ApplicationType.SOLE_APPLICATION === existingApplicationType
        ? 'You cannot join or create a new application. This is because you have an existing case. You are not allowed to have more than one application by law.'
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
    exitService: 'Exit service',
    errors: {
      existingOrNewApplication: {
        required,
      },
    },
  };
};

const cy: typeof en = (
  { isDivorce, partner, required, existingCaseId, contactEmail, existingApplicationType, completedCaseId }: ExistingApplicationContent,
  isInviteCaseJoint: boolean
) => {
  const respondJoin = `${isInviteCaseJoint ? 'ymateb i gais' : 'ymuno â chais'}`;
  return {
    title: 'Mae gennych gais sydd eisoes yn bod',
    lineCompleted: `You have a completed divorce case from a previous marriage ${ completedCaseId ? formattedCaseId(completedCaseId) : null}`,
    line1: `Mae gennych gais sydd eisoes yn bod ${
      isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
    }. Eich rhif cais presennol yw ${formattedCaseId(existingCaseId)}.`,
    line2: `Rydych nawr yn cael eich gwahodd i ${respondJoin} newydd a grëwyd gan eich ${partner}.
            Os byddwch yn dewis ${respondJoin} yna byddwch yn colli mynediad at eich cais presennol.`,
    completedApplication: `I want to view my previously completed divorce`,
    newApplication: `Rwyf eisiau ${respondJoin} cais newydd`,
    existingApplication: 'Rwyf eisiau parhau â fy nghais presennol',
    newSelected: 'Byddwch yn colli mynediad at eich cais presennol',
    existingSelected: 'Ni fyddwch byth yn gallu cael mynediad i’r cais newydd',
    cannotJoin: `${
      ApplicationType.SOLE_APPLICATION === existingApplicationType
        ? `Ni allwch ymuno neu greu cais newydd oherwydd bod eich ${partner} eisoes wedi ymateb i'ch cais presennol.`
        : `Ni allwch ymuno neu greu cais newydd oherwydd eich bod yn gwneud cais ar y cyd gyda'ch ${partner} ` +
          "ac mae'r ddau ohonoch wedi ei gadarnhau a'i gyflwyno."
    }`,
    changeExisting: {
      summary: 'Os ydych chi eisiau newid rhywbeth yn eich cais presennol',
      detail:
        `Gallwch gysylltu â’r llys i ofyn am newid eich cais. Anfonwch fanylion y cais i  ${contactEmail}. ` +
        `Gwnewch yn siŵr eich bod yn cynnwys cyfeirnod eich achos: ${formattedCaseId(existingCaseId)}.`,
    },
    startNewApplication: {
      summary: 'Os ydych eisiau dechrau cais newydd',
      detail:
        'Mae angen i chi dynnu eich cais presennol yn ôl os ydych eisiau dechrau un newydd. ' +
        'Gallwch ei dynnu yn ôl trwy lwytho ffurflen D11 i lawr, ei llenwi a’i hanfon i’r llys. ' +
        'Mae manylion ar y ffurflen gais yn egluro i ble y dylid ei hanfon.',
    },
    exitService: 'Gadael y gwasanaeth',
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
        { label: l => l.completedApplication, value: existingOrNew.Completed },
        { label: l => l.existingApplication, value: existingOrNew.Existing },
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
