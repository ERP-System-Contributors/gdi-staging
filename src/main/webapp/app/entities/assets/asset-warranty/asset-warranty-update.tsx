import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { getEntities as getPlaceholders } from 'app/entities/system/placeholder/placeholder.reducer';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { getEntities as getUniversallyUniqueMappings } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.reducer';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { getEntities as getDealers } from 'app/entities/people/dealer/dealer.reducer';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { getEntities as getBusinessDocuments } from 'app/entities/documentation/business-document/business-document.reducer';
import { IAssetWarranty } from 'app/shared/model/assets/asset-warranty.model';
import { getEntity, updateEntity, createEntity, reset } from './asset-warranty.reducer';

export const AssetWarrantyUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const placeholders = useAppSelector(state => state.placeholder.entities);
  const universallyUniqueMappings = useAppSelector(state => state.universallyUniqueMapping.entities);
  const dealers = useAppSelector(state => state.dealer.entities);
  const businessDocuments = useAppSelector(state => state.businessDocument.entities);
  const assetWarrantyEntity = useAppSelector(state => state.assetWarranty.entity);
  const loading = useAppSelector(state => state.assetWarranty.loading);
  const updating = useAppSelector(state => state.assetWarranty.updating);
  const updateSuccess = useAppSelector(state => state.assetWarranty.updateSuccess);

  const handleClose = () => {
    navigate('/asset-warranty' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPlaceholders({}));
    dispatch(getUniversallyUniqueMappings({}));
    dispatch(getDealers({}));
    dispatch(getBusinessDocuments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...assetWarrantyEntity,
      ...values,
      placeholders: mapIdList(values.placeholders),
      universallyUniqueMappings: mapIdList(values.universallyUniqueMappings),
      warrantyAttachments: mapIdList(values.warrantyAttachments),
      dealer: dealers.find(it => it.id.toString() === values.dealer.toString()),
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
          ...assetWarrantyEntity,
          placeholders: assetWarrantyEntity?.placeholders?.map(e => e.id.toString()),
          universallyUniqueMappings: assetWarrantyEntity?.universallyUniqueMappings?.map(e => e.id.toString()),
          dealer: assetWarrantyEntity?.dealer?.id,
          warrantyAttachments: assetWarrantyEntity?.warrantyAttachments?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gdiStagingApp.assetsAssetWarranty.home.createOrEditLabel" data-cy="AssetWarrantyCreateUpdateHeading">
            Create or edit a Asset Warranty
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
                <ValidatedField name="id" required readOnly id="asset-warranty-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField label="Asset Tag" id="asset-warranty-assetTag" name="assetTag" data-cy="assetTag" type="text" />
              <ValidatedField label="Description" id="asset-warranty-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="Model Number" id="asset-warranty-modelNumber" name="modelNumber" data-cy="modelNumber" type="text" />
              <ValidatedField
                label="Serial Number"
                id="asset-warranty-serialNumber"
                name="serialNumber"
                data-cy="serialNumber"
                type="text"
              />
              <ValidatedField label="Expiry Date" id="asset-warranty-expiryDate" name="expiryDate" data-cy="expiryDate" type="date" />
              <ValidatedField
                label="Placeholder"
                id="asset-warranty-placeholder"
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
              <ValidatedField
                label="Universally Unique Mapping"
                id="asset-warranty-universallyUniqueMapping"
                data-cy="universallyUniqueMapping"
                type="select"
                multiple
                name="universallyUniqueMappings"
              >
                <option value="" key="0" />
                {universallyUniqueMappings
                  ? universallyUniqueMappings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.universalKey}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="asset-warranty-dealer" name="dealer" data-cy="dealer" label="Dealer" type="select" required>
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
                label="Warranty Attachment"
                id="asset-warranty-warrantyAttachment"
                data-cy="warrantyAttachment"
                type="select"
                multiple
                name="warrantyAttachments"
              >
                <option value="" key="0" />
                {businessDocuments
                  ? businessDocuments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.documentTitle}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/asset-warranty" replace color="info">
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

export default AssetWarrantyUpdate;
