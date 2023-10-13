import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAssetWarranty } from 'app/shared/model/assets/asset-warranty.model';
import { getEntities as getAssetWarranties } from 'app/entities/assets/asset-warranty/asset-warranty.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IPaymentInvoice } from 'app/shared/model/settlement/payment-invoice.model';
import { getEntities as getPaymentInvoices } from 'app/entities/settlement/payment-invoice/payment-invoice.reducer';
import { IServiceOutlet } from 'app/shared/model/gdi/service-outlet.model';
import { getEntities as getServiceOutlets } from 'app/entities/gdi/service-outlet/service-outlet.reducer';
import { ISettlement } from 'app/shared/model/settlement/settlement.model';
import { getEntities as getSettlements } from 'app/entities/settlement/settlement/settlement.reducer';
import { IAssetCategory } from 'app/shared/model/assets/asset-category.model';
import { getEntities as getAssetCategories } from 'app/entities/assets/asset-category/asset-category.reducer';
import { IPurchaseOrder } from 'app/shared/model/settlement/purchase-order.model';
import { getEntities as getPurchaseOrders } from 'app/entities/settlement/purchase-order/purchase-order.reducer';
import { IDeliveryNote } from 'app/shared/model/settlement/delivery-note.model';
import { getEntities as getDeliveryNotes } from 'app/entities/settlement/delivery-note/delivery-note.reducer';
import { IJobSheet } from 'app/shared/model/settlement/job-sheet.model';
import { getEntities as getJobSheets } from 'app/entities/settlement/job-sheet/job-sheet.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IAssetAccessory } from 'app/shared/model/assets/asset-accessory.model';
import { getEntity, updateEntity, createEntity, reset } from './asset-accessory.reducer';

