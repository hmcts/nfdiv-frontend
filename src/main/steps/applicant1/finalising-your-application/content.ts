import config from 'config';
import dayjs from 'dayjs';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import { State } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import {
  doesApplicantIntendToSwitchToSoleFo,
  getSwitchToSoleFoStatus,
} from '../../common/switch-to-sole-content.utils';
import { generateContent as columnGenerateContent } from '../hub-page/right-column/content';

const en = ({ isDivorce, partner, userCase, isJointApplication, isApplicant2 }: CommonContent) => ({
  title: `Do you want to ${isDivorce ? 'finalise your divorce' : 'end your civil partnership'}?`,
  line1: `Your ${
    isDivorce ? 'marriage' : 'civil partnership'
  } will be legally ended after the final order is made. This might affect your finances.`,
  warningText: `If you have not finished negotiations about your money, property or other assets then you should seek legal advice before finalising
  ${isDivorce ? 'your divorce' : 'ending your civil partnership'}. ${
    isJointApplication &&
    State.AwaitingFinalOrder.includes(userCase.state as State) &&
    !doesApplicantIntendToSwitchToSoleFo(userCase, isApplicant2)
      ? 'If you want to settle your finances first, then save and sign out.'
      : ''
  }`,
  readMore: {
    subHeader: `If you want to settle your finances before  ${
      isDivorce ? 'finalising your divorce' : 'ending your civil partnership'
    }`,
    line1: 'You should save and sign out and settle your finances before applying for a final order.',
    line2: `If you have not applied by ${getFormattedDate(
      userCase.dateFinalOrderEligibleToRespondent
    )} then your ${partner} will be able to apply.
    You may both have to come to a court hearing, if they apply.`,
    line3: 'If you wait a year before applying then you will need to explain the delay to the court.',
  },
  readMoreJoint: {
    subHeader: 'Changing to a sole application',
    line1: `If you still want to ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    } but you do not think your ${partner} will confirm the final order then you can change to a sole application.
    This means your ${partner} will become the respondent.`,
    line2: `You should still continue and confirm you want to ${
      isDivorce ? 'finalise your divorce' : 'end your civil partnership'
    } below.
    If your ${partner} does not also confirm within ${config.get(
      'dates.changingToSolePartnerConfirmationWeeks'
    )} weeks then you will be able to ${
      isDivorce ? 'finalise your divorce' : 'end your civil partnership'
    } as a sole applicant.
    You will receive an email with information on how to change your application, if they do not apply.`,
  },
  readMoreAboutSettlingFinances: {
    subHeader: `Read more about settling your finances before ${
      isDivorce ? 'finalising your divorce' : 'ending your civil partnership'
    }.`,
    line1: `Your financial rights will change after the ${
      isDivorce ? 'divorce is finalised' : 'civil partnership is legally ended'
    }.
     If you have not settled your finances then you should save and sign out and seek legal advice.`,
    line2: `Your ${partner} has already confirmed this joint application.
    If you do not confirm then they can still apply to ${
      isDivorce ? 'finalise the divorce' : 'end the civil partnership'
    } as a sole applicant.
    This will mean you will become the respondent and the ${
      isDivorce ? 'divorce could be finalised' : 'civil partnership could be ended'
    } without your confirmation.
    They must give you ${config.get('dates.settlingFinancesConfirmationDays')} days notice if they intend to do this.`,
    line3: {
      part1: `If you want to settle your finances before the ${
        isDivorce ? 'divorce is finalised' : 'civil partnership is legally ended'
      }
      then you can apply to delay the final order. You can do this by filling out a `,
      part2: "'general application' D11 form",
      link: config.get('govukUrls.d11Form'),
      part3: ` and sending it to the court.
      You only need to apply to delay the final order if you receive notice from your ${partner}
      that they are going to apply to ${
        isDivorce ? 'finalise the divorce' : 'end the civil partnership'
      } as a sole applicant.`,
    },
  },
  links: {
    applicationForFinalOrder: config.get('govukUrls.d36Form'),
    certificateOfService: config.get('govukUrls.n215Form'),
  },
  readMoreChangeToSole: {
    subHeader: State.AwaitingJointFinalOrder.includes(userCase.state as State)
      ? 'Changing to a sole application'
      : 'If you want to change to a sole application now ',
    line1: State.AwaitingJointFinalOrder.includes(userCase.state as State)
      ? `Your ${partner} has already confirmed the application for a final order. The quickest way for you to
    ${
      isDivorce ? 'finalise your divorce' : 'end your civil partnership'
    } is for you to also confirm at the bottom of this page.`
      : `If you know your ${partner} is not going to confirm the joint application, then you can apply to change to a sole application now.
    You should save and sign out and follow these steps.`,
    line2: `If you want to change to a sole application then it will delay the ${
      isDivorce ? 'divorce' : 'ending of the civil partnership'
    }.
    You can change by following the steps below:`,
    orderedList1: {
      linkText: 'Download and fill out an application for a final order',
      part2: ' (as a sole applicant)',
    },
    orderedList2: {
      line1: `Give notice to your ${partner} that you are intending to apply for a final order as a sole applicant.
      You can do this by sending them a draft copy of the application by email or post. You will need to `,
      linkText: "fill out a 'certificate of service'",
      line2: ' form to prove to the court that you have given them notice.',
    },
    orderedList3: `You have to give your ${partner} ${config.get(
      'dates.changingToSolePartnerResponseDays'
    )} days to respond,
    starting from the day they are ‘served’ the application. After ${config.get(
      'dates.changingToSolePartnerResponseDays'
    )} days, then send the following documents and evidence to the court:`,
    bulletPoint1: {
      part1: 'The ',
      linkText: 'application for a final order',
      part2: ' (as a sole applicant)',
    },
    bulletPoint2: {
      part1: 'The ',
      linkText: "'certificate of service'",
      part2: ` which proves that you have given notice to your ${partner} that you are intending to apply for a final order as a sole applicant.`,
    },
    line3:
      'You can either post or email the documents and evidence to the court. Details of where to send them are on any correspondence you have received from the court.',
  },
  checkboxLine: `I want to ${isDivorce ? 'finalise my divorce' : 'end my civil partnership'} ${
    isJointApplication &&
    State.AwaitingFinalOrder.includes(userCase.state as State) &&
    !doesApplicantIntendToSwitchToSoleFo(userCase, isApplicant2)
      ? `jointly with my ${partner}`
      : ''
  }`,

  errors: {
    doesApplicant1WantToApplyForFinalOrder: {
      required:
        'You cannot continue without selecting the checkbox. If you do not want to continue then save and sign out.',
    },
  },
  continue: `${
    State.FinalOrderOverdue.includes(userCase.state as State) ||
    dayjs().isAfter(userCase.dateFinalOrderNoLongerEligible)
      ? 'Continue'
      : 'Submit'
  }`,
});

