import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './related-party-relationship.reducer';

export const RelatedPartyRelationshipDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const relatedPartyRelationshipEntity = useAppSelector(state => state.relatedPartyRelationship.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="relatedPartyRelationshipDetailsHeading">Related Party Relationship</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{relatedPartyRelationshipEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {relatedPartyRelationshipEntity.reportingDate ? (
              <TextFormat value={relatedPartyRelationshipEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="customerId">Customer Id</span>
          </dt>
          <dd>{relatedPartyRelationshipEntity.customerId}</dd>
          <dt>
            <span id="relatedPartyId">Related Party Id</span>
          </dt>
          <dd>{relatedPartyRelationshipEntity.relatedPartyId}</dd>
          <dt>Bank Code</dt>
          <dd>{relatedPartyRelationshipEntity.bankCode ? relatedPartyRelationshipEntity.bankCode.institutionName : ''}</dd>
          <dt>Branch Id</dt>
          <dd>{relatedPartyRelationshipEntity.branchId ? relatedPartyRelationshipEntity.branchId.branchCode : ''}</dd>
          <dt>Relationship Type</dt>
          <dd>
            {relatedPartyRelationshipEntity.relationshipType ? relatedPartyRelationshipEntity.relationshipType.partyRelationType : ''}
          </dd>
        </dl>
        <Button tag={Link} to="/related-party-relationship" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/related-party-relationship/${relatedPartyRelationshipEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default RelatedPartyRelationshipDetail;
