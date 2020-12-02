import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { FaRegEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import api from "../../../services/api";
import Table from "../../../components/Table";

const Aluno = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const route = process.env.MIX_APP_ROUTE;

  async function loadAlunos() {
    const response = await api.get("alunos");
    setData(response.data.data);
  }

  useEffect(() => {
    loadAlunos();
  }, []);

  const handleEdit = useCallback(
    id => {
      history.push(`${route}/aluno/${id}`);
    },
    [history]
  );

  const handleRemove = useCallback(
    async id => {
      confirmAlert({
        title: "Atenção",
        message: "Tem certeza?",
        buttons: [
          {
            label: "Sim",
            onClick: async () => {
              try {
                await api.delete(`alunos/${id}`);
                await loadAlunos();
                toast.success("Aluno removido");
              } catch (error) {
                toast.error("Falha ao remover!");
              }
            }
          },
          { label: "Não" }
        ]
      });
    },
    [loadAlunos]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Dados",
        columns: [
          {
            Header: "Nome",
            accessor: "nome"
          },
          {
            Header: "Curso",
            accessor: "curso.nome"
          },
          {
            Header: "Descrição",
            accessor: "descricao"
          }
        ]
      },
      {
        Header: "Operações",
        columns: [
          {
            Header: "Editar",
            Cell: ({ row }) => (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleEdit(row.original.id)}
              >
                <FaRegEdit />
              </button>
            )
          },
          {
            Header: "Remover",
            Cell: ({ row }) => (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemove(row.original.id)}
              >
                <FaTrashAlt />
              </button>
            )
          }
        ]
      }
    ],
    []
  );

  return (
    <>
      <div className="row">
        <div className="col-lg-12 mb-2">
          <Link className="btn btn-primary" to={`${route}/aluno/0`}>
            <FaPlusCircle /> Adicionar
          </Link>
        </div>
      </div>
      <Table columns={columns} data={data} />
    </>
  );
};

export default Aluno;
