import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fiscal-year.reducer';

export const FiscalYearDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fiscalYearEntity = useAppSelector(state => state.fiscalYear.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fiscalYearDetailsHeading">Fiscal Year</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{fiscalYearEntity.id}</dd>
          <dt>
            <span id="fiscalYearCode">Fiscal Year Code</span>
          </dt>
          <dd>{fiscalYearEntity.fiscalYearCode}</dd>
          <dt>
            <span id="startDate">Start Date</span>
          </dt>
          <dd>
            {fiscalYearEntity.startDate ? (
              <TextFormat value={fiscalYearEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">End Date</span>
          </dt>
          <dd>
            {fiscalYearEntity.endDate ? <TextFormat value={fiscalYearEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="fiscalYearStatus">Fiscal Year Status</span>
          </dt>
          <dd>{fiscalYearEntity.fiscalYearStatus}</dd>
          <dt>Placeholder</dt>
          <dd>
            {fiscalYearEntity.placeholders
              ? fiscalYearEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {fiscalYearEntity.placeholders && i === fiscalYearEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Universally Unique Mapping</dt>
          <dd>
            {fiscalYearEntity.universallyUniqueMappings
              ? fiscalYearEntity.universallyUniqueMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {fiscalYearEntity.universallyUniqueMappings && i === fiscalYearEntity.universallyUniqueMappings.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Created By</dt>
          <dd>{fiscalYearEntity.createdBy ? fiscalYearEntity.createdBy.applicationIdentity : ''}</dd>
          <dt>Last Updated By</dt>
          <dd>{fiscalYearEntity.lastUpdatedBy ? fiscalYearEntity.lastUpdatedBy.applicationIdentity : ''}</dd>
        </dl>
        <Button tag={Link} to="/fiscal-year" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fiscal-year/${fiscalYearEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FiscalYearDetail;
