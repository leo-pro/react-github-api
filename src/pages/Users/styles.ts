import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    background-color: #22272f;
    border: 1px solid #2b3137;
    border-radius: 6px;

    color: #cbd3db;
    transition: color 0.2s;
    transition: background-color 0.5s;
    transition: border-color 0.7s;

    padding: 5px 20px;

    font-size: 1rem;
    font-weight: 400;

    &:hover {
      background-color: ${shade(0.2, '#22272f')};
      border-color: #f1f1f1;
    }

    svg {
      vertical-align: middle;
      margin-right: 5px;
    }
  }

  img {
    width: 60px;
    margin-right: 4px;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
  color: #f1f7fd;
  max-width: 550px;
  line-height: 56px;
  margin-top: 35px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  input {
    height: 50px;
    padding: 0 24px;
    width: 79%;

    border: 1px solid #1f242b;
    border-radius: 6px;
    color: #3a3a3a;
    background-color: #f1f7fd;
    border-right: 0;

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #1f242b;
    }
  }

  button {
    width: 20%;
    height: 50px;

    background-color: #22272f;
    border: 1px solid #2b3137;
    border-radius: 6px;
    color: #fff;

    font-weight: 400;
    transition: background-color 0.5s;
    transition: border-color 0.7s;

    &:hover {
      background: ${shade(0.2, '#22272f')};
      border-color: #f1f1f1;
    }

    svg {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Users = styled.div`
  margin-top: 40px;
  max-width: 700px;

  a {
    width: 100%;
    padding: 15px 20px;
    display: block;
    display: flex;
    align-items: center;

    background: #0c1015;
    border: 1px solid #30363e;
    border-radius: 6px;

    text-decoration: none;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #cad2db;
      }
      span {
        font-size: 16px;
        color: #a8a8b3;
        font-weight: 400;
      }
      p {
        font-size: 16px;
        color: #a8a8b3;
        margin-top: 1px;
        font-weight: 400;
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
