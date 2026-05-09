const API_ENDPOINT = "http://localhost:5000/api/scan/analyze";
const DB_ENDPOINT = "http://localhost:5000/api/notification/add";
let processedEmailIds = new Set();

async function verifyContentWithBackend(extractedData) {
  const storage = await chrome.storage.local.get(["access_token"]);
  const token = storage.access_token;

  if (!token) {
    return { status: "UNAUTHORIZED" };
  }

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(extractedData)
  });

  return await response.json();
}

async function saveAlertToDatabase(payload, result) {
  const storage = await chrome.storage.local.get(["access_token"]);
  const token = storage.access_token;

  if (!token) {
    return;
  }

  const dbData = {
    title: payload.title || "Podejrzany e-mail",
    sender: payload.sender || "Nieznany",
    probability: result.confidence !== undefined ? result.confidence / 100 : 0.85,
    content: result.message || "Wykryto potencjalne zagrożenie.",
    created_at: new Date().toISOString(),
    type: "email"
  };

  fetch(DB_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(dbData)
  }).catch(err => console.error(err));
}

function showYellowWarning(message, confidence) {
  const warning = document.createElement("div");
  warning.style.position = "fixed";
  warning.style.top = "20px";
  warning.style.right = "20px";
  warning.style.width = "350px";
  warning.style.backgroundColor = "#ffffff";
  warning.style.border = "1px solid #facc15";
  warning.style.borderRadius = "16px";
  warning.style.padding = "24px";
  warning.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
  warning.style.zIndex = "999999";
  warning.style.fontFamily = "sans-serif";
  warning.style.textAlign = "center";
  warning.style.color = "#1e293b";

  const iconSvg = document.createElement("div");
  iconSvg.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="#facc15"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';

  const title = document.createElement("div");
  title.style.fontSize = "18px";
  title.style.fontWeight = "bold";
  title.style.marginTop = "12px";
  title.style.color = "#0f172a";
  title.innerText = "Podejrzenie próby phishingu";

  const separator = document.createElement("div");
  separator.style.height = "1px";
  separator.style.backgroundColor = "#e2e8f0";
  separator.style.margin = "16px 0";

  const contentBox = document.createElement("div");
  contentBox.style.textAlign = "left";
  contentBox.style.fontSize = "14px";
  contentBox.style.lineHeight = "1.5";
  contentBox.style.color = "#334155";
  contentBox.style.marginBottom = "20px";
  contentBox.innerText = message;

  const confidenceText = document.createElement("div");
  confidenceText.style.fontSize = "12px";
  confidenceText.style.marginTop = "8px";
  confidenceText.style.color = "#64748b";
  confidenceText.innerText = "Prawdopodobieństwo: " + confidence + "%";
  contentBox.appendChild(confidenceText);

  const understandingButton = document.createElement("button");
  understandingButton.style.backgroundColor = "#facc15";
  understandingButton.style.color = "#422006";
  understandingButton.style.border = "none";
  understandingButton.style.borderRadius = "25px";
  understandingButton.style.padding = "10px 0";
  understandingButton.style.width = "100%";
  understandingButton.style.fontSize = "14px";
  understandingButton.style.fontWeight = "bold";
  understandingButton.style.cursor = "pointer";
  understandingButton.style.transition = "background-color 0.2s";
  understandingButton.innerText = "Zrozumiałem";

  understandingButton.onmouseover = () => understandingButton.style.backgroundColor = "#eab308";
  understandingButton.onmouseout = () => understandingButton.style.backgroundColor = "#facc15";

  understandingButton.addEventListener("click", () => {
    warning.remove();
  });

  warning.appendChild(iconSvg);
  warning.appendChild(title);
  warning.appendChild(separator);
  warning.appendChild(contentBox);
  warning.appendChild(understandingButton);

  document.body.appendChild(warning);
}
function showRedDangerPopup(aiExplanation, confidence) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(255, 255, 255, 0.75)";
  overlay.style.backdropFilter = "blur(4px)";
  overlay.style.zIndex = "999999";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";

  const card = document.createElement("div");
  card.style.backgroundColor = "#ffffff";
  card.style.borderRadius = "16px";
  card.style.padding = "32px";
  card.style.width = "400px";
  card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
  card.style.fontFamily = "sans-serif";
  card.style.textAlign = "center";

  const shield = document.createElement("div");
  shield.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v5h-2V7zm0 7h2v2h-2v-2z"/></svg>';

  const title = document.createElement("div");
  title.style.fontSize = "20px";
  title.style.fontWeight = "bold";
  title.style.marginTop = "16px";
  title.style.color = "#0f172a";
  title.innerText = "Krytyczne zagrożenie (" + confidence + "%)";

  const separator = document.createElement("div");
  separator.style.height = "1px";
  separator.style.backgroundColor = "#e2e8f0";
  separator.style.margin = "20px 0";

  const content = document.createElement("div");
  content.style.textAlign = "left";
  content.style.fontSize = "14px";
  content.style.lineHeight = "1.5";
  content.style.color = "#334155";
  content.style.marginBottom = "24px";
  content.innerText = aiExplanation;

  const btn = document.createElement("button");
  btn.style.backgroundColor = "#ef4444";
  btn.style.color = "#ffffff";
  btn.style.border = "none";
  btn.style.borderRadius = "25px";
  btn.style.padding = "12px 0";
  btn.style.width = "100%";
  btn.style.fontSize = "16px";
  btn.style.fontWeight = "bold";
  btn.style.cursor = "pointer";
  btn.style.boxShadow = "0 4px 10px rgba(239, 68, 68, 0.3)";
  btn.innerText = "Zrozumiałem";
  btn.onclick = () => overlay.remove();

  card.appendChild(shield);
  card.appendChild(title);
  card.appendChild(separator);
  card.appendChild(content);
  card.appendChild(btn);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

