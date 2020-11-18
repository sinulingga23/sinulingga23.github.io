const API_KEY = "57203206caad4aec886fdeeafe631c64";
const BASE_URL = "https://api.football-data.org/v2/";

const fetchApi = function(url) {
    return fetch(url, {
        "headers": {
            "X-Auth-Token": API_KEY
        }
    })
    .then(response => {
        if (response.status !== 200) {
            console.log(`Error: ${response.status}`);
            return Promise.reject(new Error(response.statusText));
        } else{
            return Promise.resolve(response);
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}

const initLeagueList = function() {
    const ENDPOINT_COMPETITION = `${BASE_URL}competitions?plan=TIER_ONE&areas=2077`;
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(response => {
            if (response) {
                response.json().then(data => {
                    showLeague(data);
                })
            }
        });
    }
    
    fetchApi(ENDPOINT_COMPETITION)
    .then(data => {
        showLeague(data);
    });
}

const getLeagueStandings = function(code) {
    const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${code}/standings`;
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(response => {
            if (response) {
                response.json().then(data => {
                    showStanding(data)
                })
            }
        })
    }

    fetchApi(ENDPOINT_COMPETITION)
    .then(data => {
        showStanding(data);
    });
}

const getDetailTeam = function(code) {
    const ENDPOINT_COMPETITION = `${BASE_URL}teams/${code}`;
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(response => {
            if (response) {
                response.json().then(data => {
                    setDetailTeam(data);
                })
            }
        })
    }
    fetchApi(ENDPOINT_COMPETITION)
    .then(data => {
        setDetailTeam(data);
    });
}
