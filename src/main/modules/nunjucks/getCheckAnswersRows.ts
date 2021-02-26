import { Case, Checkbox } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import type { FormContent, FormOptions } from '../../app/form/Form';
import { Sections, Step } from '../../steps/sequence';

export const getCheckAnswersRows = function (section: Sections): GovUkNunjucksSummary[] {
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
        let answer =
          field.type === 'checkboxes'
            ? field.values.reduce(
                (previous, current) => [...previous, [current.name, formState?.[current.name as string]]],
                [] as string[][]
              )
            : formState?.[fieldKey];

        if (!answer) {
          continue;
        }

        if (field.type === 'checkboxes') {
          const checkedInputLabels = answer
            .filter(([, value]) => value === Checkbox.Checked)
            .map(([key]) => {
              const checkbox = field.values.find(field => field.name === key);
              if (typeof checkbox?.label === 'function') {
                return checkbox.label(stepContent as Record<string, never>) as string;
              }
              return checkbox?.label;
            });

          if (!checkedInputLabels?.length) {
            continue;
          }

          answer = checkedInputLabels.join('\n');
          formState[fieldKey] = answer;
        }

        const customQuestion = this.ctx.stepQuestions?.[step.url];
        const questionText =
          typeof customQuestion === 'object' ? customQuestion?.[fieldKey] : customQuestion || stepContent?.title;
        const visuallyHiddenText = this.ctx.a11yChange?.[step.url] || questionText;

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
              this.env.filters.escape(customAnswerText || this.ctx[answer?.toLowerCase()] || answer)
            ),
          },
          actions: {
            items: [
              {
                href: step.url,
                text: this.ctx.change,
                visuallyHiddenText,
              },
            ],
          },
        });
      }

      return questionAnswers;
    });
};

interface GovUkNunjucksSummary {
  key: {
    text: string;
    classes: string;
  };
  value: {
    html: string;
  };
  actions: {
    items: [
      {
        href: string;
        text: string;
        visuallyHiddenText: string;
      }
    ];
  };
}
