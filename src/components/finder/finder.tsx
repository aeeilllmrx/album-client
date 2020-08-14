import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './finder.css';

function importAll(r) {
  return r.keys().map(r);
}

const prod = true;
const server = prod
  ? 'https://album-backend.herokuapp.com/'
  : 'http://localhost:5000/';
const placeImages = importAll(
  require.context('../../images/greece/athens/', false, /^\.\/.*$/)
);
const helperImages = importAll(
  require.context('../../images/general/', false, /^\.\/.*$/)
);
const fetch = require('node-fetch'); // TODO: remove require

export const Finder = (props) => {
  const [text] = useState(props.text);
  const [state, setState] = useState({
    data: { id: 1, caption: '', city: '', country: '' },
  });

  useEffect(() => {
    const getData = async () => {
      const url = server + 'search/' + text;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
          setState((state) => {
            return {
              ...state,
              data: {
                id: -1,
                caption: 'caption not found!',
                city: '',
                country: '',
              },
            };
          });
        } else {
          setState((state) => {
            return { ...state, data: data };
          });
        }
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
        <img
          className="photo"
          src={
            state.data.id === -1
              ? '/' + helperImages[0].default
              : '/' + placeImages[state.data.id - 1].default
          }
          alt={''}
        />
      </Row>

      <Row>
        <div className={state.data.id === -1 ? 'invisible' : 'location'}>
          {state.data.city + ', ' + state.data.country}
        </div>
      </Row>
    </Container>
  );
};
