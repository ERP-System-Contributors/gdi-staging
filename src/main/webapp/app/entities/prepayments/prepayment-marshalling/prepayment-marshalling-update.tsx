import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPrepaymentAccount } from 'app/shared/model/prepayments/prepayment-account.model';
import { getEntities as getPrepaymentAccounts } from 'app/entities/prepayments/prepayment-account/prepayment-account.reducer';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IPrepaymentMarshalling } from 'app/shared/model/prepayments/prepayment-marshalling.model';
import { getEntity, updateEntity, createEntity, reset } from './prepayment-marshalling.reducer';

export const PrepaymentMarshallingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const prepaymentAccounts = useAppSelector(state => state.prepaymentAccount.entities);
  const placeholders = useAppSelector(state => state.placeholder.entities);
  const prepaymentMarshallingEntity = useAppSelector(state => state.prepaymentMarshalling.entity);
  const loading = useAppSelector(state => state.prepaymentMarshalling.loading);
  const updating = useAppSelector(state => state.prepaymentMarshalling.updating);
  const updateSuccess = useAppSelector(state => state.prepaymentMarshalling.updateSuccess);

  const handleClose = () => {
    navigate('/prepayment-marshalling' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPrepaymentAccounts({}));
    dispatch(getPlaceholders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...prepaymentMarshallingEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      prepaymentAccount: prepaymentAccounts.find(it => it.id.toString() === values.prepaymentAccount.toString()),
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
          ...prepaymentMarshallingEntity,
          prepaymentAccount: prepaymentMarshallingEntity?.prepaymentAccount?.id,
          placeholders: prepaymentMarshallingEntity?.placeholders?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.prepaymentsPrepaymentMarshalling.home.createOrEditLabel" data-cy="PrepaymentMarshallingCreateUpdateHeading">
            Create or edit a Prepayment Marshalling
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
                <ValidatedField name="id" required readOnly id="prepayment-marshalling-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Inactive"
                id="prepayment-marshalling-inactive"
                name="inactive"
                data-cy="inactive"
                check
                type="checkbox"
              />
              <ValidatedField
                label="Amortization Commencement Date"
                id="prepayment-marshalling-amortizationCommencementDate"
                name="amortizationCommencementDate"
                data-cy="amortizationCommencementDate"
                type="date"
              />
              <ValidatedField
                label="Amortization Periods"
                id="prepayment-marshalling-amortizationPeriods"
                name="amortizationPeriods"
                data-cy="amortizationPeriods"
                type="text"
              />
              <ValidatedField
                id="prepayment-marshalling-prepaymentAccount"
                name="prepaymentAccount"
                data-cy="prepaymentAccount"
                label="Prepayment Account"
                type="select"
                required
              >
                <option value="" key="0" />
                {prepaymentAccounts
                  ? prepaymentAccounts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.catalogueNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="Placeholder"
                id="prepayment-marshalling-placeholder"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/prepayment-marshalling" replace color="info">
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

export default PrepaymentMarshallingUpdate;
