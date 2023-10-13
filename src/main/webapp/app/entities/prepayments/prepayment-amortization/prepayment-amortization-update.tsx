import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPrepaymentAccount } from 'app/shared/model/prepayments/prepayment-account.model';
import { getEntities as getPrepaymentAccounts } from 'app/entities/prepayments/prepayment-account/prepayment-account.reducer';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';
import { ITransactionAccount } from 'app/shared/model/accounting/transaction-account.model';
import { getEntities as getTransactionAccounts } from 'app/entities/accounting/transaction-account/transaction-account.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IPrepaymentAmortization } from 'app/shared/model/prepayments/prepayment-amortization.model';
import { getEntity, updateEntity, createEntity, reset } from './prepayment-amortization.reducer';

export const PrepaymentAmortizationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const prepaymentAccounts = useAppSelector(state => state.prepaymentAccount.entities);
  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const transactionAccounts = useAppSelector(state => state.transactionAccount.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const prepaymentAmortizationEntity = useAppSelector(state => state.prepaymentAmortization.entity);
  const loading = useAppSelector(state => state.prepaymentAmortization.loading);
  const updating = useAppSelector(state => state.prepaymentAmortization.updating);
  const updateSuccess = useAppSelector(state => state.prepaymentAmortization.updateSuccess);

  const handleClose = () => {
    navigate('/prepayment-amortization' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPrepaymentAccounts({}));
    dispatch(getSettlementCurrencies({}));
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
      ...prepaymentAmortizationEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      prepaymentAccount: prepaymentAccounts.find(it => it.id.toString() === values.prepaymentAccount.toString()),
      settlementCurrency: settlementCurrencies.find(it => it.id.toString() === values.settlementCurrency.toString()),
      debitAccount: transactionAccounts.find(it => it.id.toString() === values.debitAccount.toString()),
      creditAccount: transactionAccounts.find(it => it.id.toString() === values.creditAccount.toString()),
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
          ...prepaymentAmortizationEntity,
          prepaymentAccount: prepaymentAmortizationEntity?.prepaymentAccount?.id,
          settlementCurrency: prepaymentAmortizationEntity?.settlementCurrency?.id,
          debitAccount: prepaymentAmortizationEntity?.debitAccount?.id,
          creditAccount: prepaymentAmortizationEntity?.creditAccount?.id,
          placeholders: prepaymentAmortizationEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="gdiStagingApp.prepaymentsPrepaymentAmortization.home.createOrEditLabel"
            data-cy="PrepaymentAmortizationCreateUpdateHeading"
          >
            Create or edit a Prepayment Amortization
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
                <ValidatedField name="id" required readOnly id="prepayment-amortization-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Description"
                id="prepayment-amortization-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label="Prepayment Period"
                id="prepayment-amortization-prepaymentPeriod"
                name="prepaymentPeriod"
                data-cy="prepaymentPeriod"
                type="date"
              />
              <ValidatedField
                label="Prepayment Amount"
                id="prepayment-amortization-prepaymentAmount"
                name="prepaymentAmount"
                data-cy="prepaymentAmount"
                type="text"
              />
              <ValidatedField
                label="Inactive"
                id="prepayment-amortization-inactive"
                name="inactive"
                data-cy="inactive"
                check
                type="checkbox"
              />
              <ValidatedField
                id="prepayment-amortization-prepaymentAccount"
                name="prepaymentAccount"
                data-cy="prepaymentAccount"
                label="Prepayment Account"
                type="select"
              >
                <option value="" key="0" />
                {prepaymentAccounts
                  ? prepaymentAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.catalogueNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="prepayment-amortization-settlementCurrency"
                name="settlementCurrency"
                data-cy="settlementCurrency"
                label="Settlement Currency"
                type="select"
              >
                <option value="" key="0" />
                {settlementCurrencies
                  ? settlementCurrencies.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.iso4217CurrencyCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="prepayment-amortization-debitAccount"
                name="debitAccount"
                data-cy="debitAccount"
                label="Debit Account"
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
                id="prepayment-amortization-creditAccount"
                name="creditAccount"
                data-cy="creditAccount"
                label="Credit Account"
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
                id="prepayment-amortization-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/prepayment-amortization" replace color="info">
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

export default PrepaymentAmortizationUpdate;
