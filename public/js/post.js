const addPostHandler = async (event) => {
    event.preventDefault();

    // get all post attributes
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const date_created = new Date();
    const creator_id = parseInt(document.querySelector('#create-post').getAttribute('data-user-id'));

    // check if title and content is filled out
    if(title && content) {
        // fetch POST for blogposts
        const response = await fetch('/api/blogPosts', {
            method: 'POST',
            body: JSON.stringify({title, content, date_created, creator_id}),
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
    .addEventListener('submit', addPostHandler);