import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPurchaseOrder } from 'app/shared/model/settlement/purchase-order.model';
import { getEntities as getPurchaseOrders } from 'app/entities/settlement/purchase-order/purchase-order.reducer';
import { IPaymentInvoice } from 'app/shared/model/settlement/payment-invoice.model';
import { getEntities as getPaymentInvoices } from 'app/entities/settlement/payment-invoice/payment-invoice.reducer';
import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { getEntities as getPaymentLabels } from 'app/entities/settlement/payment-label/payment-label.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';
import { ICreditNote } from 'app/shared/model/settlement/credit-note.model';
import { getEntity, updateEntity, createEntity, reset } from './credit-note.reducer';

export const CreditNoteUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const purchaseOrders = useAppSelector(state => state.purchaseOrder.entities);
  const paymentInvoices = useAppSelector(state => state.paymentInvoice.entities);
  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const creditNoteEntity = useAppSelector(state => state.creditNote.entity);
  const loading = useAppSelector(state => state.creditNote.loading);
  const updating = useAppSelector(state => state.creditNote.updating);
  const updateSuccess = useAppSelector(state => state.creditNote.updateSuccess);

  const handleClose = () => {
    navigate('/credit-note' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPurchaseOrders({}));
    dispatch(getPaymentInvoices({}));
    dispatch(getPaymentLabels({}));
    dispatch(getPlaceholders({}));
    dispatch(getSettlementCurrencies({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...creditNoteEntity,
      ...values,
      purchaseOrders: mapIdList(values.purchaseOrders),
      invoices: mapIdList(values.invoices),
      paymentLabels: mapIdList(values.paymentLabels),
      placeholders: mapIdList(values.placeholders),
      settlementCurrency: settlementCurrencies.find(it => it.id.toString() === values.settlementCurrency.toString()),
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
          ...creditNoteEntity,
          purchaseOrders: creditNoteEntity?.purchaseOrders?.map(e => e.id.toString()),
          invoices: creditNoteEntity?.invoices?.map(e => e.id.toString()),
          paymentLabels: creditNoteEntity?.paymentLabels?.map(e => e.id.toString()),
          placeholders: creditNoteEntity?.placeholders?.map(e => e.id.toString()),
          settlementCurrency: creditNoteEntity?.settlementCurrency?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementCreditNote.home.createOrEditLabel" data-cy="CreditNoteCreateUpdateHeading">
            Create or edit a Credit Note
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="credit-note-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Credit Number"
                id="credit-note-creditNumber"
                name="creditNumber"
                data-cy="creditNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Credit Note Date"
                id="credit-note-creditNoteDate"
                name="creditNoteDate"
                data-cy="creditNoteDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Credit Amount"
                id="credit-note-creditAmount"
                name="creditAmount"
                data-cy="creditAmount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField label="Remarks" id="credit-note-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField
                label="Purchase Orders"
                id="credit-note-purchaseOrders"
                data-cy="purchaseOrders"
                type="select"
                multiple
                name="purchaseOrders"
              >
                <option value="" key="0" />
                {purchaseOrders
                  ? purchaseOrders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.purchaseOrderNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField label="Invoices" id="credit-note-invoices" data-cy="invoices" type="select" multiple name="invoices">
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
                label="Payment Label"
                id="credit-note-paymentLabel"
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
                label="Placeholder"
                id="credit-note-placeholder"
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
                id="credit-note-settlementCurrency"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/credit-note" replace color="info">
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

export default CreditNoteUpdate;
