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
import { IMessageToken } from 'app/shared/model/system/message-token.model';
import { getEntity, updateEntity, createEntity, reset } from './message-token.reducer';

export const MessageTokenUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const messageTokenEntity = useAppSelector(state => state.messageToken.entity);
  const loading = useAppSelector(state => state.messageToken.loading);
  const updating = useAppSelector(state => state.messageToken.updating);
  const updateSuccess = useAppSelector(state => state.messageToken.updateSuccess);

  const handleClose = () => {
    navigate('/message-token' + location.search);
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
      ...messageTokenEntity,
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
          ...messageTokenEntity,
          placeholders: messageTokenEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.systemMessageToken.home.createOrEditLabel" data-cy="MessageTokenCreateUpdateHeading">
            Create or edit a Message Token
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
                <ValidatedField name="id" required readOnly id="message-token-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Description" id="message-token-description" name="description" data-cy="description" type="text" />
              <ValidatedField
                label="Time Sent"
                id="message-token-timeSent"
                name="timeSent"
                data-cy="timeSent"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Token Value"
                id="message-token-tokenValue"
                name="tokenValue"
                data-cy="tokenValue"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Received" id="message-token-received" name="received" data-cy="received" check type="checkbox" />
              <ValidatedField label="Actioned" id="message-token-actioned" name="actioned" data-cy="actioned" check type="checkbox" />
              <ValidatedField
                label="Content Fully Enqueued"
                id="message-token-contentFullyEnqueued"
                name="contentFullyEnqueued"
                data-cy="contentFullyEnqueued"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Placeholder"
                id="message-token-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/message-token" replace color="info">
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

export default MessageTokenUpdate;
