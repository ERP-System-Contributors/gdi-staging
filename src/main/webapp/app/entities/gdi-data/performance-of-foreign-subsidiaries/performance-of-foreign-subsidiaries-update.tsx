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
import { IIsoCountryCode } from 'app/shared/model/gdi/iso-country-code.model';
import { getEntities as getIsoCountryCodes } from 'app/entities/gdi/iso-country-code/iso-country-code.reducer';
import { IPerformanceOfForeignSubsidiaries } from 'app/shared/model/gdi-data/performance-of-foreign-subsidiaries.model';
import { getEntity, updateEntity, createEntity, reset } from './performance-of-foreign-subsidiaries.reducer';

export const PerformanceOfForeignSubsidiariesUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const isoCountryCodes = useAppSelector(state => state.isoCountryCode.entities);
  const performanceOfForeignSubsidiariesEntity = useAppSelector(state => state.performanceOfForeignSubsidiaries.entity);
  const loading = useAppSelector(state => state.performanceOfForeignSubsidiaries.loading);
  const updating = useAppSelector(state => state.performanceOfForeignSubsidiaries.updating);
  const updateSuccess = useAppSelector(state => state.performanceOfForeignSubsidiaries.updateSuccess);

  const handleClose = () => {
    navigate('/performance-of-foreign-subsidiaries' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getIsoCountryCodes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...performanceOfForeignSubsidiariesEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      subsidiaryCountryCode: isoCountryCodes.find(it => it.id.toString() === values.subsidiaryCountryCode.toString()),
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
          ...performanceOfForeignSubsidiariesEntity,
          bankCode: performanceOfForeignSubsidiariesEntity?.bankCode?.id,
          subsidiaryCountryCode: performanceOfForeignSubsidiariesEntity?.subsidiaryCountryCode?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="gdiStagingApp.gdiDataPerformanceOfForeignSubsidiaries.home.createOrEditLabel"
            data-cy="PerformanceOfForeignSubsidiariesCreateUpdateHeading"
          >
            Create or edit a Performance Of Foreign Subsidiaries
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
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="performance-of-foreign-subsidiaries-id"
                  label="ID"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label="Subsidiary Name"
                id="performance-of-foreign-subsidiaries-subsidiaryName"
                name="subsidiaryName"
                data-cy="subsidiaryName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Reporting Date"
                id="performance-of-foreign-subsidiaries-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Subsidiary Id"
                id="performance-of-foreign-subsidiaries-subsidiaryId"
                name="subsidiaryId"
                data-cy="subsidiaryId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Gross Loans Amount"
                id="performance-of-foreign-subsidiaries-grossLoansAmount"
                name="grossLoansAmount"
                data-cy="grossLoansAmount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Gross NPA Loan Amount"
                id="performance-of-foreign-subsidiaries-grossNPALoanAmount"
                name="grossNPALoanAmount"
                data-cy="grossNPALoanAmount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Gross Assets Amount"
                id="performance-of-foreign-subsidiaries-grossAssetsAmount"
                name="grossAssetsAmount"
                data-cy="grossAssetsAmount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Gross Deposits Amount"
                id="performance-of-foreign-subsidiaries-grossDepositsAmount"
                name="grossDepositsAmount"
                data-cy="grossDepositsAmount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Profit Before Tax"
                id="performance-of-foreign-subsidiaries-profitBeforeTax"
                name="profitBeforeTax"
                data-cy="profitBeforeTax"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total Capital Adequacy Ratio"
                id="performance-of-foreign-subsidiaries-totalCapitalAdequacyRatio"
                name="totalCapitalAdequacyRatio"
                data-cy="totalCapitalAdequacyRatio"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Liquidity Ratio"
                id="performance-of-foreign-subsidiaries-liquidityRatio"
                name="liquidityRatio"
                data-cy="liquidityRatio"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="General Provisions"
                id="performance-of-foreign-subsidiaries-generalProvisions"
                name="generalProvisions"
                data-cy="generalProvisions"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Specific Provisions"
                id="performance-of-foreign-subsidiaries-specificProvisions"
                name="specificProvisions"
                data-cy="specificProvisions"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Interest In Suspense Amount"
                id="performance-of-foreign-subsidiaries-interestInSuspenseAmount"
                name="interestInSuspenseAmount"
                data-cy="interestInSuspenseAmount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total Number Of Staff"
                id="performance-of-foreign-subsidiaries-totalNumberOfStaff"
                name="totalNumberOfStaff"
                data-cy="totalNumberOfStaff"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 1, message: 'This field should be at least 1.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Number Of Branches"
                id="performance-of-foreign-subsidiaries-numberOfBranches"
                name="numberOfBranches"
                data-cy="numberOfBranches"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 1, message: 'This field should be at least 1.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                id="performance-of-foreign-subsidiaries-bankCode"
                name="bankCode"
                data-cy="bankCode"
                label="Bank Code"
                type="select"
                required
              >
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
              <ValidatedField
                id="performance-of-foreign-subsidiaries-subsidiaryCountryCode"
                name="subsidiaryCountryCode"
                data-cy="subsidiaryCountryCode"
                label="Subsidiary Country Code"
                type="select"
                required
              >
                <option value="" key="0" />
                {isoCountryCodes
                  ? isoCountryCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.countryDescription}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/performance-of-foreign-subsidiaries"
                replace
                color="info"
              >
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

export default PerformanceOfForeignSubsidiariesUpdate;
