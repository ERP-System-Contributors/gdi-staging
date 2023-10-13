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
import { ILeaseContract } from 'app/shared/model/leases/lease-contract.model';
import { getEntities as getLeaseContracts } from 'app/entities/leases/lease-contract/lease-contract.reducer';
import { ILeaseModelMetadata } from 'app/shared/model/leases/lease-model-metadata.model';
import { getEntities as getLeaseModelMetadata } from 'app/entities/leases/lease-model-metadata/lease-model-metadata.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { ILeaseLiabilityScheduleItem } from 'app/shared/model/leases/lease-liability-schedule-item.model';
import { getEntity, updateEntity, createEntity, reset } from './lease-liability-schedule-item.reducer';

export const LeaseLiabilityScheduleItemUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const leaseContracts = useAppSelector(state => state.leaseContract.entities);
  const leaseModelMetadata = useAppSelector(state => state.leaseModelMetadata.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const leaseLiabilityScheduleItemEntity = useAppSelector(state => state.leaseLiabilityScheduleItem.entity);
  const loading = useAppSelector(state => state.leaseLiabilityScheduleItem.loading);
  const updating = useAppSelector(state => state.leaseLiabilityScheduleItem.updating);
  const updateSuccess = useAppSelector(state => state.leaseLiabilityScheduleItem.updateSuccess);

  const handleClose = () => {
    navigate('/lease-liability-schedule-item' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getLeaseContracts({}));
    dispatch(getLeaseModelMetadata({}));
    dispatch(getUniversallyUniqueMappings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...leaseLiabilityScheduleItemEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      universallyUniqueMappings: mapIdList(values.universallyUniqueMappings),
      leaseContract: leaseContracts.find(it => it.id.toString() === values.leaseContract.toString()),
      leaseModelMetadata: leaseModelMetadata.find(it => it.id.toString() === values.leaseModelMetadata.toString()),
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
          ...leaseLiabilityScheduleItemEntity,
          placeholders: leaseLiabilityScheduleItemEntity?.placeholders?.map(e => e.id.toString()),
          leaseContract: leaseLiabilityScheduleItemEntity?.leaseContract?.id,
          leaseModelMetadata: leaseLiabilityScheduleItemEntity?.leaseModelMetadata?.id,
          universallyUniqueMappings: leaseLiabilityScheduleItemEntity?.universallyUniqueMappings?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="gdiStagingApp.leasesLeaseLiabilityScheduleItem.home.createOrEditLabel"
            data-cy="LeaseLiabilityScheduleItemCreateUpdateHeading"
          >
            Create or edit a Lease Liability Schedule Item
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
                  id="lease-liability-schedule-item-id"
                  label="ID"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label="Sequence Number"
                id="lease-liability-schedule-item-sequenceNumber"
                name="sequenceNumber"
                data-cy="sequenceNumber"
                type="text"
              />
              <ValidatedField
                label="Period Included"
                id="lease-liability-schedule-item-periodIncluded"
                name="periodIncluded"
                data-cy="periodIncluded"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Period Start Date"
                id="lease-liability-schedule-item-periodStartDate"
                name="periodStartDate"
                data-cy="periodStartDate"
                type="date"
              />
              <ValidatedField
                label="Period End Date"
                id="lease-liability-schedule-item-periodEndDate"
                name="periodEndDate"
                data-cy="periodEndDate"
                type="date"
              />
              <ValidatedField
                label="Opening Balance"
                id="lease-liability-schedule-item-openingBalance"
                name="openingBalance"
                data-cy="openingBalance"
                type="text"
              />
              <ValidatedField
                label="Cash Payment"
                id="lease-liability-schedule-item-cashPayment"
                name="cashPayment"
                data-cy="cashPayment"
                type="text"
              />
              <ValidatedField
                label="Principal Payment"
                id="lease-liability-schedule-item-principalPayment"
                name="principalPayment"
                data-cy="principalPayment"
                type="text"
              />
              <ValidatedField
                label="Interest Payment"
                id="lease-liability-schedule-item-interestPayment"
                name="interestPayment"
                data-cy="interestPayment"
                type="text"
              />
              <ValidatedField
                label="Outstanding Balance"
                id="lease-liability-schedule-item-outstandingBalance"
                name="outstandingBalance"
                data-cy="outstandingBalance"
                type="text"
              />
              <ValidatedField
                label="Interest Payable Opening"
                id="lease-liability-schedule-item-interestPayableOpening"
                name="interestPayableOpening"
                data-cy="interestPayableOpening"
                type="text"
              />
              <ValidatedField
                label="Interest Expense Accrued"
                id="lease-liability-schedule-item-interestExpenseAccrued"
                name="interestExpenseAccrued"
                data-cy="interestExpenseAccrued"
                type="text"
              />
              <ValidatedField
                label="Interest Payable Balance"
                id="lease-liability-schedule-item-interestPayableBalance"
                name="interestPayableBalance"
                data-cy="interestPayableBalance"
                type="text"
              />
              <ValidatedField
                label="Placeholder"
                id="lease-liability-schedule-item-placeholder"
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
                id="lease-liability-schedule-item-leaseContract"
                name="leaseContract"
                data-cy="leaseContract"
                label="Lease Contract"
                type="select"
                required
              >
                <option value="" key="0" />
                {leaseContracts
                  ? leaseContracts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.bookingId}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="lease-liability-schedule-item-leaseModelMetadata"
                name="leaseModelMetadata"
                data-cy="leaseModelMetadata"
                label="Lease Model Metadata"
                type="select"
              >
                <option value="" key="0" />
                {leaseModelMetadata
                  ? leaseModelMetadata.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.modelTitle}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Universally Unique Mapping"
                id="lease-liability-schedule-item-universallyUniqueMapping"
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
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/lease-liability-schedule-item"
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

export default LeaseLiabilityScheduleItemUpdate;
