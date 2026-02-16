import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { oesOrNacOesRadioAnswers } from '../../common/input-labels.content';

const en = ({ isDivorce, marriage, civilPartnership, partner }, fullName) => {
  return {
    title: `Check the ${isDivorce ? marriage : civilPartnership} certificate for differences in your name`,
    line1: `We need to know if your name is written differently on the ${
      isDivorce ? marriage : civilPartnership
    } certificate.`,
    line2: 'This could be because:',
    point1: `You or your ${partner} changed your names after you ${
      isDivorce ? 'got married' : 'formed your civil partnership'
    }. For example, if you have taken your ${partner}'s last name or first name or you have a double-barrelled name (Sarah Smith-David).`,
    point2: `Part of your name was not included on the ${isDivorce ? marriage : civilPartnership} certificate.`,
    point3: `Your name is spelt differently on the ${isDivorce ? marriage : civilPartnership} certificate.`,
    point4: 'You are also known by a different name.',
    warning: `If the name on your ${
      isDivorce ? marriage : civilPartnership
    } certificate does not match the name you have provided, you will have to upload some evidence like a government issued ID, a passport, driving license, birth certificate, or deed poll.`,
    doesNameMatchTheCertificate: `Is any part of your full name (${fullName}) written differently on your ${
      isDivorce ? marriage : civilPartnership
    } certificate?`,
    errors: {
      applicant1NameDifferentToMarriageCertificate: {
        required: `You need to answer if any part of your full name is written differently on your ${
          isDivorce ? 'marriage' : 'civil partnership'
        } certificate.`,
      },
    },
  };
};

const cy: typeof en = ({ isDivorce, partner }, fullName) => {
  return {
    title: `Gwiriwch y dystysgrif ${isDivorce ? 'briodas' : 'bartneriaeth sifil'} am wahaniaethau yn eich enw`,
    line1: `Mae arnom angen gwybod os yw eich enw wedi'i ysgrifennu'n wahanol ar y dystysgrif ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    }.`,
    line2: 'Fe allai hyn fod oherwydd:',
    point1: `Bod chi neu eich ${partner} wedi newid eich enwau ar ôl i chi ${
      isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
    }. Er enghraifft, os ydych wedi cymryd cyfenw neu enw cyntaf eich ${partner} neu os oes gennych gyfenw dwbl (Sarah Smith-David).`,
    point2: `Ni gafodd rhan o'ch enw ei chynnwys ar y dystysgrif ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}.`,
    point3: `Mae eich enw wedi'i sillafu'n wahanol ar y dystysgrif ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}.`,
    point4: 'Rydych hefyd yn cael eich adnabod gan enw gwahanol.',
    warning: `Os nad yw'r enw ar y dystysgrif ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    } yn cyd-fynd â'r enw rydych wedi'i ddarparu, bydd rhaid i chi uwchlwytho tystiolaeth fel cerdyn adnabod a gyhoeddwyd gan y llywodraeth, pasbort, trwydded yrru, dystysgrif geni, neu gweithred newid enw.`,
    doesNameMatchTheCertificate: `A oes unrhyw rhan o’ch enw (${fullName}) sydd wedi’i ysgrifennu’n wahanol i’ch tystysgrif ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    }?`,
    errors: {
      applicant1NameDifferentToMarriageCertificate: {
        required: `Mae angen i chi ateb os yw unrhyw ran o’ch enw llawn wedi’i ysgrifennu’n wahanol ar eich tystysgrif ${
          isDivorce ? 'priodas' : 'partneriaeth sifil'
        }.`,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1NameDifferentToMarriageCertificate: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doesNameMatchTheCertificate,
      values: [
        { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
        { label: l => l[YesOrNo.NO], value: YesOrNo.NO },
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

export const radioButtonAnswers = oesOrNacOesRadioAnswers;

export const generateContent: TranslationFn = content => {
  const userCase = content.userCase;
  const fullName = content.isApplicant2
    ? `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`
    : `${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames}`;
  const translations = languages[content.language](content, fullName);
  const radioAnswers = radioButtonAnswers[content.language];
  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
