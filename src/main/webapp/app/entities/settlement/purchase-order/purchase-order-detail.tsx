import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './purchase-order.reducer';

export const PurchaseOrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const purchaseOrderEntity = useAppSelector(state => state.purchaseOrder.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="purchaseOrderDetailsHeading">Purchase Order</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{purchaseOrderEntity.id}</dd>
          <dt>
            <span id="purchaseOrderNumber">Purchase Order Number</span>
          </dt>
          <dd>{purchaseOrderEntity.purchaseOrderNumber}</dd>
          <dt>
            <span id="purchaseOrderDate">Purchase Order Date</span>
          </dt>
          <dd>
            {purchaseOrderEntity.purchaseOrderDate ? (
              <TextFormat value={purchaseOrderEntity.purchaseOrderDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="purchaseOrderAmount">Purchase Order Amount</span>
          </dt>
          <dd>{purchaseOrderEntity.purchaseOrderAmount}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{purchaseOrderEntity.description}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{purchaseOrderEntity.notes}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{purchaseOrderEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{purchaseOrderEntity.compilationToken}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{purchaseOrderEntity.remarks}</dd>
          <dt>Settlement Currency</dt>
          <dd>{purchaseOrderEntity.settlementCurrency ? purchaseOrderEntity.settlementCurrency.iso4217CurrencyCode : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {purchaseOrderEntity.placeholders
              ? purchaseOrderEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {purchaseOrderEntity.placeholders && i === purchaseOrderEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Signatories</dt>
          <dd>
            {purchaseOrderEntity.signatories
              ? purchaseOrderEntity.signatories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.dealerName}</a>
                    {purchaseOrderEntity.signatories && i === purchaseOrderEntity.signatories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Vendor</dt>
          <dd>{purchaseOrderEntity.vendor ? purchaseOrderEntity.vendor.dealerName : ''}</dd>
          <dt>Business Document</dt>
          <dd>
            {purchaseOrderEntity.businessDocuments
              ? purchaseOrderEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {purchaseOrderEntity.businessDocuments && i === purchaseOrderEntity.businessDocuments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/purchase-order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/purchase-order/${purchaseOrderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PurchaseOrderDetail;
