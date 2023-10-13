import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IServiceOutlet } from 'app/shared/model/gdi/service-outlet.model';
import { getEntities as getServiceOutlets } from 'app/entities/gdi/service-outlet/service-outlet.reducer';
import { IAssetCategory } from 'app/shared/model/assets/asset-category.model';
import { getEntities as getAssetCategories } from 'app/entities/assets/asset-category/asset-category.reducer';
import { IDepreciationMethod } from 'app/shared/model/assets/depreciation-method.model';
import { getEntities as getDepreciationMethods } from 'app/entities/assets/depreciation-method/depreciation-method.reducer';
import { IAssetRegistration } from 'app/shared/model/assets/asset-registration.model';
import { getEntities as getAssetRegistrations } from 'app/entities/assets/asset-registration/asset-registration.reducer';
import { IDepreciationPeriod } from 'app/shared/model/assets/depreciation-period.model';
import { getEntities as getDepreciationPeriods } from 'app/entities/assets/depreciation-period/depreciation-period.reducer';
import { IFiscalMonth } from 'app/shared/model/system/fiscal-month.model';
import { getEntities as getFiscalMonths } from 'app/entities/system/fiscal-month/fiscal-month.reducer';
import { IFiscalQuarter } from 'app/shared/model/system/fiscal-quarter.model';
import { getEntities as getFiscalQuarters } from 'app/entities/system/fiscal-quarter/fiscal-quarter.reducer';
import { IFiscalYear } from 'app/shared/model/system/fiscal-year.model';
import { getEntities as getFiscalYears } from 'app/entities/system/fiscal-year/fiscal-year.reducer';
import { IDepreciationEntry } from 'app/shared/model/assets/depreciation-entry.model';
import { getEntity, updateEntity, createEntity, reset } from './depreciation-entry.reducer';

export const DepreciationEntryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const serviceOutlets = useAppSelector(state => state.serviceOutlet.entities);
  const assetCategories = useAppSelector(state => state.assetCategory.entities);
  const depreciationMethods = useAppSelector(state => state.depreciationMethod.entities);
  const assetRegistrations = useAppSelector(state => state.assetRegistration.entities);
  const depreciationPeriods = useAppSelector(state => state.depreciationPeriod.entities);
  const fiscalMonths = useAppSelector(state => state.fiscalMonth.entities);
  const fiscalQuarters = useAppSelector(state => state.fiscalQuarter.entities);
  const fiscalYears = useAppSelector(state => state.fiscalYear.entities);
  const depreciationEntryEntity = useAppSelector(state => state.depreciationEntry.entity);
  const loading = useAppSelector(state => state.depreciationEntry.loading);
  const updating = useAppSelector(state => state.depreciationEntry.updating);
  const updateSuccess = useAppSelector(state => state.depreciationEntry.updateSuccess);

  const handleClose = () => {
    navigate('/depreciation-entry' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getServiceOutlets({}));
    dispatch(getAssetCategories({}));
    dispatch(getDepreciationMethods({}));
    dispatch(getAssetRegistrations({}));
    dispatch(getDepreciationPeriods({}));
    dispatch(getFiscalMonths({}));
    dispatch(getFiscalQuarters({}));
    dispatch(getFiscalYears({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.postedAt = convertDateTimeToServer(values.postedAt);

    const entity = {
      ...depreciationEntryEntity,
      ...values,
      serviceOutlet: serviceOutlets.find(it => it.id.toString() === values.serviceOutlet.toString()),
      assetCategory: assetCategories.find(it => it.id.toString() === values.assetCategory.toString()),
      depreciationMethod: depreciationMethods.find(it => it.id.toString() === values.depreciationMethod.toString()),
      assetRegistration: assetRegistrations.find(it => it.id.toString() === values.assetRegistration.toString()),
      depreciationPeriod: depreciationPeriods.find(it => it.id.toString() === values.depreciationPeriod.toString()),
      fiscalMonth: fiscalMonths.find(it => it.id.toString() === values.fiscalMonth.toString()),
      fiscalQuarter: fiscalQuarters.find(it => it.id.toString() === values.fiscalQuarter.toString()),
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
      ? {
          postedAt: displayDefaultDateTime(),
        }
      : {
          ...depreciationEntryEntity,
          postedAt: convertDateTimeFromServer(depreciationEntryEntity.postedAt),
          serviceOutlet: depreciationEntryEntity?.serviceOutlet?.id,
          assetCategory: depreciationEntryEntity?.assetCategory?.id,
          depreciationMethod: depreciationEntryEntity?.depreciationMethod?.id,
          assetRegistration: depreciationEntryEntity?.assetRegistration?.id,
          depreciationPeriod: depreciationEntryEntity?.depreciationPeriod?.id,
          fiscalMonth: depreciationEntryEntity?.fiscalMonth?.id,
          fiscalQuarter: depreciationEntryEntity?.fiscalQuarter?.id,
          fiscalYear: depreciationEntryEntity?.fiscalYear?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsDepreciationEntry.home.createOrEditLabel" data-cy="DepreciationEntryCreateUpdateHeading">
            Create or edit a Depreciation Entry
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
                <ValidatedField name="id" required readOnly id="depreciation-entry-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Posted At"
                id="depreciation-entry-postedAt"
                name="postedAt"
                data-cy="postedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Depreciation Amount"
                id="depreciation-entry-depreciationAmount"
                name="depreciationAmount"
                data-cy="depreciationAmount"
                type="text"
              />
              <ValidatedField
                label="Asset Number"
                id="depreciation-entry-assetNumber"
                name="assetNumber"
                data-cy="assetNumber"
                type="text"
              />
              <ValidatedField
                id="depreciation-entry-serviceOutlet"
                name="serviceOutlet"
                data-cy="serviceOutlet"
                label="Service Outlet"
                type="select"
              >
                <option value="" key="0" />
                {serviceOutlets
                  ? serviceOutlets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.outletCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="depreciation-entry-assetCategory"
                name="assetCategory"
                data-cy="assetCategory"
                label="Asset Category"
                type="select"
              >
                <option value="" key="0" />
                {assetCategories
                  ? assetCategories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.assetCategoryName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="depreciation-entry-depreciationMethod"
                name="depreciationMethod"
                data-cy="depreciationMethod"
                label="Depreciation Method"
                type="select"
              >
                <option value="" key="0" />
                {depreciationMethods
                  ? depreciationMethods.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.depreciationMethodName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="depreciation-entry-assetRegistration"
                name="assetRegistration"
                data-cy="assetRegistration"
                label="Asset Registration"
                type="select"
              >
                <option value="" key="0" />
                {assetRegistrations
                  ? assetRegistrations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.assetNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="depreciation-entry-depreciationPeriod"
                name="depreciationPeriod"
                data-cy="depreciationPeriod"
                label="Depreciation Period"
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
              <ValidatedField
                id="depreciation-entry-fiscalMonth"
                name="fiscalMonth"
                data-cy="fiscalMonth"
                label="Fiscal Month"
                type="select"
              >
                <option value="" key="0" />
                {fiscalMonths
                  ? fiscalMonths.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.fiscalMonthCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="depreciation-entry-fiscalQuarter"
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
              <ValidatedField id="depreciation-entry-fiscalYear" name="fiscalYear" data-cy="fiscalYear" label="Fiscal Year" type="select">
                <option value="" key="0" />
                {fiscalYears
                  ? fiscalYears.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.fiscalYearCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/depreciation-entry" replace color="info">
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

export default DepreciationEntryUpdate;
