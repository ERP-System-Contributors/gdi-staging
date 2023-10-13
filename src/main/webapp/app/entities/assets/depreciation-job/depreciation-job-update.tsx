import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/people/application-user/application-user.reducer';
import { IDepreciationPeriod } from 'app/shared/model/assets/depreciation-period.model';
import { getEntities as getDepreciationPeriods } from 'app/entities/assets/depreciation-period/depreciation-period.reducer';
import { IDepreciationJob } from 'app/shared/model/assets/depreciation-job.model';
import { DepreciationJobStatusType } from 'app/shared/model/enumerations/depreciation-job-status-type.model';
import { getEntity, updateEntity, createEntity, reset } from './depreciation-job.reducer';

export const DepreciationJobUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const depreciationPeriods = useAppSelector(state => state.depreciationPeriod.entities);
  const depreciationJobEntity = useAppSelector(state => state.depreciationJob.entity);
  const loading = useAppSelector(state => state.depreciationJob.loading);
  const updating = useAppSelector(state => state.depreciationJob.updating);
  const updateSuccess = useAppSelector(state => state.depreciationJob.updateSuccess);
  const depreciationJobStatusTypeValues = Object.keys(DepreciationJobStatusType);

  const handleClose = () => {
    navigate('/depreciation-job' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getApplicationUsers({}));
    dispatch(getDepreciationPeriods({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.timeOfCommencement = convertDateTimeToServer(values.timeOfCommencement);

    const entity = {
      ...depreciationJobEntity,
      ...values,
      createdBy: applicationUsers.find(it => it.id.toString() === values.createdBy.toString()),
      depreciationPeriod: depreciationPeriods.find(it => it.id.toString() === values.depreciationPeriod.toString()),
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
          timeOfCommencement: displayDefaultDateTime(),
        }
      : {
          depreciationJobStatus: 'COMPLETE',
          ...depreciationJobEntity,
          timeOfCommencement: convertDateTimeFromServer(depreciationJobEntity.timeOfCommencement),
          createdBy: depreciationJobEntity?.createdBy?.id,
          depreciationPeriod: depreciationJobEntity?.depreciationPeriod?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsDepreciationJob.home.createOrEditLabel" data-cy="DepreciationJobCreateUpdateHeading">
            Create or edit a Depreciation Job
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
                <ValidatedField name="id" required readOnly id="depreciation-job-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Time Of Commencement"
                id="depreciation-job-timeOfCommencement"
                name="timeOfCommencement"
                data-cy="timeOfCommencement"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Depreciation Job Status"
                id="depreciation-job-depreciationJobStatus"
                name="depreciationJobStatus"
                data-cy="depreciationJobStatus"
                type="select"
              >
                {depreciationJobStatusTypeValues.map(depreciationJobStatusType => (
                  <option value={depreciationJobStatusType} key={depreciationJobStatusType}>
                    {depreciationJobStatusType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Description" id="depreciation-job-description" name="description" data-cy="description" type="text" />
              <ValidatedField id="depreciation-job-createdBy" name="createdBy" data-cy="createdBy" label="Created By" type="select">
                <option value="" key="0" />
                {applicationUsers
                  ? applicationUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.designation}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="depreciation-job-depreciationPeriod"
                name="depreciationPeriod"
                data-cy="depreciationPeriod"
                label="Depreciation Period"
                type="select"
              >
                <option value="" key="0" />
                {depreciationPeriods
                  ? depreciationPeriods.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.endDate}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/depreciation-job" replace color="info">
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

export default DepreciationJobUpdate;
