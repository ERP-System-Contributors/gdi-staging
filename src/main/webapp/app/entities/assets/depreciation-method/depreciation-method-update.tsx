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
import { IDepreciationMethod } from 'app/shared/model/assets/depreciation-method.model';
import { DepreciationTypes } from 'app/shared/model/enumerations/depreciation-types.model';
import { getEntity, updateEntity, createEntity, reset } from './depreciation-method.reducer';

export const DepreciationMethodUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const depreciationMethodEntity = useAppSelector(state => state.depreciationMethod.entity);
  const loading = useAppSelector(state => state.depreciationMethod.loading);
  const updating = useAppSelector(state => state.depreciationMethod.updating);
  const updateSuccess = useAppSelector(state => state.depreciationMethod.updateSuccess);
  const depreciationTypesValues = Object.keys(DepreciationTypes);

  const handleClose = () => {
    navigate('/depreciation-method' + location.search);
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
      ...depreciationMethodEntity,
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
          depreciationType: 'STRAIGHT_LINE',
          ...depreciationMethodEntity,
          placeholders: depreciationMethodEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsDepreciationMethod.home.createOrEditLabel" data-cy="DepreciationMethodCreateUpdateHeading">
            Create or edit a Depreciation Method
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
                <ValidatedField name="id" required readOnly id="depreciation-method-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Depreciation Method Name"
                id="depreciation-method-depreciationMethodName"
                name="depreciationMethodName"
                data-cy="depreciationMethodName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Description"
                id="depreciation-method-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label="Depreciation Type"
                id="depreciation-method-depreciationType"
                name="depreciationType"
                data-cy="depreciationType"
                type="select"
              >
                {depreciationTypesValues.map(depreciationTypes => (
                  <option value={depreciationTypes} key={depreciationTypes}>
                    {depreciationTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Remarks" id="depreciation-method-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField
                label="Placeholder"
                id="depreciation-method-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/depreciation-method" replace color="info">
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

export default DepreciationMethodUpdate;
