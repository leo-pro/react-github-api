import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { HiOutlineUsers } from 'react-icons/hi';
import {
  GoTriangleLeft,
  GoTriangleRight,
  GoRepo,
  GoGist,
  GoOrganization,
} from 'react-icons/go';
import api from '../../services/user';

import imgLogo from '../../assets/logo.png';

import { Header, UserInfo, Repositories, StarredRepositories } from './styles';

interface RepositoryParams {
  user: string;
}

interface UserData {
  login: string;
  name: string;
  bio: string;
  id: number;
  avatar_url: string;
  html_url: string;
  repos_url: string;
  public_repos: string;
  public_gists: string;
  followers: string;
}

interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
}

interface StarredRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
}

const Repos: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [repositories, setRepos] = useState<Repo[]>([]);
  const [starredRepositories, setStarredrepositories] = useState<StarredRepo[]>(
    [],
  );

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`${params.user}`).then((response) => {
      setUser(response.data);
    });

    api.get(`${params.user}/repos`).then((response) => {
      setRepos(response.data);
    });

    api.get(`${params.user}/starred`).then((response) => {
      setStarredrepositories(response.data);
    });
  }, [params.user]);

  return (
    <>
      <Header>
        <Link to="/">
          <GoRepo size={16} /> Repos
        </Link>
        <img src={imgLogo} alt="Github Explorer" />
        <Link to="/users">
          <GoTriangleLeft size={16} />
          Voltar
        </Link>
      </Header>

      {user ? (
        <UserInfo>
          <header>
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <strong>{user.login}</strong>
              <p>{user.bio}</p>
              <p>{user.name}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{user.public_repos}</strong>
              <span>
                <GoRepo size={16} />
                Repositórios
              </span>
            </li>
            <li>
              <strong>{user.public_gists}</strong>
              <span>
                <GoGist size={16} />
                Gists
              </span>
            </li>
            <li>
              <strong>{user.followers}</strong>
              <span>
                <HiOutlineUsers size={16} />
                Followers
              </span>
            </li>
          </ul>
        </UserInfo>
      ) : (
        <p>Carregando...</p>
      )}

      <Repositories>
        <h3>Repositórios</h3>
        {repositories.map((repository) => (
          <a
            key={repository.id}
            href={repository.html_url}
            rel="noreferrer"
            target="_blank"
          >
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <GoTriangleRight size="20" />
          </a>
        ))}
      </Repositories>

      <StarredRepositories>
        <h2>Repositórios mais visitados pelo user:</h2>
        {starredRepositories.map((starredRepo) => (
          <a
            key={starredRepo.id}
            href={starredRepo.html_url}
            rel="noreferrer"
            target="_blank"
          >
            <div>
              <strong>{starredRepo.full_name}</strong>
              <p>{starredRepo.description}</p>
            </div>

            <GoTriangleRight size="20" />
          </a>
        ))}
      </StarredRepositories>
    </>
  );
};

export default Repos;
