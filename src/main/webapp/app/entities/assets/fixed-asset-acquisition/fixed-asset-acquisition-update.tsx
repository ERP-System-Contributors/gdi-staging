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
import { IFixedAssetAcquisition } from 'app/shared/model/assets/fixed-asset-acquisition.model';
import { getEntity, updateEntity, createEntity, reset } from './fixed-asset-acquisition.reducer';

export const FixedAssetAcquisitionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const fixedAssetAcquisitionEntity = useAppSelector(state => state.fixedAssetAcquisition.entity);
  const loading = useAppSelector(state => state.fixedAssetAcquisition.loading);
  const updating = useAppSelector(state => state.fixedAssetAcquisition.updating);
  const updateSuccess = useAppSelector(state => state.fixedAssetAcquisition.updateSuccess);

  const handleClose = () => {
    navigate('/fixed-asset-acquisition' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...fixedAssetAcquisitionEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
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
          ...fixedAssetAcquisitionEntity,
          placeholders: fixedAssetAcquisitionEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsFixedAssetAcquisition.home.createOrEditLabel" data-cy="FixedAssetAcquisitionCreateUpdateHeading">
            Create or edit a Fixed Asset Acquisition
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
                <ValidatedField name="id" required readOnly id="fixed-asset-acquisition-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Asset Number"
                id="fixed-asset-acquisition-assetNumber"
                name="assetNumber"
                data-cy="assetNumber"
                type="text"
                validate={{
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Service Outlet Code"
                id="fixed-asset-acquisition-serviceOutletCode"
                name="serviceOutletCode"
                data-cy="serviceOutletCode"
                type="text"
              />
              <ValidatedField label="Asset Tag" id="fixed-asset-acquisition-assetTag" name="assetTag" data-cy="assetTag" type="text" />
              <ValidatedField
                label="Asset Description"
                id="fixed-asset-acquisition-assetDescription"
                name="assetDescription"
                data-cy="assetDescription"
                type="text"
              />
              <ValidatedField
                label="Purchase Date"
                id="fixed-asset-acquisition-purchaseDate"
                name="purchaseDate"
                data-cy="purchaseDate"
                type="date"
              />
              <ValidatedField
                label="Asset Category"
                id="fixed-asset-acquisition-assetCategory"
                name="assetCategory"
                data-cy="assetCategory"
                type="text"
              />
              <ValidatedField
                label="Purchase Price"
                id="fixed-asset-acquisition-purchasePrice"
                name="purchasePrice"
                data-cy="purchasePrice"
                type="text"
              />
              <ValidatedField
                label="File Upload Token"
                id="fixed-asset-acquisition-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Placeholder"
                id="fixed-asset-acquisition-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fixed-asset-acquisition" replace color="info">
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

export default FixedAssetAcquisitionUpdate;
