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
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';
import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { getEntities as getPaymentLabels } from 'app/entities/settlement/payment-label/payment-label.reducer';
import { IPaymentCategory } from 'app/shared/model/settlement/payment-category.model';
import { getEntities as getPaymentCategories } from 'app/entities/settlement/payment-category/payment-category.reducer';
import { getEntities as getSettlements } from 'app/entities/settlement/settlement/settlement.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IPaymentInvoice } from 'app/shared/model/settlement/payment-invoice.model';
import { getEntities as getPaymentInvoices } from 'app/entities/settlement/payment-invoice/payment-invoice.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { ISettlement } from 'app/shared/model/settlement/settlement.model';
import { getEntity, updateEntity, createEntity, reset } from './settlement.reducer';

export const SettlementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const paymentCategories = useAppSelector(state => state.paymentCategory.entities);
  const settlements = useAppSelector(state => state.settlement.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const paymentInvoices = useAppSelector(state => state.paymentInvoice.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const settlementEntity = useAppSelector(state => state.settlement.entity);
  const loading = useAppSelector(state => state.settlement.loading);
  const updating = useAppSelector(state => state.settlement.updating);
  const updateSuccess = useAppSelector(state => state.settlement.updateSuccess);

  const handleClose = () => {
    navigate('/settlement' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getSettlementCurrencies({}));
    dispatch(getPaymentLabels({}));
    dispatch(getPaymentCategories({}));
    dispatch(getSettlements({}));
    dispatch(getDealers({}));
    dispatch(getPaymentInvoices({}));
    dispatch(getBusinessDocuments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...settlementEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      paymentLabels: mapIdList(values.paymentLabels),
      signatories: mapIdList(values.signatories),
      paymentInvoices: mapIdList(values.paymentInvoices),
      businessDocuments: mapIdList(values.businessDocuments),
      settlementCurrency: settlementCurrencies.find(it => it.id.toString() === values.settlementCurrency.toString()),
      paymentCategory: paymentCategories.find(it => it.id.toString() === values.paymentCategory.toString()),
      groupSettlement: settlements.find(it => it.id.toString() === values.groupSettlement.toString()),
      biller: dealers.find(it => it.id.toString() === values.biller.toString()),
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
          ...settlementEntity,
          placeholders: settlementEntity?.placeholders?.map(e => e.id.toString()),
          settlementCurrency: settlementEntity?.settlementCurrency?.id,
          paymentLabels: settlementEntity?.paymentLabels?.map(e => e.id.toString()),
          paymentCategory: settlementEntity?.paymentCategory?.id,
          groupSettlement: settlementEntity?.groupSettlement?.id,
          biller: settlementEntity?.biller?.id,
          paymentInvoices: settlementEntity?.paymentInvoices?.map(e => e.id.toString()),
          signatories: settlementEntity?.signatories?.map(e => e.id.toString()),
          businessDocuments: settlementEntity?.businessDocuments?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementSettlement.home.createOrEditLabel" data-cy="SettlementCreateUpdateHeading">
            Create or edit a Settlement
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="settlement-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Payment Number"
                id="settlement-paymentNumber"
                name="paymentNumber"
                data-cy="paymentNumber"
                type="text"
              />
              <ValidatedField label="Payment Date" id="settlement-paymentDate" name="paymentDate" data-cy="paymentDate" type="date" />
              <ValidatedField
                label="Payment Amount"
                id="settlement-paymentAmount"
                name="paymentAmount"
                data-cy="paymentAmount"
                type="text"
              />
              <ValidatedField label="Description" id="settlement-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="Notes" id="settlement-notes" name="notes" data-cy="notes" type="text" />
              <ValidatedBlobField
                label="Calculation File"
                id="settlement-calculationFile"
                name="calculationFile"
                data-cy="calculationFile"
                openActionLabel="Open"
              />
              <ValidatedField
                label="File Upload Token"
                id="settlement-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="settlement-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField label="Remarks" id="settlement-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField
                label="Placeholder"
                id="settlement-placeholder"
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
                id="settlement-settlementCurrency"
                name="settlementCurrency"
                data-cy="settlementCurrency"
                label="Settlement Currency"
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
                label="Payment Label"
                id="settlement-paymentLabel"
                data-cy="paymentLabel"
                type="select"
                multiple
                name="paymentLabels"
              >
                <option value="" key="0" />
                {paymentLabels
                  ? paymentLabels.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.description}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="settlement-paymentCategory"
                name="paymentCategory"
                data-cy="paymentCategory"
                label="Payment Category"
                type="select"
                required
              >
                <option value="" key="0" />
                {paymentCategories
                  ? paymentCategories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.categoryName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="settlement-groupSettlement"
                name="groupSettlement"
                data-cy="groupSettlement"
                label="Group Settlement"
                type="select"
              >
                <option value="" key="0" />
                {settlements
                  ? settlements.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="settlement-biller" name="biller" data-cy="biller" label="Biller" type="select" required>
                <option value="" key="0" />
                {dealers
                  ? dealers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.dealerName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="Payment Invoice"
                id="settlement-paymentInvoice"
                data-cy="paymentInvoice"
                type="select"
                multiple
                name="paymentInvoices"
              >
                <option value="" key="0" />
                {paymentInvoices
                  ? paymentInvoices.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.invoiceNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Signatories"
                id="settlement-signatories"
                data-cy="signatories"
                type="select"
                multiple
                name="signatories"
              >
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
                label="Business Document"
                id="settlement-businessDocument"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/settlement" replace color="info">
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

export default SettlementUpdate;
