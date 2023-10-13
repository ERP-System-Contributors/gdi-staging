import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment-requisition.reducer';

export const PaymentRequisitionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentRequisitionEntity = useAppSelector(state => state.paymentRequisition.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentRequisitionDetailsHeading">Payment Requisition</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{paymentRequisitionEntity.id}</dd>
          <dt>
            <span id="receptionDate">Reception Date</span>
          </dt>
          <dd>
            {paymentRequisitionEntity.receptionDate ? (
              <TextFormat value={paymentRequisitionEntity.receptionDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dealerName">Dealer Name</span>
          </dt>
          <dd>{paymentRequisitionEntity.dealerName}</dd>
          <dt>
            <span id="briefDescription">Brief Description</span>
          </dt>
          <dd>{paymentRequisitionEntity.briefDescription}</dd>
          <dt>
            <span id="requisitionNumber">Requisition Number</span>
          </dt>
          <dd>{paymentRequisitionEntity.requisitionNumber}</dd>
          <dt>
            <span id="invoicedAmount">Invoiced Amount</span>
          </dt>
          <dd>{paymentRequisitionEntity.invoicedAmount}</dd>
          <dt>
            <span id="disbursementCost">Disbursement Cost</span>
          </dt>
          <dd>{paymentRequisitionEntity.disbursementCost}</dd>
          <dt>
            <span id="taxableAmount">Taxable Amount</span>
          </dt>
          <dd>{paymentRequisitionEntity.taxableAmount}</dd>
          <dt>
            <span id="requisitionProcessed">Requisition Processed</span>
          </dt>
          <dd>{paymentRequisitionEntity.requisitionProcessed ? 'true' : 'false'}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{paymentRequisitionEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{paymentRequisitionEntity.compilationToken}</dd>
          <dt>Payment Label</dt>
          <dd>
            {paymentRequisitionEntity.paymentLabels
              ? paymentRequisitionEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentRequisitionEntity.paymentLabels && i === paymentRequisitionEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {paymentRequisitionEntity.placeholders
              ? paymentRequisitionEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentRequisitionEntity.placeholders && i === paymentRequisitionEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/payment-requisition" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-requisition/${paymentRequisitionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentRequisitionDetail;
