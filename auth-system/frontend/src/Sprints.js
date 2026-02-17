import { createSprint, getSprints } from "./api";
import { useEffect, useState } from "react";

export default function Sprints() {
  const [sprints, setSprints] = useState([]);

  const loadSprints = async () => {
    const res = await getSprints(1);
    setSprints(await res.json());
  };

  const submit = async () => {
    await createSprint({
      project_id: 1,
      name: "Sprint 1",
      start_date: "2025-01-10",
      end_date: "2025-01-17",
    });
    loadSprints();
  };

  useEffect(() => {
    loadSprints();
  }, []);

  return (
    <>
      <h2>Sprints</h2>
      <button onClick={submit}>Create Sprint</button>
      <ul>
        {sprints.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </>
  );
}

