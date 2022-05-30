import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { enConnectionBulletPointsSummarisedForAllUsers } from '../../../app/jurisdiction/bulletedPointsContent';
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
    jurisdictionsMoreDetails: jurisdictionMoreDetailsContent(userCase?.connections, isDivorce, true).text,
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
    moredetailsJurisdiction: {
      heading1: 'Habitual residence',
      line1:
        'If your lives are mainly based in England or Wales then you’re what is legally known as ‘habitually ' +
        'resident’.',
      line2:
        'This may include working, owning property, having children in school, and your main family life taking ' +
        'place in England or Wales.',
      line3:
        'The examples above are not a complete list of what makes up habitual residence. Just because some of them' +
        ' apply to you, that does not mean you’re habitually resident. If you’re not sure, you should get legal advice.',
      heading2: 'Domicile',
      line4:
        'Your domicile is usually the place in which you were born, regard as your permanent home and to which ' +
        'you have the closest ties.',
      line5:
        'However, domicile can be more complex. For example, if you or your parents have moved countries in the past.',
      line6: 'When you’re born, you acquire the ‘domicile of origin’. This is usually:',
      bulletPoint1: 'the country your father was domiciled in if your parents were married',
      bulletPoint2:
        'the country your mother was domiciled in if your parents were unmarried, ' +
        'or your father had died before you were born',
      line7:
        'If you leave your domicile of origin and settle in another country as an adult, the new country may ' +
        'become your ‘domicile of choice’.',
      line8: 'If you’re not sure about your domicile, you should get legal advice.',
      heading3: 'Residual jurisdiction',
      line9: `Usually, to be eligible for residual jurisdiction you or your ${partner} must be domiciled in England.
      Neither of you must be nationals of or habitually resident in, another country in the EU (except Denmark).`,
      line10:
        'In addition, if you’re married to a member of the same sex, you may be eligable for residul ' +
        'jurisdiction if: (all the following apply):',
      bulletPoint3: 'you married each other in the UK',
      bulletPoint4:
        'neither of you are nationals of, or habitually resident in, another country in the EU (except Denmark)',
      bulletPoint5: `it would be in the interests of natural justice for the court to consider this application
        (this may apply if, for example, your home country does not allow ${
          isDivorce ? 'divorce' : 'ending of a civil partnership'
        }  between same-sex couples)`,
      line11:
        'However, residual jurisdiction can be complex. If you’re not sure whether this applies to you then you should get legal advice',
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
    readMore: 'Beth mae hyn yn ei olygu',
    jurisdictionsMoreDetails: jurisdictionMoreDetailsContent(userCase?.connections, isDivorce, true).text,
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
    moredetailsJurisdiction: {
      heading1: 'Preswylfa arferol',
      line1:
        'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru neu Loegr, rydych yn ‘preswylio’n arferol’ yno yn ôl y gyfraith',
      line2:
        'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr. ',
      line3:
        'Nid yw’r enghreifftiau uchod yn rhestr gyflawn o’r amgylchiadau sy’n diffinio preswylfa arferol. Nid yw’r ffaith bod rhai ohonynt yn berthnasol i chi o reidrwydd yn golygu eich bod yn preswylio’n arferol yn rhywle. Os nad ydych yn siŵr, dylech gael cyngor cyfreithiol.',
      heading2: 'Domisil',
      line4:
        'Fel rheol, eich domisil yw’r lle y cawsoch eich geni, lle’r ydych yn meddwl amdano fel eich cartref parhaol a’r lle mae eich teulu a’ch ffrindiau agosaf yn byw.',
      line5:
        'Fodd bynnag, gall domisil fod yn fwy cymhleth. Er enghraifft, os ydych chi neu eich rhieni wedi symud o un wlad i’r llall yn y gorffennol.',
      line6: 'Pan gewch eich geni, rydych yn cael ‘mamwlad’. Fel arfer, hon yw:',
      bulletPoint1: 'mamwlad eich tad os oedd eich rhieni wedi priodi',
      bulletPoint2:
        'mamwlad eich mam os nad oedd eich rhieni wedi priodi, neu os oedd eich tad wedi marw cyn i chi gael eich geni',
      line7:
        'Os ydych yn gadael eich mamwlad ac yn setlo mewn gwlad arall fel oedolyn, yna efallai bydd y wlad newydd yn dod yn ‘ddomisil o’ch dewis chi’.',
      line8: 'Os nad ydych chi’n siŵr am eich domisil, dylech gael cyngor cyfreithiol.',
      heading3: 'Awdurdodaeth weddillol',
      line9: `Fel arfer, i fod yn gymwys ar gyfer awdurdodaeth weddillol, mae’n rhaid i’ch domisil chi neu ddomisil eich ${partner}
      fod yng Nghymru neu Loegr. Ni all y naill na’r llall ohonoch fod yn ddinesydd gwlad arall yn yr UE (ac eithrio Denmarc) na phreswylio’n arferol mewn gwlad arall yn yr UE (ac eithrio Denmarc). `,
      line10:
        'Hefyd, os ydych yn briod â rhywun o’r un rhyw, efallai eich bod yn gymwys ar gyfer awdurdodaeth weddillol os yw: (pob un o’r canlynol yn berthnasol):',
      bulletPoint3: 'mi wnaethoch briodi eich gilydd yn y DU',
      bulletPoint4:
        'nid yw’r naill na’r llall ohonoch yn ddinesydd gwlad arall yn yr UE (ac eithrio Denmarc) na’n preswylio’n arferol mewn gwlad arall yn yr UE (ac eithrio Denmarc) ',
      bulletPoint5: `byddai er lles cyfiawnder i’r llys ystyried y cais (gallai hyn fod yn berthnasol, er enghraifft, os nad yw’r wlad lle mae eich cartref yn caniatáu i gyplau o’r un rhyw ${
        isDivorce ? 'gael ysgariad' : 'ddod â phartneriaeth sifil i ben'
      })`,
      line11:
        'Fodd bynnag, gall awdurdodaeth weddillol fod yn gymhleth. Os nad ydych chi’n siŵr a yw hyn yn berthnasol i chi, dylech gael cyngor cyfreithiol',
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
