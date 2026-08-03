import { api } from "../../api/api";

export interface ItodoDetails {
  id: string;
  detalhes?: string;
  concluido: boolean;
  prioridade?: string;
}

export const TodoDetails = {
  async getDetailByTask(id: string): Promise<ItodoDetails | undefined> {
    try {
      const response = api.get(`/api/detalhes/by_task/?todo_id=${id}`);

      return (await response).data as ItodoDetails; // Retornando um objeto diretamente.
    } catch (error) {
      console.log("Houve um erro ao pegar usuários: ", error);
      return undefined;
    }
  },

  async PutDetail(
    id: number,
    detalhe: string,
    prioridade: string,
    concluido: boolean,
  ) {
    try {
      console.log("Concluido vindo: ", concluido);
      const response = await api.patch(`/api/detalhes/${id}/`, {
        detalhes: detalhe,
        prioridade: prioridade,
        concluido: concluido,
      });
      return response.data;
    } catch (error) {
      console.log("Deu um erro: ", error);
    }
  },

  async CreateDetail(
    id: number,
    detalhe: string,
    prioridade: string,
    concluido: boolean,
  ) {
    console.log("Chegou aqui no CreateDetail");
    try {
      const response = await api.post(`/api/detalhes/`, {
        id: id,
        detalhes: detalhe,
        prioridade: prioridade,
        concluido: concluido,
      });

      if (response) {
        console.log("response retornado: ", response.data);
        return response.data;
      }
    } catch (error) {
      console.log("Houve um erro ao criar: ", error);
    }
  },
};
