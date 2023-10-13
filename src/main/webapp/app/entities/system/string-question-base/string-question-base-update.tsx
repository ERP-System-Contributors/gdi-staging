import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IStringQuestionBase } from 'app/shared/model/system/string-question-base.model';
import { ControlTypes } from 'app/shared/model/enumerations/control-types.model';
import { getEntity, updateEntity, createEntity, reset } from './string-question-base.reducer';

export const StringQuestionBaseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const stringQuestionBaseEntity = useAppSelector(state => state.stringQuestionBase.entity);
  const loading = useAppSelector(state => state.stringQuestionBase.loading);
  const updating = useAppSelector(state => state.stringQuestionBase.updating);
  const updateSuccess = useAppSelector(state => state.stringQuestionBase.updateSuccess);
  const controlTypesValues = Object.keys(ControlTypes);

  const handleClose = () => {
    navigate('/string-question-base' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...stringQuestionBaseEntity,
      ...values,
      parameters: mapIdList(values.parameters),
      placeholderItems: mapIdList(values.placeholderItems),
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
          controlType: 'TEXTBOX',
          ...stringQuestionBaseEntity,
          parameters: stringQuestionBaseEntity?.parameters?.map(e => e.id.toString()),
          placeholderItems: stringQuestionBaseEntity?.placeholderItems?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.systemStringQuestionBase.home.createOrEditLabel" data-cy="StringQuestionBaseCreateUpdateHeading">
            Create or edit a String Question Base
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
                <ValidatedField name="id" required readOnly id="string-question-base-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Value" id="string-question-base-value" name="value" data-cy="value" type="text" />
              <ValidatedField
                label="Key"
                id="string-question-base-key"
                name="key"
                data-cy="key"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Label"
                id="string-question-base-label"
                name="label"
                data-cy="label"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Required"
                id="string-question-base-required"
                name="required"
                data-cy="required"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Order"
                id="string-question-base-order"
                name="order"
                data-cy="order"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Control Type"
                id="string-question-base-controlType"
                name="controlType"
                data-cy="controlType"
                type="select"
              >
                {controlTypesValues.map(controlTypes => (
                  <option value={controlTypes} key={controlTypes}>
                    {controlTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="string-question-base-placeholder"
                name="placeholder"
                data-cy="placeholder"
                type="text"
              />
              <ValidatedField
                label="Iterable"
                id="string-question-base-iterable"
                name="iterable"
                data-cy="iterable"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Parameters"
                id="string-question-base-parameters"
                data-cy="parameters"
                type="select"
                multiple
                name="parameters"
              >
                <option value="" key="0" />
                {universallyUniqueMappings
                  ? universallyUniqueMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.universalKey}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Placeholder Item"
                id="string-question-base-placeholderItem"
                data-cy="placeholderItem"
                type="select"
                multiple
                name="placeholderItems"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/string-question-base" replace color="info">
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

export default StringQuestionBaseUpdate;
