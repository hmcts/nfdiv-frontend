import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce }: CommonContent) => ({
  title: 'How do you want to respond to the application?',
  line1: 'You can only dispute the application if: (one or more of the following)',
  point1: `you do not believe the courts of England and Wales have the legal power (jurisdiction) to grant the
    ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  point2: `you do not believe your ${isDivorce ? 'marriage' : 'civil partnership'} is legally valid.
  For example, if one of you was already married or in a civil partnership when you ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  }`,
  point3: `this ${isDivorce ? 'marriage' : 'civil partnership'} has already been legally ended`,
  no: `Continue without disputing the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`,
  yes: `I want to dispute the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`,
  errors: {
    disputeApplication: {
      required: 'You need to select how you want to respond before continuing.',
    },
  },
});

const cy: typeof en = ({ isDivorce }: CommonContent) => ({
  title: 'Sut rydych chi eisiau ymateb i’r cais?',
  line1: 'Gallwch ond herio’r cais os: (yw un neu fwy o’r canlynol yn berthnasol)',
  point1: `nid ydych yn credu bod gan lysoedd Cymru a Lloegr y pŵer cyfreithiol (awdurdodaeth) i ganiatáu’r cais
   ${isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'}`,
  point2: `nid ydych yn credu bod eich ${isDivorce ? 'priodas' : 'partneriaeth sifil'} yn ddilys yn gyfreithiol.
  Er enghraifft, os oedd un ohonoch eisoes yn briod neu mewn partneriaeth sifil pan wnaethoch chi ${
    isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
  }`,
  point3: `mae'r ${isDivorce ? 'briodas' : 'partneriaeth sifil'} hon eisoes wedi dod i ben yn gyfreithiol`,
  no: `Parhau heb herio’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’m partneriaeth sifil i ben'}`,
  yes: `Rwyf eisiau herio’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’m partneriaeth sifil i ben'}`,
  errors: {
    disputeApplication: {
      required: 'Mae angen i chi ddewis sut rydych chi eisiau ymateb cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    disputeApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.no, value: YesOrNo.NO },
        { label: l => l.yes, value: YesOrNo.YES },
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
