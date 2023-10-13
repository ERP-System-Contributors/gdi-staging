import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './work-in-progress-registration.reducer';

export const WorkInProgressRegistrationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const workInProgressRegistrationEntity = useAppSelector(state => state.workInProgressRegistration.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="workInProgressRegistrationDetailsHeading">Work In Progress Registration</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{workInProgressRegistrationEntity.id}</dd>
          <dt>
            <span id="sequenceNumber">Sequence Number</span>
          </dt>
          <dd>{workInProgressRegistrationEntity.sequenceNumber}</dd>
          <dt>
            <span id="particulars">Particulars</span>
          </dt>
          <dd>{workInProgressRegistrationEntity.particulars}</dd>
          <dt>
            <span id="instalmentAmount">Instalment Amount</span>
          </dt>
          <dd>{workInProgressRegistrationEntity.instalmentAmount}</dd>
          <dt>
            <span id="comments">Comments</span>
          </dt>
          <dd>
            {workInProgressRegistrationEntity.comments ? (
              <div>
                {workInProgressRegistrationEntity.commentsContentType ? (
                  <a onClick={openFile(workInProgressRegistrationEntity.commentsContentType, workInProgressRegistrationEntity.comments)}>
                    Open&nbsp;
                  </a>
                ) : null}
                <span>
                  {workInProgressRegistrationEntity.commentsContentType}, {byteSize(workInProgressRegistrationEntity.comments)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {workInProgressRegistrationEntity.placeholders
              ? workInProgressRegistrationEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {workInProgressRegistrationEntity.placeholders && i === workInProgressRegistrationEntity.placeholders.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Invoices</dt>
          <dd>
            {workInProgressRegistrationEntity.paymentInvoices
              ? workInProgressRegistrationEntity.paymentInvoices.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.invoiceNumber}</a>
                    {workInProgressRegistrationEntity.paymentInvoices && i === workInProgressRegistrationEntity.paymentInvoices.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Service Outlet</dt>
          <dd>
            {workInProgressRegistrationEntity.serviceOutlets
              ? workInProgressRegistrationEntity.serviceOutlets.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.outletCode}</a>
                    {workInProgressRegistrationEntity.serviceOutlets && i === workInProgressRegistrationEntity.serviceOutlets.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Settlement</dt>
          <dd>
            {workInProgressRegistrationEntity.settlements
              ? workInProgressRegistrationEntity.settlements.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.paymentNumber}</a>
                    {workInProgressRegistrationEntity.settlements && i === workInProgressRegistrationEntity.settlements.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Purchase Order</dt>
          <dd>
            {workInProgressRegistrationEntity.purchaseOrders
              ? workInProgressRegistrationEntity.purchaseOrders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.purchaseOrderNumber}</a>
                    {workInProgressRegistrationEntity.purchaseOrders && i === workInProgressRegistrationEntity.purchaseOrders.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Delivery Note</dt>
          <dd>
            {workInProgressRegistrationEntity.deliveryNotes
              ? workInProgressRegistrationEntity.deliveryNotes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.deliveryNoteNumber}</a>
                    {workInProgressRegistrationEntity.deliveryNotes && i === workInProgressRegistrationEntity.deliveryNotes.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Job Sheet</dt>
          <dd>
            {workInProgressRegistrationEntity.jobSheets
              ? workInProgressRegistrationEntity.jobSheets.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.serialNumber}</a>
                    {workInProgressRegistrationEntity.jobSheets && i === workInProgressRegistrationEntity.jobSheets.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Dealer</dt>
          <dd>{workInProgressRegistrationEntity.dealer ? workInProgressRegistrationEntity.dealer.dealerName : ''}</dd>
          <dt>Work In Progress Group</dt>
          <dd>
            {workInProgressRegistrationEntity.workInProgressGroup
              ? workInProgressRegistrationEntity.workInProgressGroup.sequenceNumber
              : ''}
          </dd>
          <dt>Settlement Currency</dt>
          <dd>
            {workInProgressRegistrationEntity.settlementCurrency
              ? workInProgressRegistrationEntity.settlementCurrency.iso4217CurrencyCode
              : ''}
          </dd>
          <dt>Work Project Register</dt>
          <dd>
            {workInProgressRegistrationEntity.workProjectRegister
              ? workInProgressRegistrationEntity.workProjectRegister.catalogueNumber
              : ''}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {workInProgressRegistrationEntity.businessDocuments
              ? workInProgressRegistrationEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {workInProgressRegistrationEntity.businessDocuments &&
                    i === workInProgressRegistrationEntity.businessDocuments.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Asset Accessory</dt>
          <dd>
            {workInProgressRegistrationEntity.assetAccessories
              ? workInProgressRegistrationEntity.assetAccessories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.assetDetails}</a>
                    {workInProgressRegistrationEntity.assetAccessories && i === workInProgressRegistrationEntity.assetAccessories.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Asset Warranty</dt>
          <dd>
            {workInProgressRegistrationEntity.assetWarranties
              ? workInProgressRegistrationEntity.assetWarranties.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {workInProgressRegistrationEntity.assetWarranties && i === workInProgressRegistrationEntity.assetWarranties.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/work-in-progress-registration" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/work-in-progress-registration/${workInProgressRegistrationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default WorkInProgressRegistrationDetail;
