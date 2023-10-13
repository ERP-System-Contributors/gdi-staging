import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IPrepaymentMapping } from 'app/shared/model/prepayments/prepayment-mapping.model';
import { getEntities as getPrepaymentMappings } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IDepreciationMethod } from 'app/shared/model/assets/depreciation-method.model';
import { getEntities as getDepreciationMethods } from 'app/entities/assets/depreciation-method/depreciation-method.reducer';
import { IPrepaymentAccount } from 'app/shared/model/prepayments/prepayment-account.model';
import { getEntities as getPrepaymentAccounts } from 'app/entities/prepayments/prepayment-account/prepayment-account.reducer';
import { IAmortizationRecurrence } from 'app/shared/model/prepayments/amortization-recurrence.model';
import { recurrenceFrequency } from 'app/shared/model/enumerations/recurrence-frequency.model';
import { getEntity, updateEntity, createEntity, reset } from './amortization-recurrence.reducer';

export const AmortizationRecurrenceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const prepaymentMappings = useAppSelector(state => state.prepaymentMapping.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const depreciationMethods = useAppSelector(state => state.depreciationMethod.entities);
  const prepaymentAccounts = useAppSelector(state => state.prepaymentAccount.entities);
  const amortizationRecurrenceEntity = useAppSelector(state => state.amortizationRecurrence.entity);
  const loading = useAppSelector(state => state.amortizationRecurrence.loading);
  const updating = useAppSelector(state => state.amortizationRecurrence.updating);
  const updateSuccess = useAppSelector(state => state.amortizationRecurrence.updateSuccess);
  const recurrenceFrequencyValues = Object.keys(recurrenceFrequency);

  const handleClose = () => {
    navigate('/amortization-recurrence' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getPrepaymentMappings({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getDepreciationMethods({}));
    dispatch(getPrepaymentAccounts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.timeOfInstallation = convertDateTimeToServer(values.timeOfInstallation);

    const entity = {
      ...amortizationRecurrenceEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      parameters: mapIdList(values.parameters),
      applicationParameters: mapIdList(values.applicationParameters),
      depreciationMethod: depreciationMethods.find(it => it.id.toString() === values.depreciationMethod.toString()),
      prepaymentAccount: prepaymentAccounts.find(it => it.id.toString() === values.prepaymentAccount.toString()),
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
          timeOfInstallation: displayDefaultDateTime(),
        }
      : {
          amortizationFrequency: 'MONTHLY',
          ...amortizationRecurrenceEntity,
          timeOfInstallation: convertDateTimeFromServer(amortizationRecurrenceEntity.timeOfInstallation),
          placeholders: amortizationRecurrenceEntity?.placeholders?.map(e => e.id.toString()),
          parameters: amortizationRecurrenceEntity?.parameters?.map(e => e.id.toString()),
          applicationParameters: amortizationRecurrenceEntity?.applicationParameters?.map(e => e.id.toString()),
          depreciationMethod: amortizationRecurrenceEntity?.depreciationMethod?.id,
          prepaymentAccount: amortizationRecurrenceEntity?.prepaymentAccount?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="gdiStagingApp.prepaymentsAmortizationRecurrence.home.createOrEditLabel"
            data-cy="AmortizationRecurrenceCreateUpdateHeading"
          >
            Create or edit a Amortization Recurrence
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
                <ValidatedField name="id" required readOnly id="amortization-recurrence-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="First Amortization Date"
                id="amortization-recurrence-firstAmortizationDate"
                name="firstAmortizationDate"
                data-cy="firstAmortizationDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Amortization Frequency"
                id="amortization-recurrence-amortizationFrequency"
                name="amortizationFrequency"
                data-cy="amortizationFrequency"
                type="select"
              >
                {recurrenceFrequencyValues.map(recurrenceFrequency => (
                  <option value={recurrenceFrequency} key={recurrenceFrequency}>
                    {recurrenceFrequency}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Number Of Recurrences"
                id="amortization-recurrence-numberOfRecurrences"
                name="numberOfRecurrences"
                data-cy="numberOfRecurrences"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedBlobField label="Notes" id="amortization-recurrence-notes" name="notes" data-cy="notes" openActionLabel="Open" />
              <ValidatedField
                label="Particulars"
                id="amortization-recurrence-particulars"
                name="particulars"
                data-cy="particulars"
                type="text"
              />
              <ValidatedField
                label="Is Active"
                id="amortization-recurrence-isActive"
                name="isActive"
                data-cy="isActive"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Is Over Written"
                id="amortization-recurrence-isOverWritten"
                name="isOverWritten"
                data-cy="isOverWritten"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Time Of Installation"
                id="amortization-recurrence-timeOfInstallation"
                name="timeOfInstallation"
                data-cy="timeOfInstallation"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Recurrence Guid"
                id="amortization-recurrence-recurrenceGuid"
                name="recurrenceGuid"
                data-cy="recurrenceGuid"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Prepayment Account Guid"
                id="amortization-recurrence-prepaymentAccountGuid"
                name="prepaymentAccountGuid"
                data-cy="prepaymentAccountGuid"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Placeholder"
                id="amortization-recurrence-placeholder"
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
                label="Parameters"
                id="amortization-recurrence-parameters"
                data-cy="parameters"
                type="select"
                multiple
                name="parameters"
              >
                <option value="" key="0" />
                {prepaymentMappings
                  ? prepaymentMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.parameter}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Application Parameters"
                id="amortization-recurrence-applicationParameters"
                data-cy="applicationParameters"
                type="select"
                multiple
                name="applicationParameters"
              >
                <option value="" key="0" />
                {universallyUniqueMappings
                  ? universallyUniqueMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.mappedValue}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="amortization-recurrence-depreciationMethod"
                name="depreciationMethod"
                data-cy="depreciationMethod"
                label="Depreciation Method"
                type="select"
                required
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
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="amortization-recurrence-prepaymentAccount"
                name="prepaymentAccount"
                data-cy="prepaymentAccount"
                label="Prepayment Account"
                type="select"
                required
              >
                <option value="" key="0" />
                {prepaymentAccounts
                  ? prepaymentAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.catalogueNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/amortization-recurrence" replace color="info">
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

export default AmortizationRecurrenceUpdate;
