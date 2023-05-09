const updateButton = document.getElementById('update-post');
const deleteButton = document.getElementById('delete-post');

let buttonClicked = '';

updateButton.addEventListener('click', () => {
    buttonClicked = 'updateButton';
});

deleteButton.addEventListener('click', () => {
    buttonClicked = 'deleteButton';
});

const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();

    if(buttonClicked === 'updateButton') {
        // fetch PUT from post route
        const content = document.querySelector('#post-content').value.trim();
    
        const response = await fetch('/api/blogPosts/', {
            method: 'PUT',
            body: JSON.stringify({title, content}),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            // If successful, redirect to the dashboard page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
    else if(buttonClicked === 'deleteButton') {
        // fetch DELETE from post route
        const response = await fetch('/api/blogPosts/', {
            method: 'DELETE',
            body: JSON.stringify({title}),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            // If successful, redirect to the dashboard page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#create-post')
    .addEventListener('submit', editFormHandler);