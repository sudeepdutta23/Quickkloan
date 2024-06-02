import "./style.css";
import { Card, CardContent, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import moment from "moment";
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Datepicker, TextInput, H2, Paginate } from '../../../components';
import Select from '../../../components/UI/TextInput/Select';
import { downloadExcelLeadsReport, getFilterLeads, getStatus } from "../../../services/";
import { createSignal } from '../../../utils';
import { useNavigate } from "react-router-dom";
import { PaginateLink } from "../../../components/Pagination";

const Leads = () => {
    const [leadStatus, setLeadStatus] = useState<any>([])
    const navigate = useNavigate();
    useEffect(() => {
        const { controller, signal} = createSignal();
        (async () => {
            await getFilterLeadRecords();
            const { data, error } = await getStatus(signal);
            if(data?.abort) return;
            if (!error) {
                setLeadStatus(data)
            }
        })();

        return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const dateFormat = 'YYYY-MM-DD';
    const initialValue = {
        searchValue: '',
        type: 'all',
        fromDate: moment().subtract(7,'d'),
        toDate: moment(),
        orderBy: 'leadId',
        sort: 'desc',
        leadStatus: ''
    }
    const [filters, setFilters] = useState<any>(initialValue)
    const [loadingDownload, setLoadingDownload] = useState(false)

    const header = ['Lead Id', 'Full Name', 'Loan Amount', 'Loan Type', 'Lead Stage', 'Lead Status', 'Created Date'];

    const [data, setData] = useState<any>(null)

    const [status, setStatus] = useState("");
    const [tableLoading, setLoadTable] = useState(false)


    const getFilterLeadRecords = async () => {
        setLoadTable(true)
        const { signal} = createSignal();
        const { data, error } = await getFilterLeads(filters, signal);
        if(data?.abort) return;
        if (!error) {
            setData(data?.records)
            setLoadTable(false)
        } else {
            toast.error(data?.message)
            setLoadTable(false)
        }
    }

    const onSearch = async () => {
        setLoadTable(true)
        const { signal} = createSignal();
        const { data, error } = await getFilterLeads(filters, signal);
        if (!error) {
            setData(data?.records)
            setLoadTable(false)
        } else {
            toast.error(data?.message)
            setLoadTable(false)
        }
    };


    const handleStatusChange = async (e: any) => {
        setLoadTable(true);
        if (!e) return
        setStatus(e.target.value)
        setFilters({ ...filters, leadStatus: e.target.value })
        const { signal} = createSignal();
        const { data, error } = await getFilterLeads({ ...filters, leadStatus: e.target.value }, signal);
        if (!error) {
            setData(data?.records)
            setLoadTable(false)
        } else {
            toast.error(data?.message)
            setLoadTable(false)
        }
    }

    const fromDateChange = async (event: any) => {
        let fromDate = event ? moment(event) : '';
        setLoadTable(true)
        setFilters({ ...filters, fromDate })
        const { signal} = createSignal();
        const { data, error } = await getFilterLeads({ ...filters, fromDate }, signal);
        if (!error) {
            setData(data?.records)
            setLoadTable(false)
        } else {
            toast.error(data?.message)
            setLoadTable(false)
        }
    }

    const toDateChange = async (event: any) => {
        setLoadTable(true)
        let toDate = event ? moment(event) : '';
        setFilters({ ...filters, toDate })
        const { signal} = createSignal();
        const { data, error } = await getFilterLeads({ ...filters, toDate }, signal);
        if (!error) {
            setData(data?.records)
            setLoadTable(false)
        } else {
            toast.error(data?.message)
            setLoadTable(false)
        }
    }

    const downloadExcelReport = async () => {
        setLoadingDownload(true)
        const { signal} = createSignal();
        const { error } = await downloadExcelLeadsReport({ ...filters, isExport: true }, signal, `page=${Number(data?.links.filter((i: PaginateLink) => i.active)?.[0]?.label)}`);
        if (!error) {
            setTimeout(() => {
                setLoadingDownload(false)
            }, 500)
        }
    }


    const handleChange = async(event: any, value: any) => {
        setLoadTable(true)
        const { signal} = createSignal();
        const { data: leads, error } = await getFilterLeads(filters, signal, `page=${Number(value[value.length-1])}`);
        if (!error) {
            setData(leads?.records)
            setLoadTable(false)
        } else {
            toast.error(leads?.message)
            setLoadTable(false)
        }
    }

    return (
        <div>
            <Card className='mx-3 allLeadsHeader'>
                <CardContent>
                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', pl: 3 }}>
                        <H2 text='Lead Listing' />
                    </Grid>
                </CardContent>
            </Card>
            <div>
                <Card className='mx-3 mt-2'>
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                                <Datepicker sx={{ width: '100%' }} name="dateFrom" format={dateFormat} disableFuture={true} value={filters.fromDate} onChange={fromDateChange}/>
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                                <Datepicker sx={{ width: '100%' }} name="dateTo" format={dateFormat} disableFuture={true} value={filters.toDate} onChange={toDateChange} />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                                <Select
                                    label="Status"
                                    options={leadStatus}
                                    onChange={handleStatusChange}
                                    value={status}
                                />
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={0} xs={0}></Grid>
                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                <div className='d-flex'>
                                    <TextInput style={{ width: '100%' }} size="medium" value={filters?.searchValue} placeholder='Search by Lead id, Loan type, Loan amount' onChange={(e: any) => setFilters({ ...filters, searchValue: e.target.value })} onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && onSearch()} position="end" icon={<SearchIcon style={{ cursor: 'pointer' }} onClick={onSearch} />} />
                                    <Tooltip  placement="bottom" title="Export Excel Report">
                                        <IconButton disabled={loadingDownload} sx={{ mx: 2, mb: 2 }} onClick={downloadExcelReport}>
                                            {loadingDownload ? <CircularProgress /> : <GetAppIcon />}
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className='mx-3 mt-2'>
                    <CardContent>
                    {!tableLoading ? <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                        {Array.from(header).map((_, index) =><TableCell key={index}>{_}</TableCell>)}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data && Array.from(data?.data).map((_: any, index) => (
                            <TableRow
                            key={_.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate(`/admin/leads/${_.leadId}`)}>{_.leadId}</TableCell>
                                <TableCell align="left">{_.fullName}</TableCell>
                                <TableCell align="left">{_.loanAmount}</TableCell>
                                <TableCell align="left">{_.loanType}</TableCell>
                                <TableCell align="left">{_.stageName}</TableCell>
                                <TableCell align="left">{_.statusName}</TableCell>
                                <TableCell align="left">{moment(_.createdAt).format('YYYY-MM-DD')}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>: <div className='d-flex justify-content-center align-items-center mb-5'>
                            <CircularProgress /> &nbsp;&nbsp;<span>Loading....</span>
                        </div>}
                    {data?.data ? <Paginate links={data?.links} path={data?.path} handleChange={handleChange} /> : null}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Leads;