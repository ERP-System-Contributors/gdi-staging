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
import { IQuestionBase } from 'app/shared/model/system/question-base.model';
import { ControlTypes } from 'app/shared/model/enumerations/control-types.model';
import { getEntity, updateEntity, createEntity, reset } from './question-base.reducer';

export const QuestionBaseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const questionBaseEntity = useAppSelector(state => state.questionBase.entity);
  const loading = useAppSelector(state => state.questionBase.loading);
  const updating = useAppSelector(state => state.questionBase.updating);
  const updateSuccess = useAppSelector(state => state.questionBase.updateSuccess);
  const controlTypesValues = Object.keys(ControlTypes);

  const handleClose = () => {
    navigate('/question-base' + location.search);
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
      ...questionBaseEntity,
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
          ...questionBaseEntity,
          parameters: questionBaseEntity?.parameters?.map(e => e.id.toString()),
          placeholderItems: questionBaseEntity?.placeholderItems?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.systemQuestionBase.home.createOrEditLabel" data-cy="QuestionBaseCreateUpdateHeading">
            Create or edit a Question Base
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
                <ValidatedField name="id" required readOnly id="question-base-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Context"
                id="question-base-context"
                name="context"
                data-cy="context"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Serial"
                id="question-base-serial"
                name="serial"
                data-cy="serial"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Question Base Value"
                id="question-base-questionBaseValue"
                name="questionBaseValue"
                data-cy="questionBaseValue"
                type="text"
              />
              <ValidatedField
                label="Question Base Key"
                id="question-base-questionBaseKey"
                name="questionBaseKey"
                data-cy="questionBaseKey"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Question Base Label"
                id="question-base-questionBaseLabel"
                name="questionBaseLabel"
                data-cy="questionBaseLabel"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Required" id="question-base-required" name="required" data-cy="required" check type="checkbox" />
              <ValidatedField
                label="Order"
                id="question-base-order"
                name="order"
                data-cy="order"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField label="Control Type" id="question-base-controlType" name="controlType" data-cy="controlType" type="select">
                {controlTypesValues.map(controlTypes => (
                  <option value={controlTypes} key={controlTypes}>
                    {controlTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Placeholder" id="question-base-placeholder" name="placeholder" data-cy="placeholder" type="text" />
              <ValidatedField label="Iterable" id="question-base-iterable" name="iterable" data-cy="iterable" check type="checkbox" />
              <ValidatedField
                label="Parameters"
                id="question-base-parameters"
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
                id="question-base-placeholderItem"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/question-base" replace color="info">
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

export default QuestionBaseUpdate;
