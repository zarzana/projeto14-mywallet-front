import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
  const name = localStorage.getItem('name');

  const [records, setRecords] = useState([]);

  const roundNumber = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2).replace('.', ',')
  };
  
  const getRecords = () => {
    const URL = `${import.meta.env.VITE_API_URL}/records`;
    const request = axios.get(URL, config);
    request
      .then((res) => {
        setRecords(res.data);
      })
      .catch((error) => { alert(error.response.data) });
  };

  useEffect(getRecords, []);

  let balance = 0;
  records.forEach(record => {
    if (record.type === 'in') { balance += Number(record.value) }
    else { balance -= record.value }
  });

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit data-test="logout" />
      </Header>

      <TransactionsContainer>
        <ul>
          {records.map(record => (
            <ListItemContainer key={record._id}>
              <div>
                <span>{dayjs.unix(record.timestamp).format('DD/MM')}</span>
                <strong data-test="registry-name">{record.description}</strong>
              </div>
              <Value color={record.type == 'in' ? 'positivo' : 'negativo'} data-test="registry-amount">
                {roundNumber(record.value)}
              </Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance >= 0 ? 'positivo' : 'negativo'} data-test="total-amount">{roundNumber(balance)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate('/nova-transacao/entrada')} data-test="new-income">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate('/nova-transacao/saida')} data-test="new-expense">
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )

}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`