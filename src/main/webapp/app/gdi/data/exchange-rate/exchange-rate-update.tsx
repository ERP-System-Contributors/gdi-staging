import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { getEntities as getInstitutionCodes } from 'app/entities/gdi/institution-code/institution-code.reducer';
import { IIsoCurrencyCode } from 'app/shared/model/gdi/iso-currency-code.model';
import { getEntities as getIsoCurrencyCodes } from 'app/entities/gdi/iso-currency-code/iso-currency-code.reducer';
import { IExchangeRate } from 'app/shared/model/gdi-data/exchange-rate.model';
import { getEntity, updateEntity, createEntity, reset } from './exchange-rate.reducer';

export const ExchangeRateUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const isoCurrencyCodes = useAppSelector(state => state.isoCurrencyCode.entities);
  const exchangeRateEntity = useAppSelector(state => state.exchangeRate.entity);
  const loading = useAppSelector(state => state.exchangeRate.loading);
  const updating = useAppSelector(state => state.exchangeRate.updating);
  const updateSuccess = useAppSelector(state => state.exchangeRate.updateSuccess);

  const handleClose = () => {
    navigate('/exchange-rate' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getIsoCurrencyCodes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...exchangeRateEntity,
      ...values,
      institutionCode: institutionCodes.find(it => it.id.toString() === values.institutionCode.toString()),
      currencyCode: isoCurrencyCodes.find(it => it.id.toString() === values.currencyCode.toString()),
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
          ...exchangeRateEntity,
          institutionCode: exchangeRateEntity?.institutionCode?.id,
          currencyCode: exchangeRateEntity?.currencyCode?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataExchangeRate.home.createOrEditLabel" data-cy="ExchangeRateCreateUpdateHeading">
            Create or edit a Exchange Rate
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
                <ValidatedField name="id" required readOnly id="exchange-rate-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Business Reporting Day"
                id="exchange-rate-businessReportingDay"
                name="businessReportingDay"
                data-cy="businessReportingDay"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Buying Rate"
                id="exchange-rate-buyingRate"
                name="buyingRate"
                data-cy="buyingRate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Selling Rate"
                id="exchange-rate-sellingRate"
                name="sellingRate"
                data-cy="sellingRate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Mean Rate"
                id="exchange-rate-meanRate"
                name="meanRate"
                data-cy="meanRate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Closing Bid Rate"
                id="exchange-rate-closingBidRate"
                name="closingBidRate"
                data-cy="closingBidRate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Closing Offer Rate"
                id="exchange-rate-closingOfferRate"
                name="closingOfferRate"
                data-cy="closingOfferRate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Usd Cross Rate"
                id="exchange-rate-usdCrossRate"
                name="usdCrossRate"
                data-cy="usdCrossRate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                id="exchange-rate-institutionCode"
                name="institutionCode"
                data-cy="institutionCode"
                label="Institution Code"
                type="select"
                required
              >
                <option value="" key="0" />
                {institutionCodes
                  ? institutionCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.institutionName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="exchange-rate-currencyCode"
                name="currencyCode"
                data-cy="currencyCode"
                label="Currency Code"
                type="select"
                required
              >
                <option value="" key="0" />
                {isoCurrencyCodes
                  ? isoCurrencyCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.alphabeticCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/exchange-rate" replace color="info">
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

export default ExchangeRateUpdate;
