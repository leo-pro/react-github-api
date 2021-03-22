import React, { useState, useEffect, FormEvent } from 'react';
import { HiSearch, HiOutlineEye } from 'react-icons/hi';
import { GoRepo } from 'react-icons/go';
import { Link } from 'react-router-dom';
import api from '../../services/user';

import imgLogo from '../../assets/logo.png';

import { Header, Title, Form, Users, Error } from './styles';

interface UserData {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
}

const User: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [inputError, setinputError] = useState('');

  const [users, setUsers] = useState<UserData[]>(() => {
    const storagedUsers = localStorage.getItem('@GitHubExplorer:users');

    if (storagedUsers) {
      return JSON.parse(storagedUsers);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GitHubExplorer:users', JSON.stringify(users));
  }, [users]);

  async function handleAddUser(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newUser) {
      setinputError('O campo não pode estar vazio');
      return;
    }

    try {
      const response = await api.get<UserData>(`${newUser}`);
      const repository = response.data;

      setUsers([...users, repository]);
      setNewUser('');
      setinputError('');
    } catch {
      setinputError('Não foi possível encontrar o usuário');
    }
  }

  return (
    <>
      <Header>
        <img src={imgLogo} alt="Github Explorer" />
        <Link to="/">
          <GoRepo size={16} /> Repos
        </Link>
      </Header>
      <Title>Encontre usuários do Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddUser}>
        <input
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Digite o nome do usuário"
        />
        <button type="submit">
          <HiSearch /> Pesquisar
        </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Users>
        {users.map((user) => (
          <Link key={user.login} to={`user/${user.login}`}>
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <strong>{user.name}</strong>
              <span> {user.login}</span>
              <p>{user.bio}</p>
              <p>{user.html_url}</p>
            </div>

            <HiOutlineEye size="20" />
          </Link>
        ))}
      </Users>
    </>
  );
};

export default User;
