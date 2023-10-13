import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';
import { ISettlement } from 'app/shared/model/settlement/settlement.model';
import { getEntities as getSettlements } from 'app/entities/settlement/settlement/settlement.reducer';
import { IServiceOutlet } from 'app/shared/model/gdi/service-outlet.model';
import { getEntities as getServiceOutlets } from 'app/entities/gdi/service-outlet/service-outlet.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { ITransactionAccount } from 'app/shared/model/accounting/transaction-account.model';
import { getEntities as getTransactionAccounts } from 'app/entities/accounting/transaction-account/transaction-account.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IPrepaymentMapping } from 'app/shared/model/prepayments/prepayment-mapping.model';
import { getEntities as getPrepaymentMappings } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IPrepaymentAccount } from 'app/shared/model/prepayments/prepayment-account.model';
import { getEntity, updateEntity, createEntity, reset } from './prepayment-account.reducer';

export const PrepaymentAccountUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const settlements = useAppSelector(state => state.settlement.entities);
  const serviceOutlets = useAppSelector(state => state.serviceOutlet.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const transactionAccounts = useAppSelector(state => state.transactionAccount.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const prepaymentMappings = useAppSelector(state => state.prepaymentMapping.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const prepaymentAccountEntity = useAppSelector(state => state.prepaymentAccount.entity);
  const loading = useAppSelector(state => state.prepaymentAccount.loading);
  const updating = useAppSelector(state => state.prepaymentAccount.updating);
  const updateSuccess = useAppSelector(state => state.prepaymentAccount.updateSuccess);

  const handleClose = () => {
    navigate('/prepayment-account' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSettlementCurrencies({}));
    dispatch(getSettlements({}));
    dispatch(getServiceOutlets({}));
    dispatch(getDealers({}));
    dispatch(getTransactionAccounts({}));
    dispatch(getPlaceholders({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getPrepaymentMappings({}));
    dispatch(getBusinessDocuments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...prepaymentAccountEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      generalParameters: mapIdList(values.generalParameters),
      prepaymentParameters: mapIdList(values.prepaymentParameters),
      businessDocuments: mapIdList(values.businessDocuments),
      settlementCurrency: settlementCurrencies.find(it => it.id.toString() === values.settlementCurrency.toString()),
      prepaymentTransaction: settlements.find(it => it.id.toString() === values.prepaymentTransaction.toString()),
      serviceOutlet: serviceOutlets.find(it => it.id.toString() === values.serviceOutlet.toString()),
      dealer: dealers.find(it => it.id.toString() === values.dealer.toString()),
      debitAccount: transactionAccounts.find(it => it.id.toString() === values.debitAccount.toString()),
      transferAccount: transactionAccounts.find(it => it.id.toString() === values.transferAccount.toString()),
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
          ...prepaymentAccountEntity,
          settlementCurrency: prepaymentAccountEntity?.settlementCurrency?.id,
          prepaymentTransaction: prepaymentAccountEntity?.prepaymentTransaction?.id,
          serviceOutlet: prepaymentAccountEntity?.serviceOutlet?.id,
          dealer: prepaymentAccountEntity?.dealer?.id,
          debitAccount: prepaymentAccountEntity?.debitAccount?.id,
          transferAccount: prepaymentAccountEntity?.transferAccount?.id,
          placeholders: prepaymentAccountEntity?.placeholders?.map(e => e.id.toString()),
          generalParameters: prepaymentAccountEntity?.generalParameters?.map(e => e.id.toString()),
          prepaymentParameters: prepaymentAccountEntity?.prepaymentParameters?.map(e => e.id.toString()),
          businessDocuments: prepaymentAccountEntity?.businessDocuments?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.prepaymentsPrepaymentAccount.home.createOrEditLabel" data-cy="PrepaymentAccountCreateUpdateHeading">
            Create or edit a Prepayment Account
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
                <ValidatedField name="id" required readOnly id="prepayment-account-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Catalogue Number"
                id="prepayment-account-catalogueNumber"
                name="catalogueNumber"
                data-cy="catalogueNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Particulars"
                id="prepayment-account-particulars"
                name="particulars"
                data-cy="particulars"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Notes" id="prepayment-account-notes" name="notes" data-cy="notes" type="textarea" />
              <ValidatedField
                label="Prepayment Amount"
                id="prepayment-account-prepaymentAmount"
                name="prepaymentAmount"
                data-cy="prepaymentAmount"
                type="text"
              />
              <ValidatedField
                label="Prepayment Guid"
                id="prepayment-account-prepaymentGuid"
                name="prepaymentGuid"
                data-cy="prepaymentGuid"
                type="text"
              />
              <ValidatedField
                id="prepayment-account-settlementCurrency"
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
                id="prepayment-account-prepaymentTransaction"
                name="prepaymentTransaction"
                data-cy="prepaymentTransaction"
                label="Prepayment Transaction"
                type="select"
              >
                <option value="" key="0" />
                {settlements
                  ? settlements.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.paymentNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="prepayment-account-serviceOutlet"
                name="serviceOutlet"
                data-cy="serviceOutlet"
                label="Service Outlet"
                type="select"
              >
                <option value="" key="0" />
                {serviceOutlets
                  ? serviceOutlets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.outletCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="prepayment-account-dealer" name="dealer" data-cy="dealer" label="Dealer" type="select">
                <option value="" key="0" />
                {dealers
                  ? dealers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.dealerName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="prepayment-account-debitAccount"
                name="debitAccount"
                data-cy="debitAccount"
                label="Debit Account"
                type="select"
              >
                <option value="" key="0" />
                {transactionAccounts
                  ? transactionAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.accountName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="prepayment-account-transferAccount"
                name="transferAccount"
                data-cy="transferAccount"
                label="Transfer Account"
                type="select"
              >
                <option value="" key="0" />
                {transactionAccounts
                  ? transactionAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.accountName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="prepayment-account-placeholder"
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
              <ValidatedField
                label="General Parameters"
                id="prepayment-account-generalParameters"
                data-cy="generalParameters"
                type="select"
                multiple
                name="generalParameters"
              >
                <option value="" key="0" />
                {universallyUniqueMappings
                  ? universallyUniqueMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.mappedValue}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Prepayment Parameters"
                id="prepayment-account-prepaymentParameters"
                data-cy="prepaymentParameters"
                type="select"
                multiple
                name="prepaymentParameters"
              >
                <option value="" key="0" />
                {prepaymentMappings
                  ? prepaymentMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.parameterKey}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Business Document"
                id="prepayment-account-businessDocument"
                data-cy="businessDocument"
                type="select"
                multiple
                name="businessDocuments"
              >
                <option value="" key="0" />
                {businessDocuments
                  ? businessDocuments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.documentTitle}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/prepayment-account" replace color="info">
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

export default PrepaymentAccountUpdate;
