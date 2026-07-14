import { api } from "../../api/api";

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
    async getAll() { 
        try { 
            const response = api.get("/api/tasks/");

            const data = (await response).data;
            console.log(data); 
            return data as Itodo;
        } catch(error) { 
            console.error("Erro: ", error)
        }
    }, 

    async addTodo(task: ItodoWithoutId) { 
        try {
            const response = api.post("/api/tasks", { 
                task
            }); 
            
            if ((await response).status === 200) { 
                const data = (await response).data;
                console.log(data);
                return data
            }                
        } catch(error) { 
            alert(`Error: ${error}`);
            console.log("Error: ", error);
        }
    }, 

    async deleteTodo(id: string) { 
        try { 
            const response = api.delete(`/api/tasks/${id}`); 

            if ((await response).status === 204) { 
                return response;
            }
        }catch(error) { 
            alert(`Houve um problema ao remover: ${error}`); 
            console.log("Error: ", error);
        }
    }, 

    async updateFavorite(id: string, favoritoAtual: boolean) { 
        try { 
            const response = api.put(`/api/tasks/${id}`, { 
                favoritoAtual
            })

            if ((await response).status === 200) { 
                const data = (await response).data; 
                return data;
            }
        } catch(error) { 
            alert(`Houve um erro ao atualizar: ${error}`); 
            console.log("Error: ", error);
        }
    }, 

    async updateQtd(id: string, value: number) { 
        try { 
            const response = api.put(`/api/tasks/${id}`, { 
                value
            }); 

            if ((await response).status === 200) { 
                const data = (await response).data; 

                return data;
            }
        } catch(error) { 
            alert(`Houve um problema ao atualizar: ${error}`); 
            console.log("Error: ", error);
        }
    }

}




