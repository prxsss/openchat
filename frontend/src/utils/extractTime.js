export default function extractTime(dateTimeString, timeZone = 'local') {
  // Convert the string to a Date object
  const date = new Date(dateTimeString);

  // Extract time components in the specified timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timeZone === 'local' ? undefined : timeZone,
    hour12: false, // Use 24-hour format
  });

  // Format the time
  return formatter.format(date); // Example output: "05:18" for 24-hour clock
}

// export default function extractTime(dateTimeString) {
//   // Convert the string to a Date object
//   const date = new Date(dateTimeString);

//   // Extract time components
//   const hours = date.getUTCHours(); // Hours in UTC
//   const minutes = date.getUTCMinutes(); // Minutes in UTC
//   // const seconds = date.getUTCSeconds(); // Seconds in UTC

//   // Format the time as a string
//   const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

//   return timeString; // Example output: "05:18"
// }
