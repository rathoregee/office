import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



export function SignIn() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const executeSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await auth.signIn(username, password);
        if (result.success) {
            navigate({ pathname: "/success" });
        } else {
            alert(result.message);
        }
    };

    return (
        <div>
            <div>
                <form noValidate onSubmit={executeSignIn}>
                    <p>
                        <label htmlFor="username">User Name</label>                       
                        <input
                            type="text"
                            placeholder="UserID"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}                            
                        />
                    </p>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}                      
                    />
                    <br />
                    <div>
                        <button type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
