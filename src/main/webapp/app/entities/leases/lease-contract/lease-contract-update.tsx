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
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IContractMetadata } from 'app/shared/model/contract/contract-metadata.model';
import { getEntities as getContractMetadata } from 'app/entities/contract/contract-metadata/contract-metadata.reducer';
import { ILeaseContract } from 'app/shared/model/leases/lease-contract.model';
import { getEntity, updateEntity, createEntity, reset } from './lease-contract.reducer';

export const LeaseContractUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const contractMetadata = useAppSelector(state => state.contractMetadata.entities);
  const leaseContractEntity = useAppSelector(state => state.leaseContract.entity);
  const loading = useAppSelector(state => state.leaseContract.loading);
  const updating = useAppSelector(state => state.leaseContract.updating);
  const updateSuccess = useAppSelector(state => state.leaseContract.updateSuccess);

  const handleClose = () => {
    navigate('/lease-contract' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getBusinessDocuments({}));
    dispatch(getContractMetadata({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...leaseContractEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      systemMappings: mapIdList(values.systemMappings),
      businessDocuments: mapIdList(values.businessDocuments),
      contractMetadata: mapIdList(values.contractMetadata),
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
          ...leaseContractEntity,
          placeholders: leaseContractEntity?.placeholders?.map(e => e.id.toString()),
          systemMappings: leaseContractEntity?.systemMappings?.map(e => e.id.toString()),
          businessDocuments: leaseContractEntity?.businessDocuments?.map(e => e.id.toString()),
          contractMetadata: leaseContractEntity?.contractMetadata?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.leasesLeaseContract.home.createOrEditLabel" data-cy="LeaseContractCreateUpdateHeading">
            Create or edit a Lease Contract
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
                <ValidatedField name="id" required readOnly id="lease-contract-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Booking Id"
                id="lease-contract-bookingId"
                name="bookingId"
                data-cy="bookingId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Lease Title"
                id="lease-contract-leaseTitle"
                name="leaseTitle"
                data-cy="leaseTitle"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Identifier"
                id="lease-contract-identifier"
                name="identifier"
                data-cy="identifier"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Description" id="lease-contract-description" name="description" data-cy="description" type="text" />
              <ValidatedField
                label="Commencement Date"
                id="lease-contract-commencementDate"
                name="commencementDate"
                data-cy="commencementDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Terminal Date"
                id="lease-contract-terminalDate"
                name="terminalDate"
                data-cy="terminalDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Placeholder"
                id="lease-contract-placeholder"
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
                label="System Mappings"
                id="lease-contract-systemMappings"
                data-cy="systemMappings"
                type="select"
                multiple
                name="systemMappings"
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
                label="Business Document"
                id="lease-contract-businessDocument"
                data-cy="businessDocument"
                type="select"
                multiple
                name="businessDocuments"
              >
                <option value="" key="0" />
                {businessDocuments
                  ? businessDocuments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.documentTitle}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Contract Metadata"
                id="lease-contract-contractMetadata"
                data-cy="contractMetadata"
                type="select"
                multiple
                name="contractMetadata"
              >
                <option value="" key="0" />
                {contractMetadata
                  ? contractMetadata.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.contractTitle}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/lease-contract" replace color="info">
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

export default LeaseContractUpdate;
