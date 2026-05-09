document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const statusDiv = document.getElementById("status");

  chrome.storage.local.get(["access_token"], (result) => {
    if (result.access_token) {
      document.getElementById("login-section").style.display = "none";
      document.getElementById("logged-section").style.display = "block";
    }
  });

  loginBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    statusDiv.innerText = "Logowanie...";

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        chrome.storage.local.set({ access_token: data.access_token }, () => {
          document.getElementById("login-section").style.display = "none";
          document.getElementById("logged-section").style.display = "block";
          statusDiv.innerText = "";
        });
      } else {
        statusDiv.innerText = "Błędne dane logowania";
      }
    } catch (err) {
      statusDiv.innerText = "Błąd połączenia z serwerem";
    }
  });

  logoutBtn.addEventListener("click", () => {
    chrome.storage.local.remove(["access_token"], () => {
      document.getElementById("logged-section").style.display = "none";
      document.getElementById("login-section").style.display = "block";
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    });
  });
});