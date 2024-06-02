import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { scrollToTop } from '../../../../../utils'
import { Image } from '../../../../../components'

export const MasterTable = ({ header, body, excludedBody, width = '100%', onDelete, handleEdit }: any) => { 
  const getCellNode = (key: any, value: any) =>{
    if(key == "customerImage"){
      return <div style={{ textAlign: 'center' }}><Image src={value} /></div>
    }else if(key == "customerComment"){
      return `${value.slice(0,60)}.....`
    }
    value = value ? value : 'N/A'
    return value
  }
  return (
    <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ width }}>
        <TableHead>
          <TableRow>
            {header && header.map((h: string, index: number)=><TableCell style={{ width: `${100/(header.length)}%`, textAlign: 'center', fontWeight: 'bold' }} key={index}>{h}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {body && body.map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{ textAlign: 'center' }}>{index+1}</TableCell>
              {Object.keys(row).filter((key: any, index: number)=> !excludedBody.includes(key)).map((key: any, index: number)=><TableCell key={index} style={{ textAlign: 'center' }}>{getCellNode(key,row[key])}</TableCell>)}
              <TableCell style={{ textAlign: 'center' }}>
                <BorderColorIcon style={{ cursor: 'pointer', marginRight: 10, marginTop: 5 }} onClick={()=> { handleEdit(row?.value); scrollToTop() }} />
                <DeleteForeverIcon style={{ cursor: 'pointer' }} onClick={()=>onDelete(row?.value)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
  )
}
