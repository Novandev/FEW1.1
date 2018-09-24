// Your scripts here
const button = document.getElementById('calculate');
const tip =    document.getElementById('tip');
const amount = document.getElementById('amount');
const percent = document.getElementById('percent');
const total = document.getElementById('total');
const each = document.getElementById('each');
const people = document.getElementById('people');


button.addEventListener('click', () => {
  // console.log(tip.value,amount.value, percent.value, total.value,people.value);
  tip.innerHTML = amount.value * percent.value/100;
  total.innerHTML = Number(amount.value) + (amount.value * percent.value/100);
  each.innerHTML = (Number(amount.value) + (amount.value * percent.value/100) )/people.value;
});
