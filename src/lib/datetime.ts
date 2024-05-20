export function dateInDdMmYyyyHhMmSs(date: Date, dateDiveder: string = "-") {
  
    return (
      [
        padTwoDigits(date.getDate()),
        padTwoDigits(date.getMonth() + 1),
        date.getFullYear(),
      ].join(dateDiveder) +
      " " +
      [
        padTwoDigits(date.getHours()),
        padTwoDigits(date.getMinutes()),
        padTwoDigits(date.getSeconds()),
      ].join(":")
    );
}

function padTwoDigits(num: number) {
    return num.toString().padStart(2, "0");
}