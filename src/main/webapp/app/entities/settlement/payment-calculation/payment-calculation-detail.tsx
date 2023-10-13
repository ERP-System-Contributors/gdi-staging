import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment-calculation.reducer';

export const PaymentCalculationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paymentCalculationEntity = useAppSelector(state => state.paymentCalculation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentCalculationDetailsHeading">Payment Calculation</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{paymentCalculationEntity.id}</dd>
          <dt>
            <span id="paymentExpense">Payment Expense</span>
          </dt>
          <dd>{paymentCalculationEntity.paymentExpense}</dd>
          <dt>
            <span id="withholdingVAT">Withholding VAT</span>
          </dt>
          <dd>{paymentCalculationEntity.withholdingVAT}</dd>
          <dt>
            <span id="withholdingTax">Withholding Tax</span>
          </dt>
          <dd>{paymentCalculationEntity.withholdingTax}</dd>
          <dt>
            <span id="paymentAmount">Payment Amount</span>
          </dt>
          <dd>{paymentCalculationEntity.paymentAmount}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{paymentCalculationEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{paymentCalculationEntity.compilationToken}</dd>
          <dt>Payment Label</dt>
          <dd>
            {paymentCalculationEntity.paymentLabels
              ? paymentCalculationEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentCalculationEntity.paymentLabels && i === paymentCalculationEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Category</dt>
          <dd>{paymentCalculationEntity.paymentCategory ? paymentCalculationEntity.paymentCategory.id : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {paymentCalculationEntity.placeholders
              ? paymentCalculationEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {paymentCalculationEntity.placeholders && i === paymentCalculationEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/payment-calculation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment-calculation/${paymentCalculationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentCalculationDetail;
