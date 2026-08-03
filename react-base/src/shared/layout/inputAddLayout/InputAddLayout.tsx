import InputAddLayoutStyles from "./InputAddLayout.module.css";
interface IInputAddLayout {
  children: React.ReactNode;
}

export const InputAddLayout = ({ children }: IInputAddLayout) => {
  return (
    <div>
      <div className={InputAddLayoutStyles.InputBase}>{children}</div>
    </div>
  );
};
