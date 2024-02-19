import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToken, useUser } from "./Token";

interface author {
  userName: string;
}

interface comment {
  id: string;
  username: string;
  text: string;
}

interface Post {
  _id: string;
  author: author;
  title: string;
  summary: string;
  content: string;
}

const ViewPost: React.FC = () => {
  const token = useToken();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<comment[]>([]);
  const User = useUser();
  const [comment, setComment] = useState<string>("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setComment(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await fetch(`http://localhost:3000/post/${id}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: id, comment: comment }),
    }).then((resp) => {
      if (!resp.ok) {
        throw new Error("There was an error while saving the comment");
      }
    });
    setComment("");
  }

  useEffect(() => {
    async function fetchPost() {
      try {
        const blogPost = await fetch(`http://localhost:3000/post/${id}`).then(
          (data) => data.json()
        );

        setPost(blogPost.post);
        setComments(blogPost.comments);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPost();
  }, [comments]);

  // useEffect(() => console.log(comments), [comments]);

  return (
    <>
      <section className="container-xxl">
        {post != undefined ? (
          <>
            <h1 className="row col-12 my-5 fs-1 fw-bold justify-content-center">
              {post.title}
            </h1>
            <p className="row col-12 my-5 fs-3 justify-content-center align-items-center">
              {post.content}
            </p>

            <div className="row fw-bold fs-2 col-2 my-5 justify-content-center">
              Author: {post.author.userName}
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </section>

      <section className="container-xl">
        <h1 className="fw-semibold fs-4">Comments</h1>
        {comments &&
          comments.map((cmt) => (
            <div key={cmt.id} className="row col-md-6 fs-5">
              <h6>@{cmt.username}</h6>
              <p>{cmt.text}</p>
            </div>
          ))}
      </section>

      {User != null ? (
        <section className="container-lg">
          <form
            action=""
            onSubmit={handleSubmit}
            className="my-5 justify-content-center align-items-center"
          >
            <div className="mb-3 row align-items-center">
              <label htmlFor="comment" className="fw-semibold fw-2 form-label">
                Comment
              </label>
              <input
                type="text"
                className="form-control"
                name="comment"
                id="comment"
                onChange={handleInputChange}
                value={comment}
              />
            </div>
            <button
              type="submit"
              className="btn fw-semibold fw-2 row align-items-center my-2 btn-primary"
            >
              Submit
            </button>
          </form>
        </section>
      ) : (
        <div className="container-lg my-5">
          <h4 className="row">You need to be Logged in to comment</h4>
          <button
            onClick={() => navigate("/login")}
            className="row btn btn-secondary"
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};

export default ViewPost;
