import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import {
  cyConnectionBulletPointsSummarisedForAllUsers,
  enConnectionBulletPointsSummarisedForAllUsers,
} from '../../../app/jurisdiction/bulletedPointsContent';
import { jurisdictionMoreDetailsContent } from '../../../app/jurisdiction/moreDetailsContent';
import type { CommonContent } from '../../common/common.content';
import { accessibleDetailsSpan } from '../../common/content.utils';

const en = ({ isDivorce, partner, required, userCase, isJointApplication }: CommonContent) => {
  return {
    title: 'The legal power (jurisdiction) of the courts',
    line1: `Your ${partner} was asked some questions to find out whether the courts of England and Wales have the legal power (jurisdiction) to ${
      isDivorce ? 'grant your divorce' : 'end your civil partnership'
    }.`,
    line2: 'Their answers indicated that the reason the courts have jurisdiction is because:',
    connectionBulletPoints:
      userCase && userCase.connections
        ? enConnectionBulletPointsSummarisedForAllUsers(userCase.connections, isDivorce, isJointApplication)
        : [],
    jurisdictionAgree: `Do you agree the courts of England and Wales have legal power (jurisdiction) to ${
      isDivorce ? 'grant your divorce' : 'end your civil partnership'
    }?`,
    reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: `Explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to ${
      isDivorce ? 'grant your divorce' : 'end your civil partnership'
    }.`,
    inWhichCountryIsYourLifeMainlyBased: 'Which country is your life mainly based?',
    yes: 'Yes, I agree the courts have jurisdiction',
    no: 'No, I do not agree the courts have jurisdiction',
    readMore: 'What this means',
    jurisdictionsMoreDetails: jurisdictionMoreDetailsContent(userCase?.connections, true, isDivorce, partner, true)
      .text,
    errors: {
      jurisdictionAgree: {
        required,
      },
      reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: {
        required: `You need to explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to ${
          isDivorce ? 'grant your divorce' : 'end your civil partnership'
        }`,
      },
      inWhichCountryIsYourLifeMainlyBased: {
        required: 'You need to tell us which country your life is mainly based',
      },
    },
  };
};

const cy: typeof en = ({ isDivorce, partner, required, userCase, isJointApplication }: CommonContent) => {
  return {
    title: 'Pŵer cyfreithiol (awdurdodaeth) y llysoedd',
    line1: `Gofynnwyd cwestiynau i’ch ${partner} i ganfod p’un a oes gan y llysoedd yng Nghymru a Lloegr bŵer cyfreithiol (awdurdodaeth) i ${
      isDivorce ? 'ganiatáu i chi gael ysgariad' : 'ddod â’ch partneriaeth sifil i ben'
    }.`,
    line2: 'Dengys eu hatebion mai’r rheswm pam bod gan y llysoedd awdurdodaeth yw oherwydd:',
    connectionBulletPoints:
      userCase && userCase.connections
        ? cyConnectionBulletPointsSummarisedForAllUsers(userCase.connections, isDivorce, isJointApplication)
        : [],
    jurisdictionAgree: `Ydych chi’n cytuno bod gan lysoedd Cymru a Lloegr y pŵer cyfreithiol (awdurdodaeth) i ${
      isDivorce ? 'ganiatáu i chi gael ysgariad' : 'ddod â’ch partneriaeth sifil i ben'
    }?`,
    reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: `Eglurwch pam ydych chi’n credu nad oes gan lysoedd Cymru a Lloegr y pŵer cyfreithiol (awdurdodaeth) i ${
      isDivorce ? 'ganiatáu i chi gael ysgariad' : 'ddod â’ch priodas sifil i ben'
    }.`,
    inWhichCountryIsYourLifeMainlyBased: 'Ym mha wlad ydych chi’n byw yn bennaf?',
    yes: 'Ydw, rwy’n cytuno bod gan y llysoedd awdurdodaeth',
    no: 'Nac ydw, nid wyf yn cytuno bod gan y llysoedd awdurdodaeth',
    readMore: 'Beth mae hyn yn ei olygu',
    jurisdictionsMoreDetails: jurisdictionMoreDetailsContent(userCase?.connections, false, isDivorce, partner, true)
      .text,
    errors: {
      jurisdictionAgree: {
        required,
      },
      reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: {
        required:
          'Mae arnoch angen esbonio pam eich bod yn meddwl nad oes gan llysoedd Cymru a Lloegr bŵer cyfreithiol (awdurdodaeth)',
      },
      inWhichCountryIsYourLifeMainlyBased: {
        required: 'Mae arnoch angen nodi ym mha wlad rydych yn treulio’r rhan fwyaf o’ch hamser.',
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    jurisdictionAgree: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.jurisdictionAgree,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: {
              type: 'textarea',
              label: l => l.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction,
              labelSize: 's',
              validator: value => isFieldFilledIn(value),
            },
            inWhichCountryIsYourLifeMainlyBased: {
              type: 'textarea',
              label: l => l.inWhichCountryIsYourLifeMainlyBased,
              labelSize: 's',
              validator: value => isFieldFilledIn(value),
            },
          },
        },
      ],
      validator: isFieldFilledIn,
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
  const readMoreJurisdiction = accessibleDetailsSpan(translations['readMore'], translations['title']);
  return {
    ...translations,
    readMoreJurisdiction,
    form,
  };
};
