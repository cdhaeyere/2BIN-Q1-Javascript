let message = 'This is the best moment to have a look at this website !';

alert(addDateTime(message));

function addDateTime(message) {
    const date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ' ' + message;
}