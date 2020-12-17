
const en = {
  question: 'Has your marriage broken down irretrievably (it can’t be saved)?',
  line1: 'You can only get a divorce on the ground that your marriage has broken down irretrievably.',
  yes: 'Yes',
  no: 'No',
  marriageBrokenDownNo: 'The only legal ground for divorce in England and Wales is that your marriage has broken down irretrievably.'
};

const cy: typeof en = {
  question: 'A ydy’ch priodas wedi chwalu’n anadferadwy (ni ellir ei hachub)? ',
  line1: 'Ni allwch gael ysgariad ond ar y sail bod y briodas wedi chwalu’n anadferadwy.',
  yes: 'Do',
  no: 'Naddo',
  marriageBrokenDownNo: 'Yr unig reswm cyfreithiol dros gael ysgariad yng Nghymru a Lloegr yw bod y briodas wedi chwalu’n anadferadwy.',
};

export const hasMarriageBrokenForm = {
  fields: {
    screenHasMarriageBroken: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      values: [
        { label: l => l.yes, value: 'Yes' },
        { label: l => l.no, value: 'No' }
      ]
    }
  },
  submit: {
    text: l => l.continue
  }
};

const common = {
  form: hasMarriageBrokenForm
};

export const hasMarriageBrokenContent = { en, cy, common };
