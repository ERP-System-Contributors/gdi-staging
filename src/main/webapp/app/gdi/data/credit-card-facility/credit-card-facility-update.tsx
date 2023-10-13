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
import { ICreditCardOwnership } from 'app/shared/model/gdi/credit-card-ownership.model';
import { getEntities as getCreditCardOwnerships } from 'app/entities/gdi/credit-card-ownership/credit-card-ownership.reducer';
import { IIsoCurrencyCode } from 'app/shared/model/gdi/iso-currency-code.model';
import { getEntities as getIsoCurrencyCodes } from 'app/entities/gdi/iso-currency-code/iso-currency-code.reducer';
import { ICreditCardFacility } from 'app/shared/model/gdi-data/credit-card-facility.model';
import { getEntity, updateEntity, createEntity, reset } from './credit-card-facility.reducer';

export const CreditCardFacilityUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const creditCardOwnerships = useAppSelector(state => state.creditCardOwnership.entities);
  const isoCurrencyCodes = useAppSelector(state => state.isoCurrencyCode.entities);
  const creditCardFacilityEntity = useAppSelector(state => state.creditCardFacility.entity);
  const loading = useAppSelector(state => state.creditCardFacility.loading);
  const updating = useAppSelector(state => state.creditCardFacility.updating);
  const updateSuccess = useAppSelector(state => state.creditCardFacility.updateSuccess);

  const handleClose = () => {
    navigate('/credit-card-facility' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getCreditCardOwnerships({}));
    dispatch(getIsoCurrencyCodes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...creditCardFacilityEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      customerCategory: creditCardOwnerships.find(it => it.id.toString() === values.customerCategory.toString()),
      currencyCode: isoCurrencyCodes.find(it => it.id.toString() === values.currencyCode.toString()),
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
          ...creditCardFacilityEntity,
          bankCode: creditCardFacilityEntity?.bankCode?.id,
          customerCategory: creditCardFacilityEntity?.customerCategory?.id,
          currencyCode: creditCardFacilityEntity?.currencyCode?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataCreditCardFacility.home.createOrEditLabel" data-cy="CreditCardFacilityCreateUpdateHeading">
            Create or edit a Credit Card Facility
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
                <ValidatedField name="id" required readOnly id="credit-card-facility-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="credit-card-facility-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Total Number Of Active Credit Cards"
                id="credit-card-facility-totalNumberOfActiveCreditCards"
                name="totalNumberOfActiveCreditCards"
                data-cy="totalNumberOfActiveCreditCards"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total Credit Card Limits In CCY"
                id="credit-card-facility-totalCreditCardLimitsInCCY"
                name="totalCreditCardLimitsInCCY"
                data-cy="totalCreditCardLimitsInCCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total Credit Card Limits In LCY"
                id="credit-card-facility-totalCreditCardLimitsInLCY"
                name="totalCreditCardLimitsInLCY"
                data-cy="totalCreditCardLimitsInLCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total Credit Card Amount Utilised In CCY"
                id="credit-card-facility-totalCreditCardAmountUtilisedInCCY"
                name="totalCreditCardAmountUtilisedInCCY"
                data-cy="totalCreditCardAmountUtilisedInCCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total Credit Card Amount Utilised In Lcy"
                id="credit-card-facility-totalCreditCardAmountUtilisedInLcy"
                name="totalCreditCardAmountUtilisedInLcy"
                data-cy="totalCreditCardAmountUtilisedInLcy"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total NPA Credit Card Amount In FCY"
                id="credit-card-facility-totalNPACreditCardAmountInFCY"
                name="totalNPACreditCardAmountInFCY"
                data-cy="totalNPACreditCardAmountInFCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total NPA Credit Card Amount In LCY"
                id="credit-card-facility-totalNPACreditCardAmountInLCY"
                name="totalNPACreditCardAmountInLCY"
                data-cy="totalNPACreditCardAmountInLCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                id="credit-card-facility-bankCode"
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
                id="credit-card-facility-customerCategory"
                name="customerCategory"
                data-cy="customerCategory"
                label="Customer Category"
                type="select"
                required
              >
                <option value="" key="0" />
                {creditCardOwnerships
                  ? creditCardOwnerships.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.creditCardOwnershipCategoryType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="credit-card-facility-currencyCode"
                name="currencyCode"
                data-cy="currencyCode"
                label="Currency Code"
                type="select"
                required
              >
                <option value="" key="0" />
                {isoCurrencyCodes
                  ? isoCurrencyCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.alphabeticCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/credit-card-facility" replace color="info">
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

export default CreditCardFacilityUpdate;
