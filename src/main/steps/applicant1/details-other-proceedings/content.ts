import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce }: CommonContent) => ({
  title: 'Details of the other legal proceedings',
  line1: `The court needs to know the details of the other legal proceedings relating to your ${
    isDivorce ? 'marriage' : 'civil partnership'
  }.
  Provide as much information as possible, such as:`,
  point1: 'the names of the people involved',
  point2: 'the case number(s)',
  point3: "if the proceedings are ongoing of if they've finished",
  point4: 'what the proceedings are about',
  point5: 'the name and address of a court, including the country',
  point6: 'the date the proceedings began',
  point7: 'the dates of any hearings that have been scheduled',
  point8: 'the details of any orders that have been made',
  legalProceedingsDetails: 'Provide details about the other legal proceedings.',
  legalProceedingsConcluded: 'Have the proceedings been concluded?',
  no: 'No',
  yes: 'Yes',
  unableToUploadEvidence: 'I cannot upload some or all of my documents',
  uploadAFile: 'Upload a file',
  chooseFileButtonText: 'Choose file',
  noFileChosen: 'No file chosen',
  uploadedFiles: 'Uploaded files',
  noFilesUploaded: 'No files uploaded',
  legalProceedingsConcludedEvidence:
    'You will have to upload evidence to show that the proceedings have been concluded or withdrawn. For example, an order or confirmation email from the court that the proceedings have been concluded or withdrawn.',
  legalProceedingsOngoingEvidence:
    'You will have to upload evidence to show that the proceedings are ongoing. For example, an email or notice from the court that the proceedings are ongoing.',
  errors: {
    applicant1LegalProceedingsDetails: {
      required: 'You have not provided any information. You need to enter details of the other legal proceedings.',
    },
    applicant2LegalProceedingUploadedFiles: {
      notUploaded:
        "You must upload your documents, or select 'I cannot upload some or all of my documents' before continuing.",
      errorUploading:
        'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again.',
      fileSizeTooBig: 'The file you have uploaded is too large. Reduce it to under 25MB and try uploading it again.',
      fileWrongFormat:
        'You cannot upload that format of file. Save the file as one of the accepted formats and try uploading it again.',
    },
    applicant2UnableToUploadEvidence: {
      notUploaded:
        "You must upload your documents, or select 'I cannot upload some or all of my documents' before continuing.",
    },
    applicant2LegalProceedingsConcluded: {
      required: 'You must select if the ongoing proceedings have been concluded.',
    },
  },
});

const cy: typeof en = ({ isDivorce }: CommonContent) => ({
  title: 'Manylion yr achosion cyfreithiol eraill',
  line1: `Mae angen i'r llys wybod manylion yr achosion cyfreithiol eraill sy'n ymwneud â'ch ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  }.
  Darparwch cymaint o wybodaeth â phosibl, megis: `,
  point1: 'enwau’r bobl sydd ynghlwm â’r achos',
  point2: 'rhif(au) yr achos(ion)',
  point3: 'os yw’r achosion yn mynd rhagddynt neu os ydynt wedi gorffen',
  point4: 'beth yw diben yr achosion',
  point5: 'enw a chyfeiriad y llys, gan gynnwys y wlad',
  point6: 'y dyddiad y dechreuodd yr achosion',
  point7: "dyddiadau unrhyw wrandawiadau sydd wedi'u trefnu ",
  point8: 'manylion unrhyw orchmynion sydd wedi’u gwneud',
  legalProceedingsDetails: 'Rhowch fanylion am yr achosion cyfreithiol eraill.',
  legalProceedingsConcluded: "A yw'r achos wedi'i gwblhau?",
  yes: 'Ydw',
  no: 'Nac ydw',
  unableToUploadEvidence: 'Ni allaf lwytho rhai o fy nogfennau / fy holl ddogfennau.',
  uploadAFile: 'Llwytho ffeil',
  chooseFileButtonText: 'Dewis ffeil',
  noFileChosen: "Dim ffeil wedi'i dewis",
  uploadedFiles: 'Ffeiliau sydd wedi cael eu llwytho',
  noFilesUploaded: 'Nid oes ffeiliau wedi cael eu llwytho',
  legalProceedingsConcludedEvidence:
    'Bydd rhaid i chi uwchlwytho tystiolaeth i ddangos bod yr achos wedi’i gwblhau neu wedi’i dynnu’n ôl. Er enghraifft, gorchymyn neu e-bost cadarnhad gan y llys yn dweud bod yr achos wedi’i gwblhau neu wedi’i dynnu’n ôl.',
  legalProceedingsOngoingEvidence:
    'Bydd rhaid i chi uwchlwytho tystiolaeth i ddangos bod yr achos yn parhau. Er enghraifft, e-bost neu hysbysiad gan y llys bod yr achos yn dal i fynd rhagddo.',
  errors: {
    applicant1LegalProceedingsDetails: {
      required:
        'Nid ydych wedi darparu unrhyw wybodaeth. Mae angen i chi nodi manylion yr achosion cyfreithiol eraill.',
    },
    applicant2LegalProceedingUploadedFiles: {
      notUploaded:
        "Rhaid i chi uwchlwytho'ch dogfennau, neu ddewis 'Ni allaf uwchlwytho rhai neu'r cyfan o'm dogfennau' cyn parhau.",
      errorUploading:
        'Ni chafodd eich ffeil ei huwchlwytho oherwydd bod y gwasanaeth yn profi problemau technegol. Ceisiwch uwchlwytho eich ffeil eto.',
      fileSizeTooBig:
        "Mae'r ffeil rydych wedi'i huwchlwytho yn rhy fawr. Gwnewch y ffeil yn llai na 10MB a cheisiwch ei huwchlwytho eto.",
      fileWrongFormat:
        "Ni allwch uwchlwytho ffeil yn y fformat hwnnw. Cadwch y ffeil gan ddefnyddio un o'r fformatau a dderbynnir a cheisiwch ei huwchlwytho eto.",
    },
    applicant2UnableToUploadEvidence: {
      notUploaded:
        "Rhaid i chi uwchlwytho'ch dogfennau, neu ddewis 'Ni allaf uwchlwytho rhai neu'r cyfan o'm dogfennau' cyn parhau.",
    },
    applicant2LegalProceedingsConcluded: {
      required: "Rhaid i chi ddewis a yw'r achos parhaus wedi dod i ben.",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1LegalProceedingsDetails: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.legalProceedingsDetails,
      labelSize: 'normal',
      validator: isFieldFilledIn,
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
