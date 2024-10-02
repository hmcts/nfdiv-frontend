import { isEmpty, isObject } from 'lodash';

import { Checkbox } from '../../../app/case/case';
import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { generateContent as uploadDocumentGenerateContent } from '../../applicant1/upload-your-documents/content';

const en = applicant1UploadDocumentContent => ({
  title: "Respond to the court's feedback",
  line1:
    'Read the court’s reasons for stopping the application in the email we sent you and provide the information they’ve asked for.',
  responseHeading: 'Enter your response',
  line2:
    "Write your response below if the court has asked you to explain something or provide additional information. If the court has just asked you to upload documents, then you do not have to write anything unless you think it's useful information.",
  uploadHeading: 'Upload any documents',
  line3:
    'If the court has asked you to upload any documents or you want to upload any documents to support what you’ve written above, then you can upload them below.',
  line4:
    'Make sure the photo or scan is in colour and shows all 4 corners of the document. The certificate number (if it has one) and all the text must be readable. Blurred images will be rejected, delaying your application.',
  infoTakePhoto: 'You can take a picture with your phone and upload it',
  infoBullet1: 'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
  infoBullet2: 'Take a picture of the whole document. You should be able to see its edges.',
  infoBullet3:
    'Check you can read all the writing, including the handwriting. Blurred or unreadable images will be rejected.',
  infoBullet4: 'Email or send the photo or scan to the device you are using now.',
  infoBullet5: 'Upload it using the link below.',
  line5:
    'You should upload at least one clear image which shows the whole document. If you think it will help court staff read the details you can upload more images. If your document has more than one page then you should upload at least one image of each page.',
  line6: {
    part1: 'The file must be in jpg, bmp, tiff, png or pdf format.',
    part2: 'Maximum file size is 10MB.',
  },
  uploadAFile: 'Upload a file',
  chooseFileButtonText: 'Choose file',
  noFileChosen: 'No file chosen',
  uploadedFiles: 'Uploaded files',
  noFilesUploaded: 'No files uploaded',
  havingTroubleUploading: "I'm having trouble uploading some or all of my documents",
  havingTroubleUploadingInfo:
    'If you are unable to upload your documents due to a technical issue, you can post or email your documents instead. You will receive details on how to send them after you have submitted your response.',
  errors: {
    app1RfiDraftResponseDetails: {
      required:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. If you are having trouble uploading any documents, select that option.',
    },
    app1RfiDraftResponseUploadedFiles: {
      notUploaded:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. If you are having trouble uploading any documents, select that option.',
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    app1RfiDraftResponseCannotUploadDocs: {
      notUploaded:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. If you are having trouble uploading any documents, select that option.',
    },
  },
});

const cy: typeof en = applicant1UploadDocumentContent => ({
  title: 'Ymateb i adborth y llys',
  line1:
    'Darllenwch resymau’r llys dros atal y cais yn yr e-bost a anfonom atoch a rhowch yr wybodaeth y maent wedi gofyn amdani.',
  responseHeading: 'Nodi eich ymateb',
  line2:
    "Ysgrifennwch eich ymateb isod os yw’r llys wedi gofyn i chi egluro rhywbeth neu ddarparu gwybodaeth ychwanegol. Os yw'r llys newydd ofyn i chi lwytho dogfennau yna nid oes rhaid i chi ysgrifennu unrhyw beth, oni bai eich bod yn credu ei fod yn wybodaeth ddefnyddiol.",
  uploadHeading: 'Llwytho eich dogfennau',
  line3:
    'Os yw’r llys wedi gofyn i chi lwytho unrhyw ddogfennau neu os ydych eisiau llwytho unrhyw ddogfennau i gefnogi’r hyn rydych wedi’i ysgrifennu uchod, yna gallwch eu llwytho isod.',
  line4:
    "Gwnewch yn siŵr bod y llun neu'r sgan mewn lliw ac yn dangos pob un o'r 4 cornel o'r ddogfen. Rhaid i rif y dystysgrif (os oes ganddo un) a’r holl destun fod yn ddarllenadwy. Bydd delweddau aneglur yn cael eu gwrthod, gan ohirio eich cais.",
  infoTakePhoto: "Gallwch dynnu llun gyda'ch ffôn a'i uwchlwytho",
  infoBullet1:
    'Rhowch eich dogfen ar arwyneb fflat mewn ystafell gyda digon o olau. Defnyddiwch y fflach os oes angen.',
  infoBullet2: "Tynnwch lun o'r ddogfen gyfan. Dylech fod yn gallu gweld ymylon y ddogfen.",
  infoBullet3:
    'Gwiriwch eich bod yn gallu darllen yr holl ysgrifen, yn cynnwys y llawysgrifen. Bydd delweddau aneglur neu annarllenadwy yn cael eu gwrthod.',
  infoBullet4: "E-bostiwch neu anfonwch y llun neu'r sgan i'r ddyfais rydych yn ei defnyddio nawr.",
  infoBullet5: "Uwchlwythwch y llun/sgan trwy ddefnyddio'r ddolen isod.",
  line5:
    'Dylech lwytho o leiaf un delwedd glir sy’n dangos y ddogfen gyfan. Os ydych yn meddwl y bydd yn helpu staff y llys ddarllen y  manylion, gallwch lwytho sawl delwedd. Os oes gan eich dogfen mwy nac un tudalen, yna dylech lwytho o leiaf un delwedd o bob tudalen.',
  line6: {
    part1: "Rhaid i'r ffeil fod ar ffurf jpg, bmp, tiff, png neu pdf.",
    part2: 'Uchafswm maint y ffeil yw 10MB.',
  },
  uploadAFile: 'Llwytho ffeil',
  chooseFileButtonText: 'Dewis ffeil',
  noFileChosen: "Dim ffeil wedi'i dewis",
  uploadedFiles: 'Ffeiliau sydd wedi cael eu llwytho',
  noFilesUploaded: 'Nid oes ffeiliau wedi cael eu llwytho',
  havingTroubleUploading: 'Rwyf yn cael trafferth wrth lwytho rhai neu’r cyfan o fy nogfennau.',
  havingTroubleUploadingInfo:
    'If you are unable to upload your documents due to a technical issue, you can post or email your documents instead. You will receive details on how to send them after you have submitted your response.',
  errors: {
    app1RfiDraftResponseDetails: {
      required:
        'Nid ydych wedi darparu unrhyw wybodaeth neu lwytho unrhyw ddogfennau. Mae angen i chi ddarparu’r wybodaeth neu’r dogfennau y mae’r llys wedi gofyn amdani/ynt. Os ydych trafferth wrth lwytho dogfennau, dewiswch yr opsiwn hwnnw.',
    },
    app1RfiDraftResponseUploadedFiles: {
      notUploaded:
        'Nid ydych wedi darparu unrhyw wybodaeth neu lwytho unrhyw ddogfennau. Mae angen i chi ddarparu’r wybodaeth neu’r dogfennau y mae’r llys wedi gofyn amdani/ynt. Os ydych trafferth wrth lwytho dogfennau, dewiswch yr opsiwn hwnnw.',
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    app1RfiDraftResponseCannotUploadDocs: {
      notUploaded:
        'Nid ydych wedi darparu unrhyw wybodaeth neu lwytho unrhyw ddogfennau. Mae angen i chi ddarparu’r wybodaeth neu’r dogfennau y mae’r llys wedi gofyn amdani/ynt. Os ydych trafferth wrth lwytho dogfennau, dewiswch yr opsiwn hwnnw.',
    },
  },
});

export const form: FormContent = {
  fields: userCase => ({
    app1RfiDraftResponseDetails: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.response,
      validator: (value, formData) => {
        const hasUploadedFiles =
          (formData.app1RfiDraftResponseUploadedFiles as unknown as string[])?.length &&
          (formData.app1RfiDraftResponseUploadedFiles as unknown as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.app1RfiDraftResponseCannotUploadDocs?.length;
        const hasEnteredDetails = !isEmpty(value);
        if (!hasUploadedFiles && !selectedCannotUploadDocuments && !hasEnteredDetails) {
          return 'required';
        }
      },
    },
    app1RfiDraftResponseUploadedFiles: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.app1RfiDraftResponseUploadedFiles)
          ? JSON.stringify(userCase.app1RfiDraftResponseUploadedFiles)
          : userCase.app1RfiDraftResponseUploadedFiles) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).app1RfiDraftResponseUploadedFiles || '[]'),
      validator: (value, formData) => {
        const hasEnteredDetails = !isEmpty(formData.app1RfiDraftResponseDetails);
        const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.app1RfiDraftResponseCannotUploadDocs?.length;
        if (!hasEnteredDetails && !hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
    },
    app1RfiDraftResponseCannotUploadDocs: {
      type: 'checkboxes',
      label: l => l.havingTroubleUploading,
      labelHidden: true,
      validator: (value, formData) => {
        const hasEnteredDetails = !isEmpty(formData.app1RfiDraftResponseDetails);
        const hasUploadedFiles =
          (formData.app1RfiDraftResponseUploadedFiles as unknown as string[])?.length &&
          (formData.app1RfiDraftResponseUploadedFiles as unknown as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.app1RfiDraftResponseCannotUploadDocs?.length;
        if (!hasEnteredDetails && !hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
      values: [
        {
          name: 'app1RfiDraftResponseCannotUploadDocs',
          label: l => l.havingTroubleUploading,
          value: Checkbox.Checked,
          conditionalText: l => `<p class="govuk-body govuk-!-margin-top-5">${l.havingTroubleUploadingInfo}</p>`,
        },
      ],
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
  const applicant1UploadDocumentContent = uploadDocumentGenerateContent(content);
  const uploadedDocsFilenames = content.userCase.app1RfiDraftResponseDocs?.map(item => getFilename(item.value));
  const amendable = content.isRequestForInformationAmendableState;
  const uploadContentScript = `{
    "isRequestForInformationAmendableState": ${content.isRequestForInformationAmendableState},
    "delete": "${content.delete}"
  }`;
  return {
    ...applicant1UploadDocumentContent,
    ...languages[content.language](applicant1UploadDocumentContent),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    uploadedDocsFilenames,
    amendable,
    uploadContentScript,
  };
};
