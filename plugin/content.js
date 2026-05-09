const API_ENDPOINT = "http://localhost:5000/api/scan/analyze";
let processedEmailIds = new Set();

async function verifyContentWithBackend(extractedData) {
  const storage = await chrome.storage.local.get(["access_token"]);
  const token = storage.access_token;

  if (!token) {
    return { status: "UNAUTHORIZED", message: "Zaloguj się we wtyczce" };
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

function showPhishingPopup(aiExplanation) {
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
  card.style.color = "#1e293b";
  card.style.textAlign = "center";

  const shieldSvg = document.createElement("div");
  shieldSvg.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v5h-2V7zm0 7h2v2h-2v-2z"/></svg>';

  const title = document.createElement("div");
  title.style.fontSize = "20px";
  title.style.fontWeight = "bold";
  title.style.marginTop = "16px";
  title.style.color = "#0f172a";
  title.innerText = "Podejrzenie próby phishingu";

  const separator = document.createElement("div");
  separator.style.height = "1px";
  separator.style.backgroundColor = "#e2e8f0";
  separator.style.margin = "20px 0";

  const contentBox = document.createElement("div");
  contentBox.style.textAlign = "left";
  contentBox.style.fontSize = "15px";
  contentBox.style.lineHeight = "1.5";
  contentBox.style.color = "#334155";
  contentBox.style.marginBottom = "24px";
  contentBox.innerText = aiExplanation;

  const blockButton = document.createElement("button");
  blockButton.style.backgroundColor = "#ef4444";
  blockButton.style.color = "#ffffff";
  blockButton.style.border = "none";
  blockButton.style.borderRadius = "25px";
  blockButton.style.padding = "12px 0";
  blockButton.style.width = "100%";
  blockButton.style.fontSize = "16px";
  blockButton.style.fontWeight = "bold";
  blockButton.style.cursor = "pointer";
  blockButton.style.boxShadow = "0 4px 10px rgba(239, 68, 68, 0.3)";
  blockButton.innerText = "Zablokuj nadawcę";

  blockButton.addEventListener("click", () => {
    overlay.remove();
  });

  card.appendChild(shieldSvg);
  card.appendChild(title);
  card.appendChild(separator);
  card.appendChild(contentBox);
  card.appendChild(blockButton);
  overlay.appendChild(card);

  document.body.appendChild(overlay);
}

function extractMetadataAndScan(targetBodyElement, rawText, activeContainer) {
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
    const emailAddr = senderObj.getAttribute("email");
    payload.sender = name + " (" + emailAddr + ")";
  }

  verifyContentWithBackend(payload).then(apiResult => {
    if (apiResult && apiResult.status === "DANGER") {
      showPhishingPopup(apiResult.message);
    }
  }).catch(error => console.error(error));
}

function findAndAnalyzeMessages() {
  const currentUrl = window.location.href;
  if (!currentUrl.includes("mail.google.com")) {
    return;
  }

  const currentHash = window.location.hash;
  if (!currentHash.includes("#inbox/")) {
    return;
  }

  const parts = currentHash.split("#inbox/");
  if (parts.length < 2 || parts[1].trim() === "") {
    return;
  }

  const currentEmailId = parts[1].trim();
  if (processedEmailIds.has(currentEmailId)) {
    return;
  }

  const activeMailContainer = document.querySelector("[role='main']");
  if (!activeMailContainer) {
    return;
  }

  const mailBodies = activeMailContainer.querySelectorAll("div.a3s, div[dir='ltr']");
  if (mailBodies.length === 0) {
    return;
  }

  processedEmailIds.add(currentEmailId);

  let fullText = "";
  let targetBodyElement = null;

  for (let bodyElement of mailBodies) {
    if (bodyElement.innerText && bodyElement.innerText.length > 15) {
      fullText += bodyElement.innerText + "\n";
      targetBodyElement = bodyElement;
    }
  }

  if (!targetBodyElement || fullText.trim().length < 15) {
    processedEmailIds.delete(currentEmailId);
    return;
  }

  extractMetadataAndScan(targetBodyElement, fullText, activeMailContainer);
}

const pageObserver = new MutationObserver(() => {
  findAndAnalyzeMessages();
});

pageObserver.observe(document.body, {
  childList: true,
  subtree: true
});