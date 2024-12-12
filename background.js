const API_URL = "https://api.jsonbin.io/v3/b"; // Basis API-URL
const API_KEY = "$2a$10$NBBICjL0W/.WhJMEzCVcLOESJOrip0B..LDOp95gtQNkvbkTGg1ya"; // X-Master-Key
const BIN_ID = "675941e2e41b4d34e46373c3"; // Vast BIN_ID

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: async (API_URL, API_KEY, BIN_ID) => {
      const uploadData = async () => {
        try {
          const data = localStorage.getItem("infinite-craft-data");
          if (data) {
            console.log("LocalStorage data gevonden, bezig met uploaden:", data);
            const response = await fetch(`${API_URL}/${BIN_ID}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
              },
              body: JSON.stringify({ data })
            });

            if (response.ok) {
              console.log("Data succesvol geüpload:", data);
            } else {
              console.error("Fout tijdens uploaden:", response.status);
            }
          } else {
            console.warn("Geen data gevonden in localStorage om te uploaden.");
          }
        } catch (error) {
          console.error("Fout tijdens uploaden:", error.message);
        }
      };

      const downloadData = async () => {
        try {
          const response = await fetch(`${API_URL}/${BIN_ID}`, {
            method: "GET",
            headers: {
              "X-Master-Key": API_KEY
            }
          });

          if (response.ok) {
            const result = await response.json();
            if (result.record && result.record.data) {
              localStorage.setItem("infinite-craft-data", result.record.data);
              console.log("Data succesvol gedownload en ingesteld:", result.record.data);
            } else {
              console.warn("Geen geldige data gevonden om te downloaden.");
            }
          } else {
            console.error("Fout tijdens downloaden:", response.status);
          }
        } catch (error) {
          console.error("Fout tijdens downloaden:", error.message);
        }
      };

      // Vraag de gebruiker wat ze willen doen
      const action = prompt(
        "Wat wil je doen?\nTyp '1' om je data te geven.\nTyp '2' om data te krijgen."
      );

      if (action === "1") {
        await uploadData();
      } else if (action === "2") {
        await downloadData();
      } else {
        console.log("Geen geldige actie geselecteerd.");
      }
    },
    args: [API_URL, API_KEY, BIN_ID] // Geef API-URL, sleutel en vast BIN_ID door
  });
});
