interface TodoItemProps {
  nome: string;
  quantidade: number;
  favorito: boolean;
  onRemove(): void;
  onFavorite(): void;
  onQuantidade(value: number): void;
}
export const TodoItem = ({
  nome,
  quantidade,
  favorito,
  onRemove,
  onFavorite,
  onQuantidade,
}: TodoItemProps) => {
  return (
    <li>
      <span>{nome}</span>
      <span> qtd: {quantidade}</span>
      <span> favorito: {favorito ? "Sim" : "Não"}</span>
      <button onClick={onRemove}>Remover</button>
      <button onClick={() => onFavorite()}>Favoritar</button>
      <button onClick={() => onQuantidade(1)}>+</button>
      <button onClick={() => onQuantidade(-1)}>-</button>
    </li>
  );
};
