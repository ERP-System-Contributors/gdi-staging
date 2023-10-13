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
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntity, updateEntity, createEntity, reset } from './dealer.reducer';

export const DealerUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const paymentLabels = useAppSelector(state => state.paymentLabel.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const dealerEntity = useAppSelector(state => state.dealer.entity);
  const loading = useAppSelector(state => state.dealer.loading);
  const updating = useAppSelector(state => state.dealer.updating);
  const updateSuccess = useAppSelector(state => state.dealer.updateSuccess);

  const handleClose = () => {
    navigate('/dealer' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPaymentLabels({}));
    dispatch(getDealers({}));
    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...dealerEntity,
      ...values,
      paymentLabels: mapIdList(values.paymentLabels),
      placeholders: mapIdList(values.placeholders),
      dealerGroup: dealers.find(it => it.id.toString() === values.dealerGroup.toString()),
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
          ...dealerEntity,
          paymentLabels: dealerEntity?.paymentLabels?.map(e => e.id.toString()),
          dealerGroup: dealerEntity?.dealerGroup?.id,
          placeholders: dealerEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.peopleDealer.home.createOrEditLabel" data-cy="DealerCreateUpdateHeading">
            Create or edit a Dealer
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="dealer-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Dealer Name"
                id="dealer-dealerName"
                name="dealerName"
                data-cy="dealerName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Tax Number" id="dealer-taxNumber" name="taxNumber" data-cy="taxNumber" type="text" />
              <ValidatedField
                label="Identification Document Number"
                id="dealer-identificationDocumentNumber"
                name="identificationDocumentNumber"
                data-cy="identificationDocumentNumber"
                type="text"
              />
              <ValidatedField
                label="Organization Name"
                id="dealer-organizationName"
                name="organizationName"
                data-cy="organizationName"
                type="text"
              />
              <ValidatedField label="Department" id="dealer-department" name="department" data-cy="department" type="text" />
              <ValidatedField label="Position" id="dealer-position" name="position" data-cy="position" type="text" />
              <ValidatedField label="Postal Address" id="dealer-postalAddress" name="postalAddress" data-cy="postalAddress" type="text" />
              <ValidatedField
                label="Physical Address"
                id="dealer-physicalAddress"
                name="physicalAddress"
                data-cy="physicalAddress"
                type="text"
              />
              <ValidatedField label="Account Name" id="dealer-accountName" name="accountName" data-cy="accountName" type="text" />
              <ValidatedField label="Account Number" id="dealer-accountNumber" name="accountNumber" data-cy="accountNumber" type="text" />
              <ValidatedField label="Bankers Name" id="dealer-bankersName" name="bankersName" data-cy="bankersName" type="text" />
              <ValidatedField label="Bankers Branch" id="dealer-bankersBranch" name="bankersBranch" data-cy="bankersBranch" type="text" />
              <ValidatedField
                label="Bankers Swift Code"
                id="dealer-bankersSwiftCode"
                name="bankersSwiftCode"
                data-cy="bankersSwiftCode"
                type="text"
              />
              <ValidatedField
                label="File Upload Token"
                id="dealer-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="dealer-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField label="Remarks" id="dealer-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField label="Other Names" id="dealer-otherNames" name="otherNames" data-cy="otherNames" type="text" />
              <ValidatedField
                label="Payment Label"
                id="dealer-paymentLabel"
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
              <ValidatedField id="dealer-dealerGroup" name="dealerGroup" data-cy="dealerGroup" label="Dealer Group" type="select">
                <option value="" key="0" />
                {dealers
                  ? dealers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.dealerName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField label="Placeholder" id="dealer-placeholder" data-cy="placeholder" type="select" multiple name="placeholders">
                <option value="" key="0" />
                {placeholders
                  ? placeholders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/dealer" replace color="info">
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

export default DealerUpdate;
