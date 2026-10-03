export function QueueSummary({
  waitingCount,
  resolvedCount,
  totalCount,
  currentFilter,
  onFilterChange,
}) {
  return (
    <div className="summary-container">
      <div className="summary-badges">
        <span className="count-pill">Waiting: {waitingCount}</span>
        <span className="count-pill">Resolved: {resolvedCount}</span>
        <span className="count-pill">Total: {totalCount}</span>
      </div>

      <div className="filter-controls">
        <button
          type="button"
          className={`filter-btn ${currentFilter === "All" ? "active" : ""}`}
          onClick={() => onFilterChange("All")}
        >
          All
        </button>
        <button
          type="button"
          className={`filter-btn ${currentFilter === "Waiting" ? "active" : ""}`}
          onClick={() => onFilterChange("Waiting")}
        >
          Waiting
        </button>
        <button
          type="button"
          className={`filter-btn ${currentFilter === "Resolved" ? "active" : ""}`}
          onClick={() => onFilterChange("Resolved")}
        >
          Resolved
        </button>
      </div>
    </div>
  );
}
