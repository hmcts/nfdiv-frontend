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

const en = ({
  isDivorce,
  partner,
  required,
  existingCaseId,
  inviteCaseId,
  contactEmail,
  existingApplicationType,
}: ExistingApplicationContent) => {
  return {
    title: 'You have an existing application',
    line1: `You have an existing application for ${
      isDivorce ? 'divorce' : 'to end your civil partnership'
    }. Your existing application number is ${formattedCaseId(existingCaseId)}.`,
    line2: `You are now being invited to join another application. The application which you are being invited to is ${formattedCaseId(
      inviteCaseId
    )}. If you choose to join it then you will lose access to your existing application.`,
    newApplication: 'I want to join the new application',
    existingApplication: 'I want to continue with my existing application',
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

const cy: typeof en = ({
  isDivorce,
  partner,
  required,
  existingCaseId,
  inviteCaseId,
  contactEmail,
  existingApplicationType,
}: ExistingApplicationContent) => {
  return {
    title: 'Mae gennych gais sydd eisoes yn bod',
    line1: `Mae gennych gais sydd eisoes yn bod ${
      isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
    }. Eich rhif cais presennol yw ${formattedCaseId(existingCaseId)}.`,
    line2: `Rydych nawr yn cael eich gwahodd i ymuno i gais arall. Y cais yr ydych yn cael eich gwahodd iddo yw ${formattedCaseId(
      inviteCaseId
    )}. Os byddwch yn dewis ymateb i gais yna byddwch yn colli mynediad at eich cais presennol.`,
    newApplication: 'Rwyf eisiau ymateb i gais cais newydd',
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
  const translations = languages[content.language](content);

  return {
    ...translations,
    form: content.cannotLinkToNewCase ? undefined : form,
  };
};
