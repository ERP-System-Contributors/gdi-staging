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
import { ICardCategoryType } from 'app/shared/model/gdi/card-category-type.model';
import { getEntities as getCardCategoryTypes } from 'app/entities/gdi/card-category-type/card-category-type.reducer';
import { ICardTypes } from 'app/shared/model/gdi/card-types.model';
import { getEntities as getCardTypes } from 'app/entities/gdi/card-types/card-types.reducer';
import { ICardBrandType } from 'app/shared/model/gdi/card-brand-type.model';
import { getEntities as getCardBrandTypes } from 'app/entities/gdi/card-brand-type/card-brand-type.reducer';
import { ICardClassType } from 'app/shared/model/gdi/card-class-type.model';
import { getEntities as getCardClassTypes } from 'app/entities/gdi/card-class-type/card-class-type.reducer';
import { ICardCharges } from 'app/shared/model/gdi/card-charges.model';
import { getEntities as getCardCharges } from 'app/entities/gdi/card-charges/card-charges.reducer';
import { ICardIssuerCharges } from 'app/shared/model/gdi-data/card-issuer-charges.model';
import { getEntity, updateEntity, createEntity, reset } from './card-issuer-charges.reducer';

export const CardIssuerChargesUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const cardCategoryTypes = useAppSelector(state => state.cardCategoryType.entities);
  const cardTypes = useAppSelector(state => state.cardTypes.entities);
  const cardBrandTypes = useAppSelector(state => state.cardBrandType.entities);
  const cardClassTypes = useAppSelector(state => state.cardClassType.entities);
  const cardCharges = useAppSelector(state => state.cardCharges.entities);
  const cardIssuerChargesEntity = useAppSelector(state => state.cardIssuerCharges.entity);
  const loading = useAppSelector(state => state.cardIssuerCharges.loading);
  const updating = useAppSelector(state => state.cardIssuerCharges.updating);
  const updateSuccess = useAppSelector(state => state.cardIssuerCharges.updateSuccess);

  const handleClose = () => {
    navigate('/card-issuer-charges' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getCardCategoryTypes({}));
    dispatch(getCardTypes({}));
    dispatch(getCardBrandTypes({}));
    dispatch(getCardClassTypes({}));
    dispatch(getCardCharges({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...cardIssuerChargesEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      cardCategory: cardCategoryTypes.find(it => it.id.toString() === values.cardCategory.toString()),
      cardType: cardTypes.find(it => it.id.toString() === values.cardType.toString()),
      cardBrand: cardBrandTypes.find(it => it.id.toString() === values.cardBrand.toString()),
      cardClass: cardClassTypes.find(it => it.id.toString() === values.cardClass.toString()),
      cardChargeType: cardCharges.find(it => it.id.toString() === values.cardChargeType.toString()),
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
          ...cardIssuerChargesEntity,
          bankCode: cardIssuerChargesEntity?.bankCode?.id,
          cardCategory: cardIssuerChargesEntity?.cardCategory?.id,
          cardType: cardIssuerChargesEntity?.cardType?.id,
          cardBrand: cardIssuerChargesEntity?.cardBrand?.id,
          cardClass: cardIssuerChargesEntity?.cardClass?.id,
          cardChargeType: cardIssuerChargesEntity?.cardChargeType?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataCardIssuerCharges.home.createOrEditLabel" data-cy="CardIssuerChargesCreateUpdateHeading">
            Create or edit a Card Issuer Charges
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
                <ValidatedField name="id" required readOnly id="card-issuer-charges-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="card-issuer-charges-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Card Fee Charge In LCY"
                id="card-issuer-charges-cardFeeChargeInLCY"
                name="cardFeeChargeInLCY"
                data-cy="cardFeeChargeInLCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField id="card-issuer-charges-bankCode" name="bankCode" data-cy="bankCode" label="Bank Code" type="select" required>
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
                id="card-issuer-charges-cardCategory"
                name="cardCategory"
                data-cy="cardCategory"
                label="Card Category"
                type="select"
                required
              >
                <option value="" key="0" />
                {cardCategoryTypes
                  ? cardCategoryTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.cardCategoryDescription}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField id="card-issuer-charges-cardType" name="cardType" data-cy="cardType" label="Card Type" type="select" required>
                <option value="" key="0" />
                {cardTypes
                  ? cardTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.cardType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="card-issuer-charges-cardBrand"
                name="cardBrand"
                data-cy="cardBrand"
                label="Card Brand"
                type="select"
                required
              >
                <option value="" key="0" />
                {cardBrandTypes
                  ? cardBrandTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.cardBrandType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="card-issuer-charges-cardClass"
                name="cardClass"
                data-cy="cardClass"
                label="Card Class"
                type="select"
                required
              >
                <option value="" key="0" />
                {cardClassTypes
                  ? cardClassTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.cardClassType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="card-issuer-charges-cardChargeType"
                name="cardChargeType"
                data-cy="cardChargeType"
                label="Card Charge Type"
                type="select"
                required
              >
                <option value="" key="0" />
                {cardCharges
                  ? cardCharges.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.cardChargeTypeName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/card-issuer-charges" replace color="info">
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

export default CardIssuerChargesUpdate;
