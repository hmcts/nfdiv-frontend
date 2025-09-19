import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import type { CommonContent } from '../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Where your lives are based',
  line1: `The court needs to know whether you and your ${partner}’s lives are based in England or Wales. This may include working, owning property, having children in school, or your main family life taking place in England or Wales.`,
  applicant1LifeBasedInEnglandAndWales: 'Is your life mainly based in England or Wales?',
  applicant2LifeBasedInEnglandAndWales: `Is your ${partner}’s life mainly based in England or Wales?`,
  errors: {
    applicant1LifeBasedInEnglandAndWales: 'Select "Yes" if your life is mainly based in England or Wales',
    applicant2LifeBasedInEnglandAndWales: `Select "Yes" if your ${partner}’s life is mainly based in England or Wales`,
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: 'Lle mae eich bywydau wedi`u lleoli',
  line1: `Mae'r llys angen gwybod p'un a yw eich bywyd chi a bywyd eich ${partner} yng Nghymru neu Loegr. Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, neu bod eich prif fywyd teuluol yng Nghymru neu Loegr.`,
  applicant1LifeBasedInEnglandAndWales: 'A yw eich bywyd gan amlaf yng Nghymru neu Loegr?',
  applicant2LifeBasedInEnglandAndWales: `A yw bywyd eich ${partner} gan amlaf yng Nghymru neu Loegr?`,
  yes: 'Ydy',
  no: 'Nac ydy',
  errors: {
    applicant1LifeBasedInEnglandAndWales:
      'Dewiswch “Ydy” os ydych yn treulio’r rhan fwyaf o’ch amser yng Nghymru neu Loegr',
    applicant2LifeBasedInEnglandAndWales: `Dewiswch “Ydy” os yw eich ${partner} yn treulio rhan fwyaf o’u hamser yng Nghymru neu Loegr`,
  },
});

export const form: FormContent = {
  fields: {
    applicant1LifeBasedInEnglandAndWales: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.applicant1LifeBasedInEnglandAndWales,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
    applicant2LifeBasedInEnglandAndWales: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.applicant2LifeBasedInEnglandAndWales,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = (content: CommonContent) => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
