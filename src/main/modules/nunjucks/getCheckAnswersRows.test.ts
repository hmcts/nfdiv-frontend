import { Sections } from '../../steps/sequence';

import { getCheckAnswersRows } from './getCheckAnswersRows';

describe('getCheckAnswersRows()', () => {
  it('converts steps into the correct check answers rows when there no answers', () => {
    const mockGenerateContent = jest.fn();

    const actual = getCheckAnswersRows.bind({
      ctx: {
        language: 'en',
        isDivorce: true,
        partner: 'husband',
        formState: {},
        steps: [
          {
            url: 'dont-pick-this-one',
            showInSection: Sections.Payment,
          },
          {
            url: 'pick this one',
            showInSection: Sections.AboutPartnership,
            generateContent: mockGenerateContent,
            form: { fields: { foo: {} } },
          },
        ],
      },
    })(Sections.AboutPartnership);

    expect(mockGenerateContent).not.toHaveBeenCalled();
    expect(actual).toEqual([]);
  });

  describe('when we have response', () => {
    let mockGenerateContent;
    let mockCtx;
    beforeEach(() => {
      mockGenerateContent = jest.fn().mockReturnValue({ en: {} });

      mockCtx = {
        language: 'en',
        isDivorce: true,
        partner: 'husband',
        formState: { falafel: 'tasty' },
        change: 'Change me',
        steps: [
          {
            url: 'dont-pick-this-one',
            showInSection: Sections.Payment,
          },
          {
            url: 'pick-this-one',
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
        ctx: mockCtx,
      })(Sections.AboutPartnership);

      expect(mockGenerateContent).toHaveBeenCalledWith({
        formState: { falafel: 'tasty' },
        isDivorce: true,
        partner: 'husband',
      });
      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pick-this-one',
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
            text: 'tasty',
          },
        },
      ]);
    });

    it('converts steps into the correct check answers rows with overridden values', () => {
      const actual = getCheckAnswersRows.bind({
        ctx: {
          ...mockCtx,
          stepQuestions: { 'pick-this-one': 'Custom question title' },
          a11yChange: { 'pick-this-one': 'Custom a11y text' },
          stepAnswers: { 'pick-this-one': 'Custom answer text' },
        },
      })(Sections.AboutPartnership);

      expect(mockGenerateContent).toHaveBeenCalledWith({
        formState: { falafel: 'tasty' },
        isDivorce: true,
        partner: 'husband',
      });
      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pick-this-one',
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
            text: 'Custom answer text',
          },
        },
      ]);
    });
  });
});
