import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './card-acquiring-transaction.reducer';

export const CardAcquiringTransactionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const cardAcquiringTransactionEntity = useAppSelector(state => state.cardAcquiringTransaction.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cardAcquiringTransactionDetailsHeading">Card Acquiring Transaction</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{cardAcquiringTransactionEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {cardAcquiringTransactionEntity.reportingDate ? (
              <TextFormat value={cardAcquiringTransactionEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="terminalId">Terminal Id</span>
          </dt>
          <dd>{cardAcquiringTransactionEntity.terminalId}</dd>
          <dt>
            <span id="numberOfTransactions">Number Of Transactions</span>
          </dt>
          <dd>{cardAcquiringTransactionEntity.numberOfTransactions}</dd>
          <dt>
            <span id="valueOfTransactionsInLCY">Value Of Transactions In LCY</span>
          </dt>
          <dd>{cardAcquiringTransactionEntity.valueOfTransactionsInLCY}</dd>
          <dt>Bank Code</dt>
          <dd>{cardAcquiringTransactionEntity.bankCode ? cardAcquiringTransactionEntity.bankCode.institutionName : ''}</dd>
          <dt>Channel Type</dt>
          <dd>{cardAcquiringTransactionEntity.channelType ? cardAcquiringTransactionEntity.channelType.channelTypes : ''}</dd>
          <dt>Card Brand Type</dt>
          <dd>{cardAcquiringTransactionEntity.cardBrandType ? cardAcquiringTransactionEntity.cardBrandType.cardBrandType : ''}</dd>
          <dt>Currency Of Transaction</dt>
          <dd>
            {cardAcquiringTransactionEntity.currencyOfTransaction
              ? cardAcquiringTransactionEntity.currencyOfTransaction.alphabeticCode
              : ''}
          </dd>
          <dt>Card Issuer Category</dt>
          <dd>
            {cardAcquiringTransactionEntity.cardIssuerCategory
              ? cardAcquiringTransactionEntity.cardIssuerCategory.cardCategoryDescription
              : ''}
          </dd>
        </dl>
        <Button tag={Link} to="/card-acquiring-transaction" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/card-acquiring-transaction/${cardAcquiringTransactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CardAcquiringTransactionDetail;
