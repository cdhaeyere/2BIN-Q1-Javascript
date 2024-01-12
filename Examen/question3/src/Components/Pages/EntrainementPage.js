const { clearPage } = require('../../utils/render');

const EntrainementPage = () => {
    clearPage();

    const main = document.querySelector('main');

    const form = document.createElement('form');

    const labelFrancais = document.createElement('label');
    labelFrancais.textContent = 'Francais';

    const inputFrancais = document.createElement('input');
    inputFrancais.id = 'francais';
    inputFrancais.type = 'text';
    inputFrancais.setAttribute('required', true);

    const labelEnglish = document.createElement('label');
    labelEnglish.textContent = 'English';

    const inputEnglist = document.createElement('input');
    inputEnglist.id = 'anglais';
    inputEnglist.type = 'text';
    inputEnglist.setAttribute('required', true);

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Ajouter la traduction'

    form.appendChild(labelFrancais);
    form.appendChild(inputFrancais);
    form.appendChild(labelEnglish);
    form.appendChild(inputEnglist);
    form.appendChild(submit);

    main.appendChild(form);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const francais = document.querySelector('#francais').value;
        const english = document.querySelector('#anglais').value;

        await fetch('/api/trad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fr: francais,
                en: english
            })
        });

        form.reset();
    });
}

export default EntrainementPage;