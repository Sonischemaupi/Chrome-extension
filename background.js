chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // Vraag de gebruiker om invoer
      const userInput = prompt(
        "Voer je localStorage data in (bijv. {\"gold\": 1000, \"wood\": 500, \"stone\": 200}):",
        '{"gold": 999999, "wood": 999999, "stone": 999999}'
      );

      try {
        // Parse de input en sla het op in localStorage
        if (userInput) {
          const parsedData = JSON.parse(userInput); // Controleer of het valide JSON is
          localStorage.setItem("infinite-craft-data", JSON.stringify(parsedData));
          console.log("Data opgeslagen:", localStorage.getItem("infinite-craft-data"));
          alert("Data succesvol opgeslagen in localStorage!");
        } else {
          alert("Geen data ingevoerd. Actie geannuleerd.");
        }
      } catch (error) {
        // Foutmelding als de invoer geen geldige JSON is
        alert("Ongeldige invoer! Zorg ervoor dat je geldige JSON gebruikt.");
        console.error("Fout bij het opslaan van data:", error);
      }
    }
  });
});
