import TodoItemLayoutStyles from "./TodoItemLayout.module.css";
interface ITodoItemLayout {
  children: React.ReactNode;
}

export const TodoItemLayout = ({ children }: ITodoItemLayout) => {
  return <div className={TodoItemLayoutStyles.todoBase}>{children}</div>;
};
