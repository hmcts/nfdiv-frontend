export const getContent = (title: string): Record<string, unknown> => {
  const en = {
    divorce: {
      title,
      line1:
        'Your marriage must have irretrievably broken down for you to get a divorce. This is the law in England and Wales.',
      line2:
        'If you are not sure about getting a divorce, you may want to consider relationship advice or counselling. This is available from private therapists and charities like <a href="https://www.relate.org.uk" class="govuk-link">Relate</a>.',
    },
    civil: {
      title: 'You cannot apply to end your civil partnership',
      line1:
        'Your relationship must have irretrievably broken down for you to end your civil partnership. This is the law in England and Wales.',
      line2:
        'If you are not sure about ending your civil partnership, you may want to consider relationship advice or counselling. This is available from private therapists and charities like <a href="https://www.relate.org.uk" class="govuk-link">Relate</a>.',
    },
  };

  // @TODO translations
  const cy: typeof en = {
    ...en,
  };

  const common = {};

  return { en, cy, common };
};
