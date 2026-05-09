const API_ENDPOINT = "http://localhost:5000/api/scan/analyze";
let checkedTexts = new Set();

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

function applyWarningStyles(domElement, aiExplanation) {
  domElement.style.border = "2px solid red";
  domElement.style.backgroundColor = "#ffe6e6";

  const warningBadge = document.createElement("div");
  warningBadge.style.color = "white";
  warningBadge.style.backgroundColor = "red";
  warningBadge.style.padding = "4px 8px";
  warningBadge.style.marginTop = "4px";
  warningBadge.style.borderRadius = "4px";
  warningBadge.style.fontWeight = "bold";
  warningBadge.innerText = "Zagrożenie: " + aiExplanation;

  domElement.appendChild(warningBadge);
}


function extractMetadataAndScan(mailBodyElement, rawText, activeContainer) {
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
    if (apiResult) {
      alert("Wykryto link w mailu!\nWynik z serwera: " + apiResult.message);
      if (apiResult.status === "DANGER") {
        applyWarningStyles(mailBodyElement, apiResult.message);
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
  if (!currentHash.includes("#inbox/")) {
    return;
  }

  const parts = currentHash.split("#inbox/");
  if (parts.length < 2 || parts[1].trim() === "") {
    return;
  }

  const activeMailContainer = document.querySelector("[role='main']");
  if (!activeMailContainer) {
    return;
  }

  const mailBodies = activeMailContainer.querySelectorAll("div.a3s, div[dir='ltr']");

  for (let bodyElement of mailBodies) {
    const text = bodyElement.innerText;

    if (text && text.length > 15 && !checkedTexts.has(text)) {
      if (text.includes("http") || text.includes("www")) {
        checkedTexts.add(text);
        extractMetadataAndScan(bodyElement, text, activeMailContainer);
      }
    }
  }
}

const pageObserver = new MutationObserver(() => {
  findAndAnalyzeMessages();
});

pageObserver.observe(document.body, {
  childList: true,
  subtree: true
});