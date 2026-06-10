import { useEffect, useState } from "react";
import { TodoApi, type Itodo } from "../shared/services/api/TodoApi";
import { InputAdd } from "../components/InputAdd";
import { List } from "../components/List";
import { TodoItem } from "../components/TodoItem";
import { PageLayout } from "../shared/layout/pageLayout/PageLayout";

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
    TodoApi.addTodo({ name: value, quantidade: 1, favorito: false }).then(
      (data) => {
        if (data) {
          setLista([...lista, data]);
        }
      },
    );
  };

  const handleRemove = async (idLista: string) => {
    const response = await TodoApi.removeTodo(idLista);

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

    const favoritoAtual = itemAtual?.favorito;
    // Segurança, se não achar o item, para aqui

    /*const response = await fetch(`api/put-todo/${idFav}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Se era false, vira true.
        body: JSON.stringify({ favorito: !itemAtual.favorito }), 
      });*/

    const response = await TodoApi.updateFavorite(idFav, favoritoAtual);

    if (response && response.id) {
      setLista(
        lista.map((fav) =>
          fav.id === idFav ? { ...fav, favorito: !fav.favorito } : fav,
        ),
      );
    } else {
      console.error("Não foi possivel colocar item como favorito.");
    }
  };

  const handleQuantidade = async (idQtd: string, value: number) => {
    const itemAtual = lista.find((list) => list.id === idQtd);

    if (!itemAtual) return;

    const response = await TodoApi.updateQtd(
      idQtd,
      itemAtual.quantidade,
      value,
    );

    if (response && response.id) {
      setLista(
        lista.map((qtd) =>
          qtd.id === idQtd
            ? { ...qtd, quantidade: qtd.quantidade + value }
            : qtd,
        ),
      );
    } else {
      console.error("Não foi possivel editar o valor.");
    }
  };
  return (
    <PageLayout title="Página inicial">
      <InputAdd onAdd={handleAdd} />
      <List>
        {lista.map((list) => (
          <TodoItem
            key={list.id}
            nome={list.name}
            favorito={list.favorito}
            quantidade={list.quantidade}
            onRemove={() => handleRemove(list.id)}
            onFavorite={() => handleFavorite(list.id)}
            // Vai vir do componente filho o delta
            onQuantidade={(delta) => handleQuantidade(list.id, delta)}
          />
        ))}
      </List>
    </PageLayout>
  );
};
