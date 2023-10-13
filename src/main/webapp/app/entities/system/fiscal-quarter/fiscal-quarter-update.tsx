import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFiscalYear } from 'app/shared/model/system/fiscal-year.model';
import { getEntities as getFiscalYears } from 'app/entities/system/fiscal-year/fiscal-year.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IFiscalQuarter } from 'app/shared/model/system/fiscal-quarter.model';
import { getEntity, updateEntity, createEntity, reset } from './fiscal-quarter.reducer';

export const FiscalQuarterUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const fiscalYears = useAppSelector(state => state.fiscalYear.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const fiscalQuarterEntity = useAppSelector(state => state.fiscalQuarter.entity);
  const loading = useAppSelector(state => state.fiscalQuarter.loading);
  const updating = useAppSelector(state => state.fiscalQuarter.updating);
  const updateSuccess = useAppSelector(state => state.fiscalQuarter.updateSuccess);

  const handleClose = () => {
    navigate('/fiscal-quarter' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getFiscalYears({}));
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
      ...fiscalQuarterEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      universallyUniqueMappings: mapIdList(values.universallyUniqueMappings),
      fiscalYear: fiscalYears.find(it => it.id.toString() === values.fiscalYear.toString()),
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
          ...fiscalQuarterEntity,
          fiscalYear: fiscalQuarterEntity?.fiscalYear?.id,
          placeholders: fiscalQuarterEntity?.placeholders?.map(e => e.id.toString()),
          universallyUniqueMappings: fiscalQuarterEntity?.universallyUniqueMappings?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.systemFiscalQuarter.home.createOrEditLabel" data-cy="FiscalQuarterCreateUpdateHeading">
            Create or edit a Fiscal Quarter
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
                <ValidatedField name="id" required readOnly id="fiscal-quarter-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Quarter Number"
                id="fiscal-quarter-quarterNumber"
                name="quarterNumber"
                data-cy="quarterNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Start Date"
                id="fiscal-quarter-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="End Date"
                id="fiscal-quarter-endDate"
                name="endDate"
                data-cy="endDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Fiscal Quarter Code"
                id="fiscal-quarter-fiscalQuarterCode"
                name="fiscalQuarterCode"
                data-cy="fiscalQuarterCode"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                id="fiscal-quarter-fiscalYear"
                name="fiscalYear"
                data-cy="fiscalYear"
                label="Fiscal Year"
                type="select"
                required
              >
                <option value="" key="0" />
                {fiscalYears
                  ? fiscalYears.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.fiscalYearCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="Placeholder"
                id="fiscal-quarter-placeholder"
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
              <ValidatedField
                label="Universally Unique Mapping"
                id="fiscal-quarter-universallyUniqueMapping"
                data-cy="universallyUniqueMapping"
                type="select"
                multiple
                name="universallyUniqueMappings"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fiscal-quarter" replace color="info">
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

export default FiscalQuarterUpdate;
