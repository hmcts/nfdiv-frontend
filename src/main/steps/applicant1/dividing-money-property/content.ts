import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Dividing your money and property',
  line1: `It’s important that you sort out how to divide your money and property before the end of the ${
    isDivorce ? 'divorce process' : 'process to end your civil partnership'
  }. Otherwise, you or your ${partner} may be able to make financial claims against each other, after the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } is ended. Even if you have kept your finances separate during the ${isDivorce ? 'marriage' : 'civil partnership'}.`,
  line2: `The court can make what’s known as a 'financial order'. A financial order is a legal document that describes how you are going to split your money, property, pensions and other assets. You need a financial order whether
  you can reach agreement with your ${partner} or whether you want the court to decide for you.`,
  ifYouAgreeHeading: 'If you agree',
  line3: `If you and your ${partner} agree on how you will divide your financial assets, you can make this agreement legally binding by asking the court to make a ‘financial order by consent’. This is also known as a ‘consent order’. It is usually more straightforward and less expensive if you can reach an agreement on how to divide your money and property.`,
  ifYouNeedHelpAgreeingHeading: 'If you need help agreeing',
  line4:
    'There are ways to help you agree on how you will divide your financial assets outside of court. These are sometimes known as ‘non-court dispute resolution’ (NCDR). <a target="_blank" href="https://www.advicenow.org.uk/get-help/family-and-children/divorce-and-separation/what-do-applying-financial-order-when-you-get">Further information about the types of NCDR options available to you can be obtained from Advicenow (opens in a new tab).</a>',
  line5: `If you and your ${partner} disagree, you can also ask the court to decide for you. This is known as making a financial remedies application. The court will expect that you have tried to agree your finances between yourselves before coming to court. You will need to have attended an initial meeting called a Mediation Information and Assessment Meeting, or MIAM, to consider ways to reach agreement without coming to court, unless you had good reason not to.`,
  line6:
    'The court needs confirmation now whether you want to apply for a financial order. Even if you want to apply for a consent order.',
  line7: `You will receive an email with more information after you have submitted this application ${isDivorce ? 'for divorce' : 'to end your civil partnership'}. Your ${partner} will also be sent an email notifying them that you want to apply for a financial order.`,
  noSelectedWarning: `It's important to have a financial order in place by the time your ${
    isDivorce ? 'divorce is finalised' : 'civil partnership is legally ended'
  }.
  Otherwise you or your ${partner} could make claims on each other's finances, after the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } has ended.
  Even if you have kept your finances separate during the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }. If you select yes, then you do not have to go ahead with the application or pay any additional fees. It just gives you the option to apply later in the process, should you want&nbsp;to.`,
  doYouWantToApplyForFinancialOrder: 'Do you want to apply for a financial order?',
  yes: 'Yes. I want to apply for a financial order.',
  no: 'No. I do not want to apply for a financial order.',
  errors: {
    applicant1ApplyForFinancialOrder: {
      required: 'You need to answer whether you want to apply for a financial order.',
    },
  },
});

