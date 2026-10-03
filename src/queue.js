export function isRequest(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.studentName === "string" &&
    typeof item.concern === "string" &&
    (item.priority === "High" || item.priority === "Normal") &&
    (item.status === "Waiting" || item.status === "Resolved") &&
    typeof item.createdAt === "number"
  );
}

export function sortRequests(list) {
  return [...list].sort((a, b) => {
    if (a.priority === "High" && b.priority !== "High") return -1;
    if (a.priority !== "High" && b.priority === "High") return 1;
    return a.createdAt - b.createdAt;
  });
}
