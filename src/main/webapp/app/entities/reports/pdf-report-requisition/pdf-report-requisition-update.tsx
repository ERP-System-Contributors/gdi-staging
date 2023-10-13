import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IReportTemplate } from 'app/shared/model/reports/report-template.model';
import { getEntities as getReportTemplates } from 'app/entities/reports/report-template/report-template.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IPdfReportRequisition } from 'app/shared/model/reports/pdf-report-requisition.model';
import { ReportStatusTypes } from 'app/shared/model/enumerations/report-status-types.model';
import { getEntity, updateEntity, createEntity, reset } from './pdf-report-requisition.reducer';

export const PdfReportRequisitionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const reportTemplates = useAppSelector(state => state.reportTemplate.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const pdfReportRequisitionEntity = useAppSelector(state => state.pdfReportRequisition.entity);
  const loading = useAppSelector(state => state.pdfReportRequisition.loading);
  const updating = useAppSelector(state => state.pdfReportRequisition.updating);
  const updateSuccess = useAppSelector(state => state.pdfReportRequisition.updateSuccess);
  const reportStatusTypesValues = Object.keys(ReportStatusTypes);

  const handleClose = () => {
    navigate('/pdf-report-requisition' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getReportTemplates({}));
    dispatch(getPlaceholders({}));
    dispatch(getUniversallyUniqueMappings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...pdfReportRequisitionEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      parameters: mapIdList(values.parameters),
      reportTemplate: reportTemplates.find(it => it.id.toString() === values.reportTemplate.toString()),
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
          reportStatus: 'GENERATING',
          ...pdfReportRequisitionEntity,
          reportTemplate: pdfReportRequisitionEntity?.reportTemplate?.id,
          placeholders: pdfReportRequisitionEntity?.placeholders?.map(e => e.id.toString()),
          parameters: pdfReportRequisitionEntity?.parameters?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.reportsPdfReportRequisition.home.createOrEditLabel" data-cy="PdfReportRequisitionCreateUpdateHeading">
            Create or edit a Pdf Report Requisition
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
                <ValidatedField name="id" required readOnly id="pdf-report-requisition-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Report Name"
                id="pdf-report-requisition-reportName"
                name="reportName"
                data-cy="reportName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Report Date"
                id="pdf-report-requisition-reportDate"
                name="reportDate"
                data-cy="reportDate"
                type="date"
              />
              <ValidatedField
                label="User Password"
                id="pdf-report-requisition-userPassword"
                name="userPassword"
                data-cy="userPassword"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Owner Password"
                id="pdf-report-requisition-ownerPassword"
                name="ownerPassword"
                data-cy="ownerPassword"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Report File Checksum"
                id="pdf-report-requisition-reportFileChecksum"
                name="reportFileChecksum"
                data-cy="reportFileChecksum"
                type="text"
              />
              <ValidatedField
                label="Report Status"
                id="pdf-report-requisition-reportStatus"
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
                id="pdf-report-requisition-reportId"
                name="reportId"
                data-cy="reportId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                id="pdf-report-requisition-reportTemplate"
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
                label="Placeholder"
                id="pdf-report-requisition-placeholder"
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
                label="Parameters"
                id="pdf-report-requisition-parameters"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/pdf-report-requisition" replace color="info">
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

export default PdfReportRequisitionUpdate;
