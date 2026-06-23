import InputAddLayoutStyles from "./InputAddLayout.module.css";
interface IInputAddLayout {
  children: React.ReactNode;
}

/*Cuida do visual*/
export const InputAddLayout = ({ children }: IInputAddLayout) => {
  return (
    <div>
      <div className={InputAddLayoutStyles.InputEnviar}>{children}</div>
    </div>
  );
};
