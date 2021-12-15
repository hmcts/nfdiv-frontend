import { ChangedNameHow, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-answers/content';
import { CommonContent } from '../../common/common.content';

const labels = ({ userCase, isDivorce }: CommonContent) => ({
  stepAnswers: {
    aboutPartnership: {
      line2: `${
        userCase.applicant2ScreenHasUnionBroken
          ? userCase.applicant2ScreenHasUnionBroken === YesOrNo.YES
            ? `Yes, my ${isDivorce ? 'marriage' : 'civil partnership'} has irretrievably broken down`
            : `No, my ${isDivorce ? 'marriage' : 'civil partnership'} has not irretrievably broken down`
          : ''
      }`,
    },
    helpWithFees: {
      line1: `${
        userCase.applicant2HelpPayingNeeded
          ? userCase.applicant2HelpPayingNeeded === YesOrNo.YES
            ? 'I need help paying the fee'
            : 'I do not need help paying the fee'
          : ''
      }`,
      line2: `${
        userCase.applicant2AlreadyAppliedForHelpPaying
          ? userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES
            ? `Yes <br> ${userCase.applicant2HelpWithFeesRefNo ? userCase.applicant2HelpWithFeesRefNo : ''}`
            : ''
          : ''
      }`,
    },
    connectionsToEnglandWales: {},
    aboutPartners: {
      line3: `${
        userCase.applicant2LastNameChangedWhenRelationshipFormed
          ? userCase.applicant2LastNameChangedWhenRelationshipFormed
          : ''
      }`,
      line4: `${
        userCase.applicant2NameChangedSinceRelationshipFormed
          ? userCase.applicant2NameChangedSinceRelationshipFormed
          : ''
      }`,
      line5: `${
        userCase.applicant2NameChangedHow?.length
          ? userCase.applicant2NameChangedHow
              .join(' / ')
              .replace(ChangedNameHow.OTHER, 'Another way')
              .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
              .replace(
                ChangedNameHow.MARRIAGE_CERTIFICATE,
                `${isDivorce ? 'Marriage' : 'Civil partnership'} certificate`
              )
          : ''
      }`,
    },
    contactYou: {
      line1: `${userCase.applicant2FirstNames}`,
      line2: `${userCase.applicant2MiddleNames}`,
      line3: `${userCase.applicant2LastNames}`,
      line4: `${
        userCase.applicant2AgreeToReceiveEmails
          ? `I agree that the ${
              isDivorce ? 'divorce' : 'civil partnership'
            } service can send me notifications and serve (deliver) court documents to me by email.`
          : ''
      }`,
      line5: `${userCase.applicant2PhoneNumber}`,
      line6: `${
        userCase.applicant2EnglishOrWelsh
          ? userCase.applicant2EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant2EnglishOrWelsh.slice(1)
          : ''
      }`,
      line7: `${
        userCase.applicant2AddressPrivate
          ? userCase.applicant2AddressPrivate === YesOrNo.YES
            ? 'Keep my contact details private'
            : 'I do not need my contact details kept private'
          : ''
      }`,
      line8: `${[
        userCase.applicant2Address1,
        userCase.applicant2Address2,
        userCase.applicant2Address3,
        userCase.applicant2AddressTown,
        userCase.applicant2AddressCounty,
        userCase.applicant2AddressPostcode,
        userCase.applicant2AddressCountry,
      ]
        .filter(Boolean)
        .join('<br>')}`,
    },
    contactThem: {},
    otherCourtCases: {
      line1: `${userCase.applicant2LegalProceedings}`,
      line2: `${userCase.applicant2LegalProceedingsDetails ? userCase.applicant2LegalProceedingsDetails : ''}`,
    },
    dividingAssets: {
      line1: `${
        userCase.applicant2ApplyForFinancialOrder
          ? userCase.applicant2ApplyForFinancialOrder === YesOrNo.YES
            ? 'Yes, I want to apply for a financial order'
            : 'No, I do not want to apply for a financial order'
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant2DocumentsUploaded?.length
          ? userCase.applicant2DocumentsUploaded.reduce((acc, curr) => `${acc}${curr.value?.documentFileName}\n`, '')
          : ''
      }`,
      line2: `${
        userCase.applicant2CannotUploadDocuments && userCase.applicant2CannotUploadDocuments.length
          ? 'I cannot upload some or all of my documents'
          : ''
      }`,
    },
  },
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    ...labels(content),
    form,
  };
};
