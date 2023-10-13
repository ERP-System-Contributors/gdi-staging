import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './card-fraud-information.reducer';

export const CardFraudInformationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const cardFraudInformationEntity = useAppSelector(state => state.cardFraudInformation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cardFraudInformationDetailsHeading">Card Fraud Information</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{cardFraudInformationEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {cardFraudInformationEntity.reportingDate ? (
              <TextFormat value={cardFraudInformationEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="totalNumberOfFraudIncidents">Total Number Of Fraud Incidents</span>
          </dt>
          <dd>{cardFraudInformationEntity.totalNumberOfFraudIncidents}</dd>
          <dt>
            <span id="valueOfFraudIncedentsInLCY">Value Of Fraud Incedents In LCY</span>
          </dt>
          <dd>{cardFraudInformationEntity.valueOfFraudIncedentsInLCY}</dd>
        </dl>
        <Button tag={Link} to="/card-fraud-information" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/card-fraud-information/${cardFraudInformationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CardFraudInformationDetail;
