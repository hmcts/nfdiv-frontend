import { NoResponseSearchOrDispense } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Ask the court to search government records for your ${partner}'s details`,
  beforeCourtConsideration: {
    title:
      'Before the court can consider this, you must show that you have done everything you can to find their contact details yourself, including:',
    options: {
      friends: 'asking their friends or relatives if you are able to do so',
      online: 'using online people finder services',
      socialMedia: 'looking for them on social media',
    },
  },
  line1: `Government record searches are typically completed within 6-8 weeks. If the search is successful, your ${partner}'s contact details will only be shared with the court and not with you. The court will send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line2: `If you’ve already asked the court to search government records and they were unsuccessful, you could apply to dispense with service. This means proceeding with your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } without sending the ${isDivorce ? 'divorce papers' : 'papers to end your civil partnership'} to your ${partner}.`,
  howToProceedHeader: 'How do you want to proceed?',
  search: 'I want to ask the court to search government records',
  dispense: `I want to apply to proceed without sending the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }.`,
  errors: {
    applicant1NoResponseSearchOrDispense: {
      required: 'You must select an option before continuing',
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: `Os ydych chi’n meddwl bod eich ${partner} dal yn y DU, gallwch ofyn i’r llys chwilio am fanylion cyswllt eich ${partner} drwy adran y llywodraeth.`,
  beforeCourtConsideration: {
    title:
      'Cyn gall y llys ystyried hyn, mae’n rhaid i chi ddangos eich bod chi wedi gwneud popeth y gallwch i ddod o hyd i’w manylion cyswllt eich hun, gan gynnwys:',
    options: {
      friends: 'gofyn i’w ffrindiau neu berthnasau os gallwch wneud hyn',
      online: 'defnyddio gwasanaethau chwilio am bobl ar-lein',
      socialMedia: 'chwilio amdanynt ar gyfryngau cymdeithasol',
    },
  },
  line1: `Gan amlaf, bydd chwiliadau cofnodion y llywodraeth yn cymryd rhwng 6-8 wythnos. Os yw’r chwiliad yn llwyddiannus, dim ond gyda’r llys y bydd manylion cyswllt eich ${partner} yn cael eu rhannu, ac nid gyda chi. Bydd y llys yn anfon papurau’r ${isDivorce ? 'ysgariad' : 'diddymiad'} at eich ${partner}.`,
  line2: `Os ydych chi eisoes wedi ceisio dod o hyd i fanylion eich ${partner} drwy chwilio cofnodion y llywodraeth ac roeddech yn aflwyddiannus, gallwch wneud cais am hepgor cyflwyno. Mae hyn yn golygu parhau â’ch ${isDivorce ? 'ysgariad' : 'diddymiad'} heb anfon papurau’r ${isDivorce ? 'ysgariad' : 'diddymiad'} at eich ${partner}.`,
  howToProceedHeader: 'Sut ydych chi eisiau parhau?',
  search: 'Rwyf eisiau gwneud cais i chwilio cofnodion y llywodraeth',
  dispense: `Rwyf eisiau gwneud cais i barhau heb anfon papurau’r ${isDivorce ? 'ysgariad' : 'diddymiad'}`,
  errors: {
    applicant1NoResponseSearchOrDispense: {
      required: 'Rhaid i chi ddewis opsiwn cyn parhau',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponseSearchOrDispense: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.howToProceedHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.search,
          id: 'search',
          value: NoResponseSearchOrDispense.SEARCH,
        },
        {
          label: l => l.dispense,
          id: 'dispense',
          value: NoResponseSearchOrDispense.DISPENSE,
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
