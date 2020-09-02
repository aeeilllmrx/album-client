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
const greeceImages = importAll(
  require.context('../../images/greece/athens/', false, /^\.\/.*$/)
);
const indiaImages = importAll(
  require.context('../../images/india/all/', false, /^\.\/.*$/)
);
const indonesiaImages = importAll(
  require.context('../../images/indonesia/all/', false, /^\.\/.*$/)
);
const italyImages = importAll(
  require.context('../../images/italy/all/', false, /^\.\/.*$/)
);
const thailandImages = importAll(
  require.context('../../images/thailand/all/', false, /^\.\/.*$/)
);
const helperImages = importAll(
  require.context('../../images/general/', false, /^\.\/.*$/)
);
const fetch = require('node-fetch'); // TODO: remove require
const getImagePath = (id) => {
  switch (true) {
    case id === -1:
      return '/' + helperImages[0].default;
    case id <= 15:
      return '/' + greeceImages[id - 1].default;
    case id <= 62:
      return '/' + indiaImages[id - 16].default;
    case id <= 104:
      return '/' + thailandImages[id - 63].default;
    case id <= 147:
      return '/' + indonesiaImages[id - 105].default;
    case id <= 190:
      return '/' + italyImages[id - 148].default;
    default:
      return '/' + helperImages[0].default;
  }
};

export const Finder = (props) => {
  const [text] = useState(props.text);
  const [state, setState] = useState({
    data: { id: -1, caption: '', city: '', country: '' },
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
        <img className="photo" src={getImagePath(state.data.id)} alt={''} />
      </Row>

      <Row>
        <div className={state.data.id === -1 ? 'invisible' : 'location'}>
          {state.data.city + ', ' + state.data.country}
        </div>
      </Row>
    </Container>
  );
};
