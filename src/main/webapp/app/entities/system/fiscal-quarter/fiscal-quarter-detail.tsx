import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fiscal-quarter.reducer';

export const FiscalQuarterDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fiscalQuarterEntity = useAppSelector(state => state.fiscalQuarter.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fiscalQuarterDetailsHeading">Fiscal Quarter</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{fiscalQuarterEntity.id}</dd>
          <dt>
            <span id="quarterNumber">Quarter Number</span>
          </dt>
          <dd>{fiscalQuarterEntity.quarterNumber}</dd>
          <dt>
            <span id="startDate">Start Date</span>
          </dt>
          <dd>
            {fiscalQuarterEntity.startDate ? (
              <TextFormat value={fiscalQuarterEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">End Date</span>
          </dt>
          <dd>
            {fiscalQuarterEntity.endDate ? (
              <TextFormat value={fiscalQuarterEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fiscalQuarterCode">Fiscal Quarter Code</span>
          </dt>
          <dd>{fiscalQuarterEntity.fiscalQuarterCode}</dd>
          <dt>Fiscal Year</dt>
          <dd>{fiscalQuarterEntity.fiscalYear ? fiscalQuarterEntity.fiscalYear.fiscalYearCode : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {fiscalQuarterEntity.placeholders
              ? fiscalQuarterEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {fiscalQuarterEntity.placeholders && i === fiscalQuarterEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Universally Unique Mapping</dt>
          <dd>
            {fiscalQuarterEntity.universallyUniqueMappings
              ? fiscalQuarterEntity.universallyUniqueMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {fiscalQuarterEntity.universallyUniqueMappings && i === fiscalQuarterEntity.universallyUniqueMappings.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/fiscal-quarter" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fiscal-quarter/${fiscalQuarterEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FiscalQuarterDetail;
