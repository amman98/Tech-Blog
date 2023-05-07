const addCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-text').value.trim();
    const date_created = new Date();
    const creator_id = parseInt(document.querySelector('#create-comment').getAttribute('data-user-id'));
    const post_id = parseInt(document.querySelector('#create-comment').getAttribute('data-post-id'));

    // check if content is filled out
    if(content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({content, date_created, creator_id, post_id}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the post page
            document.location.replace('/post/' + post_id);
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#create-comment')
    .addEventListener('submit', addCommentHandler);