import { Case } from '../../app/case/case';
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
      const stepContent = step.generateContent({ isDivorce, partner, formState })[language];
      const questionAnswers: GovUkNunjucksSummary[] = [];

      for (const fieldKey of fieldKeys) {
        const answer = formState?.[fieldKey];
        if (!answer) {
          continue;
        }

        const customQuestion = this.ctx.stepQuestions?.[step.url];
        const questionText =
          typeof customQuestion === 'object' ? customQuestion?.[fieldKey] : customQuestion || stepContent?.title;
        const visuallyHiddenText = this.ctx.a11yChange?.[step.url] || questionText;

        const customAnswer = this.ctx.stepAnswers?.[step.url];
        const customAnswerText = typeof customAnswer === 'object' ? customAnswer?.[fieldKey] : customAnswer;

        let checkedInputLabels: undefined | string[];
        const field = step.form.fields[fieldKey] as FormOptions;
        if (field.type === 'checkboxes') {
          checkedInputLabels = field.values
            .filter(field => field.value === answer[field.name])
            .map(field => {
              if (typeof field?.label === 'function') {
                return field.label(stepContent as Record<string, never>) as string;
              }
              return field?.label;
            });

          if (!checkedInputLabels.length) {
            continue;
          }
        }

        questionAnswers.push({
          key: {
            text: questionText,
            classes: 'govuk-!-width-two-thirds',
          },
          value: {
            text: customAnswerText || checkedInputLabels || this.ctx[answer?.toLowerCase()] || answer,
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
    text: string;
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
