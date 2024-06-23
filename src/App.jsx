import { Container } from "@mui/material";
import { useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import sampleData from "./sample-data.json"
import { format } from 'date-fns';

import { Button, Stack } from '@mui/material';
import ColumnVisibilitySidebar from './sidebars/ColumnVisibilitySidebar';

function App() {

	const columns = useMemo(() => [
		{ accessorKey: "id", header: "ID" },
		{ accessorKey: "name", header: "Name" },
		{ accessorKey: "category", header: "Category" },
		{ accessorKey: "subcategory", header: "Subcategory" },
		{ accessorKey: "createdAt", header: "Created At", Cell: ({ cell }) => format(new Date(cell.getValue()), 'dd-MMM-yyyy') },
		{ accessorKey: "updatedAt", header: "Updated At", Cell: ({ cell }) => format(new Date(cell.getValue()), 'dd-MMM-yyyy') },
		{ accessorKey: "price", header: "Price" },
		{ accessorKey: "sale_price", header: "Sale Price" },
	], []);
	const data = useMemo(() => sampleData, []);

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerContent, setDrawerContent] = useState(null);

	const handleDrawerOpen = (content) => {
		setDrawerContent(content);
		setIsDrawerOpen(true);
	};

	const [columnVisibility, setColumnVisibility] = useState({
		id: true,
		name: true,
		category: true,
		subcategory: true,
		createdAt: true,
		updatedAt: true,
		price: true,
		sale_price: true,
	});

	const table = useMaterialReactTable({
		columns,
		data,

		enableHiding: true,
		renderTopToolbarCustomActions: () => (
		      <Stack direction="row" gap={2}>
		      	<Button
					onClick={() => handleDrawerOpen('visibility')}
					// startIcon={<ViewColumnIcon />}
		      	>
		            	Columns
		      	</Button>
		      </Stack>
		),

		state: { columnVisibility }, //manage columnVisibility state
  		onColumnVisibilityChange: setColumnVisibility,
		enableFullScreenToggle: false,
		enableDensityToggle: false,
		enableColumnActions: false,
		paginationDisplayMode: "pages",
		editDisplayMode: "dialog",
		muiPaginationProps: {
			variant: "outlined",
			shape: "rounded",
			showFirstButton: false,
			showLastButton: false,
			showRowsPerPage: false,
		},
		initialState: {pagination:{pageSize: 10, pageIndex: 0}}
	})

	return (
		<Container>
			{drawerContent === 'visibility' && 
				<ColumnVisibilitySidebar
			        isOpen={isDrawerOpen}
			        onClose={() => setIsDrawerOpen(false)}
			        columns={columns}
			        columnVisibility={columnVisibility}
			        setColumnVisibility={setColumnVisibility}
			      />
			}

			<MaterialReactTable enableColumnVisibilityToggle table={table} />


		</Container>
	);
}

export default App;