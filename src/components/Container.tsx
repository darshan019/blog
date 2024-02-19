import { useEffect, useState } from "react";
import Card from "./Card";
import { useUser } from "./Token";
//import { useToken } from "./Token";

interface author {
  userName: string;
}

interface Posts {
  _id: string;
  author: author;
  title: string;
  summary: string;
}

export interface User {
  userName: string;
  isAdmin: boolean;
}

// interface PostsAndUsers {
//   posts: Posts[];
//   user: User;
// }

const Container: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const User = useUser();
  //const [user, setUser] = useState<User | null>(null);
  //const token = useToken();

  useEffect(() => {
    async function fetchPosts() {
      try {
        // if (token) {
        //   const postsAndUsersResponse = await fetch("http://localhost:3000/", {
        //     method: "GET",
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   });
        //   if (!postsAndUsersResponse.ok)
        //     throw new Error("Failed to fetch Posts and user");
        //   const postsAndUsers: PostsAndUsers =
        //     await postsAndUsersResponse.json();
        //   setPosts(postsAndUsers.posts);
        //   setUser(postsAndUsers.user);
        // } else {
        //   const posts = await fetch("http://localhost:3000/").then((data) =>
        //     data.json()
        //   );

        //   setPosts(posts.posts);
        // }
        const posts = await fetch("http://localhost:3000/").then((data) =>
          data.json()
        );

        setPosts(posts.posts);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
    console.log(User);
  }, [posts]);

  return (
    <>
      <div className="container-lg data my-5 align-items-center justify-content-center">
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post._id} className="col mb-3">
              <Card
                title={post.title}
                author={post.author.userName}
                summary={post.summary}
                id={post._id}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Container;
