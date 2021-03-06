import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { GoIssueOpened, GoRepoForked, GoTriangleLeft } from 'react-icons/go';
import { HiOutlineEye, HiOutlineStar } from 'react-icons/hi';
import api from '../../services/api';

import imgLogo from '../../assets/logo.png';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repos = (): JSX.Element => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={imgLogo} alt="Github Explorer" />
        <Link to="/">
          <GoTriangleLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository ? (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>
                <HiOutlineStar size={16} />
                Stars
              </span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>
                <GoRepoForked size={16} />
                Forks
              </span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>
                <GoIssueOpened size={16} /> Issues
              </span>
            </li>
          </ul>
        </RepositoryInfo>
      ) : (
        <p>Carregando...</p>
      )}

      <Issues>
        {issues.map((issue) => (
          <a
            key={issue.id}
            href={issue.html_url}
            rel="noreferrer"
            target="_blank"
          >
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <HiOutlineEye size="20" />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repos;
