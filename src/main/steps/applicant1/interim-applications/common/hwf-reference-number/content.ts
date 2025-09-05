import { InterimApplicationType, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateCommonContent } from '../../../../common/common.content';

const en = (serviceType: string) => ({
  title: 'Do you have a help with fees reference number?',
  line1: `Your reference number must be unique to this ${serviceType} application. You cannot use a reference number you've used for a previous application.`,
  yes: 'Yes',
  no: 'No',
  errors: {
    applicant1InterimAppsHaveHwfReference: {
      required: "Select 'Yes' if you have a help with fees reference number.",
    },
  },
});

const cy = (serviceType: string) => ({
  title: 'A oes gennych chi gyfeirnod Help i Dalu Ffioedd?',
  line1: `Rhaid i’ch cyfeirnod fod yn unigryw i’r cais hwn am ${serviceType}. Ni allwch ddefnyddio cyfeirnod rydych wedi defnyddio ar gyfer cais blaenorol.`,
  yes: 'Oes',
  no: 'Nac oes',
  errors: {
    applicant1InterimAppsHaveHwfReference: {
      required: "Dewiswch 'Oes' os oes gennych chi gyfeirnod help i dalu ffioedd.",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1InterimAppsHaveHwfReference: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  let serviceType;

  switch (content.userCase.applicant1InterimApplicationType) {
    case InterimApplicationType.DEEMED_SERVICE: {
      serviceType = generateCommonContent(content).generalApplication.deemed;
      break;
    }
    case InterimApplicationType.DISPENSE_WITH_SERVICE: {
      serviceType = generateCommonContent(content).generalApplication.dispensed;
      break;
    }
    case InterimApplicationType.ALTERNATIVE_SERVICE: {
      serviceType = generateCommonContent(content).generalApplication.alternativeService;
      break;
    }
    default: {
      serviceType = '';
    }
  }

  const translations = languages[content.language](serviceType);
  return {
    ...translations,
    form,
  };
};
