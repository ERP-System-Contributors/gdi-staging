import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, translate, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICountySubCountyCode } from 'app/shared/model/gdi-data/county-sub-county-code.model';
import { getEntity, updateEntity, createEntity, reset } from './county-sub-county-code.reducer';

export const CountySubCountyCodeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const countySubCountyCodeEntity = useAppSelector(state => state.countySubCountyCode.entity);
  const loading = useAppSelector(state => state.countySubCountyCode.loading);
  const updating = useAppSelector(state => state.countySubCountyCode.updating);
  const updateSuccess = useAppSelector(state => state.countySubCountyCode.updateSuccess);

  const handleClose = () => {
    navigate('/county-sub-county-code' + location.search);
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
      ...countySubCountyCodeEntity,
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
          ...countySubCountyCodeEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataCountySubCountyCode.home.createOrEditLabel" data-cy="CountySubCountyCodeCreateUpdateHeading">
            Create or edit a County Sub County Code
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
                <ValidatedField name="id" required readOnly id="county-sub-county-code-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Sub County Code"
                id="county-sub-county-code-subCountyCode"
                name="subCountyCode"
                data-cy="subCountyCode"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  minLength: { value: 4, message: 'This field is required to be at least 4 characters.' },
                  maxLength: { value: 4, message: 'This field cannot be longer than 4 characters.' },
                  pattern: { value: /^\d{4}$/, message: translate('entity.validation.pattern', { pattern: '^\\d{4}$' }) },
                }}
              />
              <ValidatedField
                label="Sub County Name"
                id="county-sub-county-code-subCountyName"
                name="subCountyName"
                data-cy="subCountyName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="County Code"
                id="county-sub-county-code-countyCode"
                name="countyCode"
                data-cy="countyCode"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  minLength: { value: 2, message: 'This field is required to be at least 2 characters.' },
                  maxLength: { value: 2, message: 'This field cannot be longer than 2 characters.' },
                  pattern: { value: /^\d{2}$/, message: translate('entity.validation.pattern', { pattern: '^\\d{2}$' }) },
                }}
              />
              <ValidatedField
                label="County Name"
                id="county-sub-county-code-countyName"
                name="countyName"
                data-cy="countyName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/county-sub-county-code" replace color="info">
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

export default CountySubCountyCodeUpdate;
