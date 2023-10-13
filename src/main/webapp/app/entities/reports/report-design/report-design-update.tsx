import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { getEntities as getSecurityClearances } from 'app/entities/people/security-clearance/security-clearance.reducer';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/people/application-user/application-user.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { ISystemModule } from 'app/shared/model/system/system-module.model';
import { getEntities as getSystemModules } from 'app/entities/system/system-module/system-module.reducer';
import { IAlgorithm } from 'app/shared/model/system/algorithm.model';
import { getEntities as getAlgorithms } from 'app/entities/system/algorithm/algorithm.reducer';
import { IReportDesign } from 'app/shared/model/reports/report-design.model';
import { getEntity, updateEntity, createEntity, reset } from './report-design.reducer';

export const ReportDesignUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const securityClearances = useAppSelector(state => state.securityClearance.entities);
  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const systemModules = useAppSelector(state => state.systemModule.entities);
  const algorithms = useAppSelector(state => state.algorithm.entities);
  const reportDesignEntity = useAppSelector(state => state.reportDesign.entity);
  const loading = useAppSelector(state => state.reportDesign.loading);
  const updating = useAppSelector(state => state.reportDesign.updating);
  const updateSuccess = useAppSelector(state => state.reportDesign.updateSuccess);

  const handleClose = () => {
    navigate('/report-design' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getSecurityClearances({}));
    dispatch(getApplicationUsers({}));
    dispatch(getDealers({}));
    dispatch(getPlaceholders({}));
    dispatch(getSystemModules({}));
    dispatch(getAlgorithms({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...reportDesignEntity,
      ...values,
      parameters: mapIdList(values.parameters),
      placeholders: mapIdList(values.placeholders),
      securityClearance: securityClearances.find(it => it.id.toString() === values.securityClearance.toString()),
      reportDesigner: applicationUsers.find(it => it.id.toString() === values.reportDesigner.toString()),
      organization: dealers.find(it => it.id.toString() === values.organization.toString()),
      department: dealers.find(it => it.id.toString() === values.department.toString()),
      systemModule: systemModules.find(it => it.id.toString() === values.systemModule.toString()),
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
      ? {}
      : {
          ...reportDesignEntity,
          parameters: reportDesignEntity?.parameters?.map(e => e.id.toString()),
          securityClearance: reportDesignEntity?.securityClearance?.id,
          reportDesigner: reportDesignEntity?.reportDesigner?.id,
          organization: reportDesignEntity?.organization?.id,
          department: reportDesignEntity?.department?.id,
          placeholders: reportDesignEntity?.placeholders?.map(e => e.id.toString()),
          systemModule: reportDesignEntity?.systemModule?.id,
          fileCheckSumAlgorithm: reportDesignEntity?.fileCheckSumAlgorithm?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.reportsReportDesign.home.createOrEditLabel" data-cy="ReportDesignCreateUpdateHeading">
            Create or edit a Report Design
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
                <ValidatedField name="id" required readOnly id="report-design-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Catalogue Number"
                id="report-design-catalogueNumber"
                name="catalogueNumber"
                data-cy="catalogueNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Designation"
                id="report-design-designation"
                name="designation"
                data-cy="designation"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Description" id="report-design-description" name="description" data-cy="description" type="textarea" />
              <ValidatedBlobField label="Notes" id="report-design-notes" name="notes" data-cy="notes" openActionLabel="Open" />
              <ValidatedBlobField
                label="Report File"
                id="report-design-reportFile"
                name="reportFile"
                data-cy="reportFile"
                openActionLabel="Open"
              />
              <ValidatedField
                label="Report File Checksum"
                id="report-design-reportFileChecksum"
                name="reportFileChecksum"
                data-cy="reportFileChecksum"
                type="text"
                validate={{}}
              />
              <ValidatedField
                label="Parameters"
                id="report-design-parameters"
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
                id="report-design-securityClearance"
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
                id="report-design-reportDesigner"
                name="reportDesigner"
                data-cy="reportDesigner"
                label="Report Designer"
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
                id="report-design-organization"
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
                id="report-design-department"
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
                label="Placeholder"
                id="report-design-placeholder"
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
                id="report-design-systemModule"
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
                id="report-design-fileCheckSumAlgorithm"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/report-design" replace color="info">
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

export default ReportDesignUpdate;
