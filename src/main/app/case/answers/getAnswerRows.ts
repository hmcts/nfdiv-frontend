import { stepsWithContent } from '../../../steps';
import { generatePageContent } from '../../../steps/common/common.content';
import { Sections } from '../../../steps/sequence';
import { PageLink } from '../../../steps/urls';
import type { FormOptions } from '../../form/Form';
import { Case } from '../case';

import type { GovUkNunjucksSummary } from './govUkNunjucksSummary';
import { omitUnreachableAnswers } from './possibleAnswers';

export const getAnswerRows = function (section: Sections): GovUkNunjucksSummary[] {
  const {
    language,
    isDivorce,
    formState,
    userEmail,
  }: {
    language: 'en' | 'cy';
    isDivorce: boolean;
    partner: string;
    userEmail: string;
    formState: Partial<Case>;
  } = this.ctx;

  const processedFormState = omitUnreachableAnswers(formState, stepsWithContent);

  return stepsWithContent
    .filter(step => step.showInSection === section)
    .flatMap(step => {
      const fields = typeof step.form.fields === 'function' ? step.form.fields(processedFormState) : step.form.fields;
      const fieldKeys = Object.keys(fields);
      let stepContent;
      try {
        stepContent = {
          ...this.ctx,
          ...generatePageContent({
            language,
            pageContent: step.generateContent,
            isDivorce,
            formState: processedFormState,
            userEmail,
          }),
        };
      } catch {
        // Some steps may throw an error if the user is not allowed to view them yet
        return [];
      }

      const questionAnswers: GovUkNunjucksSummary[] = [];
      const addQuestionAnswer = (question: string, answer: string, link?: PageLink) =>
        questionAnswers.push({
          key: {
            text: question,
            classes: 'govuk-!-width-two-thirds',
          },
          value: {
            html: answer,
          },
          actions: {
            items: [
              {
                href: link || step.url,
                text: this.ctx.change,
                visuallyHiddenText: question,
              },
            ],
          },
        });

      for (const fieldKey of fieldKeys) {
        const field = fields[fieldKey] as FormOptions;
        let answer = getAnswer(processedFormState, field, fieldKey);
        if (!field.label || !answer) {
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

        const customQuestion = this.ctx.stepQuestions[step.url]?.[fieldKey];
        const customAnswerFn = this.ctx.stepAnswers[step.url]?.[fieldKey];
        const customAnswer =
          customAnswerFn && typeof customAnswerFn === 'function' ? customAnswerFn(stepContent) : customAnswerFn;
        if (customAnswer === false) {
          continue;
        }

        addQuestionAnswer(
          customQuestion || (question as string),
          this.env.filters.nl2br(this.env.filters.escape(customAnswer ?? answer)),
          this.ctx.stepLinks[step.url]
        );
      }

      return questionAnswers;
    });
};

const getAnswer = (formState, field, fieldKey) =>
  field.type === 'checkboxes'
    ? field.values.reduce((previous, current) => [...previous, [current.name, formState?.[current.name]]], [])
    : formState?.[fieldKey];

const getCheckedLabels = (answer, field, stepContent) =>
  answer
    .filter(([, value]) => value?.length)
    .map(([key]) => {
      const checkbox = field.values.find(checkboxField => checkboxField.name === key);
      if (typeof checkbox?.label === 'function') {
        return checkbox.label(stepContent);
      }
      return checkbox?.label;
    });

const getSelectedRadioLabel = (answer, field, stepContent) => {
  const selectedRadio = field.values.find(radio => radio.value === answer);
  return typeof selectedRadio?.label === 'function' ? selectedRadio.label(stepContent) : selectedRadio?.label;
};
