import React, { useState } from "react";
import { AuthForm } from "../AuthForm";
import { Input } from "../../../shared/components/Input/Input";
import { NavLink } from "react-router";
import { useAuthContext } from "../../../shared/contexts/AuthContext";

export function Register () { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { register } = useAuthContext()
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault(); 
        try { 
            await register(email, password);
        } catch(error) { 
            console.log("Erro no register: ", error);
        }
        
    }

   return ( 
    <AuthForm 
        title="Registrar-se" 
        nameButton="Registrar" 
        onSubmit={handleRegister}>
        
        <Input 
            type="email" 
            label="Email" 
            value={email} 
            placeHolder="Digite seu email..." 
            onChange={(e) => setEmail(e.target.value)} 
            required={true}> 
        </Input>

        <Input 
            type="password" 
            label="Senha" 
            value={password} 
            placeHolder="Digite sua senha..." 
            onChange={(e) => setPassword(e.target.value)} 
            required={true}> 
        </Input>

        <NavLink to="/login"> 
            Logar
          </NavLink>

    </AuthForm>
   )
}