import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: 'Residual jurisdiction',
  line1: `Your answers indicate that the main grounds under which the courts of England and Wales have jurisdiction to consider your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } do not apply. However, you still may be able to apply ${
    isDivorce ? 'for a divorce' : 'to end your civil partnership'
  } in England or Wales based on the court’s ‘residual jurisdiction’.`,
  line2:
    'If you’re in a same-sex couple and if none of the other connections apply, the court may still have jurisdiction if:',
  bulletpoint1: `you ${isDivorce ? 'married' : 'formed your civil partnership'} in England or Wales and`,
  bulletpoint2: `it would be in the interests of justice for the court to consider the application. For example, your home country does not allow ${
    isDivorce ? 'divorce' : 'civil partnerships to be ended'
  } between same-sex couples.`,
  line3:
    'Residual jurisdiction can be more complex. If you’re not sure if it applies to you, you should seek legal advice.',
  jurisdictionResidualEligible: 'Are you eligible for residual jurisdiction?',
  errors: {
    jurisdictionResidualEligible: {
      required,
    },
  },
});

const cy: typeof en = ({ isDivorce, required }) => ({
  title: 'Awdurdodaeth weddillol',
  line1: `Dengys eich atebion nad yw'r prif resymau sy'n rhoi awdurdodaeth i lysoedd Cymru a Lloegr ystyried eich ${
    isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
  } yn berthnasol. Fodd bynnag, efallai y byddwch dal yn gallu gwneud cais ${
    isDivorce ? 'am ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
  } yng Nghymru a Lloegr yn seiliedig ar 'awdurdodaeth weddillol' y llys.`,
  line2:
    "Os ydych yn gwpl o'r un rhyw ac os nad oes unrhyw un o'r cysylltiadau eraill yn berthnasol, efallai y bydd gan y llys awdurdodaeth o hyd os:",
  bulletpoint1: `bu ichi ${isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'} yng Nghymru neu Loegr, a`,
  bulletpoint2: `byddai er budd cyfiawnder i'r llys ystyried y cais. Er enghraifft, nid yw eich gwlad gartref yn caniatáu i gyplau o'r un rhyw ${
    isDivorce ? 'gael ysgariad' : "ddod â'u partneriaeth sifil i ben"
  }.`,
  line3:
    "Gall awdurdodaeth weddillol fod yn fwy cymhleth. Os nad ydych yn siŵr a yw'n berthnasol i chi, dylech geisio cyngor cyfreithiol.",
  jurisdictionResidualEligible: "Ydych chi'n gymwys am awdurdodaeth weddilliol?",
  errors: {
    jurisdictionResidualEligible: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    jurisdictionResidualEligible: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.jurisdictionResidualEligible,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
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
