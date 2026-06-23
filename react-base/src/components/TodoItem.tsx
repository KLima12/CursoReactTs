import { Link } from "react-router";
import { TodoItemLayout } from "../shared/layout/TodoItemLayout/TodoItemLayout";
interface TodoItemProps {
  id: string;
  nome: string;
  quantidade: number;
  favorito: boolean;
  onRemove(): void;
  onFavorite(): void;
  onQuantidade(value: number): void;
}
export const TodoItem = ({ nome, id, onRemove }: TodoItemProps) => {
  return (
    <li key={id}>
      <TodoItemLayout>
        <Link to={`/detalhe/${id}`}>{nome}</Link>

        <button onClick={onRemove}>Remover</button>
      </TodoItemLayout>
    </li>
  );
};
