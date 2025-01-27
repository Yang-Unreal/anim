export function isFirstVisit(): boolean {
  if (typeof window === "undefined") return false;

  const visited = localStorage.getItem("visited");
  if (!visited) {
    localStorage.setItem("visited", "true");
    return true;
  }
  return false;
}
