import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Search for your ${partner}'s contact details`,
  tryToFind: {
    title: 'You should try to find either:',
    options: {
      postal: `an up-to-date postal address for your ${partner}`,
      social: `a social media account, phone number or email address that you can prove your ${partner} actively uses`,
    },
  },
  manyWays: {
    title: `You can try many ways to find your ${partner}'s contact details, for example:`,
    options: {
      friends: 'asking their friends or other relatives',
      employer: 'asking their employer, if you know where they work',
      social: 'looking for them on social media',
      tracingAgent: 'employing a tracing agent to try to find their contact details',
    },
  },
  line1: `If you need to employ a tracing agent, you should expect to pay between £35-£70 for a basic search. They will search for your ${partner}’s contact details and should provide you with a report on any searches they carry out.`,
  line2:
    'Keep a record of the results of any searches you do as this will be useful evidence that you’ve tried to contact them.',
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Chwilio am fanylion cyswllt eich ${partner}`,
  tryToFind: {
    title: 'Dylech geisio dod o hyd i naill ai:',
    options: {
      postal: `cyfeiriad post cyfredol ar gyfer eich ${partner}`,
      social: `cyfrif cyfryngau cymdeithasol, rhif ffôn neu gyfeiriad e-bost y gallwch brofi bod eich ${partner} yn ei ddefnyddio’n rheolaidd`,
    },
  },
  manyWays: {
    title: `Gallwch geisio dod o hyd i fanylion cyswllt eich ${partner} mewn sawl ffordd, er enghraifft:`,
    options: {
      friends: 'gofyn i’w ffrindiau neu berthnasau eraill',
      employer: 'gofyn i’w cyflogwr, os ydych yn gwybod ble maent yn gweithio',
      social: 'chwilio amdanynt ar gyfryngau cymdeithasol',
      tracingAgent: 'cyflogi asiant olrhain i geisio dod o hyd i’w manylion cyswllt',
    },
  },
  line1: `Os ydych chi angen cyflogi asiant olrhain, dylech ddisgwyl gorfod talu rhwng £35-£70 am chwiliad sylfaenol. Byddant yn chwilio am fanylion cyswllt eich ${partner} a dylent roi adroddiad i chi ar unrhyw chwiliadau maent yn gwneud.`,
  line2:
    'Cadwch gofnod o’r canlyniadau ac unrhyw chwiliadau a wnewch oherwydd bydd yn dystiolaeth ddefnyddiol eich bod wedi ceisio cysylltu â nhw.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
  };
};
