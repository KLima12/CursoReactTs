// TodoItem.tsx
import { Link } from "react-router";
import { TodoItemLayout } from "../../shared/layout/TodoItemLayout/TodoItemLayout";
import TodoItemStyles from "./TodoItem.module.css";
import { BsStarFill } from "react-icons/bs";

interface TodoItemProps {
  id: string;
  nome: string;
  favorito: boolean;
  onRemove(): void;
  onFavorite(): void;
}

export const TodoItem = ({
  nome,
  id,
  favorito,
  onRemove,
  onFavorite,
}: TodoItemProps) => {
  return (
    <li className={TodoItemStyles.List} key={id}>
      <TodoItemLayout>
        <Link
          to={`/detalhe/${id}`}
          className={TodoItemStyles.Link}
          title={nome}
        >
          {nome}
        </Link>

        <div className={TodoItemStyles.ButtonsContainer}>
          <BsStarFill
            onClick={onFavorite}
            className={`
              ${TodoItemStyles.Star} 
              ${favorito ? TodoItemStyles.StarFavorite : ""}
            `}
          />

          <button className={TodoItemStyles.BtnRemove} onClick={onRemove}>
            Remover
          </button>
        </div>
      </TodoItemLayout>
    </li>
  );
};
