import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './weekly-cash-holding.reducer';

export const WeeklyCashHoldingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const weeklyCashHoldingEntity = useAppSelector(state => state.weeklyCashHolding.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="weeklyCashHoldingDetailsHeading">Weekly Cash Holding</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{weeklyCashHoldingEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {weeklyCashHoldingEntity.reportingDate ? (
              <TextFormat value={weeklyCashHoldingEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fitUnits">Fit Units</span>
          </dt>
          <dd>{weeklyCashHoldingEntity.fitUnits}</dd>
          <dt>
            <span id="unfitUnits">Unfit Units</span>
          </dt>
          <dd>{weeklyCashHoldingEntity.unfitUnits}</dd>
          <dt>Bank Code</dt>
          <dd>{weeklyCashHoldingEntity.bankCode ? weeklyCashHoldingEntity.bankCode.institutionName : ''}</dd>
          <dt>Branch Id</dt>
          <dd>{weeklyCashHoldingEntity.branchId ? weeklyCashHoldingEntity.branchId.branchCode : ''}</dd>
          <dt>Sub County Code</dt>
          <dd>{weeklyCashHoldingEntity.subCountyCode ? weeklyCashHoldingEntity.subCountyCode.subCountyName : ''}</dd>
          <dt>Denomination</dt>
          <dd>{weeklyCashHoldingEntity.denomination ? weeklyCashHoldingEntity.denomination.currencyDenominationType : ''}</dd>
        </dl>
        <Button tag={Link} to="/weekly-cash-holding" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/weekly-cash-holding/${weeklyCashHoldingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default WeeklyCashHoldingDetail;
