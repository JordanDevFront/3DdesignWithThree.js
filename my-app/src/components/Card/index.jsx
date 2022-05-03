import styled from "styled-components";
import React from "react";

const Card = styled.div`
  width: 95%;
  height: 100px;
  margin:10px;
`;

const Container = styled.div`
border: 1px solid #708090;
background: #042628A3;
margin: 5px;
height: 55px;
text-align: center;
padding:15px;
border-radius: 4px;
`
const Total = styled.label`
font-size: 28px;
`

const Text = styled.label`

`

function CardInfo() {
  return <Card>
      <Container>
          <Total>65.00</Total>
          <br/>
          <Text>Total de usuários ativos</Text>
      </Container>
  </Card>;
}

export default CardInfo;
