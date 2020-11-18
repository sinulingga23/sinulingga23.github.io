document.addEventListener("DOMContentLoaded", () => {
    const elems = document.querySelector(".sidenav");
    const instances = M.Sidenav.init(elems);

    const loadPage = function(page) {
        fetch(`public/pages/${page}.html`, {"method": "GET"})
        .then(data => {
            const bodyContent = document.querySelector("#body-content");
            const responseCode = data.status;
            
            if (responseCode === 200) {
                data.text().then(res => { bodyContent.innerHTML = res });
                if (page === "liga" || page === "" || page === "index") {
                    initLeagueList();
                } else if (page === "favoriteteams") {
                    getAllTeam();
                }
            } else if (responseCode === 404) {
                bodyContent.innerHTML = `<p>Halaman tidak ditemukan.</p>`;
            }
        })
        .catch(() => {
            document.querySelector("#body-content").innerHTML = `<p>Hmm.. Sepertinya terjadi kesalahan</p>`;
        })
    }


    const loadNav = function() {
        fetch(`public/nav.html`, {"method": "GET"})
        .then(response => { return response.text() })
        .then(data => {
            document.querySelector(".topnav").innerHTML = data;
            document.querySelector(".sidenav").innerHTML = data;

            document.querySelectorAll(".sidenav a, .topnav a").forEach(nav => {
                nav.addEventListener("click", event => {
                    event.preventDefault();

                    const sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    const currentPage = event.target.getAttribute("href").substr(1);
                    loadPage(currentPage);
                });
            });
        })
    } 

    loadNav();
    let currentPage = window.location.hash.substr(1);
    if (currentPage === "") currentPage = "liga";
    loadPage(currentPage);
});
