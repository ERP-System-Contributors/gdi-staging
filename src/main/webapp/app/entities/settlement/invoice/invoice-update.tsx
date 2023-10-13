import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { getEntities as getPaymentLabels } from 'app/entities/settlement/payment-label/payment-label.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IInvoice } from 'app/shared/model/settlement/invoice.model';
import { CurrencyTypes } from 'app/shared/model/enumerations/currency-types.model';
import { getEntity, updateEntity, createEntity, reset } from './invoice.reducer';

export const InvoiceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const invoiceEntity = useAppSelector(state => state.invoice.entity);
  const loading = useAppSelector(state => state.invoice.loading);
  const updating = useAppSelector(state => state.invoice.updating);
  const updateSuccess = useAppSelector(state => state.invoice.updateSuccess);
  const currencyTypesValues = Object.keys(CurrencyTypes);

  const handleClose = () => {
    navigate('/invoice' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPaymentLabels({}));
    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...invoiceEntity,
      ...values,
      paymentLabels: mapIdList(values.paymentLabels),
      placeholders: mapIdList(values.placeholders),
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
          currency: 'KES',
          ...invoiceEntity,
          paymentLabels: invoiceEntity?.paymentLabels?.map(e => e.id.toString()),
          placeholders: invoiceEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementInvoice.home.createOrEditLabel" data-cy="InvoiceCreateUpdateHeading">
            Create or edit a Invoice
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="invoice-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Invoice Number"
                id="invoice-invoiceNumber"
                name="invoiceNumber"
                data-cy="invoiceNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Invoice Date" id="invoice-invoiceDate" name="invoiceDate" data-cy="invoiceDate" type="date" />
              <ValidatedField label="Invoice Amount" id="invoice-invoiceAmount" name="invoiceAmount" data-cy="invoiceAmount" type="text" />
              <ValidatedField label="Currency" id="invoice-currency" name="currency" data-cy="currency" type="select">
                {currencyTypesValues.map(currencyTypes => (
                  <option value={currencyTypes} key={currencyTypes}>
                    {currencyTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Payment Reference"
                id="invoice-paymentReference"
                name="paymentReference"
                data-cy="paymentReference"
                type="text"
              />
              <ValidatedField label="Dealer Name" id="invoice-dealerName" name="dealerName" data-cy="dealerName" type="text" />
              <ValidatedField
                label="File Upload Token"
                id="invoice-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="invoice-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField
                label="Payment Label"
                id="invoice-paymentLabel"
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
              <ValidatedField label="Placeholder" id="invoice-placeholder" data-cy="placeholder" type="select" multiple name="placeholders">
                <option value="" key="0" />
                {placeholders
                  ? placeholders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.description}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/invoice" replace color="info">
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

export default InvoiceUpdate;
