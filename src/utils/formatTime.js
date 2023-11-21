export function formatTime(dateString) {
  const dateObject = new Date(dateString);

  const options = { month: "short", day: "numeric", year: "numeric" };

  const formattedDate = dateObject.toLocaleString("en-US", options);

  return formattedDate;
}

