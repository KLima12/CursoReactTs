import {createServer, Model} from 'miragejs'
import { Response } from 'miragejs';
// Configurar oque temos dentro do servidor
createServer({
    // Que tipo de dados vou está trafegando na minha api
    models: { 
        // Só temos uma tabela no backend
        todo: Model
    }, 

    seeds(server) { 
        server.create("todo", { id: "1", nome: "Tênis Nike", quantidade: 1, favorito: false });
        server.create("todo", { id: "2", nome: "Bermuda Nike", quantidade: 2, favorito: false });
        server.create("todo", { id: "3", nome: "Bermuda Adidas", quantidade: 1, favorito: false });
    },

    routes() { 
        // Serve para especificar o inicio da nossa rota. Ex: (api/getTodo)... 
        this.namespace = "api";
        
        this.get("/get-todo", (schema) => { 
            return schema.all("todo");
        });

        this.post("/add-todo", (schema, request) => { 
            const data = JSON.parse(request.requestBody);
            return schema.create("todo", data);
        })

        this.delete("/delete-todo/:id", (schema, request) => {
            let id = request.params.id; // Captura o id vindo da url;
            schema.find("todo", id)?.destroy();

            return new Response(204);
        })

        this.put("/put-favorite/:id", (schema, request) => { 
            let id = request.params.id;
            console.log(`Id chegou ${id}`);
            const todo = schema.find("todo", id);

            if (todo) { 
                const data = JSON.parse(request.requestBody);
                console.log("Data", data);
                todo.update(data); 

                return todo
            }
            
            return new Response(404, {}, {error: "Todo não encontrado"});
        });

        this.put("/put-qtd/:id", (schema, request) => { 
            let id = request.params.id;
            const todo = schema.find("todo", id); 

            if (todo) { 
                const data = JSON.parse(request.requestBody); 
                todo.update(data); 
                return todo
            }
            return new Response(404, {}, {error: "Todo não encontrado"});
        })
    }   
})