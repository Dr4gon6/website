fetch("https://api.dqvid.dev/v1/users/769301819562000437")
  .then((response) => response.json())
  .then((json) => console.log(json));
