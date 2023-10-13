import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './algorithm.reducer';

export const AlgorithmDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const algorithmEntity = useAppSelector(state => state.algorithm.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="algorithmDetailsHeading">Algorithm</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{algorithmEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{algorithmEntity.name}</dd>
          <dt>Placeholder</dt>
          <dd>
            {algorithmEntity.placeholders
              ? algorithmEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {algorithmEntity.placeholders && i === algorithmEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Parameters</dt>
          <dd>
            {algorithmEntity.parameters
              ? algorithmEntity.parameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {algorithmEntity.parameters && i === algorithmEntity.parameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/algorithm" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/algorithm/${algorithmEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AlgorithmDetail;
