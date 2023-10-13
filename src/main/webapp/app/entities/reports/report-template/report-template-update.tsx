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
import { IReportTemplate } from 'app/shared/model/reports/report-template.model';
import { getEntity, updateEntity, createEntity, reset } from './report-template.reducer';

export const ReportTemplateUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const reportTemplateEntity = useAppSelector(state => state.reportTemplate.entity);
  const loading = useAppSelector(state => state.reportTemplate.loading);
  const updating = useAppSelector(state => state.reportTemplate.updating);
  const updateSuccess = useAppSelector(state => state.reportTemplate.updateSuccess);

  const handleClose = () => {
    navigate('/report-template' + location.search);
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
      ...reportTemplateEntity,
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
          ...reportTemplateEntity,
          placeholders: reportTemplateEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.reportsReportTemplate.home.createOrEditLabel" data-cy="ReportTemplateCreateUpdateHeading">
            Create or edit a Report Template
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
                <ValidatedField name="id" required readOnly id="report-template-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Catalogue Number"
                id="report-template-catalogueNumber"
                name="catalogueNumber"
                data-cy="catalogueNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Description"
                id="report-template-description"
                name="description"
                data-cy="description"
                type="textarea"
              />
              <ValidatedBlobField label="Notes" id="report-template-notes" name="notes" data-cy="notes" openActionLabel="Open" />
              <ValidatedBlobField
                label="Report File"
                id="report-template-reportFile"
                name="reportFile"
                data-cy="reportFile"
                openActionLabel="Open"
              />
              <ValidatedBlobField
                label="Compile Report File"
                id="report-template-compileReportFile"
                name="compileReportFile"
                data-cy="compileReportFile"
                openActionLabel="Open"
              />
              <ValidatedField
                label="Placeholder"
                id="report-template-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/report-template" replace color="info">
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

export default ReportTemplateUpdate;