export const AssetAccessoryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assetWarranties = useAppSelector(state => state.assetWarranty.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const paymentInvoices = useAppSelector(state => state.paymentInvoice.entities);
  const serviceOutlets = useAppSelector(state => state.serviceOutlet.entities);
  const settlements = useAppSelector(state => state.settlement.entities);
  const assetCategories = useAppSelector(state => state.assetCategory.entities);
  const purchaseOrders = useAppSelector(state => state.purchaseOrder.entities);
  const deliveryNotes = useAppSelector(state => state.deliveryNote.entities);
  const jobSheets = useAppSelector(state => state.jobSheet.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const assetAccessoryEntity = useAppSelector(state => state.assetAccessory.entity);
  const loading = useAppSelector(state => state.assetAccessory.loading);
  const updating = useAppSelector(state => state.assetAccessory.updating);
  const updateSuccess = useAppSelector(state => state.assetAccessory.updateSuccess);

  const handleClose = () => {
    navigate('/asset-accessory' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAssetWarranties({}));
    dispatch(getPlaceholders({}));
    dispatch(getPaymentInvoices({}));
    dispatch(getServiceOutlets({}));
    dispatch(getSettlements({}));
    dispatch(getAssetCategories({}));
    dispatch(getPurchaseOrders({}));
    dispatch(getDeliveryNotes({}));
    dispatch(getJobSheets({}));
    dispatch(getDealers({}));
    dispatch(getBusinessDocuments({}));
    dispatch(getUniversallyUniqueMappings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...assetAccessoryEntity,
      ...values,
      assetWarranties: mapIdList(values.assetWarranties),
      placeholders: mapIdList(values.placeholders),
      paymentInvoices: mapIdList(values.paymentInvoices),
      settlements: mapIdList(values.settlements),
      purchaseOrders: mapIdList(values.purchaseOrders),
      deliveryNotes: mapIdList(values.deliveryNotes),
      jobSheets: mapIdList(values.jobSheets),
      designatedUsers: mapIdList(values.designatedUsers),
      businessDocuments: mapIdList(values.businessDocuments),
      universallyUniqueMappings: mapIdList(values.universallyUniqueMappings),
      serviceOutlet: serviceOutlets.find(it => it.id.toString() === values.serviceOutlet.toString()),
      assetCategory: assetCategories.find(it => it.id.toString() === values.assetCategory.toString()),
      dealer: dealers.find(it => it.id.toString() === values.dealer.toString()),
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
          ...assetAccessoryEntity,
          assetWarranties: assetAccessoryEntity?.assetWarranties?.map(e => e.id.toString()),
          placeholders: assetAccessoryEntity?.placeholders?.map(e => e.id.toString()),
          paymentInvoices: assetAccessoryEntity?.paymentInvoices?.map(e => e.id.toString()),
          serviceOutlet: assetAccessoryEntity?.serviceOutlet?.id,
          settlements: assetAccessoryEntity?.settlements?.map(e => e.id.toString()),
          assetCategory: assetAccessoryEntity?.assetCategory?.id,
          purchaseOrders: assetAccessoryEntity?.purchaseOrders?.map(e => e.id.toString()),
          deliveryNotes: assetAccessoryEntity?.deliveryNotes?.map(e => e.id.toString()),
          jobSheets: assetAccessoryEntity?.jobSheets?.map(e => e.id.toString()),
          dealer: assetAccessoryEntity?.dealer?.id,
          designatedUsers: assetAccessoryEntity?.designatedUsers?.map(e => e.id.toString()),
          businessDocuments: assetAccessoryEntity?.businessDocuments?.map(e => e.id.toString()),
          universallyUniqueMappings: assetAccessoryEntity?.universallyUniqueMappings?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsAssetAccessory.home.createOrEditLabel" data-cy="AssetAccessoryCreateUpdateHeading">
            Create or edit a Asset Accessory
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
                <ValidatedField name="id" required readOnly id="asset-accessory-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Asset Tag" id="asset-accessory-assetTag" name="assetTag" data-cy="assetTag" type="text" />
              <ValidatedField
                label="Asset Details"
                id="asset-accessory-assetDetails"
                name="assetDetails"
                data-cy="assetDetails"
                type="text"
              />
              <ValidatedBlobField
                label="Comments"
                id="asset-accessory-comments"
                name="comments"
                data-cy="comments"
                openActionLabel="Open"
              />
              <ValidatedField label="Model Number" id="asset-accessory-modelNumber" name="modelNumber" data-cy="modelNumber" type="text" />
              <ValidatedField
                label="Serial Number"
                id="asset-accessory-serialNumber"
                name="serialNumber"
                data-cy="serialNumber"
                type="text"
              />
              <ValidatedField
                label="Asset Warranty"
                id="asset-accessory-assetWarranty"
                data-cy="assetWarranty"
                type="select"
                multiple
                name="assetWarranties"
              >
                <option value="" key="0" />
                {assetWarranties
                  ? assetWarranties.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.description}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="asset-accessory-placeholder"
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
                label="Payment Invoices"
                id="asset-accessory-paymentInvoices"
                data-cy="paymentInvoices"
                type="select"
                multiple
                name="paymentInvoices"
              >
                <option value="" key="0" />
                {paymentInvoices
                  ? paymentInvoices.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.invoiceNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="asset-accessory-serviceOutlet"
                name="serviceOutlet"
                data-cy="serviceOutlet"
                label="Service Outlet"
                type="select"
                required
              >
                <option value="" key="0" />
                {serviceOutlets
                  ? serviceOutlets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.outletCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="Settlement"
                id="asset-accessory-settlement"
                data-cy="settlement"
                type="select"
                multiple
                name="settlements"
              >
                <option value="" key="0" />
                {settlements
                  ? settlements.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.paymentNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="asset-accessory-assetCategory"
                name="assetCategory"
                data-cy="assetCategory"
                label="Asset Category"
                type="select"
                required
              >
                <option value="" key="0" />
                {assetCategories
                  ? assetCategories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.assetCategoryName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="Purchase Order"
                id="asset-accessory-purchaseOrder"
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
                label="Delivery Note"
                id="asset-accessory-deliveryNote"
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
              <ValidatedField label="Job Sheet" id="asset-accessory-jobSheet" data-cy="jobSheet" type="select" multiple name="jobSheets">
                <option value="" key="0" />
                {jobSheets
                  ? jobSheets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.serialNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="asset-accessory-dealer" name="dealer" data-cy="dealer" label="Dealer" type="select" required>
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
                label="Designated Users"
                id="asset-accessory-designatedUsers"
                data-cy="designatedUsers"
                type="select"
                multiple
                name="designatedUsers"
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
                label="Business Document"
                id="asset-accessory-businessDocument"
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
              <ValidatedField
                label="Universally Unique Mapping"
                id="asset-accessory-universallyUniqueMapping"
                data-cy="universallyUniqueMapping"
                type="select"
                multiple
                name="universallyUniqueMappings"
              >
                <option value="" key="0" />
                {universallyUniqueMappings
                  ? universallyUniqueMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.universalKey}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/asset-accessory" replace color="info">
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

export default AssetAccessoryUpdate;
