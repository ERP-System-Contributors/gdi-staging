import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISystemContentType } from 'app/shared/model/system/system-content-type.model';
import { getEntities as getSystemContentTypes } from 'app/entities/system/system-content-type/system-content-type.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IReportContentType } from 'app/shared/model/reports/report-content-type.model';
import { getEntity, updateEntity, createEntity, reset } from './report-content-type.reducer';

export const ReportContentTypeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const systemContentTypes = useAppSelector(state => state.systemContentType.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const reportContentTypeEntity = useAppSelector(state => state.reportContentType.entity);
  const loading = useAppSelector(state => state.reportContentType.loading);
  const updating = useAppSelector(state => state.reportContentType.updating);
  const updateSuccess = useAppSelector(state => state.reportContentType.updateSuccess);

  const handleClose = () => {
    navigate('/report-content-type' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSystemContentTypes({}));
    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...reportContentTypeEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      systemContentType: systemContentTypes.find(it => it.id.toString() === values.systemContentType.toString()),
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
          ...reportContentTypeEntity,
          systemContentType: reportContentTypeEntity?.systemContentType?.id,
          placeholders: reportContentTypeEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.reportsReportContentType.home.createOrEditLabel" data-cy="ReportContentTypeCreateUpdateHeading">
            Create or edit a Report Content Type
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
                <ValidatedField name="id" required readOnly id="report-content-type-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Report Type Name"
                id="report-content-type-reportTypeName"
                name="reportTypeName"
                data-cy="reportTypeName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Report File Extension"
                id="report-content-type-reportFileExtension"
                name="reportFileExtension"
                data-cy="reportFileExtension"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                id="report-content-type-systemContentType"
                name="systemContentType"
                data-cy="systemContentType"
                label="System Content Type"
                type="select"
                required
              >
                <option value="" key="0" />
                {systemContentTypes
                  ? systemContentTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.contentTypeName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="Placeholder"
                id="report-content-type-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/report-content-type" replace color="info">
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

export default ReportContentTypeUpdate;
