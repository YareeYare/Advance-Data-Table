import { Drawer, Typography, IconButton, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MRT_TableHeadCellFilterContainer } from 'material-react-table';

const FilterSidebar = ({ isOpen, onClose, table, handleClearFilters }) => {

	return (
		<Drawer anchor="right" open={isOpen} onClose={onClose}>
			<Box sx={{ width: 400, padding: '40px' }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
					<Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#555555' }}>Filters</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon sx={{ fontSize: '30px', color: '#333333' }} />
					</IconButton>
				</Box>

				{table.getLeafHeaders().map((header) => {
					if( header.id === "createdAt" || header.id === "updatedAt" ) {
						return <LocalizationProvider key={header.id} dateAdapter={AdapterDayjs}>
							<Box key={header.id} sx={{ mb: 2, border: '1px solid lightgrey', borderRadius: '6px', padding: '8px', }}>
								<div style={{ marginBottom:'10px'}} >
									{header.column && header.column.columnDef && header.column.columnDef.header}
								</div>
								{header.column && header.column.columnDef && (
									<MRT_TableHeadCellFilterContainer
										key={header.id}
										header={header}
										table={table}
										in
										sx={{border: '1px solid lightgrey', borderRadius: '8px', paddingX: '4px' , paddingY: '2px', overflow:'hidden'}}
									/>
								)}
							</Box>
						</LocalizationProvider>
					} else if( header.id !== "id" ) {
						return <Box key={header.id} sx={{ mb: 2, border: '1px solid lightgrey', borderRadius: '6px', padding: '8px', backgroundColor:'#f7fbfd' }}>
							<div style={{ marginBottom:'10px'}}>
								{header.column && header.column.columnDef && header.column.columnDef.header}
							</div>
							{header.column && header.column.columnDef && (
								<MRT_TableHeadCellFilterContainer
									key={header.id}
									header={header}
									table={table}
									in
									sx={{ ...((header.id !== "price" && header.id !== "sale_price") ? { border: '1px solid lightgrey', borderRadius: '8px', backgroundColor: 'white' } : {}), paddingX: '20px',  paddingY: '2px',
										'& .MuiInput-underline:before': {
											display: 'none'
										},
										'& .MuiInput-underline:after': {
											display: 'none'
										},

									}}
								/>
							)}
						</Box>
					} else {
						return null;
					}
				})}

			
				<Button fullWidth variant="outlined" sx={{ fontSize:16, mt: 2, textTransform: 'none', color:'#666666' }} onClick={() => {handleClearFilters()}}>
					Clear Filters
				</Button>
			</Box>
		</Drawer>
	);
};

export default FilterSidebar;