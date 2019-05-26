console.log('Скрипт подключен');
var xhr = new XMLHttpRequest();
xhr.open('GET', 'phones.json', false);
xhr.send();
if (xhr.status != 200) {
  alert( xhr.status + ': ' + xhr.statusText );
  } else {
  phonesValue( xhr.responseText );
  }
  function clearHtml(selector) {
  var clearWrapper = document.querySelector(selector)
  clearWrapper.innerHTML = ' ';
  }

  function phonesValue( resp ) {
  clearHtml('#PhonesWrapper')
  var phonesArray = JSON.parse(resp);
  for (var i = 0;i < phonesArray.length; i++){
  var myWrapper = document.getElementById('PhonesWrapper');

  var mainDiv = document.createElement('div');
  mainDiv.className = "main-column column ";// + phonesArray[i];
  mainDiv.setAttribute('id', phonesArray[i].id);
  myWrapper.appendChild(mainDiv);

  var phoneDiv = document.createElement('div');
  var phoneWrap = document.getElementById(phonesArray[i].id);
  phoneDiv.className = "main-cell";
  phoneWrap.appendChild(phoneDiv);

  var phonePhoto = document.getElementById(phonesArray[i].id).querySelector('.main-cell');
  var phoneImg = document.createElement('img');
  phoneImg.setAttribute('src', phonesArray[i].imageUrl)
  phonePhoto.appendChild(phoneImg);
  phoneImg.className = "img-resp";


  var phoneTitle = document.createElement('div');
  var phoneName = document.createElement('h2');
  var phoneDescription = document.createElement('p');
  document.getElementById(phonesArray[i].id).appendChild(phoneTitle);

  var phoneTitleDiv = document.getElementById(phonesArray[i].id).querySelector( 'div:nth-child(2)');
  phoneTitleDiv.appendChild(phoneName);
  phoneTitleDiv.appendChild(phoneDescription);
  phoneName.innerHTML = phonesArray[i].name;
  phoneDescription.innerHTML = phonesArray[i].description;


  var phoneButtons = document.createElement('div');
  var buyButton = document.createElement('button');
  buyButton.className = "buttons";
  var basketButton = document.createElement('button');
  basketButton.className = "buttons-r";
  document.getElementById(phonesArray[i].id).appendChild(phoneButtons);

  var buttonsDiv = document.getElementById(phonesArray[i].id).querySelector( 'div:last-child');
  buttonsDiv.appendChild(buyButton);
  buttonsDiv.appendChild(basketButton);
  buyButton.innerHTML = "Купить";
  basketButton.innerHTML = "В корзину";
        }
  }



















