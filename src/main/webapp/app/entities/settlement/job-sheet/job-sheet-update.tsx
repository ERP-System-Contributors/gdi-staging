import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IBusinessStamp } from 'app/shared/model/settlement/business-stamp.model';
import { getEntities as getBusinessStamps } from 'app/entities/settlement/business-stamp/business-stamp.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { getEntities as getPaymentLabels } from 'app/entities/settlement/payment-label/payment-label.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IJobSheet } from 'app/shared/model/settlement/job-sheet.model';
import { getEntity, updateEntity, createEntity, reset } from './job-sheet.reducer';

export const JobSheetUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const dealers = useAppSelector(state => state.dealer.entities);
  const businessStamps = useAppSelector(state => state.businessStamp.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const jobSheetEntity = useAppSelector(state => state.jobSheet.entity);
  const loading = useAppSelector(state => state.jobSheet.loading);
  const updating = useAppSelector(state => state.jobSheet.updating);
  const updateSuccess = useAppSelector(state => state.jobSheet.updateSuccess);

  const handleClose = () => {
    navigate('/job-sheet' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDealers({}));
    dispatch(getBusinessStamps({}));
    dispatch(getPlaceholders({}));
    dispatch(getPaymentLabels({}));
    dispatch(getBusinessDocuments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...jobSheetEntity,
      ...values,
      signatories: mapIdList(values.signatories),
      businessStamps: mapIdList(values.businessStamps),
      placeholders: mapIdList(values.placeholders),
      paymentLabels: mapIdList(values.paymentLabels),
      businessDocuments: mapIdList(values.businessDocuments),
      biller: dealers.find(it => it.id.toString() === values.biller.toString()),
      contactPerson: dealers.find(it => it.id.toString() === values.contactPerson.toString()),
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
          ...jobSheetEntity,
          biller: jobSheetEntity?.biller?.id,
          signatories: jobSheetEntity?.signatories?.map(e => e.id.toString()),
          contactPerson: jobSheetEntity?.contactPerson?.id,
          businessStamps: jobSheetEntity?.businessStamps?.map(e => e.id.toString()),
          placeholders: jobSheetEntity?.placeholders?.map(e => e.id.toString()),
          paymentLabels: jobSheetEntity?.paymentLabels?.map(e => e.id.toString()),
          businessDocuments: jobSheetEntity?.businessDocuments?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementJobSheet.home.createOrEditLabel" data-cy="JobSheetCreateUpdateHeading">
            Create or edit a Job Sheet
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="job-sheet-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Serial Number"
                id="job-sheet-serialNumber"
                name="serialNumber"
                data-cy="serialNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Job Sheet Date" id="job-sheet-jobSheetDate" name="jobSheetDate" data-cy="jobSheetDate" type="date" />
              <ValidatedField label="Details" id="job-sheet-details" name="details" data-cy="details" type="text" />
              <ValidatedField label="Remarks" id="job-sheet-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField id="job-sheet-biller" name="biller" data-cy="biller" label="Biller" type="select" required>
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
                id="job-sheet-signatories"
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
                id="job-sheet-contactPerson"
                name="contactPerson"
                data-cy="contactPerson"
                label="Contact Person"
                type="select"
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
                label="Business Stamps"
                id="job-sheet-businessStamps"
                data-cy="businessStamps"
                type="select"
                multiple
                name="businessStamps"
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
                label="Placeholder"
                id="job-sheet-placeholder"
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
                label="Payment Label"
                id="job-sheet-paymentLabel"
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
                label="Business Document"
                id="job-sheet-businessDocument"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/job-sheet" replace color="info">
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

export default JobSheetUpdate;
