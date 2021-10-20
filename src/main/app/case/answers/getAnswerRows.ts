import { stepsWithContentApplicant1, stepsWithContentApplicant2, stepsWithContentRespondent } from '../../../steps';
import { Sections } from '../../../steps/applicant1Sequence';
import { generatePageContent } from '../../../steps/common/common.content';
import { APPLICANT_2, APPLY_FINANCIAL_ORDER, PageLink, YOUR_NAME } from '../../../steps/urls';
import type { FormOptions } from '../../form/Form';
import { Case, Checkbox } from '../case';
import { FinancialOrderFor } from '../definition';

import type { GovUkNunjucksSummary } from './govUkNunjucksSummary';
import { omitUnreachableAnswers } from './possibleAnswers';

export const getAnswerRows = function (
  section: Sections,
  isCompleteCase = false,
  showActions = true,
  overrideStepsContent?: number
): GovUkNunjucksSummary[] {
  const {
    language,
    isDivorce,
    isApplicant2,
    formState,
    userEmail,
    isJointApplication,
  }: {
    language: 'en' | 'cy';
    isDivorce: boolean;
    isApplicant2: boolean;
    formState: Partial<Case>;
    userEmail: string;
    isJointApplication: boolean;
  } = this.ctx;

  const { stepsWithContent, processedFormState } = setUpSteps(
    formState,
    isCompleteCase,
    isApplicant2,
    isJointApplication,
    overrideStepsContent
  );

  let sameSexHasBeenAnswered = false;

  return stepsWithContent
    .filter(step => (isCompleteCase ? step.showInCompleteSection === section : step.showInSection === section))
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
            isApplicant2,
            formState: processedFormState,
            userEmail,
          }),
        };
      } catch {
        // Some steps may throw an error if the user is not allowed to view them yet
        return [];
      }

      const questionAnswers: GovUkNunjucksSummary[] = [];
      const addQuestionAnswer = (question: string, answer: string, link?: PageLink, html?: string) =>
        questionAnswers.push({
          key: {
            html: question,
            classes: 'govuk-!-width-two-thirds',
          },
          value: {
            html: answer + (html || ''),
          },
          ...(!showActions
            ? {}
            : {
                actions: {
                  items: [
                    {
                      href: link || step.url,
                      text: this.ctx.change,
                      visuallyHiddenText: question,
                    },
                  ],
                },
              }),
        });

      if (
        isCompleteCase &&
        section === Sections.AboutPartnership &&
        processedFormState.sameSex === Checkbox.Checked &&
        sameSexHasBeenAnswered === false
      ) {
        sameSexHasBeenAnswered = true;
        addQuestionAnswer('Same-sex couples', 'We were a same-sex couple when we got married');
      }

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
        const customAnswerWithHtml = this.ctx.stepAnswersWithHTML?.[step.url]?.[fieldKey];
        const stepLinks = isCompleteCase ? undefined : this.ctx.stepLinks[step.url];

        addQuestionAnswer(
          customQuestion || (question as string),
          this.env.filters.nl2br(this.env.filters.escape(customAnswer ?? answer)),
          stepLinks,
          customAnswerWithHtml
        );
      }

      if (isCompleteCase) {
        const [question, answer] = getCompleteQuestionAnswers(step.url, processedFormState);
        if (question && answer) {
          addQuestionAnswer(question, answer);
        }
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
      return typeof checkbox?.label === 'function' ? checkbox.label(stepContent) : checkbox?.label;
    });

const getSelectedRadioLabel = (answer, field, stepContent) => {
  const selectedRadio = field.values.find(radio => radio.value === answer);
  return typeof selectedRadio?.label === 'function' ? selectedRadio.label(stepContent) : selectedRadio?.label;
};

const setUpSteps = (
  formState: Partial<Case>,
  isCompleteCase: boolean,
  isApplicant2: boolean,
  isJointApplication: boolean,
  overrideStepsContent?: number
) => {
  if ((!isCompleteCase && !isApplicant2 && overrideStepsContent !== 2) || overrideStepsContent === 1) {
    const stepsWithContent = stepsWithContentApplicant1;
    const processedFormState = omitUnreachableAnswers(formState, stepsWithContentApplicant1);

    return { stepsWithContent, processedFormState };
  } else {
    const stepsWithContent = isCompleteCase
      ? [...stepsWithContentApplicant1, ...stepsWithContentApplicant2]
      : getApplicant2Steps(isJointApplication);

    const applicant2ProcessedFormState = omitUnreachableAnswers(formState, getApplicant2Steps(isJointApplication));
    const applicant1ProcessedFormState = omitUnreachableAnswers(formState, stepsWithContentApplicant1);
    const processedFormState = isCompleteCase
      ? { ...applicant2ProcessedFormState, ...applicant1ProcessedFormState }
      : applicant2ProcessedFormState;

    return { stepsWithContent, processedFormState };
  }
};

const getApplicant2Steps = (isJointApplication: boolean) => {
  return isJointApplication ? stepsWithContentApplicant2 : stepsWithContentRespondent;
};

const getCompleteQuestionAnswers = (stepUrl: string, processedFormState: Partial<Case>): [string, string] => {
  let question;
  let answer;

  switch (stepUrl) {
    case YOUR_NAME: {
      question = 'Full name on the marriage certificate';
      answer = processedFormState.applicant1FullNameOnCertificate;
      break;
    }
    case APPLICANT_2 + YOUR_NAME: {
      question = 'Full name on the marriage certificate';
      answer = processedFormState.applicant2FullNameOnCertificate;
      break;
    }
    case APPLY_FINANCIAL_ORDER: {
      if (processedFormState.whoIsFinancialOrderFor?.length) {
        question = 'Who is the financial order for? 	';
        answer = processedFormState.whoIsFinancialOrderFor
          ?.join(' / ')
          .replace(FinancialOrderFor.APPLICANT, 'Me')
          .replace(FinancialOrderFor.CHILDREN, 'The children');
      }
      break;
    }
    case APPLICANT_2 + APPLY_FINANCIAL_ORDER: {
      if (processedFormState.applicant2WhoIsFinancialOrderFor?.length) {
        question = 'Who is the financial order for? 	';
        answer = processedFormState.applicant2WhoIsFinancialOrderFor
          ?.join(' / ')
          .replace(FinancialOrderFor.APPLICANT, 'Me')
          .replace(FinancialOrderFor.CHILDREN, 'The children');
      }
      break;
    }
  }

  return [question, answer];
};
