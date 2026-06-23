import ListLayoutStyles from "./ListLayout.module.css";
interface IListLayout {
  children: React.ReactNode;
}

export const ListLayout = ({ children }: IListLayout) => {
  return (
    <ol className={ListLayoutStyles.PageList}>
      <li className={ListLayoutStyles.PageItens}>{children}</li>
    </ol>
  );
};
