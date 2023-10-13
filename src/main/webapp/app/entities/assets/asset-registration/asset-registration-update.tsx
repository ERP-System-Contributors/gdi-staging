import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

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
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IAssetWarranty } from 'app/shared/model/assets/asset-warranty.model';
import { getEntities as getAssetWarranties } from 'app/entities/assets/asset-warranty/asset-warranty.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IAssetAccessory } from 'app/shared/model/assets/asset-accessory.model';
import { getEntities as getAssetAccessories } from 'app/entities/assets/asset-accessory/asset-accessory.reducer';
import { IAssetRegistration } from 'app/shared/model/assets/asset-registration.model';
import { getEntity, updateEntity, createEntity, reset } from './asset-registration.reducer';

export const AssetRegistrationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const paymentInvoices = useAppSelector(state => state.paymentInvoice.entities);
  const serviceOutlets = useAppSelector(state => state.serviceOutlet.entities);
  const settlements = useAppSelector(state => state.settlement.entities);
  const assetCategories = useAppSelector(state => state.assetCategory.entities);
  const purchaseOrders = useAppSelector(state => state.purchaseOrder.entities);
  const deliveryNotes = useAppSelector(state => state.deliveryNote.entities);
  const jobSheets = useAppSelector(state => state.jobSheet.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const assetWarranties = useAppSelector(state => state.assetWarranty.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const assetAccessories = useAppSelector(state => state.assetAccessory.entities);
  const assetRegistrationEntity = useAppSelector(state => state.assetRegistration.entity);
  const loading = useAppSelector(state => state.assetRegistration.loading);
  const updating = useAppSelector(state => state.assetRegistration.updating);
  const updateSuccess = useAppSelector(state => state.assetRegistration.updateSuccess);

  const handleClose = () => {
    navigate('/asset-registration' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getPaymentInvoices({}));
    dispatch(getServiceOutlets({}));
    dispatch(getSettlements({}));
    dispatch(getAssetCategories({}));
    dispatch(getPurchaseOrders({}));
    dispatch(getDeliveryNotes({}));
    dispatch(getJobSheets({}));
    dispatch(getDealers({}));
    dispatch(getSettlementCurrencies({}));
    dispatch(getBusinessDocuments({}));
    dispatch(getAssetWarranties({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getAssetAccessories({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...assetRegistrationEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      paymentInvoices: mapIdList(values.paymentInvoices),
      serviceOutlets: mapIdList(values.serviceOutlets),
      settlements: mapIdList(values.settlements),
      purchaseOrders: mapIdList(values.purchaseOrders),
      deliveryNotes: mapIdList(values.deliveryNotes),
      jobSheets: mapIdList(values.jobSheets),
      designatedUsers: mapIdList(values.designatedUsers),
      businessDocuments: mapIdList(values.businessDocuments),
      assetWarranties: mapIdList(values.assetWarranties),
      universallyUniqueMappings: mapIdList(values.universallyUniqueMappings),
      assetAccessories: mapIdList(values.assetAccessories),
      mainServiceOutlet: serviceOutlets.find(it => it.id.toString() === values.mainServiceOutlet.toString()),
      assetCategory: assetCategories.find(it => it.id.toString() === values.assetCategory.toString()),
      dealer: dealers.find(it => it.id.toString() === values.dealer.toString()),
      settlementCurrency: settlementCurrencies.find(it => it.id.toString() === values.settlementCurrency.toString()),
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
          ...assetRegistrationEntity,
          placeholders: assetRegistrationEntity?.placeholders?.map(e => e.id.toString()),
          paymentInvoices: assetRegistrationEntity?.paymentInvoices?.map(e => e.id.toString()),
          serviceOutlets: assetRegistrationEntity?.serviceOutlets?.map(e => e.id.toString()),
          settlements: assetRegistrationEntity?.settlements?.map(e => e.id.toString()),
          assetCategory: assetRegistrationEntity?.assetCategory?.id,
          purchaseOrders: assetRegistrationEntity?.purchaseOrders?.map(e => e.id.toString()),
          deliveryNotes: assetRegistrationEntity?.deliveryNotes?.map(e => e.id.toString()),
          jobSheets: assetRegistrationEntity?.jobSheets?.map(e => e.id.toString()),
          dealer: assetRegistrationEntity?.dealer?.id,
          designatedUsers: assetRegistrationEntity?.designatedUsers?.map(e => e.id.toString()),
          settlementCurrency: assetRegistrationEntity?.settlementCurrency?.id,
          businessDocuments: assetRegistrationEntity?.businessDocuments?.map(e => e.id.toString()),
          assetWarranties: assetRegistrationEntity?.assetWarranties?.map(e => e.id.toString()),
          universallyUniqueMappings: assetRegistrationEntity?.universallyUniqueMappings?.map(e => e.id.toString()),
          assetAccessories: assetRegistrationEntity?.assetAccessories?.map(e => e.id.toString()),
          mainServiceOutlet: assetRegistrationEntity?.mainServiceOutlet?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsAssetRegistration.home.createOrEditLabel" data-cy="AssetRegistrationCreateUpdateHeading">
            Create or edit a Asset Registration
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
                <ValidatedField name="id" required readOnly id="asset-registration-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Asset Number"
                id="asset-registration-assetNumber"
                name="assetNumber"
                data-cy="assetNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Asset Tag"
                id="asset-registration-assetTag"
                name="assetTag"
                data-cy="assetTag"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Asset Details"
                id="asset-registration-assetDetails"
                name="assetDetails"
                data-cy="assetDetails"
                type="text"
              />
              <ValidatedField
                label="Asset Cost"
                id="asset-registration-assetCost"
                name="assetCost"
                data-cy="assetCost"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedBlobField
                label="Comments"
                id="asset-registration-comments"
                name="comments"
                data-cy="comments"
                openActionLabel="Open"
              />
              <ValidatedField
                label="Model Number"
                id="asset-registration-modelNumber"
                name="modelNumber"
                data-cy="modelNumber"
                type="text"
              />
              <ValidatedField
                label="Serial Number"
                id="asset-registration-serialNumber"
                name="serialNumber"
                data-cy="serialNumber"
                type="text"
              />
              <ValidatedField label="Remarks" id="asset-registration-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField
                label="Capitalization Date"
                id="asset-registration-capitalizationDate"
                name="capitalizationDate"
                data-cy="capitalizationDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Placeholder"
                id="asset-registration-placeholder"
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
                id="asset-registration-paymentInvoices"
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
                label="Service Outlet"
                id="asset-registration-serviceOutlet"
                data-cy="serviceOutlet"
                type="select"
                multiple
                name="serviceOutlets"
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
              <ValidatedField
                label="Settlement"
                id="asset-registration-settlement"
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
                id="asset-registration-assetCategory"
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
                id="asset-registration-purchaseOrder"
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
                id="asset-registration-deliveryNote"
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
              <ValidatedField label="Job Sheet" id="asset-registration-jobSheet" data-cy="jobSheet" type="select" multiple name="jobSheets">
                <option value="" key="0" />
                {jobSheets
                  ? jobSheets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.serialNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="asset-registration-dealer" name="dealer" data-cy="dealer" label="Dealer" type="select" required>
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
                id="asset-registration-designatedUsers"
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
                id="asset-registration-settlementCurrency"
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
                label="Business Document"
                id="asset-registration-businessDocument"
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
                label="Asset Warranty"
                id="asset-registration-assetWarranty"
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
                label="Universally Unique Mapping"
                id="asset-registration-universallyUniqueMapping"
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
              <ValidatedField
                label="Asset Accessory"
                id="asset-registration-assetAccessory"
                data-cy="assetAccessory"
                type="select"
                multiple
                name="assetAccessories"
              >
                <option value="" key="0" />
                {assetAccessories
                  ? assetAccessories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.assetDetails}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="asset-registration-mainServiceOutlet"
                name="mainServiceOutlet"
                data-cy="mainServiceOutlet"
                label="Main Service Outlet"
                type="select"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/asset-registration" replace color="info">
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

export default AssetRegistrationUpdate;
