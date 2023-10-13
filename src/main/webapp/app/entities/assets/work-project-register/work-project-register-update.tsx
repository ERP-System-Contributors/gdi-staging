import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { getEntities as getSettlementCurrencies } from 'app/entities/gdi/settlement-currency/settlement-currency.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IWorkProjectRegister } from 'app/shared/model/assets/work-project-register.model';
import { getEntity, updateEntity, createEntity, reset } from './work-project-register.reducer';

export const WorkProjectRegisterUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const dealers = useAppSelector(state => state.dealer.entities);
  const settlementCurrencies = useAppSelector(state => state.settlementCurrency.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const workProjectRegisterEntity = useAppSelector(state => state.workProjectRegister.entity);
  const loading = useAppSelector(state => state.workProjectRegister.loading);
  const updating = useAppSelector(state => state.workProjectRegister.updating);
  const updateSuccess = useAppSelector(state => state.workProjectRegister.updateSuccess);

  const handleClose = () => {
    navigate('/work-project-register' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDealers({}));
    dispatch(getSettlementCurrencies({}));
    dispatch(getPlaceholders({}));
    dispatch(getBusinessDocuments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...workProjectRegisterEntity,
      ...values,
      dealers: mapIdList(values.dealers),
      placeholders: mapIdList(values.placeholders),
      businessDocuments: mapIdList(values.businessDocuments),
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
          ...workProjectRegisterEntity,
          dealers: workProjectRegisterEntity?.dealers?.map(e => e.id.toString()),
          settlementCurrency: workProjectRegisterEntity?.settlementCurrency?.id,
          placeholders: workProjectRegisterEntity?.placeholders?.map(e => e.id.toString()),
          businessDocuments: workProjectRegisterEntity?.businessDocuments?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsWorkProjectRegister.home.createOrEditLabel" data-cy="WorkProjectRegisterCreateUpdateHeading">
            Create or edit a Work Project Register
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
                <ValidatedField name="id" required readOnly id="work-project-register-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Catalogue Number"
                id="work-project-register-catalogueNumber"
                name="catalogueNumber"
                data-cy="catalogueNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Description"
                id="work-project-register-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedBlobField
                label="Details"
                id="work-project-register-details"
                name="details"
                data-cy="details"
                openActionLabel="Open"
              />
              <ValidatedField
                label="Total Project Cost"
                id="work-project-register-totalProjectCost"
                name="totalProjectCost"
                data-cy="totalProjectCost"
                type="text"
              />
              <ValidatedBlobField
                label="Additional Notes"
                id="work-project-register-additionalNotes"
                name="additionalNotes"
                data-cy="additionalNotes"
                openActionLabel="Open"
              />
              <ValidatedField label="Dealers" id="work-project-register-dealers" data-cy="dealers" type="select" multiple name="dealers">
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
                id="work-project-register-settlementCurrency"
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
                id="work-project-register-placeholder"
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
                label="Business Document"
                id="work-project-register-businessDocument"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/work-project-register" replace color="info">
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

export default WorkProjectRegisterUpdate;
