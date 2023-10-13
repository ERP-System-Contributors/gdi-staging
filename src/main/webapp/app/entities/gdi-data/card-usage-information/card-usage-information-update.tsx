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
import { ICardTypes } from 'app/shared/model/gdi/card-types.model';
import { getEntities as getCardTypes } from 'app/entities/gdi/card-types/card-types.reducer';
import { ICardBrandType } from 'app/shared/model/gdi/card-brand-type.model';
import { getEntities as getCardBrandTypes } from 'app/entities/gdi/card-brand-type/card-brand-type.reducer';
import { ICardCategoryType } from 'app/shared/model/gdi/card-category-type.model';
import { getEntities as getCardCategoryTypes } from 'app/entities/gdi/card-category-type/card-category-type.reducer';
import { IBankTransactionType } from 'app/shared/model/gdi/bank-transaction-type.model';
import { getEntities as getBankTransactionTypes } from 'app/entities/gdi/bank-transaction-type/bank-transaction-type.reducer';
import { IChannelType } from 'app/shared/model/gdi/channel-type.model';
import { getEntities as getChannelTypes } from 'app/entities/gdi/channel-type/channel-type.reducer';
import { ICardState } from 'app/shared/model/gdi-data/card-state.model';
import { getEntities as getCardStates } from 'app/entities/gdi-data/card-state/card-state.reducer';
import { ICardUsageInformation } from 'app/shared/model/gdi-data/card-usage-information.model';
import { getEntity, updateEntity, createEntity, reset } from './card-usage-information.reducer';

export const CardUsageInformationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const cardTypes = useAppSelector(state => state.cardTypes.entities);
  const cardBrandTypes = useAppSelector(state => state.cardBrandType.entities);
  const cardCategoryTypes = useAppSelector(state => state.cardCategoryType.entities);
  const bankTransactionTypes = useAppSelector(state => state.bankTransactionType.entities);
  const channelTypes = useAppSelector(state => state.channelType.entities);
  const cardStates = useAppSelector(state => state.cardState.entities);
  const cardUsageInformationEntity = useAppSelector(state => state.cardUsageInformation.entity);
  const loading = useAppSelector(state => state.cardUsageInformation.loading);
  const updating = useAppSelector(state => state.cardUsageInformation.updating);
  const updateSuccess = useAppSelector(state => state.cardUsageInformation.updateSuccess);

  const handleClose = () => {
    navigate('/card-usage-information' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getCardTypes({}));
    dispatch(getCardBrandTypes({}));
    dispatch(getCardCategoryTypes({}));
    dispatch(getBankTransactionTypes({}));
    dispatch(getChannelTypes({}));
    dispatch(getCardStates({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...cardUsageInformationEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      cardType: cardTypes.find(it => it.id.toString() === values.cardType.toString()),
      cardBrand: cardBrandTypes.find(it => it.id.toString() === values.cardBrand.toString()),
      cardCategoryType: cardCategoryTypes.find(it => it.id.toString() === values.cardCategoryType.toString()),
      transactionType: bankTransactionTypes.find(it => it.id.toString() === values.transactionType.toString()),
      channelType: channelTypes.find(it => it.id.toString() === values.channelType.toString()),
      cardState: cardStates.find(it => it.id.toString() === values.cardState.toString()),
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
          ...cardUsageInformationEntity,
          bankCode: cardUsageInformationEntity?.bankCode?.id,
          cardType: cardUsageInformationEntity?.cardType?.id,
          cardBrand: cardUsageInformationEntity?.cardBrand?.id,
          cardCategoryType: cardUsageInformationEntity?.cardCategoryType?.id,
          transactionType: cardUsageInformationEntity?.transactionType?.id,
          channelType: cardUsageInformationEntity?.channelType?.id,
          cardState: cardUsageInformationEntity?.cardState?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.gdiDataCardUsageInformation.home.createOrEditLabel" data-cy="CardUsageInformationCreateUpdateHeading">
            Create or edit a Card Usage Information
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
                <ValidatedField name="id" required readOnly id="card-usage-information-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="card-usage-information-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Total Number Of Live Cards"
                id="card-usage-information-totalNumberOfLiveCards"
                name="totalNumberOfLiveCards"
                data-cy="totalNumberOfLiveCards"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total Active Cards"
                id="card-usage-information-totalActiveCards"
                name="totalActiveCards"
                data-cy="totalActiveCards"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total Number Of Transactions Done"
                id="card-usage-information-totalNumberOfTransactionsDone"
                name="totalNumberOfTransactionsDone"
                data-cy="totalNumberOfTransactionsDone"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Total Value Of Transactions Done In LCY"
                id="card-usage-information-totalValueOfTransactionsDoneInLCY"
                name="totalValueOfTransactionsDoneInLCY"
                data-cy="totalValueOfTransactionsDoneInLCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                id="card-usage-information-bankCode"
                name="bankCode"
                data-cy="bankCode"
                label="Bank Code"
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
                id="card-usage-information-cardType"
                name="cardType"
                data-cy="cardType"
                label="Card Type"
                type="select"
                required
              >
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
                id="card-usage-information-cardBrand"
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
                id="card-usage-information-cardCategoryType"
                name="cardCategoryType"
                data-cy="cardCategoryType"
                label="Card Category Type"
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
              <ValidatedField
                id="card-usage-information-transactionType"
                name="transactionType"
                data-cy="transactionType"
                label="Transaction Type"
                type="select"
                required
              >
                <option value="" key="0" />
                {bankTransactionTypes
                  ? bankTransactionTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.transactionTypeDetails}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="card-usage-information-channelType"
                name="channelType"
                data-cy="channelType"
                label="Channel Type"
                type="select"
                required
              >
                <option value="" key="0" />
                {channelTypes
                  ? channelTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.channelTypes}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="card-usage-information-cardState"
                name="cardState"
                data-cy="cardState"
                label="Card State"
                type="select"
                required
              >
                <option value="" key="0" />
                {cardStates
                  ? cardStates.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.cardStateFlagDetails}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/card-usage-information" replace color="info">
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

export default CardUsageInformationUpdate;
