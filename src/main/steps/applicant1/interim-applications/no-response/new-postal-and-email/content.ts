import { NoResponsePartnerNewEmailOrAddress } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Update your ${partner}'s contact details`,
  line1: `We will try to send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to the new postal address or email address. You will not have to pay for this.`,
  line2: `We cannot send court documents to addresses outside of England and Wales. If your ${partner} is living outside of England and Wales, you will need to send them the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } yourself. We will post the documents to you so that you can arrange this.`,
  newDetailsHeader: 'Which of your partner’s contact details do you need to update?',
  newPostalAddress: 'I have a new postal address',
  newEmailAddress: 'I have a new email address',
  newEmailAndPostalAddress: 'I have a new email address and postal address',
  errors: {
    applicant1NoResponsePartnerNewEmailOrPostalAddress: {
      required: 'You must select an option before continuing',
    },
  },
});

const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Diweddaru manylion cyswllt eich ${partner}`,
  line1: `Byddwn yn ceisio anfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } i’r cyfeiriad post neu’r cyfeiriad e-bost newydd. Ni fydd rhaid i chi dalu am hyn.`,
  line2: `Ni allwn anfon dogfennau’r llys i gyfeiriadau rhyngwladol. Os yw eich ${partner} yn byw dramor, bydd angen i chi anfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } atynt eich hun. Mi wnawn bostio’r dogfennau atoch fel y gallwch chi drefnu hyn.`,
  newDetailsHeader: `Pa fanylion cyswllt ar gyfer eich ${partner} ydych chi angen diweddaru?`,
  newPostalAddress: 'Mae gennyf gyfeiriad post newydd',
  newEmailAddress: 'Mae gennyf gyfeiriad e-bost newydd',
  newEmailAndPostalAddress: 'Mae gennyf gyfeiriad e-bost a chyfeiriad post newydd',
  errors: {
    applicant1NoResponsePartnerNewEmailOrPostalAddress: {
      required: 'Rhaid i chi ddewis opsiwn cyn parhau',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponsePartnerNewEmailOrAddress: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.newDetailsHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.newPostalAddress,
          id: 'newPostalAddress',
          value: NoResponsePartnerNewEmailOrAddress.ADDRESS,
        },
        {
          label: l => l.newEmailAddress,
          id: 'newEmailAddress',
          value: NoResponsePartnerNewEmailOrAddress.EMAIL,
        },
        {
          label: l => l.newEmailAndPostalAddress,
          id: 'bothEmailAndPostalAddress',
          value: NoResponsePartnerNewEmailOrAddress.EMAIL_AND_ADDRESS,
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

export const generateContent: TranslationFn = (content: CommonContent): Record<string, unknown> => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
