import { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
0% {
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}
100% {
  -webkit-transform: scale(1);
  transform: scale(1);
}
`;

const Container = styled.div`
  animation: ${slideIn} 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  display: grid;
  grid-template-columns: 38% 20% 5% 37%;
  gap: 0 10px;
  background:${({ theme }) => theme.toggleBook};
  padding: 0.188rem 0.625rem 0.688rem;
  border: solid 5px ${({ theme }) => theme.body};
  border-radius: 60px;
  color: #010c4a;
  transition: background 0.40s linear;
  margin-bottom: 1.25rem;
  font-family: "Comic Sans MS", monospace;
  font-size: 20px;
  text-align: center;
  > .first {
    font-family: var(--font-2);
    > p {
      opacity: 0.5;
      font-family: var(--font-1);
      font-size: 0.875rem;
      letter-spacing: normal;
      margin-bottom: 0.25rem;
      color: ${({ theme }) => theme.text};
      transition: color 0.40s linear;
    }
    > h2 {
      font-size: 1.375rem;
      letter-spacing: -0.2px;
      color: ${({ theme }) => theme.text};
      transition: color 0.40s linear;
    }
    > span {
      font-size: 0.875rem;
      font-weight: 300;
      color: var(--accent-color);
    }
    .buttons {
      margin-top: 1.313rem;
      > button {
        border: none;
        background:${({ theme }) => theme.toggleBook};
        margin: 0.188rem 0.938rem 0.125rem 0;
        font-family:var(--font-2);
        font-size: 0.875rem;
        font-weight: 300;
        color: var(--accent-color);
        cursor: pointer;
        transition: background 0.40s linear;
        @media (max-width: 650px){
          margin-top: 5px;
        }
      }
      > span {
        width: 0.125rem;
        height: 1.5rem;
        margin: 0.75rem 1.063rem 0 0.438rem;
        border: solid 1px var(--neutral-color-1);
        background:  var(--neutral-color-1);
        @media (max-width: 650px){
          display: none;
        }
      }
      @media (max-width: 650px){
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
    }
    @media (max-width: 650px){
      grid-row: 1/3;
      margin-top: 30px;
    }
  }
  > .chapter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: var(--font-2);
    font-weight: 300;
    color: ${({ theme }) => theme.text};
    transition: color 0.40s linear;
    > p {
      margin: 0.063rem 3.625rem 0 0;
      opacity: 0.5;
      font-size: 0.813rem;
    }
    > span {
      margin: 0.438rem 6.813rem 0.25rem 0;
      font-size: 1rem;
      letter-spacing: -0.4px;
    }
    > div {
      margin-top: 1.438rem;
    }font
    @media (max-width: 768px){

    }
  }
  > .progress {
    display: flex;
    align-items: center;
    font-weight: normal;
    color: ${({ theme }) => theme.text};
    transition: color 0.40s linear;
    > div:nth-of-type(2) {
      margin-left: 1.313rem;
      > p {
        font-size: 2rem;
        @media (max-width: 450px){
         font-size: 1rem
        }
      }
      > span {
        font-size: 0.875rem;
        opacity: 0.5;
      }
    }
  }
  > span {
    width: 0.125rem;
    height: 4.375rem;
    margin-top: 1.125rem;
    background:  var(--neutral-color-1);
    border: solid 1px var(--neutral-color-1);
    @media (max-width: 650px){
    display: none;
  }
  }
  @media (max-width: 768px){
    grid-template-columns: 38% 20% 5% 37%;
  }
  @media (max-width: 650px){
    grid-template-columns: 50% 50%;
    padding: 10px 15px;
  }
  table {
    width: 280%;
  }
`;


const Book2 = ({
  id, name, year, author, petnumber, breed, sex, dateofbirth, color, owner, finished, clickBookFinished,transferBookOwner
}) => {

  return (
    <Container>
      <div className="first" style={{color:"#000000",textAlign:"center"}}>
      <table>
      <tr>
      <td>Registration No. : {petnumber} </td>
      </tr>
      </table>
      </div>
    </Container>
  );
};

Book2.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  petnumber: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  dateofbirth: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  finished: PropTypes.string.isRequired,
  clickBookFinished: PropTypes.string.isRequired,
  transferBookOwner: PropTypes.func.isRequired,
};

export default Book2;
