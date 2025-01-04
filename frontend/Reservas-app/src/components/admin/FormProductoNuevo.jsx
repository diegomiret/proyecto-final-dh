import React from 'react'
import { ButtonStyle, ContainerButton, ContainerButtonGlobal, ContainerList, ContainerStyle, ContainerText, DescriptionBlockStyle, DescriptionStyle, ErrorText, FormStyle, ImageBlockStyle, ImageContainerStyle, InputContainerStyle, InputStyle, LabelStyle, SelectContainerStyle, TitleStyle } from '../admin/FormProductoNuevoStyled';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

export const FormProductoNuevo = ({values, handleInputChange, handleSubmit,errors, handleAddUrlImage, handleDeleteUrlImage, handleCategoryChange, handleCityChange}) => {
    return (
    <FormStyle name="form">
    <ContainerStyle>
      <InputContainerStyle>
        <LabelStyle>Nombre del alojamiento</LabelStyle>
        <InputStyle
          name="titulo"
          type="text"
          placeholder="Nombre del alojamiento"
          onChange={handleInputChange}
          value={values.titulo}
          required
        />
        {errors.titulo && <ErrorText>{errors.titulo}</ErrorText>}
      </InputContainerStyle>

    </ContainerStyle>



    <DescriptionBlockStyle>
      <LabelStyle>Descripción</LabelStyle>
      <DescriptionStyle
        name="descripcion"
        placeholder="Descripción del alojamiento"
        onChange={handleInputChange}
        value={values.descripcion}
        required
      />
      {errors.descripcion && <ErrorText>{errors.descripcion}</ErrorText>}
    </DescriptionBlockStyle>


    <ImageContainerStyle>
      <TitleStyle>Imágenes</TitleStyle>
      <ImageBlockStyle>
        <InputStyle
          name="temporaryImageInput"
          type="text"
          placeholder="https://"
          onChange={handleInputChange}
          required
        />
        <ButtonStyle onClick={handleAddUrlImage}>
          <AiOutlinePlus className="icon" />
        </ButtonStyle>
      </ImageBlockStyle>


      {values.imagenes.map((item, index)=>(
         <ContainerList key={item}>
          <ContainerText >
            {item}
          </ContainerText>
          <ContainerButton onClick={() => handleDeleteUrlImage(index)} >
            <AiOutlineClose className="icon" />
          </ContainerButton>
       </ContainerList>

      ))}
    </ImageContainerStyle>

  
    <ContainerButtonGlobal>
          <button width={'300px'} type="submit" form="form" onClick={handleSubmit}>Crear</button>
        </ContainerButtonGlobal>
  </FormStyle>

  )
}
