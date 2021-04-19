import { TranslationFn } from '../../app/controller/GetController';

const en = ({ partner }) => ({
  title: 'You can use English or Welsh courts to get a divorce',
  line1: 'Your answers indicate that you can apply for a divorce in England and Wales because:',
  line2: `both you and your ${partner} are habitually resident`,
  findOutMore: 'Read more about your connections',
  habitualResident: 'Habitual residence',
  line3:
    'If your lives are mainly based in England or Wales then you’re what is legally known as ‘habitually resident’ ',
  line4:
    'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
  line5:
    'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
  domicile: 'Domicile',
  line6:
    'Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.',
  line7: 'However, domicile can be more complex, for example, if you or your parents have moved countries in the past.',
  line8: "When you’re born, you acquire a 'domicile of origin'. This is usually:",
  bulletPoint1: 'the country your father was domiciled in if your parents were married',
  bulletPoint2:
    'the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born',
  line9:
    "If you leave your domicile of origin and settle in another country as an adult, the new country may become your 'domicile of choice'.",
  line10: 'If you’re not sure about your domicile, you should get legal advice.',
  question: 'Do you want to change your answers?',
  hint: `You only need to do this if your ${partner} may disagree with these connections.`,
  confident: 'I’m confident these connections are right',
  needInfo: 'I’m still not sure, and I want to change my answers',
  showAll: 'Show me all the connections, I‘ll choose myself',
});

const cy = en;

const languages = { en, cy };

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
