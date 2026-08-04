import React, { useEffect, useState } from "react";
import { PageLayout } from "../../shared/layout/pageLayout/PageLayout";
import { useParams } from "react-router";
import InputStyles from "../../shared/components/Input/InputStyles.module.css";
import {
  TodoDetails,
  type ItodoDetails,
} from "../../shared/services/api/TodoDetails";
import { Input } from "../../shared/components/Input/Input";
import { IoAddSharp } from "react-icons/io5";

import DetailStyle from "./DetailStyle.module.css";
type Mode = "view" | "edit" | "create";
export const Detail = () => {
  const { id } = useParams(); // Recebendo via id
  const [Listdetalhes, setListDetalhes] = useState<ItodoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("view");
  const [formValues, setFormValues] = useState({
    detalhes: "",
    prioridade: "media",
    concluido: false,
  }); // Criei para valor temporario para edição. Aqui eu posso atualizar 2,3...
  const [editingId, setEditingId] = useState<number | null>(null);
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
        setLoading(true); // Carregando...
        setError(null);
        const response = await TodoDetails.getDetailByTask(id);
        if (response) {
          setListDetalhes(response);
          setFormValues({
            detalhes: response.detalhes || "",
            prioridade: response.prioridade || "",
            concluido: response.concluido || false,
          });
          setEditingId(Number(response.id) || null); // Passando valor do id pro EditingId (irei usar no PUT)
          setMode("view"); // Modo visualização.
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

    // Carregando valores atuais.
    setFormValues({
      detalhes: Listdetalhes?.detalhes || "",
      prioridade: Listdetalhes?.prioridade || "media",
      concluido: Listdetalhes?.concluido || false,
    });
    setEditingId(Number(Listdetalhes?.id) || null);
    setMode("edit"); // Ativa lá no JSX
  };

  const handleCancel = () => {
    if (Listdetalhes) {
      // Voltando para visualização com dados atuais;
      setFormValues({
        detalhes: Listdetalhes.detalhes || "",
        prioridade: Listdetalhes.prioridade || "media",
        concluido: Listdetalhes.concluido || false,
      });
      setMode("view");
    } else {
      // Se não tem detalhes, volto para o estado inicial;
      setMode("view");
    }
  };

  const handleCancelCreate = () => {
    handleCancel();
  };

  const handleCreate = () => {
    setMode("create");
    // Quando abrir formulario de criação, usar valores padrões
    setFormValues({
      detalhes: "",
      prioridade: "media",
      concluido: false,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    // Os valores dos input e select sendo salvo em formValues.
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.detalhes.trim()) {
      setError("A descrição é obrigatória!");
      return; // Parando execução;
    }
    try {
      if (mode == "edit" && editingId) {
        setIsSaving(true); // Aqui isSaving vai ser salvando...
        const response = await TodoDetails.PutDetail(
          editingId,
          formValues.detalhes,
          formValues.prioridade,
          formValues.concluido,
        );
        if (response) {
          setListDetalhes(response);

          setFormValues({
            detalhes: response.detalhes || "",
            prioridade: response.prioridade || "media",
            concluido: response.concluido || false,
          });
          setEditingId(Number(response.id) || null);
          // Quando atualizarmos, input some.
          setMode("view");
        }
      } else {
        setIsSaving(true);
        const response = await TodoDetails.CreateDetail(
          Number(id),
          formValues.detalhes,
          formValues.prioridade,
          formValues.concluido,
        );

        if (response) {
          setListDetalhes({
            id: response.id,
            detalhes: response.detalhes || formValues.detalhes,
            prioridade: response.prioridade || formValues.prioridade,
            concluido: response.concluido || formValues.concluido,
          });

          setEditingId(Number(response.id) || null);
          setMode("view");
        }
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

  if (!Listdetalhes && mode === "view") {
    return (
      <PageLayout title="Sem detalhes.">
        <div className={DetailStyle.EmptyState}>
          <h3>Esta tarefa não possui detalhes.</h3>
          <h3>Clique abaixo para adicionar detalhes na tarefa</h3>
          <div className={DetailStyle.EmptyStateIcon}>
            <IoAddSharp
              onClick={() => handleCreate()}
              className={DetailStyle.add}
            />
          </div>
          <div className={DetailStyle.EmptyStateLink}>
            <a href="/tasks">Voltar para lista</a>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!Listdetalhes && mode === "create") {
    return (
      <PageLayout title="Detalhes - Criar">
        <form onSubmit={handleSave} className={DetailStyle.Form}>
          <Input
            label="Detalhes"
            name="detalhes"
            required={true}
            type="text"
            placeHolder="Digite os detalhes da tarefa"
            className={InputStyles.inputEdit}
            onChange={handleChange}
            value={formValues.detalhes}
          />

          <label>
            <strong>Prioridade</strong>
          </label>
          <select
            name="prioridade"
            id="prioridade"
            value={formValues.prioridade}
            className={DetailStyle.select}
            onChange={handleChange}
          >
            {PrioridadeArray.map((p) => (
              <option key={String(p.nomeBackend)} value={String(p.nomeBackend)}>
                {p.nomeFrontEnd}
              </option>
            ))}
          </select>
          <div className={DetailStyle.selectGroup}>
            <label className={DetailStyle.selectLabel}>
              <strong>Concluido</strong>
            </label>
            <select
              name="concluido"
              id="concluido"
              value={String(formValues.concluido)}
              className={DetailStyle.select}
              onChange={handleChange}
            >
              {ConcluidoArray.map((c) => (
                <option
                  key={String(c.nomeBackend)}
                  value={String(c.nomeBackend)}
                >
                  {" "}
                  {String(c.nomeFrontEnd)}
                </option>
              ))}
            </select>
          </div>
          <button
            className={DetailStyle.ButtonSave}
            disabled={isSaving} // Ao clicado altera estado do isSaving
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => handleCancelCreate()}
            className={DetailStyle.ButtonCancel}
          >
            Cancelar
          </button>
        </form>
      </PageLayout>
    );
  }

  if (mode === "edit") {
    return (
      <PageLayout title="Detalhes - Editar">
        <form onSubmit={handleSave} className={DetailStyle.Form}>
          <p>
            <strong>Descrição</strong>
          </p>
          <Input
            type="text"
            name="detalhes"
            value={formValues.detalhes}
            required={false}
            className={InputStyles.inputEdit}
            onChange={handleChange}
          />
          <p>
            <strong>Prioridade</strong>
          </p>
          <select
            name="prioridade"
            id="prioridade"
            value={formValues.prioridade}
            onChange={handleChange}
            className={DetailStyle.select}
          >
            {PrioridadeArray.map((p) => (
              <option key={String(p.nomeBackend)} value={String(p.nomeBackend)}>
                {p.nomeFrontEnd}
              </option>
            ))}
          </select>
          <div className={DetailStyle.selectGroup}>
            <label className={DetailStyle.selectLabel}>
              <strong>Concluido</strong>
            </label>

            <select
              name="concluido"
              id="concluido"
              className={DetailStyle.select}
              value={String(formValues.concluido)}
              onChange={handleChange}
            >
              {ConcluidoArray.map((c) => (
                <option
                  key={String(c.nomeBackend)}
                  value={String(c.nomeBackend)}
                >
                  {" "}
                  {String(c.nomeFrontEnd)}
                </option>
              ))}
            </select>
          </div>
          <button
            className={DetailStyle.ButtonSave}
            disabled={isSaving} // Ao clicado altera estado do isSaving
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => handleCancel()}
            className={DetailStyle.ButtonCancel}
          >
            Cancelar
          </button>
        </form>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Detalhes">
      <div className={DetailStyle.Container}>
        <button className={DetailStyle.ButtonEdit} onClick={() => handleEdit()}>
          Editar
        </button>
        <div className={DetailStyle.InfoCard}>
          <span className={DetailStyle.InfoLabel}>📝 Descrição</span>
          <span className={DetailStyle.InfoValue}>
            {Listdetalhes?.detalhes || (
              <span className={DetailStyle.InfoValueEmpty}>Sem descrição</span>
            )}
          </span>
        </div>

        <div className={DetailStyle.InfoCard}>
          <span className={DetailStyle.InfoLabel}>🎯 Prioridade</span>
          <span className={DetailStyle.InfoValue}>
            {Listdetalhes?.prioridade || "baixa"}
          </span>
        </div>

        <div className={DetailStyle.InfoCard}>
          <span className={DetailStyle.InfoLabel}>✅ Status</span>
          <span
            className={
              Listdetalhes?.concluido
                ? DetailStyle.BadgeSuccess
                : DetailStyle.BadgeDanger
            }
          >
            {Listdetalhes?.concluido ? "✅ Concluído" : "❌ Pendente"}
          </span>
        </div>
      </div>
    </PageLayout>
  );
};
