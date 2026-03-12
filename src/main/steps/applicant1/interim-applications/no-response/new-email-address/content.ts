import config from 'config';

import { NoResponseProvidePartnerNewEmailOrAlternativeService } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Update your ${partner}'s email address`,
  line1: `You can update your ${partner}'s email address. We will send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } by email to this new email address, and by post to the postal address you have previously provided. This will be done for no additional cost.`,
  line2: `Alternatively, you can apply to serve the ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } papers by email only (without posting them). This will mean completing an application for alternative service, which will cost ${getFee(
    config.get('fees.alternativeService')
  )}. You will also need to prove that the email address you want to serve to is actively being used by your ${partner}.`,
  line3: `If your ${partner} is living outside of England and Wales, you'll need to check how to legally serve the papers in the country they're living in. If email service is allowed in that country, you could apply for alternative service by email only. The court cannot post documents to addresses outside of England and Wales.`,
  serviceOfDocuments: `<a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.serviceOfDocuments'
  )}">Further information concerning service out of the United Kingdom can be obtained from the Foreign Process Section (opens in a new tab)</a>.`,
  newEmailHeader: 'What do you want to do?',
  provideNewEmail: 'I want to provide a new email address',
  applyForAlternativeService: 'I want to apply for alternative service to serve by email only',
  errors: {
    applicant1NoResponseProvidePartnerNewEmailOrAlternativeService: {
      required: 'Select if you want to provide a new email address or apply for alternative service',
    },
  },
});

// @TODO translations should be verified once provided
const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Diweddaru cyfeiriad e-bost eich ${partner}`,
  line1: `Gallwch ddiweddaru cyfeiriad e-bost eich ${partner}. Byddwn yn anfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } drwy e-bost i’r cyfeiriad e-bost newydd hwn, a drwy’r post i’r cyfeiriad post rydych wedi’i ddarparu’n flaenorol. Ni fydd rhaid i chi dalu mwy am hyn.`,
  line2: `Fel arall, gallwch wneud cais i gyflwyno papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } drwy e-bost yn unig (heb eu postio). Bydd hyn yn golygu gwneud cais am gyflwyno amgen, a fydd yn costio ${getFee(
    config.get('fees.alternativeService')
  )}. Bydd angen i chi hefyd brofi bod y cyfeiriad e-bost rydych eisiau anfon y papurau iddo yn cael ei ddefnyddio’n rheolaidd gan eich ${partner}.`,
  line3: `Os yw eich ${partner} yn byw y tu allan i Gymru a Lloegr, bydd angen i chi wirio sut i gyflwyno’r papurau’n gyfreithlon yn y wlad lle maent yn byw. Os caniateir cyflwyno drwy e-bost yn y wlad honno, yna gallwch wneud cais am gyflwyno amgen ar ffurf e-bost yn unig. Ni all y llys anfon dogfennau i gyfeiriadau y tu allan i Gymru a Lloegr.`,
  serviceOfDocuments: `<a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.serviceOfDocuments'
  )}">Mae rhagor o wybodaeth ynghylch cyflwyno dogfennau y tu allan i'r Deyrnas Unedig ar gael gan yr Adran Prosesau Tramor (yn agor mewn tab newydd)</a>.`,
  newEmailHeader: 'Beth ydych chi eisiau gwneud?',
  provideNewEmail: 'Rwyf eisiau darparu cyfeiriad e-bost newydd',
  applyForAlternativeService: 'Rwyf eisiau gwneud cais am gyflwyno amgen i gyflwyno’r papurau drwy e-bost yn unig',
  errors: {
    applicant1NoResponseProvidePartnerNewEmailOrAlternativeService: {
      required: 'Dewiswch p’un a ydych eisiau darparu cyfeiriad e-bost newydd neu wneud cais am wasanaeth amgen',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponseProvidePartnerNewEmailOrAlternativeService: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.newEmailHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.provideNewEmail,
          id: 'provideNewEmail',
          value: NoResponseProvidePartnerNewEmailOrAlternativeService.PROVIDE_NEW_EMAIL,
        },
        {
          label: l => l.applyForAlternativeService,
          id: 'applyForAlternativeService',
          value: NoResponseProvidePartnerNewEmailOrAlternativeService.APPLY_FOR_ALTERNATIVE_SERVICE,
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

export const generateContent: TranslationFn = (content: CommonContent): Record<string, unknown> => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
