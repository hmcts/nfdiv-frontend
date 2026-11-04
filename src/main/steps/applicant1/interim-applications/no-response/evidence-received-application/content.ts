import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Has your ${partner} received the ${isDivorce ? 'divorce papers' : 'papers to end your civil partnership'}?`,
  headingSection1: 'Evidence for deemed service',
  line1: `If you have evidence that your ${partner} received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } but has not responded to the court, you may be able to apply for 'deemed service'. If the court grants you deemed service, your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } can move forward without your ${partner} responding.`,
  headingSection2: 'What evidence the court needs',
  line2: `Your evidence must show your ${partner} received the ${isDivorce ? 'divorce papers' : 'papers to end your civil partnership'} in a legally approved way. This usually means proof they received the papers in the post from the court, or from you if you were officially serving the papers.`,
  line3:
    "The court is unlikely to accept evidence which shows you 'served' the papers by text, WhatsApp or social media without having a court order allowing it.",
  line4: `Evidence must be from after the ${isDivorce ? 'divorce papers' : 'papers to end your civil partnership'} were served.`,
  headingSection3: 'Your evidence may include:',
  suitableEvidence: {
    photo: `a photo or screenshot of a message from your ${partner} stating or showing they got the papers officially`,
    statement: `a detailed statement from you or a third party explaining how you know your ${partner} has the papers`,
    message: `a message from us saying your ${partner} has responded`,
  },
  line5: 'Evidence such as screenshots must include dates and where relevant, phone numbers or usernames.',
  line6: `If you are submitting a statement, make sure you have proof the papers have been received. You must explain clearly, using dates and other facts, how you know your ${partner} received the papers, and when and how you became aware they received them.`,
  headingSection4: 'Statements from third parties must be:',
  statementFromThirdParty: {
    line1: 'written by someone over 18',
    line2: 'uploaded',
    line3: 'signed and include a statement of truth',
  },
  canYouProveHeader: `Do you have evidence that your ${partner} has received the papers?`,
  proveYes: `Yes, I have evidence that my ${partner} has received the papers.`,
  proveNo: 'No, I do not have any suitable evidence.',
  errors: {
    applicant1NoResponsePartnerHasReceivedPapers: {
      required: `Select 'Yes' if you have evidence of your ${partner} receiving the papers.`,
    },
  },
});

const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: `A yw eich ${partner} wedi cael papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  }?`,
  headingSection1: 'Tystiolaeth ar gyfer cyflwyno tybiedig',
  line1: `Os oes gennych dystiolaeth bod eich ${partner} wedi cael papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } ond nad ydynt wedi ymateb i'r llys, efallai y byddwch yn gallu gwneud cais am 'gyflwyno tybiedig'. Os yw'r llys yn caniatáu cyflwyno tybiedig i chi, gall eich ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } symud ymlaen heb i'ch ${partner} ymateb.`,
  headingSection2: 'Pa dystiolaeth sydd ei hangen ar y llys',
  line2: `Rhaid i'ch tystiolaeth ddangos bod eich ${partner} wedi cael papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } mewn ffordd a gymeradwywyd yn gyfreithiol. Fel arfer mae hyn yn golygu profi eu bod wedi cael y papurau drwy'r post gan y llys, neu gennych chi os oeddech chi'n cyflwyno'r papurau'n swyddogol.`,
  line3:
    "Mae'n annhebygol y bydd y llys yn derbyn tystiolaeth sy'n dangos eich bod wedi 'cyflwyno'r' papurau drwy neges destun, WhatsApp neu gyfryngau cymdeithasol heb orchymyn llys yn caniatáu hynny.",
  line4: `Rhaid i'r dystiolaeth fod o'r cyfnod ar ôl i papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } gael eu cyflwyno.`,
  headingSection3: 'Gall eich tystiolaeth gynnwys:',
  suitableEvidence: {
    photo: `llun neu sgrinlun o neges gan eich ${partner} yn nodi neu'n dangos eu bod wedi cael y papurau'n swyddogol`,
    statement: `datganiad manwl gennych chi neu drydydd parti yn egluro sut rydych chi'n gwybod bod gan eich ${partner} y papurau`,
    message: `neges gennym ni yn dweud bod eich ${partner} wedi ymateb`,
  },
  line5:
    "Rhaid i dystiolaeth fel sgrinluniau gynnwys dyddiadau a, lle bo'n berthnasol, rhifau ffôn neu enwau defnyddwyr.",
  line6: `Os ydych chi'n cyflwyno datganiad, gwnewch yn siŵr bod gennych chi brawf bod y papurau wedi dod i law. Rhaid i chi esbonio'n glir, gan ddefnyddio dyddiadau a ffeithiau eraill, sut rydych chi'n gwybod bod eich ${partner} wedi cael y papurau, a phryd a sut y daethoch chi'n ymwybodol eu bod nhw wedi dod i law.`,
  headingSection4: 'Rhaid i ddatganiadau gan drydydd partïon fod:',
  statementFromThirdParty: {
    line1: 'wedi’u hysgrifennu gan rywun dros 18 oed',
    line2: 'wedi’u uwchlwytho',
    line3: 'wedi’u llofnodi ac yn cynnwys datganiad gwirionedd',
  },
  canYouProveHeader: `A oes gennych dystiolaeth bod eich ${partner} wedi cael y papurau?`,
  proveYes: 'Oes, mae gennyf dystiolaeth bod fy mhartner wedi cael y papurau.',
  proveNo: 'Na allaf, nid oes gennyf unrhyw dystiolaeth addas.',
  errors: {
    applicant1NoResponsePartnerHasReceivedPapers: {
      required: `Dewiswch “Oes” os oes gennych dystiolaeth o’ch ${partner} yn derbyn y papurau.`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponsePartnerHasReceivedPapers: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.canYouProveHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.proveYes,
          id: 'proveYes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.proveNo,
          id: 'proveNo',
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
