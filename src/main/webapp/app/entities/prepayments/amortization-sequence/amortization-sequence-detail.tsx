import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './amortization-sequence.reducer';

export const AmortizationSequenceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const amortizationSequenceEntity = useAppSelector(state => state.amortizationSequence.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="amortizationSequenceDetailsHeading">Amortization Sequence</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{amortizationSequenceEntity.id}</dd>
          <dt>
            <span id="prepaymentAccountGuid">Prepayment Account Guid</span>
          </dt>
          <dd>{amortizationSequenceEntity.prepaymentAccountGuid}</dd>
          <dt>
            <span id="recurrenceGuid">Recurrence Guid</span>
          </dt>
          <dd>{amortizationSequenceEntity.recurrenceGuid}</dd>
          <dt>
            <span id="sequenceNumber">Sequence Number</span>
          </dt>
          <dd>{amortizationSequenceEntity.sequenceNumber}</dd>
          <dt>
            <span id="particulars">Particulars</span>
          </dt>
          <dd>{amortizationSequenceEntity.particulars}</dd>
          <dt>
            <span id="currentAmortizationDate">Current Amortization Date</span>
          </dt>
          <dd>
            {amortizationSequenceEntity.currentAmortizationDate ? (
              <TextFormat value={amortizationSequenceEntity.currentAmortizationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="previousAmortizationDate">Previous Amortization Date</span>
          </dt>
          <dd>
            {amortizationSequenceEntity.previousAmortizationDate ? (
              <TextFormat value={amortizationSequenceEntity.previousAmortizationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="nextAmortizationDate">Next Amortization Date</span>
          </dt>
          <dd>
            {amortizationSequenceEntity.nextAmortizationDate ? (
              <TextFormat value={amortizationSequenceEntity.nextAmortizationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="isCommencementSequence">Is Commencement Sequence</span>
          </dt>
          <dd>{amortizationSequenceEntity.isCommencementSequence ? 'true' : 'false'}</dd>
          <dt>
            <span id="isTerminalSequence">Is Terminal Sequence</span>
          </dt>
          <dd>{amortizationSequenceEntity.isTerminalSequence ? 'true' : 'false'}</dd>
          <dt>
            <span id="amortizationAmount">Amortization Amount</span>
          </dt>
          <dd>{amortizationSequenceEntity.amortizationAmount}</dd>
          <dt>
            <span id="sequenceGuid">Sequence Guid</span>
          </dt>
          <dd>{amortizationSequenceEntity.sequenceGuid}</dd>
          <dt>Prepayment Account</dt>
          <dd>{amortizationSequenceEntity.prepaymentAccount ? amortizationSequenceEntity.prepaymentAccount.catalogueNumber : ''}</dd>
          <dt>Amortization Recurrence</dt>
          <dd>{amortizationSequenceEntity.amortizationRecurrence ? amortizationSequenceEntity.amortizationRecurrence.particulars : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {amortizationSequenceEntity.placeholders
              ? amortizationSequenceEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {amortizationSequenceEntity.placeholders && i === amortizationSequenceEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Prepayment Mapping</dt>
          <dd>
            {amortizationSequenceEntity.prepaymentMappings
              ? amortizationSequenceEntity.prepaymentMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.parameter}</a>
                    {amortizationSequenceEntity.prepaymentMappings && i === amortizationSequenceEntity.prepaymentMappings.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Application Parameters</dt>
          <dd>
            {amortizationSequenceEntity.applicationParameters
              ? amortizationSequenceEntity.applicationParameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {amortizationSequenceEntity.applicationParameters && i === amortizationSequenceEntity.applicationParameters.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/amortization-sequence" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/amortization-sequence/${amortizationSequenceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AmortizationSequenceDetail;
