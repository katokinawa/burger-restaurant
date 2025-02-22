export function getCookie() {
  return document.cookie
    .split("; ")
    .reduce(
      (
        acc: { [key: string]: string },
        item: string
      ): { [key: string]: string } => {
        const [name, value] = item.split("=");
        acc[name] = value;
        return acc;
      },
      {}
    );
}
