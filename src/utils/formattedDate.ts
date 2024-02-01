export function formattedDate() {
  const currentDateTime = new Date();

  const day = currentDateTime.getDate();
  const month = currentDateTime.getMonth() + 1; // Месяцы в JavaScript нумеруются с 0, поэтому добавляем 1
  const year = currentDateTime.getFullYear();

  const hours = currentDateTime.getHours();
  const minutes = currentDateTime.getMinutes();
  const seconds = currentDateTime.getSeconds();

  // Форматируем день, месяц, часы, минуты и секунды, чтобы добавить ведущий ноль при необходимости
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Возвращаем дату и время в формате "день.месяц.год час:минута:секунда"
  return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
