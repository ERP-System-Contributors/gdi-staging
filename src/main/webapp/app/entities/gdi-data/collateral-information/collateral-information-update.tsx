import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { getEntities as getInstitutionCodes } from 'app/entities/gdi/institution-code/institution-code.reducer';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { getEntities as getBankBranchCodes } from 'app/entities/gdi/bank-branch-code/bank-branch-code.reducer';
import { ICollateralType } from 'app/shared/model/gdi/collateral-type.model';
import { getEntities as getCollateralTypes } from 'app/entities/gdi/collateral-type/collateral-type.reducer';
import { ICountySubCountyCode } from 'app/shared/model/gdi-data/county-sub-county-code.model';
import { getEntities as getCountySubCountyCodes } from 'app/entities/gdi-data/county-sub-county-code/county-sub-county-code.reducer';
import { ICollateralInformation } from 'app/shared/model/gdi-data/collateral-information.model';
import { CollateralInsuredFlagTypes } from 'app/shared/model/enumerations/collateral-insured-flag-types.model';
import { getEntity, updateEntity, createEntity, reset } from './collateral-information.reducer';

export const CollateralInformationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const bankBranchCodes = useAppSelector(state => state.bankBranchCode.entities);
  const collateralTypes = useAppSelector(state => state.collateralType.entities);
  const countySubCountyCodes = useAppSelector(state => state.countySubCountyCode.entities);
  const collateralInformationEntity = useAppSelector(state => state.collateralInformation.entity);
  const loading = useAppSelector(state => state.collateralInformation.loading);
  const updating = useAppSelector(state => state.collateralInformation.updating);
  const updateSuccess = useAppSelector(state => state.collateralInformation.updateSuccess);
  const collateralInsuredFlagTypesValues = Object.keys(CollateralInsuredFlagTypes);

  const handleClose = () => {
    navigate('/collateral-information' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getBankBranchCodes({}));
    dispatch(getCollateralTypes({}));
    dispatch(getCountySubCountyCodes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...collateralInformationEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      branchCode: bankBranchCodes.find(it => it.id.toString() === values.branchCode.toString()),
      collateralType: collateralTypes.find(it => it.id.toString() === values.collateralType.toString()),
      countyCode: countySubCountyCodes.find(it => it.id.toString() === values.countyCode.toString()),
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
          insuredFlag: 'Y',
          ...collateralInformationEntity,
          bankCode: collateralInformationEntity?.bankCode?.id,
          branchCode: collateralInformationEntity?.branchCode?.id,
          collateralType: collateralInformationEntity?.collateralType?.id,
          countyCode: collateralInformationEntity?.countyCode?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataCollateralInformation.home.createOrEditLabel" data-cy="CollateralInformationCreateUpdateHeading">
            Create or edit a Collateral Information
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
                <ValidatedField name="id" required readOnly id="collateral-information-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="collateral-information-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Collateral Id"
                id="collateral-information-collateralId"
                name="collateralId"
                data-cy="collateralId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Loan Contract Id"
                id="collateral-information-loanContractId"
                name="loanContractId"
                data-cy="loanContractId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  pattern: { value: /^\d{15}$/, message: translate('entity.validation.pattern', { pattern: '^\\d{15}$' }) },
                }}
              />
              <ValidatedField
                label="Customer Id"
                id="collateral-information-customerId"
                name="customerId"
                data-cy="customerId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Registration Property Number"
                id="collateral-information-registrationPropertyNumber"
                name="registrationPropertyNumber"
                data-cy="registrationPropertyNumber"
                type="text"
              />
              <ValidatedField
                label="Collateral OMV In CCY"
                id="collateral-information-collateralOMVInCCY"
                name="collateralOMVInCCY"
                data-cy="collateralOMVInCCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Collateral FSV In LCY"
                id="collateral-information-collateralFSVInLCY"
                name="collateralFSVInLCY"
                data-cy="collateralFSVInLCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Collateral Discounted Value"
                id="collateral-information-collateralDiscountedValue"
                name="collateralDiscountedValue"
                data-cy="collateralDiscountedValue"
                type="text"
                validate={{
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Amount Charged"
                id="collateral-information-amountCharged"
                name="amountCharged"
                data-cy="amountCharged"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Collateral Discount Rate"
                id="collateral-information-collateralDiscountRate"
                name="collateralDiscountRate"
                data-cy="collateralDiscountRate"
                type="text"
                validate={{
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Loan To Value Ratio"
                id="collateral-information-loanToValueRatio"
                name="loanToValueRatio"
                data-cy="loanToValueRatio"
                type="text"
                validate={{
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Name Of Property Valuer"
                id="collateral-information-nameOfPropertyValuer"
                name="nameOfPropertyValuer"
                data-cy="nameOfPropertyValuer"
                type="text"
              />
              <ValidatedField
                label="Collateral Last Valuation Date"
                id="collateral-information-collateralLastValuationDate"
                name="collateralLastValuationDate"
                data-cy="collateralLastValuationDate"
                type="date"
              />
              <ValidatedField
                label="Insured Flag"
                id="collateral-information-insuredFlag"
                name="insuredFlag"
                data-cy="insuredFlag"
                type="select"
              >
                {collateralInsuredFlagTypesValues.map(collateralInsuredFlagTypes => (
                  <option value={collateralInsuredFlagTypes} key={collateralInsuredFlagTypes}>
                    {collateralInsuredFlagTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Name Of Insurer"
                id="collateral-information-nameOfInsurer"
                name="nameOfInsurer"
                data-cy="nameOfInsurer"
                type="text"
              />
              <ValidatedField
                label="Amount Insured"
                id="collateral-information-amountInsured"
                name="amountInsured"
                data-cy="amountInsured"
                type="text"
                validate={{
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Insurance Expiry Date"
                id="collateral-information-insuranceExpiryDate"
                name="insuranceExpiryDate"
                data-cy="insuranceExpiryDate"
                type="date"
              />
              <ValidatedField
                label="Guarantee Insurers"
                id="collateral-information-guaranteeInsurers"
                name="guaranteeInsurers"
                data-cy="guaranteeInsurers"
                type="text"
              />
              <ValidatedField
                id="collateral-information-bankCode"
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
                id="collateral-information-branchCode"
                name="branchCode"
                data-cy="branchCode"
                label="Branch Code"
                type="select"
                required
              >
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
                id="collateral-information-collateralType"
                name="collateralType"
                data-cy="collateralType"
                label="Collateral Type"
                type="select"
                required
              >
                <option value="" key="0" />
                {collateralTypes
                  ? collateralTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.collateralType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="collateral-information-countyCode"
                name="countyCode"
                data-cy="countyCode"
                label="County Code"
                type="select"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/collateral-information" replace color="info">
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

export default CollateralInformationUpdate;
