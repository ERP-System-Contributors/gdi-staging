import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './report-design.reducer';

export const ReportDesignDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const reportDesignEntity = useAppSelector(state => state.reportDesign.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="reportDesignDetailsHeading">Report Design</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{reportDesignEntity.id}</dd>
          <dt>
            <span id="catalogueNumber">Catalogue Number</span>
          </dt>
          <dd>{reportDesignEntity.catalogueNumber}</dd>
          <dt>
            <span id="designation">Designation</span>
          </dt>
          <dd>{reportDesignEntity.designation}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{reportDesignEntity.description}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>
            {reportDesignEntity.notes ? (
              <div>
                {reportDesignEntity.notesContentType ? (
                  <a onClick={openFile(reportDesignEntity.notesContentType, reportDesignEntity.notes)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {reportDesignEntity.notesContentType}, {byteSize(reportDesignEntity.notes)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="reportFile">Report File</span>
          </dt>
          <dd>
            {reportDesignEntity.reportFile ? (
              <div>
                {reportDesignEntity.reportFileContentType ? (
                  <a onClick={openFile(reportDesignEntity.reportFileContentType, reportDesignEntity.reportFile)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {reportDesignEntity.reportFileContentType}, {byteSize(reportDesignEntity.reportFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="reportFileChecksum">Report File Checksum</span>
          </dt>
          <dd>{reportDesignEntity.reportFileChecksum}</dd>
          <dt>Parameters</dt>
          <dd>
            {reportDesignEntity.parameters
              ? reportDesignEntity.parameters.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.mappedValue}</a>
                    {reportDesignEntity.parameters && i === reportDesignEntity.parameters.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Security Clearance</dt>
          <dd>{reportDesignEntity.securityClearance ? reportDesignEntity.securityClearance.clearanceLevel : ''}</dd>
          <dt>Report Designer</dt>
          <dd>{reportDesignEntity.reportDesigner ? reportDesignEntity.reportDesigner.applicationIdentity : ''}</dd>
          <dt>Organization</dt>
          <dd>{reportDesignEntity.organization ? reportDesignEntity.organization.dealerName : ''}</dd>
          <dt>Department</dt>
          <dd>{reportDesignEntity.department ? reportDesignEntity.department.dealerName : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {reportDesignEntity.placeholders
              ? reportDesignEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {reportDesignEntity.placeholders && i === reportDesignEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>System Module</dt>
          <dd>{reportDesignEntity.systemModule ? reportDesignEntity.systemModule.moduleName : ''}</dd>
          <dt>File Check Sum Algorithm</dt>
          <dd>{reportDesignEntity.fileCheckSumAlgorithm ? reportDesignEntity.fileCheckSumAlgorithm.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/report-design" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/report-design/${reportDesignEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ReportDesignDetail;
