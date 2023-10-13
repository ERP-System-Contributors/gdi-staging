import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fixed-asset-net-book-value.reducer';

export const FixedAssetNetBookValueDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fixedAssetNetBookValueEntity = useAppSelector(state => state.fixedAssetNetBookValue.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fixedAssetNetBookValueDetailsHeading">Fixed Asset Net Book Value</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{fixedAssetNetBookValueEntity.id}</dd>
          <dt>
            <span id="assetNumber">Asset Number</span>
          </dt>
          <dd>{fixedAssetNetBookValueEntity.assetNumber}</dd>
          <dt>
            <span id="serviceOutletCode">Service Outlet Code</span>
          </dt>
          <dd>{fixedAssetNetBookValueEntity.serviceOutletCode}</dd>
          <dt>
            <span id="assetTag">Asset Tag</span>
          </dt>
          <dd>{fixedAssetNetBookValueEntity.assetTag}</dd>
          <dt>
            <span id="assetDescription">Asset Description</span>
          </dt>
          <dd>{fixedAssetNetBookValueEntity.assetDescription}</dd>
          <dt>
            <span id="netBookValueDate">Net Book Value Date</span>
          </dt>
          <dd>
            {fixedAssetNetBookValueEntity.netBookValueDate ? (
              <TextFormat value={fixedAssetNetBookValueEntity.netBookValueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="assetCategory">Asset Category</span>
          </dt>
          <dd>{fixedAssetNetBookValueEntity.assetCategory}</dd>
          <dt>
            <span id="netBookValue">Net Book Value</span>
          </dt>
          <dd>{fixedAssetNetBookValueEntity.netBookValue}</dd>
          <dt>
            <span id="depreciationRegime">Depreciation Regime</span>
          </dt>
          <dd>{fixedAssetNetBookValueEntity.depreciationRegime}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{fixedAssetNetBookValueEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{fixedAssetNetBookValueEntity.compilationToken}</dd>
          <dt>Placeholder</dt>
          <dd>
            {fixedAssetNetBookValueEntity.placeholders
              ? fixedAssetNetBookValueEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {fixedAssetNetBookValueEntity.placeholders && i === fixedAssetNetBookValueEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/fixed-asset-net-book-value" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fixed-asset-net-book-value/${fixedAssetNetBookValueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FixedAssetNetBookValueDetail;
