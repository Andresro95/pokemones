import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import axios from "axios";
import PokeTarjeta from "../Components/PokeTarjeta";
import { PaginationControl } from "react-bootstrap-pagination-control";

const index = () => {
  const [pokemones, setPokemones] = useState([]);
  const [allpokemones, setAllPokemones] = useState([]);
  const [listado, setListado] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    getPokemones(offset);
    getAllPokemones()
  }, []);

  const getPokemones = async (o) => {
    const liga =
      "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + o;
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setPokemones(respuesta.results);
      setListado(respuesta.results);
      setTotal(respuesta.count)
      // console.log(pokemones);
    });
  };

  const getAllPokemones = async (o) => {
    const liga =
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    axios.get(liga).then(async (response) => {
      const respuesta = response.data;
      setAllPokemones(respuesta.results);
     

      // console.log(pokemones);
    });
  };

  const buscar = async (e) => {
    if(e.keyCode == 13){
      if(filtro.trim() != ''){
        setListado([])
        setTimeout(()=>{
          setListado(allpokemones.filter(p => p.name.includes(filtro)))
        },100)
      }
    }else if(filtro.trim() == ''){
      setListado([])
      setTimeout(() =>{
        setListado(pokemones)
      },100)
    }
  }


  const goPage = async(p) =>{
    setListado([])
    await getPokemones((p==1) ? 0 : ((p-1)*6))
    setOffset(p)
  }
  return (
    <>
    
    <div className="estilo-nombre">
    <h1>Jose Andres Rodriguez Valencia</h1>
      </div>

    <Container className="shadow bg-primary mt-3">
      <Row>
        <Col>
          <InputGroup className="mt-3 mb-3 shadow">
            <InputGroupText>
              <i className="fa-solid fa-search"></i>
            </InputGroupText>
            <Input value={filtro} onChange={(e) => {setFiltro(e.target.value)}} onKeyUpCapture={buscar} placeholder="Buscar Pokemon"></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {listado.map((pok, i) => (
          <PokeTarjeta poke={pok} key={i} />
        ))}
        <PaginationControl last={true} limit={limit} total={total} page={offset} changePage={page => goPage(page)}/>
      </Row>
    </Container>
    </>
    
  );
};

export default index;
