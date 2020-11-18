const showLeague = function(data) {
    const getLeagueList = document.getElementById("leagueList");
    let result = "";

    const competitions = data.competitions;
    competitions.forEach(competition => {
        if (competition.id >= 2001 && competition.id <= 2003) {
            result += `
            <div class="col s12 l4 m4">
                <div class="card league">
                <a href="../public/pages/standing.html?id=${competition.id}">
                    <div class="card-image">
                            <img class="materialboxed" src="/public/img/logo_${competition.id}.png">
                        </div>
                        <div class="card-content">
                            <hr>
                            <ul>
                                <li>Current Match Day: ${competition.currentSeason.currentMatchday}</li>
                                <li>Start Date: ${competition.currentSeason.startDate}</li>
                                <li>End Date: ${competition.currentSeason.endDate}</li>
                            </ul>
                        </div>
                    </div>
                </a>
            </div>`;
        }
    });
    getLeagueList.innerHTML = result;
};



function showStanding(data) {
    let standings = "";
    const standingElement =  document.getElementById("homeStandings");
    console.log("showStanding", data);
    document.getElementById("league-title").textContent = `${data.competition.name} standings.`;

    let position = 1;
    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td class="center">${position++}</td>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td><a href="../../public/pages/detail.html?id=${standing.team.id}">${standing.team.name}</a></td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th class="center">Position</th>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

const setDetailTeam = function(data) {
    const teamInfo = document.getElementById("head-team");
    const squadsInfo = document.getElementById("squads-team");
    let info = "";
    let squads = "";
    
    info = `
    <thead>
        <tr>
            <th>Team</th>
            <th>Founded</th>
            <th>Venue</th>
            <th>Address</th>
            <th>Web & Email</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${data.name}</td>
            <td>${data.founded}</td>
            <td>${data.venue}</td>
            <td>${data.address}</td>
            <td>${data.website} | ${data.email}</td>
        </tr>
   </tbody>
    `;

    const listSquad = data.squad;
    listSquad.forEach(squad => {
        let position = "-";
        if (squad.position !== null) {
            position = squad.position;
        }

        squads += `
        <tr>
            <td>${squad.name}</td>
            <td>${position}</td>
            <td>${squad.dateOfBirth}</td>
            <td>${squad.countryOfBirth}</td>
            <td>${squad.role}</td>
        </tr>
        `;
    });
    teamInfo.innerHTML = info;
    squadsInfo.children[1].innerHTML = squads;
    document.getElementById("detail-team").children[0].children[0].innerHTML = `<img class="materialboxed" src="${data.crestUrl}">`;
    document.getElementsByTagName("body")[0].style.display = "block";
}