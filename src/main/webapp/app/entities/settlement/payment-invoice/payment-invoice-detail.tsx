import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment-invoice.reducer';

export const PaymentInvoiceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentInvoiceEntity = useAppSelector(state => state.paymentInvoice.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentInvoiceDetailsHeading">Payment Invoice</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{paymentInvoiceEntity.id}</dd>
          <dt>
            <span id="invoiceNumber">Invoice Number</span>
          </dt>
          <dd>{paymentInvoiceEntity.invoiceNumber}</dd>
          <dt>
            <span id="invoiceDate">Invoice Date</span>
          </dt>
          <dd>
            {paymentInvoiceEntity.invoiceDate ? (
              <TextFormat value={paymentInvoiceEntity.invoiceDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="invoiceAmount">Invoice Amount</span>
          </dt>
          <dd>{paymentInvoiceEntity.invoiceAmount}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{paymentInvoiceEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{paymentInvoiceEntity.compilationToken}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{paymentInvoiceEntity.remarks}</dd>
          <dt>Purchase Order</dt>
          <dd>
            {paymentInvoiceEntity.purchaseOrders
              ? paymentInvoiceEntity.purchaseOrders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.purchaseOrderNumber}</a>
                    {paymentInvoiceEntity.purchaseOrders && i === paymentInvoiceEntity.purchaseOrders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {paymentInvoiceEntity.placeholders
              ? paymentInvoiceEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentInvoiceEntity.placeholders && i === paymentInvoiceEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Label</dt>
          <dd>
            {paymentInvoiceEntity.paymentLabels
              ? paymentInvoiceEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentInvoiceEntity.paymentLabels && i === paymentInvoiceEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Settlement Currency</dt>
          <dd>{paymentInvoiceEntity.settlementCurrency ? paymentInvoiceEntity.settlementCurrency.iso4217CurrencyCode : ''}</dd>
          <dt>Biller</dt>
          <dd>{paymentInvoiceEntity.biller ? paymentInvoiceEntity.biller.dealerName : ''}</dd>
          <dt>Delivery Note</dt>
          <dd>
            {paymentInvoiceEntity.deliveryNotes
              ? paymentInvoiceEntity.deliveryNotes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.deliveryNoteNumber}</a>
                    {paymentInvoiceEntity.deliveryNotes && i === paymentInvoiceEntity.deliveryNotes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Job Sheet</dt>
          <dd>
            {paymentInvoiceEntity.jobSheets
              ? paymentInvoiceEntity.jobSheets.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.serialNumber}</a>
                    {paymentInvoiceEntity.jobSheets && i === paymentInvoiceEntity.jobSheets.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {paymentInvoiceEntity.businessDocuments
              ? paymentInvoiceEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {paymentInvoiceEntity.businessDocuments && i === paymentInvoiceEntity.businessDocuments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/payment-invoice" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-invoice/${paymentInvoiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentInvoiceDetail;
