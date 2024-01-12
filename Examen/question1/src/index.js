import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const questions = [];

const questionsAsked = [];

const renderTrainingPage = () => {
    const main = document.querySelector('main');
    main.innerHTML = ``;

    const form = document.createElement('form');

    const labelQuestion = document.createElement('label');
    labelQuestion.textContent = 'Question';

    const inputQuestion = document.createElement('input'); 
    inputQuestion.type = 'text';
    inputQuestion.id = 'question';
    inputQuestion.setAttribute('required', true);

    const labelReponse = document.createElement('label');
    labelReponse.textContent = 'Reponse';

    const inputReponse = document.createElement('input'); 
    inputQuestion.type = 'text';
    inputReponse.id = 'reponse'
    inputReponse.setAttribute('required', true);

    const submit = document.createElement('button');
    submit.type = 'submit'
    submit.textContent = 'Enregister exemple'

    form.appendChild(labelQuestion);
    form.appendChild(inputQuestion);

    form.appendChild(labelReponse);
    form.appendChild(inputReponse);

    form.appendChild(submit);

    main.appendChild(form);

    const button = document.createElement('button');
    button.textContent = 'Etape suivante';
    button.addEventListener('click', () => {
        renderChatBotPage();
    });

    main.appendChild(button);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const question = document.querySelector('#question').value;
        const reponse = document.querySelector('#reponse').value;
        
        const newQuestion = {
            question,
            reponse
        }

        questions.push(newQuestion);

        form.reset();
    });
}

const renderChatBotPage = () => {
    const main = document.querySelector('main');
    main.innerHTML = ``;

    const form = document.createElement('form');
    
    const labelQuestion = document.createElement('label');
    labelQuestion.textContent = 'Question';

    const inputQuestion = document.createElement('input');
    inputQuestion.type = 'text';
    inputQuestion.id = 'question';
    inputQuestion.setAttribute('required', true);

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Poser la question';

    const button = document.createElement('button');
    button.textContent = 'Etape précédente';
    button.addEventListener('click', () => {
        renderTrainingPage();
    });


    form.appendChild(labelQuestion);
    form.appendChild(inputQuestion);
    form.appendChild(submit);

    main.appendChild(form);
    
    const div = document.createElement('div');
    main.appendChild(div);

    if (questionsAsked.length !== 0) {
        questionsAsked.forEach((e) => {
            const questionP = document.createElement('p');
            questionP.textContent = `Question: ${e.question}`;

            const reponseP = document.createElement('p');
            reponseP.textContent = `Réponse: ${e.reponse}`

            div.appendChild(questionP);
            div.appendChild(reponseP);
        });
    }

    main.appendChild(button);

    

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const question = document.querySelector('#question').value;

        const object = questions.find((e) => e.question === question);

        let reponse = "";
        if (!object) {
            reponse = "Je ne sais pas répondre à cette question";
        } else {
            reponse = object.reponse;
        }
        
        const questionP = document.createElement('p');
        questionP.textContent = `Question: ${question}`;

        const reponseP = document.createElement('p');
        reponseP.textContent = `Réponse: ${reponse}`

        div.appendChild(questionP);
        div.appendChild(reponseP)

        form.reset();

        questionsAsked.push({ question, reponse});
    });
}

renderTrainingPage();