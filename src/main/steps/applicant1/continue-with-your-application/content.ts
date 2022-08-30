import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, isJointApplication, required }: CommonContent) => ({
  title: `Do you want to continue with your${isJointApplication ? ' joint' : ''} ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  }?`,
  line1: `The next step in the${
    isDivorce ? ' divorce' : ''
  } process is to apply for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot ${
    isDivorce ? 'get a divorce' : 'end your civil partnership'
  }.`,
  jointLine1: `This is a joint application so your ${partner} will also have to apply. They have been sent an email to tell them.`,
  jointLine2: `Your ${partner} has already confirmed this joint application.`,
  readMore: 'Read more about the next steps',
  line2: 'You have to complete 2 more steps before you are legally divorced:',
  conditionalOrder: 'Apply for a conditional order',
  conditionalOrderInfo: `This shows that the court agrees that you’re entitled to ${
    isDivorce ? 'get a divorce' : 'end your civil partnership'
  }.`,
  finalOrder: 'Apply for a final order',
  finalOrderInfo: `This legally ends the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }. You cannot apply for a final order until 6 weeks after the conditional order.`,
  yes: `I want to continue with my ${isDivorce ? 'divorce application' : 'application to end my civil partnership'}`,
  no: `I do not want to continue with my ${
    isDivorce ? 'divorce application' : 'application to end my civil partnership'
  }`,
  errors: {
    applicant1ApplyForConditionalOrder: { required },
  },
});

const cy: typeof en = ({ isDivorce, partner, isJointApplication, required }: CommonContent) => ({
  title: `Ydych chi eisiau bwrw ymlaen â’ch ${isDivorce ? 'ysgariad?' : 'cais i ddod â’ch partneriaeth sifil i ben'}
  ${isJointApplication ? ' ar y cyd?' : ''}`,
  line1: `Y cam nesaf yn y${
    isDivorce ? ' ysgaru' : ''
  } broses yw gwneud cais am ‘orchymyn amodol’. Mae gorchymyn amodol yn ddogfen sy'n dweud nad yw'r llys yn gweld unrhyw reswm pam na allwch ${
    isDivorce ? 'cael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
  }.`,
  jointLine1: `Mae hwn yn gais ar y cyd, felly bydd yn rhaid i’ch ${partner} wneud cais hefyd. Anfonwyd e-bost ato/ati i'w (h)atgoffa.`,
  jointLine2: `Mae eich ${partner} eisoes wedi cadarnhau’r cais hwn ar y cyd.`,
  readMore: 'Darllenwch fwy am y camau nesaf',
  line2: 'Mae’n rhaid cwblhau 2 gam arall nes y byddwch wedi ysgaru’n gyfreithiol:',
  conditionalOrder: 'Gwneud cais am orchymyn amodol',
  conditionalOrderInfo: `Mae hyn yn dangos bod y llys yn cytuno bod gennych hawl i ${
    isDivorce ? 'gael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
  }.`,
  finalOrder: 'Gwneud cais am orchymyn terfynol',
  finalOrderInfo: `Mae hyn yn dod â'r ${
    isDivorce ? 'briodas' : 'partneriaeth sifil'
  } i ben yn gyfreithiol. Ni allwch wneud cais am orchymyn terfynol tan 6 wythnos ar ôl y gorchymyn amodol.`,
  yes: `Rwyf eisiau bwrw ymlaen â’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’r bartneriaeth sifil i ben'}`,
  no: `Nid wyf eisiau bwrw ymlaen â’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’r bartneriaeth sifil i ben'}`,
  errors: {
    applicant1ApplyForConditionalOrder: { required },
  },
});

export const form: FormContent = {
  fields: {
    applicant1ApplyForConditionalOrder: {
      type: 'radios',
      classes: 'govuk-radios',
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
  const isJointApplication = content.isJointApplication;
  const isApplicantFirstInTimeApplicant = content.isApplicant2
    ? content.userCase.coApplicant1StatementOfTruth !== Checkbox.Checked
    : content.userCase.coApplicant2StatementOfTruth !== Checkbox.Checked;
  return {
    isJointApplication,
    isApplicantFirstInTimeApplicant,
    ...translations,
    form,
  };
};
