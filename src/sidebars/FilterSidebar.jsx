import { Drawer, Typography, IconButton, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MRT_TableHeadCellFilterContainer } from 'material-react-table';

const FilterSidebar = ({ isOpen, onClose, table, handleClearFilters }) => {

	return (
		<Drawer anchor="right" open={isOpen} onClose={onClose}>
			<Box sx={{ width: 400, p: 2 }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
					<Typography variant="h6">Filters</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>

				{table.getLeafHeaders().map((header) => {
					if( header.id === "createdAt" || header.id === "updatedAt" ) {
						return <LocalizationProvider key={header.id} dateAdapter={AdapterDayjs}>
							<Box key={header.id} sx={{ mb: 2 }}>
								{header.column.columnDef.header}
								<MRT_TableHeadCellFilterContainer
									key={header.id}
									header={header}
									table={table}
									in
								/>
							</Box>
						</LocalizationProvider>
					} else if( header.id !== "id" ) {
						return <Box key={header.id} sx={{ mb: 2 }}>
							{header.column.columnDef.header}
							<MRT_TableHeadCellFilterContainer
								key={header.id}
								header={header}
								table={table}
								in
							/>
						</Box>
					} else {
						return null;
					}
				})}

			
				<Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => {handleClearFilters()}}>
					Clear Filters
				</Button>
			</Box>
		</Drawer>
	);
};

export default FilterSidebar;