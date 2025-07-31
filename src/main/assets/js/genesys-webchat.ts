const genesysConfig = {};
const genesysConfigId = 'genesysConfig';
const requiredConfigAttributes = [
  'genesysPopupBlocked',
  'genesysKervBaseUrl',
  'genesysDeploymentId',
  'genesysApiKey',
  'genesysChatWithUs',
  'genesysBaseUrl',
  'genesysEnvironment',
  'genesysReferrerPage',
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
    const value = genesysConfigElem.getAttribute('data-' + attribute.toLowerCase());
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
    const genesysHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${genesysConfig['genesysChatWithUs']}</title>
  <script type="text/javascript">
    (function (g, e, n, es) {
      g._genesysJs = e;
      g[e] = g[e] || function () { (g[e].q = g[e].q || []).push(arguments); };
      g[e].t = Date.now();
      g[e].c = es;

      /* inject the Genesys bootstrap script */
      var s = document.createElement('script');
      s.async = true;
      s.src   = n;
      document.head.appendChild(s);
    })(window, 'Genesys',
       '${genesysConfig['genesysBaseUrl']}/genesys-bootstrap/genesys.min.js',
       { environment: '${genesysConfig['genesysEnvironment']}', deploymentId: '${genesysConfig['genesysDeploymentId']}'});

    Genesys("command", "Database.set", {
      messaging: { customAttributes: { webReferrerPage: '${genesysConfig['genesysReferrerPage']}'}}
          },
      function(data){ /* fulfilled, returns data */}, function(){ /* rejected */ }
    );

    window.addEventListener('load', function () {
      Genesys('subscribe', 'Messenger.ready', function () {
        Genesys('command', 'Messenger.open');
      });
    });
  </script>
</head>
<body class="genesys-popup-body">
  <div id="genesys-web-messaging"></div>
</body>
</html>`;

    popup.document.open();
    popup.document.write(genesysHTML);
    popup.document.close();
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
const widgets = {
  elements: {
    spinner: document.getElementById('genesysSpinner'),
    open: document.getElementById('genesysOpenWidget'),
    busyNoAgents: document.getElementById('genesysBusyNoAgentsWidget'),
    busyEWT: document.getElementById('genesysBusyEWTWidget'),
    closed: document.getElementById('genesysClosedWidget'),
    error: document.getElementById('genesysErrorWidget'),
    errorCheckingAvailability: document.getElementById('genesysErrorCheckingAvailabilityWidget'),
  },
  hideAll: () => {
    Object.values(widgets.elements).forEach(widget => {
      if (widget) {
        widget.classList.add('hidden');
      }
    });
  },
  show: key => {
    widgets.hideAll();
    if (widgets.elements[key]) {
      widgets.elements[key].classList.remove('hidden');
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
  widgets.show('spinner');
}

function renderOpenWidget() {
  widgets.show('open');
}

function renderBusyNoAgentsWidget() {
  widgets.show('busyNoAgents');
}

function renderBusyEWTWidget() {
  widgets.show('busyEWT');
}

function renderClosedWidget(reason) {
  widgets.closedReason(reason);
  widgets.show('closed');
}

function renderErrorWidget() {
  widgets.show('error');
}

function renderErrorCheckingAvailabilityWidget() {
  widgets.show('errorCheckingAvailability');
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
  if (!getGenesysConfig(genesysConfigId, requiredConfigAttributes)) {
    console.error('Error loading Genesys configuration.');
    return;
  }
  renderSpinner();

  try {
    const status = await checkChatAvailability();
    updateChatWidget(status);
  } catch (err) {
    console.error('Error checking availability:', err);
    renderErrorCheckingAvailabilityWidget();
  }
});
