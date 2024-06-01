import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogItemText from '../BlogItemText/BlogItemText';
import EditButtons from '../EditButtons/EditButtons';
import './blogitem.css';

//Blog Item
export default function BlogItem({
  index,
  blog,
  imageOrientation, 
  onBlogEdit,
  onBlogDelete,
}) {
  // Navigate to blog
  const navigate = useNavigate();
  const navigateToBlog = () => {
    console.log(`Navigating to blog with ID: ${blog.id}`);

    //TODO: Fix selection params
    if (!onBlogEdit && !onBlogDelete) {

      navigate(`/blogs/${blog.id}`);


    }
      
      
  
  };

  const EditButtonsContainer = () => (
    <EditButtons
      onEdit={() => onBlogEdit(blog)}
      onDelete={() => onBlogDelete(blog)}
    />
  );

  if (imageOrientation === "top") {
    return (
      <div key={index} className="card-1" onClick={navigateToBlog}>
        <img src={blog.image} className="card-img-top" alt="..." />
        <div className="card-text-bottom">
          <BlogItemText blogPost={blog} headerFontSize="20px" />
          {onBlogEdit && onBlogDelete ? <EditButtonsContainer /> : null}
        </div>
      </div>
    );
  } else {
    return (
      <div key={index} className="card-2" onClick={navigateToBlog}>
        <img src={blog.image} className="card-img-left" alt="..." />
        <div className="card-text-right">
          <BlogItemText blogPost={blog} headerFontSize="20px" />
          {onBlogEdit && onBlogDelete ? <EditButtonsContainer /> : null}
        </div>
      </div>
    );
  }
}