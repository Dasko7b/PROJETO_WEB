// App.js
import { useEffect, useState, useRef, useCallback } from 'react'; 
import './style.css';
import Trash from '../src/assets/excluir.png';
import api from '../../Frontend/src/services/api';
import Edit from '../src/assets/edit.png';

function App() {
  const [materias, setMaterias] = useState([]);
  const [editId, setEditId] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const inputName = useRef();
  const inputProfessor = useRef();
  const inputSemestre = useRef();
  const inputFaltas = useRef();

  // Função para buscar as matérias
  const getMaterias = useCallback(async () => {
    try {
      const materiasFromApi = await api.get('/materias');
      setMaterias(materiasFromApi.data);
    } catch (error) {
      console.error('Erro ao buscar matérias:', error);
    }
  }, []);

  // Função de validação do formulário
  const validateForm = useCallback(() => {
    const name = inputName.current.value.trim();
    const professor = inputProfessor.current.value.trim();
    const semestre = parseInt(inputSemestre.current.value);
    const faltas = parseInt(inputFaltas.current.value);

    if (!name || !professor || isNaN(semestre) || isNaN(faltas)) {
      setErrorMessage('Por favor, preencha todos os campos corretamente.');
      return false;
    }

    if (semestre <= 0 || faltas < 0) {
      setErrorMessage('O semestre deve ser maior que 0 e as faltas não podem ser negativas.');
      return false;
    }

    // Validação para verificar se a matéria já existe
    const isDuplicate = materias.some(
      (materia) => materia.materia.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate && !editId) {
      setErrorMessage('Essa matéria já está cadastrada.');
      return false;
    }

    setErrorMessage('');
    return true;
  }, [materias, editId]);

  // Função para atualizar a matéria
  const updateMaterias = useCallback(async () => {
    if (!validateForm()) return;

    if (!editId) return;

    try {
      await api.put(`/materias/${editId}`, {
        materia: inputName.current.value,
        professor: inputProfessor.current.value,
        semestre: parseInt(inputSemestre.current.value),
        faltas: parseInt(inputFaltas.current.value),
      });

      resetForm();
      setEditId(null);
      getMaterias();
    } catch (error) {
      console.error('Erro ao atualizar matéria:', error);
    }
  }, [editId, validateForm, getMaterias]);

  // Inicia o modo de edição
  const startEdit = useCallback((materia) => {
    if (editId) {
      setErrorMessage('Finalize a edição atual antes de editar outra matéria.');
      return;
    }

    setEditId(materia.id);
    inputName.current.value = materia.materia;
    inputProfessor.current.value = materia.professor;
    inputSemestre.current.value = materia.semestre;
    inputFaltas.current.value = materia.faltas;
  }, [editId]);

  // Função para criar nova matéria
  const createMaterias = useCallback(async () => {
    if (!validateForm()) return;

    try {
      await api.post('/materias', {
        materia: inputName.current.value,
        professor: inputProfessor.current.value,
        semestre: parseInt(inputSemestre.current.value),
        faltas: parseInt(inputFaltas.current.value),
      });

      getMaterias();
      resetForm();
    } catch (error) {
      console.error('Erro ao criar matéria:', error);
    }
  }, [validateForm, getMaterias]);

  // Função para excluir matéria
  const deleteMaterias = useCallback(async (id) => {
    try {
      await api.delete(`/materias/${id}`);
      getMaterias();
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao excluir matéria:', error);
    }
  }, [getMaterias]);

  // Função para abrir o modal de confirmação de exclusão
  const handleDelete = useCallback((materiaId) => {
    if (editId) {
      setErrorMessage('Finalize a edição atual antes de excluir uma matéria.');
      return;
    }
    setDeleteId(materiaId);
    setShowModal(true);
  }, [editId]);

  // Função para resetar o formulário
  const resetForm = useCallback(() => {
    inputName.current.value = '';
    inputProfessor.current.value = '';
    inputSemestre.current.value = '';
    inputFaltas.current.value = '';
  }, []);

  useEffect(() => {
    getMaterias();
  }, [getMaterias]);

  return (
    <div className="container">
  <form>
    <h1>Cadastro de Materias</h1>
    <input placeholder="Nome da Materia" name="materia" type="text" ref={inputName} />
    <input placeholder="Nome do Professor" name="professor" type="text" ref={inputProfessor} />
    <select name="periodo" ref={inputSemestre} defaultValue="" className="custom-select">
  <option value="" disabled>Qual período?</option>
  {[...Array(12)].map((_, i) => (
    <option key={i + 1} value={i + 1}>
      {i + 1}
    </option>
  ))}
</select>

    <input placeholder="Quantas Faltas?" name="faltas" type="number" ref={inputFaltas} />

    {errorMessage && <div className="error-message">{errorMessage}</div>}

    <button type="button" onClick={editId ? updateMaterias : createMaterias}>
      {editId ? 'Atualizar' : 'Cadastrar'}
    </button>
  </form>

  <div className="cards-container">
    {materias.map(materia => (
      <div key={materia.id} className="card">
        <div>
          <p>Materia: <span>{materia.materia}</span></p>
          <p>Professor: <span>{materia.professor}</span></p>
          <p>Semestre: <span>{materia.semestre}</span></p>
          <p>Faltas: <span>{materia.faltas}</span></p>
        </div>
        <div className="actions">
          <button onClick={() => startEdit(materia)}>
            <img src={Edit} alt="Editar" />
          </button>
          <button onClick={() => handleDelete(materia.id)}>
            <div className="img-trash">
              <img src={Trash} alt="Excluir" />
            </div>
          </button>
        </div>
      </div>
    ))}
  </div>

  {showModal && (
    <div className="modal">
      <div className="modal-content">
        <h2>Tem certeza que deseja excluir esta matéria?</h2>
        <div className="modal-actions">
          <button onClick={() => deleteMaterias(deleteId)}>Sim</button>
          <button onClick={() => setShowModal(false)}>Não</button>
        </div>
      </div>
    </div>
  )}
</div>

  );
}

export default App;
