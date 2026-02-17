import { createSprint, getSprints } from "./api";
import { useEffect, useState } from "react";
export default function Sprints() {
    const [sprints, setSprints] = useState([]);
    const loadSprints = async () => {
        const res = await getSprints(1);
        setSprints(await res.json());
    };
    const submit = async () => {
        const nums = sprints
            .map((s) => {
                const m = String(s.name).match(/(\d+)\s*$/);
                return m ? parseInt(m[1], 10) : 0;
            })
            .filter((n) => !Number.isNaN(n));
        const next = (nums.length ? Math.max(...nums) : sprints.length) + 1;
        await createSprint({
            project_id: 1,
            name: `Sprint ${next}`,
            start_date: "2025-01-10",
            end_date: "2025-01-17"
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
                {sprints.map(s => <li key={s.id}>{s.name}</li>)}
            </ul>
        </>
    );
}
