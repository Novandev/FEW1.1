window.onload= ()=> {
    const note = document.getElementById('note')
    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
    else {

        var db;
        var DBOpenRequest = window.indexedDB.open("ContactNames", 1);
        DBOpenRequest.onsuccess = function(event) {
            note.innerHTML += '<li>Database initialised.</li>';

            // store the result of opening the database in the db variable.
            // This is used a lot below
            db = DBOpenRequest.result;

            // Run the getData() function to get the data from the database
            //
            //ADD BUTTON SECTION
            const addButton = document.querySelector('#add_button');


            addButton.addEventListener('click', (event) =>{
                event.preventDefault();       // prevents default submission
                console.log(document.getElementById('nameAdd').value);
                const transaction = db.transaction(["ContactNames"], "readwrite");
                var objectStore = transaction.objectStore("ContactNames");
                var request = objectStore.add(document.getElementById('nameAdd').value);
                request.onsuccess = function(event) {
                    console.log(event.target.result)
                };

            })
            //
            //END ADD BUTTON

            //
            //DELETE BUTTON SECTION
            const deleteButton = document.querySelector('#delete_button');

            deleteButton.addEventListener('click', (event) =>{
                event.preventDefault();       // prevents default submission
                var objectStore = db.transaction("ContactNames").objectStore("ContactNames");

            })
            //
            //END DELETE SECTION

            //
            //SEARCH BUTTON
            const searchButton = document.querySelector('#search_button');

            searchButton.addEventListener('click', (event) =>{
                event.preventDefault();       // prevents default submission
                console.log(document.getElementById('name_query').value)

                var objectStore = db.transaction("ContactNames").objectStore("ContactNames");

                objectStore.openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;
                    if (cursor.value == document.getElementById('name_query').value) {
                        note.innerHTML += `<li>${cursor.value} found at position ${cursor.key} in the databse</li>`;
                        cursor.continue();
                    }
                    else{
                        cursor.continue();
                    }

                };

            })
            //
            //END SEARCH BUTTON

        };









            // objectStore.openCursor().onsuccess = function(event) {
            //     var cursor = event.target.result;
            //     if (cursor) {
            //         alert("Name " + cursor.key + " is " + cursor.value);
            //         cursor.continue();
            //     }
            //     else {
            //         alert("No more entries!");
            //     }
            // };





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