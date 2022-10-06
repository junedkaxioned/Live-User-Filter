var search = document.querySelector('.filter');
var usersList = document.querySelector('.users-list');
var usersApi = 'https://randomuser.me/api?results=50';
var listUsers = [];

// Event on Search
search.addEventListener('input', function () {
  filterUser(this.value);
})

// Function for filtering users
function filterUser(searchUser) {
  listUsers.forEach(function (users) {
    if (users.innerText.toLowerCase().includes(searchUser.toLowerCase())) {
      users.classList.remove("hide-user");
    } else {
      users.classList.add("hide-user");
    }
  })
}

// functoin for showing users
function showUsers(result) {
  result.forEach(function (user) {
    var li = document.createElement('li');
    li.classList.add('user');
    li.innerHTML = `
      <figure>
        <img src="${user.picture.large}" alt="${user.name.first}">
        <figcaption class="user-info">
          <h2>${user.name.first} ${user.name.last}</h2>
          <p>${user.location.city}, ${user.location.country}</p>
        </figcaption>
      </figure>
    `
    usersList.append(li);
    listUsers.push(li);
  });
}

// function for fetching users
function getUsers(api) {
  fetch(api)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    showUsers(data.results);
  })
}
getUsers(usersApi);