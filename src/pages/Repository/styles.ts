import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    background-color: #22272f;
    color: #cbd3db;
    border: 1px solid #2b3137;
    border-radius: 6px;
    transition: color 0.2s;

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
    display: none;
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 40px;

  header {
    display: flex;
    max-width: 100%;
    align-items: center;
    flex-direction: column;

    img {
      width: 110px;
      height: 110px;
      border-radius: 50%;
    }

    div {
      text-align: center;

      strong {
        font-size: 36px;
        color: #cad2db;
        text-align: center;
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  ul {
    max-width: 100%;
    display: flex;
    justify-content: space-evenly;

    list-style: none;

    margin-top: 40px;

    li {
      text-align: center;

      strong {
        display: block;
        font-size: 28px;
        text-align: center;

        color: #cad2db;
      }
    }

    span {
      display: block;
      margin-top: 4px;
      color: #6c6c80;

      svg {
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 40px;

  a {
    width: 100%;
    padding: 24px;
    display: block;
    display: flex;
    align-items: center;

    background: #0c1015;
    border: 1px solid #30363e;
    border-radius: 6px;
    text-decoration: none;

    transition: background-color 0.5s;
    transition: border-color 0.7s;

    &:hover {
      background-color: ${shade(0.2, '#22272f')};
      border-color: #f1f1f1;
    }

    & + a {
      margin-top: 16px;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #cad2db;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cad2db;
    }
  }
`;
