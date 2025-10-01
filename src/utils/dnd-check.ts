export function isInDndWindow(
  eventTime: Date,
  dndStart: string,
  dndEnd: string,
): boolean {
  const eventHours = eventTime.getUTCHours();
  const eventMinutes = eventTime.getUTCMinutes();
  const eventTimeInMinutes = eventHours * 60 + eventMinutes;

  const [startHours, startMinutes] = dndStart.split(":").map(Number);
  const startTimeInMinutes = startHours * 60 + startMinutes;

  const [endHours, endMinutes] = dndEnd.split(":").map(Number);
  const endTimeInMinutes = endHours * 60 + endMinutes;

  if (startTimeInMinutes < endTimeInMinutes) {
    return (
      eventTimeInMinutes >= startTimeInMinutes &&
      eventTimeInMinutes < endTimeInMinutes
    );
  }

  return (
    eventTimeInMinutes >= startTimeInMinutes ||
    eventTimeInMinutes < endTimeInMinutes
  );
}
