import config from 'config';

import { FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, required }: CommonContent) => ({
  title: 'Applying for a financial order',
  line1: 'You’ll need to apply for a financial order if you:',
  point1:
    'agree on dividing your money and property and want to make your agreement legally binding (this is known as a financial order by consent)',
  point2:
    'disagree on dividing your money and property and want the court to decide (this is known as a contested financial order)',
  point3: 'have nothing to split but want to make your financial separation final',
  line2: `Applying to the court for a ‘financial order by consent’ costs an additional ${getFee(
    config.get('fees.consentOrder')
  )}. Asking the court to decide for you and make a ‘contested financial order’ costs an additional ${getFee(
    config.get('fees.financialOrder')
  )}. The court needs to know now if you want to apply for either.`,
  selectYes: 'If you select yes:',
  yesPoint1: 'you do not have to proceed with the application for a financial order',
  yesPoint2: `you can proceed with the application for a financial order at any time, so long as your ${partner} is still alive`,
  selectNo: 'If you select no:',
  noPoint1:
    'you’ll only be able to apply until you remarry or form a new civil partnership (this does not apply to pension sharing or pension compensation orders, which can be applied at any time)',
  hint: ' If you want to apply for either a ‘financial order by consent’ or a ‘contested financial order’ then select yes',
  doYouWantToApplyForFinancialOrder: 'Do you want to apply for a financial order?',
  yes: 'Yes, I want to apply for a financial order',
  no: 'No, I do not want to apply for a financial order',
  subField: 'Who is the financial order for?',
  subFieldHint: 'Select all that apply',
  me: 'Myself',
  children: 'The children',
  errors: {
    applicant1ApplyForFinancialOrder: {
      required,
    },
    applicant1WhoIsFinancialOrderFor: {
      required,
    },
  },
});

const cy: typeof en = ({ partner, required }: CommonContent) => ({
  title: 'Gwneud cais am orchymyn ariannol',
  line1: 'Bydd angen i chi wneud cais am orchymyn ariannol:',
  point1:
    'os ydych yn cytuno ar rannu eich arian a’ch eiddo ac eisiau gwneud eich cytundeb yn rhwymol yn gyfreithiol (gelwir hyn yn orchymyn ariannol drwy gydsyniad)',
  point2:
    'os ydych yn anghytuno ar rannu eich arian a’ch eiddo ac eisiau i’r llys benderfynu (gelwir hyn yn orchymyn ariannol a wrthwynebir)',
  point3: 'os nad oes gennych ddim i’w rannu ond eich bod eisiau gwahanu’n ariannol yn derfynol',
  line2: `Mae gwneud cais i’r llys am ‘orchymyn ariannol drwy gydsyniad’ yn costio ${getFee(
    config.get('fees.consentOrder')
  )} yn ychwanegol. Mae gofyn i’r llys benderfynu ar eich rhan a gwneud ‘gorchymyn ariannol a wrthwynebir' yn costio ${getFee(
    config.get('fees.financialOrder')
  )} yn ychwanegol. Mae angen i'r llys wybod nawr os ydych am wneud cais am y naill neu'r llall.`,
  selectYes: "Os byddwch yn dewis ‘ydw':",
  yesPoint1: "nid oes rhaid i chi fwrw ymlaen â'r cais am orchymyn ariannol",
  yesPoint2: `gallwch fwrw ymlaen â’r cais am orchymyn ariannol ar unrhyw adeg, cyhyd â bod eich ${partner} yn dal yn fyw`,
  selectNo: 'Os byddwch yn dewis ‘nac ydw’:',
  noPoint1:
    'dim ond nes i chi ailbriodi neu ffurfio partneriaeth sifil newydd y byddwch yn gallu gwneud cais (nid yw hyn yn berthnasol i orchmynion rhannu pensiwn neu iawndal pensiwn, y gellir eu cymhwyso ar unrhyw adeg)',
  hint: 'Os ydych am wneud cais am naill ai ‘orchymyn ariannol drwy gydsyniad’ neu ‘orchymyn ariannol a wrthwynebir’ yna dewiswch ‘ydw’.',
  doYouWantToApplyForFinancialOrder: 'Ydych chi eisiau gwneud cais am orchymyn ariannol?',
  yes: 'Ydw, rwyf am wneud cais am orchymyn ariannol',
  no: 'Na, nid wyf am wneud cais am orchymyn ariannol',
  subField: 'Ar gyfer pwy mae’r gorchymyn ariannol?',
  subFieldHint: 'Dewiswch bob un sy’n berthnasol',
  me: 'Fi fy hun',
  children: 'Fy mhlant',
  errors: {
    applicant1ApplyForFinancialOrder: {
      required,
    },
    applicant1WhoIsFinancialOrderFor: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1ApplyForFinancialOrder: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouWantToApplyForFinancialOrder,
      hint: l => l.hint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant1WhoIsFinancialOrderFor: {
              type: 'checkboxes',
              label: l => l.subField,
              hint: l => l.subFieldHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'applicant1WhoIsFinancialOrderFor',
                  label: l => l.me,
                  value: FinancialOrderFor.APPLICANT,
                },
                {
                  name: 'applicant1WhoIsFinancialOrderFor',
                  label: l => l.children,
                  value: FinancialOrderFor.CHILDREN,
                },
              ],
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO },
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
