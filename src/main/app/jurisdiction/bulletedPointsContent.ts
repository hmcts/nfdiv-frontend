import { JurisdictionConnections } from '../case/definition';

export const enConnectionBulletPointsSummarisedForAllUsers = (
  connections: JurisdictionConnections[],
  isDivorce: boolean,
  isJointApplication: boolean
): string[] => {
  const connectionBulletPoints = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: `both parties to the ${
      isDivorce ? 'marriage' : 'civil partnership'
    } are habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `both parties to the ${
      isDivorce ? 'marriage' : 'civil partnership'
    } were last habitually resident in England and Wales and one of them continues to reside there`,
    [JurisdictionConnections.APP_2_RESIDENT_SOLE]: 'the respondent is habitually resident in England and Wales',
    [JurisdictionConnections.APP_2_RESIDENT_JOINT]: 'applicant 2 is habitually resident in England and Wales',
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: `${
      isJointApplication ? 'applicant 1' : 'the applicant'
    } is habitually resident in England and Wales
      and has resided there for at least one year immediately before the application was made`,
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]: `${
      isJointApplication ? 'applicant 1' : 'the applicant'
    } is domiciled and habitually resident in England
      and Wales and has resided there for at least six months immediately before the application was made`,
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `both parties to the ${
      isDivorce ? 'marriage' : 'civil partnership'
    }
     are domiciled in England and Wales`,
    [JurisdictionConnections.APP_1_DOMICILED]: `only ${
      isJointApplication ? 'applicant 1' : 'the applicant'
    } is domiciled in England and Wales`,
    [JurisdictionConnections.APP_2_DOMICILED]: `only ${
      isJointApplication ? 'applicant 2' : 'the respondent'
    } is domiciled in England and Wales`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION_CP]:
      'the parties registered as civil partners of each other in ' +
      'England or Wales and it would be in the interest of justice for the court to assume jurisdiction in this case',
    [JurisdictionConnections.RESIDUAL_JURISDICTION_D]:
      'the parties married each other under the law of England and ' +
      'Wales and it would be in the interests of justice for the court to assume jurisdiction in this case',
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: 'applicant 1 is habitually resident in England and Wales',
  };

  return connections.map(connection => connectionBulletPoints[connection]);
};

export const cyConnectionBulletPointsSummarisedForAllUsers = (
  connections: JurisdictionConnections[],
  isDivorce: boolean,
  isJointApplication: boolean
): string[] => {
  const connectionBulletPoints = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: `mae’r ddau barti i’r ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    } yn preswylio’n arferol yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `roedd y ddau barti i’r ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    } yn preswylio’n arferol ddiwethaf yng Nghymru a Lloegr, ac mae un ohonynt yn parhau i fyw yno`,
    [JurisdictionConnections.APP_2_RESIDENT_SOLE]: 'mae’r atebydd yn preswylio’n arferol yng Nghymru a Lloegr',
    [JurisdictionConnections.APP_2_RESIDENT_JOINT]: 'mae’r 2il geisydd yn preswylio’n arferol yng Nghymru Lloegr',
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: `${
      isJointApplication ? 'ceisydd 1af' : 'mae’r ceisydd'
    } yn preswylio’n arferol yng Nghymru a Lloegr,
      ac mae wedi preswylio yno am o leiaf blwyddyn yn union cyn gwneud y cais`,
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]: `mae domisil ${
      isJointApplication ? 'y ceisydd 1af' : 'y ceisydd'
    } yng Nghymru a Lloegr, mae’n preswylio’n arferol yno,
      ac mae wedi preswylio yno am o leiaf chwe mis yn union cyn gwneud y cais`,
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `mae domisil y ddau barti i’r ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    }
     yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_1_DOMICILED]: `dim ond domisil ${
      isJointApplication ? 'ceisydd 1af' : 'y ceisydd'
    } sydd yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_2_DOMICILED]: `dim ond domisil ${
      isJointApplication ? 'yr 2il geisydd' : 'atebydd'
    } sydd yng Nghymru a Lloegr`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION_CP]:
      'mi wnaeth y partïon gofrestru fel partneriaid sifil i’w gilydd yng Nghymru neu Loegr, a byddai er budd cyfiawnder i’r llys ysgwyddo awdurdodaeth yn yr achos hwn',
    [JurisdictionConnections.RESIDUAL_JURISDICTION_D]:
      'mi wnaeth y partïon briodi ei gilydd o dan gyfraith Cymru a Lloegr, a byddai er budd cyfiawnder i’r llys ysgwyddo awdurdodaeth yn yr achos hwn',
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: 'mae’r ceisydd 1af yn preswylio’n arferol yng Nghymru a Lloegr',
  };

  return connections.map(connection => connectionBulletPoints[connection]);
};

