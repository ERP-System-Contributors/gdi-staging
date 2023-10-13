import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './prepayment-account.reducer';

export const PrepaymentAccountDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const prepaymentAccountEntity = useAppSelector(state => state.prepaymentAccount.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="prepaymentAccountDetailsHeading">Prepayment Account</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{prepaymentAccountEntity.id}</dd>
          <dt>
            <span id="catalogueNumber">Catalogue Number</span>
          </dt>
          <dd>{prepaymentAccountEntity.catalogueNumber}</dd>
          <dt>
            <span id="particulars">Particulars</span>
          </dt>
          <dd>{prepaymentAccountEntity.particulars}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{prepaymentAccountEntity.notes}</dd>
          <dt>
            <span id="prepaymentAmount">Prepayment Amount</span>
          </dt>
          <dd>{prepaymentAccountEntity.prepaymentAmount}</dd>
          <dt>
            <span id="prepaymentGuid">Prepayment Guid</span>
          </dt>
          <dd>{prepaymentAccountEntity.prepaymentGuid}</dd>
          <dt>Settlement Currency</dt>
          <dd>{prepaymentAccountEntity.settlementCurrency ? prepaymentAccountEntity.settlementCurrency.iso4217CurrencyCode : ''}</dd>
          <dt>Prepayment Transaction</dt>
          <dd>{prepaymentAccountEntity.prepaymentTransaction ? prepaymentAccountEntity.prepaymentTransaction.paymentNumber : ''}</dd>
          <dt>Service Outlet</dt>
          <dd>{prepaymentAccountEntity.serviceOutlet ? prepaymentAccountEntity.serviceOutlet.outletCode : ''}</dd>
          <dt>Dealer</dt>
          <dd>{prepaymentAccountEntity.dealer ? prepaymentAccountEntity.dealer.dealerName : ''}</dd>
          <dt>Debit Account</dt>
          <dd>{prepaymentAccountEntity.debitAccount ? prepaymentAccountEntity.debitAccount.accountName : ''}</dd>
          <dt>Transfer Account</dt>
          <dd>{prepaymentAccountEntity.transferAccount ? prepaymentAccountEntity.transferAccount.accountName : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {prepaymentAccountEntity.placeholders
              ? prepaymentAccountEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {prepaymentAccountEntity.placeholders && i === prepaymentAccountEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>General Parameters</dt>
          <dd>
            {prepaymentAccountEntity.generalParameters
              ? prepaymentAccountEntity.generalParameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {prepaymentAccountEntity.generalParameters && i === prepaymentAccountEntity.generalParameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Prepayment Parameters</dt>
          <dd>
            {prepaymentAccountEntity.prepaymentParameters
              ? prepaymentAccountEntity.prepaymentParameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.parameterKey}</a>
                    {prepaymentAccountEntity.prepaymentParameters && i === prepaymentAccountEntity.prepaymentParameters.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {prepaymentAccountEntity.businessDocuments
              ? prepaymentAccountEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {prepaymentAccountEntity.businessDocuments && i === prepaymentAccountEntity.businessDocuments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/prepayment-account" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prepayment-account/${prepaymentAccountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PrepaymentAccountDetail;
