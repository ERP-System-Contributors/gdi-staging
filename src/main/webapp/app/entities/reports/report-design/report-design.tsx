import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { openFile, byteSize, translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IReportDesign } from 'app/shared/model/reports/report-design.model';
import { searchEntities, getEntities } from './report-design.reducer';

export const ReportDesign = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const reportDesignList = useAppSelector(state => state.reportDesign.entities);
  const loading = useAppSelector(state => state.reportDesign.loading);
  const totalItems = useAppSelector(state => state.reportDesign.totalItems);

  const getAllEntities = () => {
    if (search) {
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    } else {
      dispatch(
        getEntities({
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
  };

  const startSearching = e => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
    e.preventDefault();
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="report-design-heading" data-cy="ReportDesignHeading">
        Report Designs
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/report-design/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Report Design
          </Link>
        </div>
      </h2>
      <Row>
        <Col sm="12">
          <Form onSubmit={startSearching}>
            <FormGroup>
              <InputGroup>
                <Input type="text" name="search" defaultValue={search} onChange={handleSearch} placeholder="Search" />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <div className="table-responsive">
        {reportDesignList && reportDesignList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('catalogueNumber')}>
                  Catalogue Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('designation')}>
                  Designation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('notes')}>
                  Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportFile')}>
                  Report File <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportFileChecksum')}>
                  Report File Checksum <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Security Clearance <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Report Designer <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Organization <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Department <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  System Module <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  File Check Sum Algorithm <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reportDesignList.map((reportDesign, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/report-design/${reportDesign.id}`} color="link" size="sm">
                      {reportDesign.id}
                    </Button>
                  </td>
                  <td>{reportDesign.catalogueNumber}</td>
                  <td>{reportDesign.designation}</td>
                  <td>{reportDesign.description}</td>
                  <td>
                    {reportDesign.notes ? (
                      <div>
                        {reportDesign.notesContentType ? (
                          <a onClick={openFile(reportDesign.notesContentType, reportDesign.notes)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {reportDesign.notesContentType}, {byteSize(reportDesign.notes)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {reportDesign.reportFile ? (
                      <div>
                        {reportDesign.reportFileContentType ? (
                          <a onClick={openFile(reportDesign.reportFileContentType, reportDesign.reportFile)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {reportDesign.reportFileContentType}, {byteSize(reportDesign.reportFile)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{reportDesign.reportFileChecksum}</td>
                  <td>
                    {reportDesign.securityClearance ? (
                      <Link to={`/security-clearance/${reportDesign.securityClearance.id}`}>
                        {reportDesign.securityClearance.clearanceLevel}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {reportDesign.reportDesigner ? (
                      <Link to={`/application-user/${reportDesign.reportDesigner.id}`}>
                        {reportDesign.reportDesigner.applicationIdentity}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {reportDesign.organization ? (
                      <Link to={`/dealer/${reportDesign.organization.id}`}>{reportDesign.organization.dealerName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {reportDesign.department ? (
                      <Link to={`/dealer/${reportDesign.department.id}`}>{reportDesign.department.dealerName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {reportDesign.systemModule ? (
                      <Link to={`/system-module/${reportDesign.systemModule.id}`}>{reportDesign.systemModule.moduleName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {reportDesign.fileCheckSumAlgorithm ? (
                      <Link to={`/algorithm/${reportDesign.fileCheckSumAlgorithm.id}`}>{reportDesign.fileCheckSumAlgorithm.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/report-design/${reportDesign.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/report-design/${reportDesign.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/report-design/${reportDesign.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Report Designs found</div>
        )}
      </div>
      {totalItems ? (
        <div className={reportDesignList && reportDesignList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ReportDesign;
