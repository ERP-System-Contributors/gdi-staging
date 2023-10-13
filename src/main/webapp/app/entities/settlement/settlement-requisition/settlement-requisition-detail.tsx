import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './settlement-requisition.reducer';

export const SettlementRequisitionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const settlementRequisitionEntity = useAppSelector(state => state.settlementRequisition.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="settlementRequisitionDetailsHeading">Settlement Requisition</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{settlementRequisitionEntity.id}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{settlementRequisitionEntity.description}</dd>
          <dt>
            <span id="serialNumber">Serial Number</span>
          </dt>
          <dd>{settlementRequisitionEntity.serialNumber}</dd>
          <dt>
            <span id="timeOfRequisition">Time Of Requisition</span>
          </dt>
          <dd>
            {settlementRequisitionEntity.timeOfRequisition ? (
              <TextFormat value={settlementRequisitionEntity.timeOfRequisition} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="requisitionNumber">Requisition Number</span>
          </dt>
          <dd>{settlementRequisitionEntity.requisitionNumber}</dd>
          <dt>
            <span id="paymentAmount">Payment Amount</span>
          </dt>
          <dd>{settlementRequisitionEntity.paymentAmount}</dd>
          <dt>
            <span id="paymentStatus">Payment Status</span>
          </dt>
          <dd>{settlementRequisitionEntity.paymentStatus}</dd>
          <dt>Settlement Currency</dt>
          <dd>
            {settlementRequisitionEntity.settlementCurrency ? settlementRequisitionEntity.settlementCurrency.iso4217CurrencyCode : ''}
          </dd>
          <dt>Current Owner</dt>
          <dd>{settlementRequisitionEntity.currentOwner ? settlementRequisitionEntity.currentOwner.applicationIdentity : ''}</dd>
          <dt>Native Owner</dt>
          <dd>{settlementRequisitionEntity.nativeOwner ? settlementRequisitionEntity.nativeOwner.applicationIdentity : ''}</dd>
          <dt>Native Department</dt>
          <dd>{settlementRequisitionEntity.nativeDepartment ? settlementRequisitionEntity.nativeDepartment.dealerName : ''}</dd>
          <dt>Biller</dt>
          <dd>{settlementRequisitionEntity.biller ? settlementRequisitionEntity.biller.dealerName : ''}</dd>
          <dt>Payment Invoice</dt>
          <dd>
            {settlementRequisitionEntity.paymentInvoices
              ? settlementRequisitionEntity.paymentInvoices.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.invoiceNumber}</a>
                    {settlementRequisitionEntity.paymentInvoices && i === settlementRequisitionEntity.paymentInvoices.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Delivery Note</dt>
          <dd>
            {settlementRequisitionEntity.deliveryNotes
              ? settlementRequisitionEntity.deliveryNotes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.deliveryNoteNumber}</a>
                    {settlementRequisitionEntity.deliveryNotes && i === settlementRequisitionEntity.deliveryNotes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Job Sheet</dt>
          <dd>
            {settlementRequisitionEntity.jobSheets
              ? settlementRequisitionEntity.jobSheets.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.serialNumber}</a>
                    {settlementRequisitionEntity.jobSheets && i === settlementRequisitionEntity.jobSheets.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Signatures</dt>
          <dd>
            {settlementRequisitionEntity.signatures
              ? settlementRequisitionEntity.signatures.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.dealerName}</a>
                    {settlementRequisitionEntity.signatures && i === settlementRequisitionEntity.signatures.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {settlementRequisitionEntity.businessDocuments
              ? settlementRequisitionEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {settlementRequisitionEntity.businessDocuments && i === settlementRequisitionEntity.businessDocuments.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Application Mapping</dt>
          <dd>
            {settlementRequisitionEntity.applicationMappings
              ? settlementRequisitionEntity.applicationMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {settlementRequisitionEntity.applicationMappings && i === settlementRequisitionEntity.applicationMappings.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {settlementRequisitionEntity.placeholders
              ? settlementRequisitionEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {settlementRequisitionEntity.placeholders && i === settlementRequisitionEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Settlement</dt>
          <dd>
            {settlementRequisitionEntity.settlements
              ? settlementRequisitionEntity.settlements.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.paymentNumber}</a>
                    {settlementRequisitionEntity.settlements && i === settlementRequisitionEntity.settlements.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/settlement-requisition" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/settlement-requisition/${settlementRequisitionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SettlementRequisitionDetail;
