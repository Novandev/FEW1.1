window.onload= ()=>{
    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
    else{

    const namesDatabase = new Database();
    console.log(namesDatabase)

    }



}