import { LegalProceedingsRelated, YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../app/form/validation';
import type { CommonContent } from '../common/common.content';

const en = ({ isDivorce, partner, required, marriage, civilPartnership }: CommonContent) => {
  const partnership = isDivorce ? marriage : civilPartnership;
  return {
    title: 'Other court cases',
    line1: `The court needs to know if there are any other legal proceedings related to your ${partnership}, property or children. This includes any legal proceedings that are:`,
    point1: 'ongoing, finished or abandoned',
    point2: `between you and your ${partner}`,
    point3: `between you, your ${partner} and anyone else`,
    question: `Are there, or have there ever been, any other legal proceedings relating to your ${partnership}, property or children?`,
    hint: 'Not including legal proceedings that may happen in the future.',
    subField: 'What do the legal proceedings relate to?',
    subFieldHint: 'Select all that apply',
    partnership: `${isDivorce ? 'Marriage' : 'Civil partnership'}`,
    property: 'Property',
    children: 'Children',
    errors: {
      legalProceedings: {
        required,
      },
      legalProceedingsRelated: {
        required: 'You need to select what the proceedings relate to.',
      },
    },
  };
};

const cy = ({ isDivorce, partner, required, marriage, civilPartnership }: CommonContent) => {
  const partnership = isDivorce ? marriage : civilPartnership;
  return {
    title: 'Achosion llys eraill',
    line1: `Mae'r llys angen gwybod os oes unrhyw achosion cyfreithiol eraill yng nghyswllt eich ${partnership}, eich eiddo, neu'ch plant. Mae hyn yn cynnwys unrhyw achosion cyfreithiol sydd:`,
    point1: 'yn gyfredol, sydd wedi dod i ben, neu achos y rhoddwyd gorau iddo',
    point2: `rhyngoch chi a'ch ${partner}`,
    point3: `rhyngoch chi, eich ${partner} ac unrhyw un arall`,
    question: `A oes, neu a oes wedi bod erioed, unrhyw achosion cyfreithiol eraill yng nghyswllt eich ${partnership}, eich eiddo, neu'ch plant?`,
    hint: "Nid yw'n cynnwys unrhyw achosion cyfreithiol a all ddigwydd yn y dyfodol",
    subField: "Ynghylch beth y mae'r achos cyfreithiol?",
    subFieldHint: "Dewiswch bob un sy'n berthnasol",
    partnership: `Ein ${partnership}`,
    property: 'Ein heiddo',
    children: 'Ein plant',
    errors: {
      legalProceedings: {
        required,
      },
      legalProceedingsRelated: {
        required: "Mae angen i chi ddewis ynghylch beth y mae'r achos.",
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    legalProceedings: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.question,
      hint: l => l.hint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            legalProceedingsRelated: {
              type: 'checkboxes',
              label: l => l.subField,
              hint: l => l.subFieldHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'legalProceedingsRelated',
                  label: l => l.partnership,
                  value: LegalProceedingsRelated.MARRIAGE,
                },
                {
                  name: 'legalProceedingsRelated',
                  label: l => l.property,
                  value: LegalProceedingsRelated.PROPERTY,
                },
                {
                  name: 'legalProceedingsRelated',
                  label: l => l.children,
                  value: LegalProceedingsRelated.CHILDREN,
                },
              ],
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO },
      ],
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
