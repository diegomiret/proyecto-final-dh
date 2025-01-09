import React from 'react'
import { AiOutlineLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const DetalleAlojamientoHeaderComponent = ({ titulo }) => {

  const headerStyles = {
    backgroundColor: '#0d6efd',
    color: '#ffffff',
  };

  const buttonStyles = {
    margin: 0,
    color: '#ffffff',
  };

  return (
    <>
      <header
        className="d-flex justify-content-between align-items-center p-3 w-100"
        style={headerStyles}
      >
        <h1 className="h5" style={{ margin: 0 }}>{titulo}</h1>
          <Link to="/" className="text-decoration-none" style={{ fontSize: "20px", color: "var(--colorCuarto)" }}> <AiOutlineLeft /> </Link>
      </header>

    </>
  )
}



