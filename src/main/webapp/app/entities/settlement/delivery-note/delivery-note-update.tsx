import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IBusinessStamp } from 'app/shared/model/settlement/business-stamp.model';
import { getEntities as getBusinessStamps } from 'app/entities/settlement/business-stamp/business-stamp.reducer';
import { IPurchaseOrder } from 'app/shared/model/settlement/purchase-order.model';
import { getEntities as getPurchaseOrders } from 'app/entities/settlement/purchase-order/purchase-order.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IDeliveryNote } from 'app/shared/model/settlement/delivery-note.model';
import { getEntity, updateEntity, createEntity, reset } from './delivery-note.reducer';

export const DeliveryNoteUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const businessStamps = useAppSelector(state => state.businessStamp.entities);
  const purchaseOrders = useAppSelector(state => state.purchaseOrder.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const deliveryNoteEntity = useAppSelector(state => state.deliveryNote.entity);
  const loading = useAppSelector(state => state.deliveryNote.loading);
  const updating = useAppSelector(state => state.deliveryNote.updating);
  const updateSuccess = useAppSelector(state => state.deliveryNote.updateSuccess);

  const handleClose = () => {
    navigate('/delivery-note' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getDealers({}));
    dispatch(getBusinessStamps({}));
    dispatch(getPurchaseOrders({}));
    dispatch(getBusinessDocuments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...deliveryNoteEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      signatories: mapIdList(values.signatories),
      deliveryStamps: mapIdList(values.deliveryStamps),
      otherPurchaseOrders: mapIdList(values.otherPurchaseOrders),
      businessDocuments: mapIdList(values.businessDocuments),
      receivedBy: dealers.find(it => it.id.toString() === values.receivedBy.toString()),
      supplier: dealers.find(it => it.id.toString() === values.supplier.toString()),
      purchaseOrder: purchaseOrders.find(it => it.id.toString() === values.purchaseOrder.toString()),
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
          ...deliveryNoteEntity,
          placeholders: deliveryNoteEntity?.placeholders?.map(e => e.id.toString()),
          receivedBy: deliveryNoteEntity?.receivedBy?.id,
          deliveryStamps: deliveryNoteEntity?.deliveryStamps?.map(e => e.id.toString()),
          purchaseOrder: deliveryNoteEntity?.purchaseOrder?.id,
          supplier: deliveryNoteEntity?.supplier?.id,
          signatories: deliveryNoteEntity?.signatories?.map(e => e.id.toString()),
          otherPurchaseOrders: deliveryNoteEntity?.otherPurchaseOrders?.map(e => e.id.toString()),
          businessDocuments: deliveryNoteEntity?.businessDocuments?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementDeliveryNote.home.createOrEditLabel" data-cy="DeliveryNoteCreateUpdateHeading">
            Create or edit a Delivery Note
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
                <ValidatedField name="id" required readOnly id="delivery-note-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Delivery Note Number"
                id="delivery-note-deliveryNoteNumber"
                name="deliveryNoteNumber"
                data-cy="deliveryNoteNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Document Date"
                id="delivery-note-documentDate"
                name="documentDate"
                data-cy="documentDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Description" id="delivery-note-description" name="description" data-cy="description" type="text" />
              <ValidatedField
                label="Serial Number"
                id="delivery-note-serialNumber"
                name="serialNumber"
                data-cy="serialNumber"
                type="text"
              />
              <ValidatedField label="Quantity" id="delivery-note-quantity" name="quantity" data-cy="quantity" type="text" />
              <ValidatedField label="Remarks" id="delivery-note-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField
                label="Placeholder"
                id="delivery-note-placeholder"
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
                id="delivery-note-receivedBy"
                name="receivedBy"
                data-cy="receivedBy"
                label="Received By"
                type="select"
                required
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
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="Delivery Stamps"
                id="delivery-note-deliveryStamps"
                data-cy="deliveryStamps"
                type="select"
                multiple
                name="deliveryStamps"
              >
                <option value="" key="0" />
                {businessStamps
                  ? businessStamps.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.details}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="delivery-note-purchaseOrder"
                name="purchaseOrder"
                data-cy="purchaseOrder"
                label="Purchase Order"
                type="select"
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
              <ValidatedField id="delivery-note-supplier" name="supplier" data-cy="supplier" label="Supplier" type="select" required>
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
                label="Signatories"
                id="delivery-note-signatories"
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
                label="Other Purchase Orders"
                id="delivery-note-otherPurchaseOrders"
                data-cy="otherPurchaseOrders"
                type="select"
                multiple
                name="otherPurchaseOrders"
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
                label="Business Document"
                id="delivery-note-businessDocument"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/delivery-note" replace color="info">
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

export default DeliveryNoteUpdate;
