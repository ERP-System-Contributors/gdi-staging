import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICardState } from 'app/shared/model/gdi-data/card-state.model';
import { CardStateFlagTypes } from 'app/shared/model/enumerations/card-state-flag-types.model';
import { getEntity, updateEntity, createEntity, reset } from './card-state.reducer';

export const CardStateUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const cardStateEntity = useAppSelector(state => state.cardState.entity);
  const loading = useAppSelector(state => state.cardState.loading);
  const updating = useAppSelector(state => state.cardState.updating);
  const updateSuccess = useAppSelector(state => state.cardState.updateSuccess);
  const cardStateFlagTypesValues = Object.keys(CardStateFlagTypes);

  const handleClose = () => {
    navigate('/card-state' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...cardStateEntity,
      ...values,
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
          cardStateFlag: 'P',
          ...cardStateEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataCardState.home.createOrEditLabel" data-cy="CardStateCreateUpdateHeading">
            Create or edit a Card State
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="card-state-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Card State Flag"
                id="card-state-cardStateFlag"
                name="cardStateFlag"
                data-cy="cardStateFlag"
                type="select"
              >
                {cardStateFlagTypesValues.map(cardStateFlagTypes => (
                  <option value={cardStateFlagTypes} key={cardStateFlagTypes}>
                    {cardStateFlagTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Card State Flag Details"
                id="card-state-cardStateFlagDetails"
                name="cardStateFlagDetails"
                data-cy="cardStateFlagDetails"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Card State Flag Description"
                id="card-state-cardStateFlagDescription"
                name="cardStateFlagDescription"
                data-cy="cardStateFlagDescription"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/card-state" replace color="info">
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

export default CardStateUpdate;
