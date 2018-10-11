class Database{
    constructor(){
        const  DBrequest = window.indexedDB.open("Names", 1);     // Initialize  DBrequest to open a database named "names"

        DBrequest.onerror = function(event) {           // If there is an error
                                                        // Do something with DBrequest.errorCode!
            console.log(DBrequest.errorCode)            // Log the console error
        };
        DBrequest.onsuccess = function(event) {         // If it successfully connected on

            const DB = event.target.result;              // The results of the successful database query is access to the Names database

            DB.onerror = function(event) {
                // Generic error handler for all errors targeted at this database's
                // requests!
                console.log("Database error: " + event.target.errorCode);
            };

            DB.onupgradeneeded= function(event){
                const NamesDB = event.target.result;
                self.Names = NamesDB;
                const objStore = NamesDB.createObjectStore("names", { autoIncrement : true });

            }

        };
    }
}