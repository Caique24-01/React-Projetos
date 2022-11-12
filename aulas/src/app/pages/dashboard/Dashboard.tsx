import { useCallback, useEffect, useState } from "react";
import { ApiException } from "../../shared/services/api/ApiException";
import {
  ITarefa,
  TarefasServices,
} from "../../shared/services/api/tarefas/TarefasService";

export const Dashboard = () => {
  const [lista, setLista] = useState<ITarefa[]>([]);

  useEffect(() => {
    TarefasServices.getAll().then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        setLista(result);
      }
    });
  }, []);

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        if (e.key === "Enter") {
          if (e.currentTarget.value.trim().length === 0) return;

          const value = e.currentTarget.value;

          e.currentTarget.value = "";

          if (lista.some((ListItem) => ListItem.title === value)) return;

          TarefasServices.create({ title: value, isCompleted: false }).then(
            (result) => {
              if (result instanceof ApiException) {
                alert(result.message);
              } else {
                setLista((oldLista) => {
                  return [...oldLista, result];
                });
              }
            }
          );
        }
      },
      [lista]
    );

  const handleToggleComplete = useCallback((id: number) => {
      const tarefaUpdate = lista.find((tarefa) => tarefa.id === id);
      if (!tarefaUpdate) return;

      TarefasServices.updateById(id, {
        ...tarefaUpdate,
        isCompleted: !tarefaUpdate.isCompleted,
      }).then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setLista((oldList) => {
            return oldList.map((oldListItem) => {
              if (oldListItem.id === id) return result;
              return oldListItem;
            });
          });
        }
      });
    },
    [lista]
  );

  const handleDelete = useCallback(
    (id: number) => {
      TarefasServices.deleteById(id).then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setLista((oldList) => { return oldList.filter(oldListItem => oldListItem.id !== id);});
        }
      });
    },
    []
  );

  return (
    <div>
      <p>Lista</p>

      <input onKeyDown={handleInputKeyDown} />

      <ul>
        {lista.map((ListItem) => {
          return (
            <li key={ListItem.id}>
              <input
                type="checkbox"
                checked={ListItem.isCompleted}
                onChange={() => handleToggleComplete(ListItem.id)}
              />
              {ListItem.title}

              <button onClick={() => handleDelete(ListItem.id)}>Apagar</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};