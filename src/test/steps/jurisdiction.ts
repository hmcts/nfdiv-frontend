import { Checkbox } from '../../main/app/case/case';
import {
  ApplicationType,
  DivorceOrDissolution,
  Gender,
  JurisdictionConnections,
  YesOrNo,
} from '../../main/app/case/definition';
import { CHECK_JURISDICTION, HOW_DO_YOU_WANT_TO_APPLY } from '../../main/steps/urls';

import { caseworkerResetsJurisdictionConnections, iUpdateTheCase } from './commonHelpers/case-interaction';
import {
  iCheckOptionValueForField,
  iClearTheForm,
  iClickElement,
  iClickSubmit,
  iDontSeeElementInDOM,
  iSelectRadioValue,
  iSelectYesOrNoForField,
  iWaitForVisible,
} from './commonHelpers/element-interaction';
import {
  getJointDivorceJurisdictionConnections,
  getSoleDivorceJurisdictionConnections,
  lookupJurisdictionConnection,
} from './commonHelpers/jurisdiction-connection-lookup';
import { iAmOnPage, iClickToNavigate } from './commonHelpers/navigation';
import { getApplicantString, getOtherApplicantString } from './commonHelpers/user-interaction';

const CHECK_JURISDICTION_LINK_SELECTOR = `a[href="${CHECK_JURISDICTION}"]`;

export const iDenyWeLiveInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.NO, 'applicant1LifeBasedInEnglandAndWales');
  iSelectYesOrNoForField(YesOrNo.NO, 'applicant2LifeBasedInEnglandAndWales');
};
export const iConfirmWeAreDomiciledInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.YES, 'applicant1DomicileInEnglandWales');
  iSelectYesOrNoForField(YesOrNo.YES, 'applicant2DomicileInEnglandWales');
};
export const iDenyWeAreDomiciledInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.NO, 'applicant1DomicileInEnglandWales');
  iSelectYesOrNoForField(YesOrNo.NO, 'applicant2DomicileInEnglandWales');
};
export const onlyPartnerLivesInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.NO, `${getApplicantString()}LifeBasedInEnglandAndWales`);
  iSelectYesOrNoForField(YesOrNo.YES, `${getOtherApplicantString()}LifeBasedInEnglandAndWales`);
};
export const onlyILiveInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.YES, `${getApplicantString()}LifeBasedInEnglandAndWales`);
  iSelectYesOrNoForField(YesOrNo.NO, `${getOtherApplicantString()}LifeBasedInEnglandAndWales`);
};
export const onlyIAmDomiciledInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.YES, `${getApplicantString()}DomicileInEnglandWales`);
  iSelectYesOrNoForField(YesOrNo.NO, `${getOtherApplicantString()}DomicileInEnglandWales`);
};
export const onlyPartnerIsDomiciledInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.NO, `${getApplicantString()}DomicileInEnglandWales`);
  iSelectYesOrNoForField(YesOrNo.YES, `${getOtherApplicantString()}DomicileInEnglandWales`);
};

export const iClickCheckJurisdictionLink = async (nextUrl?: string | RegExp, wait?: number): Promise<void> => {
  await iClickToNavigate(CHECK_JURISDICTION_LINK_SELECTOR, wait, nextUrl || CHECK_JURISDICTION);
};

export const iClickMoreDetailsComponent = (): void => {
  iClickElement("span[class='govuk-details__summary-text']");
};

const parseConnections = (csvConnections: string): JurisdictionConnections[] => {
  return csvConnections.split(',').map(value => lookupJurisdictionConnection(value.trim()));
};

const validateOtherConnectionsElements = (
  connections: JurisdictionConnections[],
  baseConnections: JurisdictionConnections[]
): void => {
  baseConnections.forEach(baseConnection => {
    if (!connections.includes(baseConnection)) {
      iDontSeeConnectionsText(baseConnection);
    }
  });
};

const validateOtherSoleDivorceConnectionsElements = (connections: JurisdictionConnections[]): void => {
  const connectionsValues = getSoleDivorceJurisdictionConnections();
  validateOtherConnectionsElements(connections, connectionsValues);
};

const validateOtherJointDivorceConnectionsElements = (connections: JurisdictionConnections[]): void => {
  const connectionsValues = getJointDivorceJurisdictionConnections();
  validateOtherConnectionsElements(connections, connectionsValues);
};

