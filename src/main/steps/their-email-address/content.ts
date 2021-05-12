import { Checkbox } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isEmailValid, isFieldFilledIn } from '../../app/form/validation';

const en = ({ partner, isDivorce }) => ({
  title: `Enter your ${partner}'s email address`,
  line1: `It’s important you provide their email address so the court can ‘serve’ (deliver) documents to them online. If you do not provide an email address, the ${
    isDivorce ? 'divorce papers' : 'papers relating to ending your civil partnership'
  } will be served (delivered) by post. The emails will also contain information and updates relating to ${
    isDivorce ? 'the divorce' : 'ending your civil partnership'
  }.`,
  line2: 'If you use their work email address, you should ask their permission first.',
  respondentEmailAddress: `Your ${partner}'s email address`,
  doNotKnowRespondentEmailAddress: 'I do not know their email address',
  errors: {
    respondentEmailAddress: {
      required:
        'You have not entered their email address or said you do not know it. You have to do one or the other before continuing.',
      incorrect:
        'You have entered an email address and indicated that you do not know their email address. You can only do one before continuing.',
      invalid: 'You have entered an invalid email address. Check it and enter it again before continuing.',
    },
  },
});

const cy = ({ partner }) => ({
  title: `Nodwch gyfeiriad e-bost eich ${partner}`,
  line1:
    "Mae'n bwysig eich bod yn darparu ei gyfeiriad/chyfeiriad e-bost fel y gall y llys 'gyflwyno' (danfon) dogfennau iddo/iddi ar-lein. Os na fyddwch yn darparu cyfeiriad e-bost, bydd y papurau ysgariad yn cael eu cyflwyno (eu danfon) drwy'r post. Bydd y negeseuon e-bost hefyd yn cynnwys gwybodaeth a diweddariadau sy'n ymwneud â'r ysgariad.",
  line2: 'Os ydych yn defnyddio ei gyfeiriad/chyfeiriad e-bost gwaith, dylech ofyn am ganiatâd yn gyntaf.',
  respondentEmailAddress: `Cyfeiriad e-bost eich ${partner}`,
  doNotKnowRespondentEmailAddress: 'Nid wyf yn gwybod beth yw ei gyfeiriad/chyfeiriad e-bost',
  errors: {
    respondentEmailAddress: {
      required:
        "Nid ydych wedi rhoi ei gyfeiriad/chyfeiriad e-bost neu wedi dweud nad ydych yn gwybod beth ydyw. Mae'n rhaid i chi wneud y naill neu'r llall cyn parhau.",
      incorrect:
        'Rydych wedi rhoi cyfeiriad e-bost ac wedi nodi nad ydych yn gwybod beth yw ei gyfeiriad/chyfeiriad e-bost. Dim ond un y gallwch ei wneud cyn parhau.',
      invalid: 'Rydych wedi rhoi cyfeiriad e-bost annilys. Gwiriwch ef a nodwch ef eto cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    respondentEmailAddress: {
      type: 'text',
      label: l => l.respondentEmailAddress,
      validator: (value, formData) => {
        if (formData.doNotKnowRespondentEmailAddress !== Checkbox.Checked) {
          return isFieldFilledIn(value) || isEmailValid(value);
        } else if (value) {
          return 'incorrect';
        }
      },
    },
    doNotKnowRespondentEmailAddress: {
      type: 'checkboxes',
      values: [
        {
          name: 'doNotKnowRespondentEmailAddress',
          label: l => l.doNotKnowRespondentEmailAddress,
          value: Checkbox.Checked,
        },
      ],
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
