import React, { useState } from "react";
import { Alert, Button, Card, Container, Spinner } from "react-bootstrap";
import PostDetail from "./PostDetail";
import { useFetch } from "../hooks/fetchHook";

const getPostsUrl = process.env.REACT_APP_FETCH_URL;

type Post = {
  title: string;
  body: string;
  imageUrl: string;
};

const PostList: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { posts, isLoading, error } = useFetch(getPostsUrl);

  if (isLoading) {
    return (
      <div>
        <Spinner animation='border' />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert variant='danger'>
          <Alert.Heading>Failed to fetch data</Alert.Heading>
        </Alert>
      </div>
    );
  }

  const handleClick = (post: Post) => {
    setShowModal(true);
    setSelectedPost(post);
  };
  const handleCloseModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  return (
    <Container className=' text-center align-items-center '>
      <h2 style={{ margin: "20px", textAlign: "center" }}>Posts List</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {posts &&
          posts.map((post: Post) => (
            <Card
              key={post.title}
              border='primary'
              className='mx-auto'
              style={{
                width: "45rem",
                height: "10rem",
                margin: "2rem",
                boxShadow: "0 4px 8px 0",
                backgroundColor: "#fffdfa",
                textAlign: "center",
                fontSize: "20px",
                borderRadius: "20px",
              }}
            >
              <Card.Body style={{ margin: "20px" }}>
                <Card.Title>{post.title}</Card.Title>
                <Button
                  variant='outline-primary'
                  style={{ marginTop: "20px" }}
                  onClick={() => handleClick(post)}
                >
                  View Post
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>
      {selectedPost && (
        <PostDetail
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          selectedPost={selectedPost}
        />
      )}
    </Container>
  );
};

export default PostList;
