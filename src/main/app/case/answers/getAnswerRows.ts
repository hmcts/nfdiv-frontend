import { generatePageContent } from '../../../steps/common/common.content';
import { Sections, Step } from '../../../steps/sequence';
import { TranslationFn } from '../../controller/GetController';
import type { FormContent, FormOptions } from '../../form/Form';
import { Case, Checkbox } from '../case';

import type { GovUkNunjucksSummary } from './govUkNunjucksSummary';
import { omitUnreachableAnswers } from './possibleAnswers';

export const getAnswerRows = function (section: Sections): GovUkNunjucksSummary[] {
  const {
    language,
    isDivorce,
    formState,
    steps,
  }: {
    language: 'en' | 'cy';
    isDivorce: boolean;
    partner: string;
    formState: Partial<Case>;
    steps: ({ generateContent: TranslationFn; form: FormContent } & Step)[];
  } = this.ctx;

  const processedFormState = omitUnreachableAnswers(formState, steps);

  return steps
    .filter(step => step.showInSection === section)
    .flatMap(step => {
      const fieldKeys = Object.keys(step.form.fields);
      const stepContent = {
        ...this.ctx,
        ...generatePageContent(language, step.generateContent, isDivorce, processedFormState),
      };
      const questionAnswers: GovUkNunjucksSummary[] = [];

      for (const fieldKey of fieldKeys) {
        const field = step.form.fields[fieldKey] as FormOptions;
        let answer = getAnswer(processedFormState, field, fieldKey);
        if (!answer) {
          continue;
        }

        const question = typeof field.label === 'function' ? field.label(stepContent) : field.label;
        if (field.type === 'radios') {
          answer = getSelectedRadioLabel(answer, field, stepContent);
        }
        if (field.type === 'checkboxes') {
          const checkedLabels = getCheckedLabels(answer, field, stepContent);
          if (!checkedLabels?.length) {
            continue;
          }
          answer = checkedLabels.join('\n');
        }

        const customAnswer = this.ctx.stepAnswers[step.url]?.(processedFormState);
        if (customAnswer === false) {
          continue;
        }

        questionAnswers.push({
          key: {
            text: question as string,
            classes: 'govuk-!-width-two-thirds',
          },
          value: {
            html: this.env.filters.nl2br(this.env.filters.escape(customAnswer ?? answer)),
          },
          actions: {
            items: [
              {
                href: step.url,
                text: this.ctx.change,
                visuallyHiddenText: question as string,
              },
            ],
          },
        });
      }

      return questionAnswers;
    });
};

const getAnswer = (formState, field, fieldKey) =>
  field.type === 'checkboxes'
    ? field.values.reduce((previous, current) => [...previous, [current.name, formState?.[current.name]]], [])
    : formState?.[fieldKey];

const getCheckedLabels = (answer, field, stepContent) => {
  const checkedLabels = answer
    .filter(([, value]) => value === Checkbox.Checked)
    .map(([key]) => {
      const checkbox = field.values.find(field => field.name === key);
      if (typeof checkbox?.label === 'function') {
        return checkbox.label(stepContent);
      }
      return checkbox?.label;
    });

  return checkedLabels;
};

const getSelectedRadioLabel = (answer, field, stepContent) => {
  const selectedRadio = field.values.find(radio => radio.value === answer);
  return typeof selectedRadio?.label === 'function' ? selectedRadio.label(stepContent) : selectedRadio?.label;
};
