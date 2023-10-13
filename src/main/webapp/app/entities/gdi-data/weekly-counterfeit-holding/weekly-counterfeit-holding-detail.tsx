import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './weekly-counterfeit-holding.reducer';

export const WeeklyCounterfeitHoldingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const weeklyCounterfeitHoldingEntity = useAppSelector(state => state.weeklyCounterfeitHolding.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="weeklyCounterfeitHoldingDetailsHeading">Weekly Counterfeit Holding</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{weeklyCounterfeitHoldingEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {weeklyCounterfeitHoldingEntity.reportingDate ? (
              <TextFormat value={weeklyCounterfeitHoldingEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateConfiscated">Date Confiscated</span>
          </dt>
          <dd>
            {weeklyCounterfeitHoldingEntity.dateConfiscated ? (
              <TextFormat value={weeklyCounterfeitHoldingEntity.dateConfiscated} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="serialNumber">Serial Number</span>
          </dt>
          <dd>{weeklyCounterfeitHoldingEntity.serialNumber}</dd>
          <dt>
            <span id="depositorsNames">Depositors Names</span>
          </dt>
          <dd>{weeklyCounterfeitHoldingEntity.depositorsNames}</dd>
          <dt>
            <span id="tellersNames">Tellers Names</span>
          </dt>
          <dd>{weeklyCounterfeitHoldingEntity.tellersNames}</dd>
          <dt>
            <span id="dateSubmittedToCBK">Date Submitted To CBK</span>
          </dt>
          <dd>
            {weeklyCounterfeitHoldingEntity.dateSubmittedToCBK ? (
              <TextFormat value={weeklyCounterfeitHoldingEntity.dateSubmittedToCBK} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{weeklyCounterfeitHoldingEntity.remarks}</dd>
        </dl>
        <Button tag={Link} to="/weekly-counterfeit-holding" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/weekly-counterfeit-holding/${weeklyCounterfeitHoldingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default WeeklyCounterfeitHoldingDetail;
