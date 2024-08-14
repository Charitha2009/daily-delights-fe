// ProductCard.js
import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';

const ProductCard = ({ product, type, onEdit, onDelete }) => {
    const handleEditClick = () => {
        onEdit(product, type); // Pass product and type to parent component for edit handling
      };
    
      const handleDeleteClick = () => {
        onDelete(product._id, type); // Pass productId and type to parent component for delete handling
      };
    
    return (
  <div className='product-card'>
    <div className='product-image-container'>
      <img src={`http://localhost:4000/uploads/${product.image}`} alt={product.name} className='product-image' />
    </div>
    <div className='product-details'>
      <div className='name-section'>
        <h3>{product.name}</h3>
        <div className='edit-delete-icons'>
          <MdEdit className='icon' onClick={handleEditClick} data-tooltip-id={`edit-tooltip-${product._id}`} data-tooltip-content={`Edit ${type}`} />
          <MdDelete className='icon' onClick={handleDeleteClick} data-tooltip-id={`delete-tooltip-${product._id}`} data-tooltip-content={`Delete ${type}`} />
          <Tooltip id={`edit-tooltip-${product._id}`} place="top" type="dark" effect="float" />
          <Tooltip id={`delete-tooltip-${product._id}`} place="top" type="dark" effect="float" />
        </div>
      </div>
      <p>{product.description}</p>
      <div className='product-price-count'>
        <p>Price: ${product.price}</p>
        <p>per {product.unit}</p>
        <p>Count: {product.count}</p>
      </div>
    </div>
  </div>
)};

export default ProductCard;
