import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './security-clearance.reducer';

export const SecurityClearanceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const securityClearanceEntity = useAppSelector(state => state.securityClearance.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="securityClearanceDetailsHeading">Security Clearance</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{securityClearanceEntity.id}</dd>
          <dt>
            <span id="clearanceLevel">Clearance Level</span>
          </dt>
          <dd>{securityClearanceEntity.clearanceLevel}</dd>
          <dt>Granted Clearances</dt>
          <dd>
            {securityClearanceEntity.grantedClearances
              ? securityClearanceEntity.grantedClearances.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.clearanceLevel}</a>
                    {securityClearanceEntity.grantedClearances && i === securityClearanceEntity.grantedClearances.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {securityClearanceEntity.placeholders
              ? securityClearanceEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {securityClearanceEntity.placeholders && i === securityClearanceEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/security-clearance" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/security-clearance/${securityClearanceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SecurityClearanceDetail;
