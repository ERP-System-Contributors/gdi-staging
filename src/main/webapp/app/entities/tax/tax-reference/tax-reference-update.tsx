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
import { ITaxReference } from 'app/shared/model/tax/tax-reference.model';
import { taxReferenceTypes } from 'app/shared/model/enumerations/tax-reference-types.model';
import { getEntity, updateEntity, createEntity, reset } from './tax-reference.reducer';

export const TaxReferenceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const taxReferenceEntity = useAppSelector(state => state.taxReference.entity);
  const loading = useAppSelector(state => state.taxReference.loading);
  const updating = useAppSelector(state => state.taxReference.updating);
  const updateSuccess = useAppSelector(state => state.taxReference.updateSuccess);
  const taxReferenceTypesValues = Object.keys(taxReferenceTypes);

  const handleClose = () => {
    navigate('/tax-reference' + location.search);
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
      ...taxReferenceEntity,
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
          taxReferenceType: 'TELCO_EXCISE_DUTY',
          ...taxReferenceEntity,
          placeholders: taxReferenceEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.taxTaxReference.home.createOrEditLabel" data-cy="TaxReferenceCreateUpdateHeading">
            Create or edit a Tax Reference
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
                <ValidatedField name="id" required readOnly id="tax-reference-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Tax Name" id="tax-reference-taxName" name="taxName" data-cy="taxName" type="text" validate={{}} />
              <ValidatedField
                label="Tax Description"
                id="tax-reference-taxDescription"
                name="taxDescription"
                data-cy="taxDescription"
                type="text"
              />
              <ValidatedField
                label="Tax Percentage"
                id="tax-reference-taxPercentage"
                name="taxPercentage"
                data-cy="taxPercentage"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Tax Reference Type"
                id="tax-reference-taxReferenceType"
                name="taxReferenceType"
                data-cy="taxReferenceType"
                type="select"
              >
                {taxReferenceTypesValues.map(taxReferenceTypes => (
                  <option value={taxReferenceTypes} key={taxReferenceTypes}>
                    {taxReferenceTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="File Upload Token"
                id="tax-reference-fileUploadToken"
                name="fileUploadToken"
                data-cy="fileUploadToken"
                type="text"
              />
              <ValidatedField
                label="Compilation Token"
                id="tax-reference-compilationToken"
                name="compilationToken"
                data-cy="compilationToken"
                type="text"
              />
              <ValidatedField
                label="Placeholder"
                id="tax-reference-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/tax-reference" replace color="info">
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

export default TaxReferenceUpdate;
