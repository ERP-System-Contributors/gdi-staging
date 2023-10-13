import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITerminalsAndPOS } from 'app/shared/model/gdi-data/terminals-and-pos.model';
import { searchEntities, getEntities } from './terminals-and-pos.reducer';

export const TerminalsAndPOS = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const terminalsAndPOSList = useAppSelector(state => state.terminalsAndPOS.entities);
  const loading = useAppSelector(state => state.terminalsAndPOS.loading);
  const totalItems = useAppSelector(state => state.terminalsAndPOS.totalItems);

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
      <h2 id="terminals-and-pos-heading" data-cy="TerminalsAndPOSHeading">
        Terminals And POS
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/terminals-and-pos/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Terminals And POS
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
        {terminalsAndPOSList && terminalsAndPOSList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('reportingDate')}>
                  Reporting Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('terminalId')}>
                  Terminal Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('merchantId')}>
                  Merchant Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('terminalName')}>
                  Terminal Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('terminalLocation')}>
                  Terminal Location <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('iso6709Latitute')}>
                  Iso 6709 Latitute <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('iso6709Longitude')}>
                  Iso 6709 Longitude <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('terminalOpeningDate')}>
                  Terminal Opening Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('terminalClosureDate')}>
                  Terminal Closure Date <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Terminal Type <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Terminal Functionality <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Physical Location <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Bank Id <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Branch Id <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {terminalsAndPOSList.map((terminalsAndPOS, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/terminals-and-pos/${terminalsAndPOS.id}`} color="link" size="sm">
                      {terminalsAndPOS.id}
                    </Button>
                  </td>
                  <td>
                    {terminalsAndPOS.reportingDate ? (
                      <TextFormat type="date" value={terminalsAndPOS.reportingDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{terminalsAndPOS.terminalId}</td>
                  <td>{terminalsAndPOS.merchantId}</td>
                  <td>{terminalsAndPOS.terminalName}</td>
                  <td>{terminalsAndPOS.terminalLocation}</td>
                  <td>{terminalsAndPOS.iso6709Latitute}</td>
                  <td>{terminalsAndPOS.iso6709Longitude}</td>
                  <td>
                    {terminalsAndPOS.terminalOpeningDate ? (
                      <TextFormat type="date" value={terminalsAndPOS.terminalOpeningDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {terminalsAndPOS.terminalClosureDate ? (
                      <TextFormat type="date" value={terminalsAndPOS.terminalClosureDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {terminalsAndPOS.terminalType ? (
                      <Link to={`/terminal-types/${terminalsAndPOS.terminalType.id}`}>
                        {terminalsAndPOS.terminalType.txnTerminalTypeCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {terminalsAndPOS.terminalFunctionality ? (
                      <Link to={`/terminal-functions/${terminalsAndPOS.terminalFunctionality.id}`}>
                        {terminalsAndPOS.terminalFunctionality.terminalFunctionality}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {terminalsAndPOS.physicalLocation ? (
                      <Link to={`/county-sub-county-code/${terminalsAndPOS.physicalLocation.id}`}>
                        {terminalsAndPOS.physicalLocation.subCountyCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {terminalsAndPOS.bankId ? (
                      <Link to={`/institution-code/${terminalsAndPOS.bankId.id}`}>{terminalsAndPOS.bankId.institutionName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {terminalsAndPOS.branchId ? (
                      <Link to={`/bank-branch-code/${terminalsAndPOS.branchId.id}`}>{terminalsAndPOS.branchId.branchCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/terminals-and-pos/${terminalsAndPOS.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/terminals-and-pos/${terminalsAndPOS.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/terminals-and-pos/${terminalsAndPOS.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Terminals And POS found</div>
        )}
      </div>
      {totalItems ? (
        <div className={terminalsAndPOSList && terminalsAndPOSList.length > 0 ? '' : 'd-none'}>
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

export default TerminalsAndPOS;
