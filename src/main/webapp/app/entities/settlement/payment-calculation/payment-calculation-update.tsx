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
import { IPaymentCalculation } from 'app/shared/model/settlement/payment-calculation.model';
import { getEntity, updateEntity, createEntity, reset } from './payment-calculation.reducer';

export const PaymentCalculationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const paymentCategories = useAppSelector(state => state.paymentCategory.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const paymentCalculationEntity = useAppSelector(state => state.paymentCalculation.entity);
  const loading = useAppSelector(state => state.paymentCalculation.loading);
  const updating = useAppSelector(state => state.paymentCalculation.updating);
  const updateSuccess = useAppSelector(state => state.paymentCalculation.updateSuccess);

  const handleClose = () => {
    navigate('/payment-calculation' + location.search);
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
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...paymentCalculationEntity,
      ...values,
      paymentLabels: mapIdList(values.paymentLabels),
      placeholders: mapIdList(values.placeholders),
      paymentCategory: paymentCategories.find(it => it.id.toString() === values.paymentCategory.toString()),
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
          ...paymentCalculationEntity,
          paymentLabels: paymentCalculationEntity?.paymentLabels?.map(e => e.id.toString()),
          paymentCategory: paymentCalculationEntity?.paymentCategory?.id,
          placeholders: paymentCalculationEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementPaymentCalculation.home.createOrEditLabel" data-cy="PaymentCalculationCreateUpdateHeading">
            Create or edit a Payment Calculation
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
                <ValidatedField name="id" required readOnly id="payment-calculation-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Payment Expense"
                id="payment-calculation-paymentExpense"
                name="paymentExpense"
                data-cy="paymentExpense"
                type="text"
              />
              <ValidatedField
                label="Withholding VAT"
                id="payment-calculation-withholdingVAT"
                name="withholdingVAT"
                data-cy="withholdingVAT"
                type="text"
              />
              <ValidatedField
                label="Withholding Tax"
                id="payment-calculation-withholdingTax"
                name="withholdingTax"
                data-cy="withholdingTax"
                type="text"
              />
              <ValidatedField
                label="Payment Amount"
                id="payment-calculation-paymentAmount"
                name="paymentAmount"
                data-cy="paymentAmount"
                type="text"
              />
              <ValidatedField
                label="File Upload Token"
                id="payment-calculation-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="payment-calculation-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField
                label="Payment Label"
                id="payment-calculation-paymentLabel"
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
                id="payment-calculation-paymentCategory"
                name="paymentCategory"
                data-cy="paymentCategory"
                label="Payment Category"
                type="select"
              >
                <option value="" key="0" />
                {paymentCategories
                  ? paymentCategories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="payment-calculation-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/payment-calculation" replace color="info">
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

export default PaymentCalculationUpdate;
