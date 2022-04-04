function initAvayaWebchat() {
  let popupWin;
  function windowOpener(url, name, args) {
    if (typeof popupWin !== 'object' || popupWin.closed) {
      popupWin = window.open(url, name, args);
    } else {
      popupWin.location.href = url;
    }

    popupWin.focus();
  }

  const avayaWebchat = document.querySelector('#avayaWebchatMetric') as HTMLElement;
  const avayaAgentBusy = document.querySelector('#webchat-agent-busy') as HTMLElement;
  const avayaWebchatOpen = document.querySelector('#avaya-webchat-open') as HTMLElement;
  const avayaWebchatClose = document.querySelector('#avaya-webchat-close') as HTMLElement;
  const avayaWebchatMaintenance = document.querySelector('#webchat-maintenance') as HTMLElement;

  if (avayaAgentBusy) {
    avayaAgentBusy.hidden = true;
  }

  if (avayaWebchatOpen) {
    avayaWebchatOpen.hidden = true;
  }

  if (avayaWebchatClose) {
    avayaWebchatClose.hidden = true;
  }

  if (avayaWebchatMaintenance) {
    avayaWebchatMaintenance.hidden = false;
  }

  if (avayaWebchat) {
    avayaWebchat.hidden = true;
    avayaWebchat.addEventListener('metrics', function (metrics) {
      const metricsDetail = (<CustomEvent>metrics).detail;
      const ccState = metricsDetail.contactCenterState;

      avayaWebchatOpen.hidden = true;
      avayaAgentBusy.hidden = true;
      avayaWebchatClose.hidden = true;
      avayaWebchatMaintenance.hidden = true;
      if (ccState === 'Open') {
        if (ccState) {
          avayaWebchatOpen.hidden = false;
        } else {
          avayaAgentBusy.hidden = false;
        }
      } else {
        avayaWebchatClose.hidden = false;
      }
    });
  }

  const avayaWebChatLink = document.querySelector('#avaya-webchat-link');
  if (avayaWebChatLink) {
    avayaWebChatLink.addEventListener('click', function () {
      windowOpener(
        '/webchat',
        'Web Chat',
        'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=350,height=580,left=100,top=100'
      );
    });
  }
}
initAvayaWebchat();
