import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './lease-liability-schedule-item.reducer';

export const LeaseLiabilityScheduleItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const leaseLiabilityScheduleItemEntity = useAppSelector(state => state.leaseLiabilityScheduleItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="leaseLiabilityScheduleItemDetailsHeading">Lease Liability Schedule Item</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.id}</dd>
          <dt>
            <span id="sequenceNumber">Sequence Number</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.sequenceNumber}</dd>
          <dt>
            <span id="periodIncluded">Period Included</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.periodIncluded ? 'true' : 'false'}</dd>
          <dt>
            <span id="periodStartDate">Period Start Date</span>
          </dt>
          <dd>
            {leaseLiabilityScheduleItemEntity.periodStartDate ? (
              <TextFormat value={leaseLiabilityScheduleItemEntity.periodStartDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="periodEndDate">Period End Date</span>
          </dt>
          <dd>
            {leaseLiabilityScheduleItemEntity.periodEndDate ? (
              <TextFormat value={leaseLiabilityScheduleItemEntity.periodEndDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="openingBalance">Opening Balance</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.openingBalance}</dd>
          <dt>
            <span id="cashPayment">Cash Payment</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.cashPayment}</dd>
          <dt>
            <span id="principalPayment">Principal Payment</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.principalPayment}</dd>
          <dt>
            <span id="interestPayment">Interest Payment</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.interestPayment}</dd>
          <dt>
            <span id="outstandingBalance">Outstanding Balance</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.outstandingBalance}</dd>
          <dt>
            <span id="interestPayableOpening">Interest Payable Opening</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.interestPayableOpening}</dd>
          <dt>
            <span id="interestExpenseAccrued">Interest Expense Accrued</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.interestExpenseAccrued}</dd>
          <dt>
            <span id="interestPayableBalance">Interest Payable Balance</span>
          </dt>
          <dd>{leaseLiabilityScheduleItemEntity.interestPayableBalance}</dd>
          <dt>Placeholder</dt>
          <dd>
            {leaseLiabilityScheduleItemEntity.placeholders
              ? leaseLiabilityScheduleItemEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {leaseLiabilityScheduleItemEntity.placeholders && i === leaseLiabilityScheduleItemEntity.placeholders.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Lease Contract</dt>
          <dd>{leaseLiabilityScheduleItemEntity.leaseContract ? leaseLiabilityScheduleItemEntity.leaseContract.bookingId : ''}</dd>
          <dt>Lease Model Metadata</dt>
          <dd>
            {leaseLiabilityScheduleItemEntity.leaseModelMetadata ? leaseLiabilityScheduleItemEntity.leaseModelMetadata.modelTitle : ''}
          </dd>
          <dt>Universally Unique Mapping</dt>
          <dd>
            {leaseLiabilityScheduleItemEntity.universallyUniqueMappings
              ? leaseLiabilityScheduleItemEntity.universallyUniqueMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {leaseLiabilityScheduleItemEntity.universallyUniqueMappings &&
                    i === leaseLiabilityScheduleItemEntity.universallyUniqueMappings.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/lease-liability-schedule-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/lease-liability-schedule-item/${leaseLiabilityScheduleItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default LeaseLiabilityScheduleItemDetail;
