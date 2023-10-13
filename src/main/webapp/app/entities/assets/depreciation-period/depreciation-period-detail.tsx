import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './depreciation-period.reducer';

export const DepreciationPeriodDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const depreciationPeriodEntity = useAppSelector(state => state.depreciationPeriod.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="depreciationPeriodDetailsHeading">Depreciation Period</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{depreciationPeriodEntity.id}</dd>
          <dt>
            <span id="startDate">Start Date</span>
          </dt>
          <dd>
            {depreciationPeriodEntity.startDate ? (
              <TextFormat value={depreciationPeriodEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">End Date</span>
          </dt>
          <dd>
            {depreciationPeriodEntity.endDate ? (
              <TextFormat value={depreciationPeriodEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="depreciationPeriodStatus">Depreciation Period Status</span>
          </dt>
          <dd>{depreciationPeriodEntity.depreciationPeriodStatus}</dd>
          <dt>
            <span id="periodCode">Period Code</span>
          </dt>
          <dd>{depreciationPeriodEntity.periodCode}</dd>
          <dt>
            <span id="processLocked">Process Locked</span>
          </dt>
          <dd>{depreciationPeriodEntity.processLocked ? 'true' : 'false'}</dd>
          <dt>Previous Period</dt>
          <dd>{depreciationPeriodEntity.previousPeriod ? depreciationPeriodEntity.previousPeriod.endDate : ''}</dd>
          <dt>Created By</dt>
          <dd>{depreciationPeriodEntity.createdBy ? depreciationPeriodEntity.createdBy.applicationIdentity : ''}</dd>
          <dt>Fiscal Year</dt>
          <dd>{depreciationPeriodEntity.fiscalYear ? depreciationPeriodEntity.fiscalYear.fiscalYearCode : ''}</dd>
          <dt>Fiscal Month</dt>
          <dd>{depreciationPeriodEntity.fiscalMonth ? depreciationPeriodEntity.fiscalMonth.id : ''}</dd>
          <dt>Fiscal Quarter</dt>
          <dd>{depreciationPeriodEntity.fiscalQuarter ? depreciationPeriodEntity.fiscalQuarter.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/depreciation-period" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/depreciation-period/${depreciationPeriodEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DepreciationPeriodDetail;
