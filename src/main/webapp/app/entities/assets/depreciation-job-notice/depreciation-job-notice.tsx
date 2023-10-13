import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { byteSize, translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDepreciationJobNotice } from 'app/shared/model/assets/depreciation-job-notice.model';
import { searchEntities, getEntities } from './depreciation-job-notice.reducer';

export const DepreciationJobNotice = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const depreciationJobNoticeList = useAppSelector(state => state.depreciationJobNotice.entities);
  const loading = useAppSelector(state => state.depreciationJobNotice.loading);
  const totalItems = useAppSelector(state => state.depreciationJobNotice.totalItems);

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
      <h2 id="depreciation-job-notice-heading" data-cy="DepreciationJobNoticeHeading">
        Depreciation Job Notices
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/depreciation-job-notice/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Depreciation Job Notice
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
        {depreciationJobNoticeList && depreciationJobNoticeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('eventNarrative')}>
                  Event Narrative <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('eventTimeStamp')}>
                  Event Time Stamp <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('depreciationNoticeStatus')}>
                  Depreciation Notice Status <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sourceModule')}>
                  Source Module <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sourceEntity')}>
                  Source Entity <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('errorCode')}>
                  Error Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('errorMessage')}>
                  Error Message <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('userAction')}>
                  User Action <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('technicalDetails')}>
                  Technical Details <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Depreciation Job <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Depreciation Batch Sequence <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Depreciation Period <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Superintended <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {depreciationJobNoticeList.map((depreciationJobNotice, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/depreciation-job-notice/${depreciationJobNotice.id}`} color="link" size="sm">
                      {depreciationJobNotice.id}
                    </Button>
                  </td>
                  <td>{depreciationJobNotice.eventNarrative}</td>
                  <td>
                    {depreciationJobNotice.eventTimeStamp ? (
                      <TextFormat type="date" value={depreciationJobNotice.eventTimeStamp} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{depreciationJobNotice.depreciationNoticeStatus}</td>
                  <td>{depreciationJobNotice.sourceModule}</td>
                  <td>{depreciationJobNotice.sourceEntity}</td>
                  <td>{depreciationJobNotice.errorCode}</td>
                  <td>{depreciationJobNotice.errorMessage}</td>
                  <td>{depreciationJobNotice.userAction}</td>
                  <td>{depreciationJobNotice.technicalDetails}</td>
                  <td>
                    {depreciationJobNotice.depreciationJob ? (
                      <Link to={`/depreciation-job/${depreciationJobNotice.depreciationJob.id}`}>
                        {depreciationJobNotice.depreciationJob.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {depreciationJobNotice.depreciationBatchSequence ? (
                      <Link to={`/depreciation-batch-sequence/${depreciationJobNotice.depreciationBatchSequence.id}`}>
                        {depreciationJobNotice.depreciationBatchSequence.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {depreciationJobNotice.depreciationPeriod ? (
                      <Link to={`/depreciation-period/${depreciationJobNotice.depreciationPeriod.id}`}>
                        {depreciationJobNotice.depreciationPeriod.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {depreciationJobNotice.superintended ? (
                      <Link to={`/application-user/${depreciationJobNotice.superintended.id}`}>
                        {depreciationJobNotice.superintended.applicationIdentity}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/depreciation-job-notice/${depreciationJobNotice.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/depreciation-job-notice/${depreciationJobNotice.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/depreciation-job-notice/${depreciationJobNotice.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Depreciation Job Notices found</div>
        )}
      </div>
      {totalItems ? (
        <div className={depreciationJobNoticeList && depreciationJobNoticeList.length > 0 ? '' : 'd-none'}>
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

export default DepreciationJobNotice;
