import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ applicant2, isDivorce, applicant2EmailProvided, required }) => ({
  title: `Do you have your ${applicant2}'s postal address?`,
  line1: `${
    applicant2EmailProvided
      ? `The court needs your ${applicant2}'s address, to notify them about the ${
          isDivorce ? 'divorce' : 'ending your civil partnership'
        }.`
      : `It’s important you provide your ${applicant2}'s address. You did not provide their email address and the court needs a way to ‘serve’ (deliver) the ${
          isDivorce ? 'divorce' : 'ending your civil partnership'
        } papers to them.`
  }`,
  line2:
    'It can be their home address or their solicitor’s address. It can be UK or international. If you use their work address, you need to ask their permission.',
  line3: `If you do not know their current address then you can use their last-known address. ${
    !applicant2EmailProvided
      ? 'If they do not respond at the address you provide, then you will need to make a separate application to serve (deliver) the papers to them another way.'
      : ''
  }`,
  haveTheirAddress: 'Yes, I have their address',
  doNotHaveTheirAddress: 'No, I do not have their address',
  errors: {
    knowApplicant2Address: {
      required,
    },
  },
});

const cy: typeof en = ({ applicant2, isDivorce, applicant2EmailProvided, required }) => ({
  title: `A oes gennych gyfeiriad post eich ${applicant2}?`,
  line1: `${
    applicant2EmailProvided
      ? `Mae angen cyfeiriad eich ${applicant2} ar y llys, i'w hysbysu am yr ${
          isDivorce ? 'ysgariad' : 'y cais i ddod â phartneriaeth sifil i ben'
        }.`
      : `Mae'n bwysig eich bod yn darparu cyfeiriad eich ${applicant2}. Ni wnaethoch ddarparu ei gyfeiriad/chyfeiriad e-bost ac mae'r llys angen ffordd i 'gyflwyno' (danfon) y papurau ${
          isDivorce ? 'ysgariad' : "dod â'ch partneriaeth sifil i ben"
        } iddo/iddi.`
  }`,
  line2:
    "Gall fod yn gyfeiriad cartref iddo/iddi neu'n gyfeiriad ei gyfreithiwr/chyfreithiwr. Gall fod yn y DU neu'n rhyngwladol. Os ydych yn defnyddio ei gyfeiriad/chyfeiriad gwaith, mae angen i chi ofyn am ganiatâd.",
  line3: `Os nad ydych yn gwybod beth yw ei gyfeiriad/chyfeiriad presennol yna gallwch ddefnyddio ei gyfeiriad/chyfeiriad hysbys diwethaf. ${
    !applicant2EmailProvided
      ? "Os nad yw'n ymateb yn y cyfeiriad a roddwch, yna bydd angen i chi wneud cais ar wahân i gyflwyno (danfon) y papurau ato/ati mewn ffordd arall."
      : ''
  }`,
  haveTheirAddress: 'Oes, mae gennyf ei gyfeiriad/chyfeiriad',
  doNotHaveTheirAddress: 'Na, nid yw ei gyfeiriad/chyfeiriad gennyf',
  errors: {
    knowApplicant2Address: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    knowApplicant2Address: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.haveTheirAddress, value: YesOrNo.YES },
        { label: l => l.doNotHaveTheirAddress, value: YesOrNo.NO },
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
