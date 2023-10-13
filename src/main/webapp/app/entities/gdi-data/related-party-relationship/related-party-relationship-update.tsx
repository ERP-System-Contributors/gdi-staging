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
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { getEntities as getBankBranchCodes } from 'app/entities/gdi/bank-branch-code/bank-branch-code.reducer';
import { IPartyRelationType } from 'app/shared/model/gdi/party-relation-type.model';
import { getEntities as getPartyRelationTypes } from 'app/entities/gdi/party-relation-type/party-relation-type.reducer';
import { IRelatedPartyRelationship } from 'app/shared/model/gdi-data/related-party-relationship.model';
import { getEntity, updateEntity, createEntity, reset } from './related-party-relationship.reducer';

export const RelatedPartyRelationshipUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const institutionCodes = useAppSelector(state => state.institutionCode.entities);
  const bankBranchCodes = useAppSelector(state => state.bankBranchCode.entities);
  const partyRelationTypes = useAppSelector(state => state.partyRelationType.entities);
  const relatedPartyRelationshipEntity = useAppSelector(state => state.relatedPartyRelationship.entity);
  const loading = useAppSelector(state => state.relatedPartyRelationship.loading);
  const updating = useAppSelector(state => state.relatedPartyRelationship.updating);
  const updateSuccess = useAppSelector(state => state.relatedPartyRelationship.updateSuccess);

  const handleClose = () => {
    navigate('/related-party-relationship' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstitutionCodes({}));
    dispatch(getBankBranchCodes({}));
    dispatch(getPartyRelationTypes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...relatedPartyRelationshipEntity,
      ...values,
      bankCode: institutionCodes.find(it => it.id.toString() === values.bankCode.toString()),
      branchId: bankBranchCodes.find(it => it.id.toString() === values.branchId.toString()),
      relationshipType: partyRelationTypes.find(it => it.id.toString() === values.relationshipType.toString()),
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
          ...relatedPartyRelationshipEntity,
          bankCode: relatedPartyRelationshipEntity?.bankCode?.id,
          branchId: relatedPartyRelationshipEntity?.branchId?.id,
          relationshipType: relatedPartyRelationshipEntity?.relationshipType?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="gdiStagingApp.gdiDataRelatedPartyRelationship.home.createOrEditLabel"
            data-cy="RelatedPartyRelationshipCreateUpdateHeading"
          >
            Create or edit a Related Party Relationship
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
                <ValidatedField name="id" required readOnly id="related-party-relationship-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Reporting Date"
                id="related-party-relationship-reportingDate"
                name="reportingDate"
                data-cy="reportingDate"
                type="date"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Customer Id"
                id="related-party-relationship-customerId"
                name="customerId"
                data-cy="customerId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Related Party Id"
                id="related-party-relationship-relatedPartyId"
                name="relatedPartyId"
                data-cy="relatedPartyId"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                id="related-party-relationship-bankCode"
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
                id="related-party-relationship-branchId"
                name="branchId"
                data-cy="branchId"
                label="Branch Id"
                type="select"
                required
              >
                <option value="" key="0" />
                {bankBranchCodes
                  ? bankBranchCodes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.branchCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="related-party-relationship-relationshipType"
                name="relationshipType"
                data-cy="relationshipType"
                label="Relationship Type"
                type="select"
                required
              >
                <option value="" key="0" />
                {partyRelationTypes
                  ? partyRelationTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.partyRelationType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/related-party-relationship" replace color="info">
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

export default RelatedPartyRelationshipUpdate;
