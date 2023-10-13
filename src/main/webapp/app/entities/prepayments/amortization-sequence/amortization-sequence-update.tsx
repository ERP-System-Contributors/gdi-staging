import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPrepaymentAccount } from 'app/shared/model/prepayments/prepayment-account.model';
import { getEntities as getPrepaymentAccounts } from 'app/entities/prepayments/prepayment-account/prepayment-account.reducer';
import { IAmortizationRecurrence } from 'app/shared/model/prepayments/amortization-recurrence.model';
import { getEntities as getAmortizationRecurrences } from 'app/entities/prepayments/amortization-recurrence/amortization-recurrence.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IPrepaymentMapping } from 'app/shared/model/prepayments/prepayment-mapping.model';
import { getEntities as getPrepaymentMappings } from 'app/entities/prepayments/prepayment-mapping/prepayment-mapping.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IAmortizationSequence } from 'app/shared/model/prepayments/amortization-sequence.model';
import { getEntity, updateEntity, createEntity, reset } from './amortization-sequence.reducer';

export const AmortizationSequenceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const prepaymentAccounts = useAppSelector(state => state.prepaymentAccount.entities);
  const amortizationRecurrences = useAppSelector(state => state.amortizationRecurrence.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const prepaymentMappings = useAppSelector(state => state.prepaymentMapping.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const amortizationSequenceEntity = useAppSelector(state => state.amortizationSequence.entity);
  const loading = useAppSelector(state => state.amortizationSequence.loading);
  const updating = useAppSelector(state => state.amortizationSequence.updating);
  const updateSuccess = useAppSelector(state => state.amortizationSequence.updateSuccess);

  const handleClose = () => {
    navigate('/amortization-sequence' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPrepaymentAccounts({}));
    dispatch(getAmortizationRecurrences({}));
    dispatch(getPlaceholders({}));
    dispatch(getPrepaymentMappings({}));
    dispatch(getUniversallyUniqueMappings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...amortizationSequenceEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      prepaymentMappings: mapIdList(values.prepaymentMappings),
      applicationParameters: mapIdList(values.applicationParameters),
      prepaymentAccount: prepaymentAccounts.find(it => it.id.toString() === values.prepaymentAccount.toString()),
      amortizationRecurrence: amortizationRecurrences.find(it => it.id.toString() === values.amortizationRecurrence.toString()),
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
          ...amortizationSequenceEntity,
          prepaymentAccount: amortizationSequenceEntity?.prepaymentAccount?.id,
          amortizationRecurrence: amortizationSequenceEntity?.amortizationRecurrence?.id,
          placeholders: amortizationSequenceEntity?.placeholders?.map(e => e.id.toString()),
          prepaymentMappings: amortizationSequenceEntity?.prepaymentMappings?.map(e => e.id.toString()),
          applicationParameters: amortizationSequenceEntity?.applicationParameters?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.prepaymentsAmortizationSequence.home.createOrEditLabel" data-cy="AmortizationSequenceCreateUpdateHeading">
            Create or edit a Amortization Sequence
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
                <ValidatedField name="id" required readOnly id="amortization-sequence-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Prepayment Account Guid"
                id="amortization-sequence-prepaymentAccountGuid"
                name="prepaymentAccountGuid"
                data-cy="prepaymentAccountGuid"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Recurrence Guid"
                id="amortization-sequence-recurrenceGuid"
                name="recurrenceGuid"
                data-cy="recurrenceGuid"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Sequence Number"
                id="amortization-sequence-sequenceNumber"
                name="sequenceNumber"
                data-cy="sequenceNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Particulars"
                id="amortization-sequence-particulars"
                name="particulars"
                data-cy="particulars"
                type="text"
              />
              <ValidatedField
                label="Current Amortization Date"
                id="amortization-sequence-currentAmortizationDate"
                name="currentAmortizationDate"
                data-cy="currentAmortizationDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Previous Amortization Date"
                id="amortization-sequence-previousAmortizationDate"
                name="previousAmortizationDate"
                data-cy="previousAmortizationDate"
                type="date"
              />
              <ValidatedField
                label="Next Amortization Date"
                id="amortization-sequence-nextAmortizationDate"
                name="nextAmortizationDate"
                data-cy="nextAmortizationDate"
                type="date"
              />
              <ValidatedField
                label="Is Commencement Sequence"
                id="amortization-sequence-isCommencementSequence"
                name="isCommencementSequence"
                data-cy="isCommencementSequence"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Is Terminal Sequence"
                id="amortization-sequence-isTerminalSequence"
                name="isTerminalSequence"
                data-cy="isTerminalSequence"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Amortization Amount"
                id="amortization-sequence-amortizationAmount"
                name="amortizationAmount"
                data-cy="amortizationAmount"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Sequence Guid"
                id="amortization-sequence-sequenceGuid"
                name="sequenceGuid"
                data-cy="sequenceGuid"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                id="amortization-sequence-prepaymentAccount"
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
              <ValidatedField
                id="amortization-sequence-amortizationRecurrence"
                name="amortizationRecurrence"
                data-cy="amortizationRecurrence"
                label="Amortization Recurrence"
                type="select"
                required
              >
                <option value="" key="0" />
                {amortizationRecurrences
                  ? amortizationRecurrences.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.particulars}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="Placeholder"
                id="amortization-sequence-placeholder"
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
                label="Prepayment Mapping"
                id="amortization-sequence-prepaymentMapping"
                data-cy="prepaymentMapping"
                type="select"
                multiple
                name="prepaymentMappings"
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
                id="amortization-sequence-applicationParameters"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/amortization-sequence" replace color="info">
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

export default AmortizationSequenceUpdate;
