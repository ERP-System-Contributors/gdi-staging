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
import { IFileUpload } from 'app/shared/model/files/file-upload.model';
import { getEntity, updateEntity, createEntity, reset } from './file-upload.reducer';

export const FileUploadUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const fileUploadEntity = useAppSelector(state => state.fileUpload.entity);
  const loading = useAppSelector(state => state.fileUpload.loading);
  const updating = useAppSelector(state => state.fileUpload.updating);
  const updateSuccess = useAppSelector(state => state.fileUpload.updateSuccess);

  const handleClose = () => {
    navigate('/file-upload' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...fileUploadEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
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
          ...fileUploadEntity,
          placeholders: fileUploadEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.filesFileUpload.home.createOrEditLabel" data-cy="FileUploadCreateUpdateHeading">
            Create or edit a File Upload
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="file-upload-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Description"
                id="file-upload-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="File Name"
                id="file-upload-fileName"
                name="fileName"
                data-cy="fileName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Period From" id="file-upload-periodFrom" name="periodFrom" data-cy="periodFrom" type="date" />
              <ValidatedField label="Period To" id="file-upload-periodTo" name="periodTo" data-cy="periodTo" type="date" />
              <ValidatedField
                label="File Type Id"
                id="file-upload-fileTypeId"
                name="fileTypeId"
                data-cy="fileTypeId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedBlobField
                label="Data File"
                id="file-upload-dataFile"
                name="dataFile"
                data-cy="dataFile"
                openActionLabel="Open"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Upload Successful"
                id="file-upload-uploadSuccessful"
                name="uploadSuccessful"
                data-cy="uploadSuccessful"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Upload Processed"
                id="file-upload-uploadProcessed"
                name="uploadProcessed"
                data-cy="uploadProcessed"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Upload Token"
                id="file-upload-uploadToken"
                name="uploadToken"
                data-cy="uploadToken"
                type="text"
                validate={{}}
              />
              <ValidatedField
                label="Placeholder"
                id="file-upload-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/file-upload" replace color="info">
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

export default FileUploadUpdate;
