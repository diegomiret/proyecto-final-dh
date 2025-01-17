import React, { useEffect, useState } from 'react'

export const DetalleAlojamientoImagenesComponent = ({ imagenes }) => {


  const limitedImages = imagenes.map(item => item.url).slice(0, 5);

  const responsive = {
    0: {
      items: 1
    },
    1024: {
      items: 5
    }
  };

  const [loaded, setLoaded] = useState([false, false, false, false, false]);
  const [tablet, setTablet] = useState(window.innerWidth < 780);


  imagenes = imagenes?.sort((a, b) => a.id - b.id);
  const ratios = imagenes?.map((imagen, index) => {
    let image = new Image();
    image.src = imagen.url;
    let heightImage = image.height;
    let widthImage = image.width;
    let ratio = heightImage / widthImage;
    image.onerror = () => {
      imagenes[index] = {
        url: "",
        titulo: "Imagen no disponible"
      };
      setLoaded([...loaded.slice(0, index), true, ...loaded.slice(index + 1)]);
    }
    if (index === imagenes.length - 1) image.onload = () => {
      setLoaded([...loaded.slice(0, index), true, ...loaded.slice(index + 1)]);
    }
    return ratio;
  })

  useEffect(() => {

    console.log("Recibi de imagens: ", imagenes);

    function handleResize() {

      if (window.innerWidth > 780) {
        setTablet(false);
      } else {
        setTablet(true);
      }
    }

    window.addEventListener('resize', handleResize)
  }, [])



  return (
    <>


      <div className="container mt-4">
        <div className="row">
          {/* Imagen principal */}
          <div className="col-md-6">
            {limitedImages[0] && (
              <img
                src={limitedImages[0]}
                alt="Main"
                className="img-fluid w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>

          {/* Grilla de 4 imágenes */}
          <div className="col-md-6">
            <div className="row g-2 mt-2 mt-md-0">
              {limitedImages.slice(1).map((link, index) => (
                <div className="col-6" key={index}>
                  <img
                    src={link}
                    alt={`Thumbnail ${index + 1}`}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>

  )
}


