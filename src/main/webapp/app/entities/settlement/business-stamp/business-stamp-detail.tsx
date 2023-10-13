import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './business-stamp.reducer';

export const BusinessStampDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const businessStampEntity = useAppSelector(state => state.businessStamp.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="businessStampDetailsHeading">Business Stamp</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{businessStampEntity.id}</dd>
          <dt>
            <span id="stampDate">Stamp Date</span>
          </dt>
          <dd>
            {businessStampEntity.stampDate ? (
              <TextFormat value={businessStampEntity.stampDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="purpose">Purpose</span>
          </dt>
          <dd>{businessStampEntity.purpose}</dd>
          <dt>
            <span id="details">Details</span>
          </dt>
          <dd>{businessStampEntity.details}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{businessStampEntity.remarks}</dd>
          <dt>Stamp Holder</dt>
          <dd>{businessStampEntity.stampHolder ? businessStampEntity.stampHolder.dealerName : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {businessStampEntity.placeholders
              ? businessStampEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {businessStampEntity.placeholders && i === businessStampEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/business-stamp" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/business-stamp/${businessStampEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BusinessStampDetail;
