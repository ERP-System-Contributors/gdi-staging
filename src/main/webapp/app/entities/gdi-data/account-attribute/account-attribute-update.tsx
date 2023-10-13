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
import { IAccountOwnershipType } from 'app/shared/model/gdi/account-ownership-type.model';
import { getEntities as getAccountOwnershipTypes } from 'app/entities/gdi/account-ownership-type/account-ownership-type.reducer';
import { IAccountAttribute } from 'app/shared/model/gdi-data/account-attribute.model';
import { getEntity, updateEntity, createEntity, reset } from './account-attribute.reducer';

export const AccountAttributeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const bankBranchCodes = useAppSelector(state => state.bankBranchCode.entities);
  const accountOwnershipTypes = useAppSelector(state => state.accountOwnershipType.entities);
  const accountAttributeEntity = useAppSelector(state => state.accountAttribute.entity);
  const loading = useAppSelector(state => state.accountAttribute.loading);
  const updating = useAppSelector(state => state.accountAttribute.updating);
  const updateSuccess = useAppSelector(state => state.accountAttribute.updateSuccess);

  const handleClose = () => {
    navigate('/account-attribute' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getBankBranchCodes({}));
    dispatch(getAccountOwnershipTypes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...accountAttributeEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      branchCode: bankBranchCodes.find(it => it.id.toString() === values.branchCode.toString()),
      accountOwnershipType: accountOwnershipTypes.find(it => it.id.toString() === values.accountOwnershipType.toString()),
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
          ...accountAttributeEntity,
          bankCode: accountAttributeEntity?.bankCode?.id,
          branchCode: accountAttributeEntity?.branchCode?.id,
          accountOwnershipType: accountAttributeEntity?.accountOwnershipType?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataAccountAttribute.home.createOrEditLabel" data-cy="AccountAttributeCreateUpdateHeading">
            Create or edit a Account Attribute
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
                <ValidatedField name="id" required readOnly id="account-attribute-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="account-attribute-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Customer Number"
                id="account-attribute-customerNumber"
                name="customerNumber"
                data-cy="customerNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Account Contract Number"
                id="account-attribute-accountContractNumber"
                name="accountContractNumber"
                data-cy="accountContractNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Account Name"
                id="account-attribute-accountName"
                name="accountName"
                data-cy="accountName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Account Opening Date"
                id="account-attribute-accountOpeningDate"
                name="accountOpeningDate"
                data-cy="accountOpeningDate"
                type="date"
              />
              <ValidatedField
                label="Account Closing Date"
                id="account-attribute-accountClosingDate"
                name="accountClosingDate"
                data-cy="accountClosingDate"
                type="date"
              />
              <ValidatedField
                label="Debit Interest Rate"
                id="account-attribute-debitInterestRate"
                name="debitInterestRate"
                data-cy="debitInterestRate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Credit Interest Rate"
                id="account-attribute-creditInterestRate"
                name="creditInterestRate"
                data-cy="creditInterestRate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Sanctioned Account Limit Fcy"
                id="account-attribute-sanctionedAccountLimitFcy"
                name="sanctionedAccountLimitFcy"
                data-cy="sanctionedAccountLimitFcy"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Sanctioned Account Limit Lcy"
                id="account-attribute-sanctionedAccountLimitLcy"
                name="sanctionedAccountLimitLcy"
                data-cy="sanctionedAccountLimitLcy"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Account Status Change Date"
                id="account-attribute-accountStatusChangeDate"
                name="accountStatusChangeDate"
                data-cy="accountStatusChangeDate"
                type="date"
              />
              <ValidatedField label="Expiry Date" id="account-attribute-expiryDate" name="expiryDate" data-cy="expiryDate" type="date" />
              <ValidatedField id="account-attribute-bankCode" name="bankCode" data-cy="bankCode" label="Bank Code" type="select" required>
                <option value="" key="0" />
                {institutionCodes
                  ? institutionCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.institutionCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="account-attribute-branchCode"
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
                id="account-attribute-accountOwnershipType"
                name="accountOwnershipType"
                data-cy="accountOwnershipType"
                label="Account Ownership Type"
                type="select"
                required
              >
                <option value="" key="0" />
                {accountOwnershipTypes
                  ? accountOwnershipTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.accountOwnershipType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/account-attribute" replace color="info">
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

export default AccountAttributeUpdate;
