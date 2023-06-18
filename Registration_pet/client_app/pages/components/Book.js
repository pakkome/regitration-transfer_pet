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
  background: ${({ theme }) => theme.toggleBook};
  padding: 2rem 1.188rem 1.625rem 1.688rem;
  border: solid 5px ${({ theme }) => theme.body};
  border-radius: 20px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  font-weight: bold;
  color: #6ba4ff;
  transition: background 0.40s linear;
  margin-bottom: 2.25rem;
  font-family: "Rockwell", monospace;

  > .first {
    font-family: var(--font-2);

    > p {
      opacity: 0.5;
      font-family: var(--font-1);
      font-size: 1.275rem;
      letter-spacing: normal;
      margin-bottom: 0.50rem;
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
      font-size: 1.275rem;
      font-weight: 300;
      color: var(--accent-color);
    }

    .buttons {
      margin-top: 1.313rem;

      > button {
        border: none;
        background: ${({ theme }) => theme.toggleBook};
        margin: 0.188rem 0.938rem 0.125rem 0;
        font-family: var(--font-2);
        font-size: 0.875rem;
        font-weight: 300;
        color: var(--accent-color);
        cursor: pointer;
        transition: background 0.40s linear;

        @media (max-width: 650px) {
          margin-top: 5px;
        }
      }

      > span {
        width: 0.125rem;
        height: 1.5rem;
        margin: 0.75rem 1.063rem 0 0.438rem;
        border: solid 1px var(--neutral-color-1);
        background: var(--neutral-color-1);

        @media (max-width: 650px) {
          display: none;
        }
      }

      @media (max-width: 650px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    @media (max-width: 650px) {
      grid-row: 1/3;
      margin-top: 30px;
    }
  }

  > .chapter {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-family: var(--font-2);

    > .chapter-name {
      font-family: var(--font-1);
      font-size: 0.875rem;
      opacity: 0.5;
      margin-bottom: 0.25rem;
      color: ${({ theme }) => theme.text};
      transition: color 0.40s linear;
    }

    > h3 {
      font-size: 1.125rem;
      letter-spacing: -0.2px;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.text};
      transition: color 0.40s linear;
    }

    > p {
      font-size: 0.875rem;
      font-weight: 300;
      margin-bottom: 0.625rem;
      color: ${({ theme }) => theme.text};
      transition: color 0.40s linear;
    }
  }

  > .third {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > img {
      width: 24px;
      height: 24px;
      cursor: pointer;
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 1.5rem 1.188rem 1.625rem 1.688rem;

    > .first {
      grid-row: 1/2;
    }

    > .third {
      grid-row: 2/3;
      justify-content: flex-start;
      margin-top: 10px;

      > img {
        margin-left: 2px;
      }
    }

    > .chapter {
      margin-top: 20px;
    }
  }
  table {
    width: 280%;
  }
`;

const Book = ({
  id,
  name,
  year,
  author,
  petnumber,
  breed,
  sex,
  dateofbirth,
  color,
  owner,
  finished,
  clickBookFinished,
  transferBookOwner,
}) => {
  const [newOwner, setNewOwner] = useState('');

  const handleTransferOwner = async (id, newOwner) => {
  transferBookOwner(id, newOwner);
  };

  return (
    <Container>
      <div className="first" style={{ color: '#193054' }}>
{/* 
        <span>{name}</span>
        <br/>
        <span>{author}</span>
        <br/>
        <span>{year}</span>
        <br/>
        <span>{petnumber}</span>
        <br/>
        <span>{breed}</span>
        <br/>
        <span>{sex}</span>
        <br/>
        <span>{dateofbirth}</span>
        <br/>
        <span>{color}</span>
        <br/>
        <span>{owner}</span>
        <br/> */}
    <table>
            <tr>
              <td>Pet Name :</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Animal Farm Name :</td>
              <td>{author}</td>
            </tr>
            <tr>
              <td>Year :</td>
              <td>{year}</td>
            </tr>
            <tr>
              <td>Registration No. :</td>
              <td>{petnumber}</td>
            </tr>
            <tr>
              <td>Breed :</td>
              <td>{breed}</td>
            </tr>
            <tr>
                <td>Sex : </td>
                <td>{sex}</td>
              </tr>
              <tr>
                <td>Date of birth :</td>
                <td>{dateofbirth}</td>
              </tr>
              <tr>
                <td>Color :</td>
                <td>{color}</td>
              </tr>
              <tr>
                <td>Owner :</td>
                <td>{owner}</td>
              </tr>
          </table><br></br> 
        {/* <h2>{name}</h2>
        <p>Author: {author}</p>
        <p>Year: {year}</p>
        <p>Pet Number: {petnumber}</p>
        <p>Breed: {breed}</p>
        <p>Sex: {sex}</p>
        <p>Date of Birth: {dateofbirth}</p>
        <p>Color: {color}</p>
        <p>Owner: {owner}</p>
        <br /> */}
        <span>
          {finished === 'false' ? (
            <button
              className="font-bold py-2 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out"
              onClick={() => clickBookFinished(id)}
              style={{ backgroundColor: '#bf2a2a', color: '#ffffff' }}
            >
              vaccine
            </button>
          ) : (
            <h4
              className="text-2 font-bold"
              style={{
                color: '#3e7867',
                width:"20em",
                height:"2em"
              }}
            >
              This pet has been vaccinated ✔
            </h4>
          )}
                    <div className="text-l font-bold">
          <p>Transfer Ownership</p>
          <br />
          <p>Current Owner: {owner}</p>
          <br />
          <p>
            New Owner:
            <input
              type="text"
              value={newOwner}
              placeholder="Input Address New Owner"
              style={{ padding: "15px" , margin: "8px", width:"50em"}}
              onChange={(e) => setNewOwner(e.target.value)}
            />
          </p>
          <br />
          {/* <div className="buttons"> */}
            <button 
            className="font-bold py-3 px-20 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out"
            onClick={() =>handleTransferOwner (id,newOwner)}
            style={{ backgroundColor: '#4169E1', color: '#ffffff' }}
            >

            Transfer Ownership

            </button>
            </div>
            <img
            src="https://cdn-icons-png.flaticon.com/512/4661/4661176.png"
            alt="Pedigree Certificate Verify"
            onClick={() => {
              // Handle the action for pedigree certificate verification
            }}
          />
          </span>
          </div>
          
    </Container>
  );
};

Book.propTypes = {
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
  clickBookFinished: PropTypes.func.isRequired,
  transferBookOwner: PropTypes.func.isRequired,
};

export default Book;
