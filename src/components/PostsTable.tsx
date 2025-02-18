import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Alert,
  Pagination,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import { Post } from '../types';
import { TABLE_COLUMNS } from '../constants/tableColumns';

interface PostsTableProps {
  data: Post[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export const PostsTable: React.FC<PostsTableProps> = ({
  data,
  isLoading,
  isError,
  page,
  totalPages,
  totalCount,
  onPageChange,
}) => {
  // Keep track of the last valid data
  const [displayData, setDisplayData] = React.useState<Post[]>(data);

  // Update displayData only when new data arrives and is not empty
  React.useEffect(() => {
    if (data && data.length > 0) {
      setDisplayData(data);
    }
  }, [data]);

  if (isError) {
    return (
      <Alert severity="error">
        An error occurred while fetching the data. Please try again later.
      </Alert>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.7),
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <TableContainer sx={{ maxHeight: '70vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {TABLE_COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((post) => (
              <TableRow hover key={post.id}>
                {TABLE_COLUMNS.map((column) => (
                  <TableCell key={column.id}>
                    {post[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {displayData.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={TABLE_COLUMNS.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          position: 'relative',
          zIndex: 2
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Total items: {totalCount}
        </Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
          disabled={isLoading}
        />
      </Stack>
    </Paper>
  );
};