import styled from "styled-components";

export const Container = styled.div`
  max-width: 550px;
  min-height: 85vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 3rem 0;
    gap: 2.5rem;
    margin-top: 80px;
    margin-bottom: 80px;
    background-color: #ecf0f3;
    border-radius: 10px;
    box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.3);

    h1 {
      font-size: 50px;
      font-weight: 200;
    }

    form {
      width: 90%;
      display: flex;
      flex-direction: column;
      width: 400px;

      .error {
        margin-top: -1.2rem;
        margin-bottom: 1.2rem;
        color: #ee7518;
      }

      input {
        background-color: #ecf0f3;
        padding: 15px;
        font-size: 18px;
        border-radius: 15px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        margin-bottom: 1.8rem;

        &:focus {
          outline: none;
          box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
        }

        &::placeholder {
          font-style: "Raleway", sans-serif;
          font-weight: 200 !important;
        }
      }

      .btn {
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
          color: #417f07;
          font-size: 18px;
          font-weight: 300;
        }

        button {
          background-color: #ebdf00;
          color: #333;
          font-size: 20px;
          padding: 12px 15px;
          border-radius: 10px;
          cursor: pointer;
        }
      }
    }
  }
`;
