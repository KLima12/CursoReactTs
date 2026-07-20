import { Link } from "react-router";
import { TodoItemLayout } from "../../shared/layout/TodoItemLayout/TodoItemLayout";
import TodoItemStyles from "./TodoItem.module.css";
import { BsStarFill } from "react-icons/bs";
interface TodoItemProps {
  id: string;
  nome: string;
  quantidade: number;
  favorito: boolean;
  onRemove(): void;
  onFavorite(): void;
  onQuantidade(value: number): void;
}
export const TodoItem = ({ nome, id, onRemove, onFavorite, favorito }: TodoItemProps) => {
  return (
    <li className={TodoItemStyles.List} key={id}>
      <TodoItemLayout>
        <Link to={`/detalhe/${id}`}>{nome}</Link>

        <button className={TodoItemStyles.BtnRemove} onClick={onRemove}>
          Remover
        </button>
        
        
        <BsStarFill onClick={onFavorite} className={`
            ${TodoItemStyles.star} 
            ${favorito ? TodoItemStyles.starFavorite : TodoItemStyles.starNotFavorite}
          `}
         />

      </TodoItemLayout>
    </li>
  );
};
