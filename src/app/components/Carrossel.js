import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importando as imagens locais


import imagem1 from '../../imagens/Imagem_1.jpeg'
import imagem2 from '../../imagens/Imagem_2.jpeg'
import imagem3 from '../../imagens/Imagem_3.jpeg'
import imagem4 from '../../imagens/Imagem_4.jpeg'
import imagem5 from '../../imagens/Imagem_5.jpeg'
import imagem6 from '../../imagens/Imagem_6.jpeg'


export default function Carrossel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  // Array de imagens importadas
//   const images = [imagem1];
  const images = [imagem1, imagem2, imagem3, imagem4, imagem5, imagem6];

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Imagem ${index + 1}`} className="w-auto h-screen" />
        </div>
      ))}
    </Slider>
  );
}
