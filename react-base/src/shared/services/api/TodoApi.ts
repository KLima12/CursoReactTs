import axios from "axios"

// Criando axios
const axiosInstance = axios.create();

// Exportando para utilizar no APp
export interface Itodo { 
    id: string; 
    name: string; 
    quantidade: number; 
    favorito: boolean;
}

interface ItodoWithoutId { 
    name: string; 
    quantidade: number; 
    favorito: boolean;
    
}

export const TodoApi = {
    // Get tipado.
    async getAll() { 
        const response = (await axiosInstance.get("/api/get-todo"));

        if (response.status === 200) { 
            // Aqui uma lista de todos
            return response.data.todos as Itodo[];
        } else { 
            console.error("Erro. Nada carregado.")
            return [];
        }  
    },
    // create tipado
    async addTodo(data: ItodoWithoutId){ 
        const response = await axiosInstance.post("/api/add-todo", data);

        if (response.status >= 200 && response.status < 300) { 
            console.log("Resposta", response.data.todo);
            return response.data.todo as Itodo;
        }else { 
            console.error("Erro na criação do arquivo");
            return null;
        }
    },

    async removeTodo(id: string) { 
        const response = (await axiosInstance.delete(`/api/delete-todo/${id}`));

        if (response.status === 204) { 
            console.log("Item removido com sucesso!"); 
            return true;
        } else { 
            console.error("Houve um erro e o item não foi removido!");
            return false;
        }
    }, 

    async updateFavorite(id: string, favoritoAtual: boolean) { 
        const response  = (await axiosInstance.put(`/api/put-favorite/${id}`, {favorito: !favoritoAtual}))
        
        if (response.status >= 200 && response.status < 300) { 
            console.log("Produto clicado");
            return response.data.todo;
        } else { 
            console.error("Erro ao favoritar o produto");
            return null;
        }

    },

    async updateQtd(id: string, qtdAtual: number,qtdNovo: number) { 
        const response = (await axios.put(`/api/put-qtd/${id}`, {quantidade: qtdAtual + qtdNovo}));

        if (response.status >= 200 && response.status < 300) { 
            return response.data.todo;
        }else { 
            console.error("Houve um erro na api");
            return null
        }
    }, // O partial ele serve para os outros campos serem opcionais. Ex: Usuário só quer atualizar o favorito...
    /*async UpdateTodo(id: string, data: Partial<ItodoWithoutId>) { 
        const response = (await axiosInstance.put(`/api/put-todo/${id}`, data)
    }*/
}