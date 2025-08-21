import config from 'config';

import { NoResponsePartnerNewEmailOrAddress, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ partner, isDivorce, userCase }: CommonContent) => {
  const addressOverseas = userCase.applicant2AddressOverseas === YesOrNo.YES;
  const isAddressOnlyUpdate =
    userCase.applicant1NoResponsePartnerNewEmailOrAddress === NoResponsePartnerNewEmailOrAddress.ADDRESS;
  const divorceOrDissolutionPapers = isDivorce ? 'divorce papers' : 'papers to end your civil partnership';
  const otherOptionsText = `If ${
    addressOverseas ? 'they do' : `your ${partner} does`
  } not respond, we will help you explore the other options you have to progress your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }`;
  return {
    title: `${addressOverseas && isAddressOnlyUpdate ? 'Address' : 'Details'} updated`,
    line1: `You have successfully updated your ${partner}’s ${
      addressOverseas && isAddressOnlyUpdate
        ? 'address'
        : userCase.applicant1NoResponsePartnerNewEmailOrAddress === NoResponsePartnerNewEmailOrAddress.EMAIL_AND_ADDRESS
          ? 'email and postal address'
          : 'contact details'
    }.`,
    whatHappensNext: 'What happens next',
    line2: `${
      addressOverseas
        ? `You will need to arrange delivery of the ${divorceOrDissolutionPapers} to your ${partner} yourself`
        : `We will now serve your ${divorceOrDissolutionPapers} again using the new contact details you have provided`
    }.`,
    line3: `${
      addressOverseas
        ? `You may wish to seek legal advice on how to serve the papers in the country your ${partner} is living in`
        : `Your ${partner} will have ${config.get(
            'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
          )} days from receiving the ${divorceOrDissolutionPapers} to respond. ${otherOptionsText}`
    }.`,
    line4: `${
      addressOverseas
        ? `The amount of time your ${partner} has to respond depends on the country they’re living in. ${otherOptionsText}.`
        : ''
    }`,
    returnToYourAccount: `<a href=${HUB_PAGE} class="govuk-link">Return to your account</a>`,
  };
};

//TODO: Welsh translation required

const cy: typeof en = ({ partner, isDivorce, userCase }: CommonContent) => {
  const addressOverseas = userCase.applicant2AddressOverseas === YesOrNo.YES;
  const isAddressOnlyUpdate =
    userCase.applicant1NoResponsePartnerNewEmailOrAddress === NoResponsePartnerNewEmailOrAddress.ADDRESS;
  const divorceOrDissolutionPapers = isDivorce ? "papurau'r ysgariad" : "cais i ddod â'ch partneriaeth sifil i ben";
  const otherOptionsText = `Os nad yw eich ${partner} yn ymateb, byddwn yn eich helpu i archwilio’r dewisiadau eraill sydd gennych i datblygu eich ${
    isDivorce ? 'cais ysgariad' : 'cais i ddiweddu eich partneriaeth sifil'
  }`;

  return {
    title: `${addressOverseas && isAddressOnlyUpdate ? 'Address' : 'Details'} updated`,
    line1: `Rydych wedi diweddaru ${
      addressOverseas && isAddressOnlyUpdate ? 'cyfeiriad eich' : 'manylion cyswllt eich'
    } ${partner}.`,
    whatHappensNext: 'Beth fydd yn digwydd nesaf',
    line2: `${
      addressOverseas
        ? `Bydd angen i chi drefnu bod papurau'r ${divorceOrDissolutionPapers} yn cael eu danfon i'ch ${partner} eich hun.`
        : `We will now serve your ${divorceOrDissolutionPapers} again using the new contact details you have provided`
    }.`,
    line3: `${
      addressOverseas
        ? `Mae'n bosibl y byddwch yn dymuno ceisio cyngor cyfreithiol ar sut i gyflwyno'r papurau yn y wlad lle mae eich ${partner} yn byw.`
        : `Bydd gan eich ${partner} ${config.get(
            'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
          )} diwrnod o pan fyddant yn cael papurau’r ${divorceOrDissolutionPapers} i ymateb. Os nad yw eich ${partner} yn ymateb, byddwn yn eich helpu i archwilio’r dewisiadau eraill sydd gennych i ddatblygu eich ${
            isDivorce ? 'cais ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
          }.`
    }.`,
    line4: `${
      addressOverseas
        ? `Yna, dylent ymateb i’r cais. Mae faint o amser sydd gan eich ${partner} i ymateb yn dibynnu ar y wlad ble maent yn byw. ${otherOptionsText}.`
        : ''
    }`,
    returnToYourAccount: `<a href=${HUB_PAGE} class="govuk-link">Dychwelyd i'ch cyfrif</a>`,
  };
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translation = languages[content.language](content);
  return {
    ...translation,
  };
};
