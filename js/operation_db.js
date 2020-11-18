const insertTeam = function() {
    const getDetailTeam = document.getElementById("detail-team");
    const getHeadTeam = document.getElementById("head-team");
    const getSquadsTeam = document.getElementById("squads-team");

    const urlParams = new URLSearchParams(window.location.search);
	const getIdTeam = urlParams.get("id");

    const team = {
        "teamId": getIdTeam,
        "name": getHeadTeam.children[1].children[0].children[0].textContent,
        "logo_svg": getDetailTeam.children[0].children[0].children[0].getAttribute("src"),
        "info_team": getHeadTeam.children[1].innerHTML,
        "squad_team": getSquadsTeam.children[1].innerHTML
    }

    dbInsertTeam(team).then(() => {
        const message = {
            title: "Data Berhasil Ditambahkan",
            body: `Team ${team.name} berhasil ditambahkan ke database.`
        }

        if (Notification.permission === "granted") {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification(message.title, { "body": message.body});
            });
        } else if (Notification.permission !== "granted") {
            M.toast({html: message.body});
        }
    });
};

const getAllTeam = function() {
    dbGetAllTeams().then(teams => {        
        setAllTeam(teams);
    });
}


const setAllTeam = function(teams) {
    const favoriteTeams = document.getElementById("favoriteTeams");
    let result = ``;


    teams.forEach(team => {
        result += `
            <li>
            <div class="collapsible-header"><img src="${team.logo_svg}" width="70" height="70" style="margin-right: 30px;"><span style="display: inline-block; margin-top: 20px;">${team.name}</span></div>
            <div class="collapsible-body">
              <div class="row">
                  <div class="col s12 m8">
                      <div class="row">
                          <div class="row">
                            <div class="col m10">
                                <h5>Info Team</h5>
                            </div>
                            <div class="col m2">
                                 <a class="btn-floating btn-large red pulse btn-delete" id="${team.teamId}"><i class="material-icons">delete</i></a>
                            </div>
                          </div>
                          <table class="responsive-table" id="head-team">
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
                                  ${team.info_team}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="row">
                        <h5>Info Squads</h5>
                  </div>
                  <table class="striped responsive-table" id="squads-team">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Position</th>
                              <th>Date Of Birth</th>
                              <th>Country of Birth</th>
                              <th>Role</th>
                          </tr>
                      </thead>
                      <tbody>
                        ${team.squad_team}
                      </tbody>
                  </table>
              </div>
          </li>`;
    });

    if (result === "") {
        result = `<h3 style="text-align: center;">No Data</h3>`;
        favoriteTeams.innerHTML = result;
    } else {
        favoriteTeams.children[1].children[0].innerHTML = result;
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
    }

    const getAllBtnDelete = document.querySelectorAll(".btn-delete");
    for (const btnDelete of getAllBtnDelete) {
        btnDelete.addEventListener("click", event => {
            event.preventDefault();
            
            const getTeamId = event.target.parentElement.getAttribute("id");
            dbDeleteTeam(getTeamId).then(() => {
                getAllTeam();

                const message = {
                    title: "Data Berhasil Dihapus",
                    body: `Team dengan id ${getTeamId} berhasil dihapus dari database.`
                }
        
                if (Notification.permission === "granted") {
                    navigator.serviceWorker.ready.then(function (registration) {
                        registration.showNotification(message.title, { "body": message.body});
                    });
                } else if (Notification.permission !== "granted") {
                    M.toast({html: message.body});
                }
            });
        });
    }
}
