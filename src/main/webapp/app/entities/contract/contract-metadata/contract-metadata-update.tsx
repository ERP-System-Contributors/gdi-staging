import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getContractMetadata } from 'app/entities/contract/contract-metadata/contract-metadata.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/people/application-user/application-user.reducer';
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { getEntities as getSecurityClearances } from 'app/entities/people/security-clearance/security-clearance.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IContractMetadata } from 'app/shared/model/contract/contract-metadata.model';
import { ContractType } from 'app/shared/model/enumerations/contract-type.model';
import { ContractStatus } from 'app/shared/model/enumerations/contract-status.model';
import { getEntity, updateEntity, createEntity, reset } from './contract-metadata.reducer';

export const ContractMetadataUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const contractMetadata = useAppSelector(state => state.contractMetadata.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const securityClearances = useAppSelector(state => state.securityClearance.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const contractMetadataEntity = useAppSelector(state => state.contractMetadata.entity);
  const loading = useAppSelector(state => state.contractMetadata.loading);
  const updating = useAppSelector(state => state.contractMetadata.updating);
  const updateSuccess = useAppSelector(state => state.contractMetadata.updateSuccess);
  const contractTypeValues = Object.keys(ContractType);
  const contractStatusValues = Object.keys(ContractStatus);

  const handleClose = () => {
    navigate('/contract-metadata' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getContractMetadata({}));
    dispatch(getDealers({}));
    dispatch(getApplicationUsers({}));
    dispatch(getSecurityClearances({}));
    dispatch(getPlaceholders({}));
    dispatch(getBusinessDocuments({}));
    dispatch(getUniversallyUniqueMappings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...contractMetadataEntity,
      ...values,
      relatedContracts: mapIdList(values.relatedContracts),
      signatories: mapIdList(values.signatories),
      placeholders: mapIdList(values.placeholders),
      contractDocumentFiles: mapIdList(values.contractDocumentFiles),
      contractMappings: mapIdList(values.contractMappings),
      department: dealers.find(it => it.id.toString() === values.department.toString()),
      contractPartner: dealers.find(it => it.id.toString() === values.contractPartner.toString()),
      responsiblePerson: applicationUsers.find(it => it.id.toString() === values.responsiblePerson.toString()),
      securityClearance: securityClearances.find(it => it.id.toString() === values.securityClearance.toString()),
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
          typeOfContract: 'SUPPLIER',
          contractStatus: 'ACTIVE',
          ...contractMetadataEntity,
          relatedContracts: contractMetadataEntity?.relatedContracts?.map(e => e.id.toString()),
          department: contractMetadataEntity?.department?.id,
          contractPartner: contractMetadataEntity?.contractPartner?.id,
          responsiblePerson: contractMetadataEntity?.responsiblePerson?.id,
          signatories: contractMetadataEntity?.signatories?.map(e => e.id.toString()),
          securityClearance: contractMetadataEntity?.securityClearance?.id,
          placeholders: contractMetadataEntity?.placeholders?.map(e => e.id.toString()),
          contractDocumentFiles: contractMetadataEntity?.contractDocumentFiles?.map(e => e.id.toString()),
          contractMappings: contractMetadataEntity?.contractMappings?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.contractContractMetadata.home.createOrEditLabel" data-cy="ContractMetadataCreateUpdateHeading">
            Create or edit a Contract Metadata
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
                <ValidatedField name="id" required readOnly id="contract-metadata-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Description" id="contract-metadata-description" name="description" data-cy="description" type="text" />
              <ValidatedField
                label="Type Of Contract"
                id="contract-metadata-typeOfContract"
                name="typeOfContract"
                data-cy="typeOfContract"
                type="select"
              >
                {contractTypeValues.map(contractType => (
                  <option value={contractType} key={contractType}>
                    {contractType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Contract Status"
                id="contract-metadata-contractStatus"
                name="contractStatus"
                data-cy="contractStatus"
                type="select"
              >
                {contractStatusValues.map(contractStatus => (
                  <option value={contractStatus} key={contractStatus}>
                    {contractStatus}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Start Date"
                id="contract-metadata-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Termination Date"
                id="contract-metadata-terminationDate"
                name="terminationDate"
                data-cy="terminationDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Comments And Attachment"
                id="contract-metadata-commentsAndAttachment"
                name="commentsAndAttachment"
                data-cy="commentsAndAttachment"
                type="textarea"
              />
              <ValidatedField
                label="Contract Title"
                id="contract-metadata-contractTitle"
                name="contractTitle"
                data-cy="contractTitle"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Contract Identifier"
                id="contract-metadata-contractIdentifier"
                name="contractIdentifier"
                data-cy="contractIdentifier"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Contract Identifier Short"
                id="contract-metadata-contractIdentifierShort"
                name="contractIdentifierShort"
                data-cy="contractIdentifierShort"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  minLength: { value: 6, message: 'This field is required to be at least 6 characters.' },
                }}
              />
              <ValidatedField
                label="Related Contracts"
                id="contract-metadata-relatedContracts"
                data-cy="relatedContracts"
                type="select"
                multiple
                name="relatedContracts"
              >
                <option value="" key="0" />
                {contractMetadata
                  ? contractMetadata.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.description}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="contract-metadata-department" name="department" data-cy="department" label="Department" type="select">
                <option value="" key="0" />
                {dealers
                  ? dealers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.dealerName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="contract-metadata-contractPartner"
                name="contractPartner"
                data-cy="contractPartner"
                label="Contract Partner"
                type="select"
              >
                <option value="" key="0" />
                {dealers
                  ? dealers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.dealerName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="contract-metadata-responsiblePerson"
                name="responsiblePerson"
                data-cy="responsiblePerson"
                label="Responsible Person"
                type="select"
              >
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
                label="Signatory"
                id="contract-metadata-signatory"
                data-cy="signatory"
                type="select"
                multiple
                name="signatories"
              >
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
                id="contract-metadata-securityClearance"
                name="securityClearance"
                data-cy="securityClearance"
                label="Security Clearance"
                type="select"
              >
                <option value="" key="0" />
                {securityClearances
                  ? securityClearances.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.clearanceLevel}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="contract-metadata-placeholder"
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
                label="Contract Document File"
                id="contract-metadata-contractDocumentFile"
                data-cy="contractDocumentFile"
                type="select"
                multiple
                name="contractDocumentFiles"
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
                label="Contract Mappings"
                id="contract-metadata-contractMappings"
                data-cy="contractMappings"
                type="select"
                multiple
                name="contractMappings"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/contract-metadata" replace color="info">
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

export default ContractMetadataUpdate;
