import { useState, useRef, useEffect } from "react";

export function RequestForm({ onAddRequest }) {
  const [studentName, setStudentName] = useState("");
  const [concern, setConcern] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [errorMsg, setErrorMsg] = useState("");

  const nameInputRef = useRef(null);
  const concernInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = studentName.trim();
    const trimmedConcern = concern.trim();

    if (!trimmedName) {
      setErrorMsg("Please enter the student's name.");
      nameInputRef.current?.focus();
      return;
    }

    if (!trimmedConcern) {
      setErrorMsg("Please enter your question or concern.");
      concernInputRef.current?.focus();
      return;
    }

    const newRequest = {
      id: crypto.randomUUID(),
      studentName: trimmedName,
      concern: trimmedConcern,
      priority,
      status: "Waiting",
      createdAt: Date.now(),
    };

    onAddRequest(newRequest);

    setStudentName("");
    setConcern("");
    setPriority("Normal");
    setErrorMsg("");

    nameInputRef.current?.focus();
  };

  return (
    <div className="card">
      <h2>New Assistance Request</h2>
      {errorMsg && <div className="alert-warning">{errorMsg}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="student-name">Student Name</label>
          <input
            id="student-name"
            ref={nameInputRef}
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Example: Oscar Cavan"
          />
        </div>

        <div className="form-group">
          <label htmlFor="concern">Concern</label>
          <textarea
            id="concern"
            ref={concernInputRef}
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            placeholder="Describe the issue or question..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Add to Queue
        </button>
      </form>
    </div>
  );
}
