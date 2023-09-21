import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './interbank-sector-code.reducer';

export const InterbankSectorCodeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const interbankSectorCodeEntity = useAppSelector(state => state.interbankSectorCode.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="interbankSectorCodeDetailsHeading">Interbank Sector Code</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{interbankSectorCodeEntity.id}</dd>
          <dt>
            <span id="interbankSectorCode">Interbank Sector Code</span>
          </dt>
          <dd>{interbankSectorCodeEntity.interbankSectorCode}</dd>
          <dt>
            <span id="interbankSectorCodeDescription">Interbank Sector Code Description</span>
          </dt>
          <dd>{interbankSectorCodeEntity.interbankSectorCodeDescription}</dd>
        </dl>
        <Button tag={Link} to="/interbank-sector-code" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/interbank-sector-code/${interbankSectorCodeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default InterbankSectorCodeDetail;
