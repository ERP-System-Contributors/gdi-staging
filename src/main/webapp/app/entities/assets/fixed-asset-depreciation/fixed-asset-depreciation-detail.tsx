import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fixed-asset-depreciation.reducer';

export const FixedAssetDepreciationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fixedAssetDepreciationEntity = useAppSelector(state => state.fixedAssetDepreciation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fixedAssetDepreciationDetailsHeading">Fixed Asset Depreciation</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{fixedAssetDepreciationEntity.id}</dd>
          <dt>
            <span id="assetNumber">Asset Number</span>
          </dt>
          <dd>{fixedAssetDepreciationEntity.assetNumber}</dd>
          <dt>
            <span id="serviceOutletCode">Service Outlet Code</span>
          </dt>
          <dd>{fixedAssetDepreciationEntity.serviceOutletCode}</dd>
          <dt>
            <span id="assetTag">Asset Tag</span>
          </dt>
          <dd>{fixedAssetDepreciationEntity.assetTag}</dd>
          <dt>
            <span id="assetDescription">Asset Description</span>
          </dt>
          <dd>{fixedAssetDepreciationEntity.assetDescription}</dd>
          <dt>
            <span id="depreciationDate">Depreciation Date</span>
          </dt>
          <dd>
            {fixedAssetDepreciationEntity.depreciationDate ? (
              <TextFormat value={fixedAssetDepreciationEntity.depreciationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="assetCategory">Asset Category</span>
          </dt>
          <dd>{fixedAssetDepreciationEntity.assetCategory}</dd>
          <dt>
            <span id="depreciationAmount">Depreciation Amount</span>
          </dt>
          <dd>{fixedAssetDepreciationEntity.depreciationAmount}</dd>
          <dt>
            <span id="depreciationRegime">Depreciation Regime</span>
          </dt>
          <dd>{fixedAssetDepreciationEntity.depreciationRegime}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{fixedAssetDepreciationEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{fixedAssetDepreciationEntity.compilationToken}</dd>
          <dt>Placeholder</dt>
          <dd>
            {fixedAssetDepreciationEntity.placeholders
              ? fixedAssetDepreciationEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {fixedAssetDepreciationEntity.placeholders && i === fixedAssetDepreciationEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/fixed-asset-depreciation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fixed-asset-depreciation/${fixedAssetDepreciationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FixedAssetDepreciationDetail;
