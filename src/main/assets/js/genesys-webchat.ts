const genesysConfig = {};
const genesysConfigId = 'genesysConfig';
const requiredConfigAttributes = [
  'genesysPopupBlocked',
  'genesysHtml',
  'genesysKervBaseUrl',
  'genesysDeploymentId',
  'genesysApiKey',
];

function getGenesysConfig(configElemId: string, requiredAttributes: string[]): boolean {
  if (requiredAttributes.length < 1) {
    console.error('No required attributes provided.');
    return false;
  }
  const genesysConfigElem = document.getElementById(configElemId);
  if (!genesysConfigElem) {
    console.error('Genesys configuration element not found.');
    return false;
  }
  const missingAttributes: string[] = [];
  requiredAttributes.forEach(attribute => {
    const value = genesysConfigElem.getAttribute('data-' + attribute);
    if (value) {
      genesysConfig[attribute] = value;
    } else {
      missingAttributes.push(attribute);
    }
  });
  if (missingAttributes.length > 0) {
    console.error('Missing required attributes:', missingAttributes.join(', '));
    return false;
  }
  return true;
}

/* ---------------------------------------------------------------
       Open‑chat popup
    --------------------------------------------------------------- */
function attachStartChatHandler() {
  const link = document.getElementById('startChatLink');
  if (!link) {
    return;
  }

  link.addEventListener('click', e => {
    e.preventDefault();
    const popup = window.open('', 'GenesysChatWindow', 'width=420,height=600');
    if (!popup) {
      alert(genesysConfig['genesysPopupBlocked']);
      return;
    }

    /* build the popup document in one go */
    // const genesysHTML = `{% include genesys-popup.njk %}`;

    popup.document.body = genesysConfig['genesysHTML'];
    // popup.document.open();
    // popup.document.write(genesysHTML);
    // popup.document.close();
  });
}

/* ---------------------------------------------------------------
   Availability checker (polls your service)
--------------------------------------------------------------- */
async function checkChatAvailability(maxRetries = 5, initialDelay = 1000) {
  const URL = genesysConfig['genesysKervBaseUrl'] + '?deploymentId=' + genesysConfig['genesysDeploymentId'];
  let attempt = 0;
  let delay = initialDelay;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'x-api': genesysConfig['genesysApiKey'],
          Accept: 'application/json',
        },
      });

      if (response.status === 429) {
        console.warn(`🚫 Rate‑limited; retrying in ${delay} ms …`);
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
        attempt++;
        continue;
      }

      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }

      const data = await response.json();
      console.log(data.Status);
      return data.Status;
    } catch (err) {
      if (attempt >= maxRetries - 1) {
        console.error('❌ Final error after retries:', err);
        return 'Error';
      }
      console.warn(`⚠️  Attempt ${attempt + 1} failed; retrying in ${delay} ms …`);
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
      attempt++;
    }
  }
  return 'Error';
}

/* ---------------------------------------------------------------
   Widget templates
--------------------------------------------------------------- */
const widgetTemplates = {
  templates: {
    spinner: document.getElementById('genesysSpinner'),
    open: document.getElementById('genesysOpenWidget'),
    busyNoAgents: document.getElementById('genesysBusyNoAgentsWidget'),
    busyEWT: document.getElementById('genesysBusyEWTWidget'),
    closed: document.getElementById('genesysClosedWidget'),
    error: document.getElementById('genesysErrorWidget'),
    errorCheckingAvailability: document.getElementById('genesysErrorCheckingAvailabilityWidget'),
  },
  hideAll: () => {
    Object.values(widgetTemplates.templates).forEach(widget => {
      if (widget) {
        widget.classList.add('hidden');
      }
    });
  },
  show: key => {
    widgetTemplates.hideAll();
    if (widgetTemplates.templates[key]) {
      widgetTemplates.templates[key].classList.remove('hidden');
    }
  },
  closedReason: reason => {
    const closedReason = document.getElementById('genesysWebchatClosedReason');
    if (closedReason) {
      closedReason.innerHTML = reason ? ` (${reason})` : '';
    }
  },
};

function renderSpinner() {
  widgetTemplates.show('spinner');
}

function renderOpenWidget() {
  widgetTemplates.show('open');
}

function renderBusyNoAgentsWidget() {
  widgetTemplates.show('busyNoAgents');
}

function renderBusyEWTWidget() {
  widgetTemplates.show('busyEWT');
}

function renderClosedWidget(reason) {
  widgetTemplates.closedReason(reason);
  widgetTemplates.show('closed');
}

function renderErrorWidget() {
  widgetTemplates.show('error');
}

function renderErrorCheckingAvailabilityWidget() {
  widgetTemplates.show('errorCheckingAvailability');
}

/* ---------------------------------------------------------------
   Switch placeholder to correct widget
--------------------------------------------------------------- */
function updateChatWidget(status) {
  switch (status) {
    case 'Open':
      renderOpenWidget();
      attachStartChatHandler();
      break;
    case 'BusyNoAgents':
      renderBusyNoAgentsWidget();
      break;
    case 'BusyEWT':
      renderBusyEWTWidget();
      break;
    case 'Closed':
    case 'Holiday':
    case 'Emergency':
      renderClosedWidget(status);
      break;
    case 'Error':
    default:
      renderErrorWidget();
      break;
  }
}

/* ---------------------------------------------------------------
   Bootstrap on DOM ready
--------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', async () => {
  if (!getGenesysConfig(genesysConfigId, requiredConfigAttributes)){
    return;
  }
  // const chatContent = document.getElementById('chatContent');
  // chatContent.innerHTML = '<p><span class="genesys-spinner"></span>{{ checkingAvailability }}</p>';
  renderSpinner();

  try {
    const status = await checkChatAvailability();
    updateChatWidget(status);
  } catch (err) {
    console.error('Error checking availability:', err);
    // chatContent.innerHTML = `
    //     <p>Sorry, we couldn’t check the availability of our team.</p>
    //     <p>Please try refreshing the page or contact us at <a class="govuk-link" href="mailto:help@gov.uk">help@gov.uk</a>.</p>`;
    renderErrorCheckingAvailabilityWidget();
  }
});
