import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getSecurityClearances } from 'app/entities/people/security-clearance/security-clearance.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { getEntity, updateEntity, createEntity, reset } from './security-clearance.reducer';

export const SecurityClearanceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const securityClearances = useAppSelector(state => state.securityClearance.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const securityClearanceEntity = useAppSelector(state => state.securityClearance.entity);
  const loading = useAppSelector(state => state.securityClearance.loading);
  const updating = useAppSelector(state => state.securityClearance.updating);
  const updateSuccess = useAppSelector(state => state.securityClearance.updateSuccess);

  const handleClose = () => {
    navigate('/security-clearance' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSecurityClearances({}));
    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...securityClearanceEntity,
      ...values,
      grantedClearances: mapIdList(values.grantedClearances),
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
          ...securityClearanceEntity,
          grantedClearances: securityClearanceEntity?.grantedClearances?.map(e => e.id.toString()),
          placeholders: securityClearanceEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.peopleSecurityClearance.home.createOrEditLabel" data-cy="SecurityClearanceCreateUpdateHeading">
            Create or edit a Security Clearance
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
                <ValidatedField name="id" required readOnly id="security-clearance-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Clearance Level"
                id="security-clearance-clearanceLevel"
                name="clearanceLevel"
                data-cy="clearanceLevel"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Granted Clearances"
                id="security-clearance-grantedClearances"
                data-cy="grantedClearances"
                type="select"
                multiple
                name="grantedClearances"
              >
                <option value="" key="0" />
                {securityClearances
                  ? securityClearances.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.clearanceLevel}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="security-clearance-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/security-clearance" replace color="info">
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

export default SecurityClearanceUpdate;
