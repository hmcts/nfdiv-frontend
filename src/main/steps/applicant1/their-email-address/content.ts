import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isApplicant2EmailValid, isFieldFilledIn } from '../../../app/form/validation';
import { isApplicant2EmailUpdatePossible } from '../../common/content.utils';

const en = ({ userCase, partner, isDivorce, isJointApplication, hasEnteredSolicitorDetails }) => ({
  title: `Enter your ${partner}'s email address`,
  line1: `It’s important you provide ${
    isJointApplication
      ? `your ${partner}'s email address so they can join and review your joint application before it’s submitted to the court.`
      : `their email address ${
          hasEnteredSolicitorDetails ? 'because the court may need to' : 'so the court can'
        } ‘serve’ (deliver) documents to them online. If you do not provide an email address, the ${
          isDivorce ? 'divorce papers' : 'papers relating to ending your civil partnership'
        } ${
          hasEnteredSolicitorDetails ? 'may' : 'will'
        } be served (delivered) by post. The emails will also contain information and updates relating to ${
          isDivorce ? 'the divorce' : 'ending your civil partnership'
        }.`
  }`,
  line2:
    'Enter the email address which they actively use for personal emails. You should avoid using their work email address because it may not be private.',
  applicant2EmailAddress: `Your ${partner}'s email address`,
  applicant1DoesNotKnowApplicant2EmailAddress: 'I do not know their email address',
  errors: {
    applicant2EmailAddress: {
      required: `You have not entered their email address${
        isJointApplication
          ? '. You have to enter their email address to do a joint application.'
          : ' or said you do not know it. You have to do one or the other before continuing.'
      } `,
      incorrect:
        'You have entered an email address and indicated that you do not know their email address. You can only do one before continuing.',
      invalid: `You have ${
        isJointApplication
          ? 'not entered a valid email address. Check their email address and enter it again. '
          : 'entered an invalid email address. Check it and enter it again before continuing.'
      }`,
      sameEmail: `You have entered your own email address. You need to enter your ${partner}'s email address before continuing.`,
    },
  },
  continueOrResend: isApplicant2EmailUpdatePossible(userCase) ? 'Resend email' : 'Continue',
});

const cy: typeof en = ({ userCase, partner }) => ({
  title: `Nodwch gyfeiriad e-bost eich ${partner}`,
  line1:
    "Mae'n bwysig eich bod yn darparu eu cyfeiriad e-bost oherwydd efallai y bydd y llys angen 'cyflwyno' (danfon) dogfennau iddynt ar-lein. Os na fyddwch yn darparu cyfeiriad e-bost, efallai y bydd y papurau ysgariad yn cael eu cyflwyno (eu danfon) drwy'r post. Bydd y negeseuon e-bost hefyd yn cynnwys gwybodaeth a diweddariadau sy'n ymwneud â'r ysgariad.",
  line2:
    "Nodwch gyfeiriad e-bost maent yn ei ddefnyddio ar gyfer negeseuon personol. Dylech osgoi defnyddio eu cyfeiriad e-bost gwaith oherwydd efallai nad yw'n breifat.",
  applicant2EmailAddress: `Cyfeiriad e-bost eich ${partner}`,
  applicant1DoesNotKnowApplicant2EmailAddress: 'Nid wyf yn gwybod beth yw eu cyfeiriad e-bost',
  errors: {
    applicant2EmailAddress: {
      required:
        "Nid ydych wedi rhoi ei gyfeiriad/chyfeiriad e-bost neu wedi dweud nad ydych yn gwybod beth ydyw. Mae'n rhaid i chi wneud y naill neu'r llall cyn parhau.",
      incorrect:
        'Rydych wedi rhoi cyfeiriad e-bost ac wedi nodi nad ydych yn gwybod beth yw ei gyfeiriad/chyfeiriad e-bost. Dim ond un y gallwch ei wneud cyn parhau.',
      invalid: 'Rydych wedi rhoi cyfeiriad e-bost annilys. Gwiriwch ef a nodwch ef eto cyn parhau.',
      sameEmail: `Rydych wedi nodi’ch cyfeiriad e-bost eich hun. Mae angen i chi nodi cyfeiriad e-bost eich ${partner} cyn parhau.`,
    },
  },
  continueOrResend: isApplicant2EmailUpdatePossible(userCase) ? 'Ail-anfon y neges e-bost' : 'Parhau',
});

export const form: FormContent = {
  fields: userCase => ({
    applicant2EmailAddress: {
      type: 'text',
      label: l => l.applicant2EmailAddress,
      labelSize: null,
      validator: (value, formData) => {
        if (formData.applicant1DoesNotKnowApplicant2EmailAddress !== Checkbox.Checked) {
          return isFieldFilledIn(value) || isApplicant2EmailValid(value as string, userCase.applicant1Email);
        } else if (value) {
          return 'incorrect';
        }
      },
    },
    applicant1DoesNotKnowApplicant2EmailAddress: {
      type: 'checkboxes',
      hidden: isApplicant2EmailUpdatePossible(userCase),
      values: [
        {
          name: 'applicant1DoesNotKnowApplicant2EmailAddress',
          label: l => l.applicant1DoesNotKnowApplicant2EmailAddress,
          value: Checkbox.Checked,
        },
      ],
    },
  }),
  submit: {
    text: l => l.continueOrResend,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase, language } = content;
  const hasEnteredSolicitorDetails =
    userCase.applicant2SolicitorEmail ||
    (userCase.applicant2SolicitorAddressPostcode && userCase.applicant2SolicitorFirmName) ||
    (userCase.applicant2SolicitorAddressPostcode && userCase.applicant2SolicitorAddress1);
  const translations = languages[language]({ ...content, hasEnteredSolicitorDetails });
  const isApplicant2EmailUpdatePossibleAnswer = isApplicant2EmailUpdatePossible(content.userCase);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(userCase || {}) },
    isApplicant2EmailUpdatePossibleAnswer,
  };
};
