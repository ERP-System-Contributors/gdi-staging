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
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { ISystemContentType } from 'app/shared/model/system/system-content-type.model';
import { SystemContentTypeAvailability } from 'app/shared/model/enumerations/system-content-type-availability.model';
import { getEntity, updateEntity, createEntity, reset } from './system-content-type.reducer';

export const SystemContentTypeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const systemContentTypeEntity = useAppSelector(state => state.systemContentType.entity);
  const loading = useAppSelector(state => state.systemContentType.loading);
  const updating = useAppSelector(state => state.systemContentType.updating);
  const updateSuccess = useAppSelector(state => state.systemContentType.updateSuccess);
  const systemContentTypeAvailabilityValues = Object.keys(SystemContentTypeAvailability);

  const handleClose = () => {
    navigate('/system-content-type' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getUniversallyUniqueMappings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...systemContentTypeEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      sysMaps: mapIdList(values.sysMaps),
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
          availability: 'SUPPORTED',
          ...systemContentTypeEntity,
          placeholders: systemContentTypeEntity?.placeholders?.map(e => e.id.toString()),
          sysMaps: systemContentTypeEntity?.sysMaps?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.systemSystemContentType.home.createOrEditLabel" data-cy="SystemContentTypeCreateUpdateHeading">
            Create or edit a System Content Type
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
                <ValidatedField name="id" required readOnly id="system-content-type-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Content Type Name"
                id="system-content-type-contentTypeName"
                name="contentTypeName"
                data-cy="contentTypeName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Content Type Header"
                id="system-content-type-contentTypeHeader"
                name="contentTypeHeader"
                data-cy="contentTypeHeader"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Comments" id="system-content-type-comments" name="comments" data-cy="comments" type="textarea" />
              <ValidatedField
                label="Availability"
                id="system-content-type-availability"
                name="availability"
                data-cy="availability"
                type="select"
              >
                {systemContentTypeAvailabilityValues.map(systemContentTypeAvailability => (
                  <option value={systemContentTypeAvailability} key={systemContentTypeAvailability}>
                    {systemContentTypeAvailability}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Placeholders"
                id="system-content-type-placeholders"
                data-cy="placeholders"
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
              <ValidatedField label="Sys Maps" id="system-content-type-sysMaps" data-cy="sysMaps" type="select" multiple name="sysMaps">
                <option value="" key="0" />
                {universallyUniqueMappings
                  ? universallyUniqueMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.mappedValue}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/system-content-type" replace color="info">
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

export default SystemContentTypeUpdate;
