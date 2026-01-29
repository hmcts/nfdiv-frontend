import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as alsoTryGenerateContent } from '../../common/also-try/content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Arrange service by a process server',
  line1: `You can arrange for an independent process server to hand deliver your ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }. You must not deliver them yourself.`,
  howItWorks: {
    header: 'How it works',
    steps: {
      one: "Once you confirm that this is what you want to do, you'll be able to download the papers from your account.",
      two: 'You will need to find and employ a process server. You may wish to consider how many times they will attempt to serve, over what period of time, and at what times of the day.',
      three: `They will attempt to serve the papers on your ${partner}.`,
      four: 'If they serve successfully, they will complete the certificate of service (form FP6) and send it to you.',
      five: 'You will then need to send the certificate of service to the court.',
      six: `If the papers have been correctly served and your ${partner} still hasn't responded, your ${
        isDivorce ? 'divorce' : 'application to end your civil partnership'
      } can continue without their response.`,
    },
  },
  line2: `If they fail to serve, you may be able to apply for alternative service by letterbox, if your ${partner}'s address is confirmed. Otherwise, you will need to try another way to serve the papers.`,
  iWantToArrangeService: 'I want to arrange service by process server',
});

const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Trefnu i’r dogfennau gael eu cyflwyno gan weinyddwr proses',
  line1: `Gallwch drefnu i weinyddwr proses annibynnol ddanfon papurau eich ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } â llaw. Ni ddylech eu cyflwyno eich hun.`,
  howItWorks: {
    header: 'Sut mae’n gweithio',
    steps: {
      one: 'Unwaith y byddwch yn cadarnhau mai dyma beth rydych eisiau ei wneud, byddwch yn gallu lawrlwytho’r papurau o’ch cyfrif.',
      two: 'Bydd angen i chi ddod o hyd i weinyddwr proses a’u cyflogi. Efallai yr hoffech ystyried faint o weithiau y byddant yn ceisio cyflwyno’r dogfennau, dros pa gyfnod o amser ac am ba amser o’r dydd.',
      three: `Byddant yn ceisio cyflwyno’r papurau i’ch ${partner}.`,
      four: 'Os byddant yn eu cyflwyno’n llwyddiannus, byddant yn llenwi tystysgrif cyflwyno (ffurflen FP6) a’i hanfon atoch.',
      five: 'Bydd angen i chi wedyn anfon y dystysgrif cyflwyno i’r llys.',
      six: `Os bydd y papurau wedi’u cyflwyno’n gywir a bod eich ${partner} dal heb ymateb 14 diwrnod ar ôl iddynt gael eu cyflwyno â’r papurau, gall eich ${
        isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
      } barhau heb eu hymateb.`,
    },
  },
  line2: `Os byddant yn methu â chyflwyno’r papurau, efallai y gallwch wneud cais am gyflwyno amgen drwy flwch llythyrau, os yw cyfeiriad eich ${partner} wedi’i gadarnhau. Fel arall, bydd angen i chi gyflwyno’r papurau mewn rhyw ffordd arall.`,
  iWantToArrangeService: 'Rwyf eisiau trefnu cyflwyno gan weinyddwr proses',
});

export const form: FormContent = {
  fields: {},
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
  const alsoTry = alsoTryGenerateContent(content);
  return {
    ...translations,
    ...alsoTry,
    form,
  };
};
