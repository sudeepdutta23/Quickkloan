import { CircularProgress } from '@mui/material'
interface loaderType{
    isFullPage?: boolean;
}

export const Loader = ({ isFullPage = false }: loaderType) => {
    return (!isFullPage ? <CircularProgress /> : <div style={{ minHeight: "80vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></div>
    )
}
