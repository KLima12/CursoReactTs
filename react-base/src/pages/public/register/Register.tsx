import React, { useState } from "react";
import { AuthForm } from "../AuthForm";

export function Register () { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault(); 
    }

   return ( 
    <AuthForm 
        title="Registrar-se" 
        nameButton="Registrar" 
        onSubmit={handleRegister}>
        <b>Email</b>
        <input 
            value={email}
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            required>
        </input> 

        <b>Senha</b>
        <input
            value={password}
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            required> 
        </input>

    </AuthForm>
   )
}