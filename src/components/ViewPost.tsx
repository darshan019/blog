import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface author {
  userName: string;
}

interface comment {
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
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<comment[]>([]);

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

  useEffect(() => console.log(post), [post]);

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
            <div className="row col-md-6 fs-5">
              <h6>@{cmt.username}</h6>
              <p>{cmt.text}</p>
            </div>
          ))}
      </section>
    </>
  );
};

export default ViewPost;
