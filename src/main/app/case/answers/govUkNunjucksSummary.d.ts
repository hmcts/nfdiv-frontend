export interface GovUkNunjucksSummary {
  key: {
    text: string;
    classes: string;
  };
  value: {
    html: string;
  };
  actions?: {
    items: [
      {
        href: string;
        text: string;
        visuallyHiddenText: string;
      }
    ];
  };
}
