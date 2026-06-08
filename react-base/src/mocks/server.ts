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
        // Consultando dados no localStorage
        const todosAsString = localStorage.getItem('MOCK_TODOS')
        if (todosAsString === null) return; 

        // Transformando eles em objetos.
        const todos = JSON.parse(todosAsString);
        
        // Para cada item vamos criar ele dentro do nosso server.
        todos.models.forEach((todo: {}) => server.schema.create('todo', todo));
    },

    routes() { 
        // Serve para especificar o inicio da nossa rota. Ex: (api/getTodo)... 
        this.namespace = "api";
        
        this.get("/get-todo", (schema) => { 
            return schema.all("todo");
        });

        this.post("/add-todo", (schema, request) => { 
            const data = JSON.parse(request.requestBody);
            
            // Toda vez que eu crio um todo novo.
            const todo = schema.create("todo", data); 
            
            // Eu pego meu todo.
            const todos = schema.all('todo'); 
            // Atualizo meu banco
            localStorage.setItem('MOCK_TODOS', JSON.stringify(todos));
            
            return todo;
        })

        this.delete("/delete-todo/:id", (schema, request) => {
            let id = request.params.id; // Captura o id vindo da url;
            schema.find("todo", id)?.destroy();

            const todos = schema.all('todo'); 
            localStorage.setItem("MOCK_TODOS", JSON.stringify(todos));
            return new Response(204);
        })

        this.put("/put-favorite/:id", (schema, request) => { 
            let id = request.params.id;
            const todo = schema.find("todo", id);

            if (todo) { 
                const data = JSON.parse(request.requestBody);
                todo.update(data); 
                
                const todos = schema.all('todo'); 
                
                localStorage.setItem('MOCK_TODOS', JSON.stringify(todos));
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
                
                const todos = schema.all('todo'); 
                
                localStorage.setItem('MOCK_TODOS', JSON.stringify(todos));
                return todo
            }
            return new Response(404, {}, {error: "Todo não encontrado"});
        })
    }   
})