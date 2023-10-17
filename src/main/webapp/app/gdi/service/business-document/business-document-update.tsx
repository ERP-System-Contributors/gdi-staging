import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/people/application-user/application-user.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IAlgorithm } from 'app/shared/model/system/algorithm.model';
import { getEntities as getAlgorithms } from 'app/entities/system/algorithm/algorithm.reducer';
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { getEntities as getSecurityClearances } from 'app/entities/people/security-clearance/security-clearance.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntity, updateEntity, createEntity, reset } from './business-document.reducer';

export const BusinessDocumentUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const algorithms = useAppSelector(state => state.algorithm.entities);
  const securityClearances = useAppSelector(state => state.securityClearance.entities);
  const businessDocumentEntity = useAppSelector(state => state.businessDocument.entity);
  const loading = useAppSelector(state => state.businessDocument.loading);
  const updating = useAppSelector(state => state.businessDocument.updating);
  const updateSuccess = useAppSelector(state => state.businessDocument.updateSuccess);

  const handleClose = () => {
    navigate('/business-document' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getApplicationUsers({}));
    dispatch(getDealers({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getPlaceholders({}));
    dispatch(getAlgorithms({}));
    dispatch(getSecurityClearances({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.lastModified = convertDateTimeToServer(values.lastModified);

    const entity = {
      ...businessDocumentEntity,
      ...values,
      applicationMappings: mapIdList(values.applicationMappings),
      placeholders: mapIdList(values.placeholders),
      createdBy: applicationUsers.find(it => it.id.toString() === values.createdBy.toString()),
      lastModifiedBy: applicationUsers.find(it => it.id.toString() === values.lastModifiedBy.toString()),
      originatingDepartment: dealers.find(it => it.id.toString() === values.originatingDepartment.toString()),
      fileChecksumAlgorithm: algorithms.find(it => it.id.toString() === values.fileChecksumAlgorithm.toString()),
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
      ? {
          lastModified: displayDefaultDateTime(),
        }
      : {
          ...businessDocumentEntity,
          lastModified: convertDateTimeFromServer(businessDocumentEntity.lastModified),
          createdBy: businessDocumentEntity?.createdBy?.id,
          lastModifiedBy: businessDocumentEntity?.lastModifiedBy?.id,
          originatingDepartment: businessDocumentEntity?.originatingDepartment?.id,
          applicationMappings: businessDocumentEntity?.applicationMappings?.map(e => e.id.toString()),
          placeholders: businessDocumentEntity?.placeholders?.map(e => e.id.toString()),
          fileChecksumAlgorithm: businessDocumentEntity?.fileChecksumAlgorithm?.id,
          securityClearance: businessDocumentEntity?.securityClearance?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.documentationBusinessDocument.home.createOrEditLabel" data-cy="BusinessDocumentCreateUpdateHeading">
            Create or edit a Business Document
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
                <ValidatedField name="id" required readOnly id="business-document-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Document Title"
                id="business-document-documentTitle"
                name="documentTitle"
                data-cy="documentTitle"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Description" id="business-document-description" name="description" data-cy="description" type="text" />
              <ValidatedField
                label="Document Serial"
                id="business-document-documentSerial"
                name="documentSerial"
                data-cy="documentSerial"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Last Modified"
                id="business-document-lastModified"
                name="lastModified"
                data-cy="lastModified"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Attachment File Path"
                id="business-document-attachmentFilePath"
                name="attachmentFilePath"
                data-cy="attachmentFilePath"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedBlobField
                label="Document File"
                id="business-document-documentFile"
                name="documentFile"
                data-cy="documentFile"
                openActionLabel="Open"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="File Tampered"
                id="business-document-fileTampered"
                name="fileTampered"
                data-cy="fileTampered"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Document File Checksum"
                id="business-document-documentFileChecksum"
                name="documentFileChecksum"
                data-cy="documentFileChecksum"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                id="business-document-createdBy"
                name="createdBy"
                data-cy="createdBy"
                label="Created By"
                type="select"
                required
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
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="business-document-lastModifiedBy"
                name="lastModifiedBy"
                data-cy="lastModifiedBy"
                label="Last Modified By"
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
                id="business-document-originatingDepartment"
                name="originatingDepartment"
                data-cy="originatingDepartment"
                label="Originating Department"
                type="select"
                required
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
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="Application Mappings"
                id="business-document-applicationMappings"
                data-cy="applicationMappings"
                type="select"
                multiple
                name="applicationMappings"
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
              <ValidatedField
                label="Placeholder"
                id="business-document-placeholder"
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
                id="business-document-fileChecksumAlgorithm"
                name="fileChecksumAlgorithm"
                data-cy="fileChecksumAlgorithm"
                label="File Checksum Algorithm"
                type="select"
                required
              >
                <option value="" key="0" />
                {algorithms
                  ? algorithms.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="business-document-securityClearance"
                name="securityClearance"
                data-cy="securityClearance"
                label="Security Clearance"
                type="select"
                required
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
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/business-document" replace color="info">
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

export default BusinessDocumentUpdate;
