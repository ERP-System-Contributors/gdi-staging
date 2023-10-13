import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './amortization-recurrence.reducer';

export const AmortizationRecurrenceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const amortizationRecurrenceEntity = useAppSelector(state => state.amortizationRecurrence.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="amortizationRecurrenceDetailsHeading">Amortization Recurrence</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{amortizationRecurrenceEntity.id}</dd>
          <dt>
            <span id="firstAmortizationDate">First Amortization Date</span>
          </dt>
          <dd>
            {amortizationRecurrenceEntity.firstAmortizationDate ? (
              <TextFormat value={amortizationRecurrenceEntity.firstAmortizationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="amortizationFrequency">Amortization Frequency</span>
          </dt>
          <dd>{amortizationRecurrenceEntity.amortizationFrequency}</dd>
          <dt>
            <span id="numberOfRecurrences">Number Of Recurrences</span>
          </dt>
          <dd>{amortizationRecurrenceEntity.numberOfRecurrences}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>
            {amortizationRecurrenceEntity.notes ? (
              <div>
                {amortizationRecurrenceEntity.notesContentType ? (
                  <a onClick={openFile(amortizationRecurrenceEntity.notesContentType, amortizationRecurrenceEntity.notes)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {amortizationRecurrenceEntity.notesContentType}, {byteSize(amortizationRecurrenceEntity.notes)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="particulars">Particulars</span>
          </dt>
          <dd>{amortizationRecurrenceEntity.particulars}</dd>
          <dt>
            <span id="isActive">Is Active</span>
          </dt>
          <dd>{amortizationRecurrenceEntity.isActive ? 'true' : 'false'}</dd>
          <dt>
            <span id="isOverWritten">Is Over Written</span>
          </dt>
          <dd>{amortizationRecurrenceEntity.isOverWritten ? 'true' : 'false'}</dd>
          <dt>
            <span id="timeOfInstallation">Time Of Installation</span>
          </dt>
          <dd>
            {amortizationRecurrenceEntity.timeOfInstallation ? (
              <TextFormat value={amortizationRecurrenceEntity.timeOfInstallation} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="recurrenceGuid">Recurrence Guid</span>
          </dt>
          <dd>{amortizationRecurrenceEntity.recurrenceGuid}</dd>
          <dt>
            <span id="prepaymentAccountGuid">Prepayment Account Guid</span>
          </dt>
          <dd>{amortizationRecurrenceEntity.prepaymentAccountGuid}</dd>
          <dt>Placeholder</dt>
          <dd>
            {amortizationRecurrenceEntity.placeholders
              ? amortizationRecurrenceEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {amortizationRecurrenceEntity.placeholders && i === amortizationRecurrenceEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Parameters</dt>
          <dd>
            {amortizationRecurrenceEntity.parameters
              ? amortizationRecurrenceEntity.parameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.parameter}</a>
                    {amortizationRecurrenceEntity.parameters && i === amortizationRecurrenceEntity.parameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Application Parameters</dt>
          <dd>
            {amortizationRecurrenceEntity.applicationParameters
              ? amortizationRecurrenceEntity.applicationParameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {amortizationRecurrenceEntity.applicationParameters &&
                    i === amortizationRecurrenceEntity.applicationParameters.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Depreciation Method</dt>
          <dd>
            {amortizationRecurrenceEntity.depreciationMethod ? amortizationRecurrenceEntity.depreciationMethod.depreciationMethodName : ''}
          </dd>
          <dt>Prepayment Account</dt>
          <dd>{amortizationRecurrenceEntity.prepaymentAccount ? amortizationRecurrenceEntity.prepaymentAccount.catalogueNumber : ''}</dd>
        </dl>
        <Button tag={Link} to="/amortization-recurrence" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/amortization-recurrence/${amortizationRecurrenceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AmortizationRecurrenceDetail;
