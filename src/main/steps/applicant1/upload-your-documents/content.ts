import { isObject } from 'lodash';

import { CaseWithId, Checkbox } from '../../../app/case/case';
import { ApplicationType, ChangedNameWhy, DocumentType, YesOrNo } from '../../../app/case/definition';
import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { accessibleDetailsSpan } from '../../common/content.utils';

const en = (
  { isDivorce, marriage, civilPartnership, partner, isJointApplication }: CommonContent,
  nameChangedIntentionally: boolean
) => {
  const union = isDivorce ? marriage : civilPartnership;
  return {
    title: 'Upload your documents',
    youNeed: 'You need to upload a colour photo or scan of the following documents:',
    certificate: `your original ${union} certificate`,
    certificateForeign: `your original foreign ${union} certificate`,
    certificateForeignTranslation: `a certified translation of your foreign ${union} certificate`,
    proofOfNameChange: nameChangedIntentionally
      ? `proof that you${
          isJointApplication ? ' changed your name' : ` or your ${partner} changed your names`
        }, for example a deed poll or 'statutory declaration'`
      : `proof to show why your name${
          isJointApplication ? '' : ` or your ${partner}'s name`
        } is written differently on your ${union} certificate. For example, a government issued ID, a passport, driving license or birth certificate, deed poll or 'statutory declaration'`,
    warningPhoto:
      'Make sure the photo or scan is in colour and shows all 4 corners of the document. The certificate number (if it has one) and all the text must be readable. Blurred images will be rejected, delaying your application.',
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
    chooseFilePhoto: 'Choose a file',
    orStr: 'or',
    dragDropHere: 'Drag and drop files here',
    acceptedFileFormats: 'Accepted file formats:',
    fileFormats: 'JPEG, TIFF, PNG, PDF',
    maximumFileSize: 'Maximum file size:',
    fileSize: '25 MB',
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
    cannotUploadNameChangeProof: nameChangedIntentionally
      ? `Proof that I ${isJointApplication ? 'changed my name' : `or my ${partner} changed our names`}`
      : `Proof to show why my name${
          isJointApplication ? '' : ` or my ${partner}'s name`
        } is written differently on my ${union} certificate`,
    errors: {
      applicant1UploadedFiles: {
        notUploaded:
          'You have not uploaded anything. Either upload your document or select that you cannot upload your documents.',
        errorUploading:
          'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again.',
        fileSizeTooBig: 'The file you have uploaded is too large. Reduce it to under 25MB and try uploading it again.',
        fileWrongFormat:
          'You cannot upload that format of file. Save the file as one of the accepted formats and try uploading it again.',
      },
      applicant1CannotUpload: {
        required: 'Select which file you could not upload before continuing.',
      },
    },
  };
};

const cy = ({ isDivorce, marriage, civilPartnership, partner }: CommonContent) => {
  const union = isDivorce ? marriage : civilPartnership;
  return {
    title: 'Uwchlwytho eich dogfennau',
    youNeed: "Mae arnoch angen uwchlwytho llun digidol neu sgan o'r dogfennau canlynol:",
    certificate: `eich tystysgrif ${union} wreiddiol`,
    certificateForeign: `eich tystysgrif ${union} dramor wreiddiol`,
    certificateForeignTranslation: `cyfieithiad wedi'i ardystio o'ch tystysgrif ${union} dramor`,
    proofOfNameChange: `Tystiolaeth yn dangos pam bod eich enw neu enw eich ${partner} wedi'i ysgrifennu'n wahanol ar eich ${
      isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'
    }. Er enghraifft, cerdyn adnabod a gyhoeddwyd gan y llywodraeth, pasbort, trwydded yrru neu dystysgrif geni, gweithred newid enw neu 'ddatganiad statudol'.`,
    warningPhoto:
      "Gwnewch yn siŵr bod y llun neu'r sgan yn dangos y ddogfen gyfan. Gwiriwch eich bod yn gallu darllen y testun i gyd cyn ei uwchlwytho. Os na all staff y llys ddarllen y manylion, efallai bydd yn cael ei wrthod.",
    infoTakePhoto: "Gallwch dynnu llun gyda'ch ffôn a'i uwchlwytho",
    infoBullet1:
      'Rhowch eich dogfen ar arwyneb fflat mewn ystafell gyda digon o olau. Defnyddiwch y fflach os oes angen.',
    infoBullet2: "Tynnwch lun o'r ddogfen gyfan. Dylech fod yn gallu gweld ymylon y ddogfen.",
    infoBullet3:
      'Gwiriwch eich bod yn gallu darllen yr holl ysgrifen, yn cynnwys y llawysgrifen. Bydd delweddau aneglur neu annarllenadwy yn cael eu gwrthod.',
    infoBullet4: "E-bostiwch neu anfonwch y llun neu'r sgan i'r ddyfais rydych yn ei defnyddio nawr.",
    infoBullet5: "Uwchlwythwch y llun/sgan trwy ddefnyddio'r ddolen isod.",
    minRequirements:
      "Dylech uwchlwytho o leiaf un ddelwedd glir sy'n dangos y ddogfen gyfan. Os ydych yn meddwl y bydd yn helpu staff y llys i ddarllen y manylion, gallwch anfon ragor o ddelweddau. Os yw eich dogfen yn cynnwys mwy nag un tudalen, yna dylech uwchlwytho o leiaf un ddelwedd o bob tudalen.",
    uploadFiles: "Ffeiliau wedi'u huwchlwytho",
    noFilesUploaded: "Dim ffeiliau wedi'u huwchlwytho",
    chooseFilePhoto: 'Dewiswch ffeil neu tynnwch lun',
    orStr: 'neu',
    dragDropHere: 'Llusgwch a gollyngwch ffeiliau yma',
    acceptedFileFormats: 'Fformatau ffeil a dderbynnir:',
    fileFormats: 'JPEG, TIFF, PNG, PDF',
    maximumFileSize: 'Uchafswm maint ffeil:',
    fileSize: '25 MB',
    cannotUploadDocuments: 'Ni allaf uwchlwytho rhai neu bob un o fy nogfennau',
    cannotUploadWhich: 'Pa ddogfen na allwch ei huwchlwytho?',
    checkAllThatApply: "Dewiswch bob un sy'n berthnasol",
    cannotUploadYouCanPost: `<p class="govuk-body govuk-!-margin-top-5">Gallwch bostio neu e-bostio eich dogfennau i'r llys. Os byddwch yn eu postio, rhaid ichi anfon y dogfennau gwreiddiol neu gopïau wedi'u hardystio. Byddwch yn cael manylion am sut i'w hanfon ar ôl ichi gyflwyno'r cais hwn.</p>
      <p class="govuk-body">Ewch ymlaen gyda'ch cais.</p>`,
    cannotUploadCertificateSingular: `Ni allaf uwchlwytho fy nhystysgrif ${union} wreiddiol`,
    cannotUploadForeignCertificateSingular: `Ni allaf uwchlwytho fy nhystysgrif ${union} dramor wreiddiol`,
    cannotUploadCertificate: `Fy nhystysgrif ${union} wreiddiol`,
    cannotUploadForeignCertificate: `Fy nhystysgrif ${union} dramor wreiddiol`,
    cannotUploadForeignCertificateTranslation: `Cyfieithiad wedi'i ardystio o fy nhystysgrif ${union} dramor`,
    cannotUploadNameChangeProof: `Tystiolaeth yn dangos pam bod eich enw neu enw eich ${partner} wedi'i ysgrifennu'n wahanol ar eich ${
      isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'
    }`,
    errors: {
      applicant1UploadedFiles: {
        notUploaded:
          'Nid ydych wedi uwchlwytho unrhyw beth. Uwchlwythwch eich dogfen neu nodwch na allwch uwchlwytho eich dogfennau.',
        errorUploading:
          'Ni chafodd eich ffeil ei huwchlwytho oherwydd bod y gwasanaeth yn profi problemau technegol. Ceisiwch uwchlwytho eich ffeil eto.',
        fileSizeTooBig:
          "Mae'r ffeil rydych wedi'i huwchlwytho yn rhy fawr. Gwnewch y ffeil yn llai na 10MB a cheisiwch ei huwchlwytho eto.",
        fileWrongFormat:
          "Ni allwch uwchlwytho ffeil yn y fformat hwnnw. Cadwch y ffeil gan ddefnyddio un o'r fformatau a dderbynnir a cheisiwch ei huwchlwytho eto.",
      },
      applicant1CannotUpload: {
        required: 'Dewiswch pa ffeil nad oeddech yn gallu ei huwchlwytho cyn parhau.',
      },
    },
  };
};

