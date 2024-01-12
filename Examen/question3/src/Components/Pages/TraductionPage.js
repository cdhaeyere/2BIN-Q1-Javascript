import { clearPage } from "../../utils/render";

const TraductionPage = () => {
    clearPage();

    const main = document.querySelector('main');

    const divFrancais = document.createElement('div');
    main.appendChild(divFrancais);

    const formFrancais = document.createElement('form');

    const labelFrancais = document.createElement('label');
    labelFrancais.textContent = 'Français';

    const inputFrancais = document.createElement('input');
    inputFrancais.type = 'text';
    inputFrancais.id = 'francais';
    inputFrancais.setAttribute('required', true);

    const submitFrancais = document.createElement('button');
    submitFrancais.type = 'submit';
    submitFrancais.textContent = 'Traduire';

    formFrancais.appendChild(labelFrancais);
    formFrancais.appendChild(inputFrancais);
    formFrancais.appendChild(submitFrancais);

    divFrancais.appendChild(formFrancais);

    const reponseFrancais = document.createElement('div');
    reponseFrancais.id = 'reponseenglish';
    divFrancais.appendChild(reponseFrancais);

    const divEnglish = document.createElement('div');
    main.appendChild(divEnglish);

    const formEnglish = document.createElement('form');

    const labelEnglish = document.createElement('label');
    labelEnglish.textContent = 'Anglais';

    const inputEnglish = document.createElement('input');
    inputEnglish.type = 'text';
    inputEnglish.id = 'english';
    inputEnglish.setAttribute('required', true);

    const submitEnglish = document.createElement('button');
    submitEnglish.type = 'submit';
    submitEnglish.textContent = 'Traduire';

    formEnglish.appendChild(labelEnglish);
    formEnglish.appendChild(inputEnglish);
    formEnglish.appendChild(submitEnglish);

    divEnglish.appendChild(formEnglish);

    const reponseEnglish = document.createElement('div');
    reponseEnglish.id = 'reponseenglish';
    divEnglish.appendChild(reponseEnglish);

    formFrancais.addEventListener('submit', async (event) => {
        event.preventDefault();

        reponseFrancais.innerHTML = ``;

        const francais = document.querySelector('#francais').value;

        const requete = await fetch(`/api/trad/fr?query=${francais}`, {
            method: 'GET'
        });

        let p;

        if (requete.status !== 200) {
            p = document.createElement('p');
            p.innerHTML = `<p>Traduction anglaise: </p><p style="color: red;">Impossible d'obtenir la traduction</p>`;
        } else {
            const response = await requete.json();
            p = document.createElement('p');
            p.textContent = `Traduction anglaise: ${response.en}`;
        }

        reponseFrancais.appendChild(p);

        formFrancais.reset();
    });

    formEnglish.addEventListener('submit', async (event) => {
        event.preventDefault();

        reponseEnglish.innerHTML = ``;

        const english = document.querySelector('#english').value;

        const requete = await fetch(`/api/trad/en?query=${english}`, {
            method: 'GET'
        });

        let p;

        if (requete.status !== 200) {
            p = document.createElement('p');
            p.innerHTML = `<p>Traduction francaise: </p><p style="color: red;">Impossible d'obtenir la traduction</p>`;
        } else {
            const response = await requete.json();
            p = document.createElement('p');
            p.textContent = `Traduction francaise: ${response.fr}`;
        }

        reponseEnglish.appendChild(p);

        formEnglish.reset();
    });
}

export default TraductionPage;