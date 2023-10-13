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
import { IFixedAssetNetBookValue } from 'app/shared/model/assets/fixed-asset-net-book-value.model';
import { DepreciationRegime } from 'app/shared/model/enumerations/depreciation-regime.model';
import { getEntity, updateEntity, createEntity, reset } from './fixed-asset-net-book-value.reducer';

export const FixedAssetNetBookValueUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const fixedAssetNetBookValueEntity = useAppSelector(state => state.fixedAssetNetBookValue.entity);
  const loading = useAppSelector(state => state.fixedAssetNetBookValue.loading);
  const updating = useAppSelector(state => state.fixedAssetNetBookValue.updating);
  const updateSuccess = useAppSelector(state => state.fixedAssetNetBookValue.updateSuccess);
  const depreciationRegimeValues = Object.keys(DepreciationRegime);

  const handleClose = () => {
    navigate('/fixed-asset-net-book-value' + location.search);
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
      ...fixedAssetNetBookValueEntity,
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
          depreciationRegime: 'STRAIGHT_LINE_BASIS',
          ...fixedAssetNetBookValueEntity,
          placeholders: fixedAssetNetBookValueEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsFixedAssetNetBookValue.home.createOrEditLabel" data-cy="FixedAssetNetBookValueCreateUpdateHeading">
            Create or edit a Fixed Asset Net Book Value
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
                <ValidatedField name="id" required readOnly id="fixed-asset-net-book-value-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Asset Number"
                id="fixed-asset-net-book-value-assetNumber"
                name="assetNumber"
                data-cy="assetNumber"
                type="text"
              />
              <ValidatedField
                label="Service Outlet Code"
                id="fixed-asset-net-book-value-serviceOutletCode"
                name="serviceOutletCode"
                data-cy="serviceOutletCode"
                type="text"
              />
              <ValidatedField label="Asset Tag" id="fixed-asset-net-book-value-assetTag" name="assetTag" data-cy="assetTag" type="text" />
              <ValidatedField
                label="Asset Description"
                id="fixed-asset-net-book-value-assetDescription"
                name="assetDescription"
                data-cy="assetDescription"
                type="text"
              />
              <ValidatedField
                label="Net Book Value Date"
                id="fixed-asset-net-book-value-netBookValueDate"
                name="netBookValueDate"
                data-cy="netBookValueDate"
                type="date"
              />
              <ValidatedField
                label="Asset Category"
                id="fixed-asset-net-book-value-assetCategory"
                name="assetCategory"
                data-cy="assetCategory"
                type="text"
              />
              <ValidatedField
                label="Net Book Value"
                id="fixed-asset-net-book-value-netBookValue"
                name="netBookValue"
                data-cy="netBookValue"
                type="text"
              />
              <ValidatedField
                label="Depreciation Regime"
                id="fixed-asset-net-book-value-depreciationRegime"
                name="depreciationRegime"
                data-cy="depreciationRegime"
                type="select"
              >
                {depreciationRegimeValues.map(depreciationRegime => (
                  <option value={depreciationRegime} key={depreciationRegime}>
                    {depreciationRegime}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="File Upload Token"
                id="fixed-asset-net-book-value-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="fixed-asset-net-book-value-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField
                label="Placeholder"
                id="fixed-asset-net-book-value-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fixed-asset-net-book-value" replace color="info">
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

export default FixedAssetNetBookValueUpdate;
