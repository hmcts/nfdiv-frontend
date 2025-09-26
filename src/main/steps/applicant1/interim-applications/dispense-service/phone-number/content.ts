import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { ALTERNATIVE_SERVICE_APPLICATION } from '../../../../urls';

const en = ({ partner }: CommonContent) => ({
  title: `Your ${partner}'s telephone numbers`,
  line1: `If you have any telephone numbers for your ${partner}, provide them below. You will need to explain the attempts made by you or someone else to contact them by telephone, and why you have not been successful. For example, this could be being told the number has not been recognised, or someone you do not recognise answering the phone.`,
  line2: `You should only attempt to contact your ${partner} if it is safe to do so.`,
  line3: `If you know your ${partner} has a telephone number they actively use, you could consider <a class="govuk-link" target="_blank" href="${ALTERNATIVE_SERVICE_APPLICATION}">applying for alternative service (opens in a new tab)</a>.`,
  yes: 'Yes',
  no: 'No',
  havePartnerPhoneNumbersHeader: `Do you have any phone numbers for your ${partner}?`,
  errors: {
    applicant1DispenseHavePartnerPhoneNumbers: {
      required: `Select yes if you know any phone numbers for your ${partner}`,
    },
  },
});

const cy = ({ partner }: CommonContent) => ({
  title: `Rhif(au) ffôn eich ${partner}`,
  line1: `Os oes gennych unrhyw rifau ffôn ar gyfer eich ${partner}, rhowch nhw isod. Byddwch angen egluro’r ymdrechion a wnaed gennych chi neu rywun arall i gysylltu â nhw dros y ffôn, a pham nad ydych wedi bod yn llwyddiannus. Er enghraifft, gallai hyn gynnwys bod y rhif heb gael ei adnabod, neu rywun nad ydych yn ei adnabod yn ateb y ffôn.`,
  line2: `Dylech ond ymdrechu i gysylltu â’ch ${partner} os yw’n ddiogel gwneud hynny.`,
  line3: `Os ydych yn gwybod bod gan eich ${partner} rif ffôn maent yn ei ddefnyddio’n rheolaidd, gallech ystyried <a class="govuk-link" target="_blank" href="${ALTERNATIVE_SERVICE_APPLICATION}">gwneud cais am gyflwyno amgen (yn agor mewn tab newydd)</a>.`,
  yes: 'Oes',
  no: 'Nac oes',
  havePartnerPhoneNumbersHeader: `Oes gennych chi unrhyw rifau ffôn i’ch ${partner}?`,
  errors: {
    applicant1DispenseHavePartnerPhoneNumbers: {
      required: `Dewiswch “Oes” os ydych yn gwybod unrhyw rifau ffôn i’ch ${partner}`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseHavePartnerPhoneNumbers: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.havePartnerPhoneNumbersHeader,
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
