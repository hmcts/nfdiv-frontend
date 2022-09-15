import { isEmpty, isObject } from 'lodash';

import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { generateContent as hubPageContent } from '../../applicant1/hub-page/content';
import { generateContent as uploadDocumentGenerateContent } from '../../applicant1/upload-your-documents/content';
import { formattedCaseId, latestLegalAdvisorDecisionContent } from '../../common/content.utils';

const en = ({ partner, applicant1UploadDocumentContent }) => ({
  title: 'Provide information to the court',
  courtsReasons: 'Read the court’s reason(s) for refusing the application and provide the requested information.',
  agreeYourResponse: `You should agree your response with your ${partner} before submitting it to the court.`,
  subheading1: 'Enter your response',
  response:
    'If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information.',
  uploadTitle: 'Upload any documents',
  line5:
    'If the court has asked you to upload any documents or you want to upload a document to support what you wrote above, then you can upload it here.',
  cannotUploadDocuments: 'I cannot upload some or all of my documents',
  cannotUploadYouCanPost:
    'You can post your documents to the court if you cannot upload them, or you think uploading them will not help. You must send the original documents or certified copies. Make sure you include a covering letter with your case number: ',
  errors: {
    coClarificationResponses: {
      required:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option.',
    },
    coClarificationUploadedFiles: {
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
  },
});

const cy: typeof en = ({ partner, applicant1UploadDocumentContent }) => ({
  title: 'Darparu gwybodaeth i’r llys',
  courtsReasons: 'Darllenwch reswm (resymau) y llys dros wrthod y cais a darparwch yr wybodaeth y gofynnwyd amdani.',
  agreeYourResponse: `Dylech gytuno ar eich ymateb gyda’ch ${partner} cyn ei gyflwyno i’r llys.`,
  subheading1: 'Rhowch eich ymateb ',
  response:
    "Os yw’r llys eisiau i chi esbonio rhywbeth neu ddarparu gwybodaeth ychwanegol yna ysgrifennwch eich ymateb yma. Os yw'r llys ond wedi gofyn i chi lwytho dogfennau yna nid oes rhaid i chi ysgrifennu unrhyw beth, oni bai eich bod yn credu ei bod yn wybodaeth ddefnyddiol.",
  uploadTitle: 'Llwytho unrhyw ddogfennau',
  line5:
    'Os yw’r llys wedi gofyn i chi lwytho unrhyw ddogfennau neu os ydych am lwytho dogfen i gefnogi’r hyn a ysgrifennwyd gennych uchod, yna gallwch wneud hynny yma.',
  cannotUploadDocuments: 'Ni allaf lwytho rhai o fy nogfennau / fy holl ddogfennau',
  cannotUploadYouCanPost:
    "Gallwch bostio eich dogfennau i’r llys os na allwch eu llwytho, neu os credwch na fydd eu llwytho yn helpu. Rhaid i chi bostio’r dogfennau gwreiddiol neu gopïau ardystiedig. Gwnewch yn siŵr eich bod yn cynnwys llythyr eglurhaol gyda'ch rhif achos arno: ",
  errors: {
    coClarificationResponses: {
      required:
        'Nid ydych wedi darparu unrhyw wybodaeth neu lwytho unrhyw ddogfennau. Mae angen i chi ddarparu’r wybodaeth neu’r dogfennau y mae’r llys wedi gofyn amdani/ynt. Neu os ydych yn mynd i bostio unrhyw ddogfennau, dewiswch yr opsiwn hwnnw.',
    },
    coClarificationUploadedFiles: {
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
  },
});

export const form: FormContent = {
  fields: userCase => ({
    coClarificationResponses: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.response,
      validator: (value, formData) => {
        const hasUploadedFiles =
          (formData.coClarificationUploadedFiles as unknown as string[])?.length &&
          (formData.coClarificationUploadedFiles as unknown as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.coCannotUploadClarificationDocuments?.length;
        const hasEnteredResponse = !isEmpty(value);
        if (!hasUploadedFiles && !selectedCannotUploadDocuments && !hasEnteredResponse) {
          return 'required';
        }
      },
    },
    coClarificationUploadedFiles: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.coClarificationUploadedFiles)
          ? JSON.stringify(userCase.coClarificationUploadedFiles)
          : userCase.coClarificationUploadedFiles) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).coClarificationUploadedFiles || '[]'),
    },
    coCannotUploadClarificationDocuments: {
      type: 'hidden',
      values: [],
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
  const { userCase } = content;
  const applicant1UploadDocumentContent = uploadDocumentGenerateContent(content);
  const { courtFeedback } = hubPageContent(content);
  const referenceNumber = formattedCaseId(content.userCase.id);
  const uploadedDocsFilenames = content.userCase.coClarificationUploadDocuments?.map(item => getFilename(item.value));
  const amendable = content.isClarificationAmendableState;
  const uploadContentScript = `{
    "isClarificationAmendableState": ${content.isClarificationAmendableState},
    "delete": "${content.delete}"
  }`;
  return {
    ...applicant1UploadDocumentContent,
    ...languages[content.language]({ applicant1UploadDocumentContent, ...content }),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    uploadedDocsFilenames,
    amendable,
    uploadContentScript,
    referenceNumber,
    courtFeedback,
    ...latestLegalAdvisorDecisionContent(userCase, false),
  };
};
