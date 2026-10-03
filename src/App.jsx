import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { RequestForm } from "./components/RequestForm";
import { QueueSummary } from "./components/QueueSummary";
import { RequestList } from "./components/RequestList";
import { useTheme } from "./context/ThemeContext";
import { isRequest, sortRequests } from "./queue";

export default function App() {
  const { theme } = useTheme();
  const [hasStorageError, setHasStorageError] = useState(false);
  const [filter, setFilter] = useState("All");

  const [requests, setRequests] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("helpdesk-requests") ?? "[]",
      );
      return Array.isArray(saved) ? saved.filter(isRequest) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("helpdesk-requests", JSON.stringify(requests));
    } catch {
      setHasStorageError(true);
    }
  }, [requests]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const waitingCount = requests.filter((r) => r.status === "Waiting").length;
  const resolvedCount = requests.filter((r) => r.status === "Resolved").length;
  const totalCount = requests.length;

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `HelpDesk — ${waitingCount} waiting`;
    return () => {
      document.title = originalTitle;
    };
  }, [waitingCount]);

  const handleAddRequest = (newRequest) => {
    setRequests((previous) => [...previous, newRequest]);
  };

  const handleResolve = (requestId) => {
    setRequests((previous) =>
      previous.map((req) =>
        req.id === requestId ? { ...req, status: "Resolved" } : req,
      ),
    );
  };

  const handleDelete = (requestId) => {
    setRequests((previous) => previous.filter((req) => req.id !== requestId));
  };

  const sortedRequests = sortRequests(requests);
  const displayedRequests = sortedRequests.filter((req) => {
    if (filter === "Waiting") return req.status === "Waiting";
    if (filter === "Resolved") return req.status === "Resolved";
    return true;
  });

  return (
    <div className="app-container">
      <Header />
      {hasStorageError && (
        <div className="alert-warning">
          Local persistence is currently unavailable.
        </div>
      )}
      <RequestForm onAddRequest={handleAddRequest} />
      <QueueSummary
        waitingCount={waitingCount}
        resolvedCount={resolvedCount}
        totalCount={totalCount}
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      <RequestList
        requests={displayedRequests}
        onResolve={handleResolve}
        onDelete={handleDelete}
      />
    </div>
  );
}
