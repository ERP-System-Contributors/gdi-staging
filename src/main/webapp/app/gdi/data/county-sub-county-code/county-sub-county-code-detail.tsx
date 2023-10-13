import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './county-sub-county-code.reducer';

export const CountySubCountyCodeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const countySubCountyCodeEntity = useAppSelector(state => state.countySubCountyCode.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="countySubCountyCodeDetailsHeading">County Sub County Code</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{countySubCountyCodeEntity.id}</dd>
          <dt>
            <span id="subCountyCode">Sub County Code</span>
          </dt>
          <dd>{countySubCountyCodeEntity.subCountyCode}</dd>
          <dt>
            <span id="subCountyName">Sub County Name</span>
          </dt>
          <dd>{countySubCountyCodeEntity.subCountyName}</dd>
          <dt>
            <span id="countyCode">County Code</span>
          </dt>
          <dd>{countySubCountyCodeEntity.countyCode}</dd>
          <dt>
            <span id="countyName">County Name</span>
          </dt>
          <dd>{countySubCountyCodeEntity.countyName}</dd>
        </dl>
        <Button tag={Link} to="/county-sub-county-code" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/county-sub-county-code/${countySubCountyCodeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CountySubCountyCodeDetail;
