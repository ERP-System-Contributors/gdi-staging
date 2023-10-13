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
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IReportTemplate } from 'app/shared/model/reports/report-template.model';
import { getEntities as getReportTemplates } from 'app/entities/reports/report-template/report-template.reducer';
import { IReportContentType } from 'app/shared/model/reports/report-content-type.model';
import { getEntities as getReportContentTypes } from 'app/entities/reports/report-content-type/report-content-type.reducer';
import { IReportRequisition } from 'app/shared/model/reports/report-requisition.model';
import { ReportStatusTypes } from 'app/shared/model/enumerations/report-status-types.model';
import { getEntity, updateEntity, createEntity, reset } from './report-requisition.reducer';

export const ReportRequisitionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const reportTemplates = useAppSelector(state => state.reportTemplate.entities);
  const reportContentTypes = useAppSelector(state => state.reportContentType.entities);
  const reportRequisitionEntity = useAppSelector(state => state.reportRequisition.entity);
  const loading = useAppSelector(state => state.reportRequisition.loading);
  const updating = useAppSelector(state => state.reportRequisition.updating);
  const updateSuccess = useAppSelector(state => state.reportRequisition.updateSuccess);
  const reportStatusTypesValues = Object.keys(ReportStatusTypes);

  const handleClose = () => {
    navigate('/report-requisition' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getReportTemplates({}));
    dispatch(getReportContentTypes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.reportRequestTime = convertDateTimeToServer(values.reportRequestTime);

    const entity = {
      ...reportRequisitionEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      parameters: mapIdList(values.parameters),
      reportTemplate: reportTemplates.find(it => it.id.toString() === values.reportTemplate.toString()),
      reportContentType: reportContentTypes.find(it => it.id.toString() === values.reportContentType.toString()),
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
          reportRequestTime: displayDefaultDateTime(),
        }
      : {
          reportStatus: 'GENERATING',
          ...reportRequisitionEntity,
          reportRequestTime: convertDateTimeFromServer(reportRequisitionEntity.reportRequestTime),
          placeholders: reportRequisitionEntity?.placeholders?.map(e => e.id.toString()),
          parameters: reportRequisitionEntity?.parameters?.map(e => e.id.toString()),
          reportTemplate: reportRequisitionEntity?.reportTemplate?.id,
          reportContentType: reportRequisitionEntity?.reportContentType?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.reportsReportRequisition.home.createOrEditLabel" data-cy="ReportRequisitionCreateUpdateHeading">
            Create or edit a Report Requisition
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
                <ValidatedField name="id" required readOnly id="report-requisition-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Report Name"
                id="report-requisition-reportName"
                name="reportName"
                data-cy="reportName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Report Request Time"
                id="report-requisition-reportRequestTime"
                name="reportRequestTime"
                data-cy="reportRequestTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Report Password"
                id="report-requisition-reportPassword"
                name="reportPassword"
                data-cy="reportPassword"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  minLength: { value: 6, message: 'This field is required to be at least 6 characters.' },
                }}
              />
              <ValidatedField
                label="Report Status"
                id="report-requisition-reportStatus"
                name="reportStatus"
                data-cy="reportStatus"
                type="select"
              >
                {reportStatusTypesValues.map(reportStatusTypes => (
                  <option value={reportStatusTypes} key={reportStatusTypes}>
                    {reportStatusTypes}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Report Id"
                id="report-requisition-reportId"
                name="reportId"
                data-cy="reportId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedBlobField
                label="Report File Attachment"
                id="report-requisition-reportFileAttachment"
                name="reportFileAttachment"
                data-cy="reportFileAttachment"
                openActionLabel="Open"
              />
              <ValidatedField
                label="Report File Check Sum"
                id="report-requisition-reportFileCheckSum"
                name="reportFileCheckSum"
                data-cy="reportFileCheckSum"
                type="textarea"
              />
              <ValidatedBlobField
                label="Report Notes"
                id="report-requisition-reportNotes"
                name="reportNotes"
                data-cy="reportNotes"
                openActionLabel="Open"
              />
              <ValidatedField
                label="Placeholders"
                id="report-requisition-placeholders"
                data-cy="placeholders"
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
                label="Parameters"
                id="report-requisition-parameters"
                data-cy="parameters"
                type="select"
                multiple
                name="parameters"
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
                id="report-requisition-reportTemplate"
                name="reportTemplate"
                data-cy="reportTemplate"
                label="Report Template"
                type="select"
                required
              >
                <option value="" key="0" />
                {reportTemplates
                  ? reportTemplates.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.catalogueNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="report-requisition-reportContentType"
                name="reportContentType"
                data-cy="reportContentType"
                label="Report Content Type"
                type="select"
                required
              >
                <option value="" key="0" />
                {reportContentTypes
                  ? reportContentTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.reportTypeName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/report-requisition" replace color="info">
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

export default ReportRequisitionUpdate;
