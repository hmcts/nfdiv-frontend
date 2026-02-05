import striptags from 'striptags';

import { ChangedNameHow, ChangedNameWhy, FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-answers/content';
import { formatYesOrNo } from '../../common/common.content';
import { generateContent as addressPrivateContent } from '../address-private/content';
import { generateContent as doYouWantToApplyFoContent } from '../do-you-want-to-apply-financial-order/content';
import { generateContent as englishOrWelshContent } from '../english-or-welsh/content';
import { generateContent as helpWithYourFeeContent } from '../help-with-your-fee/content';
import { generateContent as howTheCourtWillContactYouContent } from '../how-the-court-will-contact-you/content';
import { generateContent as irretrievableBreakdownContent } from '../irretrievable-breakdown/content';
import { generateContent as otherCourtCasesContent } from '../other-court-cases/content';

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

const getFormattedAnswers = content => ({
  applicant2ScreenHasUnionBroken: formatYesOrNo(
    irretrievableBreakdownContent(content),
    content.language,
    content.userCase.applicant2ScreenHasUnionBroken,
    true
  ),
  applicant2HelpPayingNeeded: formatYesOrNo(
    helpWithYourFeeContent(content),
    content.language,
    content.userCase.applicant2HelpPayingNeeded,
    true
  ),
  applicant2AgreeToReceiveEmails: formatYesOrNo(
    howTheCourtWillContactYouContent(content),
    content.language,
    content.userCase.applicant2AgreeToReceiveEmails,
    true,
    { yes: 'applicantAgreeToReceiveEmails' }
  ),
  applicant2EnglishOrWelsh: formatYesOrNo(
    englishOrWelshContent(content),
    content.language,
    content.userCase.applicant2LanguagePreferenceWelsh,
    true
  ),
  applicant2AddressPrivate: formatYesOrNo(
    addressPrivateContent(content),
    content.language,
    content.usercase.applicant2AddressPrivate,
    true,
    { yes: 'detailsPrivate', no: 'detailsNotPrivate' }
  ),
  applicant2InRefuge: formatYesOrNo(
    addressPrivateContent(content),
    content.language,
    content.userCase.applicant2InRefuge
  ),
  applicant2LegalProceedings: formatYesOrNo(
    otherCourtCasesContent(content),
    content.language,
    content.userCase.applicant2LegalProceedings
  ),
  applicant2ApplyForFinancialOrder: formatYesOrNo(
    doYouWantToApplyFoContent(content),
    content.language,
    content.userCase.applicant2ApplyForFinancialOrder,
    true
  ),
});

const en = ({ isDivorce, userCase, isApplicant2, marriage, civilPartnership }, formattedAnswers) => ({
  stepAnswers: {
    aboutPartnership: {
      line3: formattedAnswers.applicant2ScreenHasUnionBroken,
    },
    helpWithFees: {
      line1: formattedAnswers.applicant2HelpPayingNeeded,
      line2: `${
        userCase.applicant2AlreadyAppliedForHelpPaying
          ? userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES
            ? `Yes <br> ${userCase.applicant2HelpWithFeesRefNo ? userCase.applicant2HelpWithFeesRefNo : ''}`
            : ''
          : ''
      }`,
    },
    aboutYouForApplicant2: {
      line1: `${userCase.applicant2FirstNames}`,
      line2: `${userCase.applicant2MiddleNames}`,
      line3: `${userCase.applicant2LastNames}`,
      line4: `${stripTags(userCase?.applicant2NameDifferentToMarriageCertificate)}`,
      line5: `${userCase.applicant2FullNameOnCertificate}`,
      line6: `${stripTags(userCase.applicant2WhyNameDifferent)
        ?.join(' / ')
        ?.replace(ChangedNameWhy.DEED_POLL, 'I changed my name by deed poll')
        ?.replace(
          ChangedNameWhy.CHANGED_PARTS_OF_NAME,
          `I changed my last name or parts of my name when I ${
            isDivorce ? 'got married' : 'formed my civil partnership'
          }`
        )
        ?.replace(
          ChangedNameWhy.PART_OF_NAME_NOT_INCLUDED,
          `Part of my legal name was not included on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate`
        )
        ?.replace(
          ChangedNameWhy.PART_OF_NAME_ABBREVIATED,
          `Part of my legal name is abbreviated on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate`
        )
        ?.replace(
          ChangedNameWhy.LEGAL_NAME_SPELLED_DIFFERENTLY,
          `My legal name is spelled differently on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate`
        )
        ?.replace(ChangedNameWhy.OTHER, 'Another reason')}`,
      line7: `${stripTags(userCase.applicant2WhyNameDifferentOtherDetails)}`,
      line8: `${
        userCase.applicant2NameDifferentToMarriageCertificateMethod?.length
          ? userCase.applicant2NameDifferentToMarriageCertificateMethod
              .join(' / ')
              .replace(ChangedNameHow.OTHER, 'Another way')
              .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
              .replace(
                ChangedNameHow.MARRIAGE_CERTIFICATE,
                `${isDivorce ? 'Marriage' : 'Civil partnership'} certificate`
              )
          : ''
      }`,
      line9: `${stripTags(userCase.applicant2NameDifferentToMarriageCertificateOtherDetails)}`,
    },
    contactYou: {
      line5: formattedAnswers.applicant2AgreeToReceiveEmails,
      line6: `${userCase.applicant2PhoneNumber}`,
      line7: formattedAnswers.applicant2EnglishOrWelsh,
      line8: formattedAnswers.applicant2AddressPrivate,
      line9: `${
        !userCase.applicant2AddressPrivate || (userCase.applicant2AddressPrivate === YesOrNo.YES && !isApplicant2)
          ? ''
          : formattedAnswers.applicant2InRefuge
      }`,
      line10: `${[
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
    otherCourtCases: {
      line1: formattedAnswers.applicant2LegalProceedings,
      line2: userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : '',
    },
    dividingAssets: {
      line1: formattedAnswers.applicant2ApplyForFinancialOrder,
      line2: `${
        userCase.applicant2WhoIsFinancialOrderFor
          ? userCase.applicant2WhoIsFinancialOrderFor
              ?.join(' / ')
              .replace(FinancialOrderFor.APPLICANT, 'Myself')
              .replace(FinancialOrderFor.CHILDREN, 'The children')
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant2DocumentsUploaded?.length
          ? userCase.applicant2DocumentsUploaded.reduce((acc, curr) => `${acc}${getFilename(curr.value)}\n`, '')
          : ''
      }`,
      line2: `${
        userCase.applicant2CannotUploadDocuments && userCase.applicant2CannotUploadDocuments.length
          ? `Proof showing why my name is written differently on my ${
              isDivorce ? marriage : civilPartnership
            } certificate`
          : ''
      }`,
    },
  },
});

const cy: typeof en = ({ isDivorce, userCase, isApplicant2 }, formattedAnswers) => ({
  stepAnswers: {
    aboutPartnership: {
      line3: formattedAnswers.applicant2ScreenHasUnionBroken,
    },
    helpWithFees: {
      line1: formattedAnswers.applicant2HelpPayingNeeded,
      line2: userCase.applicant2AlreadyAppliedForHelpPaying
        ? userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES
          ? `Do <br> ${userCase.applicant2HelpWithFeesRefNo ? userCase.applicant2HelpWithFeesRefNo : ''}`
          : ''
        : '',
    },
    aboutYouForApplicant2: {
      line1: `${userCase.applicant2FirstNames}`,
      line2: `${userCase.applicant2MiddleNames}`,
      line3: `${userCase.applicant2LastNames}`,
      line4: `${stripTags(
        userCase?.applicant2NameDifferentToMarriageCertificate?.replace('Yes', 'Oes')?.replace('No', 'Nac oes')
      )}`,
      line5: `${userCase.applicant2FullNameOnCertificate}`,
      line6: `${stripTags(userCase.applicant2WhyNameDifferent)
        ?.join(' / ')
        ?.replace(ChangedNameWhy.DEED_POLL, 'Newidiais fy enw trwy weithred newid enw')
        ?.replace(
          ChangedNameWhy.CHANGED_PARTS_OF_NAME,
          `Newidiais fy nghyfenw neu rannau o fy enw pan wnes i ${isDivorce ? 'briodi' : 'ffurfio partneriaeth sifil'}`
        )
        ?.replace(
          ChangedNameWhy.PART_OF_NAME_NOT_INCLUDED,
          `Ni gafodd rhan o fy enw cyfreithiol ei chynnwys ar y dystysgrif ${
            isDivorce ? 'briodas' : 'partneriaeth sifil'
          }`
        )
        ?.replace(
          ChangedNameWhy.PART_OF_NAME_ABBREVIATED,
          `Mae rhan o fy enw cyfreithiol wedi'i dalfyrru ar y dystysgrif ${
            isDivorce ? 'briodas' : 'bartneriaeth sifil'
          }`
        )
        ?.replace(
          ChangedNameWhy.LEGAL_NAME_SPELLED_DIFFERENTLY,
          `Mae fy enw cyfreithiol wedi'i sillafu'n wahanol ar y dystysgrif ${
            isDivorce ? 'briodas' : 'bartneriaeth sifil'
          }`
        )
        ?.replace(ChangedNameWhy.OTHER, 'Rheswm arall')}`,
      line7: `${stripTags(userCase.applicant2WhyNameDifferentOtherDetails)}`,
      line8: `${
        userCase.applicant2NameDifferentToMarriageCertificateMethod?.length
          ? userCase.applicant2NameDifferentToMarriageCertificateMethod
              .join(' / ')
              .replace(ChangedNameHow.OTHER, 'Ffordd arall')
              .replace(ChangedNameHow.DEED_POLL, 'Gweithred newid enw')
              .replace(
                ChangedNameHow.MARRIAGE_CERTIFICATE,
                `Tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'}`
              )
          : ''
      }`,
      line9: `${stripTags(userCase.applicant2NameDifferentToMarriageCertificateOtherDetails)}`,
    },
    contactYou: {
      line5: formattedAnswers.applicant2AgreeToReceiveEmails,
      line6: `${userCase.applicant2PhoneNumber}`,
      line7: formattedAnswers.applicant2EnglishOrWelsh,
      line8: formattedAnswers.applicant2AddressPrivate,
      line9: `${
        !userCase.applicant2AddressPrivate || (userCase.applicant2AddressPrivate === YesOrNo.YES && !isApplicant2)
          ? ''
          : formattedAnswers.applicant2InRefuge
      }`,
      line10: `${[
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
    otherCourtCases: {
      line1: formattedAnswers.applicant2LegalProceedings,
      line2: userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : '',
    },
    dividingAssets: {
      line1: formattedAnswers.applicant2ApplyForFinancialOrder,
      line2: `${
        userCase.applicant2WhoIsFinancialOrderFor
          ? userCase.applicant2WhoIsFinancialOrderFor
              ?.join(' / ')
              .replace(FinancialOrderFor.APPLICANT, 'Fi fy hun')
              .replace(FinancialOrderFor.CHILDREN, 'Fy mhlant')
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant2DocumentsUploaded?.length
          ? userCase.applicant2DocumentsUploaded.reduce((acc, curr) => `${acc}${getFilename(curr.value)}\n`, '')
          : ''
      }`,
      line2: `Tystiolaeth yn dangos pam bod fy enw wedi'i ysgrifennu'n wahanol ar y dystysgrif ${
        isDivorce ? 'briodas' : 'bartneriaeth sifil'
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

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  content.checkTheirAnswersPartner = content.partner;
  const translations = languages[content.language](content, getFormattedAnswers(content));
  return {
    ...applicant1GenerateContent(content),
    ...translations,
    form,
  };
};
