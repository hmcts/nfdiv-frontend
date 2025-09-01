import config from 'config';

import { NoResponsePartnerNewEmailOrAddress, YesOrNo, ServiceMethod } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ partner, isDivorce, userCase }: CommonContent) => {
  const addressOverseas = userCase.applicant2AddressOverseas === YesOrNo.YES;
  const isPersonalServiceRequired = userCase.serviceMethod === ServiceMethod.PERSONAL_SERVICE;
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
      isPersonalServiceRequired
        ? `You will need to arrange delivery of the ${divorceOrDissolutionPapers} to your ${partner} yourself`
        : `We will now serve your ${divorceOrDissolutionPapers} again using the new contact details you have provided`
    }.`,
    line3: `${
      isPersonalServiceRequired
        ? `You may wish to seek legal advice on how to serve the papers in the country your ${partner} is living in`
        : `Your ${partner} will have ${config.get(
            'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
          )} days from receiving the ${divorceOrDissolutionPapers} to respond. ${otherOptionsText}`
    }.`,
    line4: `${
      isPersonalServiceRequired
        ? `The amount of time your ${partner} has to respond depends on the country they’re living in. ${otherOptionsText}.`
        : ''
    }`,
    returnToYourAccount: `<a href=${HUB_PAGE} class="govuk-link">Return to your account</a>`,
  };
};

//TODO: Welsh translation required

const cy: typeof en = en;

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
