import config from 'config';
import dayjs from 'dayjs';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SupportedLanguages } from '../../../modules/i18n';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, required, userCase }: CommonContent) => ({
  title: `Disputing the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `If you want to dispute the ${
    isDivorce ? 'application for divorce' : 'application to end your civil partnership'
  }
  then you’ll have to submit another form (known as ‘the answer’) with your reason for disputing.
  This will cost you ${getFee(config.get('fees.d8bFormSubmission'))}, unless you are eligible for Help With Fees.`,
  readMore: 'Find out more about Help With Fees',
  helpText: 'You may be able to get help paying the fee if you (one or more of the following):',
  helpPayingWhen: ['are on certain benefits', 'have a little or no savings', 'have low income'],
  line2: `You have until ${getFormattedDate(
    dayjs(userCase.issueDate).add(config.get('dates.disputeDueDateOffsetDays'), 'day')
  )} to submit the form. If you do not submit the form by the deadline,
   then your ${partner} will usually be able to continue with the ${
     isDivorce ? 'divorce' : 'application to end your civil partnership'
   }.`,
  line3: `The only valid reasons for disputing the ${
    isDivorce ? 'divorce' : 'ending of your civil partnership'
  } are because (one or more of the following):`,
  point1: `you do not believe the courts of England and Wales have the legal power (jurisdiction) to grant the
  ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  point2: `you do not believe your ${isDivorce ? 'marriage' : 'civil partnership'} is legally valid. For example,
  if one of you was already married or in a civil partnership when you ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  }`,
  point3: `this ${isDivorce ? 'marriage' : 'civil partnership'} has already been legally ended`,
  line4: 'Are you sure you want to dispute the application?',
  disputedSelected: `<strong>You are about to confirm that you want to dispute the ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  }.</strong>`,
  yes: `I confirm I want to dispute the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`,
  no: `I do not want to dispute the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`,
  errors: {
    confirmDisputeApplication: {
      required,
    },
  },
});

const cy: typeof en = ({ isDivorce, partner, userCase }: CommonContent) => ({
  title: `Herio’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'}`,
  line1: `Os ydych eisiau herio’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'}
  yna bydd yn rhaid i chi gyflwyno ffurflen arall (a elwir yn ‘yr ateb’) gyda’ch rheswm dros herio.
  Bydd hyn yn costio ${getFee(
    config.get('fees.d8bFormSubmission')
  )}, oni bai eich bod yn gymwys i gael Help i dalu Ffioedd.`,
  readMore: 'Darganfyddwch fwy am Help i dalu Ffioedd.',
  helpText: 'Efallai y gallwch gael help i dalu ffioedd os ydych chi (os yw un neu fwy o’r canlynol yn berthnasol):',
  helpPayingWhen: ['yn cael rhai budd-daliadau', 'gydag ychydig o gynilion neu ddim cynilion o gwbl', 'ar incwm isel'],
  line2: `Mae gennych tan ${getFormattedDate(
    dayjs(userCase.issueDate).add(config.get('dates.disputeDueDateOffsetDays'), 'day'),
    SupportedLanguages.Cy
  )} i gyflwyno’r ffurflen. Os na fyddwch yn cyflwyno’r ffurflen erbyn y dyddiad hwn,
    yna bydd eich ${partner} fel arfer yn gallu parhau â’r cais ${
      isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
    }.`,
  line3: `Yr unig resymau dilys dros herio’r ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil'
  } yw oherwydd (os yw un neu fwy o’r canlynol yn berthnasol):`,
  point1: `nid ydych yn credu bod gan lysoedd Cymru a Lloegr y pŵer cyfreithiol (awdurdodaeth) i ganiatáu’r cais
  ${isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'}`,
  point2: `nid ydych yn credu bod eich ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  } yn ddilys yn gyfreithiol. Er enghraifft,
  os oedd un ohonoch eisoes yn briod neu mewn partneriaeth sifil pan wnaethoch chi ${
    isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
  }`,
  point3: `mae’r ${isDivorce ? 'briodas' : 'partneriaeth sifil'} hon eisoes wedi dod i ben yn gyfreithiol`,
  line4: 'Ydych chi’n siŵr eich bod eisiau herio’r cais?',
  disputedSelected: `<strong>Rydych ar fin cadarnhau eich bod eisiau herio’r ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  }.</strong>`,
  yes: `Rwy’n cadarnhau fy mod eisiau herio’r ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’m partneriaeth sifil i ben'
  }`,
  no: `Nid wyf eisiau herio’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’m partneriaeth sifil i ben'}`,
  errors: {
    confirmDisputeApplication: {
      required: 'Mae angen ichi ymateb cyn y gallwch barhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    confirmDisputeApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          conditionalText: l => `<p class="govuk-label">${l.disputedSelected}</p>`,
        },
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
