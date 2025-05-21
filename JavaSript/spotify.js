fetch("https://api.dqvid.dev/v1/users/769301819562000437")
  .then((response) => response.json())
  .then((json) => {
    const dc = document.getElementById("discord");
    console.log();
    console.log(
      "Display name " +
        json.data.discord_user.display_name +
        " , username " +
        json.data.discord_user.username
    );
  });
