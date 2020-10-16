//create map
const map = L.map("mapid").setView([-27.2057496, -49.6582354], 15);

//create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

let marker;

//create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon
    marker && map.removeLayer(marker);

    //add icon layer
    marker = L.marker([lat, lng], {icon}).addTo(map);
})

//adicionar o campo de fotos
function addPhotoField(){
  //pegar o container de fotos #images
  const container = document.querySelector('#images')
  //pegar o container para duplicar .new-upload
  const fieldsContainer = document.querySelectorAll('.new-upload')
  //realizar o clone da última imagem adicionada
  const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
  //verificar se o campo está vazio, se sim, nao adicionar ao container de imagens
  const input = newFieldContainer.children[0];

  if (input.value == ""){
    return;
  }
  
  //limpar o campo antes de adicionar o container de imagens  
  input.value=""
  //adicionar o clone ao container de imagens
  container.appendChild(newFieldContainer)
}

function deleteField(event){
    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length <= 1){
        //limpar o campo
        span.parentNode.children[0].value="";
        console.log(span.parentNode)
        return;
    }

    //deletar campo
    span.parentNode.remove();    
}

//select yes or no
function toggleSelect(event){
    //retirar a class .active dos botoes
    document.querySelectorAll('.button-select button')
    .forEach(button => button.classList.remove('active'));
    //pegar o botao clicado
    const button = event.currentTarget;
    button.classList.add('active');    
    //atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    //verificar se sim ou nao
    input.value = button.dataset.value;
}

function validate(event){
  const latitude = document.querySelector('[name="lat"]').value
  const longitude = document.querySelector('[name="lng"]').value
  if ((latitude == '') || (longitude == '')){
    alert('Selecione um ponto no mapa!')
    event.preventDefault();
  }
}