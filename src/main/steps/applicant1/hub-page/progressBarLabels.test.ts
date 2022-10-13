import { State } from '../../../app/case/definition';
import { currentStateFn } from '../../state-sequence';

import { getProgressBarContent } from './progressBarLabels';

describe('getProgressBarContent', () => {
  test('should return english divorce progress bar labels', () => {
    const displayState = currentStateFn(State.Submitted);
    const labels = getProgressBarContent(true, displayState, true);
    expect(labels).toEqual({
      submitted: 'Submitted',
      weeksToResponse: '4 weeks',
      response: 'Response',
      weeksToConditionalOrder: '20 weeks',
      conditionalOrder: 'Conditional order',
      weeksToFinalOrder: '6 weeks',
      finalOrder: 'Final order (Divorced)',
      progressBarAriaLabel:
        'A progress bar showing the application has been submitted. The next steps are receiving a response, a conditional order being granted and a final order being granted, which is the last stage in the process. The next steps are not complete yet.',
    });
  });

  test('should return english civil progress bar labels', () => {
    const displayState = currentStateFn(State.Submitted);
    const labels = getProgressBarContent(false, displayState, true);
    expect(labels).toEqual({
      submitted: 'Submitted',
      weeksToResponse: '4 weeks',
      response: 'Response',
      weeksToConditionalOrder: '20 weeks',
      conditionalOrder: 'Conditional order',
      weeksToFinalOrder: '6 weeks',
      finalOrder: 'Final order (Civil partnership ended)',
      progressBarAriaLabel:
        'A progress bar showing the application has been submitted. The next steps are receiving a response, a conditional order being granted and a final order being granted, which is the last stage in the process. The next steps are not complete yet.',
    });
  });

  test('should return welsh divorce progress bar labels', () => {
    const displayState = currentStateFn(State.Submitted);
    const labels = getProgressBarContent(true, displayState, false);
    expect(labels).toEqual({
      submitted: "Wedi'i gyflwyno",
      weeksToResponse: '2 wythnos',
      response: 'Ymateb',
      weeksToConditionalOrder: '20 wythnos',
      conditionalOrder: 'Gorchymyn amodol',
      weeksToFinalOrder: '6 wythnos',
      finalOrder: 'Gorchymyn terfynol (Wedi ysgaru)',
      progressBarAriaLabel:
        'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno. Y camau nesaf yw cael ymateb, gorchymyn amodol yn cael ei gymeradwyo a gorchymyn terfynol yn cael ei gymeradwyo, sef y cam olaf o’r broses. Nid yw’r camau nesaf wedi’u cwblhau eto.',
    });
  });

  test('should return welsh civil progress bar labels', () => {
    const displayState = currentStateFn(State.Submitted);
    const labels = getProgressBarContent(false, displayState, false);
    expect(labels).toEqual({
      submitted: "Wedi'i gyflwyno",
      weeksToResponse: '2 wythnos',
      response: 'Ymateb',
      weeksToConditionalOrder: '20 wythnos',
      conditionalOrder: 'Gorchymyn amodol',
      weeksToFinalOrder: '6 wythnos',
      finalOrder: 'Gorchymyn terfynol (Partneriaeth sifil wedi dod i ben)',
      progressBarAriaLabel:
        'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno. Y camau nesaf yw cael ymateb, gorchymyn amodol yn cael ei gymeradwyo a gorchymyn terfynol yn cael ei gymeradwyo, sef y cam olaf o’r broses. Nid yw’r camau nesaf wedi’u cwblhau eto.',
    });
  });

  test('should return submitted arial label', () => {
    const displayState = currentStateFn(State.Submitted);
    const labels = getProgressBarContent(true, displayState, true);
    expect(labels).toMatchObject({
      progressBarAriaLabel:
        'A progress bar showing the application has been submitted. The next steps are receiving a response, a conditional order being granted and a final order being granted, which is the last stage in the process. The next steps are not complete yet.',
    });
  });

  test('should return response arial label', () => {
    const displayState = currentStateFn(State.Holding);
    const labels = getProgressBarContent(true, displayState, true);
    expect(labels).toMatchObject({
      progressBarAriaLabel:
        'A progress bar showing the application has been submitted and the response has been received. The next steps show a conditional order being granted and a final order being granted, which is the last stage in the process. The next steps are not complete yet.',
    });
  });

  test('should return conditional order arial label', () => {
    const displayState = currentStateFn(State.AwaitingFinalOrder);
    const labels = getProgressBarContent(true, displayState, true);
    expect(labels).toMatchObject({
      progressBarAriaLabel:
        'A progress bar showing the application has been submitted, the response has been received and a conditional order has been granted. The next step shows a final order being granted, which is the final stage in the process. This step is not complete yet.',
    });
  });

  test('should return final order arial label', () => {
    const displayState = currentStateFn(State.FinalOrderComplete);
    const labels = getProgressBarContent(true, displayState, true);
    expect(labels).toMatchObject({
      progressBarAriaLabel:
        'A progress bar showing the application has been submitted, the response has been received, a conditional order has been granted and a final order has been granted. All steps are now complete.',
    });
  });

  test('should return submitted arial label in welsh', () => {
    const displayState = currentStateFn(State.Submitted);
    const labels = getProgressBarContent(true, displayState, false);
    expect(labels).toMatchObject({
      progressBarAriaLabel:
        'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno. Y camau nesaf yw cael ymateb, gorchymyn amodol yn cael ei gymeradwyo a gorchymyn terfynol yn cael ei gymeradwyo, sef y cam olaf o’r broses. Nid yw’r camau nesaf wedi’u cwblhau eto.',
    });
  });

  test('should return response arial label in welsh', () => {
    const displayState = currentStateFn(State.Holding);
    const labels = getProgressBarContent(true, displayState, false);
    expect(labels).toMatchObject({
      progressBarAriaLabel:
        'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno a bod yr ymateb wedi dod i law. Mae’r camau nesaf yn dangos gorchymyn amodol yn cael ei gymeradwyo a gorchymyn terfynol yn cael ei gymeradwyo, sef y cam olaf yn y broses. Nid yw’r camau nesaf wedi’u cwblhau eto.',
    });
  });

  test('should return conditional order arial label in welsh', () => {
    const displayState = currentStateFn(State.AwaitingFinalOrder);
    const labels = getProgressBarContent(true, displayState, false);
    expect(labels).toMatchObject({
      progressBarAriaLabel:
        'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno, mae’r ymateb wedi dod i law, ac mae gorchymyn amodol wedi’i gymeradwyo.  Mae’r cam nesaf yn dangos y gorchymyn terfynol yn cael ei gymeradwyo, sef y cam olaf o’r broses. Nid yw cam hwn wedi’i gwblhau eto.',
    });
  });

  test('should return final order arial label in welsh', () => {
    const displayState = currentStateFn(State.FinalOrderComplete);
    const labels = getProgressBarContent(true, displayState, false);
    expect(labels).toMatchObject({
      progressBarAriaLabel:
        'Bar cynnydd yn dangos bod y cais wedi’i gyflwyno, mae’r ymateb wedi dod i law, mae gorchymyn amodol wedi’i gymeradwyo ac mae gorchymyn terfynol wedi’i gymeradwyo. Mae’r holl gamau wedi’u cwblhau bellach.',
    });
  });
});
