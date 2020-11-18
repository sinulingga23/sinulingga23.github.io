const idbPromised = idb.open('football_database', 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains('team')) {
        upgradedDb.createObjectStore("team", {keyPath: "teamId"});
    }
});

const dbGetAllTeams = () => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("team", `readonly`);
            return transaction.objectStore("team").getAll();
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite not Found"))
            }
        })
    });
};

const dbInsertTeam = team => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("team", `readwrite`);
            transaction.objectStore("team").put(team);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbDeleteTeam = teamId => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("team", `readwrite`);
            transaction.objectStore("team").delete(teamId);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};