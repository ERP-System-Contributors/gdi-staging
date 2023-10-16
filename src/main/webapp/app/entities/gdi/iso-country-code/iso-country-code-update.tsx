import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IIsoCountryCode } from 'app/shared/model/gdi/iso-country-code.model';
import { getEntity, updateEntity, createEntity, reset } from './iso-country-code.reducer';

export const IsoCountryCodeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const isoCountryCodeEntity = useAppSelector(state => state.isoCountryCode.entity);
  const loading = useAppSelector(state => state.isoCountryCode.loading);
  const updating = useAppSelector(state => state.isoCountryCode.updating);
  const updateSuccess = useAppSelector(state => state.isoCountryCode.updateSuccess);

  const handleClose = () => {
    navigate('/iso-country-code' + location.search);
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
      ...isoCountryCodeEntity,
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
          ...isoCountryCodeEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiIsoCountryCode.home.createOrEditLabel" data-cy="IsoCountryCodeCreateUpdateHeading">
            Create or edit a Iso Country Code
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
                <ValidatedField name="id" required readOnly id="iso-country-code-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Country Code" id="iso-country-code-countryCode" name="countryCode" data-cy="countryCode" type="text" />
              <ValidatedField
                label="Country Description"
                id="iso-country-code-countryDescription"
                name="countryDescription"
                data-cy="countryDescription"
                type="text"
              />
              <ValidatedField
                label="Continent Code"
                id="iso-country-code-continentCode"
                name="continentCode"
                data-cy="continentCode"
                type="text"
              />
              <ValidatedField
                label="Continent Name"
                id="iso-country-code-continentName"
                name="continentName"
                data-cy="continentName"
                type="text"
              />
              <ValidatedField label="Sub Region" id="iso-country-code-subRegion" name="subRegion" data-cy="subRegion" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/iso-country-code" replace color="info">
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

export default IsoCountryCodeUpdate;
