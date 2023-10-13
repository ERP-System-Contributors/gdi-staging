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
import { IPaymentCategory } from 'app/shared/model/settlement/payment-category.model';
import { getEntities as getPaymentCategories } from 'app/entities/settlement/payment-category/payment-category.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { getEntities as getSignedPayments } from 'app/entities/settlement/signed-payment/signed-payment.reducer';
import { ISignedPayment } from 'app/shared/model/settlement/signed-payment.model';
import { CurrencyTypes } from 'app/shared/model/enumerations/currency-types.model';
import { getEntity, updateEntity, createEntity, reset } from './signed-payment.reducer';

export const SignedPaymentUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const paymentCategories = useAppSelector(state => state.paymentCategory.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const signedPayments = useAppSelector(state => state.signedPayment.entities);
  const signedPaymentEntity = useAppSelector(state => state.signedPayment.entity);
  const loading = useAppSelector(state => state.signedPayment.loading);
  const updating = useAppSelector(state => state.signedPayment.updating);
  const updateSuccess = useAppSelector(state => state.signedPayment.updateSuccess);
  const currencyTypesValues = Object.keys(CurrencyTypes);

  const handleClose = () => {
    navigate('/signed-payment' + location.search);
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
    dispatch(getSignedPayments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...signedPaymentEntity,
      ...values,
      paymentLabels: mapIdList(values.paymentLabels),
      placeholders: mapIdList(values.placeholders),
      paymentCategory: paymentCategories.find(it => it.id.toString() === values.paymentCategory.toString()),
      signedPaymentGroup: signedPayments.find(it => it.id.toString() === values.signedPaymentGroup.toString()),
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
          transactionCurrency: 'KES',
          ...signedPaymentEntity,
          paymentLabels: signedPaymentEntity?.paymentLabels?.map(e => e.id.toString()),
          paymentCategory: signedPaymentEntity?.paymentCategory?.id,
          placeholders: signedPaymentEntity?.placeholders?.map(e => e.id.toString()),
          signedPaymentGroup: signedPaymentEntity?.signedPaymentGroup?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementSignedPayment.home.createOrEditLabel" data-cy="SignedPaymentCreateUpdateHeading">
            Create or edit a Signed Payment
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
                <ValidatedField name="id" required readOnly id="signed-payment-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Transaction Number"
                id="signed-payment-transactionNumber"
                name="transactionNumber"
                data-cy="transactionNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Transaction Date"
                id="signed-payment-transactionDate"
                name="transactionDate"
                data-cy="transactionDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Transaction Currency"
                id="signed-payment-transactionCurrency"
                name="transactionCurrency"
                data-cy="transactionCurrency"
                type="select"
              >
                {currencyTypesValues.map(currencyTypes => (
                  <option value={currencyTypes} key={currencyTypes}>
                    {currencyTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Transaction Amount"
                id="signed-payment-transactionAmount"
                name="transactionAmount"
                data-cy="transactionAmount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField label="Dealer Name" id="signed-payment-dealerName" name="dealerName" data-cy="dealerName" type="text" />
              <ValidatedField
                label="File Upload Token"
                id="signed-payment-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="signed-payment-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField
                label="Payment Label"
                id="signed-payment-paymentLabel"
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
                id="signed-payment-paymentCategory"
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
              <ValidatedField
                label="Placeholder"
                id="signed-payment-placeholder"
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
                id="signed-payment-signedPaymentGroup"
                name="signedPaymentGroup"
                data-cy="signedPaymentGroup"
                label="Signed Payment Group"
                type="select"
              >
                <option value="" key="0" />
                {signedPayments
                  ? signedPayments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/signed-payment" replace color="info">
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

export default SignedPaymentUpdate;
