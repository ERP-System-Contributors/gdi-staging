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
import { IFileType } from 'app/shared/model/files/file-type.model';
import { FileMediumTypes } from 'app/shared/model/enumerations/file-medium-types.model';
import { FileModelType } from 'app/shared/model/enumerations/file-model-type.model';
import { getEntity, updateEntity, createEntity, reset } from './file-type.reducer';

export const FileTypeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const fileTypeEntity = useAppSelector(state => state.fileType.entity);
  const loading = useAppSelector(state => state.fileType.loading);
  const updating = useAppSelector(state => state.fileType.updating);
  const updateSuccess = useAppSelector(state => state.fileType.updateSuccess);
  const fileMediumTypesValues = Object.keys(FileMediumTypes);
  const fileModelTypeValues = Object.keys(FileModelType);

  const handleClose = () => {
    navigate('/file-type' + location.search);
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
      ...fileTypeEntity,
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
          fileMediumType: 'EXCEL',
          fileType: 'CURRENCY_LIST',
          ...fileTypeEntity,
          placeholders: fileTypeEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.filesFileType.home.createOrEditLabel" data-cy="FileTypeCreateUpdateHeading">
            Create or edit a File Type
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="file-type-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="File Type Name"
                id="file-type-fileTypeName"
                name="fileTypeName"
                data-cy="fileTypeName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="File Medium Type"
                id="file-type-fileMediumType"
                name="fileMediumType"
                data-cy="fileMediumType"
                type="select"
              >
                {fileMediumTypesValues.map(fileMediumTypes => (
                  <option value={fileMediumTypes} key={fileMediumTypes}>
                    {fileMediumTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Description" id="file-type-description" name="description" data-cy="description" type="text" />
              <ValidatedBlobField
                label="File Template"
                id="file-type-fileTemplate"
                name="fileTemplate"
                data-cy="fileTemplate"
                openActionLabel="Open"
              />
              <ValidatedField label="File Type" id="file-type-fileType" name="fileType" data-cy="fileType" type="select">
                {fileModelTypeValues.map(fileModelType => (
                  <option value={fileModelType} key={fileModelType}>
                    {fileModelType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="file-type-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/file-type" replace color="info">
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

export default FileTypeUpdate;
