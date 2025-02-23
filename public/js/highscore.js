const highscoreContainer = document.getElementById("Player-container");

const fetchHighScores = async () => {
    try {
        const response = await fetch("/highscores"); // Fetch high scores from the server
        if (!response.ok) {
            throw new Error("Failed to get Players");
        }
        const usernames = await response.json();
        highscoreContainer.innerHTML = "";
        usernames.forEach((item) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "Player";
            itemDiv.innerHTML = `<h3>${item.username}</h3> <h4>${item.highscore}</h4><br>`;
            
            highscoreContainer.appendChild(itemDiv);
        });
    } catch (error) {
        console.error("Error: ", error);
        highscoreContainer.innerHTML = "<p style='color:red'>Failed to get highscores</p>";
    }
};

fetchHighScores();