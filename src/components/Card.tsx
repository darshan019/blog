import { Link } from "react-router-dom";

interface Props {
  author: string;
  title: string;
  summary: string;
  id: string;
}

const Card: React.FC<Props> = ({ author, title, summary, id }: Props) => {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <h5 className="card-title">{author}</h5>
        <p className="card-text">{summary}</p>
        <Link className="btn btn-primary" to={`/post/${id}`}>
          View Post
        </Link>
      </div>
    </div>
  );
};

export default Card;
