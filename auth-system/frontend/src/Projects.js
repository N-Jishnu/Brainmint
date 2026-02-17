import { createProject, getProjects } from "./api";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const res = await getProjects(1);
    setProjects(await res.json());
  };

  const submit = async () => {
    await createProject({ name: "My First Project", owner_id: 1 });
    loadProjects();
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
      <h2>Projects</h2>
      <button onClick={submit}>Create Project</button>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </>
  );
}

