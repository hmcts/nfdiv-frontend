import { LegalProceedingsRelated, YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
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
    legalProceedingsByCase: 'Cases of ongoing legal proceedings',
    caseNumber: 'Case number',
    caseRelatesTo: 'What do the legal proceedings relate to?',
    caseDetail: 'Case details',
    partnership: `Our ${partnership}`,
    property: 'Our property',
    children: 'Our children',
    errors: {
      legalProceedings: {
        required,
      },
      caseRelatesTo: {
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
    legalProceedingsByCase: 'Achosion achos cyfreithiol parhaus',
    caseNumber: 'Rhif achos',
    caseRelatesTo: "Ynghylch beth y mae'r achos cyfreithiol?",
    caseDetail: 'Manylion achos',
    partnership: `Ein ${partnership}`,
    property: 'Ein heiddo',
    children: 'Ein plant',
    errors: {
      legalProceedings: {
        required,
      },
      caseRelatesTo: {
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
            legalProceedingsByCase: {
              label: l => l.legalProceedingsByCase,
              subFields: {
                caseNumber: { type: 'text', label: l => l.caseNumber },
                caseRelatesTo: {
                  type: 'option',
                  label: l => l.caseRelatesTo,
                  values: [
                    {
                      name: 'caseRelatesTo',
                      label: l => l.partnership,
                      value: LegalProceedingsRelated.MARRIAGE,
                    },
                    {
                      name: 'caseRelatesTo',
                      label: l => l.property,
                      value: LegalProceedingsRelated.PROPERTY,
                    },
                    {
                      name: 'caseRelatesTo',
                      label: l => l.children,
                      value: LegalProceedingsRelated.CHILDREN,
                    },
                  ],
                  validator: value => isFieldFilledIn(value),
                },
                caseDetail: { type: 'textarea', label: l => l.caseDetail },
              },
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
