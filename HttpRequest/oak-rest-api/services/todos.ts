import { fetchData, persistData } from './db.ts';
import { Todo } from '../models/todo.ts'
import { createId } from './util.ts';

type TodoData = Pick<Todo, 'userId' | 'title' | 'completed'>;

// 获取todo 列表
export const getTodos = async (): Promise<Todo[]> => {
  const todos = await fetchData();
  return todos.sort((a, b) => a.title.localeCompare(b.title))
}
// 获取todo详情
export const getTodo = async (todoId: string): Promise<Todo | undefined> => {
  const todos = await fetchData();
  return todos.find(({ id }) => id === todoId);
}

// 新建todo
export const createTodo = async (todoData: TodoData): Promise<string> => {
  const todos = await fetchData();
  const newTodo: Todo = {
    ...todoData,
    id: createId(),
  };
  await persistData([...todos, newTodo]);
  return newTodo.id;
}

// 更新todo
export const updateTodo = async (todoId: string, todoData: TodoData): Promise<void> => {
  const todos = await fetchData();

  const newTodos = todos.map(item => {
    if (item.id === todoId) {
      return {
        ...item,
        ...todoData,
      }
    } else {
      return item
    }
  }) 
  
  await persistData(newTodos)
}

// 删除todo
export const deleteTodo = async (todoId: string): Promise<void> => {
  const todos = await fetchData();

  const newTodos = todos.filter(item => item.id !== todoId)

  await persistData(newTodos)
}