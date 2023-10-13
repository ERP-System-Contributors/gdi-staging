import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { ILeaseContract } from 'app/shared/model/leases/lease-contract.model';
import { getEntities as getLeaseContracts } from 'app/entities/leases/lease-contract/lease-contract.reducer';
import { getEntities as getLeaseModelMetadata } from 'app/entities/leases/lease-model-metadata/lease-model-metadata.reducer';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { getEntities as getSecurityClearances } from 'app/entities/people/security-clearance/security-clearance.reducer';
import { ITransactionAccount } from 'app/shared/model/accounting/transaction-account.model';
import { getEntities as getTransactionAccounts } from 'app/entities/accounting/transaction-account/transaction-account.reducer';
import { ILeaseModelMetadata } from 'app/shared/model/leases/lease-model-metadata.model';
import { getEntity, updateEntity, createEntity, reset } from './lease-model-metadata.reducer';

export const LeaseModelMetadataUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const leaseContracts = useAppSelector(state => state.leaseContract.entities);
  const leaseModelMetadata = useAppSelector(state => state.leaseModelMetadata.entities);
  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const securityClearances = useAppSelector(state => state.securityClearance.entities);
  const transactionAccounts = useAppSelector(state => state.transactionAccount.entities);
  const leaseModelMetadataEntity = useAppSelector(state => state.leaseModelMetadata.entity);
  const loading = useAppSelector(state => state.leaseModelMetadata.loading);
  const updating = useAppSelector(state => state.leaseModelMetadata.updating);
  const updateSuccess = useAppSelector(state => state.leaseModelMetadata.updateSuccess);

  const handleClose = () => {
    navigate('/lease-model-metadata' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getLeaseContracts({}));
    dispatch(getLeaseModelMetadata({}));
    dispatch(getSettlementCurrencies({}));
    dispatch(getBusinessDocuments({}));
    dispatch(getSecurityClearances({}));
    dispatch(getTransactionAccounts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...leaseModelMetadataEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      leaseMappings: mapIdList(values.leaseMappings),
      leaseContract: leaseContracts.find(it => it.id.toString() === values.leaseContract.toString()),
      predecessor: leaseModelMetadata.find(it => it.id.toString() === values.predecessor.toString()),
      liabilityCurrency: settlementCurrencies.find(it => it.id.toString() === values.liabilityCurrency.toString()),
      rouAssetCurrency: settlementCurrencies.find(it => it.id.toString() === values.rouAssetCurrency.toString()),
      modelAttachments: businessDocuments.find(it => it.id.toString() === values.modelAttachments.toString()),
      securityClearance: securityClearances.find(it => it.id.toString() === values.securityClearance.toString()),
      leaseLiabilityAccount: transactionAccounts.find(it => it.id.toString() === values.leaseLiabilityAccount.toString()),
      interestPayableAccount: transactionAccounts.find(it => it.id.toString() === values.interestPayableAccount.toString()),
      interestExpenseAccount: transactionAccounts.find(it => it.id.toString() === values.interestExpenseAccount.toString()),
      rouAssetAccount: transactionAccounts.find(it => it.id.toString() === values.rouAssetAccount.toString()),
      rouDepreciationAccount: transactionAccounts.find(it => it.id.toString() === values.rouDepreciationAccount.toString()),
      accruedDepreciationAccount: transactionAccounts.find(it => it.id.toString() === values.accruedDepreciationAccount.toString()),
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
          ...leaseModelMetadataEntity,
          placeholders: leaseModelMetadataEntity?.placeholders?.map(e => e.id.toString()),
          leaseMappings: leaseModelMetadataEntity?.leaseMappings?.map(e => e.id.toString()),
          leaseContract: leaseModelMetadataEntity?.leaseContract?.id,
          predecessor: leaseModelMetadataEntity?.predecessor?.id,
          liabilityCurrency: leaseModelMetadataEntity?.liabilityCurrency?.id,
          rouAssetCurrency: leaseModelMetadataEntity?.rouAssetCurrency?.id,
          modelAttachments: leaseModelMetadataEntity?.modelAttachments?.id,
          securityClearance: leaseModelMetadataEntity?.securityClearance?.id,
          leaseLiabilityAccount: leaseModelMetadataEntity?.leaseLiabilityAccount?.id,
          interestPayableAccount: leaseModelMetadataEntity?.interestPayableAccount?.id,
          interestExpenseAccount: leaseModelMetadataEntity?.interestExpenseAccount?.id,
          rouAssetAccount: leaseModelMetadataEntity?.rouAssetAccount?.id,
          rouDepreciationAccount: leaseModelMetadataEntity?.rouDepreciationAccount?.id,
          accruedDepreciationAccount: leaseModelMetadataEntity?.accruedDepreciationAccount?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.leasesLeaseModelMetadata.home.createOrEditLabel" data-cy="LeaseModelMetadataCreateUpdateHeading">
            Create or edit a Lease Model Metadata
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
                <ValidatedField name="id" required readOnly id="lease-model-metadata-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Model Title"
                id="lease-model-metadata-modelTitle"
                name="modelTitle"
                data-cy="modelTitle"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Model Version"
                id="lease-model-metadata-modelVersion"
                name="modelVersion"
                data-cy="modelVersion"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Description"
                id="lease-model-metadata-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedBlobField
                label="Model Notes"
                id="lease-model-metadata-modelNotes"
                name="modelNotes"
                data-cy="modelNotes"
                openActionLabel="Open"
              />
              <ValidatedField
                label="Annual Discounting Rate"
                id="lease-model-metadata-annualDiscountingRate"
                name="annualDiscountingRate"
                data-cy="annualDiscountingRate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Commencement Date"
                id="lease-model-metadata-commencementDate"
                name="commencementDate"
                data-cy="commencementDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Terminal Date"
                id="lease-model-metadata-terminalDate"
                name="terminalDate"
                data-cy="terminalDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Total Reporting Periods"
                id="lease-model-metadata-totalReportingPeriods"
                name="totalReportingPeriods"
                data-cy="totalReportingPeriods"
                type="text"
              />
              <ValidatedField
                label="Reporting Periods Per Year"
                id="lease-model-metadata-reportingPeriodsPerYear"
                name="reportingPeriodsPerYear"
                data-cy="reportingPeriodsPerYear"
                type="text"
              />
              <ValidatedField
                label="Settlement Periods Per Year"
                id="lease-model-metadata-settlementPeriodsPerYear"
                name="settlementPeriodsPerYear"
                data-cy="settlementPeriodsPerYear"
                type="text"
              />
              <ValidatedField
                label="Initial Liability Amount"
                id="lease-model-metadata-initialLiabilityAmount"
                name="initialLiabilityAmount"
                data-cy="initialLiabilityAmount"
                type="text"
              />
              <ValidatedField
                label="Initial ROU Amount"
                id="lease-model-metadata-initialROUAmount"
                name="initialROUAmount"
                data-cy="initialROUAmount"
                type="text"
              />
              <ValidatedField
                label="Total Depreciation Periods"
                id="lease-model-metadata-totalDepreciationPeriods"
                name="totalDepreciationPeriods"
                data-cy="totalDepreciationPeriods"
                type="text"
              />
              <ValidatedField
                label="Placeholder"
                id="lease-model-metadata-placeholder"
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
                label="Lease Mapping"
                id="lease-model-metadata-leaseMapping"
                data-cy="leaseMapping"
                type="select"
                multiple
                name="leaseMappings"
              >
                <option value="" key="0" />
                {universallyUniqueMappings
                  ? universallyUniqueMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.universalKey}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="lease-model-metadata-leaseContract"
                name="leaseContract"
                data-cy="leaseContract"
                label="Lease Contract"
                type="select"
                required
              >
                <option value="" key="0" />
                {leaseContracts
                  ? leaseContracts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.bookingId}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="lease-model-metadata-predecessor"
                name="predecessor"
                data-cy="predecessor"
                label="Predecessor"
                type="select"
              >
                <option value="" key="0" />
                {leaseModelMetadata
                  ? leaseModelMetadata.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.modelTitle}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="lease-model-metadata-liabilityCurrency"
                name="liabilityCurrency"
                data-cy="liabilityCurrency"
                label="Liability Currency"
                type="select"
                required
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
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="lease-model-metadata-rouAssetCurrency"
                name="rouAssetCurrency"
                data-cy="rouAssetCurrency"
                label="Rou Asset Currency"
                type="select"
                required
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
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="lease-model-metadata-modelAttachments"
                name="modelAttachments"
                data-cy="modelAttachments"
                label="Model Attachments"
                type="select"
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
              <ValidatedField
                id="lease-model-metadata-securityClearance"
                name="securityClearance"
                data-cy="securityClearance"
                label="Security Clearance"
                type="select"
              >
                <option value="" key="0" />
                {securityClearances
                  ? securityClearances.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.clearanceLevel}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="lease-model-metadata-leaseLiabilityAccount"
                name="leaseLiabilityAccount"
                data-cy="leaseLiabilityAccount"
                label="Lease Liability Account"
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
                id="lease-model-metadata-interestPayableAccount"
                name="interestPayableAccount"
                data-cy="interestPayableAccount"
                label="Interest Payable Account"
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
                id="lease-model-metadata-interestExpenseAccount"
                name="interestExpenseAccount"
                data-cy="interestExpenseAccount"
                label="Interest Expense Account"
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
                id="lease-model-metadata-rouAssetAccount"
                name="rouAssetAccount"
                data-cy="rouAssetAccount"
                label="Rou Asset Account"
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
                id="lease-model-metadata-rouDepreciationAccount"
                name="rouDepreciationAccount"
                data-cy="rouDepreciationAccount"
                label="Rou Depreciation Account"
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
                id="lease-model-metadata-accruedDepreciationAccount"
                name="accruedDepreciationAccount"
                data-cy="accruedDepreciationAccount"
                label="Accrued Depreciation Account"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/lease-model-metadata" replace color="info">
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

export default LeaseModelMetadataUpdate;
