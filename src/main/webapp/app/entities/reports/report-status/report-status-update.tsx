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
import { IProcessStatus } from 'app/shared/model/system/process-status.model';
import { getEntities as getProcessStatuses } from 'app/entities/system/process-status/process-status.reducer';
import { IReportStatus } from 'app/shared/model/reports/report-status.model';
import { getEntity, updateEntity, createEntity, reset } from './report-status.reducer';

export const ReportStatusUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const processStatuses = useAppSelector(state => state.processStatus.entities);
  const reportStatusEntity = useAppSelector(state => state.reportStatus.entity);
  const loading = useAppSelector(state => state.reportStatus.loading);
  const updating = useAppSelector(state => state.reportStatus.updating);
  const updateSuccess = useAppSelector(state => state.reportStatus.updateSuccess);

  const handleClose = () => {
    navigate('/report-status' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getProcessStatuses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...reportStatusEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      processStatus: processStatuses.find(it => it.id.toString() === values.processStatus.toString()),
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
          ...reportStatusEntity,
          placeholders: reportStatusEntity?.placeholders?.map(e => e.id.toString()),
          processStatus: reportStatusEntity?.processStatus?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.reportsReportStatus.home.createOrEditLabel" data-cy="ReportStatusCreateUpdateHeading">
            Create or edit a Report Status
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
                <ValidatedField name="id" required readOnly id="report-status-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Report Name"
                id="report-status-reportName"
                name="reportName"
                data-cy="reportName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Report Id"
                id="report-status-reportId"
                name="reportId"
                data-cy="reportId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Placeholder"
                id="report-status-placeholder"
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
                id="report-status-processStatus"
                name="processStatus"
                data-cy="processStatus"
                label="Process Status"
                type="select"
              >
                <option value="" key="0" />
                {processStatuses
                  ? processStatuses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.statusCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/report-status" replace color="info">
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

export default ReportStatusUpdate;
