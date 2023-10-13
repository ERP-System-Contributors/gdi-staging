import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment.reducer';

export const PaymentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentEntity = useAppSelector(state => state.payment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentDetailsHeading">Payment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{paymentEntity.id}</dd>
          <dt>
            <span id="paymentNumber">Payment Number</span>
          </dt>
          <dd>{paymentEntity.paymentNumber}</dd>
          <dt>
            <span id="paymentDate">Payment Date</span>
          </dt>
          <dd>
            {paymentEntity.paymentDate ? <TextFormat value={paymentEntity.paymentDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="invoicedAmount">Invoiced Amount</span>
          </dt>
          <dd>{paymentEntity.invoicedAmount}</dd>
          <dt>
            <span id="paymentAmount">Payment Amount</span>
          </dt>
          <dd>{paymentEntity.paymentAmount}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{paymentEntity.description}</dd>
          <dt>
            <span id="settlementCurrency">Settlement Currency</span>
          </dt>
          <dd>{paymentEntity.settlementCurrency}</dd>
          <dt>
            <span id="calculationFile">Calculation File</span>
          </dt>
          <dd>
            {paymentEntity.calculationFile ? (
              <div>
                {paymentEntity.calculationFileContentType ? (
                  <a onClick={openFile(paymentEntity.calculationFileContentType, paymentEntity.calculationFile)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {paymentEntity.calculationFileContentType}, {byteSize(paymentEntity.calculationFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="dealerName">Dealer Name</span>
          </dt>
          <dd>{paymentEntity.dealerName}</dd>
          <dt>
            <span id="purchaseOrderNumber">Purchase Order Number</span>
          </dt>
          <dd>{paymentEntity.purchaseOrderNumber}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{paymentEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{paymentEntity.compilationToken}</dd>
          <dt>Payment Label</dt>
          <dd>
            {paymentEntity.paymentLabels
              ? paymentEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentEntity.paymentLabels && i === paymentEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Category</dt>
          <dd>{paymentEntity.paymentCategory ? paymentEntity.paymentCategory.categoryName : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {paymentEntity.placeholders
              ? paymentEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentEntity.placeholders && i === paymentEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Group</dt>
          <dd>{paymentEntity.paymentGroup ? paymentEntity.paymentGroup.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/payment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment/${paymentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentDetail;
