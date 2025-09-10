import config from 'config';

import { Case, CaseDate, Checkbox } from '../../../../../app/case/case';
import { NoResponseProcessServerOrBailiff, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'In person service by process server or court bailiff',
  line1: `You can have the papers served on your ${partner} in person, either by a process server or a county court bailiff.`,
  processServerService: {
    header: 'Service by a process server',
    details: {
      line1:
        'A process server is an independent third party who is professionally trained to deliver court documents by hand to the recipient.',
      line2:
        'Process servers may be more flexible as to where and when they can serve documents, and can deliver to addresses outside of England and Wales. Using a process server is usually much quicker than requesting for bailiff service.',
      line3:
        'If you need to send the documents to an international address, you may need to seek legal advice so you can tell the process server what types of service are legal in that country.',
      line4:
        'Process servers will charge you a fee to serve documents, normally between £50 - £200 depending on which process server you choose.',
      line5:
        'You will need to find a process server yourself. You will then need to download the papers from your account and give them to your process server. They will then serve the papers on your behalf',
    },
  },
  courtBailiffService: {
    header: 'Service by court bailiff',
    details: {
      line1: `A bailiff of the county court will serve the papers on your ${partner} by hand.`,
      line2:
        'Court bailiffs can only serve your papers to an address in England or Wales where postal delivery has already been tried.',
      line3: `There is a fee of ${getFee(
        config.get('fees.courtBailiffService')
      )} for bailiff service, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
        'govukUrls.getHelpWithCourtFees'
      )}">get help paying this fee (opens in a new tab)</a>.`,
      line4: 'Due to the high demand, service by court bailiff could take a long time.',
    },
  },
  howToProceedHeader: 'How would you like to proceed?',
  processServer: 'I want to arrange for service by a process server',
  bailiffService: 'I want to request bailiff service',
  respondentAddressInEnglandWales: `I confirm that my ${partner}'s address is in England or Wales`,
  errors: {
    applicant1NoResponseProcessServerOrBailiff: {
      required: 'Select either service by a process server or a court bailiff',
      confidentialRespondent: `You cannot request to serve by process server because your ${partner}’s details are confidential. Please select another option or go back to try something else.`,
    },
    applicant1NoResponseRespondentAddressInEnglandWales: {
      required: `You must confirm that your ${partner}'s address is in England or Wales before continuing`,
    },
  },
});

// @TODO translations should be completed then verified
const cy = ({ partner }: CommonContent) => ({
  title: 'Cyflwyno personol gan weinyddwr proses neu feili llys',
  line1: `Gallwch gael y papurau wedi’u cyflwyno ar eich ${partner} yn bersonol, naill ai drwy weinyddwr proses neu feili llys sirol.`,
  processServerService: {
    header: 'Cyflwyno gan weinyddwr proses',
    details: {
      line1:
        'Mae gweinyddwr proses yn drydydd parti annibynnol sydd wedi’i hyfforddi’n broffesiynol i ddanfon dogfennau’r llys â llaw i’r derbynnydd.',
      line2:
        'Mae gweinyddwyr proses yn fwy hyblyg o ran i ble a phryd y gallant gyflwyno dogfennau, a gallant gyflwyno dogfennau i gyfeiriadau y tu allan i Gymru a Lloegr. Gan amlaf, mae defnyddio gweinyddwr proses yn gyflymach na gwneud cais am gyflwyno gan feili.',
      line3:
        'Os ydych chi angen anfon y dogfennau i gyfeiriad rhyngwladol, efallai yr hoffech geisio cyngor cyfreithiol fel y gallwch ddweud wrth y gweinyddwr proses pa fath o gyflwyno sy’n gyfreithiol yn y wlad honno.',
      line4:
        'Bydd gweinyddwyr proses yn codi ffi arnoch i gyflwyno dogfennau, fel arfer rhwng £50 - £200 gan ddibynnu ar ba weinyddwr proses rydych yn dewis.',
      line5:
        'Bydd angen i chi ddod o hyd i weinyddwr proses eich hun. Yna bydd angen i chi lawrlwytho’r papurau o’ch cyfrif a’u rhoi i’ch gweinyddwr proses. Yna byddant yn cyflwyno’r papurau ar eich rhan',
    },
  },
  courtBailiffService: {
    header: 'Cyflwyno gan feili llys sirol',
    details: {
      line1: `Bydd beili llys sirol yn cyflwyno’r papurau i’ch ${partner} â llaw.`,
      line2:
        'Dim ond i gyfeiriad yng Nghymru a Lloegr sydd wedi’i ddefnyddio’n barod i anfon papurau drwy’r post y gall beilïaid llys gyflwyno’ch papurau iddo.',
      line3: `Mae yna ffi o ${getFee(
        config.get('fees.courtBailiffService')
      )} yn daladwy am hyn, ond efallai y gallwch <a class="govuk-link" target="_blank" href="${config.get(
        'govukUrls.getHelpWithCourtFees'
      )}">gael help i dalu’r ffi hon (yn agor mewn tab newydd)</a>.`,
      line4: 'Oherwydd y galw mawr am y gwasanaeth hwn gan feili llys, gall gymryd llawer o amser.',
    },
  },
  howToProceedHeader: 'Sut hoffech chi barhau?',
  processServer: 'Rwyf eisiau trefnu i’r dogfennau gael eu cyflwyno gan weinyddwr proses',
  bailiffService: 'Rwyf eisiau gwneud cais am wasanaeth cyflwyno gan feili',
  respondentAddressInEnglandWales: `Cadarnhaf bod cyfeiriad fy ${partner} yng Nghymru neu Loegr`,
  errors: {
    applicant1NoResponseProcessServerOrBailiff: {
      required: 'Dewiswch naill ai weinyddwr proses neu feili llys',
      confidentialRespondent: `You cannot request to serve by process server because your ${partner}’s details are confidential. Please select another option or go back to try something else.`,
    },
    applicant1NoResponseRespondentAddressInEnglandWales: {
      required: `Mae’n rhaid i chi gadarnhau bod cyfeiriad eich ${partner} yng Nghymru neu Loegr cyn parhau`,
    },
  },
});

const validateProcessServer = (userCase: Partial<Case>, value: string | string[] | CaseDate | undefined) => {
  const wantsToServeByProcessServer = value === NoResponseProcessServerOrBailiff.PROCESS_SERVER;
  const respondentIsPrivate = userCase?.applicant2AddressPrivate === YesOrNo.YES;

  if (wantsToServeByProcessServer && respondentIsPrivate) {
    return 'confidentialRespondent';
  }
};

export const form: FormContent = {
  fields: userCase => ({
    applicant1NoResponseProcessServerOrBailiff: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.howToProceedHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.processServer,
          id: 'processServer',
          value: NoResponseProcessServerOrBailiff.PROCESS_SERVER,
          validator: value => validateProcessServer(userCase, value),
        },
        {
          label: l => l.bailiffService,
          id: 'bailiffService',
          value: NoResponseProcessServerOrBailiff.COURT_BAILIFF,
          subFields: {
            applicant1NoResponseRespondentAddressInEnglandWales: {
              id: 'respondentAddressInEnglandWales',
              type: 'checkboxes',
              labelHidden: true,
              values: [
                {
                  name: 'applicant1NoResponseRespondentAddressInEnglandWales',
                  label: l => l.respondentAddressInEnglandWales,
                  value: Checkbox.Checked,
                },
              ],
              validator: value => isFieldFilledIn(value),
            },
          },
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  }),
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
