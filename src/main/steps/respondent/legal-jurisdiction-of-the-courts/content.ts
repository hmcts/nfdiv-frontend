import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { enConnectionBulletPointsSummarisedForAllUsers } from '../../../app/jurisdiction/bulletedPointsContent';
import {
  cyDomicile,
  cyHabitualResident,
  enDomicile,
  enHabitualResident,
} from '../../../app/jurisdiction/moreDetailsContent';
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
    whatThisMeans: 'What this means',
    heading1: 'Habitual residence',
    habitualResidenceText: enHabitualResident,
    heading2: 'Domicile',
    domicileText: enDomicile,
    heading3: 'Residual jurisdiction',
    residualJurisdictionLine1: `Usually, to be eligible for residual jurisdiction you or your ${partner} must be domiciled in England. Neither of you must be nationals of or habitually resident in, another country in the EU (except Denmark).`,
    residualJurisdictionLine2:
      'In addition, if you’re married to a member of the same sex, you may be eligible for residual jurisdiction if: (all the following apply):',
    residualJurisdictionListItem1: 'you married each other in the UK',
    residualJurisdictionListItem2:
      'neither of you are nationals of, or habitually resident in, another country in the EU (except Denmark)',
    residualJurisdictionListItem3: `it would be in the interests of natural justice for the court to consider this application (this may apply if, for example, your home country does not allow ${
      isDivorce ? 'divorce' : 'ending a civil partnership'
    } between same-sex couples`,
    residualJurisdictionLine3:
      'However, residual jurisdiction can be complex. If you’re not sure whether this applies to you then you should get legal advice',
    errors: {
      jurisdictionAgree: {
        required,
      },
      reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: {
        required:
          'You need to explain why you think the courts of England and Wales do not have the legal power (jurisdiction)',
      },
      inWhichCountryIsYourLifeMainlyBased: {
        required: 'You need to enter which country your life is mainly based.',
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
        ? enConnectionBulletPointsSummarisedForAllUsers(userCase.connections, isDivorce, isJointApplication)
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
    whatThisMeans: 'Beth mae hyn yn ei olygu',
    heading1: 'Preswylfa arferol',
    habitualResidenceText: cyHabitualResident,
    heading2: 'Domisil',
    domicileText: cyDomicile,
    heading3: 'Awdurdodaeth weddillol',
    residualJurisdictionLine1: `Fel arfer, i fod yn gymwys ar gyfer awdurdodaeth weddillol, mae’n rhaid i’ch domisil chi neu ddomisil eich ${partner} fod yng Nghymru neu Loegr. Ni all y naill na’r llall ohonoch fod yn ddinesydd gwlad arall yn yr UE (ac eithrio Denmarc) na phreswylio’n arferol mewn gwlad arall yn yr UE (ac eithrio Denmarc).`,
    residualJurisdictionLine2:
      'Hefyd, os ydych yn briod â rhywun o’r un rhyw, efallai eich bod yn gymwys ar gyfer awdurdodaeth weddillol os yw: (pob un o’r canlynol yn berthnasol):',
    residualJurisdictionListItem1: 'mi wnaethoch briodi eich gilydd yn y DU',
    residualJurisdictionListItem2:
      'nid yw’r naill na’r llall ohonoch yn ddinesydd gwlad arall yn yr UE (ac eithrio Denmarc) na’n preswylio’n arferol mewn gwlad arall yn yr UE (ac eithrio Denmarc)',
    residualJurisdictionListItem3: `byddai er lles cyfiawnder i’r llys ystyried y cais (gallai hyn fod yn berthnasol, er enghraifft, os nad yw’r wlad lle mae eich cartref yn caniatáu i gyplau o’r un rhyw ${
      isDivorce ? 'gael ysgariad' : 'ddod â phartneriaeth sifil i ben'
    }`,
    residualJurisdictionLine3:
      'Fodd bynnag, gall awdurdodaeth weddillol fod yn gymhleth. Os nad ydych chi’n siŵr a yw hyn yn berthnasol i chi, dylech gael cyngor cyfreithiol',
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
  const whatThisMeansJurisdiction = accessibleDetailsSpan(translations['whatThisMeans'], translations['heading6']);
  return {
    ...translations,
    whatThisMeansJurisdiction,
    form,
  };
};
