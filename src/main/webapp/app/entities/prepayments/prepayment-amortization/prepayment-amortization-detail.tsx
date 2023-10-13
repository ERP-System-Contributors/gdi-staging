import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './prepayment-amortization.reducer';

export const PrepaymentAmortizationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const prepaymentAmortizationEntity = useAppSelector(state => state.prepaymentAmortization.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="prepaymentAmortizationDetailsHeading">Prepayment Amortization</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{prepaymentAmortizationEntity.id}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{prepaymentAmortizationEntity.description}</dd>
          <dt>
            <span id="prepaymentPeriod">Prepayment Period</span>
          </dt>
          <dd>
            {prepaymentAmortizationEntity.prepaymentPeriod ? (
              <TextFormat value={prepaymentAmortizationEntity.prepaymentPeriod} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="prepaymentAmount">Prepayment Amount</span>
          </dt>
          <dd>{prepaymentAmortizationEntity.prepaymentAmount}</dd>
          <dt>
            <span id="inactive">Inactive</span>
          </dt>
          <dd>{prepaymentAmortizationEntity.inactive ? 'true' : 'false'}</dd>
          <dt>Prepayment Account</dt>
          <dd>{prepaymentAmortizationEntity.prepaymentAccount ? prepaymentAmortizationEntity.prepaymentAccount.catalogueNumber : ''}</dd>
          <dt>Settlement Currency</dt>
          <dd>
            {prepaymentAmortizationEntity.settlementCurrency ? prepaymentAmortizationEntity.settlementCurrency.iso4217CurrencyCode : ''}
          </dd>
          <dt>Debit Account</dt>
          <dd>{prepaymentAmortizationEntity.debitAccount ? prepaymentAmortizationEntity.debitAccount.accountNumber : ''}</dd>
          <dt>Credit Account</dt>
          <dd>{prepaymentAmortizationEntity.creditAccount ? prepaymentAmortizationEntity.creditAccount.accountNumber : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {prepaymentAmortizationEntity.placeholders
              ? prepaymentAmortizationEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {prepaymentAmortizationEntity.placeholders && i === prepaymentAmortizationEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/prepayment-amortization" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prepayment-amortization/${prepaymentAmortizationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PrepaymentAmortizationDetail;
