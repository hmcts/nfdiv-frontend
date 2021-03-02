import { Sections } from '../../../steps/sequence';
import { Checkbox } from '../case';

import { getAnswerRows } from './getAnswerRows';

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
    const actual = getAnswerRows.bind({
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
      mockGenerateContent.mockReturnValue({ en: { title: 'Mock question title' } });

      mockCtx = {
        language: 'en',
        isDivorce: true,
        partner: 'husband',
        formState: { mockField: 'example response' },
        change: 'Change',
        steps: [
          {
            url: 'dont-pickThisOne',
            showInSection: Sections.Payment,
          },
          {
            url: 'pickThisOne',
            showInSection: Sections.AboutPartnership,
            generateContent: mockGenerateContent,
            form: { fields: { mockField: { type: 'text' } } },
          },
        ],
      };
    });

    it('converts steps into the correct check answers rows', () => {
      const actual = getAnswerRows.bind({
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
          stepAnswers: { pickThisOne: data => `Custom answer text. Original answer: ${data.mockField}` },
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
          stepAnswers: { pickThisOne: () => false },
        },
      })(Sections.AboutPartnership);

      expect(actual).toEqual([]);
    });

    it('keeps a steps if check your answer page returns an empty string', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          stepAnswers: { pickThisOne: () => '' },
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
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          formState: { mockField1: Checkbox.Checked, mockField2: Checkbox.Checked },
          steps: [
            {
              url: 'pickThisOne',
              showInSection: Sections.AboutPartnership,
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
