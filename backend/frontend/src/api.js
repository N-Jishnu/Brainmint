const API = "http://127.0.0.1:8000/api";
export const createProject = (data) =>
    fetch(`${API}/projects/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
export const getProjects = (owner_id) =>
    fetch(`${API}/projects/?owner_id=${owner_id}`);
export const createSprint = (data) =>
    fetch(`${API}/sprints/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
export const getSprints = (project_id) =>
    fetch(`${API}/sprints/${project_id}/`);
