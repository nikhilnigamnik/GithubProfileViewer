export function formatDate(dateString) {
  const currentDate = new Date();
  const updatedDate = new Date(dateString);

  const timeDifference = currentDate - updatedDate;
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const weeksDifference = Math.floor(daysDifference / 7);

  if (weeksDifference > 0) {
    return `updated ${
      weeksDifference === 1 ? "last week" : `${weeksDifference} weeks ago`
    }`;
  } else if (daysDifference > 0) {
    return `updated ${
      daysDifference === 1 ? "yesterday" : `${daysDifference} days ago`
    }`;
  } else if (hoursDifference > 0) {
    return `updated ${
      hoursDifference === 1 ? "an hour ago" : `${hoursDifference} hours ago`
    }`;
  } else if (minutesDifference > 0) {
    return `updated ${
      minutesDifference === 1
        ? "a minute ago"
        : `${minutesDifference} minutes ago`
    }`;
  } else {
    return `updated just now`;
  }
}

