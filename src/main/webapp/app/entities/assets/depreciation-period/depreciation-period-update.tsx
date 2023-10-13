import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getDepreciationPeriods } from 'app/entities/assets/depreciation-period/depreciation-period.reducer';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/people/application-user/application-user.reducer';
import { IFiscalYear } from 'app/shared/model/system/fiscal-year.model';
import { getEntities as getFiscalYears } from 'app/entities/system/fiscal-year/fiscal-year.reducer';
import { IFiscalMonth } from 'app/shared/model/system/fiscal-month.model';
import { getEntities as getFiscalMonths } from 'app/entities/system/fiscal-month/fiscal-month.reducer';
import { IFiscalQuarter } from 'app/shared/model/system/fiscal-quarter.model';
import { getEntities as getFiscalQuarters } from 'app/entities/system/fiscal-quarter/fiscal-quarter.reducer';
import { IDepreciationPeriod } from 'app/shared/model/assets/depreciation-period.model';
import { DepreciationPeriodStatusTypes } from 'app/shared/model/enumerations/depreciation-period-status-types.model';
import { getEntity, updateEntity, createEntity, reset } from './depreciation-period.reducer';

export const DepreciationPeriodUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const depreciationPeriods = useAppSelector(state => state.depreciationPeriod.entities);
  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const fiscalYears = useAppSelector(state => state.fiscalYear.entities);
  const fiscalMonths = useAppSelector(state => state.fiscalMonth.entities);
  const fiscalQuarters = useAppSelector(state => state.fiscalQuarter.entities);
  const depreciationPeriodEntity = useAppSelector(state => state.depreciationPeriod.entity);
  const loading = useAppSelector(state => state.depreciationPeriod.loading);
  const updating = useAppSelector(state => state.depreciationPeriod.updating);
  const updateSuccess = useAppSelector(state => state.depreciationPeriod.updateSuccess);
  const depreciationPeriodStatusTypesValues = Object.keys(DepreciationPeriodStatusTypes);

  const handleClose = () => {
    navigate('/depreciation-period' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDepreciationPeriods({}));
    dispatch(getApplicationUsers({}));
    dispatch(getFiscalYears({}));
    dispatch(getFiscalMonths({}));
    dispatch(getFiscalQuarters({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...depreciationPeriodEntity,
      ...values,
      previousPeriod: depreciationPeriods.find(it => it.id.toString() === values.previousPeriod.toString()),
      createdBy: applicationUsers.find(it => it.id.toString() === values.createdBy.toString()),
      fiscalYear: fiscalYears.find(it => it.id.toString() === values.fiscalYear.toString()),
      fiscalMonth: fiscalMonths.find(it => it.id.toString() === values.fiscalMonth.toString()),
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
          depreciationPeriodStatus: 'OPEN',
          ...depreciationPeriodEntity,
          previousPeriod: depreciationPeriodEntity?.previousPeriod?.id,
          createdBy: depreciationPeriodEntity?.createdBy?.id,
          fiscalYear: depreciationPeriodEntity?.fiscalYear?.id,
          fiscalMonth: depreciationPeriodEntity?.fiscalMonth?.id,
          fiscalQuarter: depreciationPeriodEntity?.fiscalQuarter?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsDepreciationPeriod.home.createOrEditLabel" data-cy="DepreciationPeriodCreateUpdateHeading">
            Create or edit a Depreciation Period
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
                <ValidatedField name="id" required readOnly id="depreciation-period-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Start Date"
                id="depreciation-period-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="End Date"
                id="depreciation-period-endDate"
                name="endDate"
                data-cy="endDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Depreciation Period Status"
                id="depreciation-period-depreciationPeriodStatus"
                name="depreciationPeriodStatus"
                data-cy="depreciationPeriodStatus"
                type="select"
              >
                {depreciationPeriodStatusTypesValues.map(depreciationPeriodStatusTypes => (
                  <option value={depreciationPeriodStatusTypes} key={depreciationPeriodStatusTypes}>
                    {depreciationPeriodStatusTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Period Code"
                id="depreciation-period-periodCode"
                name="periodCode"
                data-cy="periodCode"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Process Locked"
                id="depreciation-period-processLocked"
                name="processLocked"
                data-cy="processLocked"
                check
                type="checkbox"
              />
              <ValidatedField
                id="depreciation-period-previousPeriod"
                name="previousPeriod"
                data-cy="previousPeriod"
                label="Previous Period"
                type="select"
              >
                <option value="" key="0" />
                {depreciationPeriods
                  ? depreciationPeriods.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.endDate}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="depreciation-period-createdBy" name="createdBy" data-cy="createdBy" label="Created By" type="select">
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
                id="depreciation-period-fiscalYear"
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
                id="depreciation-period-fiscalMonth"
                name="fiscalMonth"
                data-cy="fiscalMonth"
                label="Fiscal Month"
                type="select"
                required
              >
                <option value="" key="0" />
                {fiscalMonths
                  ? fiscalMonths.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="depreciation-period-fiscalQuarter"
                name="fiscalQuarter"
                data-cy="fiscalQuarter"
                label="Fiscal Quarter"
                type="select"
                required
              >
                <option value="" key="0" />
                {fiscalQuarters
                  ? fiscalQuarters.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/depreciation-period" replace color="info">
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

export default DepreciationPeriodUpdate;
