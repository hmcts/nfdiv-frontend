import { Case } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { Sections, Step } from '../../steps/sequence';
import { YOUR_DETAILS_URL } from '../../steps/urls';

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
      const answer = formState?.[Object.keys(step.form.fields)[0]?.toString()];
      if (!answer) {
        return [];
      }

      const stepContent = step.generateContent({ isDivorce, partner, formState })[language];

      const additionalQuestions: GovUkNunjucksSummary[] = [];
      if (step.url === YOUR_DETAILS_URL && formState.sameSex) {
        const question = this.ctx.stepQuestions[`${YOUR_DETAILS_URL}-sameSex`];
        additionalQuestions.push({
          key: {
            text: question,
            classes: 'govuk-!-width-two-thirds',
          },
          value: {
            text: stepContent.sameSexOption as string,
          },
          actions: {
            items: [
              {
                href: step.url,
                text: this.ctx.change,
                visuallyHiddenText: question,
              },
            ],
          },
        });
      }

      const question = this.ctx.stepQuestions?.[step.url] || stepContent?.title;
      const visuallyHiddenText = this.ctx.a11yChange?.[step.url] || question;
      return [
        {
          key: {
            text: question,
            classes: 'govuk-!-width-two-thirds',
          },
          value: {
            text: this.ctx.stepAnswers?.[step.url] || this.ctx[answer?.toLowerCase()] || answer,
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
        },
        ...additionalQuestions,
      ];
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
