import { StepWithContent } from '../../../steps';
import { Sections } from '../../../steps/applicant1/applicant1Sequence';
import * as commonContent from '../../../steps/common/common.content';
import { Checkbox } from '../case';

import { getAnswerRows } from './getAnswerRows';

const mockStepsWithContent: jest.Mock<StepWithContent> = jest.fn();

jest.mock('../../../steps', () => ({
  get stepsWithContent() {
    return mockStepsWithContent();
  },
}));

const generatePageContentSpy = jest.spyOn(commonContent, 'generatePageContent');

describe('getAnswerRows()', () => {
  let mockGenerateContent;
  let mockNunjucksEnv;
  beforeEach(() => {
    mockGenerateContent = jest.fn().mockReturnValue({ en: {} });
    mockNunjucksEnv = {
      env: {
        filters: {
          nl2br: jest.fn(value => (value === '' ? '' : `newlineToBr(${value})`)),
          escape: jest.fn(value => (value === '' ? '' : `escaped(${value})`)),
        },
      },
    };
  });

  it('converts steps into the correct check answers rows when there no answers', () => {
    mockStepsWithContent.mockReturnValue([
      {
        stepDir: '/',
        url: 'dont-pickThisOne',
        showInSection: Sections.AboutPartners,
        getNextStep: () => '/pickThisOne',
        form: { fields: {}, submit: { text: '' } },
        generateContent: () => ({}),
        view: '/template',
      },
      {
        stepDir: '/',
        url: 'pickThisOne',
        showInSection: Sections.AboutPartnership,
        getNextStep: () => '/',
        generateContent: mockGenerateContent,
        form: { fields: {}, submit: { text: '' } },
        view: '/template',
      },
    ]);

    const actual = getAnswerRows.bind({
      ...mockNunjucksEnv,
      ctx: {
        language: 'en',
        isDivorce: true,
        applicant2: 'husband',
        formState: {},
        userEmail: 'test@example.com',
      },
    })(Sections.AboutPartnership);

    expect(generatePageContentSpy).toHaveBeenCalledWith({
      formState: {},
      isDivorce: true,
      language: 'en',
      pageContent: mockGenerateContent,
      userEmail: 'test@example.com',
    });
    expect(actual).toEqual([]);
  });

  describe('when we have response', () => {
    let mockCtx;
    let mockFormState;
    beforeEach(() => {
      mockStepsWithContent.mockReturnValue([
        {
          stepDir: '/',
          url: 'dont-pickThisOne',
          showInSection: Sections.AboutPartners,
          getNextStep: () => '/pickThisOne',
          generateContent: () => ({}),
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
        {
          stepDir: '/',
          url: 'pickThisOne',
          showInSection: Sections.AboutPartnership,
          getNextStep: () => '/',
          generateContent: mockGenerateContent,
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
      ]);

      mockGenerateContent.mockReturnValue({ title: 'Mock question title' });

      mockFormState = { mockField: 'example response' };
      mockCtx = {
        language: 'en',
        isDivorce: true,
        partner: 'husband',
        formState: mockFormState,
        change: 'Change',
        stepQuestions: {},
        stepAnswers: {},
        stepLinks: {},
      };
    });

    it('converts steps into the correct check answers rows', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: mockCtx,
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne',
                text: 'Change',
                visuallyHiddenText: 'Mock question title',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            text: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(example response))',
          },
        },
      ]);
    });

    it('ignores steps that throw exception', () => {
      mockStepsWithContent.mockReturnValue([
        {
          stepDir: '/',
          url: 'dont-pickThisOne',
          showInSection: Sections.AboutPartnership,
          getNextStep: () => '/pickThisOne',
          generateContent: () => {
            throw new Error('You cannot see this page');
          },
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
        {
          stepDir: '/',
          url: 'pickThisOne',
          showInSection: Sections.AboutPartnership,
          getNextStep: () => '/',
          generateContent: mockGenerateContent,
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
      ]);

      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: mockCtx,
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne',
                text: 'Change',
                visuallyHiddenText: 'Mock question title',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            text: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(example response))',
          },
        },
      ]);
    });

    it('converts steps into the correct check answers rows with overridden values', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          stepQuestions: { pickThisOne: { mockField: 'Custom question text' } },
          stepAnswers: { pickThisOne: { mockField: () => 'Custom answer text. Original answer: example response' } },
          stepLinks: { pickThisOne: '/custom-link' },
        },
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: '/custom-link',
                text: 'Change',
                visuallyHiddenText: 'Custom question text',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            text: 'Custom question text',
          },
          value: {
            html: 'newlineToBr(escaped(Custom answer text. Original answer: example response))',
          },
        },
      ]);
    });

    it('removes steps if check your answer page considerers it incomplete', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          stepAnswers: { pickThisOne: { mockField: false } },
        },
      })(Sections.AboutPartnership);

      expect(actual).toEqual([]);
    });

    it('keeps a steps if check your answer page returns an empty string', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          stepAnswers: { pickThisOne: { mockField: '' } },
        },
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: { items: [{ href: 'pickThisOne', text: 'Change', visuallyHiddenText: 'Mock question title' }] },
          key: { classes: 'govuk-!-width-two-thirds', text: 'Mock question title' },
          value: { html: '' },
        },
      ]);
    });

    it('converts steps into the correct check answers rows with checkboxes', () => {
      mockStepsWithContent.mockReturnValue([
        {
          stepDir: '/',
          url: 'pickThisOne',
          showInSection: Sections.AboutPartnership,
          getNextStep: () => '/',
          generateContent: mockGenerateContent,
          form: {
            fields: {
              someCheckboxes: {
                type: 'checkboxes',
                label: () => 'Mock Checkboxes',
                values: [
                  { name: 'mockField1', label: () => 'Mock checkbox title 1', value: Checkbox.Checked },
                  { name: 'mockField2', label: () => 'Another checkbox title 2', value: Checkbox.Checked },
                ],
              },
            },
            submit: { text: '' },
          },
          view: '/template',
        },
      ]);

      mockFormState = { mockField1: Checkbox.Checked, mockField2: Checkbox.Checked };
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          formState: mockFormState,
        },
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne',
                text: 'Change',
                visuallyHiddenText: 'Mock Checkboxes',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            text: 'Mock Checkboxes',
          },
          value: {
            html: 'newlineToBr(escaped(Mock checkbox title 1\nAnother checkbox title 2))',
          },
        },
      ]);
    });
  });
});
