import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './account-balance.reducer';

export const AccountBalanceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const accountBalanceEntity = useAppSelector(state => state.accountBalance.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="accountBalanceDetailsHeading">Account Balance</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{accountBalanceEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {accountBalanceEntity.reportingDate ? (
              <TextFormat value={accountBalanceEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="customerId">Customer Id</span>
          </dt>
          <dd>{accountBalanceEntity.customerId}</dd>
          <dt>
            <span id="accountContractNumber">Account Contract Number</span>
          </dt>
          <dd>{accountBalanceEntity.accountContractNumber}</dd>
          <dt>
            <span id="accruedInterestBalanceFCY">Accrued Interest Balance FCY</span>
          </dt>
          <dd>{accountBalanceEntity.accruedInterestBalanceFCY}</dd>
          <dt>
            <span id="accruedInterestBalanceLCY">Accrued Interest Balance LCY</span>
          </dt>
          <dd>{accountBalanceEntity.accruedInterestBalanceLCY}</dd>
          <dt>
            <span id="accountBalanceFCY">Account Balance FCY</span>
          </dt>
          <dd>{accountBalanceEntity.accountBalanceFCY}</dd>
          <dt>
            <span id="accountBalanceLCY">Account Balance LCY</span>
          </dt>
          <dd>{accountBalanceEntity.accountBalanceLCY}</dd>
          <dt>Bank Code</dt>
          <dd>{accountBalanceEntity.bankCode ? accountBalanceEntity.bankCode.institutionName : ''}</dd>
          <dt>Branch Id</dt>
          <dd>{accountBalanceEntity.branchId ? accountBalanceEntity.branchId.branchCode : ''}</dd>
          <dt>Currency Code</dt>
          <dd>{accountBalanceEntity.currencyCode ? accountBalanceEntity.currencyCode.alphabeticCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/account-balance" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/account-balance/${accountBalanceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AccountBalanceDetail;