export const enConnectionUserReads = (
  partner: string,
  isDivorce: boolean,
  isJointApplication: boolean
): Record<string, string> => {
  return {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: `you and your ${partner} are habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `you and your ${partner} were last habitually resident in England and Wales and one of you continues to reside there`,
    [JurisdictionConnections.APP_2_RESIDENT_SOLE]: `your ${partner} is habitually resident in England and Wales`,
    [JurisdictionConnections.APP_2_RESIDENT_JOINT]: `your ${partner} is habitually resident in England and Wales`,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: `you ${isJointApplication ? `or your ${partner} ` : ''}are
    habitually resident in England and Wales and have resided there for at least one year
    immediately before making this application`,
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]: `you ${
      isJointApplication ? `or your ${partner} ` : ''
    }are domiciled
    and habitually resident in England and Wales and have resided there for at least six months immediately before making this application`,
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `you and your ${partner} are domiciled in England and Wales`,
    [JurisdictionConnections.APP_1_DOMICILED]: 'only you are domiciled in England and Wales',
    [JurisdictionConnections.APP_2_DOMICILED]: `only your ${partner} is domiciled in England and Wales`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION_CP]:
      'you and your civil partner registered your civil partnership in ' +
      'England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case',
    [JurisdictionConnections.RESIDUAL_JURISDICTION_D]: `you and your ${partner} married each other in England and Wales
    and it would be in the interests of justice for the court to assume jurisdiction in this case`,
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: 'you are habitually resident in England and Wales',
  };
};

export const cyConnectionUserReads = (
  partner: string,
  isDivorce: boolean,
  isJointApplication: boolean
): Record<string, string> => {
  return {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: `rydych chi a’ch ${partner} yn preswylio’n arferol yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `roeddech chi a’ch ${partner} yn preswylio’n arferol ddiwethaf yng Nghymru a Lloegr, ac mae un ohonoch yn parhau i breswylio yno`,
    [JurisdictionConnections.APP_2_RESIDENT_SOLE]: `mae eich ${partner} yn preswylio’n arferol yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_2_RESIDENT_JOINT]: `mae eich ${partner} yn preswylio’n arferol yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: `Rydych ${isJointApplication ? `chi neu'ch ${partner}` : ''}
    yn preswylio'n arferol yng Nghymru a Lloegr ac wedi preswylio yno am o leiaf blwyddyn yn union cyn gwneud y cais hwn`,
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]: `Rydych ${
      isJointApplication ? `chi neu'ch ${partner}` : ''
    } â'ch domisil, ac yn preswylio'n arferol, yng Nghymru a Lloegr ac wedi preswylio yno am o leiaf chwe mis yn union cyn gwneud y cais hwn`, // todo same as above
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `mae eich domisil chi a domisil eich ${partner} yng Nghymru a Lloegr`,
    [JurisdictionConnections.APP_1_DOMICILED]: 'dim ond eich domisil chi sydd yng Nghymru a Lloegr',
    [JurisdictionConnections.APP_2_DOMICILED]: `Dim ond domisil eich ${partner} sydd yng Nghymru a Lloegr`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION_CP]: `Mi wnaethoch chi a’ch partner sifil gofrestru eich partneriaeth sifil yng Nghymru a Lloegr,
    a byddai er budd cyfiawnder i'r llys ysgwyddo awdurdodaeth yn yr achos hwn`,
    [JurisdictionConnections.RESIDUAL_JURISDICTION_D]: `Mi wnaethoch chi a’ch ${partner} briodi eich gilydd yng
      Nghymru a Lloegr, a byddai er budd cyfiawnder i’r llys ysgwyddo awdurdodaeth yn yr achos hwn`,
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: 'rydych yn preswylio’n arferol yng Nghymru a Lloegr',
  };
};

export const connectionBulletPointsUserReads = (
  connections: JurisdictionConnections[],
  partner: string,
  isDivorce: boolean,
  isJointApplication: boolean,
  isEnglish: boolean
): string => {
  let bulletPointText = '<ul class="govuk-list govuk-list--bullet">';

  const connectionUserReads = isEnglish ? enConnectionUserReads : cyConnectionUserReads;

  for (const index in connections) {
    bulletPointText +=
      '<li>' + connectionUserReads(partner, isDivorce, isJointApplication)[connections[index]] + '</li>';
  }

  return bulletPointText + '</ul>';
};
