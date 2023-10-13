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
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { getEntities as getPaymentLabels } from 'app/entities/settlement/payment-label/payment-label.reducer';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IDeliveryNote } from 'app/shared/model/settlement/delivery-note.model';
import { getEntities as getDeliveryNotes } from 'app/entities/settlement/delivery-note/delivery-note.reducer';
import { IJobSheet } from 'app/shared/model/settlement/job-sheet.model';
import { getEntities as getJobSheets } from 'app/entities/settlement/job-sheet/job-sheet.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IPaymentInvoice } from 'app/shared/model/settlement/payment-invoice.model';
import { getEntity, updateEntity, createEntity, reset } from './payment-invoice.reducer';

export const PaymentInvoiceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const purchaseOrders = useAppSelector(state => state.purchaseOrder.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const deliveryNotes = useAppSelector(state => state.deliveryNote.entities);
  const jobSheets = useAppSelector(state => state.jobSheet.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const paymentInvoiceEntity = useAppSelector(state => state.paymentInvoice.entity);
  const loading = useAppSelector(state => state.paymentInvoice.loading);
  const updating = useAppSelector(state => state.paymentInvoice.updating);
  const updateSuccess = useAppSelector(state => state.paymentInvoice.updateSuccess);

  const handleClose = () => {
    navigate('/payment-invoice' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPurchaseOrders({}));
    dispatch(getPlaceholders({}));
    dispatch(getPaymentLabels({}));
    dispatch(getSettlementCurrencies({}));
    dispatch(getDealers({}));
    dispatch(getDeliveryNotes({}));
    dispatch(getJobSheets({}));
    dispatch(getBusinessDocuments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...paymentInvoiceEntity,
      ...values,
      purchaseOrders: mapIdList(values.purchaseOrders),
      placeholders: mapIdList(values.placeholders),
      paymentLabels: mapIdList(values.paymentLabels),
      deliveryNotes: mapIdList(values.deliveryNotes),
      jobSheets: mapIdList(values.jobSheets),
      businessDocuments: mapIdList(values.businessDocuments),
      settlementCurrency: settlementCurrencies.find(it => it.id.toString() === values.settlementCurrency.toString()),
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
          ...paymentInvoiceEntity,
          purchaseOrders: paymentInvoiceEntity?.purchaseOrders?.map(e => e.id.toString()),
          placeholders: paymentInvoiceEntity?.placeholders?.map(e => e.id.toString()),
          paymentLabels: paymentInvoiceEntity?.paymentLabels?.map(e => e.id.toString()),
          settlementCurrency: paymentInvoiceEntity?.settlementCurrency?.id,
          biller: paymentInvoiceEntity?.biller?.id,
          deliveryNotes: paymentInvoiceEntity?.deliveryNotes?.map(e => e.id.toString()),
          jobSheets: paymentInvoiceEntity?.jobSheets?.map(e => e.id.toString()),
          businessDocuments: paymentInvoiceEntity?.businessDocuments?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementPaymentInvoice.home.createOrEditLabel" data-cy="PaymentInvoiceCreateUpdateHeading">
            Create or edit a Payment Invoice
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
                <ValidatedField name="id" required readOnly id="payment-invoice-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Invoice Number"
                id="payment-invoice-invoiceNumber"
                name="invoiceNumber"
                data-cy="invoiceNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Invoice Date" id="payment-invoice-invoiceDate" name="invoiceDate" data-cy="invoiceDate" type="date" />
              <ValidatedField
                label="Invoice Amount"
                id="payment-invoice-invoiceAmount"
                name="invoiceAmount"
                data-cy="invoiceAmount"
                type="text"
              />
              <ValidatedField
                label="File Upload Token"
                id="payment-invoice-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="payment-invoice-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField label="Remarks" id="payment-invoice-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField
                label="Purchase Order"
                id="payment-invoice-purchaseOrder"
                data-cy="purchaseOrder"
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
              <ValidatedField
                label="Placeholder"
                id="payment-invoice-placeholder"
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
                label="Payment Label"
                id="payment-invoice-paymentLabel"
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
                id="payment-invoice-settlementCurrency"
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
              <ValidatedField id="payment-invoice-biller" name="biller" data-cy="biller" label="Biller" type="select" required>
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
                label="Delivery Note"
                id="payment-invoice-deliveryNote"
                data-cy="deliveryNote"
                type="select"
                multiple
                name="deliveryNotes"
              >
                <option value="" key="0" />
                {deliveryNotes
                  ? deliveryNotes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.deliveryNoteNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField label="Job Sheet" id="payment-invoice-jobSheet" data-cy="jobSheet" type="select" multiple name="jobSheets">
                <option value="" key="0" />
                {jobSheets
                  ? jobSheets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.serialNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Business Document"
                id="payment-invoice-businessDocument"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/payment-invoice" replace color="info">
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

export default PaymentInvoiceUpdate;
