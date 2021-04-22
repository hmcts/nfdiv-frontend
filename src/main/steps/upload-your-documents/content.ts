import { Checkbox } from '../../app/case/case';
import { SupportingDocumentType, YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent, FormOptions } from '../../app/form/Form';
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
    cannotUploadCertificate: `My original ${union} certificate`,
    cannotUploadForeignCertificate: `My original foreign ${union} certificate`,
    cannotUploadForeignCertificateTranslation: `A certified translation of my foreign ${union} certificate`,
    cannotUploadNameChangeProof: 'Proof that I changed my name',
    errors: {
      uploadedDocuments: {
        errorUploading:
          'Sorry, we’re having technical problems uploading your documents. Please try again in a few minutes.',
      },
      cannotUpload: {
        required: 'You have not uploaded anything. Upload your documents or select ‘I cannot upload my document’.',
      },
    },
  };
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    uploadedDocuments: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
    },
    cannotUpload: {
      type: 'checkboxes',
      label: l => l.cannotUploadDocuments,
      labelHidden: true,
      validator: (value, formData) => {
        if (
          (!formData.uploadedDocuments || formData.uploadedDocuments === '[]') &&
          (!value || !formData.cannotUploadDocuments?.length)
        ) {
          return 'required';
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
              validator: atLeastOneFieldIsChecked,
              values: [],
            },
          },
        },
      ],
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

const addCannotUploadReasonCheckboxes = content => {
  const checkboxes = [
    {
      name: 'cannotUploadDocuments',
      label: l => l.cannotUploadCertificate,
      value: SupportingDocumentType.UNION_CERTIFICATE,
    },
  ];

  if (content.formState?.inTheUk === YesOrNo.NO) {
    checkboxes.push({
      name: 'cannotUploadDocuments',
      label: l => l.cannotUploadForeignCertificate,
      value: SupportingDocumentType.FOREIGN_UNION_CERTIFICATE,
    });
  }
  if (content.formState?.certifiedTranslation === YesOrNo.YES) {
    checkboxes.push({
      name: 'cannotUploadDocuments',
      label: l => l.cannotUploadForeignCertificateTranslation,
      value: SupportingDocumentType.FOREIGN_UNION_CERTIFICATE_TRANSLATION,
    });
  }
  if (
    content.formState?.lastNameChangeWhenRelationshipFormed === YesOrNo.YES ||
    content.formState?.anyNameChangeSinceRelationshipFormed === YesOrNo.YES
  ) {
    checkboxes.push({
      name: 'cannotUploadDocuments',
      label: l => l.cannotUploadNameChangeProof,
      value: SupportingDocumentType.NAME_CHANGE_PROOF,
    });
  }

  ((form.fields.cannotUpload as FormOptions).values[0].subFields
    ?.cannotUploadDocuments as FormOptions).values = checkboxes;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  addCannotUploadReasonCheckboxes(content);

  return {
    ...translations,
    form,
  };
};
