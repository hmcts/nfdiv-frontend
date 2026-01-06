import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import type { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent, relationship: string) => {
  return {
    title: `How is your name written on your ${relationship} certificate`,
    line1: `These are the names you and your ${partner} used before you ${
      isDivorce ? 'were married' : 'formed your civil partnership'
    }. They can sometimes be different from your current names. This could be because you or your ${partner} previously had a different surname (for example, a maiden name or a name changed by deed poll).`,
    warningText: `Copy the ${relationship} certificate exactly. For example, if it says ‘Sarah Brown (formerly known as Sarah Smith)’, then enter that.`,
    applicant1FullNameOnCertificate: `Copy your full name from the ${relationship} certificate`,
    applicant2FullNameOnCertificate: `Copy your ${partner}'s full name from the ${relationship} certificate`,
    hint: 'Include all the text related to the name',
    errors: {
      applicant1FullNameOnCertificate: {
        required: 'You have not entered anything. Enter your full name as it appears on your marriage certificate.',
        invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
      },
      applicant2FullNameOnCertificate: {
        required: 'You have not entered anything. Enter their full name as it appears on your marriage certificate.',
        invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
      },
    },
  };
};

const cy = ({ isDivorce, partner }: CommonContent, relationship: string) => {
  return {
    title: `Eich enw fel y maent yn ymddangos ar eich tystysgrif ${relationship}`,
    line1: `Dyma'r enwau yr oeddech chi a'ch ${partner} yn eu defnyddio cyn i chi ${
      isDivorce ? 'priodi' : 'ffurfio eich partneriaeth sifil'
    }. Weithiau gallant fod yn wahanol i'ch enwau cyfredol. Gallai hyn fod oherwydd eich bod chi neu eich ${partner} wedi cael cyfenw gwahanol yn y gorffennol (er enghraifft, enw cyn priodi neu wedi newid enw trwy weithred newid enw).`,
    warningText: `Copïwch union eriad y dystysgrif ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    }. Er enghraifft, os yw'n dweud ‘Sarah Brown (a elwid yn flaenorol yn Sarah Smith)’, yna rhowch hynny.`,
    applicant1FullNameOnCertificate: `Copïwch eich enw yn llawn fel y mae'n ymddangos ar y dystysgrif ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    }`,
    applicant2FullNameOnCertificate: `Copïwch enw llawn eich ${partner} fel y mae'n ymddangos ar y dystysgrif ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    }`,
    hint: 'Dylech gynnwys testun eich enw yn llawn',
    errors: {
      applicant1FullNameOnCertificate: {
        required: `Nid ydych wedi nodi unrhyw beth. Rhowch eich enw yn llawn fel y mae’n ymddangos ar eich tystysgrif ${relationship}.`,
        invalid:
          'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig. ',
      },
      applicant2FullNameOnCertificate: {
        required: `Nid ydych wedi nodi unrhyw beth. Rhowch eu henw yn llawn fel y mae’n ymddangos ar eich tystysgrif ${relationship}.`,
        invalid:
          'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig. ',
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1FullNameOnCertificate: {
      type: 'text',
      classes: 'govuk-input--width-20',
      autocomplete: 'full-name',
      label: l => l.applicant1FullNameOnCertificate,
      hint: l => l.hint,
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
  const relationship = content.isDivorce ? content.marriage : content.civilPartnership;
  const translations = languages[content.language](content, relationship);
  return {
    ...translations,
    form,
  };
};
