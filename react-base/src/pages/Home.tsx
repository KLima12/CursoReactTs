import { useEffect, useState } from "react";
import { TodoApi, type Itodo } from "../shared/services/api/TodoApi";
import { InputAdd } from "../components/InputAdd";
import { TodoItem } from "../components/TodoItem/TodoItem";
import { PageLayout } from "../shared/layout/pageLayout/PageLayout";
import TodoItemLayoutStyle from "../shared/layout/TodoItemLayout/TodoItemLayout.module.css";
export const Home = () => {
  const [lista, setLista] = useState<Itodo[]>([]);

  // Busca os dados da api quando o componente inicia
  useEffect(() => {
    const carregarDados = async () => {
      const response = await TodoApi.getAll();
      if (response) {
        setLista(response);
      }
    };
    carregarDados();
  }, []);

  const handleAdd = async (value: string) => {
    TodoApi.addTodo({ nome: value, quantidade: 1, favorito: false }).then(
      (data) => {
        if (data) {
          setLista((prev) => [...prev, data]);
        }
      },
    );
  };

  const handleRemove = async (idLista: string) => {
    const response = await TodoApi.deleteTodo(idLista);

    if (response) {
      setLista(lista.filter((list) => list.id !== idLista));
    } else {
      console.error("Não foi possivel deletar o item no servidor.");
    }
  };

  const handleFavorite = async (idFav: string) => {
    // Aqui estou procurando qual o item atual
    const itemAtual = lista.find((list) => list.id === idFav);
    if (!itemAtual) return;

    // Retorna underfined em vez de dar erro
    const favoritoAtual = !itemAtual?.favorito;
    const response = await TodoApi.updateFavorite(idFav, favoritoAtual);

    console.log(response);

    if (response && response.id) {
      console.log("Resposta valida! Vamos atualizar!")
      setLista(
        lista.map((fav) =>
          fav.id === idFav ? { ...fav, favorito: !fav.favorito } : fav,
        ),
      );
    } else {
      console.error("Não foi possivel colocar item como favorito.");
    }
  };

  return (
    /*Estilização somente para a página*/
    <PageLayout title="TodoList">
      <InputAdd onAdd={handleAdd} />
      <ol className={TodoItemLayoutStyle.DivLista}>
        {lista.map((list) => (
          <TodoItem
            id={list.id}
            nome={list.nome}
            favorito={list.favorito}
            onRemove={() => handleRemove(list.id)}
            onFavorite={() => handleFavorite(list.id)}
            // Vai vir do componente filho o delta
          />
        ))}
      </ol>
    </PageLayout>
  );
};
