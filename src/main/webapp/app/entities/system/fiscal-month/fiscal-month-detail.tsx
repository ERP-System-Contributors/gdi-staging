import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fiscal-month.reducer';

export const FiscalMonthDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fiscalMonthEntity = useAppSelector(state => state.fiscalMonth.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fiscalMonthDetailsHeading">Fiscal Month</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{fiscalMonthEntity.id}</dd>
          <dt>
            <span id="monthNumber">Month Number</span>
          </dt>
          <dd>{fiscalMonthEntity.monthNumber}</dd>
          <dt>
            <span id="startDate">Start Date</span>
          </dt>
          <dd>
            {fiscalMonthEntity.startDate ? (
              <TextFormat value={fiscalMonthEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">End Date</span>
          </dt>
          <dd>
            {fiscalMonthEntity.endDate ? <TextFormat value={fiscalMonthEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="fiscalMonthCode">Fiscal Month Code</span>
          </dt>
          <dd>{fiscalMonthEntity.fiscalMonthCode}</dd>
          <dt>Fiscal Year</dt>
          <dd>{fiscalMonthEntity.fiscalYear ? fiscalMonthEntity.fiscalYear.fiscalYearCode : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {fiscalMonthEntity.placeholders
              ? fiscalMonthEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {fiscalMonthEntity.placeholders && i === fiscalMonthEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Universally Unique Mapping</dt>
          <dd>
            {fiscalMonthEntity.universallyUniqueMappings
              ? fiscalMonthEntity.universallyUniqueMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {fiscalMonthEntity.universallyUniqueMappings && i === fiscalMonthEntity.universallyUniqueMappings.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Fiscal Quarter</dt>
          <dd>{fiscalMonthEntity.fiscalQuarter ? fiscalMonthEntity.fiscalQuarter.fiscalQuarterCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/fiscal-month" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fiscal-month/${fiscalMonthEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FiscalMonthDetail;
