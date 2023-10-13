import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getPaymentLabels } from 'app/entities/settlement/payment-label/payment-label.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { getEntity, updateEntity, createEntity, reset } from './payment-label.reducer';

export const PaymentLabelUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const paymentLabelEntity = useAppSelector(state => state.paymentLabel.entity);
  const loading = useAppSelector(state => state.paymentLabel.loading);
  const updating = useAppSelector(state => state.paymentLabel.updating);
  const updateSuccess = useAppSelector(state => state.paymentLabel.updateSuccess);

  const handleClose = () => {
    navigate('/payment-label' + location.search);
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
      ...paymentLabelEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      containingPaymentLabel: paymentLabels.find(it => it.id.toString() === values.containingPaymentLabel.toString()),
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
          ...paymentLabelEntity,
          containingPaymentLabel: paymentLabelEntity?.containingPaymentLabel?.id,
          placeholders: paymentLabelEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementPaymentLabel.home.createOrEditLabel" data-cy="PaymentLabelCreateUpdateHeading">
            Create or edit a Payment Label
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
                <ValidatedField name="id" required readOnly id="payment-label-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Description"
                id="payment-label-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Comments" id="payment-label-comments" name="comments" data-cy="comments" type="text" />
              <ValidatedField
                label="File Upload Token"
                id="payment-label-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="payment-label-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField label="Remarks" id="payment-label-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField
                id="payment-label-containingPaymentLabel"
                name="containingPaymentLabel"
                data-cy="containingPaymentLabel"
                label="Containing Payment Label"
                type="select"
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
                id="payment-label-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/payment-label" replace color="info">
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

export default PaymentLabelUpdate;
