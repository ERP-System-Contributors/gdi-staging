import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './agent-banking-activity.reducer';

export const AgentBankingActivityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const agentBankingActivityEntity = useAppSelector(state => state.agentBankingActivity.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="agentBankingActivityDetailsHeading">Agent Banking Activity</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{agentBankingActivityEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {agentBankingActivityEntity.reportingDate ? (
              <TextFormat value={agentBankingActivityEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="agentUniqueId">Agent Unique Id</span>
          </dt>
          <dd>{agentBankingActivityEntity.agentUniqueId}</dd>
          <dt>
            <span id="terminalUniqueId">Terminal Unique Id</span>
          </dt>
          <dd>{agentBankingActivityEntity.terminalUniqueId}</dd>
          <dt>
            <span id="totalCountOfTransactions">Total Count Of Transactions</span>
          </dt>
          <dd>{agentBankingActivityEntity.totalCountOfTransactions}</dd>
          <dt>
            <span id="totalValueOfTransactionsInLCY">Total Value Of Transactions In LCY</span>
          </dt>
          <dd>{agentBankingActivityEntity.totalValueOfTransactionsInLCY}</dd>
          <dt>Bank Code</dt>
          <dd>{agentBankingActivityEntity.bankCode ? agentBankingActivityEntity.bankCode.institutionName : ''}</dd>
          <dt>Branch Code</dt>
          <dd>{agentBankingActivityEntity.branchCode ? agentBankingActivityEntity.branchCode.branchCode : ''}</dd>
          <dt>Transaction Type</dt>
          <dd>{agentBankingActivityEntity.transactionType ? agentBankingActivityEntity.transactionType.transactionTypeCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/agent-banking-activity" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/agent-banking-activity/${agentBankingActivityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AgentBankingActivityDetail;
