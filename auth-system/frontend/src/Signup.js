import { signup } from "./api"; 
 
export default function Signup() { 
  const submit = async () => { 
    const res = await signup({ 
      email: document.getElementById("signup-email").value, 
      password: document.getElementById("signup-password").value, 
    }); 
    try { 
      const json = await res.json(); 
      alert(res.ok ? (json.message || "Signup successful") : (json.error || "Signup failed")); 
    } catch { 
      alert(res.ok ? "Signup successful" : "Signup failed"); 
    } 
  }; 
 
  return ( 
    <> 
      <h2>Signup</h2> 
      <input id="signup-email" placeholder="Email" /> 
      <input id="signup-password" type="password" placeholder="Password" /> 
      <button onClick={submit}>Signup</button> 
    </> 
  ); 
} 
