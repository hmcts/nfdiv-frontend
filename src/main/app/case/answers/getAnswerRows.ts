import { Sections, Step } from '../../../steps/sequence';
import { TranslationFn } from '../../controller/GetController';
import type { FormContent, FormOptions } from '../../form/Form';
import { Case, Checkbox } from '../case';

import type { GovUkNunjucksSummary } from './govUkNunjucksSummary';

export const getAnswerRows = function (section: Sections): GovUkNunjucksSummary[] {
  const {
    language,
    isDivorce,
    partner,
    formState,
    steps,
  }: {
    language: 'en' | 'cy';
    isDivorce: boolean;
    partner: string;
    formState: Partial<Case>;
    steps: ({ generateContent: TranslationFn; form: FormContent } & Step)[];
  } = this.ctx;

  return steps
    .filter(step => step.showInSection === section)
    .flatMap(step => {
      const fieldKeys = Object.keys(step.form.fields);
      const stepContent = step.generateContent({ isDivorce, partner })[language];
      const questionAnswers: GovUkNunjucksSummary[] = [];

      for (const fieldKey of fieldKeys) {
        const field = step.form.fields[fieldKey] as FormOptions;
        let answer = getAnswer(formState, field, fieldKey);
        if (!answer) {
          continue;
        }

        if (field.type === 'checkboxes') {
          const checkedLabels = getCheckedLabels(answer, field, stepContent);
          if (!checkedLabels?.length) {
            continue;
          }

          answer = checkedLabels.join('\n');
        }

        const questionText = (stepContent?.title as string) || '';

        const customAnswer = this.ctx.stepAnswers?.[step.url];
        const customAnswerText =
          typeof customAnswer === 'object' ? customAnswer?.[fieldKey]?.(formState) : customAnswer?.(formState);

        if (customAnswerText === false) {
          continue;
        }

        questionAnswers.push({
          key: {
            text: questionText,
            classes: 'govuk-!-width-two-thirds',
          },
          value: {
            html: this.env.filters.nl2br(
              this.env.filters.escape(customAnswerText ?? (this.ctx[answer.toLowerCase?.()] || answer))
            ),
          },
          actions: {
            items: [
              {
                href: step.url,
                text: this.ctx.change,
                visuallyHiddenText: questionText,
              },
            ],
          },
        });
      }

      return questionAnswers;
    });
};

const getAnswer = (formState: Partial<Case>, field: FormOptions, fieldKey: string) =>
  field.type === 'checkboxes'
    ? field.values.reduce(
        (previous, current) => [...previous, [current.name, formState?.[current.name as string]]],
        [] as string[][]
      )
    : formState?.[fieldKey];

const getCheckedLabels = (answer: string[][], field: FormOptions, stepContent: Record<string, unknown>) =>
  answer
    .filter(([, value]) => value === Checkbox.Checked)
    .map(([key]) => {
      const checkbox = field.values.find(field => field.name === key);
      if (typeof checkbox?.label === 'function') {
        return checkbox.label(stepContent as Record<string, never>) as string;
      }
      return checkbox?.label;
    });
