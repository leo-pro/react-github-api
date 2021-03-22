import React, { useState, useEffect, FormEvent } from 'react';
import { HiSearch, HiUserGroup, HiOutlineEye } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import imgLogo from '../../assets/logo.png';

import { Header, Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard = (): JSX.Element => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setinputError] = useState('');

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GitHubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setinputError('Digite o usuário/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setinputError('');
    } catch {
      setinputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <Header>
        <img src={imgLogo} alt="Github Explorer" />
        <Link to="/users">
          <HiUserGroup size={16} /> Users
        </Link>
      </Header>
      <Title>Encontre repositórios do Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o usuario/nome do repositório, ex: facebook/react"
        />
        <button type="submit">
          <HiSearch /> Pesquisar
        </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <HiOutlineEye size="20" />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
