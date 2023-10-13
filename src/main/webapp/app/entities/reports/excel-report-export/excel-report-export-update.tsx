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
import { IReportStatus } from 'app/shared/model/reports/report-status.model';
import { getEntities as getReportStatuses } from 'app/entities/reports/report-status/report-status.reducer';
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { getEntities as getSecurityClearances } from 'app/entities/people/security-clearance/security-clearance.reducer';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/people/application-user/application-user.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { ISystemModule } from 'app/shared/model/system/system-module.model';
import { getEntities as getSystemModules } from 'app/entities/system/system-module/system-module.reducer';
import { IReportDesign } from 'app/shared/model/reports/report-design.model';
import { getEntities as getReportDesigns } from 'app/entities/reports/report-design/report-design.reducer';
import { IAlgorithm } from 'app/shared/model/system/algorithm.model';
import { getEntities as getAlgorithms } from 'app/entities/system/algorithm/algorithm.reducer';
import { IExcelReportExport } from 'app/shared/model/reports/excel-report-export.model';
import { getEntity, updateEntity, createEntity, reset } from './excel-report-export.reducer';

export const ExcelReportExportUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const reportStatuses = useAppSelector(state => state.reportStatus.entities);
  const securityClearances = useAppSelector(state => state.securityClearance.entities);
  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const systemModules = useAppSelector(state => state.systemModule.entities);
  const reportDesigns = useAppSelector(state => state.reportDesign.entities);
  const algorithms = useAppSelector(state => state.algorithm.entities);
  const excelReportExportEntity = useAppSelector(state => state.excelReportExport.entity);
  const loading = useAppSelector(state => state.excelReportExport.loading);
  const updating = useAppSelector(state => state.excelReportExport.updating);
  const updateSuccess = useAppSelector(state => state.excelReportExport.updateSuccess);

  const handleClose = () => {
    navigate('/excel-report-export' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getReportStatuses({}));
    dispatch(getSecurityClearances({}));
    dispatch(getApplicationUsers({}));
    dispatch(getDealers({}));
    dispatch(getSystemModules({}));
    dispatch(getReportDesigns({}));
    dispatch(getAlgorithms({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.reportTimeStamp = convertDateTimeToServer(values.reportTimeStamp);

    const entity = {
      ...excelReportExportEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      parameters: mapIdList(values.parameters),
      reportStatus: reportStatuses.find(it => it.id.toString() === values.reportStatus.toString()),
      securityClearance: securityClearances.find(it => it.id.toString() === values.securityClearance.toString()),
      reportCreator: applicationUsers.find(it => it.id.toString() === values.reportCreator.toString()),
      organization: dealers.find(it => it.id.toString() === values.organization.toString()),
      department: dealers.find(it => it.id.toString() === values.department.toString()),
      systemModule: systemModules.find(it => it.id.toString() === values.systemModule.toString()),
      reportDesign: reportDesigns.find(it => it.id.toString() === values.reportDesign.toString()),
      fileCheckSumAlgorithm: algorithms.find(it => it.id.toString() === values.fileCheckSumAlgorithm.toString()),
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
          reportTimeStamp: displayDefaultDateTime(),
        }
      : {
          ...excelReportExportEntity,
          reportTimeStamp: convertDateTimeFromServer(excelReportExportEntity.reportTimeStamp),
          placeholders: excelReportExportEntity?.placeholders?.map(e => e.id.toString()),
          parameters: excelReportExportEntity?.parameters?.map(e => e.id.toString()),
          reportStatus: excelReportExportEntity?.reportStatus?.id,
          securityClearance: excelReportExportEntity?.securityClearance?.id,
          reportCreator: excelReportExportEntity?.reportCreator?.id,
          organization: excelReportExportEntity?.organization?.id,
          department: excelReportExportEntity?.department?.id,
          systemModule: excelReportExportEntity?.systemModule?.id,
          reportDesign: excelReportExportEntity?.reportDesign?.id,
          fileCheckSumAlgorithm: excelReportExportEntity?.fileCheckSumAlgorithm?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.reportsExcelReportExport.home.createOrEditLabel" data-cy="ExcelReportExportCreateUpdateHeading">
            Create or edit a Excel Report Export
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
                <ValidatedField name="id" required readOnly id="excel-report-export-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Report Name"
                id="excel-report-export-reportName"
                name="reportName"
                data-cy="reportName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Report Password"
                id="excel-report-export-reportPassword"
                name="reportPassword"
                data-cy="reportPassword"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedBlobField
                label="Report Notes"
                id="excel-report-export-reportNotes"
                name="reportNotes"
                data-cy="reportNotes"
                openActionLabel="Open"
              />
              <ValidatedField
                label="File Check Sum"
                id="excel-report-export-fileCheckSum"
                name="fileCheckSum"
                data-cy="fileCheckSum"
                type="textarea"
              />
              <ValidatedBlobField
                label="Report File"
                id="excel-report-export-reportFile"
                name="reportFile"
                data-cy="reportFile"
                openActionLabel="Open"
              />
              <ValidatedField
                label="Report Time Stamp"
                id="excel-report-export-reportTimeStamp"
                name="reportTimeStamp"
                data-cy="reportTimeStamp"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Report Id"
                id="excel-report-export-reportId"
                name="reportId"
                data-cy="reportId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Placeholder"
                id="excel-report-export-placeholder"
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
                id="excel-report-export-parameters"
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
                id="excel-report-export-reportStatus"
                name="reportStatus"
                data-cy="reportStatus"
                label="Report Status"
                type="select"
              >
                <option value="" key="0" />
                {reportStatuses
                  ? reportStatuses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="excel-report-export-securityClearance"
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
              <ValidatedField
                id="excel-report-export-reportCreator"
                name="reportCreator"
                data-cy="reportCreator"
                label="Report Creator"
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
                id="excel-report-export-organization"
                name="organization"
                data-cy="organization"
                label="Organization"
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
                id="excel-report-export-department"
                name="department"
                data-cy="department"
                label="Department"
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
                id="excel-report-export-systemModule"
                name="systemModule"
                data-cy="systemModule"
                label="System Module"
                type="select"
                required
              >
                <option value="" key="0" />
                {systemModules
                  ? systemModules.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.moduleName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="excel-report-export-reportDesign"
                name="reportDesign"
                data-cy="reportDesign"
                label="Report Design"
                type="select"
                required
              >
                <option value="" key="0" />
                {reportDesigns
                  ? reportDesigns.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.designation}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="excel-report-export-fileCheckSumAlgorithm"
                name="fileCheckSumAlgorithm"
                data-cy="fileCheckSumAlgorithm"
                label="File Check Sum Algorithm"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/excel-report-export" replace color="info">
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

export default ExcelReportExportUpdate;
