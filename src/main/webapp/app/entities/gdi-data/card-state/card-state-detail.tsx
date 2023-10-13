import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './card-state.reducer';

export const CardStateDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const cardStateEntity = useAppSelector(state => state.cardState.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cardStateDetailsHeading">Card State</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{cardStateEntity.id}</dd>
          <dt>
            <span id="cardStateFlag">Card State Flag</span>
          </dt>
          <dd>{cardStateEntity.cardStateFlag}</dd>
          <dt>
            <span id="cardStateFlagDetails">Card State Flag Details</span>
          </dt>
          <dd>{cardStateEntity.cardStateFlagDetails}</dd>
          <dt>
            <span id="cardStateFlagDescription">Card State Flag Description</span>
          </dt>
          <dd>{cardStateEntity.cardStateFlagDescription}</dd>
        </dl>
        <Button tag={Link} to="/card-state" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/card-state/${cardStateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CardStateDetail;
