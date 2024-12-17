import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, CardBody, CardImg } from "reactstrap";

const PokeTarjeta = (params) => {
  const [pokemon, setPokemon] = useState([]);

  const [imagen, setImagen] = useState("");
  const [cardClass, setCardClass] = useState('d-none');
  // const [loadClass, setLoadClass] = useState("");

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const liga = params.poke.url;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setPokemon(respuesta);
      if(respuesta.sprites.other.dream_world.front_default != null){
        setImagen(respuesta.sprites.other.dream_world.front_default)
      } else {
        setImagen(respuesta.sprites.other['official-artwork'].front_default)
      }
      setCardClass('')
      // setLoadClass('d-none')
    });
  };
  return (
    <Col sm="4" lg="3" className="mb-3">
      
      <Card className={'shadow border-4 border-warning'+cardClass}>
        <CardImg src={imagen} height="150" className="p-2" />
        <CardBody className="text-center">
          
          <label className="fs-4 text-capitalize">{pokemon.name}</label>
        </CardBody>
       
      </Card>
    </Col>
  );
};

export default PokeTarjeta;
