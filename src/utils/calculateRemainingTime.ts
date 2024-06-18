export const calculateTimeRemaining = (endsAt: string | Date) => {
  const firstDate = new Date(endsAt);
  const secondDate = Date.now();

  // Time Difference in Milliseconds
  const milliDiff = firstDate.getTime() - secondDate;

  // Converting time into hh:mm:ss format

  // Total number of seconds in the difference
  const totalSeconds = Math.floor(milliDiff / 1000);

  // Total number of minutes in the difference
  const totalMinutes = Math.floor(totalSeconds / 60);

  // Total number of hours in the difference
  const totalHours = Math.floor(totalMinutes / 60);

  // Getting the number of seconds left in one minute
  const remSeconds = totalSeconds % 60;

  // Getting the number of minutes left in one hour
  const remMinutes = totalMinutes % 60;

  return `${totalHours}h ${remMinutes}m ${remSeconds}s`;
};
