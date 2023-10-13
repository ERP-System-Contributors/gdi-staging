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
import { IPaymentCategory } from 'app/shared/model/settlement/payment-category.model';
import { CategoryTypes } from 'app/shared/model/enumerations/category-types.model';
import { getEntity, updateEntity, createEntity, reset } from './payment-category.reducer';

export const PaymentCategoryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const paymentCategoryEntity = useAppSelector(state => state.paymentCategory.entity);
  const loading = useAppSelector(state => state.paymentCategory.loading);
  const updating = useAppSelector(state => state.paymentCategory.updating);
  const updateSuccess = useAppSelector(state => state.paymentCategory.updateSuccess);
  const categoryTypesValues = Object.keys(CategoryTypes);

  const handleClose = () => {
    navigate('/payment-category' + location.search);
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
      ...paymentCategoryEntity,
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
          categoryType: 'UNDEFINED',
          ...paymentCategoryEntity,
          paymentLabels: paymentCategoryEntity?.paymentLabels?.map(e => e.id.toString()),
          placeholders: paymentCategoryEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementPaymentCategory.home.createOrEditLabel" data-cy="PaymentCategoryCreateUpdateHeading">
            Create or edit a Payment Category
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
                <ValidatedField name="id" required readOnly id="payment-category-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Category Name"
                id="payment-category-categoryName"
                name="categoryName"
                data-cy="categoryName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Category Description"
                id="payment-category-categoryDescription"
                name="categoryDescription"
                data-cy="categoryDescription"
                type="text"
              />
              <ValidatedField
                label="Category Type"
                id="payment-category-categoryType"
                name="categoryType"
                data-cy="categoryType"
                type="select"
              >
                {categoryTypesValues.map(categoryTypes => (
                  <option value={categoryTypes} key={categoryTypes}>
                    {categoryTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="File Upload Token"
                id="payment-category-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="payment-category-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField
                label="Payment Label"
                id="payment-category-paymentLabel"
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
                id="payment-category-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/payment-category" replace color="info">
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

export default PaymentCategoryUpdate;
