// write your code here
let currentSoup;

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => data.forEach(item => createRamen(item)));
});

function createRamen(soup) {
    const soupMenu = document.getElementById('ramen-menu');
    const newSoup = document.createElement('img');
    newSoup.src = soup.image;
    newSoup.addEventListener('click', (e) => {
        e.preventDefault;
        clickSoup(soup);
    })
    soupMenu.append(newSoup);
}

function clickSoup(soup) {
    currentSoup = soup;
    const soupImage = document.querySelector('.detail-image');
    const name = document.querySelector('.name');
    const restaurant = document.querySelector('.restaurant');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');

    soupImage.src = soup.image;
    name.textContent = soup.name;
    restaurant.textContent = soup.restaurant;
    ratingDisplay.textContent = soup.rating;
    commentDisplay.textContent = soup.comment;
}

document.getElementById('new-ramen').addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = document.getElementById('new-name').value;
    const newRestaurant = document.getElementById('new-restaurant').value;
    const newImage = document.getElementById('new-image').value;
    const newRating = document.getElementById('new-rating').value;
    const newComment = document.getElementById('new-comment').value;

    const newSoup = {
        "name": newName,
        "restaurant": newRestaurant,
        "image": newImage,
        "rating": newRating,
        "comment": newComment
    }

    createRamen(newSoup);

    e.target.reset();
})
