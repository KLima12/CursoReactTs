import React, { useEffect, useState } from "react";
import { PageLayout } from "../../shared/layout/pageLayout/PageLayout";
import { useParams } from "react-router";
import {
  TodoDetails,
  type ItodoDetails,
} from "../../shared/services/api/TodoDetails";
import { Input } from "../../shared/components/Input/Input";

import DetailStyle from "./DetailStyle.module.css";
export const Detail = () => {
  const { id } = useParams(); // Recebendo via id
  const [Listdetalhes, setListDetalhes] = useState<ItodoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    id: 0,
    detalhes: "",
    prioridade: "",
    concluido: false,
  }); // Criei para valor temporario para edição. Aqui eu posso atualizar 2,3...
  const [isSaving, setIsSaving] = useState(false); // Controlar estado do button.
  const [loading, setLoading] = useState(true);

  interface PrioridadeItem {
    nomeBackend: string | boolean;
    nomeFrontEnd: string;
  }

  interface ConcluidoItem {
    nomeBackend: boolean;
    nomeFrontEnd: string;
  }

  const PrioridadeArray: PrioridadeItem[] = [
    { nomeBackend: "baixa", nomeFrontEnd: "Baixa" },
    { nomeBackend: "media", nomeFrontEnd: "Média" },
    { nomeBackend: "alta", nomeFrontEnd: "Alta" },
  ];

  const ConcluidoArray: ConcluidoItem[] = [
    { nomeBackend: true, nomeFrontEnd: "Sim" },
    { nomeBackend: false, nomeFrontEnd: "Não" },
  ];
  useEffect(() => {
    const getDetails = async () => {
      if (!id) {
        setError("ID da tarefa não encontrado");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await TodoDetails.getDetailByTask(id);
        if (response) {
          console.log(`response detalhess: ${response}`);
          setListDetalhes(response);
          setEditValues({
            id: Number(response.id),
            detalhes: response.detalhes || "",
            prioridade: response.prioridade || "",
            concluido: response.concluido || false,
          }); // Pegando valor de detalhe
        }
      } catch (error) {
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
    setIsEditing(true); // Ativa lá no JSX
  };

  const handleCancel = () => {
    setIsEditing(false); // Input some.
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Listdetalhes || !id) return;

    try {
      setIsSaving(true); // Aqui isSaving vai ser salvando...
      const response = await TodoDetails.PutDetail(
        editValues.id,
        editValues.detalhes,
        editValues.prioridade,
        editValues.concluido,
      );
      if (response) {
        setListDetalhes({
          ...Listdetalhes,
          id: response.id || Listdetalhes.id,
          detalhes: editValues.detalhes,
          prioridade: editValues.prioridade,
          concluido: editValues.concluido ?? editValues.concluido,
        });

        setEditValues({
          ...editValues,
          concluido: response.concluido ?? editValues.concluido,
        });

        // Quando atualizarmos, input some.
        setIsEditing(false);
      }
    } catch (error) {
      console.log("Erro no saveEdit: ", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <PageLayout title="Detalhes">
        <div>Carregando detalhes...</div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="Detalhes">
        <div style={{ color: "red", padding: "20px" }}>
          {error}
          <div style={{ marginTop: "16px" }}>
            <a href="/tasks">Voltar para lista</a>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!Listdetalhes) {
    return (
      <PageLayout title="Detalhes">
        <div>
          <p>Esta tarefa não possui detalhes.</p>
          <div style={{ marginTop: "16px" }}>
            <a href="/tasks">Voltar para lista</a>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Detalhes da tarefa">
      {isEditing ? (
        <form onSubmit={handleSaveEdit}>
          <p>
            <strong>Descrição: {Listdetalhes.detalhes} </strong>
          </p>
          <Input
            type="text"
            name="detalhes"
            value={editValues.detalhes}
            required={false}
            onChange={handleChange}
          />

          <button
            className={DetailStyle.save}
            disabled={isSaving} // Ao clicado altera estado do isSaving
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>

          <p>
            <strong>Prioridade: {Listdetalhes.prioridade || "baixa"}</strong>
          </p>
          <select
            name="prioridade"
            id="prioridade"
            value={editValues.prioridade}
            onChange={handleChange}
          >
            {PrioridadeArray.map((p) => (
              <option key={String(p.nomeBackend)} value={String(p.nomeBackend)}>
                {p.nomeFrontEnd}
              </option>
            ))}
          </select>

          <p>
            <strong>Concluido: {Listdetalhes.concluido || "Não"}</strong>
          </p>

          <select
            name="concluido"
            id="concluido"
            value={String(editValues.concluido)}
            onChange={handleChange}
          >
            {ConcluidoArray.map((c) => (
              <option key={String(c.nomeBackend)} value={String(c.nomeBackend)}>
                {" "}
                {String(c.nomeFrontEnd)}
              </option>
            ))}
          </select>
          <button onClick={() => handleCancel()}>Cancelar</button>
        </form>
      ) : (
        <>
          <button onClick={() => handleEdit()}>Editar</button>
          <p>
            <strong>Descrição: {Listdetalhes.detalhes}</strong>
          </p>

          <p>
            <strong>Prioridade: {Listdetalhes.prioridade || "baixa"}</strong>
          </p>

          <p>
            <strong>Concluida: </strong>{" "}
            {editValues.concluido !== undefined
              ? editValues.concluido
                ? "Sim"
                : "Não"
              : Listdetalhes.concluido
                ? "Sim"
                : "Não"}
          </p>
        </>
      )}
    </PageLayout>
  );
};
