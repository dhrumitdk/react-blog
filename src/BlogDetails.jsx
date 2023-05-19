const BlogDetails = ({ selectedPost, handleBackClick }) => {
  return (
    <div>
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
      <div className="blog-description">
        <h2>{selectedPost.title}</h2>
        <p>{selectedPost.userName}</p>
        <p className="date">{selectedPost.createdAt}</p>
        <p>{selectedPost.body}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
