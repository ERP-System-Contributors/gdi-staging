import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IGdiMasterDataIndex } from 'app/shared/model/gdi/gdi-master-data-index.model';
import { getEntities as getGdiMasterDataIndices } from '../gdi-master-data-index/gdi-master-data-index.reducer';
import { IBusinessTeam } from 'app/shared/model/people/business-team.model';
import { getEntities as getBusinessTeams } from '../business-team/business-team.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from '../business-document/business-document.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from '../placeholder/placeholder.reducer';
import { IGdiTransactionDataIndex } from 'app/shared/model/gdi/gdi-transaction-data-index.model';
import { UpdateFrequencyTypes } from 'app/shared/model/enumerations/update-frequency-types.model';
import { DatasetBehaviorTypes } from 'app/shared/model/enumerations/dataset-behavior-types.model';
import { getEntity, updateEntity, createEntity, reset } from './gdi-transaction-data-index.reducer';

export const GdiTransactionDataIndexUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const gdiMasterDataIndices = useAppSelector(state => state.gdiMasterDataIndex.entities);
  const businessTeams = useAppSelector(state => state.businessTeam.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const gdiTransactionDataIndexEntity = useAppSelector(state => state.gdiTransactionDataIndex.entity);
  const loading = useAppSelector(state => state.gdiTransactionDataIndex.loading);
  const updating = useAppSelector(state => state.gdiTransactionDataIndex.updating);
  const updateSuccess = useAppSelector(state => state.gdiTransactionDataIndex.updateSuccess);
  const updateFrequencyTypesValues = Object.keys(UpdateFrequencyTypes);
  const datasetBehaviorTypesValues = Object.keys(DatasetBehaviorTypes);

  const handleClose = () => {
    navigate('/gdi-transaction-data-index' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getGdiMasterDataIndices({}));
    dispatch(getBusinessTeams({}));
    dispatch(getBusinessDocuments({}));
    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...gdiTransactionDataIndexEntity,
      ...values,
      masterDataItems: mapIdList(values.masterDataItems),
      placeholders: mapIdList(values.placeholders),
      businessTeam: businessTeams.find(it => it.id.toString() === values.businessTeam.toString()),
      dataSetTemplate: businessDocuments.find(it => it.id.toString() === values.dataSetTemplate.toString()),
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
          updateFrequency: 'DAILY',
          datasetBehavior: 'INSERT_AND_UPDATE',
          ...gdiTransactionDataIndexEntity,
          masterDataItems: gdiTransactionDataIndexEntity?.masterDataItems?.map(e => e.id.toString()),
          businessTeam: gdiTransactionDataIndexEntity?.businessTeam?.id,
          dataSetTemplate: gdiTransactionDataIndexEntity?.dataSetTemplate?.id,
          placeholders: gdiTransactionDataIndexEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiGdiTransactionDataIndex.home.createOrEditLabel" data-cy="GdiTransactionDataIndexCreateUpdateHeading">
            Create or edit a Gdi Transaction Data Index
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
                <ValidatedField name="id" required readOnly id="gdi-transaction-data-index-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Dataset Name"
                id="gdi-transaction-data-index-datasetName"
                name="datasetName"
                data-cy="datasetName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Database Name"
                id="gdi-transaction-data-index-databaseName"
                name="databaseName"
                data-cy="databaseName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Update Frequency"
                id="gdi-transaction-data-index-updateFrequency"
                name="updateFrequency"
                data-cy="updateFrequency"
                type="select"
              >
                {updateFrequencyTypesValues.map(updateFrequencyTypes => (
                  <option value={updateFrequencyTypes} key={updateFrequencyTypes}>
                    {updateFrequencyTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Dataset Behavior"
                id="gdi-transaction-data-index-datasetBehavior"
                name="datasetBehavior"
                data-cy="datasetBehavior"
                type="select"
              >
                {datasetBehaviorTypesValues.map(datasetBehaviorTypes => (
                  <option value={datasetBehaviorTypes} key={datasetBehaviorTypes}>
                    {datasetBehaviorTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Minimum Data Rows Per Request"
                id="gdi-transaction-data-index-minimumDataRowsPerRequest"
                name="minimumDataRowsPerRequest"
                data-cy="minimumDataRowsPerRequest"
                type="text"
              />
              <ValidatedField
                label="Maximum Data Rows Per Request"
                id="gdi-transaction-data-index-maximumDataRowsPerRequest"
                name="maximumDataRowsPerRequest"
                data-cy="maximumDataRowsPerRequest"
                type="text"
              />
              <ValidatedField
                label="Dataset Description"
                id="gdi-transaction-data-index-datasetDescription"
                name="datasetDescription"
                data-cy="datasetDescription"
                type="textarea"
              />
              <ValidatedField label="Data Path" id="gdi-transaction-data-index-dataPath" name="dataPath" data-cy="dataPath" type="text" />
              <ValidatedField
                label="Master Data Item"
                id="gdi-transaction-data-index-masterDataItem"
                data-cy="masterDataItem"
                type="select"
                multiple
                name="masterDataItems"
              >
                <option value="" key="0" />
                {gdiMasterDataIndices
                  ? gdiMasterDataIndices.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.entityName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="gdi-transaction-data-index-businessTeam"
                name="businessTeam"
                data-cy="businessTeam"
                label="Business Team"
                type="select"
              >
                <option value="" key="0" />
                {businessTeams
                  ? businessTeams.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.businessTeam}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="gdi-transaction-data-index-dataSetTemplate"
                name="dataSetTemplate"
                data-cy="dataSetTemplate"
                label="Data Set Template"
                type="select"
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
                label="Placeholder"
                id="gdi-transaction-data-index-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/gdi-transaction-data-index" replace color="info">
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

export default GdiTransactionDataIndexUpdate;
