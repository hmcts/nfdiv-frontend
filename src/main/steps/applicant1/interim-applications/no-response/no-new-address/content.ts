import { NoResponseNoNewAddressDetails } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'In person service and alternative service',
  line1: `You can try another way to deliver the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}.`,
  line2:
    'If you need to send the documents to an international address, you may need to seek legal advice to check what types of service are valid in that country.',
  inPerson: {
    header: 'In person service',
    details: `If you are confident the postal address is correct, you could consider in person service by a court bailiff or an independent process server. This means having the ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } delivered by hand to your ${partner} on your behalf, by someone professionally trained in delivering court documents.`,
  },
  alternative: {
    header: 'Alternative service',
    details: `Alternative service means sending your ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } to your ${partner} in a way other than by post. This could be by sending them by email only (without posting them), including to an email address you've already tried. You could also try sending the papers by text, or through a private message on social media.`,
  },
  noContactDetails: {
    header: `No contact details for your ${partner}`,
    details: `If you do not have any other contact details for your ${partner}, you can try another way to progress your application.`,
  },
  wantToApplyChoiceHeader: 'Do you want to apply for in person service, alternative service, or try something else?',
  inPersonService: 'I want to arrange for in person service',
  alternativeService: 'I want to apply for alternative service',
  somethingElse: 'I do not have any other way to contact them',
  errors: {
    applicant1NoResponseNoNewAddressDetails: {
      required: 'You must select an option before continuing',
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Cyflwyno personol a chyflwyno amgen',
  line1: `Gallwch geisio ffordd arall i ddanfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } i’ch ${partner}.`,
  line2:
    'If you need to send the documents to an international address, you may need to seek legal advice to check what types of service are valid in that country.',
  inPerson: {
    header: 'Cyflwyno personol',
    details: `Os ydych chi’n hyderus bod y cyfeiriad post yn gywir, gallwch ystyried gwneud cais i feili llys neu weinyddwr proses annibynnol gyflwyno’r papurau’n bersonol. Mae hyn yn golygu y byddai papurau’r ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } yn cael eu danfon â llaw i’ch ${partner} ar eich rhan, gan rywun sydd wedi’i hyfforddi’n broffesiynol i ddanfon dogfennau’r llys.`,
  },
  alternative: {
    header: 'Cyflwyno amgen',
    details: `Mae cyflwyno amgen yn golygu anfon papurau’r ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } at eich ${partner} mewn rhyw ffordd arall heblaw drwy’r post. Gallai hyn olygu eu hanfon drwy e-bost yn unig (heb eu postio), gan gynnwys i gyfeiriad e-bost rydych eisoes wedi’i ddefnyddio. Gallwch hefyd geisio anfon y papurau drwy neges testun, neu drwy neges breifat ar gyfryngau cymdeithasol.`,
  },
  noContact: {
    header: `Dim manylion cyswllt ar gyfer eich ${partner}`,
    details: `Os nad oes gennych chi unrhyw fanylion cyswllt eraill ar gyfer eich ${partner}, gallwch geisio symud eich cais yn ei flaen rhyw ffordd arall.`,
  },
  wantToApplyChoiceHeader:
    'Ydych chi eisiau gwneud cais am gyflwyno personol, cyflwyno amgen, neu ydych chi eisiau rhoi cynnig ar rywbeth arall?',
  inPersonService: 'Rwyf eisiau trefnu i’r papurau gael eu cyflwyno’n bersonol',
  alternativeService: 'Rwyf eisiau gwneud cais am gyflwyno amgen',
  somethingElse: 'Nid oes gennyf unrhyw ffordd arall o gysylltu â nhw',
  errors: {
    applicant1NoResponseNoNewAddressDetails: {
      required: 'Rhaid i chi ddewis opsiwn cyn parhau ',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponseNoNewAddressDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.wantToApplyChoiceHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.inPersonService,
          id: 'inPersonService',
          value: NoResponseNoNewAddressDetails.IN_PERSON_SERVICE,
        },
        {
          label: l => l.alternativeService,
          id: 'alternativeService',
          value: NoResponseNoNewAddressDetails.ALTERNATIVE_SERVICE,
        },
        {
          label: l => l.somethingElse,
          id: 'noContactDetails',
          value: NoResponseNoNewAddressDetails.NO_CONTACT_DETAILS,
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
