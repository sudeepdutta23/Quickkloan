import React from 'react';
import { Stack, Step, StepConnector, StepIconProps, StepLabel, Stepper, stepConnectorClasses, styled } from '@mui/material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import TaskIcon from '@mui/icons-material/Task';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(44 244 129) 0%, rgb(124 219 127) 50%, rgb(125 143 98) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(44 244 129) 0%, rgb(124 219 127) 50%, rgb(125 143 98) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 60,
  height: 60,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(44 244 129) 0%, rgb(124 219 127) 50%, rgb(125 143 98) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(44 244 129) 0%, rgb(124 219 127) 50%, rgb(125 143 98) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <VerifiedUserIcon />,
    2: <TaskIcon />,
    3: <CreditScoreIcon />,
    4: <PriceCheckIcon />
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Lead (Creation & Validation)', 'Document Verification', 'Credit Evaluation', "Loan Clearance"];

const Step4 = ({ values }: any) => {
  let activeStage = values?.stageId ? values?.stageId : 1
  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper alternativeLabel activeStep={activeStage - 1} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <div className='mt-5 shadow-sm border' style={{ minHeight: "10rem" }}>
        <div className='h3 text-center mt-2 text-primary font-weight-bold'>Your Lead Id - {values?.leadId} is in Stage {values?.stageId} ({values?.stageName})</div>
        <div className='h5 d-flex justify-content-center align-items-center m-4 text-secondary'>Your application status is {values?.statusName}.</div>
        <div className='h6 d-flex justify-content-center align-items-center text-secondary m-4'>Keep in touch with us to complete your loan application</div>
      </div>
    </>
  )
}

export default Step4;
