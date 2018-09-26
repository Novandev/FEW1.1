// Loop through the contents of data
const content = document.getElementById('content');

const user_template = (data_array)=>{
  let str ='';
  for (let i = 0; i < data_array.length; i += 1) {
    str += `<article class='user'>
              <h2>${data_array[i].prefix} ${data_array[i].first_name} ${data_array[i].last_name} <h2>
              <div>${data_array[i].email} ${data_array[i].rating} <img src="${data_array[i].image}"/> </div>
            </article>`;

    console.log(i, data_array[i].first_name);
  }
  return str

}
content.innerHTML= user_template(data)
