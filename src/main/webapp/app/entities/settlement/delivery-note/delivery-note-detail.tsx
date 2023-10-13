import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './delivery-note.reducer';

export const DeliveryNoteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const deliveryNoteEntity = useAppSelector(state => state.deliveryNote.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="deliveryNoteDetailsHeading">Delivery Note</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{deliveryNoteEntity.id}</dd>
          <dt>
            <span id="deliveryNoteNumber">Delivery Note Number</span>
          </dt>
          <dd>{deliveryNoteEntity.deliveryNoteNumber}</dd>
          <dt>
            <span id="documentDate">Document Date</span>
          </dt>
          <dd>
            {deliveryNoteEntity.documentDate ? (
              <TextFormat value={deliveryNoteEntity.documentDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{deliveryNoteEntity.description}</dd>
          <dt>
            <span id="serialNumber">Serial Number</span>
          </dt>
          <dd>{deliveryNoteEntity.serialNumber}</dd>
          <dt>
            <span id="quantity">Quantity</span>
          </dt>
          <dd>{deliveryNoteEntity.quantity}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{deliveryNoteEntity.remarks}</dd>
          <dt>Placeholder</dt>
          <dd>
            {deliveryNoteEntity.placeholders
              ? deliveryNoteEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {deliveryNoteEntity.placeholders && i === deliveryNoteEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Received By</dt>
          <dd>{deliveryNoteEntity.receivedBy ? deliveryNoteEntity.receivedBy.dealerName : ''}</dd>
          <dt>Delivery Stamps</dt>
          <dd>
            {deliveryNoteEntity.deliveryStamps
              ? deliveryNoteEntity.deliveryStamps.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.details}</a>
                    {deliveryNoteEntity.deliveryStamps && i === deliveryNoteEntity.deliveryStamps.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Purchase Order</dt>
          <dd>{deliveryNoteEntity.purchaseOrder ? deliveryNoteEntity.purchaseOrder.purchaseOrderNumber : ''}</dd>
          <dt>Supplier</dt>
          <dd>{deliveryNoteEntity.supplier ? deliveryNoteEntity.supplier.dealerName : ''}</dd>
          <dt>Signatories</dt>
          <dd>
            {deliveryNoteEntity.signatories
              ? deliveryNoteEntity.signatories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.dealerName}</a>
                    {deliveryNoteEntity.signatories && i === deliveryNoteEntity.signatories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Other Purchase Orders</dt>
          <dd>
            {deliveryNoteEntity.otherPurchaseOrders
              ? deliveryNoteEntity.otherPurchaseOrders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.purchaseOrderNumber}</a>
                    {deliveryNoteEntity.otherPurchaseOrders && i === deliveryNoteEntity.otherPurchaseOrders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {deliveryNoteEntity.businessDocuments
              ? deliveryNoteEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {deliveryNoteEntity.businessDocuments && i === deliveryNoteEntity.businessDocuments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/delivery-note" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/delivery-note/${deliveryNoteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DeliveryNoteDetail;
