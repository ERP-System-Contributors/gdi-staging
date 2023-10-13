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
import { DepreciationBatchStatusType } from 'app/shared/model/enumerations/depreciation-batch-status-type.model';
import { getEntity, updateEntity, createEntity, reset } from './depreciation-batch-sequence.reducer';

export const DepreciationBatchSequenceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const depreciationJobs = useAppSelector(state => state.depreciationJob.entities);
  const depreciationBatchSequenceEntity = useAppSelector(state => state.depreciationBatchSequence.entity);
  const loading = useAppSelector(state => state.depreciationBatchSequence.loading);
  const updating = useAppSelector(state => state.depreciationBatchSequence.updating);
  const updateSuccess = useAppSelector(state => state.depreciationBatchSequence.updateSuccess);
  const depreciationBatchStatusTypeValues = Object.keys(DepreciationBatchStatusType);

  const handleClose = () => {
    navigate('/depreciation-batch-sequence' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDepreciationJobs({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.createdAt = convertDateTimeToServer(values.createdAt);

    const entity = {
      ...depreciationBatchSequenceEntity,
      ...values,
      depreciationJob: depreciationJobs.find(it => it.id.toString() === values.depreciationJob.toString()),
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
          createdAt: displayDefaultDateTime(),
        }
      : {
          depreciationBatchStatus: 'CREATED',
          ...depreciationBatchSequenceEntity,
          createdAt: convertDateTimeFromServer(depreciationBatchSequenceEntity.createdAt),
          depreciationJob: depreciationBatchSequenceEntity?.depreciationJob?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="gdiStagingApp.assetsDepreciationBatchSequence.home.createOrEditLabel"
            data-cy="DepreciationBatchSequenceCreateUpdateHeading"
          >
            Create or edit a Depreciation Batch Sequence
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
                <ValidatedField name="id" required readOnly id="depreciation-batch-sequence-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Start Index"
                id="depreciation-batch-sequence-startIndex"
                name="startIndex"
                data-cy="startIndex"
                type="text"
              />
              <ValidatedField label="End Index" id="depreciation-batch-sequence-endIndex" name="endIndex" data-cy="endIndex" type="text" />
              <ValidatedField
                label="Created At"
                id="depreciation-batch-sequence-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Depreciation Batch Status"
                id="depreciation-batch-sequence-depreciationBatchStatus"
                name="depreciationBatchStatus"
                data-cy="depreciationBatchStatus"
                type="select"
              >
                {depreciationBatchStatusTypeValues.map(depreciationBatchStatusType => (
                  <option value={depreciationBatchStatusType} key={depreciationBatchStatusType}>
                    {depreciationBatchStatusType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="depreciation-batch-sequence-depreciationJob"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/depreciation-batch-sequence" replace color="info">
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

export default DepreciationBatchSequenceUpdate;
