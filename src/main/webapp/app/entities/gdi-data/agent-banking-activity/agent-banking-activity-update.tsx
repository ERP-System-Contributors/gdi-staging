import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { getEntities as getInstitutionCodes } from 'app/entities/gdi/institution-code/institution-code.reducer';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { getEntities as getBankBranchCodes } from 'app/entities/gdi/bank-branch-code/bank-branch-code.reducer';
import { IBankTransactionType } from 'app/shared/model/gdi/bank-transaction-type.model';
import { getEntities as getBankTransactionTypes } from 'app/entities/gdi/bank-transaction-type/bank-transaction-type.reducer';
import { IAgentBankingActivity } from 'app/shared/model/gdi-data/agent-banking-activity.model';
import { getEntity, updateEntity, createEntity, reset } from './agent-banking-activity.reducer';

export const AgentBankingActivityUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const bankBranchCodes = useAppSelector(state => state.bankBranchCode.entities);
  const bankTransactionTypes = useAppSelector(state => state.bankTransactionType.entities);
  const agentBankingActivityEntity = useAppSelector(state => state.agentBankingActivity.entity);
  const loading = useAppSelector(state => state.agentBankingActivity.loading);
  const updating = useAppSelector(state => state.agentBankingActivity.updating);
  const updateSuccess = useAppSelector(state => state.agentBankingActivity.updateSuccess);

  const handleClose = () => {
    navigate('/agent-banking-activity' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getBankBranchCodes({}));
    dispatch(getBankTransactionTypes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...agentBankingActivityEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      branchCode: bankBranchCodes.find(it => it.id.toString() === values.branchCode.toString()),
      transactionType: bankTransactionTypes.find(it => it.id.toString() === values.transactionType.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...agentBankingActivityEntity,
          bankCode: agentBankingActivityEntity?.bankCode?.id,
          branchCode: agentBankingActivityEntity?.branchCode?.id,
          transactionType: agentBankingActivityEntity?.transactionType?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataAgentBankingActivity.home.createOrEditLabel" data-cy="AgentBankingActivityCreateUpdateHeading">
            Create or edit a Agent Banking Activity
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="agent-banking-activity-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="agent-banking-activity-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Agent Unique Id"
                id="agent-banking-activity-agentUniqueId"
                name="agentUniqueId"
                data-cy="agentUniqueId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Terminal Unique Id"
                id="agent-banking-activity-terminalUniqueId"
                name="terminalUniqueId"
                data-cy="terminalUniqueId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Total Count Of Transactions"
                id="agent-banking-activity-totalCountOfTransactions"
                name="totalCountOfTransactions"
                data-cy="totalCountOfTransactions"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total Value Of Transactions In LCY"
                id="agent-banking-activity-totalValueOfTransactionsInLCY"
                name="totalValueOfTransactionsInLCY"
                data-cy="totalValueOfTransactionsInLCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                id="agent-banking-activity-bankCode"
                name="bankCode"
                data-cy="bankCode"
                label="Bank Code"
                type="select"
                required
              >
                <option value="" key="0" />
                {institutionCodes
                  ? institutionCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.institutionName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="agent-banking-activity-branchCode"
                name="branchCode"
                data-cy="branchCode"
                label="Branch Code"
                type="select"
                required
              >
                <option value="" key="0" />
                {bankBranchCodes
                  ? bankBranchCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.branchCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="agent-banking-activity-transactionType"
                name="transactionType"
                data-cy="transactionType"
                label="Transaction Type"
                type="select"
                required
              >
                <option value="" key="0" />
                {bankTransactionTypes
                  ? bankTransactionTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.transactionTypeCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/agent-banking-activity" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AgentBankingActivityUpdate;
