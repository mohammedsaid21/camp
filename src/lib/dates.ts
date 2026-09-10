const DATE_FORMAT = new Intl.DateTimeFormat("ar", {
  day: "numeric",
  month: "long",
  year: "numeric",
  numberingSystem: "latn",
});

export function formatAddedAt(iso: string) {
  return DATE_FORMAT.format(new Date(iso));
}
