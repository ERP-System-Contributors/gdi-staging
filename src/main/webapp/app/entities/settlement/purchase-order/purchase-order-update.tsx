import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IPurchaseOrder } from 'app/shared/model/settlement/purchase-order.model';
import { getEntity, updateEntity, createEntity, reset } from './purchase-order.reducer';

export const PurchaseOrderUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const purchaseOrderEntity = useAppSelector(state => state.purchaseOrder.entity);
  const loading = useAppSelector(state => state.purchaseOrder.loading);
  const updating = useAppSelector(state => state.purchaseOrder.updating);
  const updateSuccess = useAppSelector(state => state.purchaseOrder.updateSuccess);

  const handleClose = () => {
    navigate('/purchase-order' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSettlementCurrencies({}));
    dispatch(getPlaceholders({}));
    dispatch(getDealers({}));
    dispatch(getBusinessDocuments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...purchaseOrderEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      signatories: mapIdList(values.signatories),
      businessDocuments: mapIdList(values.businessDocuments),
      settlementCurrency: settlementCurrencies.find(it => it.id.toString() === values.settlementCurrency.toString()),
      vendor: dealers.find(it => it.id.toString() === values.vendor.toString()),
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
          ...purchaseOrderEntity,
          settlementCurrency: purchaseOrderEntity?.settlementCurrency?.id,
          placeholders: purchaseOrderEntity?.placeholders?.map(e => e.id.toString()),
          signatories: purchaseOrderEntity?.signatories?.map(e => e.id.toString()),
          vendor: purchaseOrderEntity?.vendor?.id,
          businessDocuments: purchaseOrderEntity?.businessDocuments?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementPurchaseOrder.home.createOrEditLabel" data-cy="PurchaseOrderCreateUpdateHeading">
            Create or edit a Purchase Order
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
                <ValidatedField name="id" required readOnly id="purchase-order-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Purchase Order Number"
                id="purchase-order-purchaseOrderNumber"
                name="purchaseOrderNumber"
                data-cy="purchaseOrderNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Purchase Order Date"
                id="purchase-order-purchaseOrderDate"
                name="purchaseOrderDate"
                data-cy="purchaseOrderDate"
                type="date"
              />
              <ValidatedField
                label="Purchase Order Amount"
                id="purchase-order-purchaseOrderAmount"
                name="purchaseOrderAmount"
                data-cy="purchaseOrderAmount"
                type="text"
              />
              <ValidatedField label="Description" id="purchase-order-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="Notes" id="purchase-order-notes" name="notes" data-cy="notes" type="text" />
              <ValidatedField
                label="File Upload Token"
                id="purchase-order-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="purchase-order-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField label="Remarks" id="purchase-order-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField
                id="purchase-order-settlementCurrency"
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
              <ValidatedField
                label="Placeholder"
                id="purchase-order-placeholder"
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
                label="Signatories"
                id="purchase-order-signatories"
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
              <ValidatedField id="purchase-order-vendor" name="vendor" data-cy="vendor" label="Vendor" type="select" required>
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
                label="Business Document"
                id="purchase-order-businessDocument"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/purchase-order" replace color="info">
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

export default PurchaseOrderUpdate;
