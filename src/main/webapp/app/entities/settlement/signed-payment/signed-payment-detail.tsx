import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './signed-payment.reducer';

export const SignedPaymentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const signedPaymentEntity = useAppSelector(state => state.signedPayment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="signedPaymentDetailsHeading">Signed Payment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{signedPaymentEntity.id}</dd>
          <dt>
            <span id="transactionNumber">Transaction Number</span>
          </dt>
          <dd>{signedPaymentEntity.transactionNumber}</dd>
          <dt>
            <span id="transactionDate">Transaction Date</span>
          </dt>
          <dd>
            {signedPaymentEntity.transactionDate ? (
              <TextFormat value={signedPaymentEntity.transactionDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="transactionCurrency">Transaction Currency</span>
          </dt>
          <dd>{signedPaymentEntity.transactionCurrency}</dd>
          <dt>
            <span id="transactionAmount">Transaction Amount</span>
          </dt>
          <dd>{signedPaymentEntity.transactionAmount}</dd>
          <dt>
            <span id="dealerName">Dealer Name</span>
          </dt>
          <dd>{signedPaymentEntity.dealerName}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{signedPaymentEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{signedPaymentEntity.compilationToken}</dd>
          <dt>Payment Label</dt>
          <dd>
            {signedPaymentEntity.paymentLabels
              ? signedPaymentEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {signedPaymentEntity.paymentLabels && i === signedPaymentEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Category</dt>
          <dd>{signedPaymentEntity.paymentCategory ? signedPaymentEntity.paymentCategory.categoryName : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {signedPaymentEntity.placeholders
              ? signedPaymentEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {signedPaymentEntity.placeholders && i === signedPaymentEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Signed Payment Group</dt>
          <dd>{signedPaymentEntity.signedPaymentGroup ? signedPaymentEntity.signedPaymentGroup.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/signed-payment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/signed-payment/${signedPaymentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SignedPaymentDetail;
