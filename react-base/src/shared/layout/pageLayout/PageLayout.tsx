import PageLayoutStyles from "./PageLayout.module.css";
interface IPageLayoutProps {
  title: string;
  children: React.ReactNode;
}
export const PageLayout = ({ children, title }: IPageLayoutProps) => {
  return (
    <div className={PageLayoutStyles.PageLayoutContainer}>
      <div>
        <h1>{title}</h1>
      </div>
      <div>{children}</div>
    </div>
  );
};
