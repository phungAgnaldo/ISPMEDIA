export function convertSecondsToMinutes(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const minutesStr = minutes.toString();
  const secondsStr = seconds.toString();
  const paddedSecondsStr = secondsStr.padStart(2, "0");
  return `${minutesStr.charAt(0) + minutesStr.charAt(1)}:${
    paddedSecondsStr.charAt(0) + paddedSecondsStr.charAt(1)
  }`;
}
