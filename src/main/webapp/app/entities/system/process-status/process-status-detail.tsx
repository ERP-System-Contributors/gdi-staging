import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './process-status.reducer';

export const ProcessStatusDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const processStatusEntity = useAppSelector(state => state.processStatus.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="processStatusDetailsHeading">Process Status</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{processStatusEntity.id}</dd>
          <dt>
            <span id="statusCode">Status Code</span>
          </dt>
          <dd>{processStatusEntity.statusCode}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{processStatusEntity.description}</dd>
          <dt>Placeholder</dt>
          <dd>
            {processStatusEntity.placeholders
              ? processStatusEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {processStatusEntity.placeholders && i === processStatusEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Parameters</dt>
          <dd>
            {processStatusEntity.parameters
              ? processStatusEntity.parameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {processStatusEntity.parameters && i === processStatusEntity.parameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/process-status" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/process-status/${processStatusEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProcessStatusDetail;
