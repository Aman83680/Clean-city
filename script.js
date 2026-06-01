// Load existing data
let reports = JSON.parse(localStorage.getItem("reports")) || [];
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Form
const reportForm = document.getElementById("reportForm");

// Leaderboard container
const leaderboardContainer =
document.querySelector(".leaderboard-list");

// Save to localStorage
function saveData() {
    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    localStorage.setItem(
        "leaderboard",
        JSON.stringify(leaderboard)
    );
}

// Render Leaderboard
function renderLeaderboard() {

    leaderboardContainer.innerHTML = "";

    if (leaderboard.length === 0) {

        leaderboardContainer.innerHTML =
        `<div class="user">
            <span>No Contributors Yet</span>
            <span>0 Points</span>
        </div>`;

        return;
    }

    leaderboard.sort((a, b) =>
        b.points - a.points
    );

    leaderboard.forEach((user, index) => {

        let medal = "";

        if(index === 0) medal = "🥇";
        else if(index === 1) medal = "🥈";
        else if(index === 2) medal = "🥉";
        else medal = "🌱";

        leaderboardContainer.innerHTML += `
            <div class="user">
                <span>
                    ${medal} ${user.name}
                </span>

                <span>
                    ${user.points} Points
                </span>
            </div>
        `;
    });
}

// Handle Form Submit
reportForm.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const name =
    reportForm.querySelector(
    'input[type="text"]'
    ).value;

    const location =
    reportForm.querySelectorAll(
    'input[type="text"]'
    )[1].value;

    const issue =
    reportForm.querySelector(
    "select"
    ).value;

    const description =
    reportForm.querySelector(
    "textarea"
    ).value;

    // Report object
    const report = {
        id: Date.now(),
        name,
        location,
        issue,
        description,
        points: 10,
        date:
        new Date()
        .toLocaleString()
    };

    reports.push(report);

    // Update leaderboard
    let existingUser =
    leaderboard.find(
    user => user.name === name
    );

    if(existingUser){
        existingUser.points += 10;
    }
    else{
        leaderboard.push({
            name,
            points: 10
        });
    }

    saveData();

    alert(
    "✅ Report Submitted Successfully!\n\n+10 Cleanliness Points Added."
    );

    reportForm.reset();

    renderLeaderboard();
});

// Initial render
renderLeaderboard();


// Stats Animation
const stats =
document.querySelectorAll(".card h2");

stats.forEach(stat => {

    const target =
    parseInt(
    stat.innerText
    );

    if(isNaN(target))
    return;

    let count = 0;

    const update = () => {

        count +=
        Math.ceil(
        target / 50
        );

        if(count >= target){
            stat.innerText =
            target + "+";
        }
        else{
            stat.innerText =
            count;
            requestAnimationFrame(
            update
            );
        }
    };

    update();
});


// Achievement Popup
setTimeout(() => {

    alert(
    "🏆 Welcome to Clean City!\n\nReport issues and earn rewards for keeping your city clean."
    );

}, 1500);