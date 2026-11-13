import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: `The chosen contact method is not actively used by your ${partner}`,
  line1: `You cannot ask the court to serve the papers using this method because you have indicated that it is not currently in use or has not been used recently by your ${partner}.`,
  line2: `You can return to your account to view other options for progressing your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
  returnToYourAccount: `<a href=${HUB_PAGE} class="govuk-link">Return to your account</a>`,
});

const cy = ({ partner, isDivorce }: CommonContent) => ({
  title: `Nid yw'r dull cysylltu a ddewiswyd yn cael ei ddefnyddio'n rheolaidd gan eich ${partner}`,
  line1: `Ni allwch ofyn i'r llys gyflwyno'r papurau gan ddefnyddio'r dull hwn oherwydd eich bod wedi nodi nad yw'n cael ei ddefnyddio ar hyn o bryd neu nad yw wedi cael ei ddefnyddio'n ddiweddar gan eich ${partner}.`,
  line2: `Gallwch ddychwelyd i'ch cyfrif i weld opsiynau eraill ar gyfer symud eich ${isDivorce ? 'cais hwn am ysgariad' : 'cais hwn i ddod â’ch partneriaeth sifil i ben'} yn ei flaen.`,
  returnToYourAccount: `<a href=${HUB_PAGE} class="govuk-link">Dychwelyd i'ch cyfrif</a>`,
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
