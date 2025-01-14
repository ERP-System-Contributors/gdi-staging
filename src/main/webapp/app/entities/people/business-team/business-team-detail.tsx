import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './business-team.reducer';

export const BusinessTeamDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const businessTeamEntity = useAppSelector(state => state.businessTeam.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="businessTeamDetailsHeading">Business Team</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{businessTeamEntity.id}</dd>
          <dt>
            <span id="businessTeam">Business Team</span>
          </dt>
          <dd>{businessTeamEntity.businessTeam}</dd>
          <dt>Team Members</dt>
          <dd>{businessTeamEntity.teamMembers ? businessTeamEntity.teamMembers.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/business-team" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/business-team/${businessTeamEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BusinessTeamDetail;
