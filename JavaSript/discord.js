const loadingMessage = document.getElementById("loadingMessage");
const userDataContainer = document.getElementById("userDataContainer");
const rawDataContainer = document.getElementById("rawDataContainer");
const rawJsonDisplay = document.getElementById("rawJsonDisplay");

function displayFormattedData(data) {
  userDataContainer.style.display = "block";
  if (data) {
    userDataContainer.innerHTML = `
                    <div class="user-details">
                        <h2>Benutzerdetails:</h2>
                        <p><strong>ID:</strong> ${
                          data.id || "Nicht verfügbar"
                        }</p>
                        <p><strong>Username:</strong> ${
                          data.username || "Nicht verfügbar"
                        }</p>
                        <p><strong>Erstellt am:</strong> ${
                          data.created_at
                            ? new Date(data.created_at).toLocaleString()
                            : "Nicht verfügbar"
                        }</p>
                        <p><strong>Avatar-URL:</strong> ${
                          data.avatar_url
                            ? `<a href="${data.avatar_url}" target="_blank">${data.avatar_url}</a>`
                            : "Nicht verfügbar"
                        }</p>
                        </div>
                `;
  } else {
    userDataContainer.innerHTML =
      '<p class="error-message">Keine formatierten Benutzerdaten verfügbar.</p>';
  }
}

function displayRawData(jsonData) {
  rawDataContainer.style.display = "block";
  if (jsonData) {
    rawJsonDisplay.textContent = JSON.stringify(jsonData, null, 2);
  } else {
    rawJsonDisplay.textContent = "Keine rohen JSON-Daten verfügbar.";
  }
}

function displayError(message) {
  loadingMessage.style.display = "none";

  userDataContainer.style.display = "block";
  userDataContainer.innerHTML = `<p class="error-message">${message}</p>`;

  rawDataContainer.style.display = "none";
}

fetch("https://api.dqvid.dev/v1/users/769301819562000437")
  .then((response) => {
    loadingMessage.style.display = "none";

    if (!response.ok) {
      throw new Error(
        `HTTP Fehler! Status: ${response.status} - ${response.statusText}`
      );
    }
    return response.json();
  })
  .then((json) => {
    console.log("Abgerufene Rohdaten:", json);

    displayFormattedData(json);
    displayRawData(json);
  })
  .catch((error) => {
    console.error("Fehler beim Abrufen der Daten:", error);
    displayError(
      `Fehler beim Laden der Daten: ${error.message}. Bitte versuche es später erneut.`
    );
  });
