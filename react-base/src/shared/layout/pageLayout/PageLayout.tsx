import PageLayoutStyles from "./PageLayout.module.css";
interface IPageLayoutProps {
  title: string;
  children: React.ReactNode;
}
export const PageLayout = ({ children, title }: IPageLayoutProps) => {
  return (
    <div className={PageLayoutStyles.PageLayoutContainer}>
      <div className={PageLayoutStyles.PageContent}>
        <div>
          <h2 className={PageLayoutStyles.PageTitle}>{title}</h2>
        </div>
        <div className={PageLayoutStyles.PageChildren}>{children}</div>
      </div>
    </div>
  );
};
