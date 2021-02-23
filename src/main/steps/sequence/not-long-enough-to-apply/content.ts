import { TranslationFn } from '../../../app/controller/GetController';

export const generateContent: TranslationFn = ({ isDivorce }) => {
  const en = {
    title: `You have not been ${isDivorce ? 'married' : 'in a civil partnership'} long enough to apply ${
      isDivorce ? 'for a divorce' : 'to end it'
    }`,
    line1: `You can only apply ${isDivorce ? 'for divorce' : 'to end it'} after you have been ${
      isDivorce ? 'married' : 'in a civil partnership'
    } for at least one year, in England or Wales.`,
    line2: `You can wait until it has been a year since you ${
      isDivorce ? 'got married' : 'formed your civil partnership'
    } and then apply. Or if you cannot wait, then you can <a href="https://www.gov.uk/legal-separation" class="govuk-link">apply for a legal separation</a>.`,
    line3: `If you believe your ${
      isDivorce ? 'marriage' : 'civil partnership'
    } was never legally valid or is ‘voidable’, then you may be able to <a href="https://www.gov.uk/how-to-annul-marriage" class="govuk-link">annul your ${
      isDivorce ? 'marriage' : 'civil partnership'
    }</a>.`,
  };

  const cy: typeof en = {
    title: `Nid ydych wedi bod ${isDivorce ? 'yn briod' : 'mewn partneriaeth sifil'} ers digon o amser i wneud cais ${
      isDivorce ? 'am ysgariad' : "i'w therfynu"
    }`,
    line1: `Dim ond ar ôl i chi ${
      isDivorce ? 'fod yn briod' : 'fod mewn partneriaeth sifil'
    } am o leiaf blwyddyn, y gallwch wneud cais ${isDivorce ? 'am ysgariad' : " i'w therfynu"} yng Nghymru neu Loegr.`,
    line2: `Gallwch aros nes ei bod yn flwyddyn ers i chi ${
      isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
    } ac yna gwneud cais. Neu os na allwch aros, <a href="https://www.gov.uk/legal-separation" class="govuk-link">gallwch wneud cais am ymwahaniad cyfreithiol</a>.`,
    line3: `Os ydych chi'n credu nad oedd eich ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    } erioed yn ddilys yn gyfreithiol neu ei bod yn 'ddirymadwy', yna efallai y gallwch <a href="https://www.gov.uk/how-to-annul-marriage" class="govuk-link">ddirymu eich ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    }</a>.`,
  };

  const common = {};

  return { en, cy, common };
};
