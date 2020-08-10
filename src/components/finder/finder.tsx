import React, { useEffect, useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import './finder.css';

function importAll(r) {
  return r.keys().map(r);
}

const prod = false;
const server = prod ? 'unknown' : 'http://localhost:5000/';
const images = importAll(
  require.context('../../images/greece/athens/', false, /^\.\/.*$/)
);
const fetch = require('node-fetch'); // TODO: remove require

export const Finder = (props) => {
  const [text] = useState(props.text);
  const [state, setState] = useState({
    data: { id: 0, caption: '' },
  });

  useEffect(() => {
    const getData = async () => {
      const url = server + 'search/' + text;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
          return;
        }
        setState((state) => {
          return { ...state, data: data };
        });
      } catch (e) {
        console.error(`An error has occured while calling the API. ${e}`);
        throw e;
      }
    };

    getData();
  }, [text]);

  return (
    <Container fluid>
      <Row>
        <div className="caption">{state.data.caption}</div>
      </Row>

      <Row>
        <img className="photo" src={images[state.data.id - 1]} alt={''} />
      </Row>
    </Container>
  );
};