const cy: typeof en = ({ isDivorce, partner, userCase, isJointApplication, isApplicant2 }: CommonContent) => ({
  title: `Ydych chi eisiau ${isDivorce ? 'cadarnhau eich ysgariad' : "dod â'ch partneriaeth sifil i ben"}?`,
  line1: `Bydd eich ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  } yn dod i ben yn gyfreithiol pan wneir y gorchymyn terfynol. Gallai hyn effeithio ar eich sefyllfa ariannol.`,
  warningText: `Os nad ydych wedi gorffen cynnal trafodaethau am eich arian, eiddo neu asedau eraill yna dylech ofyn am gyngor cyfreithiol cyn
  ${isDivorce ? 'cadarnhau eich ysgariad' : 'dod â’ch partneriaeth sifil i ben'}. ${
    isJointApplication &&
    State.AwaitingFinalOrder.includes(userCase.state as State) &&
    !doesApplicantIntendToSwitchToSoleFo(userCase, isApplicant2)
      ? 'Os ydych eisiau setlo eich sefyllfa ariannol yn gyntaf, yna dylech gadw’r cais ac allgofnodi.'
      : ''
  }`,
  readMore: {
    subHeader: `Os ydych eisiau sortio eich sefyllfa ariannol cyn ${
      isDivorce ? 'cadarnhau eich ysgariad' : 'dod â’ch partneriaeth sifil i ben'
    }`,
    line1: 'Dylech gadw’r cais ac allgofnodi, a sortio eich sefyllfa ariannol cyn gwneud cais am orchymyn terfynol.',
    line2: `Os nad ydych wedi gwneud cais erbyn ${getFormattedDate(
      userCase.dateFinalOrderEligibleToRespondent
    )} yna bydd eich ${partner} yn gallu gwneud cais.
    Mae’n bosib y bydd yn rhaid i’r ddau ohonoch ddod i wrandawiad llys, os byddant yn gwneud cais.`,
    line3:
      "Os byddwch yn disgwyl blwyddyn cyn gwneud cais yna bydd angen i chi egluro’r rhesymau dros yr oedi i'r llys.",
  },
  readMoreJoint: {
    subHeader: 'Newid i gais unigol',
    line1: `Os ydych dal eisiau ${
      isDivorce ? 'cael ysgariad' : 'dod â’ch partneriaeth sifil i ben'
    } ond nad ydych yn meddwl y bydd eich ${partner} eisiau cadarnhau’r gorchymyn terfynol yna gallwch newid i gais unigol.
    Bydd hyn yn golygu y bydd eich ${partner} yn dod yn atebydd.`,
    line2: `Dylech ddal i barhau a chadarnhau eich bod eisiau ${
      isDivorce ? 'cadarnhau eich ysgariad' : 'dod â’ch partneriaeth sifil i ben'
    } isod.
    Os na fydd eich ${partner} hefyd yn cadarnhau o fewn ${config.get(
      'dates.changingToSolePartnerConfirmationWeeks'
    )} wythnos, yna byddwch yn gallu ${
      isDivorce ? 'cadarnhau eich ysgariad' : 'dod â’ch partneriaeth sifil i ben'
    } fel ymgeisydd unigol.
    Byddwch yn cael e-bost gyda gwybodaeth am sut i newid eich cais, os na fydd yn gwneud cais.`,
  },
  readMoreAboutSettlingFinances: {
    subHeader: `Darllen mwy am setlo eich sefyllfa ariannol cyn ${
      isDivorce ? 'cadarnhau eich ysgariad' : 'dod â’ch partneriaeth sifil i ben'
    }.`,
    line1: `Bydd eich hawliau ariannol yn newid ar ôl ${
      isDivorce ? 'i’r ysgariad gael ei gadarnhau' : 'i’r bartneriaeth sifil ddod i ben yn gyfreithiol'
    }.
     Os nad ydych wedi setlo eich sefyllfa ariannol yna dylech gadw eich cais ac allgofnodi a cheisio cyngor cyfreithiol.`,
    line2: `Mae eich ${partner} wedi cadarnhau’r cais ar y cyd hwn yn barod.
    Os na fyddwch yn cadarnhau gall ddal wneud cais i ${
      isDivorce ? 'gadarnhau eich ysgariad' : 'ddod â’ch partneriaeth sifil i ben'
    } fel unig geisydd.
    Bydd hyn yn golygu chi fydd yr atebydd a ${
      isDivorce ? 'gall eich ysgariad gael ei gadarnhau' : 'gall eich partneriaeth sifil ddod i ben'
    } heb i chi gadarnhau.
    Rhaid iddo/iddi roi ${config.get(
      'dates.settlingFinancesConfirmationDays'
    )} diwrnod o rybudd i chi os yw’n bwriadu gwneud hyn.`,
    line3: {
      part1: `Os ydych eisiau setlo eich sefyllfa ariannol cyn i'r ${
        isDivorce ? 'ysgariad gael ei gadarnhau' : 'bartneriaeth sifil ddod i ben yn gyfreithiol'
      } yna gallwch wneud cais i oedi'r gorchymyn terfynol. Gallwch wneud hyn trwy llenwi `,
      part2: "ffurflen D11 'cais cyffredinol'",
      link: config.get('govukUrls.d11Form'),
      part3: ` a'i hanfon i'r llys.
      Dylech ond gwneud cais i oedi’r gorchymyn terfynol os ydych yn cael rhybudd gan eich ${partner}
      ei fod/bod am wneud cais i ${
        isDivorce ? 'gadarnhau’r ysgariad' : 'dod â’r partneriaeth sifil i ben'
      } fel unig geisydd.`,
    },
  },
  links: {
    applicationForFinalOrder: config.get('govukUrls.d36Form'),
    certificateOfService: config.get('govukUrls.n215Form'),
  },
  readMoreChangeToSole: {
    subHeader: State.AwaitingJointFinalOrder.includes(userCase.state as State)
      ? 'Newid i gais unigol'
      : 'Os ydych eisiau newid i gais unigol nawr',
    line1: State.AwaitingJointFinalOrder.includes(userCase.state as State)
      ? `Mae eich ${partner} wedi cadarnhau’r cais am orchymyn terfynol yn barod. Y ffordd gyflymaf i chi
    ${
      isDivorce ? 'gadarnhau eich ysgariad' : 'dod â’ch partneriaeth sifil i ben'
    } yw i chi hefyd gadarnhau ar waelod y dudalen hon.`
      : `Os gwyddoch na fydd eich ${partner} yn cadarnhau eich cais ar y cyd, yna gallwch wneud cais i newid i gais unigol nawr.
    Dylech gadw eich cais ac allgofnodi a dilyn y camau hyn.`,
    line2: `Os ydych eisiau newid i gais unigol, bydd hynny’n achosi oedi i’r ${
      isDivorce ? 'ysgariad' : 'cais i dod â’ch partneriaeth sifil i ben'
    }. Gallwch newid trwy ddilyn y camau isod:`,
    orderedList1: {
      linkText: 'Lawrlwytho a llenwi ffurflen gais am orchymyn terfynol',
      part2: ' (fel unig geisydd)',
    },
    orderedList2: {
      line1: `Rhoi rhybudd i’ch ${partner} eich bod yn bwriadu gwneud cais am orchymyn terfynol fel unig geisydd.
      Gallwch wneud hyn trwy anfon copi drafft o’r cais trwy e-bost neu drwy’r post. Bydd arnoch angen `,
      linkText: 'llenwi ffurflen ‘tystysgrif cyflwyno’',
      line2: ' i brofi i’r llys eich bod wedi rhoi rhybudd iddo/iddi.',
    },
    orderedList3: `Rhaid i chi roi ${config.get(
      'dates.changingToSolePartnerResponseDays'
    )} diwrnod i’ch ${partner} ymateb, yn cychwyn ar y diwrnod mae’r cais yn cal ei ‘gyflwyno’ iddynt. Ar ôl ${config.get(
      'dates.changingToSolePartnerResponseDays'
    )} diwrnod, anfonwch y dogfennau a thystiolaeth canlynol i’r llys:`,
    bulletPoint1: {
      part1: 'Y ',
      linkText: 'cais am Orchymyn Terfynol',
      part2: ' (fel unig geisydd)',
    },
    bulletPoint2: {
      part1: 'Y ',
      linkText: '‘dystysgrif cyflwyno’',
      part2: ` sy’n profi eich bod wedi rhoi rhybudd i’ch ${partner} eich bod yn bwriadu gwneud cais am orchymyn terfynol fel unig geisydd.`,
    },
    line3:
      'Gallwch un ai postio neu e-bostio’r dogfennau a’r dystiolaeth i’r llys. Bydd y manylion am lle i’w hanfon wedi’u nodi ar unrhyw ohebiaeth rydych wedi’i chael gan y llys.',
  },
  checkboxLine: `Rwyf eisiau ${isDivorce ? 'cadarnhau fy ysgariad' : "dod â'm partneriaeth sifil i ben"} ${
    isJointApplication &&
    State.AwaitingFinalOrder.includes(userCase.state as State) &&
    !doesApplicantIntendToSwitchToSoleFo(userCase, isApplicant2)
      ? `ar y cyd gyda fy ${partner}`
      : ''
  }`,

  errors: {
    doesApplicant1WantToApplyForFinalOrder: {
      required:
        'Ni allwch barhau heb ddewis opsiwn o’r blwch ticio. Os nad ydych eisiau parhau yna dylech gadw’r cais ac allgofnodi.',
    },
  },
  continue: `${
    State.FinalOrderOverdue.includes(userCase.state as State) ||
    dayjs().isAfter(userCase.dateFinalOrderNoLongerEligible)
      ? 'Parhau'
      : 'Cyflwyno'
  }`,
});

export const form: FormContent = {
  fields: {
    doesApplicant1WantToApplyForFinalOrder: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'doesApplicant1WantToApplyForFinalOrder',
          label: l => l.checkboxLine,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
          selected: false,
        },
      ],
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
  const { userCase, isApplicant2 } = content;
  const translations = languages[content.language](content);

  const isJointAppAndStateAwaitingFoOrFoOverdue =
    content.isJointApplication &&
    (userCase.state === State.AwaitingFinalOrder || userCase.state === State.FinalOrderOverdue);
  const isJointAppAndStateAwaitingJointFo =
    content.isJointApplication && userCase.state === State.AwaitingJointFinalOrder;
  const isStateAwaitingJointFo = userCase.state === State.AwaitingJointFinalOrder;

  const isIntendingAndAbleToSwitchToSoleFo = getSwitchToSoleFoStatus(
    userCase,
    isApplicant2
  ).isIntendingAndAbleToSwitchToSoleFo;

  return {
    ...translations,
    ...columnGenerateContent(content),
    isJointAppAndStateAwaitingFoOrFoOverdue,
    isJointAppAndStateAwaitingJointFo,
    isStateAwaitingJointFo,
    isIntendingAndAbleToSwitchToSoleFo,
    form,
  };
};
