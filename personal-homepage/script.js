window.onload = () =>{
    const results = document.querySelector('#results-list');
    // console.log(results)

    const XHR = new XMLHttpRequest();
    XHR.open("GET", "https://api.myjson.com/bins/8h7g4");
    XHR.send();
    XHR.responseType = 'json';
      XHR.onreadystatechange = function(){
       const info = Object.values(this.response);
       console.log(info)
       for (let field of info){
           results.innerHTML += `<li>${field}</li>`}
    };

}