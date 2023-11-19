'use strict';

const api = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#inp-word');
const sound = document.querySelector('#sound');
const resultContainer = document.querySelector('.result');



searchBtn.addEventListener('click', async function(e) {
  e.preventDefault();
  resultContainer.innerHTML = '<div class="loader"></div>';
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';

  const searchWord = searchInput.value;

  try {

    const apiRequest = await fetch(`${api}${searchWord}`);
    if (apiRequest.status === 404) {
      throw new Error('Word not found');
    }
    const [apiRequestData] = await apiRequest.json();

    console.log(apiRequestData);

    const html = `
  <div class="word">
       <h3>${apiRequestData.word}</h3>
           <button onclick="playSound()">
              <i class="fas fa-volume-up"></i>
     </button>
     </div>
          <div class="details">
                    <p>${apiRequestData.meanings[0].partOfSpeech}</p>
                    <p>/${apiRequestData.phonetic}/</p>
            </div>
                <p class="word-meaning">
                   ${apiRequestData.meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${apiRequestData.meanings[0].definitions[0].example || ""}
                </p>
                </div>`;
    resultContainer.innerHTML = html;
    sound.setAttribute('src', apiRequestData.phonetics[1].audio);
    searchInput.value = '';
  } catch (error) {
    result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    console.error(`Error: ${error}`);
  }
});


function playSound() {
  sound.play();
}
