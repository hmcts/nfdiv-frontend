import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ userCase, isDivorce, marriage, civilPartnership, partner, required }) => {
  return {
    title: `Check the ${isDivorce ? marriage : civilPartnership} certificate for differences in your name`,
    line1: `We need to know if your name is written differently on the ${
      isDivorce ? marriage : civilPartnership
    } certificate.`,
    line2: 'This could be because:',
    point1: `You or your ${partner} changed your names after you ${
      isDivorce ? 'got married' : 'formed your civil partnership'
    }. For example, if you have taken your ${partner}'s last name or first name or you have a double-barrelled name (Sarah Smith-David)`,
    point2: `Part of your name was not included on the ${isDivorce ? marriage : civilPartnership} certificate.`,
    point3: `Your name is spelt differently on the ${isDivorce ? marriage : civilPartnership} certificate.`,
    point4: 'You are also known by a different name.',
    warning: `If the name on your ${
      isDivorce ? marriage : civilPartnership
    } certificate does not match the name you have provided, you will have to upload some evidence like a government issued ID, a passport, driving license, birth certificate, or deed poll.`,
    doesNameMatchTheCertificate: `Is ${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${
      userCase.applicant1LastNames
    } exactly how your name is written on your ${isDivorce ? marriage : civilPartnership} certificate?`,
    yes: 'Yes',
    no: 'No',
    errors: {
      applicant1ConfirmNameMatchesCertificate: {
        required,
      },
    },
  };
};

const cy: typeof en = ({ userCase, isDivorce, marriage, civilPartnership, partner, required }) => {
  return {
    title: `Gwiriwch y dystysgrif ${isDivorce ? marriage : civilPartnership} am wahaniaethau yn eich enw`,
    line1: `Mae arnom angen gwybod os yw eich enw yn wedi'i ysgrifennu'n wahanol ar y dystysgrif ${
      isDivorce ? 'briodas' : 'tystysgrif bartneriaeth sifil'
    }.`,
    line2: 'Fe allai hyn fod oherwydd:',
    point1: `Bod chi neu eich ${partner} wedi newid eich enwau ar ôl i ${
      isDivorce ? 'chi briodi' : 'ffurfio eich partneriaeth sifil'
    }. Er enghraifft, os ydych wedi cymryd cyfenw neu enw cyntaf eich ${partner} neu os oes gennych gyfenw dwbl (Sarah Smith-David)`,
    point2: `Ni gafodd rhan o'ch enw ei chynnwys ar y dystysgrif ${
      isDivorce ? 'briodas' : 'tystysgrif partneriaeth sifil'
    }.`,
    point3: `Mae arnom angen gwybod os yw eich enw wedi'i sillafu'n wahanol ar y dystysgrif ${
      isDivorce ? 'briodas' : 'tystysgrif partneriaeth sifil'
    }.`,
    point4: 'Rydych hefyd yn cael eich adnabod gan enw gwahanol.',
    warning: `Os nad yw'r enw ar y dystysgrif ${
      isDivorce ? 'briodas' : 'tystysgrif partneriaeth sifil'
    } yn cyd-fynd â'r enw rydych wedi'i ddarparu, bydd rhaid i chi uwchlwytho tystiolaeth fel cerdyn adnabod a gyhoeddwyd gan y llywodraeth, pasbort, trwydded yrru neu dystysgrif geni, gweithred newid enw.`,
    doesNameMatchTheCertificate: `A yw ${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${
      userCase.applicant1LastNames
    } yn union y ffordd mae eich enw wedi'i ysgrifennu ar eich tystysgrif ${
      isDivorce ? 'priodas' : 'tystysgrif partneriaeth sifil'
    }?`,
    yes: 'Ydy',
    no: 'Nac ydy',
    errors: {
      applicant1ConfirmNameMatchesCertificate: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1ConfirmNameMatchesCertificate: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doesNameMatchTheCertificate,
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
