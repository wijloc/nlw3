const inputVisitationDate = document.querySelector('#visitationdate');
inputVisitationDate.value = new Date().toISOString().slice(0, 10);

function validate(event){
  const peopleCount = document.querySelector('[name="peoplecount"]').value
  if (peopleCount > 10){
    alert('Os grupos permitidos para visitas devem conter menos de 10 pessoas!')
    event.preventDefault();
  }
}