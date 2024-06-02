import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Image } from "../../../components";

const ServiceList = ({
  handleServiceEdit,
  handleServiceDelete,
  services,
}: any) => {

  const tableHeader = ["Name", "Icon", "% Start", "% End", "Actions"]
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        mx: 2,
        p: 2,
        mt: 2,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Service Lists
      </Typography>
      <TableContainer style={{ maxHeight: 500 }}>
        <Table sx={{ minWidth: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeader.map(header => <TableCell key={header} className="text-center">{header}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {services?.length > 0 &&
              services?.map((service: any, index: number) => {
                return <TableRow
                  key={service.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className="text-center">{service.name}</TableCell>
                  <TableCell sx={{ width: `${100/tableHeader.length-1}%` }} className="text-center"><Image src={service.icon} style={{ width: '30%' }} /></TableCell>
                  <TableCell className="text-center">{service.percentStart}</TableCell>
                  <TableCell className="text-center">{service.percentEnd}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<BorderColorIcon />}
                      onClick={() => handleServiceEdit(service)}
                    >
                      Edit
                    </Button>{" "}
                    &nbsp;
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteForeverIcon />}
                      onClick={() => handleServiceDelete(service)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServiceList;
