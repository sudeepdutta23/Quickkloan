import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { encryptData } from "../../utils";
import { Button } from "../UI";

export const LeadListingTable = ({ value, handleApply }: any) => {

  const handleViewForm = (body: any) => {
    const hash = encryptData(`${body?.leadId}/${body?.stageId}/${body?.stageName}/${body?.status}`)
    window.open(`#/dashboard/leads/${hash}`, '_blank');
  }
  return (value && value.length == 0 ? <div className='container text-center'>
    <div className='h3 font-weight-bold'>
      No Data Found
    </div>
  </div>
    : <TableContainer style={{ maxHeight: 500 }}>
      <Table sx={{ minWidth: 950 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="text-center">Id</TableCell>
            <TableCell className="text-center">Lead Id</TableCell>
            <TableCell className="text-center">Name</TableCell>
            <TableCell className="text-center">Loan Amount</TableCell>
            <TableCell className="text-center">Loan Type</TableCell>
            <TableCell className="text-center">Lead Stage</TableCell>
            <TableCell className="text-center">Lead Status</TableCell>
            <TableCell className="text-center" sx={{ width: '25%' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {value?.map((body: any, index: number) => {
            return <TableRow
              key={body?.leadId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell className="text-center">{body?.leadId || "N/A"}</TableCell>
              <TableCell className="text-center">{body?.fullName || "N/A"}</TableCell>
              <TableCell className="text-center">{body?.loanAmount || "N/A"}</TableCell>
              <TableCell className="text-center">{body?.loanType || "N/A"}</TableCell>
              <TableCell className="text-center">{body?.stageName || "N/A"}</TableCell>
              <TableCell className="text-center">{body?.status || "N/A"}</TableCell>
              <TableCell className="text-center">
                {body?.step <= 3 ? <Button onClick={handleApply}>
                  Proceed Application
                </Button> :
                  body?.leadStatus == 12 ? <span className="text-success">{body?.status}</span> :
                    <span className="text-secondary" style={{ fontWeight: "900" }}><Button onClick={() => handleViewForm(body)}>
                      Pending Application
                    </Button></span>
                }
              </TableCell>
            </TableRow>
          })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
