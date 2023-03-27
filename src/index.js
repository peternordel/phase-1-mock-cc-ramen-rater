// write your code here
let currentSoup;
let highestId = 0;
const soupImage = document.querySelector('.detail-image');
const name = document.querySelector('.name');
const restaurant = document.querySelector('.restaurant');
const ratingDisplay = document.getElementById('rating-display');
const commentDisplay = document.getElementById('comment-display');

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => {
        clickSoup(data[0]);
        data.forEach(item => createRamen(item));
        createDeleteButton();
    });
});

function createRamen(soup) {
    if (highestId < soup.id) {
        highestId = soup.id;
    }
    const soupMenu = document.getElementById('ramen-menu');
    const newSoup = document.createElement('img');
    newSoup.id = `new-soup-${soup.id}`
    newSoup.src = soup.image;
    newSoup.addEventListener('click', (e) => {
        e.preventDefault;
        clickSoup(soup);
    })
    soupMenu.append(newSoup);
}

function clickSoup(soup) {
    currentSoup = soup;

    soupImage.src = currentSoup.image;
    name.textContent = currentSoup.name;
    restaurant.textContent = currentSoup.restaurant;
    ratingDisplay.textContent = currentSoup.rating;
    commentDisplay.textContent = currentSoup.comment;
}

document.getElementById('new-ramen').addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = document.getElementById('new-name').value;
    const newRestaurant = document.getElementById('new-restaurant').value;
    const newImage = document.getElementById('new-image').value;
    const newRating = document.getElementById('new-rating').value;
    const newComment = document.getElementById('new-comment').value;

    const newSoup = {
        "id": ++highestId,
        "name": newName,
        "restaurant": newRestaurant,
        "image": newImage,
        "rating": newRating,
        "comment": newComment
    }

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(newSoup),
    })

    createRamen(newSoup);

    e.target.reset();
})


//Update Current Ramen
document.getElementById('edit-ramen').addEventListener('submit', (e) => {
    e.preventDefault();
    const editRating = document.getElementById('edit-rating').value;
    const editComment = document.getElementById('edit-comment').value;

    currentSoup.rating = editRating;
    currentSoup.comment = editComment;

    //Updates the current ramen (on the frontend)
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');

    ratingDisplay.textContent = currentSoup.rating;
    commentDisplay.textContent = currentSoup.comment;

    //Updates the current ramen (on the backend)
    fetch(`http://localhost:3000/ramens/${currentSoup.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(currentSoup),
    })

    e.target.reset();
})

function createDeleteButton() {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.addEventListener('click', e => {
        e.preventDefault();
        deleteRamen();
    })

    const body = document.querySelector('body');
    body.append(deleteBtn);
}

function deleteRamen() {
    if(currentSoup) {
        document.getElementById(`new-soup-${currentSoup.id}`).remove();
    
        soupImage.src = './assets/image-placeholder.jpg';
        name.textContent = 'Insert Name Here';
        restaurant.textContent = 'Insert Restaurant Here';
        ratingDisplay.textContent = 'Insert rating here';
        commentDisplay.textContent = 'Insert comment here';

        fetch(`http://localhost:3000/ramens/${currentSoup.id}`, {
            method: 'DELETE'
        })

        currentSoup = false;
    } else {
        alert('No soup selected!');
    }
}
