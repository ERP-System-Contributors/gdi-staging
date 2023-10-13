import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './invoice.reducer';

export const InvoiceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const invoiceEntity = useAppSelector(state => state.invoice.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="invoiceDetailsHeading">Invoice</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{invoiceEntity.id}</dd>
          <dt>
            <span id="invoiceNumber">Invoice Number</span>
          </dt>
          <dd>{invoiceEntity.invoiceNumber}</dd>
          <dt>
            <span id="invoiceDate">Invoice Date</span>
          </dt>
          <dd>
            {invoiceEntity.invoiceDate ? <TextFormat value={invoiceEntity.invoiceDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="invoiceAmount">Invoice Amount</span>
          </dt>
          <dd>{invoiceEntity.invoiceAmount}</dd>
          <dt>
            <span id="currency">Currency</span>
          </dt>
          <dd>{invoiceEntity.currency}</dd>
          <dt>
            <span id="paymentReference">Payment Reference</span>
          </dt>
          <dd>{invoiceEntity.paymentReference}</dd>
          <dt>
            <span id="dealerName">Dealer Name</span>
          </dt>
          <dd>{invoiceEntity.dealerName}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{invoiceEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{invoiceEntity.compilationToken}</dd>
          <dt>Payment Label</dt>
          <dd>
            {invoiceEntity.paymentLabels
              ? invoiceEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {invoiceEntity.paymentLabels && i === invoiceEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {invoiceEntity.placeholders
              ? invoiceEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {invoiceEntity.placeholders && i === invoiceEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/invoice" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice/${invoiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default InvoiceDetail;
