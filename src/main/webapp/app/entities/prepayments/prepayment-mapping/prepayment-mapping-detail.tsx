import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './prepayment-mapping.reducer';

export const PrepaymentMappingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const prepaymentMappingEntity = useAppSelector(state => state.prepaymentMapping.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="prepaymentMappingDetailsHeading">Prepayment Mapping</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{prepaymentMappingEntity.id}</dd>
          <dt>
            <span id="parameterKey">Parameter Key</span>
          </dt>
          <dd>{prepaymentMappingEntity.parameterKey}</dd>
          <dt>
            <span id="parameterGuid">Parameter Guid</span>
          </dt>
          <dd>{prepaymentMappingEntity.parameterGuid}</dd>
          <dt>
            <span id="parameter">Parameter</span>
          </dt>
          <dd>{prepaymentMappingEntity.parameter}</dd>
          <dt>Placeholder</dt>
          <dd>
            {prepaymentMappingEntity.placeholders
              ? prepaymentMappingEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {prepaymentMappingEntity.placeholders && i === prepaymentMappingEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/prepayment-mapping" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prepayment-mapping/${prepaymentMappingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PrepaymentMappingDetail;
