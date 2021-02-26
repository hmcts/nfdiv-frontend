import { Checkbox } from '../../app/case/case';
import { Sections } from '../../steps/sequence';

import { getCheckAnswersRows } from './getCheckAnswersRows';

describe('getCheckAnswersRows()', () => {
  let mockGenerateContent;
  let mockNunjucksEnv;
  beforeEach(() => {
    mockGenerateContent = jest.fn().mockReturnValue({ en: {} });
    mockNunjucksEnv = {
      env: {
        filters: {
          nl2br: jest.fn(value => value),
          escape: jest.fn(value => value),
        },
      },
    };
  });

  it('converts steps into the correct check answers rows when there no answers', () => {
    const actual = getCheckAnswersRows.bind({
      ...mockNunjucksEnv,
      ctx: {
        language: 'en',
        isDivorce: true,
        partner: 'husband',
        formState: {},
        steps: [
          {
            url: 'dont-pickThisOne',
            showInSection: Sections.Payment,
          },
          {
            url: 'pickThisOne',
            showInSection: Sections.AboutPartnership,
            generateContent: mockGenerateContent,
            form: { fields: { foo: {} } },
          },
        ],
      },
    })(Sections.AboutPartnership);

    expect(actual).toEqual([]);
  });

  describe('when we have response', () => {
    let mockCtx;
    beforeEach(() => {
      mockCtx = {
        language: 'en',
        isDivorce: true,
        partner: 'husband',
        formState: { falafel: 'tasty' },
        change: 'Change me',
        steps: [
          {
            url: 'dont-pickThisOne',
            showInSection: Sections.Payment,
          },
          {
            url: 'pickThisOne',
            showInSection: Sections.AboutPartnership,
            generateContent: mockGenerateContent,
            form: { fields: { falafel: { type: 'text' } } },
          },
        ],
      };
    });

    it('converts steps into the correct check answers rows', () => {
      mockGenerateContent.mockReturnValue({ en: { title: 'mock question' } });

      const actual = getCheckAnswersRows.bind({
        ...mockNunjucksEnv,
        ctx: mockCtx,
      })(Sections.AboutPartnership);

      expect(mockGenerateContent).toHaveBeenCalledWith({
        isDivorce: true,
        partner: 'husband',
      });
      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne',
                text: 'Change me',
                visuallyHiddenText: 'mock question',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            text: 'mock question',
          },
          value: {
            html: 'tasty',
          },
        },
      ]);
    });

    it('converts steps into the correct check answers rows with overridden values', () => {
      const actual = getCheckAnswersRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          stepQuestions: { pickThisOne: 'Custom question title' },
          a11yChange: { pickThisOne: 'Custom a11y text' },
          stepAnswers: { pickThisOne: data => `Custom answer text. Original answer: ${data.falafel}` },
        },
      })(Sections.AboutPartnership);

      expect(mockGenerateContent).toHaveBeenCalledWith({
        isDivorce: true,
        partner: 'husband',
      });
      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne',
                text: 'Change me',
                visuallyHiddenText: 'Custom a11y text',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            text: 'Custom question title',
          },
          value: {
            html: 'Custom answer text. Original answer: tasty',
          },
        },
      ]);
    });

    it('converts steps into the correct check answers rows with checkboxes', () => {
      mockGenerateContent.mockReturnValue({ en: { title: 'mock question' } });

      const actual = getCheckAnswersRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          formState: { falafel: Checkbox.Checked },
          steps: [
            {
              url: 'pickThisOne',
              showInSection: Sections.AboutPartnership,
              generateContent: mockGenerateContent,
              form: {
                fields: {
                  someCheckboxes: {
                    type: 'checkboxes',
                    values: [{ name: 'falafel', label: () => 'You ticked tasty falafel', value: Checkbox.Checked }],
                  },
                },
              },
            },
          ],
        },
      })(Sections.AboutPartnership);

      expect(mockGenerateContent).toHaveBeenCalledWith({
        isDivorce: true,
        partner: 'husband',
      });
      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne',
                text: 'Change me',
                visuallyHiddenText: 'mock question',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            text: 'mock question',
          },
          value: {
            html: 'You ticked tasty falafel',
          },
        },
      ]);
    });
  });
});
