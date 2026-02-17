import { login } from "./api"; 
 
export default function Login() { 
  const submit = async () => { 
    const res = await login({ 
      email: document.getElementById("login-email").value, 
      password: document.getElementById("login-password").value, 
    }); 
    try { 
      const json = await res.json(); 
      alert(res.ok ? (json.message || "Login success") : (json.error || "Login failed")); 
    } catch { 
      alert(res.ok ? "Login success" : "Login failed"); 
    } 
  }; 
 
return ( 
<> 
<h2>Login</h2> 
<input id="login-email" placeholder="Email" /> 
<input id="login-password" type="password" placeholder="Password" /> 
<button onClick={submit}>Login</button> 
</> 
); 
} 
