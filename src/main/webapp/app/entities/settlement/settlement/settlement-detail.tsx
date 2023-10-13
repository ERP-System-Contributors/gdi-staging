import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './settlement.reducer';

export const SettlementDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const settlementEntity = useAppSelector(state => state.settlement.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="settlementDetailsHeading">Settlement</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{settlementEntity.id}</dd>
          <dt>
            <span id="paymentNumber">Payment Number</span>
          </dt>
          <dd>{settlementEntity.paymentNumber}</dd>
          <dt>
            <span id="paymentDate">Payment Date</span>
          </dt>
          <dd>
            {settlementEntity.paymentDate ? (
              <TextFormat value={settlementEntity.paymentDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="paymentAmount">Payment Amount</span>
          </dt>
          <dd>{settlementEntity.paymentAmount}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{settlementEntity.description}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{settlementEntity.notes}</dd>
          <dt>
            <span id="calculationFile">Calculation File</span>
          </dt>
          <dd>
            {settlementEntity.calculationFile ? (
              <div>
                {settlementEntity.calculationFileContentType ? (
                  <a onClick={openFile(settlementEntity.calculationFileContentType, settlementEntity.calculationFile)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {settlementEntity.calculationFileContentType}, {byteSize(settlementEntity.calculationFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{settlementEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{settlementEntity.compilationToken}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{settlementEntity.remarks}</dd>
          <dt>Placeholder</dt>
          <dd>
            {settlementEntity.placeholders
              ? settlementEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {settlementEntity.placeholders && i === settlementEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Settlement Currency</dt>
          <dd>{settlementEntity.settlementCurrency ? settlementEntity.settlementCurrency.iso4217CurrencyCode : ''}</dd>
          <dt>Payment Label</dt>
          <dd>
            {settlementEntity.paymentLabels
              ? settlementEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {settlementEntity.paymentLabels && i === settlementEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Category</dt>
          <dd>{settlementEntity.paymentCategory ? settlementEntity.paymentCategory.categoryName : ''}</dd>
          <dt>Group Settlement</dt>
          <dd>{settlementEntity.groupSettlement ? settlementEntity.groupSettlement.id : ''}</dd>
          <dt>Biller</dt>
          <dd>{settlementEntity.biller ? settlementEntity.biller.dealerName : ''}</dd>
          <dt>Payment Invoice</dt>
          <dd>
            {settlementEntity.paymentInvoices
              ? settlementEntity.paymentInvoices.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.invoiceNumber}</a>
                    {settlementEntity.paymentInvoices && i === settlementEntity.paymentInvoices.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Signatories</dt>
          <dd>
            {settlementEntity.signatories
              ? settlementEntity.signatories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.dealerName}</a>
                    {settlementEntity.signatories && i === settlementEntity.signatories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {settlementEntity.businessDocuments
              ? settlementEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {settlementEntity.businessDocuments && i === settlementEntity.businessDocuments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/settlement" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/settlement/${settlementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SettlementDetail;
