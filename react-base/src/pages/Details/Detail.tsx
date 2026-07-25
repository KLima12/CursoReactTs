import React, { useEffect, useState } from "react";
import { PageLayout } from "../../shared/layout/pageLayout/PageLayout";
import { useParams } from "react-router";
import { TodoDetails, type ItodoDetails } from "../../shared/services/api/TodoDetails";
import { Input } from "../../shared/components/Input/Input";

import DetailStyle from './DetailStyle.module.css'
export const Detail = () => {
  const { id } = useParams(); // Recebendo via id
  const [detalhe, setDetalhe] = useState<ItodoDetails| null>(null);
  const [error, setError] = useState<string  | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(""); // Criei para valor temporario para edição
  const [isSaving, setIsSaving] = useState(false); // Controlar estado do button.
  const [loading, setLoading] = useState(true);
  useEffect(() => { 
    const getDetails = async () => { 
      if(!id) { 
        setError("ID da tarefa não encontrado");
        setLoading(false);
        return;
      }
      try{
        setLoading(true);
        setError(null);  
        const response = await TodoDetails.getDetailByTask(id);
        if (response) { 
          console.log(`response detalhess: ${response}`);
          setDetalhe(response);
          setEditValue(response.detalhes || ""); // Pegando valor de detalhe
        }
      } catch(error) { 
        console.log("Erro ao buscar detalhes dessa tarefa: ", error);
        setError("Erro ao buscar detalhes dessa tarefa");
      } finally { 
        setLoading(false);
      }
    }; 
    getDetails();
  }, [id]);


  const handleEdit = () => { 
    // Ao ativado, ele vai abrir o input, o estado se tornará true. 
    if (detalhe) { 
      setEditValue(detalhe.detalhes || "");
    }
    setIsEditing(true); // Ativa lá no JSX
  }

  const handleCancel = () => { 
    setIsEditing(false); // Input some.
    if (detalhe) { 
      setEditValue(detalhe.detalhes || "");
    }
  }

  const handleSaveEdit = async () =>  {
    if (!detalhe || !id) return;

    try { 
      setIsSaving(true); // Aqui isSaving vai ser salvando...
      
      const response = await TodoDetails.PutDetail(detalhe.id, editValue, detalhe.prioridade || "baixa", detalhe.concluido);
      if (response) { 
        setDetalhe({
          ...detalhe, 
          detalhes: editValue
        });

        // Quando atualizarmos, input some.
        setIsEditing(false);
      }
    } catch(error) { 
      console.log("Erro no saveEdit: ", error);
    } finally { 
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setEditValue(e.target.value);
  }

   if (loading) { 
    return ( 
      <PageLayout title="Detalhes">
        <div>Carregando detalhes...</div>
      </PageLayout>
    )
  }

  if (error) { 
    return (
      <PageLayout title="Detalhes"> 
      <div style={{color: 'red', padding: '20px'}}>
        {error}
        <div style={{marginTop: '16px'}}>
          <a href="/tasks">Voltar para lista</a>
        </div>
      </div>
    </PageLayout>  
    )
    
  }

  if (!detalhe) { 
    return ( 
      <PageLayout title="Detalhes"> 
        <div> 
          <p>Esta tarefa não possui detalhes.</p>
          <div style={{marginTop: '16px'}}>
            <a href="/tasks">Voltar para lista</a>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout title="Detalhes da tarefa">
          {isEditing ? ( 
            <>
              <p><strong>Descrição: {detalhe.detalhes} <button onClick={handleCancel}>Cancelar</button></strong></p>
              <Input 
              type="text"
              value={editValue}
              required={false}
              onChange={handleChange}
              />

              <button 
              className={DetailStyle.save}
              onClick={handleSaveEdit}
              disabled={isSaving} 
              >
                {isSaving ? 'Salvando...' : 'Salvar'}
              </button>
              
          </>
          ) : <p><strong>Descrição: {detalhe.detalhes} <button onClick={handleEdit}>Editar</button></strong></p>}
      
      <p><strong>Prioridade: {detalhe.prioridade || "baixa"}</strong></p>

      <p><strong>Concluida: {detalhe.concluido ? "true" : "false"}</strong></p>
    </PageLayout>
  );
};
