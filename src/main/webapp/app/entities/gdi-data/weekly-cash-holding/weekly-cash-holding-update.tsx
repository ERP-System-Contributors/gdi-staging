import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { getEntities as getInstitutionCodes } from 'app/entities/gdi/institution-code/institution-code.reducer';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { getEntities as getBankBranchCodes } from 'app/entities/gdi/bank-branch-code/bank-branch-code.reducer';
import { ICountySubCountyCode } from 'app/shared/model/gdi-data/county-sub-county-code.model';
import { getEntities as getCountySubCountyCodes } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.reducer';
import { IKenyanCurrencyDenomination } from 'app/shared/model/gdi/kenyan-currency-denomination.model';
import { getEntities as getKenyanCurrencyDenominations } from 'app/entities/gdi/kenyan-currency-denomination/kenyan-currency-denomination.reducer';
import { IWeeklyCashHolding } from 'app/shared/model/gdi-data/weekly-cash-holding.model';
import { getEntity, updateEntity, createEntity, reset } from './weekly-cash-holding.reducer';

export const WeeklyCashHoldingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const bankBranchCodes = useAppSelector(state => state.bankBranchCode.entities);
  const countySubCountyCodes = useAppSelector(state => state.countySubCountyCode.entities);
  const kenyanCurrencyDenominations = useAppSelector(state => state.kenyanCurrencyDenomination.entities);
  const weeklyCashHoldingEntity = useAppSelector(state => state.weeklyCashHolding.entity);
  const loading = useAppSelector(state => state.weeklyCashHolding.loading);
  const updating = useAppSelector(state => state.weeklyCashHolding.updating);
  const updateSuccess = useAppSelector(state => state.weeklyCashHolding.updateSuccess);

  const handleClose = () => {
    navigate('/weekly-cash-holding' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getBankBranchCodes({}));
    dispatch(getCountySubCountyCodes({}));
    dispatch(getKenyanCurrencyDenominations({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...weeklyCashHoldingEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      branchId: bankBranchCodes.find(it => it.id.toString() === values.branchId.toString()),
      subCountyCode: countySubCountyCodes.find(it => it.id.toString() === values.subCountyCode.toString()),
      denomination: kenyanCurrencyDenominations.find(it => it.id.toString() === values.denomination.toString()),
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
          ...weeklyCashHoldingEntity,
          bankCode: weeklyCashHoldingEntity?.bankCode?.id,
          branchId: weeklyCashHoldingEntity?.branchId?.id,
          subCountyCode: weeklyCashHoldingEntity?.subCountyCode?.id,
          denomination: weeklyCashHoldingEntity?.denomination?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataWeeklyCashHolding.home.createOrEditLabel" data-cy="WeeklyCashHoldingCreateUpdateHeading">
            Create or edit a Weekly Cash Holding
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
                <ValidatedField name="id" required readOnly id="weekly-cash-holding-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="weekly-cash-holding-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Fit Units"
                id="weekly-cash-holding-fitUnits"
                name="fitUnits"
                data-cy="fitUnits"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Unfit Units"
                id="weekly-cash-holding-unfitUnits"
                name="unfitUnits"
                data-cy="unfitUnits"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField id="weekly-cash-holding-bankCode" name="bankCode" data-cy="bankCode" label="Bank Code" type="select" required>
                <option value="" key="0" />
                {institutionCodes
                  ? institutionCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.institutionName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField id="weekly-cash-holding-branchId" name="branchId" data-cy="branchId" label="Branch Id" type="select" required>
                <option value="" key="0" />
                {bankBranchCodes
                  ? bankBranchCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.branchCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="weekly-cash-holding-subCountyCode"
                name="subCountyCode"
                data-cy="subCountyCode"
                label="Sub County Code"
                type="select"
                required
              >
                <option value="" key="0" />
                {countySubCountyCodes
                  ? countySubCountyCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.subCountyName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="weekly-cash-holding-denomination"
                name="denomination"
                data-cy="denomination"
                label="Denomination"
                type="select"
                required
              >
                <option value="" key="0" />
                {kenyanCurrencyDenominations
                  ? kenyanCurrencyDenominations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.currencyDenominationType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/weekly-cash-holding" replace color="info">
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

export default WeeklyCashHoldingUpdate;
