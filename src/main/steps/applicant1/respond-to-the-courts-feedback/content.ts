import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
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
});

const cy: typeof en = () => ({
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
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
