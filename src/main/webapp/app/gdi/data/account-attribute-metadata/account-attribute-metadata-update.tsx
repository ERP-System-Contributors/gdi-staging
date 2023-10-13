import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IGdiMasterDataIndex } from 'app/shared/model/gdi/gdi-master-data-index.model';
import { getEntities as getGdiMasterDataIndices } from 'app/entities/gdi/gdi-master-data-index/gdi-master-data-index.reducer';
import { IAccountAttributeMetadata } from 'app/shared/model/gdi-data/account-attribute-metadata.model';
import { MandatoryFieldFlagTypes } from 'app/shared/model/enumerations/mandatory-field-flag-types.model';
import { getEntity, updateEntity, createEntity, reset } from './account-attribute-metadata.reducer';

export const AccountAttributeMetadataUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const gdiMasterDataIndices = useAppSelector(state => state.gdiMasterDataIndex.entities);
  const accountAttributeMetadataEntity = useAppSelector(state => state.accountAttributeMetadata.entity);
  const loading = useAppSelector(state => state.accountAttributeMetadata.loading);
  const updating = useAppSelector(state => state.accountAttributeMetadata.updating);
  const updateSuccess = useAppSelector(state => state.accountAttributeMetadata.updateSuccess);
  const mandatoryFieldFlagTypesValues = Object.keys(MandatoryFieldFlagTypes);

  const handleClose = () => {
    navigate('/account-attribute-metadata' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getGdiMasterDataIndices({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...accountAttributeMetadataEntity,
      ...values,
      standardInputTemplate: gdiMasterDataIndices.find(it => it.id.toString() === values.standardInputTemplate.toString()),
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
          mandatoryFieldFlag: 'Y',
          ...accountAttributeMetadataEntity,
          standardInputTemplate: accountAttributeMetadataEntity?.standardInputTemplate?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="gdiStagingApp.gdiDataAccountAttributeMetadata.home.createOrEditLabel"
            data-cy="AccountAttributeMetadataCreateUpdateHeading"
          >
            Create or edit a Account Attribute Metadata
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
                <ValidatedField name="id" required readOnly id="account-attribute-metadata-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Precedence"
                id="account-attribute-metadata-precedence"
                name="precedence"
                data-cy="precedence"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Column Name"
                id="account-attribute-metadata-columnName"
                name="columnName"
                data-cy="columnName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Short Name"
                id="account-attribute-metadata-shortName"
                name="shortName"
                data-cy="shortName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Detailed Definition"
                id="account-attribute-metadata-detailedDefinition"
                name="detailedDefinition"
                data-cy="detailedDefinition"
                type="textarea"
              />
              <ValidatedField
                label="Data Type"
                id="account-attribute-metadata-dataType"
                name="dataType"
                data-cy="dataType"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Length" id="account-attribute-metadata-length" name="length" data-cy="length" type="text" />
              <ValidatedField
                label="Column Index"
                id="account-attribute-metadata-columnIndex"
                name="columnIndex"
                data-cy="columnIndex"
                type="text"
              />
              <ValidatedField
                label="Mandatory Field Flag"
                id="account-attribute-metadata-mandatoryFieldFlag"
                name="mandatoryFieldFlag"
                data-cy="mandatoryFieldFlag"
                type="select"
              >
                {mandatoryFieldFlagTypesValues.map(mandatoryFieldFlagTypes => (
                  <option value={mandatoryFieldFlagTypes} key={mandatoryFieldFlagTypes}>
                    {mandatoryFieldFlagTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Business Validation"
                id="account-attribute-metadata-businessValidation"
                name="businessValidation"
                data-cy="businessValidation"
                type="textarea"
              />
              <ValidatedField
                label="Technical Validation"
                id="account-attribute-metadata-technicalValidation"
                name="technicalValidation"
                data-cy="technicalValidation"
                type="textarea"
              />
              <ValidatedField
                label="Db Column Name"
                id="account-attribute-metadata-dbColumnName"
                name="dbColumnName"
                data-cy="dbColumnName"
                type="text"
              />
              <ValidatedField
                label="Metadata Version"
                id="account-attribute-metadata-metadataVersion"
                name="metadataVersion"
                data-cy="metadataVersion"
                type="text"
              />
              <ValidatedField
                id="account-attribute-metadata-standardInputTemplate"
                name="standardInputTemplate"
                data-cy="standardInputTemplate"
                label="Standard Input Template"
                type="select"
              >
                <option value="" key="0" />
                {gdiMasterDataIndices
                  ? gdiMasterDataIndices.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/account-attribute-metadata" replace color="info">
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

export default AccountAttributeMetadataUpdate;
