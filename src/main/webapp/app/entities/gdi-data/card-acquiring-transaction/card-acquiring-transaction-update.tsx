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
import { IChannelType } from 'app/shared/model/gdi/channel-type.model';
import { getEntities as getChannelTypes } from 'app/entities/gdi/channel-type/channel-type.reducer';
import { ICardBrandType } from 'app/shared/model/gdi/card-brand-type.model';
import { getEntities as getCardBrandTypes } from 'app/entities/gdi/card-brand-type/card-brand-type.reducer';
import { IIsoCurrencyCode } from 'app/shared/model/gdi/iso-currency-code.model';
import { getEntities as getIsoCurrencyCodes } from 'app/entities/gdi/iso-currency-code/iso-currency-code.reducer';
import { ICardCategoryType } from 'app/shared/model/gdi/card-category-type.model';
import { getEntities as getCardCategoryTypes } from 'app/entities/gdi/card-category-type/card-category-type.reducer';
import { ICardAcquiringTransaction } from 'app/shared/model/gdi-data/card-acquiring-transaction.model';
import { getEntity, updateEntity, createEntity, reset } from './card-acquiring-transaction.reducer';

export const CardAcquiringTransactionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const channelTypes = useAppSelector(state => state.channelType.entities);
  const cardBrandTypes = useAppSelector(state => state.cardBrandType.entities);
  const isoCurrencyCodes = useAppSelector(state => state.isoCurrencyCode.entities);
  const cardCategoryTypes = useAppSelector(state => state.cardCategoryType.entities);
  const cardAcquiringTransactionEntity = useAppSelector(state => state.cardAcquiringTransaction.entity);
  const loading = useAppSelector(state => state.cardAcquiringTransaction.loading);
  const updating = useAppSelector(state => state.cardAcquiringTransaction.updating);
  const updateSuccess = useAppSelector(state => state.cardAcquiringTransaction.updateSuccess);

  const handleClose = () => {
    navigate('/card-acquiring-transaction' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getChannelTypes({}));
    dispatch(getCardBrandTypes({}));
    dispatch(getIsoCurrencyCodes({}));
    dispatch(getCardCategoryTypes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...cardAcquiringTransactionEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      channelType: channelTypes.find(it => it.id.toString() === values.channelType.toString()),
      cardBrandType: cardBrandTypes.find(it => it.id.toString() === values.cardBrandType.toString()),
      currencyOfTransaction: isoCurrencyCodes.find(it => it.id.toString() === values.currencyOfTransaction.toString()),
      cardIssuerCategory: cardCategoryTypes.find(it => it.id.toString() === values.cardIssuerCategory.toString()),
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
          ...cardAcquiringTransactionEntity,
          bankCode: cardAcquiringTransactionEntity?.bankCode?.id,
          channelType: cardAcquiringTransactionEntity?.channelType?.id,
          cardBrandType: cardAcquiringTransactionEntity?.cardBrandType?.id,
          currencyOfTransaction: cardAcquiringTransactionEntity?.currencyOfTransaction?.id,
          cardIssuerCategory: cardAcquiringTransactionEntity?.cardIssuerCategory?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="gdiStagingApp.gdiDataCardAcquiringTransaction.home.createOrEditLabel"
            data-cy="CardAcquiringTransactionCreateUpdateHeading"
          >
            Create or edit a Card Acquiring Transaction
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
                <ValidatedField name="id" required readOnly id="card-acquiring-transaction-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="card-acquiring-transaction-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Terminal Id"
                id="card-acquiring-transaction-terminalId"
                name="terminalId"
                data-cy="terminalId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Number Of Transactions"
                id="card-acquiring-transaction-numberOfTransactions"
                name="numberOfTransactions"
                data-cy="numberOfTransactions"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Value Of Transactions In LCY"
                id="card-acquiring-transaction-valueOfTransactionsInLCY"
                name="valueOfTransactionsInLCY"
                data-cy="valueOfTransactionsInLCY"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                id="card-acquiring-transaction-bankCode"
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
                id="card-acquiring-transaction-channelType"
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
                id="card-acquiring-transaction-cardBrandType"
                name="cardBrandType"
                data-cy="cardBrandType"
                label="Card Brand Type"
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
                id="card-acquiring-transaction-currencyOfTransaction"
                name="currencyOfTransaction"
                data-cy="currencyOfTransaction"
                label="Currency Of Transaction"
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
              <ValidatedField
                id="card-acquiring-transaction-cardIssuerCategory"
                name="cardIssuerCategory"
                data-cy="cardIssuerCategory"
                label="Card Issuer Category"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/card-acquiring-transaction" replace color="info">
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

export default CardAcquiringTransactionUpdate;
