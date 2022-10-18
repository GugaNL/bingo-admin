function isValidNumber(value) {
  return !isNaN(value) && isFinite(value);
}

export function isValidDate(date) {
  const auxDate = date.split("/");

  let currentYear = new Date();
  currentYear = currentYear.getFullYear();

  // eslint-disable-next-line radix
  const year = parseInt(auxDate[2]);
  // eslint-disable-next-line radix
  const mounth = parseInt(auxDate[1]);
  // eslint-disable-next-line radix
  const day = parseInt(auxDate[0]);

  if (isValidNumber(year) && isValidNumber(mounth) && isValidNumber(day)) {
    if (year > 1900 && year <= currentYear) {
      if (mounth <= 0 || mounth > 12) {
        return false;
      }

      if (day > 31 || day <= 0) {
        return false;
      }

      if (day >= 30 && mounth === 2) {
        return false;
      }

      if (day === 29 && mounth === 2 && year % 4 !== 0) {
        return false;
      }

      if (
        day === 31 &&
        (mounth === 2 ||
          mounth === 4 ||
          mounth === 6 ||
          mounth === 9 ||
          mounth === 11)
      ) {
        return false;
      }

      // eslint-disable-next-line no-mixed-operators
      if (mounth >= 1 <= 12 && day >= 1 <= 31) {
        return true;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }

  return false;
}

export function isLegalAge(date) {
  const auxDate = date.split("/");

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMounth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  // eslint-disable-next-line radix
  const year = parseInt(auxDate[2]);
  // eslint-disable-next-line radix
  const mounth = parseInt(auxDate[1]);
  // eslint-disable-next-line radix
  const day = parseInt(auxDate[0]);

  if (isValidNumber(year) && isValidNumber(mounth) && isValidNumber(day)) {
    if (currentYear - year < 18) {
      return false;
    }
    if (currentYear - year === 18 && mounth >= currentMounth) {
      if (day > currentDay) {
        return false;
      }
    }
  }

  return true;
}

export const formatDate = (rawDate) => {
  const stringDate = rawDate.split("T")[0];
  const formattedStringDate = stringDate?.split("-").reverse().join("/");

  return formattedStringDate;
};

export const formatTime = (rawDate) => {
  const stringTime = rawDate.split("T")[1];
  const formattedStringTime = stringTime.slice(0,-8);

  return formattedStringTime;
};

export const capitalizeFirstLetter = (word) => {
  const capitalizeWord = word.charAt(0).toUpperCase() + word.slice(1);

  return capitalizeWord;
};