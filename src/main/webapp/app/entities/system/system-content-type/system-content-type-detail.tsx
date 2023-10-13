import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './system-content-type.reducer';

export const SystemContentTypeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const systemContentTypeEntity = useAppSelector(state => state.systemContentType.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="systemContentTypeDetailsHeading">System Content Type</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{systemContentTypeEntity.id}</dd>
          <dt>
            <span id="contentTypeName">Content Type Name</span>
          </dt>
          <dd>{systemContentTypeEntity.contentTypeName}</dd>
          <dt>
            <span id="contentTypeHeader">Content Type Header</span>
          </dt>
          <dd>{systemContentTypeEntity.contentTypeHeader}</dd>
          <dt>
            <span id="comments">Comments</span>
          </dt>
          <dd>{systemContentTypeEntity.comments}</dd>
          <dt>
            <span id="availability">Availability</span>
          </dt>
          <dd>{systemContentTypeEntity.availability}</dd>
          <dt>Placeholders</dt>
          <dd>
            {systemContentTypeEntity.placeholders
              ? systemContentTypeEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {systemContentTypeEntity.placeholders && i === systemContentTypeEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Sys Maps</dt>
          <dd>
            {systemContentTypeEntity.sysMaps
              ? systemContentTypeEntity.sysMaps.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {systemContentTypeEntity.sysMaps && i === systemContentTypeEntity.sysMaps.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/system-content-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/system-content-type/${systemContentTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SystemContentTypeDetail;
