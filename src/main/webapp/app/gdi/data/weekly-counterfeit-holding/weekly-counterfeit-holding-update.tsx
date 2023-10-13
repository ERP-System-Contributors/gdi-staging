import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IWeeklyCounterfeitHolding } from 'app/shared/model/gdi-data/weekly-counterfeit-holding.model';
import { getEntity, updateEntity, createEntity, reset } from './weekly-counterfeit-holding.reducer';

export const WeeklyCounterfeitHoldingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const weeklyCounterfeitHoldingEntity = useAppSelector(state => state.weeklyCounterfeitHolding.entity);
  const loading = useAppSelector(state => state.weeklyCounterfeitHolding.loading);
  const updating = useAppSelector(state => state.weeklyCounterfeitHolding.updating);
  const updateSuccess = useAppSelector(state => state.weeklyCounterfeitHolding.updateSuccess);

  const handleClose = () => {
    navigate('/weekly-counterfeit-holding' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...weeklyCounterfeitHoldingEntity,
      ...values,
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
          ...weeklyCounterfeitHoldingEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="gdiStagingApp.gdiDataWeeklyCounterfeitHolding.home.createOrEditLabel"
            data-cy="WeeklyCounterfeitHoldingCreateUpdateHeading"
          >
            Create or edit a Weekly Counterfeit Holding
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
                <ValidatedField name="id" required readOnly id="weekly-counterfeit-holding-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="weekly-counterfeit-holding-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Date Confiscated"
                id="weekly-counterfeit-holding-dateConfiscated"
                name="dateConfiscated"
                data-cy="dateConfiscated"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Serial Number"
                id="weekly-counterfeit-holding-serialNumber"
                name="serialNumber"
                data-cy="serialNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Depositors Names"
                id="weekly-counterfeit-holding-depositorsNames"
                name="depositorsNames"
                data-cy="depositorsNames"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Tellers Names"
                id="weekly-counterfeit-holding-tellersNames"
                name="tellersNames"
                data-cy="tellersNames"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Date Submitted To CBK"
                id="weekly-counterfeit-holding-dateSubmittedToCBK"
                name="dateSubmittedToCBK"
                data-cy="dateSubmittedToCBK"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Remarks" id="weekly-counterfeit-holding-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/weekly-counterfeit-holding" replace color="info">
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

export default WeeklyCounterfeitHoldingUpdate;
