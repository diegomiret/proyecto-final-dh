import React from 'react'
import { AiOutlineLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styledComponents from "styled-components";

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

        <BackLink>
          <Link to="/"> <AiOutlineLeft /> </Link>
        </BackLink>
      </header>

    </>
  )
}




const Header = styledComponents.div`
background-color: #0d6efd;
background-size: cover;
background-position: center;
box-shadow: inset 0px 4px 4px 0px #00000040;
color: #ffffff;
text-align: left;
display: flex;
justify-content: space-between;
padding: 1rem 2rem 0;
@media only screen and (max-width: 425px) {
    background-size: initial;
}
h2 {
    font-size: 1.5rem;
}
p {
    font-size: 0.875rem;
}
`

const BackLink = styledComponents.div`
a {
    font-size: 20px;
    color: var(--colorCuarto)
    text-decoration: none;
}
`
