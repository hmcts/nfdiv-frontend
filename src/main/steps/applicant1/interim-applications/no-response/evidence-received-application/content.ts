import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Has your ${partner} received the ${isDivorce ? 'divorce papers' : 'papers to end your civil partnership'}?`,
  line1: `If you have evidence that your ${partner} has received all the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }, you may be able to apply for 'deemed service'. This means that the court is satisfied that your ${partner} has received the papers, so your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } can proceed without their response.`,
  line2: 'Suitable evidence includes:',
  suitableEvidence: {
    photo: `a photo or screenshot of a message from your ${partner} that shows they have received the papers.`,
    statement: `a statement from you or a third party explaining how your know your ${partner} has received the papers.`,
    message: `a message from us to tell you that your ${partner} has started a response.`,
  },
  canYouProveHeader: `Do you have evidence that your ${partner} has received the papers?`,
  proveYes: `Yes, I have evidence that my ${partner} has received the papers.`,
  proveNo: 'No, I do not have any suitable evidence.',
  errors: {
    noResponsePartnerHasReceivedPapers: {
      required: 'You must select an option before continuing.',
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: `A yw eich ${partner} wedi cael papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  }?`,
  line1: `Os oes gennych dystiolaeth bod eich ${partner} wedi cael papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  }, efallai y gallwch wneud cais am ‘gyflwyno tybiedig’. Mae hyn yn golygu bod y llys yn derbyn bod eich ${partner} wedi cael y papurau, ac felly gall eich ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } barhau heb eu hymateb.`,
  line2: 'Mae tystiolaeth addas yn cynnwys:',
  suitableEvidence: {
    photo: `llun neu sgrinlun o neges gan eich ${partner} sy’n dangos eu bod wedi cael y papurau.`,
    statement: `datganiad gennych chi neu drydydd parti yn egluro sut rydych yn gwybod bod eich ${partner} wedi cael y papurau.`,
    message: `neges gennym ni i ddweud wrthych bod eich ${partner} wedi dechrau eu hymateb.`,
  },
  canYouProveHeader: `Allwch chi brofi bod eich ${partner} wedi cael y papurau?`,
  proveYes: `Gallaf, mi allaf brofi bod fy ${partner} wedi cael y papurau.`,
  proveNo: 'Na allaf, nid oes gennyf unrhyw dystiolaeth addas.',
  errors: {
    noResponsePartnerHasReceivedPapers: {
      required: `You must confirm whether or not you can prove that your ${partner} has received the papers.`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponsePartnerHasReceivedPapers: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.canYouProveHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.proveYes,
          id: 'proveYes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.proveNo,
          id: 'proveNo',
          value: YesOrNo.NO,
        },
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
