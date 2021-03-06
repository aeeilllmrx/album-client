import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './viewer.css';

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

const placeToFirstImage = {
  Greece: 1,
  India: 16,
  Thailand: 63,
  Indonesia: 105,
  Italy: 148,
};
const fetch = require('node-fetch'); // TODO: remove require
const getImagePath = (id) => {
  switch (true) {
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
  }
};

export const Viewer = (props) => {
  const [country] = useState(props.country);
  const [id, setId] = useState(placeToFirstImage[props.country]);
  const [state, setState] = useState({
    data: { id: id, caption: '' },
    left: { id: '', text: '' },
    center: { id: '', text: '' },
    right: { id: '', text: '' },
  });

  useEffect(() => {
    const getData = async (id) => {
      const url = server + 'photos/' + country + '/' + id;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setNext(data);
        setState((state) => {
          return { ...state, data: data };
        });
      } catch (e) {
        console.error(`An error has occured while calling the API. ${e}`);
        throw e;
      }
    };

    getData(id);
  }, [id]);

  const travel = async (direction) => {
    let moveMap = {
      left: state.left,
      center: state.center,
      right: state.right,
    };
    let next = moveMap[direction];
    setId(next.id);
  };

  const setNext = (res) => {
    let n1 = res.next_id_1;
    let n1_text = res.next_text_1;

    let n2 = res.next_id_2;
    let n2_text = res.next_text_2;

    if (n2) {
      setState((state) => {
        return {
          ...state,
          left: { id: n1, text: n1_text },
          center: { id: '', text: '' },
          right: { id: n2, text: n2_text },
        };
      });
    } else {
      setState((state) => {
        return {
          ...state,
          left: { id: '', text: '' },
          center: { id: n1, text: n1_text },
          right: { id: '', text: '' },
        };
      });
    }
  };

  return (
    <Container fluid>
      <Row>
        <div className="caption">{state.data.caption}</div>
      </Row>

      <Row>
        <img className="photo" src={getImagePath(state.data.id)} alt={''} />
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button
            className={state.left.id ? 'visible' : 'invisible'}
            onClick={() => travel('left')}
          >
            {state.left.text}
          </Button>
        </Col>
        <Col md="auto">
          <Button
            className={state.center.id ? 'visible' : 'invisible'}
            onClick={() => travel('center')}
          >
            {state.center.text}
          </Button>
        </Col>
        <Col md="auto">
          <Button
            className={state.right.id ? 'visible' : 'invisible'}
            onClick={() => travel('right')}
          >
            {state.right.text}
          </Button>
        </Col>
      </Row>
      <Row>
        <br></br>
      </Row>
    </Container>
  );
};
