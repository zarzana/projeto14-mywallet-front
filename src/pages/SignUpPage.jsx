import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function SignUpPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setpasswordConfirmation] = useState('');

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    if (password != passwordConfirmation) { return alert('As senhas devem ser iguais.') }
    const URL = `${import.meta.env.VITE_API_URL}/signup`;
    const request = axios.post(URL, { 'name': name, 'email': email, 'password': password });
    request
      .then((res) => { navigate('/') })
      .catch((error) => { alert(error.response.data) });
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={e => setName(e.target.value)} data-test="name" />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} data-test="email" />
        <input placeholder="Senha" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} data-test="password" />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" value={passwordConfirmation} onChange={e => setpasswordConfirmation(e.target.value)} data-test="cong-password" />
        <button data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )

}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
