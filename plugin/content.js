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


function extractMetadataAndScan(element, text) {
  let payload = {
    text: text,
    source_type: "email",
    sender: null,
    title: null
  };

  const titleElem = document.querySelector("h2.hP");
  if (titleElem) payload.title = titleElem.innerText;

  const senderElem = element.closest("div.adn")?.querySelector("span.gD");
  if (senderElem) payload.sender = senderElem.innerText + " (" + senderElem.getAttribute("email") + ")";

  verifyContentWithBackend(payload).then(apiResult => {
    if (apiResult) {
      alert("Wykryto link w mailu!\nWynik z serwera: " + apiResult.message);
      if (apiResult.status === "DANGER") {
        applyWarningStyles(element, apiResult.message);
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

  const textContainers = document.querySelectorAll("p, span, div[dir='auto']");
  
  for (let element of textContainers) {
    const text = element.innerText;
    
    if (text && text.length > 15 && !checkedTexts.has(text)) {
      if (text.includes("http") || text.includes("www")) {
        checkedTexts.add(text);
        extractMetadataAndScan(element, text);
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