const nameIsDifferentOnMarriageCertificate = (userCase: Partial<CaseWithId>, isApplicant2: boolean) => {
  const app1NameChanged = userCase.applicant1NameDifferentToMarriageCertificate === YesOrNo.YES;
  const app2NameChanged = userCase.applicant2NameDifferentToMarriageCertificate === YesOrNo.YES;

  return (!isApplicant2 && (app1NameChanged || app2NameChanged)) || (isApplicant2 && app2NameChanged);
};

const nameWasChangedIntentionally = (userCase: Partial<CaseWithId>, isApplicant2: boolean) => {
  const isJointApplication = userCase.applicationType === ApplicationType.JOINT_APPLICATION;

  const nameChangedValues: Set<ChangedNameWhy> = new Set(
    (isApplicant2 ? [] : userCase.applicant1WhyNameDifferent ?? []).concat(
      isApplicant2 || !isJointApplication ? userCase.applicant2WhyNameDifferent ?? [] : []
    )
  );

  const valuesRequiringEvidence = [ChangedNameWhy.CHANGED_PARTS_OF_NAME, ChangedNameWhy.DEED_POLL];

  return valuesRequiringEvidence.some(value => nameChangedValues.has(value));
};

export const form: FormContent = {
  fields: userCase => {
    const checkboxes: { id: string; value: DocumentType }[] = [];

    if (userCase.inTheUk === YesOrNo.NO) {
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

    if (userCase.certifiedTranslation === YesOrNo.YES) {
      checkboxes.push({
        id: 'cannotUploadForeignCertificateTranslation',
        value: DocumentType.MARRIAGE_CERTIFICATE_TRANSLATION,
      });
    }

    if (nameIsDifferentOnMarriageCertificate(userCase, false)) {
      checkboxes.push({
        id: 'cannotUploadNameChangeProof',
        value: DocumentType.NAME_CHANGE_EVIDENCE,
      });
    }

    return {
      applicant1UploadedFiles: {
        type: 'hidden',
        label: l => l.uploadFiles,
        labelHidden: true,
        value:
          (isObject(userCase.applicant1UploadedFiles)
            ? JSON.stringify(userCase.applicant1UploadedFiles)
            : userCase.applicant1UploadedFiles) || '[]',
        parser: data => JSON.parse((data as Record<string, string>).applicant1UploadedFiles || '[]'),
        validator: (value, formData) => {
          const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
          const selectedCannotUploadDocuments = !!formData.applicant1CannotUploadDocuments?.length;
          if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
            return 'notUploaded';
          }
        },
      },
      ...(checkboxes.length > 1
        ? {
            applicant1CannotUpload: {
              type: 'checkboxes',
              label: l => l.cannotUploadDocuments,
              labelHidden: true,
              validator: (value, formData) => {
                if ((value as string[])?.includes(Checkbox.Checked)) {
                  return atLeastOneFieldIsChecked(formData?.applicant1CannotUploadDocuments);
                }
              },
              values: [
                {
                  name: 'applicant1CannotUpload',
                  label: l => l.cannotUploadDocuments,
                  value: Checkbox.Checked,
                  conditionalText: l => l.cannotUploadYouCanPost,
                  subFields: {
                    applicant1CannotUploadDocuments: {
                      type: 'checkboxes',
                      label: l => l.cannotUploadWhich,
                      hint: l => l.checkAllThatApply,
                      values: checkboxes.map(checkbox => ({
                        name: 'applicant1CannotUploadDocuments',
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
            applicant1CannotUploadDocuments: {
              type: 'checkboxes',
              label: l => l.cannotUploadDocuments,
              labelHidden: true,
              values: checkboxes.map(checkbox => ({
                name: 'applicant1CannotUploadDocuments',
                label: l => l[`${checkbox.id}Singular`],
                value: checkbox.value,
                conditionalText: l => l.cannotUploadYouCanPost,
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
  const uploadedDocsFilenames = content.userCase.applicant1DocumentsUploaded?.map(item => getFilename(item.value));
  const amendable = content.isAmendableStates;
  const nameDifferenceEvidenceRequired = nameIsDifferentOnMarriageCertificate(content.userCase, false);
  const nameChangedIntentionally = nameWasChangedIntentionally(content.userCase, false);
  const applicant1HasChangedName =
    content.userCase.applicant1LastNameChangedWhenMarried === YesOrNo.YES ||
    content.userCase.applicant1NameDifferentToMarriageCertificate === YesOrNo.YES;
  const translations = languages[content.language](content, nameChangedIntentionally);
  const uploadContentScript = `{
    "isAmendableStates": ${content.isAmendableStates},
    "delete": "${content.delete}"
  }`;
  const infoTakePhotoAccessibleSpan = accessibleDetailsSpan(
    translations['infoTakePhoto'],
    'More information about how ' + translations['infoTakePhoto']
  );
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    uploadedDocsFilenames,
    amendable,
    uploadContentScript,
    infoTakePhotoAccessibleSpan,
    applicant1HasChangedName,
    nameDifferenceEvidenceRequired,
  };
};
