module.exports = {
    randomInt() {
        return Math.floor(Math.random() * 10000) + 1
    },

    setInexedDbToken (token) {
        let req = window.indexedDB.open("overpass", 2);

        req.onerror = function (event) {
            // Do something with request.errorCode!
        };
        req.onsuccess = function (event) {
            db = event.target.result;
            let transaction = db.transaction(["overpass"]);
            let objectStore = db.transaction(["overpass"], "readwrite").objectStore("customers");
            let request = objectStore.get("auth_key");

            request.onerror = function(event) {
                cy.log("Database error: " + event.target.errorCode);
            };
            request.onsuccess = function(event) {
                // Get the old value that we want to update
                let data = event.target.result;

                // update the value(s) in the object that you want to change
                data.authToken = token;

                // Put this updated object back into the database.
                let requestUpdate = objectStore.put(data);
                requestUpdate.onerror = function(event) {
                    cy.log("Error on updating indexed db : " + event.target.errorCode);
                };
                requestUpdate.onsuccess = function(event) {
                    cy.log("Updated token in indexed db")
                };
            };
        };
    }
};