import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import axios from "axios";

export default function TransactionsPage() {

  let { tipo } = useParams();
  if (tipo == 'saida') { tipo = 'saída' }

  const navigate = useNavigate();

  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const sendTransaction = (e) => {
    e.preventDefault();
    const URL = `${import.meta.env.VITE_API_URL}/records`;
    const request = axios.post(URL, { 'value': value, 'description': description, 'type': tipo == 'entrada' ? 'in' : 'out' }, config);
    request
      .then((res) => { navigate('/home'); })
      .catch((error) => { alert(error.response.data) });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={sendTransaction}>
        <input placeholder="Valor" type="text" value={value} onChange={e => setValue(e.target.value)} data-test="registry-amount-input" />
        <input placeholder="Descrição" type="text" value={description} onChange={e => setDescription(e.target.value)} data-test="registry-name-input" />
        <button data-test="registry-save">Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )

}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
