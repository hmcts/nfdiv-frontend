import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Contacting your ${partner}'s last known employer`,
  line1: `If you know where your ${partner} last worked, you should try contacting the employer. They may be able to confirm whether your ${partner} still works there, or help you trace your ${partner}.`,
  line2: `If the employer can confirm that your ${partner} still works there, you should not proceed with this application to dispense with service. You could instead consider hiring a process server to deliver the papers to their work address.`,
  line3: `You could also ask the employer to send a stamped envelope containing the papers to your ${partner} on your behalf. We will send you the papers on request. You do not need to tell the employer what the envelope contains.`,
  line4: `Once the employer confirms that they have sent the envelope, if your ${partner} does not respond within 14 days you can continue this application.`,
  triedContactingEmployerHeader: `Have you tried contacting your ${partner}'s last known employer?`,
  whyNoContactingEmployerHeader: 'Explain why you have not tried contacting the last known employer',
  yes: 'Yes',
  no: 'No',
  errors: {
    applicant1DispenseTriedContactingEmployer: {
      required: `Select yes if you have tried contacting your ${partner}'s last known employer`,
    },
    applicant1DispenseWhyNoContactingEmployer: {
      required: 'Enter details about why you have not tried contacting the last known employer',
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Cysylltu â chyflogwr hysbys diwethaf eich ${partner}`,
  line1: `Os ydych yn gwybod ble wnaeth eich ${partner} weithio ddiwethaf, dylech geisio cysylltu â’r cyflogwr. Efallai y gallan nhw gadarnhau pa un a yw eich ${partner} yn dal i weithio yno, neu eich helpu i ddod o hyd i’ch ${partner}.`,
  line2: `Os gall y cyflogwr gadarnhau bod eich ${partner} yn dal i weithio yno, ni ddylech symud ymlaen gyda’r cais hwn i hepgor cyflwyno. Yn hytrach, gallech ystyried llogi gweinyddwr proses i gludo’r papurau i’w cyfeiriad gwaith.`,
  line3: `Gallech hefyd ofyn i’r cyflogwr anfon amlen â stamp yn cynnwys y papurau i’ch ${partner} ar eich rhan. Byddwn yn anfon y papurau atoch ar gais. Nid ydych angen dweud wrth y cyflogwr beth sy’n yr amlen.`,
  line4: `Unwaith y bydd y cyflogwr yn cadarnhau eu bod wedi anfon yr amlen, os nad yw eich ${partner} yn ymateb o fewn 14 diwrnod gallwch barhau â’r cais hwn.`,
  triedContactingEmployerHeader: `A ydych wedi ceisio cysylltu â chyflogwr hysbys diwethaf eich ${partner}?`,
  whyNoContactingEmployerHeader: 'Eglurwch pam nad ydych wedi ceisio cysylltu â’r cyflogwr hysbys diwethaf',
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    applicant1DispenseTriedContactingEmployer: {
      required: `Dewiswch “Ydw” os ydych wedi ceisio cysylltu â chyflogwr hysbys diwethaf eich ${partner}`,
    },
    applicant1DispenseWhyNoContactingEmployer: {
      required: 'Eglurwch pam nad ydych wedi ceisio cysylltu â’r cyflogwr hysbys diwethaf',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseTriedContactingEmployer: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.triedContactingEmployerHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
          subFields: {
            applicant1DispenseWhyNoContactingEmployer: {
              type: 'textarea',
              label: l => l.whyNoContactingEmployerHeader,
              labelHidden: true,
              hint: l => l.whyNoContactingEmployerHeader,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
