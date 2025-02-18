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
  Alert,
  Pagination,
  Stack,
  Typography
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
  if (isError) {
    return (
      <Alert severity="error">
        An error occurred while fetching the data. Please try again later.
      </Alert>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={TABLE_COLUMNS.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((post) => (
                <TableRow hover key={post.id}>
                  {TABLE_COLUMNS.map((column) => (
                    <TableCell key={column.id}>
                      {post[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}
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
}