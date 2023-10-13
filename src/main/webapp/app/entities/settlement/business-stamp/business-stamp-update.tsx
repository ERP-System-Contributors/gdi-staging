import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IBusinessStamp } from 'app/shared/model/settlement/business-stamp.model';
import { getEntity, updateEntity, createEntity, reset } from './business-stamp.reducer';

export const BusinessStampUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const dealers = useAppSelector(state => state.dealer.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const businessStampEntity = useAppSelector(state => state.businessStamp.entity);
  const loading = useAppSelector(state => state.businessStamp.loading);
  const updating = useAppSelector(state => state.businessStamp.updating);
  const updateSuccess = useAppSelector(state => state.businessStamp.updateSuccess);

  const handleClose = () => {
    navigate('/business-stamp' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDealers({}));
    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...businessStampEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      stampHolder: dealers.find(it => it.id.toString() === values.stampHolder.toString()),
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
          ...businessStampEntity,
          stampHolder: businessStampEntity?.stampHolder?.id,
          placeholders: businessStampEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.settlementBusinessStamp.home.createOrEditLabel" data-cy="BusinessStampCreateUpdateHeading">
            Create or edit a Business Stamp
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
                <ValidatedField name="id" required readOnly id="business-stamp-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Stamp Date" id="business-stamp-stampDate" name="stampDate" data-cy="stampDate" type="date" />
              <ValidatedField label="Purpose" id="business-stamp-purpose" name="purpose" data-cy="purpose" type="text" />
              <ValidatedField label="Details" id="business-stamp-details" name="details" data-cy="details" type="text" />
              <ValidatedField label="Remarks" id="business-stamp-remarks" name="remarks" data-cy="remarks" type="textarea" />
              <ValidatedField
                id="business-stamp-stampHolder"
                name="stampHolder"
                data-cy="stampHolder"
                label="Stamp Holder"
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
                id="business-stamp-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/business-stamp" replace color="info">
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

export default BusinessStampUpdate;
