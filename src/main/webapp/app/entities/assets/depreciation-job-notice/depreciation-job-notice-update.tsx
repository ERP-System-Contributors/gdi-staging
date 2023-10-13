import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDepreciationJob } from 'app/shared/model/assets/depreciation-job.model';
import { getEntities as getDepreciationJobs } from 'app/entities/assets/depreciation-job/depreciation-job.reducer';
import { IDepreciationBatchSequence } from 'app/shared/model/assets/depreciation-batch-sequence.model';
import { getEntities as getDepreciationBatchSequences } from 'app/entities/assets/depreciation-batch-sequence/depreciation-batch-sequence.reducer';
import { IDepreciationPeriod } from 'app/shared/model/assets/depreciation-period.model';
import { getEntities as getDepreciationPeriods } from 'app/entities/assets/depreciation-period/depreciation-period.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/people/application-user/application-user.reducer';
import { IDepreciationJobNotice } from 'app/shared/model/assets/depreciation-job-notice.model';
import { DepreciationNoticeStatusType } from 'app/shared/model/enumerations/depreciation-notice-status-type.model';
import { getEntity, updateEntity, createEntity, reset } from './depreciation-job-notice.reducer';

export const DepreciationJobNoticeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const depreciationJobs = useAppSelector(state => state.depreciationJob.entities);
  const depreciationBatchSequences = useAppSelector(state => state.depreciationBatchSequence.entities);
  const depreciationPeriods = useAppSelector(state => state.depreciationPeriod.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const applicationUsers = useAppSelector(state => state.applicationUser.entities);
  const depreciationJobNoticeEntity = useAppSelector(state => state.depreciationJobNotice.entity);
  const loading = useAppSelector(state => state.depreciationJobNotice.loading);
  const updating = useAppSelector(state => state.depreciationJobNotice.updating);
  const updateSuccess = useAppSelector(state => state.depreciationJobNotice.updateSuccess);
  const depreciationNoticeStatusTypeValues = Object.keys(DepreciationNoticeStatusType);

  const handleClose = () => {
    navigate('/depreciation-job-notice' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDepreciationJobs({}));
    dispatch(getDepreciationBatchSequences({}));
    dispatch(getDepreciationPeriods({}));
    dispatch(getPlaceholders({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getApplicationUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.eventTimeStamp = convertDateTimeToServer(values.eventTimeStamp);

    const entity = {
      ...depreciationJobNoticeEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      universallyUniqueMappings: mapIdList(values.universallyUniqueMappings),
      depreciationJob: depreciationJobs.find(it => it.id.toString() === values.depreciationJob.toString()),
      depreciationBatchSequence: depreciationBatchSequences.find(it => it.id.toString() === values.depreciationBatchSequence.toString()),
      depreciationPeriod: depreciationPeriods.find(it => it.id.toString() === values.depreciationPeriod.toString()),
      superintended: applicationUsers.find(it => it.id.toString() === values.superintended.toString()),
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
          eventTimeStamp: displayDefaultDateTime(),
        }
      : {
          depreciationNoticeStatus: 'INFO',
          ...depreciationJobNoticeEntity,
          eventTimeStamp: convertDateTimeFromServer(depreciationJobNoticeEntity.eventTimeStamp),
          depreciationJob: depreciationJobNoticeEntity?.depreciationJob?.id,
          depreciationBatchSequence: depreciationJobNoticeEntity?.depreciationBatchSequence?.id,
          depreciationPeriod: depreciationJobNoticeEntity?.depreciationPeriod?.id,
          placeholders: depreciationJobNoticeEntity?.placeholders?.map(e => e.id.toString()),
          universallyUniqueMappings: depreciationJobNoticeEntity?.universallyUniqueMappings?.map(e => e.id.toString()),
          superintended: depreciationJobNoticeEntity?.superintended?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsDepreciationJobNotice.home.createOrEditLabel" data-cy="DepreciationJobNoticeCreateUpdateHeading">
            Create or edit a Depreciation Job Notice
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
                <ValidatedField name="id" required readOnly id="depreciation-job-notice-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Event Narrative"
                id="depreciation-job-notice-eventNarrative"
                name="eventNarrative"
                data-cy="eventNarrative"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Event Time Stamp"
                id="depreciation-job-notice-eventTimeStamp"
                name="eventTimeStamp"
                data-cy="eventTimeStamp"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Depreciation Notice Status"
                id="depreciation-job-notice-depreciationNoticeStatus"
                name="depreciationNoticeStatus"
                data-cy="depreciationNoticeStatus"
                type="select"
              >
                {depreciationNoticeStatusTypeValues.map(depreciationNoticeStatusType => (
                  <option value={depreciationNoticeStatusType} key={depreciationNoticeStatusType}>
                    {depreciationNoticeStatusType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Source Module"
                id="depreciation-job-notice-sourceModule"
                name="sourceModule"
                data-cy="sourceModule"
                type="text"
              />
              <ValidatedField
                label="Source Entity"
                id="depreciation-job-notice-sourceEntity"
                name="sourceEntity"
                data-cy="sourceEntity"
                type="text"
              />
              <ValidatedField label="Error Code" id="depreciation-job-notice-errorCode" name="errorCode" data-cy="errorCode" type="text" />
              <ValidatedField
                label="Error Message"
                id="depreciation-job-notice-errorMessage"
                name="errorMessage"
                data-cy="errorMessage"
                type="textarea"
              />
              <ValidatedField
                label="User Action"
                id="depreciation-job-notice-userAction"
                name="userAction"
                data-cy="userAction"
                type="text"
              />
              <ValidatedField
                label="Technical Details"
                id="depreciation-job-notice-technicalDetails"
                name="technicalDetails"
                data-cy="technicalDetails"
                type="textarea"
              />
              <ValidatedField
                id="depreciation-job-notice-depreciationJob"
                name="depreciationJob"
                data-cy="depreciationJob"
                label="Depreciation Job"
                type="select"
              >
                <option value="" key="0" />
                {depreciationJobs
                  ? depreciationJobs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="depreciation-job-notice-depreciationBatchSequence"
                name="depreciationBatchSequence"
                data-cy="depreciationBatchSequence"
                label="Depreciation Batch Sequence"
                type="select"
              >
                <option value="" key="0" />
                {depreciationBatchSequences
                  ? depreciationBatchSequences.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="depreciation-job-notice-depreciationPeriod"
                name="depreciationPeriod"
                data-cy="depreciationPeriod"
                label="Depreciation Period"
                type="select"
              >
                <option value="" key="0" />
                {depreciationPeriods
                  ? depreciationPeriods.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label="Placeholder"
                id="depreciation-job-notice-placeholder"
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
                label="Universally Unique Mapping"
                id="depreciation-job-notice-universallyUniqueMapping"
                data-cy="universallyUniqueMapping"
                type="select"
                multiple
                name="universallyUniqueMappings"
              >
                <option value="" key="0" />
                {universallyUniqueMappings
                  ? universallyUniqueMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.universalKey}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="depreciation-job-notice-superintended"
                name="superintended"
                data-cy="superintended"
                label="Superintended"
                type="select"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/depreciation-job-notice" replace color="info">
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

export default DepreciationJobNoticeUpdate;
