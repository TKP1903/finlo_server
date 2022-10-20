const date_time = async () => {
  let now = new Date();
  let date = now.toLocaleDateString();
  let time = now.toLocaleTimeString();
  const date_time = date + " " + time;
  console.log({ date_time });
  return date_time;
};

module.exports = date_time;
