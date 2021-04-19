import { Checkbox } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { CommonContent } from '../common/common.content';
import { habitualAndDomicileHelp } from '../you-can-use-english-welsh-courts/content';

const en = ({ isDivorce, applyForDivorce, applyForDissolution, partner, formState }: CommonContent) => {
  const apply = isDivorce ? applyForDivorce : applyForDissolution;
  let reasonsToApplyInEnglandOrWales;
  if (formState?.jurisdictionResidualEligible === YesOrNo.YES) {
    reasonsToApplyInEnglandOrWales = 'the courts of England and Wales have jurisdiction on a residual basis';
  } else if (formState?.lastHabituallyResident === YesOrNo.NO && formState?.sameSex === Checkbox.Checked) {
    reasonsToApplyInEnglandOrWales = `your ${partner} is domiciled in England or Wales`;
  } else {
    reasonsToApplyInEnglandOrWales = 'you are domiciled in England and Wales';
  }
  return {
    title: `You can use English or Welsh courts to ${apply}`,
    line1: `Your answers indicate that you can ${apply} in England and Wales because:`,
    line2: reasonsToApplyInEnglandOrWales,
    ...habitualAndDomicileHelp.en,
  };
};

const cy = en;

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = { en, cy };

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
