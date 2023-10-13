import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { getEntities as getPaymentLabels } from 'app/entities/settlement/payment-label/payment-label.reducer';
import { IPaymentCategory } from 'app/shared/model/settlement/payment-category.model';
import { getEntities as getPaymentCategories } from 'app/entities/settlement/payment-category/payment-category.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { getEntities as getPayments } from 'app/entities/settlement/payment/payment.reducer';
import { IPayment } from 'app/shared/model/settlement/payment.model';
import { CurrencyTypes } from 'app/shared/model/enumerations/currency-types.model';
import { getEntity, updateEntity, createEntity, reset } from './payment.reducer';

export const PaymentUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const paymentCategories = useAppSelector(state => state.paymentCategory.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const payments = useAppSelector(state => state.payment.entities);
  const paymentEntity = useAppSelector(state => state.payment.entity);
  const loading = useAppSelector(state => state.payment.loading);
  const updating = useAppSelector(state => state.payment.updating);
  const updateSuccess = useAppSelector(state => state.payment.updateSuccess);
  const currencyTypesValues = Object.keys(CurrencyTypes);

  const handleClose = () => {
    navigate('/payment' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPaymentLabels({}));
    dispatch(getPaymentCategories({}));
    dispatch(getPlaceholders({}));
    dispatch(getPayments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...paymentEntity,
      ...values,
      paymentLabels: mapIdList(values.paymentLabels),
      placeholders: mapIdList(values.placeholders),
      paymentCategory: paymentCategories.find(it => it.id.toString() === values.paymentCategory.toString()),
      paymentGroup: payments.find(it => it.id.toString() === values.paymentGroup.toString()),
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
          settlementCurrency: 'KES',
          ...paymentEntity,
          paymentLabels: paymentEntity?.paymentLabels?.map(e => e.id.toString()),
          paymentCategory: paymentEntity?.paymentCategory?.id,
          placeholders: paymentEntity?.placeholders?.map(e => e.id.toString()),
          paymentGroup: paymentEntity?.paymentGroup?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementPayment.home.createOrEditLabel" data-cy="PaymentCreateUpdateHeading">
            Create or edit a Payment
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="payment-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Payment Number" id="payment-paymentNumber" name="paymentNumber" data-cy="paymentNumber" type="text" />
              <ValidatedField label="Payment Date" id="payment-paymentDate" name="paymentDate" data-cy="paymentDate" type="date" />
              <ValidatedField
                label="Invoiced Amount"
                id="payment-invoicedAmount"
                name="invoicedAmount"
                data-cy="invoicedAmount"
                type="text"
              />
              <ValidatedField label="Payment Amount" id="payment-paymentAmount" name="paymentAmount" data-cy="paymentAmount" type="text" />
              <ValidatedField label="Description" id="payment-description" name="description" data-cy="description" type="text" />
              <ValidatedField
                label="Settlement Currency"
                id="payment-settlementCurrency"
                name="settlementCurrency"
                data-cy="settlementCurrency"
                type="select"
              >
                {currencyTypesValues.map(currencyTypes => (
                  <option value={currencyTypes} key={currencyTypes}>
                    {currencyTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label="Calculation File"
                id="payment-calculationFile"
                name="calculationFile"
                data-cy="calculationFile"
                openActionLabel="Open"
              />
              <ValidatedField label="Dealer Name" id="payment-dealerName" name="dealerName" data-cy="dealerName" type="text" />
              <ValidatedField
                label="Purchase Order Number"
                id="payment-purchaseOrderNumber"
                name="purchaseOrderNumber"
                data-cy="purchaseOrderNumber"
                type="text"
              />
              <ValidatedField
                label="File Upload Token"
                id="payment-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="payment-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField
                label="Payment Label"
                id="payment-paymentLabel"
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
                id="payment-paymentCategory"
                name="paymentCategory"
                data-cy="paymentCategory"
                label="Payment Category"
                type="select"
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
              <ValidatedField label="Placeholder" id="payment-placeholder" data-cy="placeholder" type="select" multiple name="placeholders">
                <option value="" key="0" />
                {placeholders
                  ? placeholders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.description}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="payment-paymentGroup" name="paymentGroup" data-cy="paymentGroup" label="Payment Group" type="select">
                <option value="" key="0" />
                {payments
                  ? payments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/payment" replace color="info">
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

export default PaymentUpdate;
