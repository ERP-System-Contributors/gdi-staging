import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset-category.reducer';

export const AssetCategoryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetCategoryEntity = useAppSelector(state => state.assetCategory.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetCategoryDetailsHeading">Asset Category</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{assetCategoryEntity.id}</dd>
          <dt>
            <span id="assetCategoryName">Asset Category Name</span>
          </dt>
          <dd>{assetCategoryEntity.assetCategoryName}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{assetCategoryEntity.description}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{assetCategoryEntity.notes}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{assetCategoryEntity.remarks}</dd>
          <dt>
            <span id="depreciationRateYearly">Depreciation Rate Yearly</span>
          </dt>
          <dd>{assetCategoryEntity.depreciationRateYearly}</dd>
          <dt>Depreciation Method</dt>
          <dd>{assetCategoryEntity.depreciationMethod ? assetCategoryEntity.depreciationMethod.depreciationMethodName : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {assetCategoryEntity.placeholders
              ? assetCategoryEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {assetCategoryEntity.placeholders && i === assetCategoryEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/asset-category" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset-category/${assetCategoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssetCategoryDetail;
