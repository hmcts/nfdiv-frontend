import { isObject } from 'lodash';

import { Checkbox } from '../../app/case/case';
import { DocumentType, YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../app/form/validation';
import { CommonContent } from '../../steps/common/common.content';

const en = ({ isDivorce }: CommonContent) => {
  const union = isDivorce ? 'marriage' : 'civil partnership';
  return {
    title: 'Upload your documents',
    youNeed: 'You need to upload a digital photo or scan of the following documents:',
    certificate: `your original ${union} certificate`,
    certificateForeign: `your original foreign ${union} certificate`,
    certificateForeignTranslation: `a certified translation of your foreign ${union} certificate`,
    proofOfNameChange: 'proof that you changed your name, for example a deed poll or ‘statutory declaration’',
    warningPhoto:
      'Make sure the photo or scan shows the whole document. Check you can read all the text before uploading it. If court staff cannot read the details then it may be rejected.',
    infoTakePhoto: 'You can take a picture with your phone and upload it',
    infoBullet1: 'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    infoBullet2: 'Take a picture of the whole document. You should be able to see its edges.',
    infoBullet3:
      'Check you can read all the writing, including the handwriting. Blurred or unreadable images will be rejected.',
    infoBullet4: 'Email or send the photo or scan to the device you are using now.',
    infoBullet5: 'Upload it using the link below.',
    minRequirements:
      'You should upload at least one clear image which shows the whole document. If you think it will help court staff read the details you can upload more images. If your document has more than one page then you should upload at least one image of each page.',
    uploadFiles: 'Uploaded files',
    noFilesUploaded: 'No files uploaded',
    chooseFilePhoto: 'Choose a file or take a photo',
    orStr: 'or',
    dragDropHere: 'Drag and drop files here',
    acceptedFileFormats: 'Accepted file formats:',
    fileFormats: 'JPEG, TIFF, PNG, PDF',
    maximumFileSize: 'Maximum file size:',
    fileSize: '10 MB',
    cannotUploadDocuments: 'I cannot upload some or all of my documents',
    cannotUploadWhich: 'Which document can you not upload?',
    checkAllThatApply: 'Select all that apply',
    cannotUploadYouCanPost: `<p class="govuk-body govuk-!-margin-top-5">You can post or email your documents to the court. If you post them you must send the original documents or certified copies. You’ll receive details of how to send them after you have submitted this application.</p>
      <p class="govuk-body">Continue with your application.</p>`,
    cannotUploadCertificateSingular: `I cannot upload my original ${union} certificate`,
    cannotUploadForeignCertificateSingular: `I cannot upload my original foreign ${union} certificate`,
    cannotUploadCertificate: `My original ${union} certificate`,
    cannotUploadForeignCertificate: `My original foreign ${union} certificate`,
    cannotUploadForeignCertificateTranslation: `A certified translation of my foreign ${union} certificate`,
    cannotUploadNameChangeProof: 'Proof that I changed my name',
    errors: {
      uploadedFiles: {
        notUploaded:
          'You have not uploaded anything. Either upload your document or select that you cannot upload your documents.',
        errorUploading:
          'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again.',
        fileSizeTooBig: 'The file you have uploaded is too large. Reduce it to under 10MB and try uploading it again.',
        fileWrongFormat:
          'You cannot upload that format of file. Save the file as one of the accepted formats and try uploading it again.',
      },
      cannotUpload: {
        required: 'Select which file you could not upload before continuing.',
      },
    },
  };
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: formState => {
    const checkboxes: { id: string; value: DocumentType }[] = [];

    if (formState?.inTheUk === YesOrNo.NO) {
      checkboxes.push({
        id: 'cannotUploadForeignCertificate',
        value: DocumentType.MARRIAGE_CERTIFICATE,
      });
    } else {
      checkboxes.push({
        id: 'cannotUploadCertificate',
        value: DocumentType.MARRIAGE_CERTIFICATE,
      });
    }

    if (formState?.certifiedTranslation === YesOrNo.YES) {
      checkboxes.push({
        id: 'cannotUploadForeignCertificateTranslation',
        value: DocumentType.MARRIAGE_CERTIFICATE_TRANSLATION,
      });
    }

    if (
      formState?.lastNameChangeWhenRelationshipFormed === YesOrNo.YES ||
      formState?.anyNameChangeSinceRelationshipFormed === YesOrNo.YES
    ) {
      checkboxes.push({
        id: 'cannotUploadNameChangeProof',
        value: DocumentType.NAME_CHANGE_EVIDENCE,
      });
    }

    return {
      uploadedFiles: {
        type: 'hidden',
        label: l => l.uploadFiles,
        labelHidden: true,
        value:
          (isObject(formState.uploadedFiles) ? JSON.stringify(formState.uploadedFiles) : formState.uploadedFiles) ||
          '[]',
        parser: data => JSON.parse((data as Record<string, string>).uploadedFiles || '[]'),
        validator: (value, formData) => {
          const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
          const selectedCannotUploadDocuments = !!formData.cannotUploadDocuments?.length;
          if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
            return 'notUploaded';
          }
        },
      },
      ...(checkboxes.length > 1
        ? {
            cannotUpload: {
              type: 'checkboxes',
              label: l => l.cannotUploadDocuments,
              labelHidden: true,
              validator: (value, formData) => {
                if ((value as string[])?.includes(Checkbox.Checked)) {
                  return atLeastOneFieldIsChecked(formData?.cannotUploadDocuments);
                }
              },
              values: [
                {
                  name: 'cannotUpload',
                  label: l => l.cannotUploadDocuments,
                  value: Checkbox.Checked,
                  subFields: {
                    cannotUploadDocuments: {
                      type: 'checkboxes',
                      label: l => l.cannotUploadWhich,
                      hint: l => l.checkAllThatApply,
                      subtext: l => l.cannotUploadYouCanPost,
                      values: checkboxes.map(checkbox => ({
                        name: 'cannotUploadDocuments',
                        label: l => l[checkbox.id],
                        value: checkbox.value,
                      })),
                    },
                  },
                },
              ],
            },
          }
        : {}),
      ...(checkboxes.length === 1
        ? {
            cannotUploadDocuments: {
              type: 'checkboxes',
              label: l => l.cannotUploadDocuments,
              labelHidden: true,
              subtext: l => l.cannotUploadYouCanPost,
              values: checkboxes.map(checkbox => ({
                name: 'cannotUploadDocuments',
                label: l => l[`${checkbox.id}Singular`],
                value: checkbox.value,
              })),
            },
          }
        : {}),
    };
  },
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.formState || {}) },
  };
};
