export function isFirstVisit(): boolean {
  if (typeof window === "undefined") return false;

  const visited = sessionStorage.getItem("visited");
  if (!visited) {
    sessionStorage.setItem("visited", "true");
    return true;
  }
  return false;
}
