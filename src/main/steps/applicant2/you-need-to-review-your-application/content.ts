import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, isJointApplication, userCase }: CommonContent) => ({
  title: 'You need to review your joint application',
  line1: `Your ${partner}${
    isJointApplication && userCase.applicant1SolicitorRepresented === YesOrNo.YES ? "'s solicitor" : ''
  } has created ${
    isDivorce ? 'a divorce application' : 'an application to end your civil partnership'
  }. They have indicated they want to submit the application jointly with you. A joint application is when you both review and submit the application together.`,
  line2: `You need to review the information they have provided. If you confirm it’s correct and confirm the application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  } can be made, then it can be submitted. If you do not confirm then you will be told what you can do next.`,
  line3:
    'You will also be asked to provide some information.' +
    (isJointApplication && userCase.applicant1SolicitorRepresented === YesOrNo.YES
      ? ` You will see that some answers have already been selected. This is because your ${partner}’s solicitor has already provided some information on your behalf. You can change the answers if you do not agree with them.`
      : ''),
});

const cy: typeof en = ({ isDivorce, partner, civilPartner }: CommonContent) => ({
  title: 'Mae arnoch angen adolygu eich cais ar y cyd',
  line1: `Mae eich ${isDivorce ? partner : civilPartner} wedi creu ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  }. Maen nhw wedi mynegi eu bod eisiau cyflwyno’r cais ar y cyd gyda chi. Cais ar y cyd yw pan fyddwch yn adolygu a chyflwyno’r cais gyda’ch gilydd.`,
  line2: `Mae arnoch angen adolygu’r wybodaeth maen nhw wedi’i darparu. Os byddwch yn cadarnhau ei bod yn gywir ac yn cadarnhau y gellir gwneud y cais ${
    isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
  }, yna gellir ei gyflwyno. Os na fyddwch yn cadarnhau, fe gewch wybod beth gallwch chi ei wneud nesaf.`,
  line3: 'Byddwch hefyd wedi cael eich gofyn i ddarparu rhywfaint o wybodaeth.',
});

export const form: FormContent = {
  fields: {},
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
