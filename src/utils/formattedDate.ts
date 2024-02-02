export function formattedDate() {
  const currentDateTime = new Date();

  const day = currentDateTime.getDate();
  const month = currentDateTime.getMonth() + 1;
  const year = currentDateTime.getFullYear();

  const hours = currentDateTime.getHours();
  const minutes = currentDateTime.getMinutes();
  const seconds = currentDateTime.getSeconds();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