const cy: typeof en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Rhannu eich arian a’ch eiddo',
  line1: `Mae’n bwysig eich bod yn trefnu sut i rannu eich arian a’ch eiddo cyn diwedd y ${
    isDivorce ? 'broses ysgaru' : 'broses i ddod â’ch partneriaeth sifil i ben'
  }. Fel arall, efallai y byddwch chi neu eich ${partner} yn gallu gwneud hawliadau ariannol yn erbyn y naill a’r llall ar ôl i’r ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  } ddod i ben. Hyd yn oed os ydych wedi cadw eich cyllid ar wahân yn ystod y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}.
  Gall y llys wneud yr hyn a elwir yn ‘orchymyn ariannol’.`,
  line2: `Mae gorchymyn ariannol yn ddogfen gyfreithiol sy’n disgrifio sut rydych yn mynd i rannu eich arian, eiddo, pensiynau ac asedau eraill.  Rydych angen gorchymyn ariannol pa un a ydych yn dod i gytundeb gyda’ch ${partner} neu a ydych eisiau i’r llys benderfynu ar eich rhan.`,
  ifYouAgreeHeading: 'Os ydych yn cytuno',
  line3: `Os byddwch chi a’ch ${partner} yn cytuno ar sut y byddwch yn rhannu eich asedau ariannol, gallwch wneud y cytundeb hwn yn gyfreithiol rwymol drwy ofyn i’r llys wneud ‘gorchymyn ariannol trwy gydsyniad’. Gelwir hyn hefyd yn ‘orchymyn cydsynio’. Fel arfer, mae’n symlach ac yn costio llai os ydych yn gallu cytuno ar sut i rannu eich arian a’ch eiddo.`,
  ifYouNeedHelpAgreeingHeading: 'Os oes angen help arnoch i ddod i gytundeb',
  line4:
    'Mae yna ffyrdd i’ch helpu i gytuno ar sut y byddwch yn rhannu eich asedau ariannol y tu allan i’r llys.  Gelwir hyn weithiau yn ‘datrys anghydfod y tu allan i’r llys’ (NCDR). <a target="_blank" href="https://www.advicenow.org.uk/get-help/family-and-children/divorce-and-separation/what-do-applying-financial-order-when-you-get">Gellir cael gwybodaeth bellach am y mathau o ddewisiadau NCDR sydd ar gael i chi gan Advicenow (yn agor mewn tab newydd).</a>',
  line5: `Os ydych chi a’ch ${partner} yn anghytuno, gallwch hefyd ofyn i’r llys benderfynu ichi. Mae hyn yn cael ei alw yn gwneud cais am rwymedi ariannol. Bydd y llys yn disgwyl i chi fod wedi ceisio cytuno ar eich cyllid rhwng eich gilydd cyn dod i’r llys.   Byddwch angen bod wedi mynychu cyfarfod cychwynnol a elwir yn Gyfarfod Asesu a Gwybodaeth am Gyfryngu neu MIAM, i ystyried ffyrdd i ddod i gytundeb heb ddod i’r llys, oni bai bod gennych reswm da dros beidio gwneud hynny.`,
  line6:
    'Mae angen i’r llys wybod nawr a ydych am wneud cais am orchymyn ariannol. Hyd yn oed  os ydych eisiau gwneud cais am orchymyn cydsynio.',
  line7: `Byddwch yn derbyn e-bost gyda mwy o wybodaeth ar ôl ichi gyflwyno’r cais hwn ${isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'}. Bydd eich ${partner} hefyd yn derbyn e-bost yn eu hysbysu eich bod eisiau gwneud cais am orchymyn ariannol.`,
  noSelectedWarning: `Mae’n bwysig cael gorchymyn ariannol mewn lle erbyn i’ch ${
    isDivorce ? 'ysgariad gael ei gwblhau' : 'partneriaeth sifil ddod i ben yn gyfreithiol'
  }.
  Fel arall, gallwch chi neu eich ${partner} wneud hawliadau ariannol yn erbyn y naill a’r llall ar ôl i’r ${
    isDivorce ? 'briodas' : 'partneriaeth sifil'
  } ddod i ben.
  Hyd yn oed os ydych wedi cadw eich cyllid ar wahân yn ystod y ${
    isDivorce ? 'briodas' : 'partneriaeth sifil'
  }. Os byddwch yn dewis ‘oes’, yna nid ydych angen mynd ymlaen gyda’r cais na thalu unrhyw ffioedd ychwanegol. Mae’n rhoi’r dewis i chi wneud cais yn ddiweddarach yn y broses, os dymunwch.`,
  doYouWantToApplyForFinancialOrder: 'Ydych chi eisiau gwneud cais am orchymyn ariannol?',
  yes: 'Oes. Rwyf eisiau gwneud cais am orchymyn ariannol.',
  no: 'Nac oes. Nid wyf eisiau gwneud cais am orchymyn ariannol.',
  errors: {
    applicant1ApplyForFinancialOrder: {
      required: 'Rydych angen ateb pa un a ydych yn dymuno gwneud cais am orchymyn ariannol.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1ApplyForFinancialOrder: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouWantToApplyForFinancialOrder,
      labelHidden: true,
      hint: l => l.hint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          conditionalText: l => `<p class="govuk-label">${l.noSelectedWarning}</p>`,
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
  return {
    ...translations,
    form,
  };
};
