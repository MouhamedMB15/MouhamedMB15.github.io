// Imports
import React from 'react';
import Categories from '../Categories/Categories';
import './blogitemtext.css';
import PropTypes from "prop-types";

export default function BlogItemText({ blogPost, headerFontSize }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <p className="date-author-text">
          TODO{/* {blogPost.author.firstName} *TODO: */}
        </p>
        <div className="dot-divider"></div>
        <p className="date-author-text">
         TODO2 {/**TODO: */}
        </p>
      </div>
      <p
        style={{
          fontSize: headerFontSize,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        {blogPost.title}
      </p>
      <p style={{ fontSize: "16px", color: "#667085", textAlign: "left" }}>
        {blogPost.description.substring(0, 100)}...
      </p>
      <Categories blogPost={blogPost?.categories} />
    </div>
  );
}
BlogItemText.propTypes = {
  blogPost: PropTypes.object.isRequired,
  headerFontSize: PropTypes.string.isRequired,
};