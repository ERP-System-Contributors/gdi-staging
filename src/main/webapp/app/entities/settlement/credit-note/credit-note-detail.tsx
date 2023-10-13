import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './credit-note.reducer';

export const CreditNoteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const creditNoteEntity = useAppSelector(state => state.creditNote.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="creditNoteDetailsHeading">Credit Note</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{creditNoteEntity.id}</dd>
          <dt>
            <span id="creditNumber">Credit Number</span>
          </dt>
          <dd>{creditNoteEntity.creditNumber}</dd>
          <dt>
            <span id="creditNoteDate">Credit Note Date</span>
          </dt>
          <dd>
            {creditNoteEntity.creditNoteDate ? (
              <TextFormat value={creditNoteEntity.creditNoteDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="creditAmount">Credit Amount</span>
          </dt>
          <dd>{creditNoteEntity.creditAmount}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{creditNoteEntity.remarks}</dd>
          <dt>Purchase Orders</dt>
          <dd>
            {creditNoteEntity.purchaseOrders
              ? creditNoteEntity.purchaseOrders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.purchaseOrderNumber}</a>
                    {creditNoteEntity.purchaseOrders && i === creditNoteEntity.purchaseOrders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Invoices</dt>
          <dd>
            {creditNoteEntity.invoices
              ? creditNoteEntity.invoices.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.invoiceNumber}</a>
                    {creditNoteEntity.invoices && i === creditNoteEntity.invoices.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Label</dt>
          <dd>
            {creditNoteEntity.paymentLabels
              ? creditNoteEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {creditNoteEntity.paymentLabels && i === creditNoteEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {creditNoteEntity.placeholders
              ? creditNoteEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {creditNoteEntity.placeholders && i === creditNoteEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Settlement Currency</dt>
          <dd>{creditNoteEntity.settlementCurrency ? creditNoteEntity.settlementCurrency.iso4217CurrencyCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/credit-note" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/credit-note/${creditNoteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CreditNoteDetail;
