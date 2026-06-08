import axios from "axios"

// Criando axios
const axiosInstance = axios.create();

export const TodoApi = {
    // Consultar nossos Todos.
    async getAll() { 
        const response = (await axiosInstance.get("/api/get-todo"));

        if (response.status === 200) { 
            return response.data.todos;
        } else { 
            console.error("Erro. Nada carregado.")
            return [];
        }  
    },

    async addTodo(value: string){ 
        const response = (await axiosInstance.post("/api/add-todo", {nome: value, quantidade: 1, favorito: false}));

        if (response.status >= 200 && response.status < 300) { 
            console.log("Resposta", response.data.todo);
            return response.data.todo;
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
        const response = (await axios.put(`/api/put-todo/${id}`, {quantidade: qtdAtual + qtdNovo}));

        if (response.status >= 200 && response.status < 300) { 
            return response.data.todo;
        }else { 
            console.error("Houve um erro na api");
            return null
        }
        

    }
}