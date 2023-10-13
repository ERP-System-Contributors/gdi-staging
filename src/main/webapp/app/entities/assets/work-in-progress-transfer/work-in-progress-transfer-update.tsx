import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IWorkInProgressRegistration } from 'app/shared/model/assets/work-in-progress-registration.model';
import { getEntities as getWorkInProgressRegistrations } from 'app/entities/assets/work-in-progress-registration/work-in-progress-registration.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IWorkInProgressTransfer } from 'app/shared/model/assets/work-in-progress-transfer.model';
import { getEntity, updateEntity, createEntity, reset } from './work-in-progress-transfer.reducer';

export const WorkInProgressTransferUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const workInProgressRegistrations = useAppSelector(state => state.workInProgressRegistration.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const workInProgressTransferEntity = useAppSelector(state => state.workInProgressTransfer.entity);
  const loading = useAppSelector(state => state.workInProgressTransfer.loading);
  const updating = useAppSelector(state => state.workInProgressTransfer.updating);
  const updateSuccess = useAppSelector(state => state.workInProgressTransfer.updateSuccess);

  const handleClose = () => {
    navigate('/work-in-progress-transfer' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getWorkInProgressRegistrations({}));
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
      ...workInProgressTransferEntity,
      ...values,
      workInProgressRegistrations: mapIdList(values.workInProgressRegistrations),
      placeholders: mapIdList(values.placeholders),
      businessDocuments: mapIdList(values.businessDocuments),
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
          ...workInProgressTransferEntity,
          workInProgressRegistrations: workInProgressTransferEntity?.workInProgressRegistrations?.map(e => e.id.toString()),
          placeholders: workInProgressTransferEntity?.placeholders?.map(e => e.id.toString()),
          businessDocuments: workInProgressTransferEntity?.businessDocuments?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsWorkInProgressTransfer.home.createOrEditLabel" data-cy="WorkInProgressTransferCreateUpdateHeading">
            Create or edit a Work In Progress Transfer
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
                <ValidatedField name="id" required readOnly id="work-in-progress-transfer-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Description"
                id="work-in-progress-transfer-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label="Target Asset Number"
                id="work-in-progress-transfer-targetAssetNumber"
                name="targetAssetNumber"
                data-cy="targetAssetNumber"
                type="text"
              />
              <ValidatedField
                label="Work In Progress Registration"
                id="work-in-progress-transfer-workInProgressRegistration"
                data-cy="workInProgressRegistration"
                type="select"
                multiple
                name="workInProgressRegistrations"
              >
                <option value="" key="0" />
                {workInProgressRegistrations
                  ? workInProgressRegistrations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="work-in-progress-transfer-placeholder"
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
                id="work-in-progress-transfer-businessDocument"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/work-in-progress-transfer" replace color="info">
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

export default WorkInProgressTransferUpdate;