function extractMetadataAndScan(targetElement, rawText, activeContainer) {
  let payload = {
    text: rawText.trim(),
    source_type: "email",
    sender: null,
    title: null
  };

  const titleElem = document.querySelector("h2[data-thread-perm-id], h2.hP");
  if (titleElem) {
    payload.title = titleElem.innerText.trim();
  }

  const senderObj = activeContainer.querySelector("span[email]");
  if (senderObj) {
    const name = senderObj.getAttribute("name") || senderObj.innerText;
    const email = senderObj.getAttribute("email");
    payload.sender = name + " (" + email + ")";
  }

  verifyContentWithBackend(payload).then(apiResult => {
    if (apiResult && (apiResult.status === "DANGER" || apiResult.status === "WARNING")) {
      saveAlertToDatabase(payload, apiResult);
      if (apiResult.status === "DANGER") {
        showRedDangerPopup(apiResult.message, apiResult.confidence);
      } else {
        showYellowWarning(apiResult.message, apiResult.confidence);
      }
    }
  }).catch(error => console.error(error));
}

function findAndAnalyzeMessages() {
  const currentUrl = window.location.href;
  if (!currentUrl.includes("mail.google.com")) {
    return;
  }

  const currentHash = window.location.hash;
  let emailId = "";

  if (currentHash.includes("#inbox/")) {
    emailId = currentHash.split("#inbox/")[1].trim();
  } else if (currentHash.includes("#spam/")) {
    emailId = currentHash.split("#spam/")[1].trim();
  }

  if (!emailId || processedEmailIds.has(emailId)) {
    return;
  }

  const activeContainer = document.querySelector("[role='main']");
  if (!activeContainer) {
    return;
  }

  const mailBodies = activeContainer.querySelectorAll("div.a3s, div[dir='ltr']");
  if (mailBodies.length === 0) {
    return;
  }

  processedEmailIds.add(emailId);
  let fullText = "";
  let targetElement = null;

  for (let body of mailBodies) {
    if (body.innerText && body.innerText.length > 15) {
      fullText += body.innerText + "\n";
      targetElement = body;
    }
  }

  if (!targetElement || fullText.trim().length < 15) {
    processedEmailIds.delete(emailId);
    return;
  }

  extractMetadataAndScan(targetElement, fullText, activeContainer);
}

const pageObserver = new MutationObserver(() => {
  findAndAnalyzeMessages();
});

pageObserver.observe(document.body, {
  childList: true,
  subtree: true
});