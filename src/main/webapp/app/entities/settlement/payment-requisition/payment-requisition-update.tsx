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
import { IPaymentRequisition } from 'app/shared/model/settlement/payment-requisition.model';
import { getEntity, updateEntity, createEntity, reset } from './payment-requisition.reducer';

export const PaymentRequisitionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const paymentRequisitionEntity = useAppSelector(state => state.paymentRequisition.entity);
  const loading = useAppSelector(state => state.paymentRequisition.loading);
  const updating = useAppSelector(state => state.paymentRequisition.updating);
  const updateSuccess = useAppSelector(state => state.paymentRequisition.updateSuccess);

  const handleClose = () => {
    navigate('/payment-requisition' + location.search);
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
      ...paymentRequisitionEntity,
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
          ...paymentRequisitionEntity,
          paymentLabels: paymentRequisitionEntity?.paymentLabels?.map(e => e.id.toString()),
          placeholders: paymentRequisitionEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementPaymentRequisition.home.createOrEditLabel" data-cy="PaymentRequisitionCreateUpdateHeading">
            Create or edit a Payment Requisition
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
                <ValidatedField name="id" required readOnly id="payment-requisition-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reception Date"
                id="payment-requisition-receptionDate"
                name="receptionDate"
                data-cy="receptionDate"
                type="date"
              />
              <ValidatedField label="Dealer Name" id="payment-requisition-dealerName" name="dealerName" data-cy="dealerName" type="text" />
              <ValidatedField
                label="Brief Description"
                id="payment-requisition-briefDescription"
                name="briefDescription"
                data-cy="briefDescription"
                type="text"
              />
              <ValidatedField
                label="Requisition Number"
                id="payment-requisition-requisitionNumber"
                name="requisitionNumber"
                data-cy="requisitionNumber"
                type="text"
              />
              <ValidatedField
                label="Invoiced Amount"
                id="payment-requisition-invoicedAmount"
                name="invoicedAmount"
                data-cy="invoicedAmount"
                type="text"
              />
              <ValidatedField
                label="Disbursement Cost"
                id="payment-requisition-disbursementCost"
                name="disbursementCost"
                data-cy="disbursementCost"
                type="text"
              />
              <ValidatedField
                label="Taxable Amount"
                id="payment-requisition-taxableAmount"
                name="taxableAmount"
                data-cy="taxableAmount"
                type="text"
              />
              <ValidatedField
                label="Requisition Processed"
                id="payment-requisition-requisitionProcessed"
                name="requisitionProcessed"
                data-cy="requisitionProcessed"
                check
                type="checkbox"
              />
              <ValidatedField
                label="File Upload Token"
                id="payment-requisition-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="payment-requisition-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField
                label="Payment Label"
                id="payment-requisition-paymentLabel"
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
                id="payment-requisition-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/payment-requisition" replace color="info">
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

export default PaymentRequisitionUpdate;
