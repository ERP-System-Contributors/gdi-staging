import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './account-attribute.reducer';

export const AccountAttributeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const accountAttributeEntity = useAppSelector(state => state.accountAttribute.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="accountAttributeDetailsHeading">Account Attribute</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{accountAttributeEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {accountAttributeEntity.reportingDate ? (
              <TextFormat value={accountAttributeEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="customerNumber">Customer Number</span>
          </dt>
          <dd>{accountAttributeEntity.customerNumber}</dd>
          <dt>
            <span id="accountContractNumber">Account Contract Number</span>
          </dt>
          <dd>{accountAttributeEntity.accountContractNumber}</dd>
          <dt>
            <span id="accountName">Account Name</span>
          </dt>
          <dd>{accountAttributeEntity.accountName}</dd>
          <dt>
            <span id="accountOpeningDate">Account Opening Date</span>
          </dt>
          <dd>
            {accountAttributeEntity.accountOpeningDate ? (
              <TextFormat value={accountAttributeEntity.accountOpeningDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="accountClosingDate">Account Closing Date</span>
          </dt>
          <dd>
            {accountAttributeEntity.accountClosingDate ? (
              <TextFormat value={accountAttributeEntity.accountClosingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="debitInterestRate">Debit Interest Rate</span>
          </dt>
          <dd>{accountAttributeEntity.debitInterestRate}</dd>
          <dt>
            <span id="creditInterestRate">Credit Interest Rate</span>
          </dt>
          <dd>{accountAttributeEntity.creditInterestRate}</dd>
          <dt>
            <span id="sanctionedAccountLimitFcy">Sanctioned Account Limit Fcy</span>
          </dt>
          <dd>{accountAttributeEntity.sanctionedAccountLimitFcy}</dd>
          <dt>
            <span id="sanctionedAccountLimitLcy">Sanctioned Account Limit Lcy</span>
          </dt>
          <dd>{accountAttributeEntity.sanctionedAccountLimitLcy}</dd>
          <dt>
            <span id="accountStatusChangeDate">Account Status Change Date</span>
          </dt>
          <dd>
            {accountAttributeEntity.accountStatusChangeDate ? (
              <TextFormat value={accountAttributeEntity.accountStatusChangeDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="expiryDate">Expiry Date</span>
          </dt>
          <dd>
            {accountAttributeEntity.expiryDate ? (
              <TextFormat value={accountAttributeEntity.expiryDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Bank Code</dt>
          <dd>{accountAttributeEntity.bankCode ? accountAttributeEntity.bankCode.institutionCode : ''}</dd>
          <dt>Branch Code</dt>
          <dd>{accountAttributeEntity.branchCode ? accountAttributeEntity.branchCode.branchCode : ''}</dd>
          <dt>Account Ownership Type</dt>
          <dd>{accountAttributeEntity.accountOwnershipType ? accountAttributeEntity.accountOwnershipType.accountOwnershipType : ''}</dd>
        </dl>
        <Button tag={Link} to="/account-attribute" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/account-attribute/${accountAttributeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AccountAttributeDetail;
