window.onload= ()=> {
    const note = document.getElementById('note')
    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
    else {

        var db;

// Let us open our database
        var DBOpenRequest = window.indexedDB.open("toDoList", 4);

// these event handlers act on the database being opened.
        DBOpenRequest.onerror = function (event) {
            note.innerHTML += `<li>Error loading database.</li>
                               <li>The error is ${event.error}</li>`;
        };

        DBOpenRequest.onsuccess = function (event) {
            note.innerHTML += '<li>Database initialized.</li>';

            // store the result of opening the database in the db
            // variable. This is used a lot below
            db = DBOpenRequest.result;

            const transaction = db.transaction(["ContactNames"], "readwrite");

            var objectStore = db.transaction("ContactNames").objectStore("ContactNames");

            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    alert("Name " + cursor.key + " is " + cursor.value);
                    cursor.continue();
                }
                else {
                    alert("No more entries!");
                }
            };



        };

// This event handles the event whereby a new version of
// the database needs to be created Either one has not
// been created before, or a new version number has been
// submitted via the window.indexedDB.open line above
// it is only implemented in recent browsers
        DBOpenRequest.onupgradeneeded = function (event) {
            const db = this.result;

            db.onerror = function (event) {
                note.innerHTML += '<li>Error loading database.</li>';
            };

            // Create an objectStore for this database
            const objectStore = db.createObjectStore("ContactNames", {autoIncrement: true});

            // define what data items the objectStore will contain

            objectStore.createIndex("name", "name", { unique: true });

            note.innerHTML += '<li>Database Updated</li>';

        };


    }
}