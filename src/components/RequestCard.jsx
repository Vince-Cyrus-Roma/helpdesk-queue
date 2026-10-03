export function RequestCard({ request, onResolve, onDelete }) {
  const isHigh = request.priority === "High";
  const isResolved = request.status === "Resolved";
  const formattedTime = new Date(request.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`card request-card ${isHigh ? "high-priority" : ""} ${
        isResolved ? "resolved" : ""
      }`}
    >
      <div className="request-card-header">
        <h3 className="student-name">{request.studentName}</h3>
        <div className="tags">
          <span className={`badge ${isHigh ? "badge-high" : "badge-normal"}`}>
            {request.priority}
          </span>
          <span
            className={`badge ${
              isResolved ? "badge-status-resolved" : "badge-status-waiting"
            }`}
          >
            {request.status}
          </span>
        </div>
      </div>

      <p className="concern-text">{request.concern}</p>

      <div className="request-card-footer">
        <span>Submitted: {formattedTime}</span>
        <div className="actions">
          {!isResolved && (
            <button
              type="button"
              className="btn-resolve"
              onClick={() => onResolve(request.id)}
            >
              Resolve
            </button>
          )}
          <button
            type="button"
            className="btn-delete"
            onClick={() => onDelete(request.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
