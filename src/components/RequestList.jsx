import { RequestCard } from "./RequestCard";

export function RequestList({ requests, onResolve, onDelete }) {
  if (requests.length === 0) {
    return (
      <div className="card empty-queue">
        <p>No requests found in this view.</p>
      </div>
    );
  }

  return (
    <div>
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onResolve={onResolve}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
