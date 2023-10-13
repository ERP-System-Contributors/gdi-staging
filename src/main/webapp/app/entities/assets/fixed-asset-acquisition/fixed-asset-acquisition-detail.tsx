import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fixed-asset-acquisition.reducer';

export const FixedAssetAcquisitionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fixedAssetAcquisitionEntity = useAppSelector(state => state.fixedAssetAcquisition.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fixedAssetAcquisitionDetailsHeading">Fixed Asset Acquisition</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{fixedAssetAcquisitionEntity.id}</dd>
          <dt>
            <span id="assetNumber">Asset Number</span>
          </dt>
          <dd>{fixedAssetAcquisitionEntity.assetNumber}</dd>
          <dt>
            <span id="serviceOutletCode">Service Outlet Code</span>
          </dt>
          <dd>{fixedAssetAcquisitionEntity.serviceOutletCode}</dd>
          <dt>
            <span id="assetTag">Asset Tag</span>
          </dt>
          <dd>{fixedAssetAcquisitionEntity.assetTag}</dd>
          <dt>
            <span id="assetDescription">Asset Description</span>
          </dt>
          <dd>{fixedAssetAcquisitionEntity.assetDescription}</dd>
          <dt>
            <span id="purchaseDate">Purchase Date</span>
          </dt>
          <dd>
            {fixedAssetAcquisitionEntity.purchaseDate ? (
              <TextFormat value={fixedAssetAcquisitionEntity.purchaseDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="assetCategory">Asset Category</span>
          </dt>
          <dd>{fixedAssetAcquisitionEntity.assetCategory}</dd>
          <dt>
            <span id="purchasePrice">Purchase Price</span>
          </dt>
          <dd>{fixedAssetAcquisitionEntity.purchasePrice}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{fixedAssetAcquisitionEntity.fileUploadToken}</dd>
          <dt>Placeholder</dt>
          <dd>
            {fixedAssetAcquisitionEntity.placeholders
              ? fixedAssetAcquisitionEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {fixedAssetAcquisitionEntity.placeholders && i === fixedAssetAcquisitionEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/fixed-asset-acquisition" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fixed-asset-acquisition/${fixedAssetAcquisitionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FixedAssetAcquisitionDetail;
