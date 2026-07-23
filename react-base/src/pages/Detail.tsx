import { useEffect, useState } from "react";
import { PageLayout } from "../shared/layout/pageLayout/PageLayout";
import { useParams, useSearchParams } from "react-router";
import { TodoDetails, type ItodoDetails } from "../shared/services/api/TodoDetails";
export const Detail = () => {
  const { id } = useParams(); // Recebendo via id
  const [searchParams] = useSearchParams();
  const [listDetails, setListaDetails] = useState<ItodoDetails[]>([]);
  const [error, setError] = useState<string  | null>(null);
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
        const response = await TodoDetails.getDetail(id);
        if (response) { 
          setListaDetails(response);
          console.log(response);
        }
      } catch(error) { 
        console.log("Erro ao buscar detalhes dessa tarefa: ", error);
        setError("Erro ao buscar detalhes dessa tarefa");
      } finally { 
        setError("Erro ao carregar detalhes");
      }
    }; 
    getDetails();
  }, [id]);

  return (
    <PageLayout title="Detalhes">
      Detail {id} {searchParams.get("filter")}
    </PageLayout>
  );
};