export const iSeeConnectionsTextParagraph = (connectionValue: JurisdictionConnections): void => {
  iWaitForVisible(`p#connection-${connectionValue}`);
};
export const iSeeConnectionsTextListItem = (connectionValue: JurisdictionConnections): void => {
  iWaitForVisible(`li#connection-${connectionValue}`);
};
export const iDontSeeConnectionsText = (connectionValue: JurisdictionConnections): void => {
  iDontSeeElementInDOM(`#connection-${connectionValue}`);
};
export const iDontSeeConnectionsCheckbox = (connectionValue: JurisdictionConnections): void => {
  iDontSeeElementInDOM(`input.govuk-checkboxes__input[name="connections"][value="${connectionValue}"]`);
};

export const thePageShouldIncludeConnectionContent = (
  connectionValue: string,
  validateOther:
    typeof validateOtherSoleDivorceConnectionsElements | typeof validateOtherJointDivorceConnectionsElements
): void => {
  const jurisdictionConnections = parseConnections(connectionValue);

  if (jurisdictionConnections.length === 1) {
    iSeeConnectionsTextParagraph(jurisdictionConnections[0]);
    iDontSeeConnectionsCheckbox(jurisdictionConnections[0]);
  } else {
    jurisdictionConnections.forEach(connection => {
      iSeeConnectionsTextListItem(connection);
      iDontSeeConnectionsCheckbox(connection);
    });
  }

  validateOther(jurisdictionConnections);
};

export const iCheckJurisdictionConnection = (connectionValue: JurisdictionConnections, wait?: number): void => {
  iCheckOptionValueForField(connectionValue, 'connections', wait);
};

Given("I've completed all questions correctly to get to the jurisdiction section", async () => {
  await iUpdateTheCase({
    applicationType: ApplicationType.SOLE_APPLICATION,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    gender: Gender.MALE,
    hasCertificate: YesOrNo.YES,
    applicant1HelpPayingNeeded: YesOrNo.NO,
    inTheUk: YesOrNo.YES,
    relationshipDate: { day: '31', month: '12', year: '1999' },
    sameSex: Checkbox.Unchecked,
    applicant1ScreenHasUnionBroken: YesOrNo.YES,
    applicant1FirstNames: 'Functional',
    applicant1LastNames: 'Tests',
    applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
    applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
  });
  iAmOnPage(CHECK_JURISDICTION);
  await iClickSubmit();
});

When('I reset the jurisdiction connections', async () => {
  await caseworkerResetsJurisdictionConnections();
  iAmOnPage(CHECK_JURISDICTION);
  await iClickSubmit();
});

Given('neither of us live in England or Wales', iDenyWeLiveInEnglandOrWales);

Given('neither of us are domiciled in England or Wales', iDenyWeAreDomiciledInEnglandOrWales);

Given('we are both domiciled in England or Wales', iConfirmWeAreDomiciledInEnglandOrWales);

Given('only my partner lives in England or Wales', onlyPartnerLivesInEnglandOrWales);

Given('only I live in England or Wales', onlyILiveInEnglandOrWales);

Given('only I am domiciled in England or Wales', onlyIAmDomiciledInEnglandOrWales);

Given('only my partner is domiciled in England or Wales', onlyPartnerIsDomiciledInEnglandOrWales);

When('I click to check how we are connected to England or Wales again', iClickCheckJurisdictionLink);

Given("I've said I'm making a joint application", async () => {
  iAmOnPage(HOW_DO_YOU_WANT_TO_APPLY);
  await iClearTheForm();
  iSelectRadioValue(ApplicationType.JOINT_APPLICATION);
  await iClickSubmit();
});

Given('the page should include sole divorce connection content {string}', (connectionValue: string) => {
  thePageShouldIncludeConnectionContent(connectionValue, validateOtherSoleDivorceConnectionsElements);
});

Given('the page should include joint divorce connection content {string}', (connectionValue: string) => {
  thePageShouldIncludeConnectionContent(connectionValue, validateOtherJointDivorceConnectionsElements);
});

When('I click for more details', iClickMoreDetailsComponent);
Given('my husband is habitually resident in England and Wales', () => {
  iCheckJurisdictionConnection(JurisdictionConnections.APP_2_RESIDENT_SOLE);
});
