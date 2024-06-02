// Imports
import React from 'react';
import './categorylist.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import EditButtons from '../EditButtons/EditButtons';

export default function CategoriesList({ categories, onEdit, onDelete }) {


  if (!categories && !categories?.length) {
    return null;
  }

  return (
    <div className="category-list">
      {categories.map((category) => {
        return (

          <Link 

            key={category.id}
            className='card'
            style={{borderRadius: "0px", border: "none", textDecoration: "none"}}
            to={`/categories`}

          >
            <div
              className="card-body w-100"
              style={{
                backgroundColor: category.color + "33",
                position: "relative",
                zIndex: 0,
                
              }}
            >
              <h5 className="card-title" >{category.title}</h5>
            </div>
            <div className="card-body">
              <p className="card-text" >
                {category.description.substring(1, 100)} ...
              </p>
            </div>
            {onEdit && onDelete && (
              <EditButtons
                onEdit={() => {
                  onEdit(category);
                }}
                onDelete={() => {
                  onDelete(category);
                }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}

CategoriesList.prototype = {
  categories: PropTypes.array.isRequired,
};