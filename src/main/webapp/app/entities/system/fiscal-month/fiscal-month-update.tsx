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
import { getEntities as getFiscalQuarters } from 'app/entities/system/fiscal-quarter/fiscal-quarter.reducer';
import { IFiscalMonth } from 'app/shared/model/system/fiscal-month.model';
import { getEntity, updateEntity, createEntity, reset } from './fiscal-month.reducer';

export const FiscalMonthUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const fiscalYears = useAppSelector(state => state.fiscalYear.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const fiscalQuarters = useAppSelector(state => state.fiscalQuarter.entities);
  const fiscalMonthEntity = useAppSelector(state => state.fiscalMonth.entity);
  const loading = useAppSelector(state => state.fiscalMonth.loading);
  const updating = useAppSelector(state => state.fiscalMonth.updating);
  const updateSuccess = useAppSelector(state => state.fiscalMonth.updateSuccess);

  const handleClose = () => {
    navigate('/fiscal-month' + location.search);
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
    dispatch(getFiscalQuarters({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...fiscalMonthEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      universallyUniqueMappings: mapIdList(values.universallyUniqueMappings),
      fiscalYear: fiscalYears.find(it => it.id.toString() === values.fiscalYear.toString()),
      fiscalQuarter: fiscalQuarters.find(it => it.id.toString() === values.fiscalQuarter.toString()),
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
          ...fiscalMonthEntity,
          fiscalYear: fiscalMonthEntity?.fiscalYear?.id,
          placeholders: fiscalMonthEntity?.placeholders?.map(e => e.id.toString()),
          universallyUniqueMappings: fiscalMonthEntity?.universallyUniqueMappings?.map(e => e.id.toString()),
          fiscalQuarter: fiscalMonthEntity?.fiscalQuarter?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.systemFiscalMonth.home.createOrEditLabel" data-cy="FiscalMonthCreateUpdateHeading">
            Create or edit a Fiscal Month
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="fiscal-month-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Month Number"
                id="fiscal-month-monthNumber"
                name="monthNumber"
                data-cy="monthNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Start Date"
                id="fiscal-month-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="End Date"
                id="fiscal-month-endDate"
                name="endDate"
                data-cy="endDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Fiscal Month Code"
                id="fiscal-month-fiscalMonthCode"
                name="fiscalMonthCode"
                data-cy="fiscalMonthCode"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                id="fiscal-month-fiscalYear"
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
                id="fiscal-month-placeholder"
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
                id="fiscal-month-universallyUniqueMapping"
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
              <ValidatedField
                id="fiscal-month-fiscalQuarter"
                name="fiscalQuarter"
                data-cy="fiscalQuarter"
                label="Fiscal Quarter"
                type="select"
              >
                <option value="" key="0" />
                {fiscalQuarters
                  ? fiscalQuarters.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.fiscalQuarterCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fiscal-month" replace color="info">
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

export default FiscalMonthUpdate;
