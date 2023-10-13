import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset-warranty.reducer';

export const AssetWarrantyDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetWarrantyEntity = useAppSelector(state => state.assetWarranty.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetWarrantyDetailsHeading">Asset Warranty</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{assetWarrantyEntity.id}</dd>
          <dt>
            <span id="assetTag">Asset Tag</span>
          </dt>
          <dd>{assetWarrantyEntity.assetTag}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{assetWarrantyEntity.description}</dd>
          <dt>
            <span id="modelNumber">Model Number</span>
          </dt>
          <dd>{assetWarrantyEntity.modelNumber}</dd>
          <dt>
            <span id="serialNumber">Serial Number</span>
          </dt>
          <dd>{assetWarrantyEntity.serialNumber}</dd>
          <dt>
            <span id="expiryDate">Expiry Date</span>
          </dt>
          <dd>
            {assetWarrantyEntity.expiryDate ? (
              <TextFormat value={assetWarrantyEntity.expiryDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {assetWarrantyEntity.placeholders
              ? assetWarrantyEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {assetWarrantyEntity.placeholders && i === assetWarrantyEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Universally Unique Mapping</dt>
          <dd>
            {assetWarrantyEntity.universallyUniqueMappings
              ? assetWarrantyEntity.universallyUniqueMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {assetWarrantyEntity.universallyUniqueMappings && i === assetWarrantyEntity.universallyUniqueMappings.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Dealer</dt>
          <dd>{assetWarrantyEntity.dealer ? assetWarrantyEntity.dealer.dealerName : ''}</dd>
          <dt>Warranty Attachment</dt>
          <dd>
            {assetWarrantyEntity.warrantyAttachments
              ? assetWarrantyEntity.warrantyAttachments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {assetWarrantyEntity.warrantyAttachments && i === assetWarrantyEntity.warrantyAttachments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/asset-warranty" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset-warranty/${assetWarrantyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssetWarrantyDetail;
