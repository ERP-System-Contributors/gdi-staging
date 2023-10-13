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
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/people/application-user/application-user.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IPaymentInvoice } from 'app/shared/model/settlement/payment-invoice.model';
import { getEntities as getPaymentInvoices } from 'app/entities/settlement/payment-invoice/payment-invoice.reducer';
import { IDeliveryNote } from 'app/shared/model/settlement/delivery-note.model';
import { getEntities as getDeliveryNotes } from 'app/entities/settlement/delivery-note/delivery-note.reducer';
import { IJobSheet } from 'app/shared/model/settlement/job-sheet.model';
import { getEntities as getJobSheets } from 'app/entities/settlement/job-sheet/job-sheet.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { ISettlement } from 'app/shared/model/settlement/settlement.model';
import { getEntities as getSettlements } from 'app/entities/settlement/settlement/settlement.reducer';
import { ISettlementRequisition } from 'app/shared/model/settlement/settlement-requisition.model';
import { PaymentStatus } from 'app/shared/model/enumerations/payment-status.model';
import { getEntity, updateEntity, createEntity, reset } from './settlement-requisition.reducer';

export const SettlementRequisitionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const paymentInvoices = useAppSelector(state => state.paymentInvoice.entities);
  const deliveryNotes = useAppSelector(state => state.deliveryNote.entities);
  const jobSheets = useAppSelector(state => state.jobSheet.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const settlements = useAppSelector(state => state.settlement.entities);
  const settlementRequisitionEntity = useAppSelector(state => state.settlementRequisition.entity);
  const loading = useAppSelector(state => state.settlementRequisition.loading);
  const updating = useAppSelector(state => state.settlementRequisition.updating);
  const updateSuccess = useAppSelector(state => state.settlementRequisition.updateSuccess);
  const paymentStatusValues = Object.keys(PaymentStatus);

  const handleClose = () => {
    navigate('/settlement-requisition' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSettlementCurrencies({}));
    dispatch(getApplicationUsers({}));
    dispatch(getDealers({}));
    dispatch(getPaymentInvoices({}));
    dispatch(getDeliveryNotes({}));
    dispatch(getJobSheets({}));
    dispatch(getBusinessDocuments({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getPlaceholders({}));
    dispatch(getSettlements({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.timeOfRequisition = convertDateTimeToServer(values.timeOfRequisition);

    const entity = {
      ...settlementRequisitionEntity,
      ...values,
      signatures: mapIdList(values.signatures),
      paymentInvoices: mapIdList(values.paymentInvoices),
      deliveryNotes: mapIdList(values.deliveryNotes),
      jobSheets: mapIdList(values.jobSheets),
      businessDocuments: mapIdList(values.businessDocuments),
      applicationMappings: mapIdList(values.applicationMappings),
      placeholders: mapIdList(values.placeholders),
      settlements: mapIdList(values.settlements),
      settlementCurrency: settlementCurrencies.find(it => it.id.toString() === values.settlementCurrency.toString()),
      currentOwner: applicationUsers.find(it => it.id.toString() === values.currentOwner.toString()),
      nativeOwner: applicationUsers.find(it => it.id.toString() === values.nativeOwner.toString()),
      nativeDepartment: dealers.find(it => it.id.toString() === values.nativeDepartment.toString()),
      biller: dealers.find(it => it.id.toString() === values.biller.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          timeOfRequisition: displayDefaultDateTime(),
        }
      : {
          paymentStatus: 'PROCESSED',
          ...settlementRequisitionEntity,
          timeOfRequisition: convertDateTimeFromServer(settlementRequisitionEntity.timeOfRequisition),
          settlementCurrency: settlementRequisitionEntity?.settlementCurrency?.id,
          currentOwner: settlementRequisitionEntity?.currentOwner?.id,
          nativeOwner: settlementRequisitionEntity?.nativeOwner?.id,
          nativeDepartment: settlementRequisitionEntity?.nativeDepartment?.id,
          biller: settlementRequisitionEntity?.biller?.id,
          paymentInvoices: settlementRequisitionEntity?.paymentInvoices?.map(e => e.id.toString()),
          deliveryNotes: settlementRequisitionEntity?.deliveryNotes?.map(e => e.id.toString()),
          jobSheets: settlementRequisitionEntity?.jobSheets?.map(e => e.id.toString()),
          signatures: settlementRequisitionEntity?.signatures?.map(e => e.id.toString()),
          businessDocuments: settlementRequisitionEntity?.businessDocuments?.map(e => e.id.toString()),
          applicationMappings: settlementRequisitionEntity?.applicationMappings?.map(e => e.id.toString()),
          placeholders: settlementRequisitionEntity?.placeholders?.map(e => e.id.toString()),
          settlements: settlementRequisitionEntity?.settlements?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementSettlementRequisition.home.createOrEditLabel" data-cy="SettlementRequisitionCreateUpdateHeading">
            Create or edit a Settlement Requisition
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
                <ValidatedField name="id" required readOnly id="settlement-requisition-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Description"
                id="settlement-requisition-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label="Serial Number"
                id="settlement-requisition-serialNumber"
                name="serialNumber"
                data-cy="serialNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Time Of Requisition"
                id="settlement-requisition-timeOfRequisition"
                name="timeOfRequisition"
                data-cy="timeOfRequisition"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Requisition Number"
                id="settlement-requisition-requisitionNumber"
                name="requisitionNumber"
                data-cy="requisitionNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Payment Amount"
                id="settlement-requisition-paymentAmount"
                name="paymentAmount"
                data-cy="paymentAmount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Payment Status"
                id="settlement-requisition-paymentStatus"
                name="paymentStatus"
                data-cy="paymentStatus"
                type="select"
              >
                {paymentStatusValues.map(paymentStatus => (
                  <option value={paymentStatus} key={paymentStatus}>
                    {paymentStatus}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="settlement-requisition-settlementCurrency"
                name="settlementCurrency"
                data-cy="settlementCurrency"
                label="Settlement Currency"
                type="select"
                required
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
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="settlement-requisition-currentOwner"
                name="currentOwner"
                data-cy="currentOwner"
                label="Current Owner"
                type="select"
                required
              >
                <option value="" key="0" />
                {applicationUsers
                  ? applicationUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.applicationIdentity}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="settlement-requisition-nativeOwner"
                name="nativeOwner"
                data-cy="nativeOwner"
                label="Native Owner"
                type="select"
                required
              >
                <option value="" key="0" />
                {applicationUsers
                  ? applicationUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.applicationIdentity}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="settlement-requisition-nativeDepartment"
                name="nativeDepartment"
                data-cy="nativeDepartment"
                label="Native Department"
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
              <ValidatedField id="settlement-requisition-biller" name="biller" data-cy="biller" label="Biller" type="select" required>
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
                label="Payment Invoice"
                id="settlement-requisition-paymentInvoice"
                data-cy="paymentInvoice"
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
                label="Delivery Note"
                id="settlement-requisition-deliveryNote"
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
              <ValidatedField
                label="Job Sheet"
                id="settlement-requisition-jobSheet"
                data-cy="jobSheet"
                type="select"
                multiple
                name="jobSheets"
              >
                <option value="" key="0" />
                {jobSheets
                  ? jobSheets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.serialNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Signatures"
                id="settlement-requisition-signatures"
                data-cy="signatures"
                type="select"
                multiple
                name="signatures"
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
                id="settlement-requisition-businessDocument"
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
                label="Application Mapping"
                id="settlement-requisition-applicationMapping"
                data-cy="applicationMapping"
                type="select"
                multiple
                name="applicationMappings"
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
                label="Placeholder"
                id="settlement-requisition-placeholder"
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
                label="Settlement"
                id="settlement-requisition-settlement"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/settlement-requisition" replace color="info">
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

export default SettlementRequisitionUpdate;
