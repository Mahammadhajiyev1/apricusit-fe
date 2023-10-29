import { Button, Image, Modal } from "react-bootstrap";

type PostDetails = {
  showModal: boolean;
  handleCloseModal: () => void;
  selectedPost: {
    title: string;
    body: string;
    imageUrl: string;
  };
};

export default function PostDetail({
  showModal,
  handleCloseModal,
  selectedPost,
}: PostDetails) {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      className='d-flex justify-content-center text-center '
    >
      <Modal.Header closeButton>
        <Modal.Title>{selectedPost.title}</Modal.Title>
      </Modal.Header>
      <Image src={selectedPost.imageUrl} />
      <Modal.Body>{selectedPost.body}</Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
