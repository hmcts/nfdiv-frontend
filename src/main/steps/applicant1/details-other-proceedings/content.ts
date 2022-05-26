import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce }: CommonContent) => ({
  title: 'Details of the other legal proceedings',
  line1: `The court needs to know the details of the other legal proceedings relating to your ${
    isDivorce ? 'marriage' : 'civil partnership'
  }.
  Provide as much information as possible, such as:`,
  point1: 'the names of the people involved',
  point2: 'the case number(s)',
  point3: "if the proceedings are ongoing of if they've finished",
  point4: 'what the proceedings are about',
  point5: 'the name and address of a court, including the country',
  point6: 'the date the proceedings began',
  point7: 'the dates of any hearings that have been scheduled',
  point8: 'the details of any orders that have been made',
  applicant1LegalProceedingsDetails: 'Provide details about the other legal proceedings.',
  errors: {
    applicant1LegalProceedingsDetails: {
      required: 'You have not provided any information. You need to enter details of the other legal proceedings.',
    },
  },
});

const cy: typeof en = ({ isDivorce }: CommonContent) => ({
  title: 'Manylion yr achosion cyfreithiol eraill',
  line1: `Mae angen i'r llys wybod manylion yr achosion cyfreithiol eraill sy'n ymwneud â'ch ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  }.
  Darparwch cymaint o wybodaeth â phosibl, megis: `,
  point1: 'enwau’r bobl sydd ynghlwm â’r achos',
  point2: 'Rhif(au) yr achos(ion)',
  point3: 'os yw’r achosion yn mynd rhagddynt neu os ydynt wedi gorffen',
  point4: 'beth yw diben yr achosion',
  point5: 'enw a chyfeiriad y llys, gan gynnwys y wlad',
  point6: 'y dyddiad y dechreuodd yr achosion',
  point7: "dyddiadau unrhyw wrandawiadau sydd wedi'u trefnu ",
  point8: 'manylion unrhyw orchmynion sydd wedi’u gwneud',
  applicant1LegalProceedingsDetails: 'Rhowch fanylion am yr achosion cyfreithiol eraill.',
  errors: {
    applicant1LegalProceedingsDetails: {
      required:
        'Nid ydych wedi darparu unrhyw wybodaeth. Mae angen i chi nodi manylion yr achosion cyfreithiol eraill.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1LegalProceedingsDetails: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.applicant1LegalProceedingsDetails,
      labelSize: 'normal',
      validator: isFieldFilledIn,
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
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
