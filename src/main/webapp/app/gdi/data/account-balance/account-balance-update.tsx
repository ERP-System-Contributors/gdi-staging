import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { getEntities as getInstitutionCodes } from 'app/entities/gdi/institution-code/institution-code.reducer';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { getEntities as getBankBranchCodes } from 'app/entities/gdi/bank-branch-code/bank-branch-code.reducer';
import { IIsoCurrencyCode } from 'app/shared/model/gdi/iso-currency-code.model';
import { getEntities as getIsoCurrencyCodes } from 'app/entities/gdi/iso-currency-code/iso-currency-code.reducer';
import { IAccountBalance } from 'app/shared/model/gdi-data/account-balance.model';
import { getEntity, updateEntity, createEntity, reset } from './account-balance.reducer';

export const AccountBalanceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const bankBranchCodes = useAppSelector(state => state.bankBranchCode.entities);
  const isoCurrencyCodes = useAppSelector(state => state.isoCurrencyCode.entities);
  const accountBalanceEntity = useAppSelector(state => state.accountBalance.entity);
  const loading = useAppSelector(state => state.accountBalance.loading);
  const updating = useAppSelector(state => state.accountBalance.updating);
  const updateSuccess = useAppSelector(state => state.accountBalance.updateSuccess);

  const handleClose = () => {
    navigate('/account-balance' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getBankBranchCodes({}));
    dispatch(getIsoCurrencyCodes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...accountBalanceEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      branchId: bankBranchCodes.find(it => it.id.toString() === values.branchId.toString()),
      currencyCode: isoCurrencyCodes.find(it => it.id.toString() === values.currencyCode.toString()),
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
          ...accountBalanceEntity,
          bankCode: accountBalanceEntity?.bankCode?.id,
          branchId: accountBalanceEntity?.branchId?.id,
          currencyCode: accountBalanceEntity?.currencyCode?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataAccountBalance.home.createOrEditLabel" data-cy="AccountBalanceCreateUpdateHeading">
            Create or edit a Account Balance
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
                <ValidatedField name="id" required readOnly id="account-balance-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="account-balance-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Customer Id"
                id="account-balance-customerId"
                name="customerId"
                data-cy="customerId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Account Contract Number"
                id="account-balance-accountContractNumber"
                name="accountContractNumber"
                data-cy="accountContractNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  minLength: { value: 12, message: 'This field is required to be at least 12 characters.' },
                  maxLength: { value: 16, message: 'This field cannot be longer than 16 characters.' },
                  pattern: { value: /^\d{15}$/, message: translate('entity.validation.pattern', { pattern: '^\\d{15}$' }) },
                }}
              />
              <ValidatedField
                label="Accrued Interest Balance FCY"
                id="account-balance-accruedInterestBalanceFCY"
                name="accruedInterestBalanceFCY"
                data-cy="accruedInterestBalanceFCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Accrued Interest Balance LCY"
                id="account-balance-accruedInterestBalanceLCY"
                name="accruedInterestBalanceLCY"
                data-cy="accruedInterestBalanceLCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Account Balance FCY"
                id="account-balance-accountBalanceFCY"
                name="accountBalanceFCY"
                data-cy="accountBalanceFCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Account Balance LCY"
                id="account-balance-accountBalanceLCY"
                name="accountBalanceLCY"
                data-cy="accountBalanceLCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField id="account-balance-bankCode" name="bankCode" data-cy="bankCode" label="Bank Code" type="select" required>
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
              <ValidatedField id="account-balance-branchId" name="branchId" data-cy="branchId" label="Branch Id" type="select" required>
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
                id="account-balance-currencyCode"
                name="currencyCode"
                data-cy="currencyCode"
                label="Currency Code"
                type="select"
                required
              >
                <option value="" key="0" />
                {isoCurrencyCodes
                  ? isoCurrencyCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.alphabeticCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/account-balance" replace color="info">
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

export default AccountBalanceUpdate;
