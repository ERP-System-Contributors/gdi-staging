import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDepreciationMethod } from 'app/shared/model/assets/depreciation-method.model';
import { getEntities as getDepreciationMethods } from 'app/entities/assets/depreciation-method/depreciation-method.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IAssetCategory } from 'app/shared/model/assets/asset-category.model';
import { getEntity, updateEntity, createEntity, reset } from './asset-category.reducer';

export const AssetCategoryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const depreciationMethods = useAppSelector(state => state.depreciationMethod.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const assetCategoryEntity = useAppSelector(state => state.assetCategory.entity);
  const loading = useAppSelector(state => state.assetCategory.loading);
  const updating = useAppSelector(state => state.assetCategory.updating);
  const updateSuccess = useAppSelector(state => state.assetCategory.updateSuccess);

  const handleClose = () => {
    navigate('/asset-category');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getDepreciationMethods({}));
    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...assetCategoryEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      depreciationMethod: depreciationMethods.find(it => it.id.toString() === values.depreciationMethod.toString()),
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
          ...assetCategoryEntity,
          depreciationMethod: assetCategoryEntity?.depreciationMethod?.id,
          placeholders: assetCategoryEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsAssetCategory.home.createOrEditLabel" data-cy="AssetCategoryCreateUpdateHeading">
            Create or edit a Asset Category
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
                <ValidatedField name="id" required readOnly id="asset-category-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Asset Category Name"
                id="asset-category-assetCategoryName"
                name="assetCategoryName"
                data-cy="assetCategoryName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Description" id="asset-category-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="Notes" id="asset-category-notes" name="notes" data-cy="notes" type="text" />
              <ValidatedField label="Remarks" id="asset-category-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField
                label="Depreciation Rate Yearly"
                id="asset-category-depreciationRateYearly"
                name="depreciationRateYearly"
                data-cy="depreciationRateYearly"
                type="text"
              />
              <ValidatedField
                id="asset-category-depreciationMethod"
                name="depreciationMethod"
                data-cy="depreciationMethod"
                label="Depreciation Method"
                type="select"
                required
              >
                <option value="" key="0" />
                {depreciationMethods
                  ? depreciationMethods.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.depreciationMethodName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="Placeholder"
                id="asset-category-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/asset-category" replace color="info">
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

export default AssetCategoryUpdate;
