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
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { getEntities as getSecurityClearances } from 'app/entities/people/security-clearance/security-clearance.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { getEntity, updateEntity, createEntity, reset } from './application-user.reducer';

export const ApplicationUserUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const dealers = useAppSelector(state => state.dealer.entities);
  const securityClearances = useAppSelector(state => state.securityClearance.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const applicationUserEntity = useAppSelector(state => state.applicationUser.entity);
  const loading = useAppSelector(state => state.applicationUser.loading);
  const updating = useAppSelector(state => state.applicationUser.updating);
  const updateSuccess = useAppSelector(state => state.applicationUser.updateSuccess);

  const handleClose = () => {
    navigate('/application-user' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDealers({}));
    dispatch(getSecurityClearances({}));
    dispatch(getUsers({}));
    dispatch(getUniversallyUniqueMappings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...applicationUserEntity,
      ...values,
      userProperties: mapIdList(values.userProperties),
      organization: dealers.find(it => it.id.toString() === values.organization.toString()),
      department: dealers.find(it => it.id.toString() === values.department.toString()),
      dealerIdentity: dealers.find(it => it.id.toString() === values.dealerIdentity.toString()),
      securityClearance: securityClearances.find(it => it.id.toString() === values.securityClearance.toString()),
      systemIdentity: users.find(it => it.id.toString() === values.systemIdentity.toString()),
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
          ...applicationUserEntity,
          organization: applicationUserEntity?.organization?.id,
          department: applicationUserEntity?.department?.id,
          securityClearance: applicationUserEntity?.securityClearance?.id,
          systemIdentity: applicationUserEntity?.systemIdentity?.id,
          userProperties: applicationUserEntity?.userProperties?.map(e => e.id.toString()),
          dealerIdentity: applicationUserEntity?.dealerIdentity?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.peopleApplicationUser.home.createOrEditLabel" data-cy="ApplicationUserCreateUpdateHeading">
            Create or edit a Application User
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
                <ValidatedField name="id" required readOnly id="application-user-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Designation"
                id="application-user-designation"
                name="designation"
                data-cy="designation"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Application Identity"
                id="application-user-applicationIdentity"
                name="applicationIdentity"
                data-cy="applicationIdentity"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                id="application-user-organization"
                name="organization"
                data-cy="organization"
                label="Organization"
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
                id="application-user-department"
                name="department"
                data-cy="department"
                label="Department"
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
                id="application-user-securityClearance"
                name="securityClearance"
                data-cy="securityClearance"
                label="Security Clearance"
                type="select"
                required
              >
                <option value="" key="0" />
                {securityClearances
                  ? securityClearances.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.clearanceLevel}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                id="application-user-systemIdentity"
                name="systemIdentity"
                data-cy="systemIdentity"
                label="System Identity"
                type="select"
                required
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField
                label="User Properties"
                id="application-user-userProperties"
                data-cy="userProperties"
                type="select"
                multiple
                name="userProperties"
              >
                <option value="" key="0" />
                {universallyUniqueMappings
                  ? universallyUniqueMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.mappedValue}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="application-user-dealerIdentity"
                name="dealerIdentity"
                data-cy="dealerIdentity"
                label="Dealer Identity"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/application-user" replace color="info">
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

export default ApplicationUserUpdate;
