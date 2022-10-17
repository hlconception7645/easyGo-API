export const dateDiff = (
  end: Date | string,
  start: Date | string,
  precision: "days" | "months" = "days"
): number => {
  const diff = new Date(end).getTime() - new Date(start).getTime();

  let interval: number;
  switch (precision) {
    case "days":
      interval = diff / (1000 * 60 * 60 * 24);
      break;

    case "months":
      interval = diff / (1000 * 60 * 60 * 24 * 30);
      break;

    default:
      interval = diff / (1000 * 60 * 60 * 24);
      break;
  }

  return interval;
};