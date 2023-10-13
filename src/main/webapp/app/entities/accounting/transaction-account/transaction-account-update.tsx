import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getTransactionAccounts } from 'app/entities/accounting/transaction-account/transaction-account.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { ITransactionAccount } from 'app/shared/model/accounting/transaction-account.model';
import { getEntity, updateEntity, createEntity, reset } from './transaction-account.reducer';

export const TransactionAccountUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const transactionAccounts = useAppSelector(state => state.transactionAccount.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const transactionAccountEntity = useAppSelector(state => state.transactionAccount.entity);
  const loading = useAppSelector(state => state.transactionAccount.loading);
  const updating = useAppSelector(state => state.transactionAccount.updating);
  const updateSuccess = useAppSelector(state => state.transactionAccount.updateSuccess);

  const handleClose = () => {
    navigate('/transaction-account' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTransactionAccounts({}));
    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...transactionAccountEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      parentAccount: transactionAccounts.find(it => it.id.toString() === values.parentAccount.toString()),
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
          ...transactionAccountEntity,
          parentAccount: transactionAccountEntity?.parentAccount?.id,
          placeholders: transactionAccountEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.accountingTransactionAccount.home.createOrEditLabel" data-cy="TransactionAccountCreateUpdateHeading">
            Create or edit a Transaction Account
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
                <ValidatedField name="id" required readOnly id="transaction-account-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Account Number"
                id="transaction-account-accountNumber"
                name="accountNumber"
                data-cy="accountNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Account Name"
                id="transaction-account-accountName"
                name="accountName"
                data-cy="accountName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedBlobField label="Notes" id="transaction-account-notes" name="notes" data-cy="notes" openActionLabel="Open" />
              <ValidatedField
                id="transaction-account-parentAccount"
                name="parentAccount"
                data-cy="parentAccount"
                label="Parent Account"
                type="select"
              >
                <option value="" key="0" />
                {transactionAccounts
                  ? transactionAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.accountNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="transaction-account-placeholder"
                data-cy="placeholder"
                type="select"
                multiple
                name="placeholders"
              >
                <option value="" key="0" />
                {placeholders
                  ? placeholders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.description}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/transaction-account" replace color="info">
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

export default TransactionAccountUpdate;
