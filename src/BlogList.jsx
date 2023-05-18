import React, { useEffect, useState } from "react";
import "./App.css";
import BlogDetails from "./BlogDetails";
import blogPosts from "./blog_data.json";
import Pagination from "./Pagination";

const Loading = () => <div className="loading">Loading, please wait...</div>;

const BlogList = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulating a delay of 1 second for loading
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      {!loading && !selectedPost ? (
        <div>
          <h1>Blog Posts</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="blog-list">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="blog-card"
                onClick={() => handlePostClick(post)}
              >
                <h2>{post.title}</h2>
                <p>{post.username}</p>
                <p className="date">{post.date}</p>
                <p>{post.body.slice(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <BlogDetails
              selectedPost={selectedPost}
              handleBackClick={handleBackClick}
            />
          )}
        </>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogList;
