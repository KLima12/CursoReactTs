import { api } from "../../api/api"

export interface ItodoDetails { 
    id: string;
    detail?: string;
    concluido: boolean;
    prioridade?: string; 
}

export const TodoDetails = { 
    async getDetail(id: string) { 
        try { 
            const response = api.get(`/api/detalhes/${id}`); 
            if (response) { 
                const data = (await response).data;
                return data as ItodoDetails[];
            }
        } catch(error) { 
            console.log("Houve um erro ao pegar usuários: ", error);
        }
    }
}