import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import api from "../../../../services/api";

const Aluno = () => {
  const { id } = useParams();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [cursos, setCursos] = useState([]);
  const [aluno, setAluno] = useState([]);
  const route = process.env.MIX_APP_ROUTE;

  useEffect(() => {
    async function loadCursos() {
      const response = await api.get("cursos");
      setCursos(response.data.data);
    }
    loadCursos();
    if (id > 0) {
      async function loadAluno(id) {
        const response = await api.get(`alunos/${id}`);
        setAluno(response.data.data[0]);
      }
      loadAluno(id);
    }
  }, [id]);

  const handleChange = useCallback(
    async e => {
      setAluno({ ...aluno, [e.target.name]: e.target.value });
    },
    [aluno]
  );

  const onSubmit = useCallback(
    async data => {
      try {
        if (data.id > 0) {
          await api.put(`alunos/${data.id}`, data);
          toast.success("Aluno Alterado");
        } else {
          await api.post(`alunos`, data);
          toast.success("Aluno Cadastrado");
        }
        history.push(`${route}/aluno`);
      } catch (error) {
        toast.error(error.message);
      }
    },
    [history]
  );

  return (
    <>
      <Link to={`${route}/aluno`} className="btn btn-warning mb-2">
        <FaHandPointLeft /> Voltar
      </Link>
      <form
        method="POST"
        className="needs-validation"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <input type="hidden" name="id" value={id || ""} ref={register} />
        <div className="row">
          <div className="col-lg-12">
            <div className="input-group input-group-lg">
              <label className="input-group-text" htmlFor="nome">
                Nome:
              </label>
              <input
                type="text"
                className="form-control"
                name="nome"
                id="nome"
                required
                ref={register({ required: true })}
                value={aluno.nome || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="input-group input-group-lg">
              <label className="input-group-text" htmlFor="curso">
                Curso:
              </label>
              <select
                className="form-control"
                name="curso_id"
                id="curso"
                required
                ref={register({ required: true })}
                value={aluno.curso_id || ""}
                onChange={handleChange}
              >
                <option></option>
                {cursos.map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.nome}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="input-group input-group-lg">
              <label className="input-group-text" htmlFor="desc">
                Descrição:
              </label>
              <textarea
                className="form-control"
                name="descricao"
                id="desc"
                required
                ref={register({ required: true })}
                value={aluno.descricao || ""}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <button className="btn btn-primary" type="submit">
              <FaSave /> Salvar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Aluno;
