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
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/people/application-user/application-user.reducer';
import { IFiscalYear } from 'app/shared/model/system/fiscal-year.model';
import { FiscalYearStatusType } from 'app/shared/model/enumerations/fiscal-year-status-type.model';
import { getEntity, updateEntity, createEntity, reset } from './fiscal-year.reducer';

export const FiscalYearUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const fiscalYearEntity = useAppSelector(state => state.fiscalYear.entity);
  const loading = useAppSelector(state => state.fiscalYear.loading);
  const updating = useAppSelector(state => state.fiscalYear.updating);
  const updateSuccess = useAppSelector(state => state.fiscalYear.updateSuccess);
  const fiscalYearStatusTypeValues = Object.keys(FiscalYearStatusType);

  const handleClose = () => {
    navigate('/fiscal-year' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getApplicationUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...fiscalYearEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      universallyUniqueMappings: mapIdList(values.universallyUniqueMappings),
      createdBy: applicationUsers.find(it => it.id.toString() === values.createdBy.toString()),
      lastUpdatedBy: applicationUsers.find(it => it.id.toString() === values.lastUpdatedBy.toString()),
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
          fiscalYearStatus: 'OPEN',
          ...fiscalYearEntity,
          placeholders: fiscalYearEntity?.placeholders?.map(e => e.id.toString()),
          universallyUniqueMappings: fiscalYearEntity?.universallyUniqueMappings?.map(e => e.id.toString()),
          createdBy: fiscalYearEntity?.createdBy?.id,
          lastUpdatedBy: fiscalYearEntity?.lastUpdatedBy?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.systemFiscalYear.home.createOrEditLabel" data-cy="FiscalYearCreateUpdateHeading">
            Create or edit a Fiscal Year
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="fiscal-year-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Fiscal Year Code"
                id="fiscal-year-fiscalYearCode"
                name="fiscalYearCode"
                data-cy="fiscalYearCode"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Start Date"
                id="fiscal-year-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="End Date"
                id="fiscal-year-endDate"
                name="endDate"
                data-cy="endDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Fiscal Year Status"
                id="fiscal-year-fiscalYearStatus"
                name="fiscalYearStatus"
                data-cy="fiscalYearStatus"
                type="select"
              >
                {fiscalYearStatusTypeValues.map(fiscalYearStatusType => (
                  <option value={fiscalYearStatusType} key={fiscalYearStatusType}>
                    {fiscalYearStatusType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="fiscal-year-placeholder"
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
                id="fiscal-year-universallyUniqueMapping"
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
              <ValidatedField id="fiscal-year-createdBy" name="createdBy" data-cy="createdBy" label="Created By" type="select">
                <option value="" key="0" />
                {applicationUsers
                  ? applicationUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.applicationIdentity}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="fiscal-year-lastUpdatedBy"
                name="lastUpdatedBy"
                data-cy="lastUpdatedBy"
                label="Last Updated By"
                type="select"
              >
                <option value="" key="0" />
                {applicationUsers
                  ? applicationUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.applicationIdentity}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fiscal-year" replace color="info">
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

export default FiscalYearUpdate;
