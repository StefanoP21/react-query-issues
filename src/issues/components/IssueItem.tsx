import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';

interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const { number, state, title, user, comments } = issue;
  const { login, avatar_url } = user;
  const navigate = useNavigate();

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${number}`)}
    >
      <div className="card-body d-flex align-items-center">
        {state === State.Open ? (
          <FiCheckCircle size={30} color="green" />
        ) : (
          <FiInfo size={30} color="red" />
        )}
        <div className="d-flex flex-column flex-fill px-2">
          <span>{title}</span>
          <span className="issue-subinfo">
            #{number} opened 2 days ago by{' '}
            <span className="fw-bold">{login}</span>
          </span>
        </div>
        <div className="d-flex align-items-center">
          <img src={avatar_url} alt="User Avatar" className="avatar" />
          <span className="px-2">{comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
