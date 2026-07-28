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
  'genesysNonce',
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
    <script nonce="${genesysConfig['genesysNonce']}" type="text/javascript">
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

      Genesys("subscribe", "Messenger.ready", function () {
        Genesys("command", "Database.set", {
          messaging: {
            customAttributes: {
              webReferrerPage: '${genesysConfig['genesysReferrerPage']}'
            }
          }
        }, () => {
          console.log("database set");
        }, (error) => {
          console.log("Couldn't set database.", error);
        });
      });

      Genesys("subscribe", "MessagingService.conversationCleared", function () {
        Genesys("command", "Database.set", {
          messaging: {
            customAttributes: {
              webReferrerPage: '${genesysConfig['genesysReferrerPage']}'
            }
          }
        }, () => {
          console.log("database set");
        },(error) => {
          console.log("Couldn't set database.", error);
        });
      });

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
   Bootstrap on DOM ready
--------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', async () => {
  if (!getGenesysConfig(genesysConfigId, requiredConfigAttributes)) {
    console.error('Error loading Genesys configuration.');
    return;
  }

  attachStartChatHandler();
});
