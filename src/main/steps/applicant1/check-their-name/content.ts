import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ userCase, isDivorce, marriage, civilPartnership, partner }) => {
  return {
    title: `Check the ${isDivorce ? marriage : civilPartnership} certificate for differences in your ${partner}'s name`,
    line1: `We need to know if your ${partner}'s name is written differently on your ${
      isDivorce ? marriage : civilPartnership
    } certificate.`,
    line2: 'This could be because:',
    point1: `Your ${partner} changed their names after they ${
      isDivorce ? 'got married' : 'formed your civil partnership'
    }.`,
    point2: `Part of their name was not included on the ${isDivorce ? marriage : civilPartnership} certificate.`,
    point3: `Their name is spelt differently on the ${isDivorce ? marriage : civilPartnership} certificate.`,
    point4: 'They are also known by a different name.',
    warningPart1: `If your ${partner}'s name on your ${
      isDivorce ? marriage : civilPartnership
    } certificate does not match the name you have provided, you will have to upload some evidence like a government issued ID, a passport, driving license, birth certificate, or deed poll.`,
    warningPart2: `If you do not provide evidence to explain the difference in your ${partner}'s legal name and how it is written on the ${
      isDivorce ? 'marriage' : 'civil partnership'
    } certificate, your conditional order will be delayed until an explanation or evidence is provided.`,
    doesNameMatchTheCertificate: `Is any part of your ${partner}'s full name (${userCase.applicant2FirstNames} ${
      userCase.applicant2MiddleNames
    } ${userCase.applicant2LastNames}) written differently on your ${
      isDivorce ? marriage : civilPartnership
    } certificate?`,
    yes: 'Yes',
    no: 'No',
    errors: {
      applicant2NameDifferentToMarriageCertificate: {
        required: `You need to answer if any part of your ${partner}'s full name is written differently on your ${
          isDivorce ? 'marriage' : 'civil partnership'
        } certificate.`,
      },
    },
  };
};

const cy: typeof en = ({ userCase, isDivorce, partner }) => {
  return {
    title: `Gwiriwch y dystysgrif ${
      isDivorce ? 'briodas' : 'partneriaeth sifil'
    } am wahaniaethau yn enw eich ${partner}`,
    line1: `Mae arnom angen gwybod os yw enw eich ${partner} wedi'i ysgrifennu'n wahanol ar y dystysgrif ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    }.`,
    line2: 'Fe allai hyn fod oherwydd:',
    point1: `Newidiodd eich ${partner} eu henwau ar ôl iddynt briodi.`,
    point2: `Ni gafodd rhan o'u henw ei chynnwys ar y dystysgrif ${isDivorce ? 'briodas' : 'partneriaeth sifil'}.`,
    point3: `Mae eu henw wedi'i sillafu'n wahanol ar y dystysgrif ${isDivorce ? 'briodas' : 'partneriaeth sifil'}.`,
    point4: 'Maent hefyd yn cael eu hadnabod gan enw gwahanol.',
    warningPart1: `Os nad yw enw eich ${partner} ar y dystysgrif ${
      isDivorce ? 'briodas' : 'partneriaeth sifil'
    } yn cyd-fynd â'r enw rydych wedi'i ddarparu, bydd rhaid i chi uwchlwytho tystiolaeth fel cerdyn adnabod a gyhoeddwyd gan y llywodraeth, pasbort, trwydded yrru neu dystysgrif geni, gweithred newid enw.`,
    warningPart2: `Os na fyddwch yn darparu tystiolaeth i esbonio'r gwahaniaeth yn enw cyfreithiol eich ${partner} a sut mae wedi'i ysgrifennu ar y dystysgrif ${
      isDivorce ? 'briodas' : 'partneriaeth sifil'
    }, bydd eich gorchymyn amodol yn cael ei oedi hyd nes darperir esboniad neu dystiolaeth.`,
    doesNameMatchTheCertificate: `A oes unrhyw rhan o enw eich ${partner} (${userCase.applicant2FirstNames} ${
      userCase.applicant2MiddleNames
    } ${userCase.applicant2LastNames}) sydd wedi’i ysgrifennu’n wahanol i’ch tystysgrif ${
      isDivorce ? 'briodas' : 'partneriaeth sifil'
    }?`,
    yes: 'Oes',
    no: 'Nac oes',
    errors: {
      applicant2NameDifferentToMarriageCertificate: {
        required: `Mae angen i chi ateb os yw unrhyw ran o enw llawn eich ${partner} wedi’i ysgrifennu’n wahanol ar eich tystysgrif ${
          isDivorce ? 'priodas' : 'partneriaeth sifil'
        }.`,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant2NameDifferentToMarriageCertificate: {
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
