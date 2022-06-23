import config from 'config';

import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { SWITCH_TO_SOLE_APPLICATION } from '../../urls';

const en = ({ partner }: CommonContent) => ({
  title: 'Pay and submit',
  line1: `Your joint application has been agreed by you and your ${partner}. You need to pay the application fee of ${getFee(
    config.get('fees.applicationFee')
  )} before it can be submitted. The payment system does not allow you to split the payment.`,
  line2: `You cannot use help with fees to pay because your ${partner} did not apply for help with fees. Both of you need to apply and be eligible in a joint application.`,
  detailsHeading: 'If you cannot pay',
  line3: `The payment system will only allow you to pay, but you could talk to your ${partner} about whether they would be prepared to send you some money.`,
  line4:
    'Or you could submit a sole application. If you apply as a sole applicant, only you have to apply for Help With Fees. You will not have to re-enter the information you have already provided but you will have to provide some new information.',
  line5: `You can <a href="${SWITCH_TO_SOLE_APPLICATION}" class="govuk-link">create a new application here.</a>`,
  line6: 'This joint application will not be submitted until you pay the fee.',
  continue: 'Pay and submit',
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: 'Talu a chyflwyno',
  line1: `Mae eich cais ar y cyd wedi'i gytuno gennych chi a'ch ${partner}. Mae angen i chi dalu’r ffi am wneud cais, sef ${getFee(
    config.get('fees.applicationFee')
  )} cyn y gellir ei gyflwyno. Nid yw’r system dalu yn caniatáu i chi rannu’r taliad.`,
  line2: `Ni allwch ddefnyddio Help i Dalu Ffioedd i dalu oherwydd nad oedd eich ${partner} wedi gwneud cais am Help i Dalu Ffioedd. Mewn cais ar y cyd mae angen i'r ddau ohonoch wneud cais a bod yn gymwys.`,
  detailsHeading: 'Os na allwch dalu',
  line3: `Dim ond chi fydd yn gallu talu drwy’r system daliadau, ond gallwch siarad gyda’ch ${partner} a gofyn a fydd yn fodlon anfon rhywfaint o arian atoch.`,
  line4:
    "Neu gallwch gyflwyno cais unigol. Os byddwch yn gwneud cais fel ceisydd unigol, dim ond chi sydd angen gwneud cais am Help i Dalu Ffioedd. Ni fydd yn rhaid i chi ail-gofnodi'r wybodaeth rydych eisoes wedi'i darparu ond bydd yn rhaid i chi ddarparu rhywfaint o wybodaeth newydd.",
  line5: `Gallwch <a href="${SWITCH_TO_SOLE_APPLICATION}" class="govuk-link">greu cais newydd yma.</a>`,
  line6: "Ni fydd y cais hwn ar y cyd yn cael ei gyflwyno nes i chi dalu'r ffi.",
  continue: 'Talu a chyflwyno',
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
